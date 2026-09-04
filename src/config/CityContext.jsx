import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CITIES, getCity, DEFAULT_CITY_SLUG } from './cities';

/**
 * ARCHITECTURAL RULE:
 * NO component ever hardcodes an accent color. Accent is always consumed via CSS variables:
 *   - var(--accent-300)
 *   - var(--accent-500)
 *   - var(--accent-700)
 *
 * Adding a new city must require zero component changes: only content, photography, and
 * the city's accent ramp change in its config object.
 */

const STORAGE_KEY = 'findia_city_slug';

const CityContext = createContext(null);

export function CityProvider({ children }) {
  const [citySlug, setCitySlugState] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored && CITIES[stored]) {
        return stored;
      }
    } catch {
      // localStorage may be unavailable in private browsing or restricted environments
    }
    return DEFAULT_CITY_SLUG;
  });

  const city = useMemo(() => getCity(citySlug), [citySlug]);

  const availableCities = useMemo(() => Object.values(CITIES), []);

  const setCity = (slugOrCity) => {
    const slug = typeof slugOrCity === 'object' && slugOrCity ? slugOrCity.slug : slugOrCity;
    if (CITIES[slug]) {
      setCitySlugState(slug);
      try {
        localStorage.setItem(STORAGE_KEY, slug);
      } catch {
        // Handle storage quota or access errors gracefully
      }
    } else {
      console.warn(`[CityContext] Unknown city slug: "${slug}". Falling back to default.`);
    }
  };

  // CRITICAL: On every city change, write accent ramp to CSS custom properties on document.documentElement
  useEffect(() => {
    if (!city || !city.accent) return;

    const root = document.documentElement;
    root.style.setProperty('--accent-300', city.accent[300]);
    root.style.setProperty('--accent-500', city.accent[500]);
    root.style.setProperty('--accent-700', city.accent[700]);
  }, [city]);

  const value = useMemo(
    () => ({
      city,
      setCity,
      availableCities,
    }),
    [city, availableCities]
  );

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error('useCity must be used within a CityProvider');
  }
  return context;
}

export default CityContext;
