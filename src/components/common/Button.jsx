import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Loader } from '../icons';

/**
 * Universal Button component for actions, navigation links, and triggers.
 *
 * @component
 * @example
 * // Primary city-accent action
 * <Button variant="primary" size="md" icon={<Sparkle size={18} />} onClick={handlePlan}>
 *   Generate Itinerary
 * </Button>
 *
 * @example
 * // Emergency SOS action
 * <Button variant="danger" size="lg" icon={<ShieldAlert size={20} />} onClick={triggerSOS}>
 *   Call Emergency Police (112)
 * </Button>
 *
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'ghost' | 'glass' | 'danger'} [props.variant='primary'] - Visual style
 * @param {'sm' | 'md' | 'lg'} [props.size='md'] - Button size
 * @param {React.ElementType | 'button' | 'a' | typeof Link} [props.as='button'] - Render element or component
 * @param {string} [props.to] - React Router destination if rendered as Link
 * @param {string} [props.href] - Link destination if rendered as anchor
 * @param {React.ReactNode} [props.icon] - Leading icon element
 * @param {React.ReactNode} [props.iconRight] - Trailing icon element
 * @param {boolean} [props.fullWidth=false] - If true, stretches 100% width
 * @param {boolean} [props.loading=false] - If true, displays spinner and disables interaction
 * @param {boolean} [props.disabled=false] - Disabled state
 * @param {React.ReactNode} props.children - Button content
 * @param {string} [props.className] - Additional utility classes
 */
export function Button({
  variant = 'primary',
  size = 'md',
  as = 'button',
  to,
  href,
  icon,
  iconRight,
  fullWidth = false,
  loading = false,
  disabled = false,
  children,
  className = '',
  ...rest
}) {
  const isActionDisabled = disabled || loading;

  const baseStyles =
    'inline-flex items-center justify-center font-sans font-semibold tracking-wide transition-all duration-base cursor-pointer select-none text-center outline-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 active:scale-[0.98] motion-reduce:active:scale-100';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-sm gap-1.5',
    md: 'text-sm px-4 py-2 rounded-sm gap-2',
    lg: 'text-base px-6 py-3 rounded-md gap-2.5',
  };

  const variantStyles = {
    // primary: accent-500 fill, text-inverse, subtle lift
    primary: 'bg-brand text-text-inverse shadow-soft hover:brightness-110 active:brightness-95',
    // secondary: transparent with border-strong, fills surface-raised on hover
    secondary:
      'bg-transparent border border-border-strong text-text-high hover:bg-bg-raised hover:border-text-mid',
    // ghost: no border, text-mid -> text-high on hover
    ghost: 'bg-transparent border-transparent text-text-mid hover:text-text-high hover:bg-white/5',
    // glass: uses .glass-chip; ONLY for use over photography
    glass: 'glass-chip text-text-high hover:bg-black/50 shadow-soft',
    // danger: sos fill. RESERVED EXCLUSIVELY for emergency / SOS actions, never decorative.
    danger: 'bg-sos text-text-high shadow-soft hover:brightness-110 active:brightness-95',
  };

  const disabledStyles = 'opacity-40 cursor-not-allowed pointer-events-none active:scale-100 shadow-none';

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size] || sizeStyles.md,
    variantStyles[variant] || variantStyles.primary,
    fullWidth && 'w-full',
    isActionDisabled && disabledStyles,
    className
  );

  // Determine component element
  let Component = as;
  if (to) {
    Component = Link;
  } else if (href) {
    Component = 'a';
  }

  const content = (
    <>
      {loading ? (
        <Loader size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16} className="animate-spin text-current" />
      ) : (
        icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
      )}
      {children && <span>{children}</span>}
      {!loading && iconRight && (
        <span className="inline-flex shrink-0 items-center justify-center">{iconRight}</span>
      )}
    </>
  );

  if (Component === Link) {
    return (
      <Link
        to={to}
        className={combinedClasses}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isActionDisabled ? 'true' : undefined}
        tabIndex={isActionDisabled ? -1 : undefined}
        {...rest}
      >
        {content}
      </Link>
    );
  }

  if (Component === 'a') {
    return (
      <a
        href={href}
        className={combinedClasses}
        aria-busy={loading ? 'true' : undefined}
        aria-disabled={isActionDisabled ? 'true' : undefined}
        tabIndex={isActionDisabled ? -1 : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      disabled={isActionDisabled}
      aria-busy={loading ? 'true' : undefined}
      className={combinedClasses}
      {...rest}
    >
      {content}
    </button>
  );
}

export default Button;
