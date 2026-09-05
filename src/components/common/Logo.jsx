import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Reusable FINDIA Logotype component.
 * Features an earthy tourism aesthetic with a heritage accent motif on 'IND'
 * and the brand tagline 'Explore Beyond Thinking'.
 */
export function Logo({
  size = 'md',
  showTagline = true,
  className = '',
  linkTo = '/',
  onClick,
}) {
  // Size variants
  const sizeMap = {
    sm: {
      text: 'text-lg',
      tagline: 'text-[9px] tracking-[0.2em]',
      icon: 16,
      chakra: 'w-1.5 h-1.5',
    },
    md: {
      text: 'text-xl sm:text-2xl',
      tagline: 'text-[10px] sm:text-[11px] tracking-[0.22em]',
      icon: 20,
      chakra: 'w-2 h-2',
    },
    lg: {
      text: 'text-3xl sm:text-4xl',
      tagline: 'text-xs sm:text-sm tracking-[0.25em]',
      icon: 28,
      chakra: 'w-2.5 h-2.5',
    },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const content = (
    <div className={`flex flex-col select-none group ${className}`}>
      <div className="flex items-center gap-1.5 leading-none">
        {/* Tourism Icon Motif: Stylized Gateway / Compass Symbol */}
        <div className="relative flex items-center justify-center text-amber-500 transition-transform duration-fast group-hover:scale-105">
          <svg
            width={currentSize.icon}
            height={currentSize.icon}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_2px_8px_rgba(224,160,46,0.3)]"
          >
            {/* Arch / Monument Silhouette */}
            <path
              d="M4 21V10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M8 21V13C8 10.7909 9.79086 9 12 9C14.2091 9 16 10.7909 16 13V21"
              stroke="#C1440E"
              strokeWidth="1.75"
              strokeLinecap="round"
            />
            {/* Heritage Chakra Center Dot */}
            <circle cx="12" cy="5.5" r="1.25" fill="#E88A6B" />
          </svg>
        </div>

        {/* Crafted Wordmark */}
        <span
          className={`font-display font-extrabold tracking-tight text-text-high flex items-baseline ${currentSize.text}`}
        >
          <span>F</span>
          {/* Highlighted "IND" with earthy terracotta/saffron gradient */}
          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400 font-black px-[1px]">
            IND
            {/* Subtle Ashoka Chakra / Accent Dot Above 'I' */}
            <span className="absolute -top-1 left-1/2 -translate-x-1/2 flex items-center justify-center">
              <span className={`rounded-full bg-amber-400 animate-pulse ${currentSize.chakra}`} />
            </span>
          </span>
          <span>IA</span>
        </span>
      </div>

      {/* Tagline */}
      {showTagline && (
        <span
          className={`font-sans font-semibold uppercase text-amber-200/75 transition-colors group-hover:text-amber-300 ${currentSize.tagline} mt-1`}
        >
          Explore Beyond Thinking
        </span>
      )}
    </div>
  );

  if (linkTo) {
    return (
      <Link
        to={linkTo}
        onClick={onClick}
        className="outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
      >
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;
