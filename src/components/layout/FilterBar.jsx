import React from 'react';
import { cn } from '../../utils/cn';
import { Filter, Close } from '../icons';

/**
 * Presentational filter chip rail.
 * Driven entirely by props and callbacks.
 *
 * @component
 * @param {Object} props
 * @param {Array<{ id: string, label: string, count?: number }>} props.filters - Filter items
 * @param {string} props.activeId - Currently active filter ID
 * @param {(id: string) => void} props.onSelect - Filter selection callback
 * @param {() => void} [props.onClear] - Callback to clear active filter
 * @param {string} [props.className]
 */
export function FilterBar({
  filters = [],
  activeId = 'all',
  onSelect,
  onClear,
  className = '',
}) {
  // TODO: Teammate will connect this filter bar to live URL query parameters & Supabase filters

  return (
    <div
      className={cn(
        'w-full flex items-center justify-between gap-4 py-2 border-b border-border-subtle select-none',
        className
      )}
    >
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -mx-2 px-2" style={{ scrollbarWidth: 'none' }}>
        <div className="flex items-center gap-1.5 text-xs text-text-low font-mono shrink-0 mr-1">
          <Filter size={13} className="text-brand" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        {filters.map((filter) => {
          const isActive = filter.id === activeId;

          return (
            <button
              key={filter.id}
              type="button"
              onClick={() => onSelect?.(filter.id)}
              className={cn(
                'shrink-0 px-3 py-1.5 rounded-pill text-xs font-medium transition-all duration-fast flex items-center gap-1.5 cursor-pointer outline-none',
                'focus-visible:ring-1 focus-visible:ring-brand',
                isActive
                  ? 'bg-brand text-text-inverse font-semibold shadow-soft'
                  : 'bg-bg-raised text-text-mid border border-border-default hover:border-brand/40 hover:text-text-high'
              )}
            >
              <span>{filter.label}</span>
              {typeof filter.count === 'number' && (
                <span
                  className={cn(
                    'text-[10px] font-mono px-1 rounded',
                    isActive ? 'bg-black/20 text-white' : 'bg-bg-overlay text-text-low'
                  )}
                >
                  {filter.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeId !== 'all' && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="shrink-0 flex items-center gap-1 text-[11px] font-mono text-text-low hover:text-brand transition-colors cursor-pointer"
        >
          <Close size={12} />
          <span>Clear</span>
        </button>
      )}
    </div>
  );
}

export default FilterBar;
