import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CrowdAssistant } from '../../features/crowd-assistant';
import { SOSButton } from '../../features/safety-sos/SOSButton';
import { cn } from '../../utils/cn';

/**
 * ==============================================================================
 * FINDIA GLOBAL Z-INDEX SCALE (DOCUMENTED TOKENS):
 * - grain:            z-[5]   (Fixed viewport noise texture overlay)
 * - floating-buttons: z-[40]  (AI Assistant trigger + Floating SOS trigger)
 * - navbar:           z-[50]  (Top navigation bar and trigger controls)
 * - assistant-panel:  z-[60]  (Desktop AI drawer & mobile chat sheet)
 * - mobile-menu:      z-[70]  (Full-screen hamburger navigation overlay)
 * - modals:           z-[80]  (Emergency SOS dial sheet & critical dialogs)
 * ==============================================================================
 */

/**
 * Global application shell composing the Skip Link, Grain texture, Navbar,
 * Main landmark, Footer, and Floating Action Layers.
 *
 * @component
 */
export function AppShell({ children, transparentNavbarAtTop = false, className = '' }) {
  const [sosModalOpen, setSosModalOpen] = useState(false);
  const location = useLocation();
  const isSosRoute = location.pathname === '/sos';

  return (
    <div className={cn('min-h-screen flex flex-col bg-bg-base text-text-mid font-sans relative', className)}>
      {/* 1. Accessible Skip to Content Link (Slides into view on Tab focus) */}
      <a
        href="#main-content"
        className="fixed -top-32 left-4 z-[100] px-4 py-2 rounded-sm bg-brand text-text-high font-semibold shadow-lifted border border-white/20 transition-all duration-fast focus:top-4 outline-none focus:ring-2 focus:ring-accent-300"
      >
        Skip to main content
      </a>

      {/* 2. Global SVG feTurbulence Noise Grain Overlay (z-[5]) */}
      <div className="grain pointer-events-none z-[5]" aria-hidden="true" />

      {/* 3. Global Navbar (z-[50]) */}
      <Navbar
        transparentAtTop={transparentNavbarAtTop}
        onOpenSOS={() => setSosModalOpen(true)}
      />

      {/* 4. Main Content Landmark (Automatically applies top offset when navbar is fixed solid) */}
      <main
        id="main-content"
        tabIndex={-1}
        className={cn(
          'flex-1 flex flex-col outline-none',
          !transparentNavbarAtTop && 'pt-20 sm:pt-24'
        )}
      >
        {children}
      </main>

      {/* 5. Global Footer */}
      <Footer />

      {/* 6. Floating Action Layer (z-[40]) */}
      <div className="pointer-events-auto">
        {/* Floating AI Crowd Assistant Widget & Panel (z-[40] & z-[60]) */}
        <CrowdAssistant />
      </div>
    </div>
  );
}

export default AppShell;
