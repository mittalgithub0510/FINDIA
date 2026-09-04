import { useState, useEffect } from 'react';

/**
 * Throttled passive window scroll listener using requestAnimationFrame.
 *
 * @param {number} [threshold=40] - Pixel threshold to check scroll position against
 * @returns {{ scrollY: number, isScrolled: boolean }}
 */
export function useScrollPosition(threshold = 40) {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollPosition = () => {
      const currentScrollY = window.scrollY || document.documentElement.scrollTop;
      setScrollY(currentScrollY);
      setIsScrolled(currentScrollY > threshold);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    };

    // Initialize immediately
    updateScrollPosition();

    // Passive listener for maximum scroll performance
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return { scrollY, isScrolled };
}

export default useScrollPosition;
