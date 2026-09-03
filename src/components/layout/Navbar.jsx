import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useCity } from '../../config/CityContext';
import { useScrollPosition } from '../../hooks/useScrollPosition';
import { cn } from '../../utils/cn';
import {
  MapPin,
  ChevronDown,
  Search,
  ShieldAlert,
  Menu,
  Close,
  Phone,
} from '../icons';
import { Badge } from '../common/Badge';

/**
 * Navigation routes list.
 * Single source of truth for desktop navigation and mobile drawer links.
 */
const NAV_LINKS = [
  { label: 'Places', to: '/places' },
  { label: 'Hidden Gems', to: '/hidden-gems' },
  { label: 'Plan', to: '/plan' },
  { label: 'Community', to: '/community' },
  { label: 'Travel Together', to: '/travel-together' },
];

/**
 * Global responsive fixed navbar.
 *
 * @component
 * @param {Object} props
 * @param {boolean} [props.transparentAtTop=false] - If true, starts transparent at scrollY=0
 * @param {() => void} [props.onOpenSOS] - Callback to open persistent SOS emergency sheet
 */
export function Navbar({ transparentAtTop = false, onOpenSOS }) {
  const { city, setCity, availableCities } = useCity();
  const { isScrolled } = useScrollPosition(40);
  const location = useLocation();

  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [focusedCityIndex, setFocusedCityIndex] = useState(-1);

  const cityTriggerRef = useRef(null);
  const cityMenuRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const savedScrollPositionRef = useRef(0);

  const shouldBeGlass = !transparentAtTop || isScrolled;

  // Close menus on route change
  useEffect(() => {
    setCityMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle outside click for city dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        cityMenuRef.current &&
        !cityMenuRef.current.contains(event.target) &&
        cityTriggerRef.current &&
        !cityTriggerRef.current.contains(event.target)
      ) {
        setCityMenuOpen(false);
      }
    }
    if (cityMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [cityMenuOpen]);

  // Lock and restore body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      savedScrollPositionRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${savedScrollPositionRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      // Focus first focusable item in mobile menu
      setTimeout(() => {
        const firstFocusable = mobileMenuRef.current?.querySelector('button, a, [tabindex="0"]');
        firstFocusable?.focus();
      }, 50);
    } else if (document.body.style.position === 'fixed') {
      const scrollY = savedScrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Keyboard navigation for city switcher dropdown (listbox pattern)
  const handleCityKeyDown = (e) => {
    if (!cityMenuOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setCityMenuOpen(true);
        setFocusedCityIndex(0);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setCityMenuOpen(false);
      cityTriggerRef.current?.focus();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedCityIndex((prev) => (prev + 1) % availableCities.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedCityIndex((prev) => (prev - 1 + availableCities.length) % availableCities.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedCityIndex >= 0 && focusedCityIndex < availableCities.length) {
        const targetCity = availableCities[focusedCityIndex];
        const isClickable = targetCity.status === 'live' || import.meta.env.DEV;
        if (isClickable) {
          setCity(targetCity.slug);
          setCityMenuOpen(false);
          cityTriggerRef.current?.focus();
        }
      }
    }
  };

  // Keyboard navigation inside mobile menu: trap focus & Escape
  const handleMobileMenuKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      setMobileMenuOpen(false);
      hamburgerRef.current?.focus();
      return;
    }

    if (e.key === 'Tab' && mobileMenuRef.current) {
      const focusable = mobileMenuRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <>
      <nav
        aria-label="Main Navigation"
        className={cn(
          'fixed top-0 left-0 right-0 w-full z-[50] transition-all duration-base select-none',
          shouldBeGlass
            ? 'glass-heavy border-b border-white/10 shadow-glass py-2.5 sm:py-3'
            : 'bg-transparent border-b border-transparent py-4'
        )}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          {/* LEFT: Wordmark + Devanagari Cultural Accent */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              to="/"
              className="flex items-baseline gap-1.5 text-text-high group outline-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded-xs"
            >
              {/* TODO: Swap in responsive SVG brand mark logo here */}
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight transition-colors group-hover:text-accent-300">
                FINDIA
              </span>
              <span
                className="font-deva text-brand text-xs sm:text-sm font-normal opacity-90 transition-colors"
                title={`${city.name} in Devanagari`}
              >
                {city.slug === 'delhi' ? 'दिल्ली' : city.slug === 'jaipur' ? 'जयपुर' : 'भारत'}
              </span>
            </Link>

            {/* CITY SWITCHER PILL */}
            <div className="relative">
              <button
                ref={cityTriggerRef}
                id="city-switcher-trigger"
                type="button"
                aria-haspopup="listbox"
                aria-expanded={cityMenuOpen}
                aria-label={`Current city: ${city.name}. Click to change city`}
                onClick={() => setCityMenuOpen((prev) => !prev)}
                onKeyDown={handleCityKeyDown}
                className={cn(
                  'cursor-pointer flex items-center gap-1.5 px-2.5 py-1 rounded-pill text-xs font-sans font-medium transition-all duration-base border outline-none',
                  'bg-bg-raised/90 hover:bg-bg-overlay border-border-strong text-text-high hover:border-brand/40',
                  'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                  cityMenuOpen && 'border-brand ring-1 ring-brand'
                )}
              >
                <MapPin size={13} className="text-brand shrink-0" />
                <span className="truncate max-w-[80px] sm:max-w-[120px]">{city.name}</span>
                <ChevronDown
                  size={12}
                  className={cn(
                    'text-text-low transition-transform duration-base',
                    cityMenuOpen && 'rotate-180 text-brand'
                  )}
                />
              </button>

              {/* City Switcher Dropdown Menu */}
              {cityMenuOpen && (
                <div
                  ref={cityMenuRef}
                  role="listbox"
                  aria-label="Select City"
                  className="absolute left-0 mt-2 w-64 rounded-xl glass-heavy border border-white/15 p-2 shadow-lifted z-[60] animate-in fade-in zoom-in-95 duration-fast"
                >
                  <div className="px-2.5 py-1 text-[10px] uppercase font-mono tracking-wider text-text-low border-b border-white/10 mb-1">
                    Select Active City
                  </div>

                  <div className="space-y-1">
                    {availableCities.map((c, index) => {
                      const isSelected = c.slug === city.slug;
                      const isLive = c.status === 'live';
                      const isClickable = isLive || import.meta.env.DEV;
                      const isFocused = index === focusedCityIndex;

                      return (
                        <div
                          key={c.slug}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={!isClickable}
                          tabIndex={isClickable ? 0 : -1}
                          onClick={() => {
                            if (isClickable) {
                              setCity(c.slug);
                              setCityMenuOpen(false);
                            }
                          }}
                          onMouseEnter={() => setFocusedCityIndex(index)}
                          className={cn(
                            'flex items-center justify-between p-2 rounded-md transition-colors duration-fast select-none',
                            isClickable
                              ? 'cursor-pointer text-text-high hover:bg-white/10'
                              : 'cursor-not-allowed opacity-50 text-text-low',
                            isSelected && 'bg-brand/15 border border-brand/30',
                            isFocused && isClickable && !isSelected && 'bg-white/5'
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            {/* Color Swatch of that city's accent-500 */}
                            <span
                              className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-sm"
                              style={{ backgroundColor: c.accent[500] }}
                              aria-hidden="true"
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-medium leading-tight">
                                {c.name}
                              </span>
                              <span className="text-[10px] text-text-low font-mono">
                                {c.accentName}
                              </span>
                            </div>
                          </div>

                          {isSelected ? (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-brand text-text-inverse font-mono font-semibold">
                              ACTIVE
                            </span>
                          ) : (
                            <Badge variant="outline" size="xs">
                              {isLive ? 'Select' : 'Coming soon'}
                            </Badge>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* CENTER: Primary Navigation Links (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  cn(
                    'relative px-3 py-1.5 text-xs font-medium rounded-sm transition-colors duration-fast outline-none',
                    'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
                    isActive
                      ? 'text-text-high font-semibold'
                      : 'text-text-mid hover:text-text-high hover:bg-white/5'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span>{link.label}</span>
                    {/* Non-shifting Active Accent Indicator Dot */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        'absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand transition-all duration-base',
                        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                      )}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* RIGHT SIDE: Search + PERSISTENT SOS BUTTON + Mobile Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Search Trigger */}
            {/* TODO: Wire search trigger to global search dialog */}
            <button
              type="button"
              aria-label="Search places and itineraries"
              onClick={() => {
                // TODO: Open global modal search palette
              }}
              className="p-1.5 rounded-sm text-text-mid hover:text-text-high hover:bg-white/5 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-brand"
            >
              <Search size={17} />
            </button>

            {/* THE NAVBAR SOS BUTTON:
             * ALWAYS VISIBLE at every breakpoint including 360px.
             * NEVER hidden inside the hamburger drawer for rapid emergency access.
             */}
            <button
              id="navbar-sos-btn"
              type="button"
              onClick={onOpenSOS}
              aria-label={`Emergency SOS - Call ${city.name} Police (${city.emergency?.[1]?.number || '112'})`}
              className={cn(
                'cursor-pointer flex items-center gap-1.5 px-2 sm:px-2.5 py-1.5 rounded-sm text-xs font-bold tracking-wider',
                'bg-sos text-text-high shadow-soft hover:brightness-110 active:scale-95 transition-all duration-fast',
                'outline-none focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2'
              )}
            >
              <ShieldAlert size={14} className="shrink-0 animate-pulse" />
              <span className="hidden sm:inline font-mono">SOS</span>
            </button>

            {/* Mobile Menu Hamburger (Visible below lg) */}
            <button
              ref={hamburgerRef}
              id="mobile-menu-trigger"
              type="button"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="lg:hidden p-1.5 rounded-sm text-text-high hover:bg-white/5 transition-colors cursor-pointer outline-none focus-visible:outline-2 focus-visible:outline-brand"
            >
              {mobileMenuOpen ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN MOBILE MENU OVERLAY (z-[70]) */}
      {mobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          onKeyDown={handleMobileMenuKeyDown}
          className="fixed inset-0 z-[70] glass-heavy flex flex-col justify-between p-6 pt-20 animate-in fade-in duration-base lg:hidden overflow-y-auto"
        >
          {/* Close button in top-right */}
          <button
            type="button"
            aria-label="Close navigation"
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-sm text-text-high hover:bg-white/10 transition-colors cursor-pointer"
          >
            <Close size={24} />
          </button>

          {/* Links Section */}
          <div className="space-y-6 pt-4">
            <div className="type-overline text-brand">Navigate {city.name}</div>
            <div className="flex flex-col space-y-3">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'type-display text-2xl py-1 transition-colors block outline-none focus-visible:text-brand',
                      isActive ? 'text-brand font-semibold' : 'text-text-high hover:text-accent-300'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Mobile Footer Area: Emergency Numbers & City Switcher */}
          <div className="pt-8 border-t border-white/10 space-y-4">
            <div className="space-y-2">
              <div className="text-xs uppercase font-mono text-text-low">
                {city.name} Emergency Helplines
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(city.emergency || []).slice(0, 4).map((em, idx) => (
                  <a
                    key={idx}
                    href={`tel:${em.number}`}
                    className="flex items-center gap-2 p-2 rounded bg-bg-raised border border-border-default text-xs text-text-high hover:border-sos transition-colors"
                  >
                    <Phone size={12} className="text-sos shrink-0" />
                    <span className="font-mono font-semibold">{em.number}</span>
                    <span className="text-[10px] text-text-low truncate">{em.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 text-xs text-text-low">
              <span>FINDIA v1.0 • PWA</span>
              <span className="font-deva text-brand">
                {city.slug === 'delhi' ? 'दिल्ली' : 'जयपुर'}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
