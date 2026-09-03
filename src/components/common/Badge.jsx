import React from 'react';
import { cn } from '../../utils/cn';
import { Gem } from '../icons';

/**
 * Pill badge for categories, tags, filter chips, and highlights.
 *
 * @component
 * @example
 * // Standard category tag
 * <Badge variant="default" size="sm">UNESCO Monument</Badge>
 *
 * @example
 * // Signature Hidden Gem badge
 * <Badge variant="gem" size="sm">Secret Baoli</Badge>
 *
 * @param {Object} props
 * @param {'default' | 'accent' | 'outline' | 'glass' | 'gem'} [props.variant='default'] - Visual style
 * @param {'xs' | 'sm'} [props.size='sm'] - Badge size
 * @param {React.ReactNode} [props.icon] - Optional leading icon (automatically provided if variant="gem")
 * @param {React.ReactNode} props.children - Badge text or element
 * @param {string} [props.className] - Additional utility classes
 */
export function Badge({
  variant = 'default',
  size = 'sm',
  icon,
  children,
  className = '',
  ...rest
}) {
  const baseStyles =
    'inline-flex items-center font-sans font-medium rounded-pill transition-colors select-none whitespace-nowrap';

  const sizeStyles = {
    xs: 'text-[10px] px-2 py-0.5 gap-1 leading-normal',
    sm: 'text-xs px-2.5 py-1 gap-1.5 leading-normal',
  };

  const variantStyles = {
    // default: surface-elevated, text-mid, hairline border
    default: 'bg-bg-elevated text-text-mid border border-border-default',
    // accent: accent-soft tint with accent-300 text
    accent: 'bg-accent-soft text-accent-300 border border-brand/25',
    // outline: border only, transparent fill
    outline: 'bg-transparent border border-border-default text-text-high',
    // glass: .glass-chip, for placement over photos; legible on bright sky & dark stone
    glass: 'glass-chip text-text-high',
    // gem: signature hidden-gems label; accent-tinted with faint glow
    gem: 'bg-accent-soft text-accent-300 border border-brand/35 shadow-[0_0_12px_var(--accent-soft)]',
  };

  const finalIcon =
    variant === 'gem' && !icon ? (
      <Gem size={size === 'xs' ? 10 : 12} className="text-accent-300 shrink-0" />
    ) : (
      icon && <span className="inline-flex shrink-0 items-center justify-center">{icon}</span>
    );

  return (
    <span
      className={cn(
        baseStyles,
        sizeStyles[size] || sizeStyles.sm,
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...rest}
    >
      {finalIcon}
      <span>{children}</span>
    </span>
  );
}

export default Badge;
