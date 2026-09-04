import React from 'react';
import { AlternativeCard } from './AlternativeCard';
import { Sparkle } from '../../components/icons';
import { cn } from '../../utils/cn';

/**
 * Chat message bubble supporting user prompts, assistant insights, and embedded place recommendations.
 *
 * @component
 */
export function MessageBubble({ message, isTyping = false }) {
  if (isTyping) {
    return (
      <div className="flex items-start gap-2.5 max-w-[85%]">
        <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0">
          <Sparkle size={13} className="animate-spin" />
        </div>
        <div className="p-3 rounded-xl rounded-tl-none bg-bg-raised border border-border-default space-y-1">
          <div className="flex items-center gap-1.5 text-text-low text-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-brand animate-bounce" style={{ animationDelay: '300ms' }} />
            <span className="text-[11px] font-mono ml-1 text-text-low">Finding quiet spots...</span>
          </div>
        </div>
      </div>
    );
  }

  const isUser = message.sender === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] p-3.5 rounded-xl rounded-tr-none bg-bg-elevated border border-border-strong text-text-high text-xs sm:text-sm font-sans leading-relaxed shadow-soft">
          {message.text}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-2.5 max-w-[95%]">
      <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/40 flex items-center justify-center text-brand shrink-0 mt-0.5">
        <Sparkle size={13} />
      </div>

      <div className="space-y-3 flex-1">
        <div className="p-3.5 rounded-xl rounded-tl-none bg-bg-raised border border-border-default text-text-high text-xs sm:text-sm font-sans leading-relaxed shadow-card">
          {message.text}
        </div>

        {message.alternatives && message.alternatives.length > 0 && (
          <div className="space-y-2 pt-1">
            <div className="type-overline text-brand text-[10px]">
              Recommended Low-Crowd Alternatives
            </div>
            {message.alternatives.map((alt) => (
              <AlternativeCard key={alt.id} {...alt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MessageBubble;
