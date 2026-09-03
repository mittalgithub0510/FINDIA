import React from 'react';

/**
 * Base SVG icon wrapper enforcing consistent optical weight, accessibility defaults,
 * and standard 24x24 viewBox stroke-based attributes.
 */
function IconBase({
  size = 24,
  className = '',
  strokeWidth = 1.5,
  title,
  children,
  ...rest
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
      className={className}
      {...rest}
    >
      {title && <title>{title}</title>}
      {children}
    </svg>
  );
}

// ==============================================================================
// NAVIGATION & UI ICONS
// ==============================================================================

export function Search(props) {
  return (
    <IconBase {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.35-4.35" />
    </IconBase>
  );
}

export function Close(props) {
  return (
    <IconBase {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </IconBase>
  );
}

export function Menu(props) {
  return (
    <IconBase {...props}>
      <path d="M4 6h16M4 12h16M4 18h16" />
    </IconBase>
  );
}

export function ChevronDown(props) {
  return (
    <IconBase {...props}>
      <path d="M6 9l6 6 6-6" />
    </IconBase>
  );
}

export function ChevronRight(props) {
  return (
    <IconBase {...props}>
      <path d="M9 18l6-6-6-6" />
    </IconBase>
  );
}

export function ArrowRight(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </IconBase>
  );
}

export function ArrowUpRight(props) {
  return (
    <IconBase {...props}>
      <path d="M7 17L17 7M7 7h10v10" />
    </IconBase>
  );
}

export function Check(props) {
  return (
    <IconBase {...props}>
      <path d="M20 6L9 17l-5-5" />
    </IconBase>
  );
}

export function Plus(props) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M5 12h14" />
    </IconBase>
  );
}

export function Minus(props) {
  return (
    <IconBase {...props}>
      <path d="M5 12h14" />
    </IconBase>
  );
}

export function Filter(props) {
  return (
    <IconBase {...props}>
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </IconBase>
  );
}

export function Share(props) {
  return (
    <IconBase {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </IconBase>
  );
}

export function Bookmark(props) {
  return (
    <IconBase {...props}>
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </IconBase>
  );
}

export function ExternalLink(props) {
  return (
    <IconBase {...props}>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </IconBase>
  );
}

export function Loader(props) {
  return (
    <IconBase {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" className="animate-spin origin-center" />
    </IconBase>
  );
}

// ==============================================================================
// PRODUCT-SPECIFIC ICONS
// ==============================================================================

export function Crowd(props) {
  return (
    <IconBase {...props}>
      {/* Center figure */}
      <circle cx="12" cy="7" r="2.5" />
      <path d="M7.5 19c0-2.5 2-4.5 4.5-4.5s4.5 2 4.5 4.5" />
      {/* Left figure */}
      <circle cx="5.5" cy="9" r="2" />
      <path d="M2 20c0-2 1.6-3.6 3.6-3.6.8 0 1.5.2 2.1.6" />
      {/* Right figure */}
      <circle cx="18.5" cy="9" r="2" />
      <path d="M16.3 17c.6-.4 1.3-.6 2.1-.6 2 0 3.6 1.6 3.6 3.6" />
    </IconBase>
  );
}

export function Compass(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </IconBase>
  );
}

export function MapPin(props) {
  return (
    <IconBase {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </IconBase>
  );
}

export function Metro(props) {
  return (
    <IconBase {...props}>
      <rect x="4" y="3" width="16" height="15" rx="3" />
      <line x1="4" y1="9" x2="20" y2="9" />
      <circle cx="8" cy="14" r="1" />
      <circle cx="16" cy="14" r="1" />
      <path d="M7 18l-3 4M17 18l3 4M8 21h8" />
    </IconBase>
  );
}

export function Clock(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <polyline points="12 6 12 12 16 14" />
    </IconBase>
  );
}

export function Ticket(props) {
  return (
    <IconBase {...props}>
      <path d="M2 9a3 3 0 0 1 0 6v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3a3 3 0 0 1 0-6V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2z" />
      <line x1="12" y1="4" x2="12" y2="20" strokeDasharray="2 2" />
    </IconBase>
  );
}

export function Walk(props) {
  return (
    <IconBase {...props}>
      <circle cx="13" cy="4" r="2" />
      <path d="M7 21l3-6 2-3-2-3-3 2" />
      <path d="M12 12l2 4 4 5" />
      <path d="M14 9l3 2" />
    </IconBase>
  );
}

export function Calendar(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </IconBase>
  );
}

export function Users(props) {
  return (
    <IconBase {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </IconBase>
  );
}

export function Headphones(props) {
  return (
    <IconBase {...props}>
      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
    </IconBase>
  );
}

export function Play(props) {
  return (
    <IconBase {...props}>
      <polygon points="6 4 20 12 6 20 6 4" />
    </IconBase>
  );
}

export function Pause(props) {
  return (
    <IconBase {...props}>
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </IconBase>
  );
}

export function Sparkle(props) {
  return (
    <IconBase {...props}>
      <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" />
    </IconBase>
  );
}

export function MessageCircle(props) {
  return (
    <IconBase {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </IconBase>
  );
}

export function ShieldAlert(props) {
  return (
    <IconBase {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </IconBase>
  );
}

export function Phone(props) {
  return (
    <IconBase {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </IconBase>
  );
}

export function Camera(props) {
  return (
    <IconBase {...props}>
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </IconBase>
  );
}

export function Gem(props) {
  return (
    <IconBase {...props}>
      <path d="M6 3h12l4 6-10 12L2 9z" />
      <path d="M2 9h20M10 3l-2 6 4 12 4-12-2-6" />
    </IconBase>
  );
}

export function Route(props) {
  return (
    <IconBase {...props}>
      <circle cx="6" cy="19" r="3" />
      <circle cx="18" cy="5" r="3" />
      <path d="M18 8a9 9 0 0 1-9 9H6" />
    </IconBase>
  );
}

export function Sun(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </IconBase>
  );
}

export function Moon(props) {
  return (
    <IconBase {...props}>
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </IconBase>
  );
}

export function AlertTriangle(props) {
  return (
    <IconBase {...props}>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  );
}

export function Shield(props) {
  return (
    <IconBase {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </IconBase>
  );
}

export function CornerDownRight(props) {
  return (
    <IconBase {...props}>
      <polyline points="15 10 20 15 15 20" />
      <path d="M4 4v7a4 4 0 0 0 4 4h12" />
    </IconBase>
  );
}

export function Send(props) {
  return (
    <IconBase {...props}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </IconBase>
  );
}

export function Radio(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14" />
    </IconBase>
  );
}

