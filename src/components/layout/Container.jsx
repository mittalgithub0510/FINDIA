import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Global responsive container enforcing standardized max-widths and horizontal padding.
 *
 * @component
 * @example
 * <Container size="default">
 *   <SectionHeader title="Monuments" />
 * </Container>
 *
 * @param {Object} props
 * @param {'narrow' | 'default' | 'wide' | 'full'} [props.size='default'] - Maximum width scale
 * @param {React.ElementType} [props.as='div'] - Element to render
 * @param {React.ReactNode} props.children - Child elements
 * @param {string} [props.className] - Additional classes
 */
export function Container({
  size = 'default',
  as: Component = 'div',
  children,
  className = '',
  ...rest
}) {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-6xl',
    wide: 'max-w-7xl',
    full: 'max-w-none',
  };

  return (
    <Component
      className={cn(
        'w-full mx-auto px-4 sm:px-6 lg:px-8',
        sizeClasses[size] || sizeClasses.default,
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Container;
