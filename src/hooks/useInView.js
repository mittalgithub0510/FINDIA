import { useState, useEffect, useRef } from 'react';

/**
 * Lightweight IntersectionObserver hook for restrained fade-and-rise entrance animations.
 * Automatically respects prefers-reduced-motion by triggering immediately.
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15]
 * @param {string} [options.rootMargin='0px 0px -50px 0px']
 * @param {boolean} [options.triggerOnce=true]
 * @returns {[React.RefObject, boolean]}
 */
export function useInView({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
  triggerOnce = true,
} = {}) {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Respect reduced motion: activate immediately
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }

    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return [ref, isInView];
}

export default useInView;
