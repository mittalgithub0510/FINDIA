import React from 'react';
import { Container } from './Container';
import { cn } from '../../utils/cn';

/**
 * Standard page header for inner routes.
 * Supports compact photographic background with scrim or a clean typographic surface layout.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.overline] - Eyebrow category tag
 * @param {string} props.title - Primary page heading
 * @param {string} [props.description] - Supporting editorial description
 * @param {React.ReactNode} [props.action] - Optional right-aligned action element
 * @param {string} [props.backgroundImage] - Optional photo URL for photographic header mode
 * @param {string} [props.className]
 */
export function PageHeader({
  overline,
  title,
  description,
  action,
  backgroundImage,
  className = '',
}) {
  if (backgroundImage) {
    return (
      <div className={cn('relative w-full overflow-hidden select-none border-b border-border-default min-h-[260px] sm:min-h-[320px] flex items-end pb-8 sm:pb-12 pt-24', className)}>
        {/* Photo Background */}
        <img
          src={backgroundImage}
          alt=""
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Scrim Overlay Protection */}
        <div className="absolute inset-0 scrim-full pointer-events-none" />
        <div className="absolute inset-0 scrim-bottom pointer-events-none" />

        {/* Header Content */}
        <Container size="wide" className="relative z-10 w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            {overline && (
              <div className="type-overline text-brand drop-shadow">
                {overline}
              </div>
            )}
            <h1 className="font-display font-bold text-2xl sm:text-4xl text-text-high drop-shadow-md leading-tight">
              {title}
            </h1>
            {description && (
              <p className="type-body text-text-high/90 drop-shadow text-xs sm:text-sm max-w-2xl leading-relaxed">
                {description}
              </p>
            )}
          </div>

          {action && <div className="shrink-0 pt-2 sm:pt-0">{action}</div>}
        </Container>
      </div>
    );
  }

  return (
    <div className={cn('w-full border-b border-border-default bg-bg-raised/80 pt-24 pb-8 sm:pb-12 select-none', className)}>
      <Container size="wide" className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-2 max-w-3xl">
          {overline && (
            <div className="type-overline text-brand">
              {overline}
            </div>
          )}
          <h1 className="font-display font-bold text-2xl sm:text-4xl text-text-high leading-tight">
            {title}
          </h1>
          {description && (
            <p className="type-body-sm text-text-mid text-xs sm:text-sm max-w-2xl leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {action && <div className="shrink-0 pt-2 sm:pt-0">{action}</div>}
      </Container>
    </div>
  );
}

export default PageHeader;
