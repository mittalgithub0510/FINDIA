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

export function ArrowUp(props) {
  return (
    <IconBase {...props}>
      <path d="M12 19V5M5 12l7-7 7 7" />
    </IconBase>
  );
}

export function ArrowDown(props) {
  return (
    <IconBase {...props}>
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </IconBase>
  );
}

export function Flame(props) {
  return (
    <IconBase {...props}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 3.5z" />
    </IconBase>
  );
}

export function Award(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
    </IconBase>
  );
}

export function ThumbsUp(props) {
  return (
    <IconBase {...props}>
      <path d="M7 10v12M15 5.88L14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88z" />
    </IconBase>
  );
}

export function ThumbsDown(props) {
  return (
    <IconBase {...props}>
      <path d="M17 14V2M9 18.12L10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22h0a3.13 3.13 0 0 1-3-3.88z" />
    </IconBase>
  );
}

export function HelpCircle(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </IconBase>
  );
}

export function Activity(props) {
  return (
    <IconBase {...props}>
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </IconBase>
  );
}

export function Star(props) {
  return (
    <IconBase {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

export const Sparkles = Sparkle;


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

export function Hospital(props) {
  return (
    <IconBase {...props}>
      <path d="M12 6v12M6 12h12" strokeWidth="2.5" />
      <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth="1.5" />
    </IconBase>
  );
}

export function Building(props) {
  return (
    <IconBase {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <line x1="9" y1="6" x2="9" y2="6.01" />
      <line x1="15" y1="6" x2="15" y2="6.01" />
      <line x1="9" y1="10" x2="9" y2="10.01" />
      <line x1="15" y1="10" x2="15" y2="10.01" />
      <line x1="9" y1="14" x2="9" y2="14.01" />
      <line x1="15" y1="14" x2="15" y2="14.01" />
      <path d="M10 22v-4h4v4" />
    </IconBase>
  );
}


export function Wrench(props) {
  return (
    <IconBase {...props}>
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </IconBase>
  );
}

export function Fuel(props) {
  return (
    <IconBase {...props}>
      <line x1="3" y1="22" x2="15" y2="22" />
      <path d="M4 9h10M4 4h10v18H4z" />
      <path d="M14 9l2.5-2.5a2 2 0 0 1 2.8 0l.7.7a2 2 0 0 1 0 2.8L18 12.5V17" />
    </IconBase>
  );
}

export function Layers(props) {
  return (
    <IconBase {...props}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </IconBase>
  );
}

export function Landmark(props) {
  return (
    <IconBase {...props}>
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12 2 20 7 4 7 12 2" />
    </IconBase>
  );
}

export function Utensils(props) {
  return (
    <IconBase {...props}>
      <path d="M18 2v20M21 15V2a5 5 0 0 0-5 5v8h5zM3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20" />
    </IconBase>
  );
}

export function ShoppingBag(props) {
  return (
    <IconBase {...props}>
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </IconBase>
  );
}

export function User(props) {
  return (
    <IconBase {...props}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </IconBase>
  );
}

export function Lock(props) {
  return (
    <IconBase {...props}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </IconBase>
  );
}

export function Mail(props) {
  return (
    <IconBase {...props}>
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </IconBase>
  );
}

export function ChevronLeft(props) {
  return (
    <IconBase {...props}>
      <path d="M15 18l-6-6 6-6" />
    </IconBase>
  );
}

export function CheckCircle2(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

export function CheckCircle(props) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M9 12l2 2 4-4" />
    </IconBase>
  );
}

export function MessageSquare(props) {
  return (
    <IconBase {...props}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </IconBase>
  );
}


