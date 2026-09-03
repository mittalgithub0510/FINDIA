import React, { useState, useEffect, useRef } from 'react';
import { useCity } from '../../config/CityContext';
import { ShieldAlert, Phone, Close, MapPin } from '../../components/icons';
import { Button } from '../../components/common/Button';
import { cn } from '../../utils/cn';

/**
 * Persistent Emergency SOS Trigger and Emergency Dial Sheet.
 * Positioned to the LEFT of the AI assistant with guaranteed separation.
 *
 * @component
 */
export function SOSButton({ isOpen: controlledIsOpen, onToggle, className = '' }) {
  const { city } = useCity();
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const sheetRef = useRef(null);
  const triggerRef = useRef(null);

  const isModalOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setModalOpen = (open) => {
    if (onToggle) {
      onToggle(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isModalOpen) {
        e.preventDefault();
        setModalOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen]);

  // Trap focus inside modal when open
  useEffect(() => {
    if (isModalOpen && sheetRef.current) {
      const focusable = sheetRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    }
  }, [isModalOpen]);

  const emergencyList =
    city.emergency && city.emergency.length > 0
      ? city.emergency
      : [
          { label: 'All-India Emergency', number: '112', type: 'universal' },
          { label: `${city.name} Police Control`, number: '100', type: 'police' },
          { label: 'Ambulance Helpline', number: '102', type: 'medical' },
          { label: 'Fire Service', number: '101', type: 'fire' },
          { label: 'Women Helpline', number: '1091', type: 'women' },
          { label: 'Tourist Helpline', number: '1363', type: 'tourist' },
        ];

  return (
    <>
      {/* Floating Trigger (Z-Index token: floating-buttons = 40)
       * Positioned at right-20 sm:right-24 to guarantee zero overlap with AI Assistant at right-4 sm:right-6.
       */}
      <div
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        className={cn('fixed right-20 sm:right-24 z-[40] select-none', className)}
      >
        <button
          ref={triggerRef}
          id="floating-sos-btn"
          type="button"
          aria-label={`Emergency SOS - Call ${city.name} Police (${emergencyList[0]?.number || '112'})`}
          aria-haspopup="dialog"
          aria-expanded={isModalOpen}
          onClick={() => setModalOpen(true)}
          className={cn(
            'w-13 h-13 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer shadow-glass transition-all duration-base outline-none',
            'bg-sos text-text-high border border-red-400/40',
            'hover:brightness-110 active:scale-95 motion-reduce:active:scale-100',
            'focus-visible:outline-2 focus-visible:outline-sos focus-visible:outline-offset-2'
          )}
        >
          <ShieldAlert size={24} className="animate-pulse" />
        </button>
      </div>

      {/* Emergency Assistance Modal Sheet (Z-Index token: modals = 80) */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${city.name} Emergency Helplines`}
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-fast"
          onClick={() => setModalOpen(false)}
        >
          <div
            ref={sheetRef}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl glass-heavy border border-white/20 p-6 space-y-5 shadow-lifted animate-in slide-in-from-bottom-6 duration-base bg-bg-base/95"
          >
            {/* Sheet Header */}
            <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-sos/20 border border-sos/40 flex items-center justify-center text-sos shrink-0">
                  <ShieldAlert size={22} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-text-high leading-tight">
                    {city.name} Emergency SOS
                  </h3>
                  <p className="text-xs text-text-mid mt-0.5">
                    Tap any direct-dial helpline below for immediate assistance.
                  </p>
                </div>
              </div>

              <button
                type="button"
                aria-label="Close emergency sheet"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-sm text-text-low hover:text-text-high hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Close size={20} />
              </button>
            </div>

            {/* Direct Dial Emergency Telephone Links */}
            <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
              {emergencyList.map((item, idx) => (
                <a
                  key={idx}
                  href={`tel:${item.number}`}
                  className="group flex items-center justify-between p-3.5 rounded-xl bg-bg-raised border border-border-default hover:border-sos hover:bg-bg-overlay transition-all text-text-high outline-none focus-visible:outline-2 focus-visible:outline-sos cursor-pointer shadow-soft"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-sos/15 border border-sos/30 flex items-center justify-center text-sos group-hover:scale-110 transition-transform">
                      <Phone size={15} />
                    </div>
                    <div>
                      <div className="text-sm font-bold tracking-tight text-text-high">
                        {item.label}
                      </div>
                      <div className="text-xs text-text-low font-mono">
                        {item.type.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-base font-bold text-sos">
                      {item.number}
                    </span>
                    <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded bg-sos/20 text-sos border border-sos/30">
                      DIAL
                    </span>
                  </div>
                </a>
              ))}
            </div>

            {/* Location Dispatch Placeholder (Feature Teammate TODO) */}
            <div className="pt-2 border-t border-white/10 space-y-2">
              {/* TODO: Feature teammate will wire geolocation tracking and SMS broadcast */}
              <button
                type="button"
                disabled
                className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-bg-overlay border border-border-strong text-text-low text-xs font-semibold cursor-not-allowed opacity-60"
              >
                <MapPin size={15} />
                <span>Share Live Location with Emergency Contacts (Offline SMS)</span>
              </button>
              <div className="text-center text-[11px] text-text-low font-mono">
                Location broadcast feature active in teammate branch
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SOSButton;
