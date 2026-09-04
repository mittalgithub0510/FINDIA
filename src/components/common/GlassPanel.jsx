import React, { createContext, useContext } from 'react';
import { cn } from '../../utils/cn';

const GlassContext = createContext(false);

/**
 * Enforced glass container wrapper applying FINDIA's signature three-tier glass optics.
 *
 * RULES:
 * 1. ONLY use over photography or a rich gradient. On flat surfaces, use `bg-bg-raised` instead.
 * 2. NEVER nest glass inside glass (causes muddy rendering artifacts).
 * 3. Degrades gracefully to solid warm surfaces on browsers without backdrop-filter support.
 *
 * @component
 * @example
 * // Tier 1 for floating navigation or modals
 * <GlassPanel tier="heavy" className="p-4 rounded-xl">
 *   <h1>Floating Header</h1>
 * </GlassPanel>
 *
 * @example
 * // Tier 2 for cards overlapping photography
 * <GlassPanel tier="panel" className="p-6 rounded-lg">
 *   <p>Card content</p>
 * </GlassPanel>
 *
 * @param {Object} props
 * @param {'heavy' | 'panel' | 'chip'} [props.tier='panel'] - Glass tier intensity
 * @param {React.ElementType} [props.as='div'] - Element type to render
 * @param {React.ReactNode} props.children - Panel contents
 * @param {string} [props.className] - Additional classes
 */
export function GlassPanel({
  tier = 'panel',
  as: Component = 'div',
  children,
  className = '',
  ...rest
}) {
  const isNested = useContext(GlassContext);

  if (import.meta.env.DEV && isNested) {
    console.warn(
      `[GlassPanel] Warning: Nested glass detected (<GlassPanel tier="${tier}">). ` +
      'Blurring an already-blurred layer produces rendering artifacts and mud. ' +
      'Use a solid surface (e.g. bg-bg-raised or bg-bg-overlay) for child containers instead.'
    );
  }

  const tierClasses = {
    heavy: 'glass-heavy',
    panel: 'glass-panel',
    chip: 'glass-chip',
  };

  return (
    <GlassContext.Provider value={true}>
      <Component
        className={cn(tierClasses[tier] || tierClasses.panel, className)}
        {...rest}
      >
        {children}
      </Component>
    </GlassContext.Provider>
  );
}

export default GlassPanel;
