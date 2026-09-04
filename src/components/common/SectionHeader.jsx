import React from 'react';
import { cn } from '../../utils/cn';
import { Button } from './Button';
import { ArrowRight } from '../icons';

/**
 * Editorial section header pairing category overline, display title, optional description,
 * and an optional right-aligned action trigger.
 *
 * @component
 * @example
 * <SectionHeader
 *   overline="Audited Heritage"
 *   title="Seven Cities of Delhi"
 *   description="Trace a millennium of architectural dynasties across sandstone stepwells and tombs."
 *   action={{ label: "View All Trails", to: "/trails" }}
 * />
 *
 * @param {Object} props
 * @param {string} [props.overline] - Uppercase category eyebrow
 * @param {string} props.title - Primary section title (Fraunces serif)
 * @param {string} [props.description] - Optional explanatory paragraph
 * @param {{ label: string, to?: string, onClick?: () => void }} [props.action] - Optional action trigger
 * @param {'left' | 'center'} [props.align='left'] - Text alignment
 * @param {string} [props.className] - Additional utility classes
 */
export function SectionHeader({
  overline,
  title,
  description,
  action,
  align = 'left',
  className = '',
  ...rest
}) {
  const isCentered = align === 'center';

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border-subtle/80',
        isCentered && 'sm:flex-col sm:items-center text-center',
        className
      )}
      {...rest}
    >
      <div className={cn('space-y-1.5', isCentered ? 'max-w-2xl mx-auto' : 'max-w-3xl')}>
        {overline && (
          <div className="type-overline text-brand tracking-widest">
            {overline}
          </div>
        )}
        <h2 className="type-h2 text-text-high">
          {title}
        </h2>
        {description && (
          <p className="type-body-sm text-text-mid pt-0.5">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className={cn('shrink-0 pt-2 sm:pt-0', isCentered && 'mx-auto')}>
          <Button
            variant="ghost"
            size="sm"
            to={action.to}
            onClick={action.onClick}
            iconRight={<ArrowRight size={14} className="text-brand transition-transform group-hover:translate-x-0.5" />}
            className="group px-0 sm:px-2 font-medium"
          >
            {action.label}
          </Button>
        </div>
      )}
    </div>
  );
}

export default SectionHeader;
