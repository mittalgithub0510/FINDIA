/**
 * ==============================================================================
 * GEMINI API SERVICE
 * Wrapper around the Google Gemini streamGenerateContent API.
 * Model: gemini-3.6-flash
 *
 * Uses Server-Sent Events (SSE) streaming so text appears token-by-token
 * instead of waiting for the full response — dramatically improves perceived
 * latency even though the model's thinking time stays the same.
 *
 * TODO (production): Move to a Supabase Edge Function to keep the API key
 * server-side. Only GEMINI_API_BASE needs to change.
 * ==============================================================================
 */

const GEMINI_STREAM_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:streamGenerateContent';

/**
 * Calls the Gemini streaming API and yields text chunks as they arrive.
 * Returns an async generator — consume with `for await (const chunk of streamGemini(...))`.
 *
 * @param {string} systemPrompt
 * @param {Array<{role: string, parts: Array<{text: string}>}>} history
 * @param {string} userMessage
 * @yields {string} Incremental text chunks
 */
export async function* streamGemini(systemPrompt, history, userMessage) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your-gemini-api-key-here') {
    throw new Error('GEMINI_KEY_MISSING');
  }

  const url = `${GEMINI_STREAM_URL}?key=${apiKey}&alt=sse`;

  const body = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: [
      ...history,
      {
        role: 'user',
        parts: [{ text: userMessage }],
      },
    ],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 4096,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error('[GeminiService] Stream error:', response.status, errBody);
    if (response.status === 429) throw new Error('GEMINI_RATE_LIMIT');
    if (response.status === 400) throw new Error('GEMINI_BAD_REQUEST');
    throw new Error('GEMINI_API_ERROR');
  }

  // Read the SSE stream line by line
  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  /**
   * Processes a single SSE line and yields any text found in it.
   */
  function* processLine(line) {
    if (!line.startsWith('data: ')) return;
    const jsonStr = line.slice(6).trim();
    if (!jsonStr || jsonStr === '[DONE]') return;
    try {
      const chunk = JSON.parse(jsonStr);
      const finishReason = chunk?.candidates?.[0]?.finishReason;
      if (finishReason === 'MAX_TOKENS') {
        console.warn('[GeminiService] Response hit MAX_TOKENS — consider raising maxOutputTokens');
      }
      const parts = chunk?.candidates?.[0]?.content?.parts ?? [];
      for (const part of parts) {
        if (part.text) yield part.text;
      }
    } catch {
      // Malformed SSE chunk — skip silently
    }
  }

  while (true) {
    const { done, value } = await reader.read();

    // Flush remaining buffer when stream ends — this is critical:
    // the final SSE line may not have a trailing \n so it stays in
    // the buffer and never gets processed without this flush.
    if (done) {
      if (buffer.trim()) {
        yield* processLine(buffer.trim());
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    // Keep the last (possibly incomplete) line in the buffer
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      yield* processLine(line);
    }
  }
}
