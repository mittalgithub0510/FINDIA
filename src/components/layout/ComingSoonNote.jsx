import React from 'react';
import { cn } from '../../utils/cn';
import { Clock } from '../icons';

/**
 * Tasteful inline callout marking an upcoming feature region.
 * Clearly designates module ownership and planned integration without reading as broken UI.
 *
 * @component
 * @param {Object} props
 * @param {string} props.featureName - Name of the upcoming feature module
 * @param {string} props.description - Concrete explanation of planned functionality
 * @param {string} [props.owner] - Assigned feature owner folder name
 * @param {string} [props.className]
 */
export function ComingSoonNote({
  featureName,
  description,
  owner,
  className = '',
}) {
  return (
    <div
      className={cn(
        'p-4 rounded-xl border border-border-default bg-bg-raised/60 flex items-start gap-3 select-none',
        className
      )}
    >
      <div className="w-8 h-8 rounded-lg bg-bg-overlay border border-border-subtle flex items-center justify-center text-text-low shrink-0 mt-0.5">
        <Clock size={15} className="text-brand" />
      </div>

      <div className="space-y-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="text-xs font-semibold text-text-high font-sans">
            {featureName}
          </h4>
          {owner && (
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-overlay border border-border-subtle text-text-low">
              Feature Owner: src/features/{owner}
            </span>
          )}
        </div>

        <p className="type-body-sm text-[11px] text-text-mid leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

export default ComingSoonNote;
