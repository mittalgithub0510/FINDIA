import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * Automatically scrolls window to top on route change.
 * Respects browser history back/forward scroll restoration (POP) and prefers-reduced-motion.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();
  const navType = useNavigationType();

  useEffect(() => {
    // Only scroll to top on PUSH or REPLACE; allow browser to restore scroll on POP (back/forward)
    if (navType !== 'POP') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: prefersReducedMotion ? 'auto' : 'instant',
      });
    }
  }, [pathname, navType]);

  return null;
}

export default ScrollToTop;
