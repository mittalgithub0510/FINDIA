import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Logo } from '../common/Logo';
import { DestinationDropdown } from './DestinationDropdown';
import { cn } from '../../utils/cn';
import {
  Menu,
  Close,
  ShieldAlert,
  User,
  Sparkle,
} from '../icons';

// ── Inline SVG icons (no external icon deps needed) ─────────────────────────
function HomeIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z" />
      <path d="M9 21V12h6v9" />
    </svg>
  );
}

function HotelIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M2 20V8l10-5 10 5v12" />
      <path d="M6 20v-6h12v6" />
      <path d="M10 14h4" />
    </svg>
  );
}

function BusIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="15" rx="3" />
      <line x1="3" y1="9" x2="21" y2="9" />
      <circle cx="7.5" cy="19" r="1.5" />
      <circle cx="16.5" cy="19" r="1.5" />
    </svg>
  );
}

function BookIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function PeopleIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"
      strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ── Shared tab link style ────────────────────────────────────────────────────
function tabClass(isActive) {
  return cn(
    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 outline-none whitespace-nowrap cursor-pointer',
    isActive
      ? 'bg-white/[0.12] text-white font-semibold'
      : 'text-[#8A8078] hover:text-white hover:bg-white/[0.07]'
  );
}

// ─────────────────────────────────────────────────────────────────────────────
export function Navbar({ transparentAtTop = false, onOpenSOS }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect scroll for subtle pill shadow enhancement
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── Floating pill header wrapper ───────────────────────────────── */}
      <header
        aria-label="Main Navigation"
        className="fixed top-0 left-0 right-0 z-[50] flex justify-center pt-3 px-4 select-none pointer-events-none"
      >
        {/*
          THE PILL — entire navbar lives inside this single rounded container.
          pointer-events-auto re-enables interactivity inside the pill.
        */}
        <div
          className={cn(
            'pointer-events-auto w-full max-w-6xl flex items-center justify-between gap-3 px-3 py-2 rounded-2xl transition-all duration-300',
            // Glass pill styling
            'border border-white/[0.14]',
          )}
          style={{
            background: scrolled
              ? 'rgba(15, 12, 10, 0.55)'
              : 'rgba(15, 12, 10, 0.38)',
            backdropFilter: 'blur(28px) saturate(160%)',
            WebkitBackdropFilter: 'blur(28px) saturate(160%)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.20)'
              : '0 4px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.08)',
          }}
        >
          {/* ── LEFT: Logo ── */}
          <div className="flex items-center shrink-0 pl-1">
            <Logo size="md" showTagline={false} />
          </div>

          {/* ── CENTER: Tab nav (Desktop) ── */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
          >
            {/* Home */}
            <NavLink to="/" end className={({ isActive }) => tabClass(isActive)}>
              <HomeIcon />
              <span>Home</span>
            </NavLink>

            {/* Destination dropdown */}
            <DestinationDropdown />

            {/* Hotels */}
            <NavLink to="/hotels" className={({ isActive }) => tabClass(isActive)}>
              <HotelIcon />
              <span>Hotels</span>
            </NavLink>

            {/* Transport */}
            <NavLink to="/transport" className={({ isActive }) => tabClass(isActive)}>
              <BusIcon />
              <span>Transport</span>
            </NavLink>

            {/* Guides */}
            <NavLink to="/guides" className={({ isActive }) => tabClass(isActive)}>
              <BookIcon />
              <span>Guides</span>
            </NavLink>

            {/* Community */}
            <NavLink to="/community" className={({ isActive }) => tabClass(isActive)}>
              <PeopleIcon />
              <span>Community</span>
            </NavLink>
          </nav>

          {/* ── RIGHT: CTAs (Desktop) ── */}
          <div className="hidden lg:flex items-center gap-1.5 shrink-0 pr-1">
            {/* SOS */}
            <NavLink
              to="/sos"
              className={({ isActive }) => cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all duration-150 outline-none border',
                isActive
                  ? 'bg-red-600 text-white border-red-500'
                  : 'bg-red-500/15 text-red-400 border-red-500/40 hover:bg-red-600 hover:text-white hover:border-red-500'
              )}
            >
              <ShieldAlert size={14} className="shrink-0 text-red-400" />
              <span>SOS</span>
            </NavLink>

            {/* Login */}
            <NavLink
              to="/login"
              className={({ isActive }) => cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-semibold transition-all duration-150 outline-none border',
                isActive
                  ? 'bg-white/15 text-white border-white/30'
                  : 'bg-white/[0.06] text-[#C8BFB5] border-white/[0.10] hover:bg-white/[0.12] hover:text-white hover:border-white/20'
              )}
            >
              <User size={14} className="shrink-0" />
              <span>Login</span>
            </NavLink>

            {/* FINDIA AI — primary amber pill CTA */}
            <NavLink
              to="/findia-ai"
              className={({ isActive }) => cn(
                'flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-[13px] font-bold transition-all duration-150 outline-none',
                isActive
                  ? 'bg-amber-400 text-[#12100E]'
                  : 'bg-amber-500 hover:bg-amber-400 text-[#12100E]'
              )}
              style={{ boxShadow: '0 2px 12px rgba(245,158,11,0.35)' }}
            >
              <Sparkle size={14} className="shrink-0" />
              <span>FINDIA AI</span>
            </NavLink>
          </div>

          {/* ── MOBILE: SOS + Hamburger ── */}
          <div className="flex items-center gap-2 lg:hidden">
            <NavLink
              to="/sos"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs"
            >
              <ShieldAlert size={13} />
              <span>SOS</span>
            </NavLink>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => setMobileMenuOpen((p) => !p)}
              className="p-1.5 rounded-lg text-[#C8BFB5] hover:bg-white/10 transition-colors"
            >
              {mobileMenuOpen ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ── MOBILE DRAWER ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[70] flex flex-col justify-between p-6 pt-24 lg:hidden overflow-y-auto"
          style={{
            background: 'rgba(12, 10, 9, 0.97)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        >
          <button
            type="button"
            aria-label="Close Menu"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full text-[#C8BFB5] hover:bg-white/10"
          >
            <Close size={20} />
          </button>

          <div className="space-y-1">
            <p className="text-[11px] font-mono uppercase tracking-widest text-amber-500 mb-5">
              Navigation
            </p>

            {[
              { to: '/', label: 'Home',        Icon: HomeIcon,   end: true  },
              { to: '/hotels',    label: 'Hotels',     Icon: HotelIcon          },
              { to: '/transport', label: 'Transport',  Icon: BusIcon            },
              { to: '/guides',    label: 'Guides',     Icon: BookIcon           },
              { to: '/community', label: 'Community',  Icon: PeopleIcon         },
            ].map(({ to, label, Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors',
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-[#8A8078] hover:text-white hover:bg-white/[0.06]'
                )}
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}

            {/* Destination */}
            <div className="px-1">
              <DestinationDropdown isMobile={true} onCloseMobile={() => setMobileMenuOpen(false)} />
            </div>

            {/* FINDIA AI */}
            <NavLink
              to="/findia-ai"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold text-[#12100E] bg-amber-500 mt-3"
            >
              <Sparkle size={18} />
              <span>FINDIA AI</span>
            </NavLink>

            {/* SOS */}
            <NavLink
              to="/sos"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-base font-bold text-white bg-red-600 hover:bg-red-500 mt-1 transition-colors"
            >
              <ShieldAlert size={18} />
              <span>SOS Emergency</span>
            </NavLink>

            {/* Login */}
            <NavLink
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) => cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-base font-semibold transition-colors mt-1',
                isActive ? 'bg-white/10 text-white' : 'text-[#8A8078] hover:text-white hover:bg-white/[0.06]'
              )}
            >
              <User size={18} />
              <span>Login / Sign Up</span>
            </NavLink>
          </div>

          <div className="pt-6 border-t border-white/[0.07] text-[11px] text-[#4A433D] font-mono flex justify-between items-center">
            <span>FINDIA v1.0 • SIH 2026</span>
            <span className="text-amber-500">Delhi Live</span>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
