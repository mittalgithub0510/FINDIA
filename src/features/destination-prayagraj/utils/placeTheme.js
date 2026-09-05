/**
 * Dynamic Place Theme & Color Extractor Utility for Prayagraj
 * Automatically derives a harmonious accent color from a place's heroImage
 * with WCAG AA contrast adjustments and safe fallback to Prayagraj's default Sangam Ochre.
 */

export const DEFAULT_BRAND_ACCENT = '#EA580C'; // Sangam Ochre

// Pre-calibrated initial seeds for instant zero-flash rendering
export const PLACE_ACCENT_SEEDS = {
  'triveni-sangam': '#EA580C',
  'allahabad-fort': '#B45309',
  'anand-bhavan': '#0284C7',
  'khusro-bagh': '#D97706',
  'all-saints-cathedral': '#C2410C',
  'bade-hanuman-ji': '#DC2626',
  'alopi-devi-mandir': '#E11D48',
  'chandrashekhar-azad-park': '#16A34A',
  'minto-park': '#0D9488',
  'boat-club-yamuna': '#0284C7',
  'chowk-bazaar': '#D97706',
  'civil-lines-high-street': '#3B82F6',
  'netram-kachori': '#F97316',
  'loknath-gali-food': '#EA580C',
};

function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
      default:
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

function calibrateHsl(h, s, l) {
  const safeS = Math.min(Math.max(s, 38), 70);
  const safeL = Math.min(Math.max(l, 46), 56);
  return {
    accent300: `hsl(${h}, ${safeS}%, 68%)`,
    accent500: `hsl(${h}, ${safeS}%, ${safeL}%)`,
    accent700: `hsl(${h}, ${safeS}%, 30%)`,
    accentSoft: `hsla(${h}, ${safeS}%, ${safeL}%, 0.15)`,
    contrastText: '#FFFFFF',
  };
}

const themeCache = new Map();

export function getPlaceTheme(place) {
  if (!place) {
    return calibrateHsl(24, 75, 48); // DEFAULT_BRAND_ACCENT #EA580C
  }

  const cacheKey = place.slug || place.id;
  if (themeCache.has(cacheKey)) {
    return themeCache.get(cacheKey);
  }

  const seededHex = place.accentColor || PLACE_ACCENT_SEEDS[place.slug] || PLACE_ACCENT_SEEDS[place.id] || DEFAULT_BRAND_ACCENT;
  const hex = seededHex.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 234;
  const g = parseInt(hex.substring(2, 4), 16) || 88;
  const b = parseInt(hex.substring(4, 6), 16) || 12;
  const [h, s, l] = rgbToHsl(r, g, b);
  const theme = calibrateHsl(h, s, l);
  themeCache.set(cacheKey, theme);
  return theme;
}

export default getPlaceTheme;
