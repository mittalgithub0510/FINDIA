import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Subtle placeholder shimmer for loading states.
 * Respects prefers-reduced-motion by freezing animation.
 *
 * @component
 * @example
 * // Paragraph loading lines
 * <Skeleton variant="text" lines={3} />
 *
 * @example
 * // Thumbnail skeleton
 * <Skeleton variant="image" className="aspect-[4/3] rounded-lg" />
 *
 * @param {Object} props
 * @param {'text' | 'title' | 'image' | 'card' | 'circle'} [props.variant='text'] - Shape variant
 * @param {number} [props.lines=1] - Number of lines when variant="text"
 * @param {string} [props.className] - Additional utility classes
 */
export function Skeleton({
  variant = 'text',
  lines = 1,
  className = '',
  ...rest
}) {
  const baseShimmer =
    'relative overflow-hidden bg-bg-raised/80 before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent before:animate-[shimmer_1.8s_infinite] motion-reduce:before:animate-none';

  if (variant === 'circle') {
    return (
      <div
        className={cn(baseShimmer, 'rounded-full shrink-0 w-10 h-10', className)}
        aria-hidden="true"
        {...rest}
      />
    );
  }

  if (variant === 'image') {
    return (
      <div
        className={cn(baseShimmer, 'w-full rounded-lg bg-bg-overlay/60', className)}
        aria-hidden="true"
        {...rest}
      />
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={cn(
          baseShimmer,
          'w-full p-4 rounded-xl border border-border-default space-y-3',
          className
        )}
        aria-hidden="true"
        {...rest}
      >
        <div className="aspect-[16/9] w-full rounded-lg bg-bg-overlay/80" />
        <div className="h-4 w-3/4 rounded bg-bg-overlay/80" />
        <div className="h-3 w-1/2 rounded bg-bg-overlay/80" />
      </div>
    );
  }

  if (variant === 'title') {
    return (
      <div
        className={cn(baseShimmer, 'h-6 w-2/3 rounded-sm', className)}
        aria-hidden="true"
        {...rest}
      />
    );
  }

  // variant === 'text'
  return (
    <div className={cn('space-y-2 w-full', className)} aria-hidden="true" {...rest}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            baseShimmer,
            'h-3.5 rounded-sm',
            index === lines - 1 && lines > 1 ? 'w-4/5' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

export default Skeleton;
