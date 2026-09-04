import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { AssistantPanel } from './AssistantPanel';
import { Sparkle, Close } from '../../components/icons';
import { cn } from '../../utils/cn';

const TOOLTIP_STORAGE_KEY = 'findia_assistant_tooltip_dismissed';

/**
 * Floating AI Crowd Assistant trigger and container.
 *
 * @component
 */
export function CrowdAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const location = useLocation();
  const triggerRef = useRef(null);

  // First-visit tooltip after 3 seconds, persisted in localStorage
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(TOOLTIP_STORAGE_KEY);
      if (!dismissed) {
        const timer = setTimeout(() => {
          setShowTooltip(true);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch {
      // Storage errors handled silently
    }
  }, []);

  const handleDismissTooltip = (e) => {
    e?.stopPropagation();
    setShowTooltip(false);
    try {
      localStorage.setItem(TOOLTIP_STORAGE_KEY, 'true');
    } catch {
      // Fallback
    }
  };

  // Close panel on route change ONLY on mobile (< 768px)
  useEffect(() => {
    if (window.innerWidth < 768 && isOpen) {
      setIsOpen(false);
    }
  }, [location.pathname]);

  // Global Escape key listener
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleToggleOpen = () => {
    if (!isOpen) {
      handleDismissTooltip();
    }
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <>
      {/* Floating Trigger Container (Z-Index token: floating-buttons = 40) */}
      <div
        style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))' }}
        className="fixed right-4 sm:right-6 z-[40] flex items-center select-none"
      >
        {/* First-Visit Tooltip */}
        {showTooltip && !isOpen && (
          <div
            role="status"
            className="hidden sm:flex items-center gap-2.5 mr-3 px-3.5 py-2 rounded-xl glass-heavy border border-brand/40 shadow-lifted animate-in fade-in slide-in-from-right-2 duration-base text-xs text-text-high"
          >
            <span className="w-2 h-2 rounded-full bg-brand shrink-0" />
            <span>Somewhere too crowded? Ask me.</span>
            <button
              type="button"
              aria-label="Dismiss hint"
              onClick={handleDismissTooltip}
              className="ml-1 p-0.5 text-text-low hover:text-text-high transition-colors cursor-pointer"
            >
              <Close size={14} />
            </button>
          </div>
        )}

        {/* Circular Floating Button */}
        <div className="relative">
          {/* Soft pulsing ring in the accent color */}
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-0 -m-1 rounded-full opacity-60 pointer-events-none transition-all',
              !isOpen && 'animate-ping duration-[3000ms] motion-reduce:animate-none'
            )}
            style={{ backgroundColor: 'var(--accent-500)' }}
          />

          <button
            ref={triggerRef}
            id="floating-assistant-btn"
            type="button"
            aria-label={isOpen ? 'Close AI crowd assistant' : 'Open AI crowd assistant'}
            aria-expanded={isOpen}
            onClick={handleToggleOpen}
            className={cn(
              'relative w-13 h-13 sm:w-14 sm:h-14 rounded-full glass-heavy flex items-center justify-center cursor-pointer shadow-glass transition-all duration-base border border-white/20 outline-none',
              'hover:scale-105 active:scale-95 motion-reduce:hover:scale-100 motion-reduce:active:scale-100',
              'focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2',
              isOpen ? 'bg-brand text-text-inverse border-brand' : 'text-brand'
            )}
          >
            {isOpen ? (
              <Close size={22} className="text-text-inverse" />
            ) : (
              <Sparkle size={24} className="text-brand transition-transform group-hover:rotate-12" />
            )}
          </button>
        </div>
      </div>

      {/* Assistant Expanded Dialogue Panel */}
      <AssistantPanel isOpen={isOpen} onClose={handleClose} />
    </>
  );
}

export default CrowdAssistant;
