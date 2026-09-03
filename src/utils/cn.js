/**
 * Lightweight class name concatenation helper.
 * Filters out falsy values and joins valid classes with a single space.
 * Accepts strings, arrays, objects with boolean values, or nested combinations.
 *
 * @param {...any} inputs - Class names, conditional objects, or arrays
 * @returns {string} Combined class string
 */
export function cn(...inputs) {
  const classes = [];

  for (const input of inputs) {
    if (!input) continue;

    if (typeof input === 'string') {
      const trimmed = input.trim();
      if (trimmed) classes.push(trimmed);
    } else if (Array.isArray(input)) {
      const inner = cn(...input);
      if (inner) classes.push(inner);
    } else if (typeof input === 'object') {
      for (const [key, value] of Object.entries(input)) {
        if (value && key) classes.push(key.trim());
      }
    }
  }

  return classes.join(' ');
}

export default cn;
