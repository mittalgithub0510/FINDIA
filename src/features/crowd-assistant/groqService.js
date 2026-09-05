/**
 * ==============================================================================
 * GROQ API SERVICE
 * Wrapper around the Groq OpenAI-compatible Chat Completions API with streaming.
 * Model: groq/compound — Groq's own compound model, fast with excellent JSON instruction following
 *
 * Groq inference is ~10x faster than Gemini for the same output quality.
 * SSE streaming format follows the OpenAI spec:
 *   data: {"choices":[{"delta":{"content":"..."},...}],...}
 *   data: [DONE]
 *
 * TODO (production): Move to a Supabase Edge Function so the API key stays
 * server-side. Only GROQ_API_URL and the Authorization header need to change.
 * ==============================================================================
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'groq/compound'; // Groq's own compound model — fast, great JSON instruction following

/**
 * Calls the Groq streaming API and yields text chunks as they arrive.
 * Consume with: `for await (const chunk of streamGroq(...)) { ... }`
 *
 * History format (OpenAI-compatible):
 *   [{ role: 'user', content: '...' }, { role: 'assistant', content: '...' }]
 *
 * @param {string} systemPrompt - Injected context and instructions
 * @param {Array<{role: string, content: string}>} history - Prior turns
 * @param {string} userMessage - Latest user message
 * @yields {string} Incremental text chunks
 */
export async function* streamGroq(systemPrompt, history, userMessage) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  if (!apiKey || apiKey === 'your-groq-api-key-here') {
    throw new Error('GROQ_KEY_MISSING');
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history,
    { role: 'user', content: userMessage },
  ];

  const body = {
    model: GROQ_MODEL,
    messages,
    temperature: 0.4,
    max_tokens: 4096,
    stream: true,
  };

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errBody = await response.text();
    console.error('[GroqService] API error:', response.status, errBody);
    if (response.status === 429) throw new Error('GROQ_RATE_LIMIT');
    if (response.status === 400) throw new Error('GROQ_BAD_REQUEST');
    if (response.status === 401) throw new Error('GROQ_KEY_INVALID');
    throw new Error('GROQ_API_ERROR');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder('utf-8');
  let buffer = '';

  /**
   * Processes a single OpenAI-format SSE line and yields content if present.
   */
  function* processLine(line) {
    if (!line.startsWith('data: ')) return;
    const jsonStr = line.slice(6).trim();
    if (!jsonStr || jsonStr === '[DONE]') return;
    try {
      const chunk = JSON.parse(jsonStr);
      const content = chunk?.choices?.[0]?.delta?.content;
      if (content) yield content;
    } catch {
      // Malformed SSE chunk — skip silently
    }
  }

  while (true) {
    const { done, value } = await reader.read();

    // Flush remaining buffer when stream ends — the final SSE line may not
    // have a trailing \n, keeping it in the buffer. Must flush explicitly.
    if (done) {
      if (buffer.trim()) {
        yield* processLine(buffer.trim());
      }
      break;
    }

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() ?? '';

    for (const line of lines) {
      yield* processLine(line);
    }
  }
}
