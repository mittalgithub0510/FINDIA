import React, { useEffect, useRef } from 'react';
import { useCity } from '../../config/CityContext';
import { useCrowdAssistant } from './useCrowdAssistant';
import { MessageBubble } from './MessageBubble';
import { SuggestionChips } from './SuggestionChips';
import { Close, Sparkle, ArrowRight } from '../../components/icons';
import { cn } from '../../utils/cn';

/**
 * AI Assistant interactive dialogue panel.
 * Wired to the Gemini LLM via useCrowdAssistant hook for live crowd-aware responses.
 *
 * @component
 */
export function AssistantPanel({ isOpen, onClose }) {
  const { city } = useCity();
  const { messages, isTyping, inputText, setInputText, sendMessage, resetConversation } =
    useCrowdAssistant();

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Reset conversation and focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      resetConversation();
      setTimeout(() => {
        if (window.innerWidth >= 768) {
          inputRef.current?.focus();
        }
      }, 100);
    }
  }, [isOpen, resetConversation]);

  const handleSend = (e) => {
    e?.preventDefault();
    sendMessage();
  };

  const handleSelectChip = (chipText) => {
    sendMessage(chipText);
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`AI Crowd Assistant for ${city.name}`}
      className={cn(
        // Z-Index token: assistant panel = 60
        'fixed z-[60] glass-heavy flex flex-col justify-between border border-white/15 shadow-lifted overflow-hidden transition-all duration-base',
        // Mobile: full-width bottom sheet with rounded top corners
        'inset-x-0 bottom-0 top-16 rounded-t-3xl border-b-0',
        // Desktop: anchored bottom-right (390px wide, max height 620px)
        'md:inset-x-auto md:top-auto md:bottom-24 md:right-6 md:w-[390px] md:h-[620px] md:rounded-2xl md:border-b'
      )}
    >
      {/* Mobile Drag Handle Affordance */}
      <div className="md:hidden pt-3 pb-1 flex justify-center shrink-0">
        <span className="w-12 h-1.5 rounded-full bg-white/20" aria-hidden="true" />
      </div>

      {/* Header */}
      <div className="px-4 py-3.5 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0">
            <Sparkle size={15} />
          </div>
          <div>
            <h3 className="font-display font-semibold text-text-high text-sm leading-tight">
              Crowd Assistant
            </h3>
            <p className="text-[11px] text-text-low font-mono">
              Live routing • <span className="text-brand font-medium">{city.name}</span>
            </p>
          </div>
        </div>

        <button
          type="button"
          aria-label="Close Assistant"
          onClick={onClose}
          className="p-1.5 rounded-sm text-text-low hover:text-text-high hover:bg-white/10 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-brand"
        >
          <Close size={18} />
        </button>
      </div>

      {/* Scrollable Message List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain">
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && <MessageBubble isTyping />}

        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      {/* Footer Area: Suggestion Chips & Input */}
      <div className="p-3 border-t border-white/10 bg-bg-base/70 backdrop-blur-md space-y-2.5 shrink-0 pb-safe">
        <SuggestionChips onSelectChip={handleSelectChip} />

        <form onSubmit={handleSend} className="relative flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isTyping}
            placeholder={`Ask about crowds or quiet spots in ${city.name}...`}
            className="w-full bg-bg-raised border border-border-default rounded-md px-3.5 py-2.5 text-xs text-text-high placeholder:text-text-low outline-none focus-visible:border-brand focus-visible:ring-1 focus-visible:ring-brand pr-10 transition-colors disabled:opacity-50"
          />

          <button
            type="submit"
            aria-label="Send message"
            disabled={!inputText.trim()}
            className={cn(
              'absolute right-1.5 p-1.5 rounded-sm transition-all duration-fast cursor-pointer',
              inputText.trim()
                ? 'bg-brand text-text-inverse hover:brightness-110'
                : 'text-text-low opacity-40 cursor-not-allowed'
            )}
          >
            <ArrowRight size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AssistantPanel;
