import React from 'react';
import { SUGGESTION_CHIPS } from './mockConversation';
import { cn } from '../../utils/cn';

/**
 * Horizontally scrollable quick suggestion chips for the AI assistant.
 *
 * @component
 */
export function SuggestionChips({ onSelectChip, className = '' }) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 overflow-x-auto py-1 px-1 scrollbar-none select-none',
        className
      )}
      style={{ scrollbarWidth: 'none' }}
    >
      {SUGGESTION_CHIPS.map((chip, idx) => (
        <button
          key={idx}
          type="button"
          onClick={() => onSelectChip?.(chip)}
          className="shrink-0 px-2.5 py-1 rounded-pill text-[11px] font-sans font-medium text-text-mid bg-bg-raised/90 border border-border-default hover:border-brand/50 hover:text-text-high hover:bg-bg-elevated transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-brand"
        >
          {chip}
        </button>
      ))}
    </div>
  );
}

export default SuggestionChips;
