import { useState, useCallback, useRef } from 'react';
import { useCity } from '../../config/CityContext';
import { places } from '../../data/delhi/places';
import { hiddenGems } from '../../data/delhi/hiddenGems';
import { streamGemini } from './geminiService';

// ─── Helpers ────────────────────────────────────────────────────────────────

/**
 * Builds the system prompt injected into every Gemini call.
 * Includes full city context, all places with current crowd levels,
 * and all hidden gems with access notes.
 */
function buildSystemPrompt(cityName) {
  const placesContext = places
    .map(
      (p) =>
        `- slug="${p.slug}" name="${p.name}" district="${p.district}" crowd=${p.crowdLevel} (${p.crowdUpdatedAt}) fee=${p.fee} metro="${p.metroStation}"`
    )
    .join('\n');

  const gemsContext = hiddenGems
    .map(
      (g) =>
        `- slug="${g.slug}" name="${g.name}" district="${g.district}" fee=${g.fee} metro="${g.metro}" note="${g.inconvenience}"`
    )
    .join('\n');

  return `You are the FINDIA AI Crowd Assistant — a knowledgeable, concise heritage travel guide for ${cityName}, India.
Your ONLY job is to help travelers avoid congestion at heritage sites and discover quiet alternatives.

CURRENT LIVE CROWD DATA FOR ${cityName.toUpperCase()}:
${placesContext}

HIDDEN GEM ALTERNATIVES (lesser-known, usually low crowd):
${gemsContext}

RULES:
1. Always recommend specific places from the datasets above. Do NOT invent place names.
2. Use the exact slug value from the dataset for each alternative's "slug" field.
3. Prioritize places with crowd level "low". Suggest "moderate" only when low options are unavailable.
4. Keep the "text" reply to 2 short sentences maximum. Be direct and practical.
5. Keep each alternative "description" to one sentence of 15 words or fewer.
6. Include honest inconveniences where relevant (locked gates, no water, monkeys, etc.).
7. Provide 2-3 alternatives when asked about crowded spots, or 0 for purely informational questions.

CRITICAL: Output ONLY a raw JSON object — no markdown, no code fences, no explanation before or after.
{
  "text": "Short 2-sentence conversational reply.",
  "alternatives": [
    {
      "id": "alt-1",
      "slug": "exact-slug-from-dataset",
      "title": "Exact Place Name from dataset",
      "distance": "e.g. 500m walk (6 min)",
      "crowdLevel": "low",
      "crowdUpdatedAt": "from data or 'recently'",
      "description": "One factual sentence under 15 words."
    }
  ]
}
If no alternatives apply, return "alternatives": [].`;
}

/**
 * Error messages shown in the chat bubble for each error type.
 */
const ERROR_MESSAGES = {
  GEMINI_KEY_MISSING:
    'The AI assistant is offline. Add VITE_GEMINI_API_KEY to your .env file to enable live responses.',
  GEMINI_RATE_LIMIT:
    'The assistant is receiving too many requests right now. Please wait a moment and try again.',
  GEMINI_BAD_REQUEST:
    'Could not process that request. Please try rephrasing your question.',
  GEMINI_API_ERROR:
    'There was a network error reaching the assistant. Please check your connection and try again.',
  DEFAULT:
    'The assistant encountered an unexpected error. Please try again.',
};

/**
 * Parses the raw Gemini response into { text, alternatives }.
 * Uses regex to locate the JSON object regardless of surrounding preamble,
 * markdown code fences, or thinking-model artefacts.
 * Falls back gracefully if no valid JSON is found.
 */
function parseGeminiResponse(rawText) {
  // 1. Try to find the outermost {...} JSON block in the response
  const jsonMatch = rawText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        text: parsed.text ?? rawText,
        alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives : [],
      };
    } catch {
      // JSON found but malformed — fall through to plain text
    }
  }

  // 2. Strip markdown code fences and retry
  const stripped = rawText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  try {
    const parsed = JSON.parse(stripped);
    return {
      text: parsed.text ?? stripped,
      alternatives: Array.isArray(parsed.alternatives) ? parsed.alternatives : [],
    };
  } catch {
    // Not parseable at all — show as plain conversational text
    return { text: rawText, alternatives: [] };
  }
}

// ─── Hook ───────────────────────────────────────────────────────────────────

/**
 * useCrowdAssistant — core hook for the AI Crowd Assistant.
 *
 * Manages conversation state, builds system prompts with live city/crowd context,
 * and calls the Gemini API on each user message.
 *
 * @returns {{
 *   messages: Array,
 *   isTyping: boolean,
 *   inputText: string,
 *   setInputText: Function,
 *   sendMessage: Function,
 *   resetConversation: Function,
 * }}
 */
export function useCrowdAssistant() {
  const { city } = useCity();
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');

  // Keep a ref to the conversation history in Gemini's format for multi-turn memory
  const historyRef = useRef([]);

  const appendMessage = useCallback((msg) => {
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (textOverride) => {
      const text = (textOverride ?? inputText).trim();
      if (!text) return;

      // 1. Add user message to UI immediately
      const userMsg = {
        id: `usr-${Date.now()}`,
        sender: 'user',
        text,
        timestamp: 'Just now',
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputText('');
      setIsTyping(true);

      // 2. Snapshot current history before the call
      const currentHistory = [...historyRef.current];

      try {
        const systemPrompt = buildSystemPrompt(city.name);

        // 3. Collect streamed chunks — typing indicator stays until first chunk arrives,
        //    then drops immediately giving snappy perceived response time
        let rawResponse = '';
        let firstChunk = true;
        for await (const chunk of streamGemini(systemPrompt, currentHistory, text)) {
          rawResponse += chunk;
          if (firstChunk) {
            // Drop typing indicator the moment first text arrives
            setIsTyping(false);
            firstChunk = false;
          }
        }

        // 4. Parse the complete response into { text, alternatives }
        const { text: replyText, alternatives } = parseGeminiResponse(rawResponse);

        // 5. Update multi-turn history for subsequent calls
        historyRef.current = [
          ...currentHistory,
          { role: 'user', parts: [{ text }] },
          { role: 'model', parts: [{ text: rawResponse }] },
        ];

        // 6. Add assistant reply with any alternative cards
        const assistantMsg = {
          id: `ast-${Date.now()}`,
          sender: 'assistant',
          text: replyText,
          alternatives,
          timestamp: 'Just now',
        };
        setIsTyping(false);
        setMessages((prev) => [...prev, assistantMsg]);
      } catch (err) {
        setIsTyping(false);
        const errorKey = err?.message in ERROR_MESSAGES ? err.message : 'DEFAULT';
        appendMessage({
          id: `err-${Date.now()}`,
          sender: 'assistant',
          text: ERROR_MESSAGES[errorKey],
          alternatives: [],
          isError: true,
          timestamp: 'Just now',
        });
      }
    },
    [inputText, city.name, appendMessage]
  );

  const resetConversation = useCallback(() => {
    setMessages([]);
    setIsTyping(false);
    setInputText('');
    historyRef.current = [];
  }, []);

  return {
    messages,
    isTyping,
    inputText,
    setInputText,
    sendMessage,
    resetConversation,
  };
}
