# FINDIA — Multi-City India Urban Telemetry & Heritage Navigation

FINDIA is a photo-first, crowd-aware urban navigation platform designed to help travelers avoid peak monument congestion across India's historical cities. By monitoring real-time visitor density across ancient stepwells, tombs, and bazaars, it calculates transit times along metro lines and sequences daily itineraries when visitor volumes drop. Built with a multi-city swappable architecture from the initial commit, Delhi serves as the flagship live city, with Jaipur, Mumbai, and Varanasi expanding next on the exact same layout engine.

---

## 1. The Problem

Standard navigation mapping platforms treat centuries-old heritage monuments as static map pins. They route thousands of travelers along identical itineraries at identical midday hours, turning tranquil sixteenth-century courtyards into overcrowded ticket bottlenecks and stranding visitors in 45-minute queues under extreme heat. FINDIA solves this through active crowd telemetry, recommending nearby low-congestion alternatives (such as peaceful garden pavilions or lesser-known stepwells within walking distance) whenever major sites reach critical capacity.

---

## 2. Product Showcase

```
+-------------------------------------------------------------------------+
| [Screenshot Placeholder: Hero Section with Live Telemetry & Golden Hour]|
+-------------------------------------------------------------------------+
| [Screenshot Placeholder: Hidden Gems Signature Hover Photo Reveal]      |
+-------------------------------------------------------------------------+
| [Screenshot Placeholder: AI Crowd Assistant Mobile Bottom Sheet]        |
+-------------------------------------------------------------------------+
| [Screenshot Placeholder: Dynamic City Palette Re-Coloring to Jaipur]    |
+-------------------------------------------------------------------------+
```

---

## 3. Technology Stack & Architectural Decisions

| Technology | Role | Rationale for Choice |
|---|---|---|
| **React 19** | Core UI Library | Component-driven architecture, concurrent rendering, and native `useMemo`/`useCallback` primitives. |
| **Vite 6** | Build & Dev Server | Sub-second HMR, instant ES module development, and optimized production rollups with automated code-splitting. |
| **Tailwind CSS v4** | Design System Engine | CSS-first `@theme` token configuration without runtime overhead; direct CSS custom property binding for runtime city color re-theming. |
| **React Router v7** | Client-Side Routing | Full code-splitting via `React.lazy()` + `Suspense`, accessible scroll restoration, and nested parameter matching. |
| **Vite PWA (Workbox)** | Progressive Web App | Zero-network offline asset caching, web app manifest, and mobile installability. |
| **Native DOM / SVG** | Hand-Drawn Iconography | Zero icon library bloat; all 36+ icons are hand-crafted inline SVG components inheriting `currentColor`. |

---

## 4. Directory Structure

```
findia/
├── docs/                        # Architecture, product specs, ownership & demo docs
│   ├── PRD.md                   # Product Requirements Document
│   ├── TLD.md                   # Technical Design Document & Supabase schema
│   ├── DEMO_SCRIPT.md           # 5-minute hackathon presentation script & Q&A
│   ├── FEATURE_OWNERSHIP.md     # Team collaboration boundaries and matrix
│   ├── STYLE_GUIDE.md           # Visual token contracts, typography & glass optics
│   └── TODO.md                  # Consolidated backlog grouped by feature owner
├── public/                      # Static assets, PWA icons, and manifest
├── src/
│   ├── assets/                  # High-resolution optimized local photography
│   ├── components/
│   │   ├── common/              # Shared design primitives (Button, Badge, Card, etc.)
│   │   ├── icons/               # 36+ hand-drawn stroke SVG React components
│   │   └── layout/              # AppShell, Navbar, Footer, PageHeader, Container
│   ├── config/                  # City registry & runtime CSS custom property injector
│   │   └── cities/              # Individual city definitions (delhi.js, jaipur.js)
│   ├── data/                    # Structured city data separated for Supabase queries
│   │   └── delhi/               # Fact-checked places, gems, forum threads, routes
│   ├── features/                # Team-owned feature folders (isolated development)
│   │   ├── crowd-assistant/     # Floating AI alternative rerouting widget
│   │   ├── places/              # Places directory, filtering, and audio guides
│   │   ├── hidden-gems/         # Editorial archive & ground condition notices
│   │   ├── itinerary-planner/   # Two-step algorithmic day scheduler
│   │   ├── community/           # Traveler forum & lost-and-found tracker
│   │   ├── travel-together/     # Open walking groups & meetup board
│   │   └── safety-sos/          # Direct-dial emergency helplines & location dispatch
│   ├── hooks/                   # Custom hooks (useScrollPosition, usePageMeta, useInView)
│   ├── pages/                   # Lazy-loaded route views matching URL structure
│   ├── styles/                  # Tailwind v4 @theme tokens, glass tiers & typography
│   ├── utils/                   # Lightweight dependency-free utilities (cn.js)
│   ├── App.jsx                  # Root router, Suspense fallback & ErrorBoundary
│   ├── main.jsx                 # React root mounting and CityProvider injection
│   └── routes.js                # Central route definitions metadata
├── .nvmrc                       # Node.js version pin (v20.18.0)
├── LICENSE                      # MIT Open Source License
├── package.json                 # Dependency manifests and scripts
└── vite.config.js               # Vite & PWA build configuration
```

---

## 5. Getting Started

### Prerequisites
- Node.js 20.x or higher (run `nvm use` if using NVM)
- npm 10.x or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/findia.git
cd findia

# Install dependencies (strictly dependency-free UI kit)
npm install

# Start local development server
npm run dev
```
Visit `http://localhost:5173` in your browser.

### Available Scripts
- `npm run dev` — Starts local Vite development server with HMR.
- `npm run build` — Builds production-ready bundle in `dist/` with route code-splitting.
- `npm run preview` — Locally previews the compiled production build.

---

## 6. Environment Variables

Create a `.env` file in the root directory for live integrations (never committed to git):
```ini
# Supabase Backend Configuration (Upcoming feature implementation)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Live AI Assistant API
VITE_AI_API_ENDPOINT=https://api.your-ai-service.com/v1
```

---

## 7. Multi-City Architecture & Adding a New City

FINDIA guarantees runtime city swappability: switching cities updates the accent color palette, Devanagari wordmark, municipal emergency helplines, and districts without reloading the page or altering layouts.

### Steps to Add a Third City (e.g., Varanasi):
1. **Create Configuration**: Create `src/config/cities/varanasi.js` declaring city metadata, Devanagari script (`वाराणसी`), accent color ramp (300, 500, 700), emergency contacts, and districts.
   *(The city is automatically discovered by `src/config/cities/index.js` via `import.meta.glob`).*
2. **Create Data Folder**: Create `src/data/varanasi/` containing fact-checked places, gems, and forum threads.

No components, layouts, or stylesheets ever need to be modified.

---

## 8. Feature Ownership & Collaboration Rules

To enable parallel development across multiple engineers without merge conflicts:
1. **Strict Folder Boundaries**: Work **only** inside your designated folder (`src/features/<feature>/`) and corresponding city data file (`src/data/<city>/`).
2. **Read-Only Core**: Never edit files in `src/components/common/`, `src/components/layout/`, `src/styles/`, `src/config/`, or `src/App.jsx`. If a shared component needs an enhancement, open a PR discussion requesting a backwards-compatible prop.
3. **No Marketing Fluff**: Adhere strictly to the banned words policy. All place descriptions must state checkable facts (years, metro stations, fees) and honest ground inconveniences.

### Git Branching Workflow
- The `main` branch is protected and always deployable.
- Branch off `main` as `feature/<feature-name>` (e.g. `feature/audio-player`).
- Create pull requests into `main` with browser verification notes. Never push directly to `main`.
- For detailed guides, see:
  - 📖 **[CONTRIBUTOR_README.md](CONTRIBUTOR_README.md)** *(Aasaan Hinglish Guide for all steps)*
  - 📘 **[CONTRIBUTING.md](CONTRIBUTING.md)** *(Standard English Guidelines)*

---

## 9. Internal Dev Tools

The routes `/sandbox` and `/tokens` serve as internal visual audits for design tokens and primitives. These routes are gated behind `import.meta.env.DEV` and are completely excluded from production builds.

---

## 10. License

Released under the [MIT License](LICENSE).
