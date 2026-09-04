import React from 'react';
import { cn } from '../../utils/cn';

/**
 * Vertical rhythm container for standard pages.
 * Applies top padding that clears the fixed navbar.
 *
 * NOTE: The landing page (or pages with a full-bleed hero photograph) must opt out
 * by setting `hasHero={true}` so the hero imagery sits directly underneath the
 * transparent navbar.
 *
 * @component
 * @example
 * // Standard content page
 * <PageWrapper>
 *   <Container>
 *     <h1>Places in Delhi</h1>
 *   </Container>
 * </PageWrapper>
 *
 * @param {Object} props
 * @param {boolean} [props.hasHero=false] - If true, omits top navbar clearance padding
 * @param {React.ReactNode} props.children - Page contents
 * @param {string} [props.className] - Additional classes
 */
export function PageWrapper({
  hasHero = false,
  children,
  className = '',
  ...rest
}) {
  return (
    <div
      className={cn(
        'w-full min-h-[calc(100vh-80px)] flex flex-col',
        !hasHero && 'pt-20 sm:pt-24 pb-16 sm:pb-24',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
