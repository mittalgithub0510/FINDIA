import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { DestinationDropdown } from './DestinationDropdown';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/cn';
import {
  Menu,
  Close,
  ShieldAlert,
  User,
  Sparkle,
  Search,
} from '../icons';

/**
 * Global Header / Navbar Component for FINDIA.
 *
 * Left Side:
 * - Logo + Wordmark ("FINDIA" with heritage "IND" accent + tagline "Explore Beyond Thinking")
 *
 * Right Side (Nav items in EXACT required order):
 * 1. Home
 * 2. Destination (Dropdown)
 * 3. Hotels
 * 4. Transport
 * 5. Guides
 * 6. Community
 * 7. FINDIA AI
 * 8. SOS
 * 9. Login
 */
export function Navbar({ transparentAtTop = false, onOpenSOS }) {
  const { isScrolled } = useScrollPosition(40);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shouldBeGlass = !transparentAtTop || isScrolled;

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-[50] transition-all duration-base select-none',
          shouldBeGlass
            ? 'glass-heavy border-b border-white/10 shadow-glass py-3'
            : 'bg-transparent border-b border-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* LEFT SIDE: LOGO + WORDMARK */}
          <div className="flex items-center gap-3 shrink-0">
            <Logo size="md" showTagline={true} />
          </div>

          {/* RIGHT SIDE: NAV ITEMS IN EXACT ORDER (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1.5 xl:gap-2">
            {/* 1. Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                  isActive
                    ? 'text-amber-400 font-semibold bg-white/5'
                    : 'text-text-mid hover:text-text-high hover:bg-white/5'
                )
              }
            >
              Home
            </NavLink>

            {/* 2. Destination (Dropdown menu opens on hover AND click) */}
            <DestinationDropdown />

            {/* 3. Hotels */}
            <NavLink
              to="/hotels"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                  isActive
                    ? 'text-amber-400 font-semibold bg-white/5'
                    : 'text-text-mid hover:text-text-high hover:bg-white/5'
                )
              }
            >
              Hotels
            </NavLink>

            {/* 4. Transport */}
            <NavLink
              to="/transport"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                  isActive
                    ? 'text-amber-400 font-semibold bg-white/5'
                    : 'text-text-mid hover:text-text-high hover:bg-white/5'
                )
              }
            >
              Transport
            </NavLink>

            {/* 5. Guides */}
            <NavLink
              to="/guides"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                  isActive
                    ? 'text-amber-400 font-semibold bg-white/5'
                    : 'text-text-mid hover:text-text-high hover:bg-white/5'
                )
              }
            >
              Guides
            </NavLink>

            {/* 6. Community */}
            <NavLink
              to="/community"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                  isActive
                    ? 'text-amber-400 font-semibold bg-white/5'
                    : 'text-text-mid hover:text-text-high hover:bg-white/5'
                )
              }
            >
              Community
            </NavLink>

            {/* 7. FINDIA AI */}
            <NavLink
              to="/findia-ai"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-fast outline-none flex items-center gap-1.5 border',
                  isActive
                    ? 'bg-amber-500 text-bg-base border-amber-400 font-bold shadow'
                    : 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                )
              }
            >
              <Sparkle size={13} className="text-amber-400 animate-pulse" />
              <span>FINDIA AI</span>
            </NavLink>

            {/* 8. SOS Emergency */}
            <NavLink
              to="/sos"
              className={({ isActive }) =>
                cn(
                  'px-3 py-1.5 text-xs font-bold tracking-wider rounded-lg transition-all duration-fast outline-none flex items-center gap-1.5 border shadow-sm',
                  isActive
                    ? 'bg-rose-600 text-white border-rose-500 shadow-rose-600/30'
                    : 'bg-rose-500/15 text-rose-300 border-rose-500/40 hover:bg-rose-600 hover:text-white'
                )
              }
            >
              <ShieldAlert size={14} className="text-rose-400 shrink-0" />
              <span>SOS</span>
            </NavLink>

            {/* 9. Login */}
            <NavLink
              to="/login"
              className={({ isActive }) =>
                cn(
                  'ml-1 px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all duration-fast outline-none flex items-center gap-1.5 border',
                  isActive
                    ? 'bg-white text-bg-base border-white'
                    : 'bg-white/10 text-text-high border-white/20 hover:bg-white/20'
                )
              }
            >
              <User size={14} />
              <span>Login</span>
            </NavLink>
          </nav>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex items-center gap-2 lg:hidden">
            <NavLink
              to="/sos"
              className="p-2 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center gap-1 shadow-md"
            >
              <ShieldAlert size={14} />
              <span>SOS</span>
            </NavLink>

            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 rounded-lg text-text-high hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <Close size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE FULLSCREEN NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[70] glass-heavy flex flex-col justify-between p-6 pt-24 lg:hidden overflow-y-auto animate-in fade-in duration-fast">
          <button
            type="button"
            aria-label="Close Menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full text-text-high hover:bg-white/10"
          >
            <Close size={24} />
          </button>

          <div className="space-y-6">
            <div className="text-xs font-mono uppercase text-amber-400 tracking-wider">
              FINDIA Navigation Menu
            </div>

            <div className="flex flex-col space-y-3">
              {/* 1. Home */}
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1"
              >
                Home
              </NavLink>

              {/* 2. Destination Accordion */}
              <DestinationDropdown isMobile={true} onCloseMobile={() => setMobileMenuOpen(false)} />

              {/* 3. Hotels */}
              <NavLink
                to="/hotels"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1"
              >
                Hotels
              </NavLink>

              {/* 4. Transport */}
              <NavLink
                to="/transport"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1"
              >
                Transport
              </NavLink>

              {/* 5. Guides */}
              <NavLink
                to="/guides"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1"
              >
                Guides
              </NavLink>

              {/* 6. Community */}
              <NavLink
                to="/community"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1"
              >
                Community
              </NavLink>

              {/* 7. FINDIA AI */}
              <NavLink
                to="/findia-ai"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-bold text-amber-400 py-1 flex items-center gap-2"
              >
                <Sparkle size={20} />
                <span>FINDIA AI</span>
              </NavLink>

              {/* 8. SOS */}
              <NavLink
                to="/sos"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-bold text-rose-400 py-1 flex items-center gap-2"
              >
                <ShieldAlert size={20} />
                <span>SOS Emergency</span>
              </NavLink>

              {/* 9. Login */}
              <NavLink
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-display font-semibold text-text-high hover:text-amber-400 py-1 flex items-center gap-2"
              >
                <User size={20} />
                <span>Login / Sign Up</span>
              </NavLink>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-xs text-text-low font-mono flex justify-between items-center">
            <span>FINDIA v1.0 • SIH 2026</span>
            <span className="text-amber-400">Delhi Live</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
