import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Editorial Empty State container for zero-data views, cleared filters, or empty bookmarks.
 *
 * @component
 * @example
 * <EmptyState
 *   icon={<Search size={32} className="text-text-low" />}
 *   title="No Heritage Sites Found"
 *   description="Try adjusting your district filters or search for nearby stepwells."
 *   action={<Button variant="secondary" size="sm" onClick={resetFilters}>Reset Filters</Button>}
 * />
 *
 * @param {Object} props
 * @param {React.ReactNode} [props.icon] - Visual icon or illustration element
 * @param {string} props.title - Primary empty state headline
 * @param {string} [props.description] - Helpful supporting guidance
 * @param {React.ReactNode} [props.action] - Optional action button or link
 * @param {string} [props.className] - Additional utility classes
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  headingLevel = 'h3',
  className = '',
  ...rest
}) {
  const HeadingTag = headingLevel;

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-xl bg-bg-raised border border-border-default space-y-4 max-w-lg mx-auto',
        className
      )}
      {...rest}
    >
      {icon && (
        <div className="w-14 h-14 rounded-full bg-bg-overlay border border-border-default flex items-center justify-center text-text-low shrink-0 mb-1">
          {icon}
        </div>
      )}

      <div className="space-y-1.5 max-w-sm">
        <HeadingTag className="type-h3 text-text-high">{title}</HeadingTag>
        {description && (
          <p className="type-body-sm text-text-mid">{description}</p>
        )}
      </div>

      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}

export default EmptyState;
