import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Badge } from './Badge';
import { CrowdBadge } from './CrowdBadge';
import { Headphones } from '../icons';

/**
 * Editorial, photo-first Card component for places, hidden gems, and itineraries.
 *
 * @component
 * @example
 * <Card
 *   image="https://images.unsplash.com/photo-..."
 *   imageAlt="Humayun's Tomb"
 *   title="Humayun's Tomb"
 *   subtitle="Nizamuddin East, Delhi"
 *   description="A UNESCO World Heritage monument and the first garden-tomb on the Indian subcontinent."
 *   crowdLevel="low"
 *   hasAudio
 *   badges={[{ label: 'UNESCO', variant: 'accent' }]}
 *   meta={[
 *     { icon: <Metro size={13} />, label: 'JLN Stadium Metro' },
 *     { icon: <Ticket size={13} />, label: '₹40 / ₹600 Foreign' },
 *     { icon: <Clock size={13} />, label: 'Sunrise – Sunset' }
 *   ]}
 *   to="/places/humayuns-tomb"
 * />
 *
 * @param {Object} props
 * @param {string} [props.image] - Photo URL
 * @param {string} [props.imageAlt] - Accessible image description
 * @param {string} [props.imageCredit] - Photo copyright/credit caption
 * @param {string} props.title - Primary card title (required)
 * @param {string} [props.subtitle] - Location or secondary title
 * @param {string} [props.description] - Editorial description
 * @param {Array<{label: string, icon?: React.ReactNode, variant?: string}>} [props.badges] - Badges array
 * @param {'low' | 'moderate' | 'heavy' | 'unknown'} [props.crowdLevel] - Live crowd status
 * @param {Date|string} [props.crowdUpdatedAt] - Timestamp for crowd telemetry
 * @param {Array<{icon?: React.ReactNode, label: string}>} [props.meta] - Metadata row items
 * @param {boolean} [props.hasAudio=false] - Whether audio guide is available
 * @param {string} [props.to] - Internal React Router route link
 * @param {string} [props.href] - External link URL
 * @param {'vertical' | 'horizontal'} [props.orientation='vertical'] - Layout direction
 * @param {'sm' | 'md' | 'lg' | 'feature'} [props.size='md'] - Card scale tier
 * @param {React.ReactNode} [props.footer] - Custom footer slot (disables card-level link if interactive)
 * @param {React.ReactNode} [props.children] - Custom child content slot
 * @param {string} [props.className] - Additional utility classes
 */
export function Card({
  image,
  imageAlt = '',
  imageCredit,
  title,
  subtitle,
  description,
  badges = [],
  crowdLevel,
  crowdUpdatedAt,
  meta = [],
  hasAudio = false,
  to,
  href,
  orientation = 'vertical',
  size = 'md',
  footer,
  children,
  className = '',
  ...rest
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  // Development warning if interactive elements might be nested inside an anchor
  const hasInteractiveFooter = Boolean(footer);
  const isLinkCandidate = Boolean(to || href);

  if (import.meta.env.DEV && isLinkCandidate && hasInteractiveFooter) {
    console.warn(
      `[Card] Warning: Interactive footer element passed to clickable card ("${title}"). ` +
      'Nesting buttons inside an anchor violates HTML specifications. ' +
      'Rendering card as non-clickable container instead.'
    );
  }

  const isClickable = isLinkCandidate && !hasInteractiveFooter;

  const isHorizontal = orientation === 'horizontal';
  const isFeature = size === 'feature';

  // Explicit aspect ratios
  const aspectClass = isHorizontal
    ? 'aspect-square w-28 sm:w-36 shrink-0'
    : isFeature || size === 'lg'
    ? 'aspect-[16/9] w-full'
    : 'aspect-[4/3] w-full';

  const initialLetter = title ? title.trim().charAt(0).toUpperCase() : 'F';

  // Media section
  const renderMedia = (
    <div className={cn('relative overflow-hidden bg-bg-overlay select-none', aspectClass)}>
      {/* Loading Shimmer (visible until image loads) */}
      {image && !imageLoaded && !imageFailed && (
        <div className="absolute inset-0 bg-bg-raised/70 animate-pulse" aria-hidden="true" />
      )}

      {/* Image or Graceful Initial Fallback (Never show broken image icon) */}
      {image && !imageFailed ? (
        <img
          src={image}
          alt={imageAlt || title || 'Findia place'}
          loading="lazy"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageFailed(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-base',
            imageLoaded ? 'opacity-100' : 'opacity-0'
          )}
        />
      ) : (
        /* Graceful fallback: Accent gradient + first letter in display serif */
        <div
          className="w-full h-full gradient-accent flex flex-col items-center justify-center p-4 text-center select-none"
          aria-label={imageAlt || title}
        >
          <span className="font-display font-bold text-4xl sm:text-5xl text-text-high drop-shadow-md">
            {initialLetter}
          </span>
          <span className="text-[10px] uppercase tracking-widest text-text-high/80 font-mono mt-1">
            FINDIA ARCHIVE
          </span>
        </div>
      )}

      {/* Photo Scrim for Legibility over Images */}
      {image && !imageFailed && <div className="absolute inset-0 scrim-bottom pointer-events-none" />}

      {/* Top Overlay Badges */}
      <div className="absolute top-2.5 inset-x-2.5 flex items-start justify-between gap-2 z-10 pointer-events-none">
        {/* Left badges row */}
        <div className="flex flex-wrap items-center gap-1.5 max-w-[70%]">
          {badges.map((b, i) => (
            <Badge
              key={i}
              variant={b.variant || 'glass'}
              size="xs"
              icon={b.icon}
            >
              {b.label}
            </Badge>
          ))}
        </div>

        {/* Right pinned CrowdBadge */}
        {crowdLevel && (
          <div className="shrink-0">
            <CrowdBadge
              level={crowdLevel}
              updatedAt={crowdUpdatedAt}
              size="sm"
              onGlass={Boolean(image && !imageFailed)}
            />
          </div>
        )}
      </div>

      {/* Audio Guide Badge & Image Credit */}
      <div className="absolute bottom-2 inset-x-2.5 flex items-end justify-between gap-2 z-10 pointer-events-none">
        {hasAudio ? (
          <span className="glass-chip rounded-pill px-2 py-0.5 text-[10px] font-mono text-text-high flex items-center gap-1">
            <Headphones size={11} className="text-accent-300" />
            <span>Audio Guide</span>
          </span>
        ) : <span />}

        {imageCredit && (
          <span className="text-[9px] font-mono text-text-high/70 drop-shadow truncate max-w-[50%]">
            © {imageCredit}
          </span>
        )}
      </div>
    </div>
  );

  // Content body
  const renderContent = (
    <div className={cn('flex flex-col justify-between flex-1 p-4 sm:p-5 space-y-3', isFeature && 'sm:p-6')}>
      <div className="space-y-1.5">
        {subtitle && (
          <div className="type-overline text-brand truncate">
            {subtitle}
          </div>
        )}

        <h3
          className={cn(
            'font-display font-semibold text-text-high transition-colors duration-base group-hover:text-accent-300 line-clamp-2',
            isFeature ? 'text-xl sm:text-2xl leading-tight' : size === 'lg' ? 'text-lg leading-snug' : 'text-base leading-snug'
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              'type-body-sm text-text-mid',
              isFeature ? 'line-clamp-3 sm:line-clamp-4' : 'line-clamp-2'
            )}
          >
            {description}
          </p>
        )}
      </div>

      {/* Meta row: Compact icon + label density */}
      {meta && meta.length > 0 && (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-text-low font-sans border-t border-border-subtle/80">
          {meta.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5">
              {item.icon && <span className="text-text-low shrink-0">{item.icon}</span>}
              <span className="truncate">{item.label}</span>
            </div>
          ))}
        </div>
      )}

      {children}

      {footer && <div className="pt-2 border-t border-border-subtle">{footer}</div>}
    </div>
  );

  const containerClasses = cn(
    'group relative flex rounded-lg bg-bg-raised border border-border-default overflow-hidden shadow-card transition-all duration-base outline-none',
    // Desktop hover: Restrained brightness & shadow change only. No image scaling!
    'hover:border-border-strong hover:shadow-lifted hover:bg-bg-raised/95',
    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
    isHorizontal ? 'flex-row' : 'flex-col',
    isFeature && 'col-span-full lg:col-span-2 rounded-xl',
    className
  );

  if (isClickable) {
    if (to) {
      return (
        <Link to={to} className={containerClasses} {...rest}>
          {renderMedia}
          {renderContent}
        </Link>
      );
    }
    return (
      <a href={href} className={containerClasses} {...rest}>
        {renderMedia}
        {renderContent}
      </a>
    );
  }

  return (
    <div className={containerClasses} {...rest}>
      {renderMedia}
      {renderContent}
    </div>
  );
}

export default Card;
