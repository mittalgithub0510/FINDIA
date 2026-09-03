# FINDIA Visual Design System — Team Style Guide

> **Audience**: All FINDIA developers building features in parallel.  
> **Philosophy**: DARK and WARM, PHOTOGRAPHY-LED, EDITORIAL, GLASS-LAYERED.  
> **Theme Mode**: Dark Mode Only. Never build light mode styles.

---

## 1. Color System & Palettes

Two color groups exist and must **never** be confused:
1. **NEUTRALS**: Identical across every single city. Surfaces, borders, text.
2. **ACCENT**: Changes per active city, consumed **ONLY** via CSS custom properties (`--accent-300`, `--accent-500`, `--accent-700`).

---

### 1.1 Neutral Palette

| Token | CSS Variable / Class | Hex Code | Precisely When to Use |
| :--- | :--- | :--- | :--- |
| **bg-base** | `bg-bg-base` / `var(--color-bg-base)` | `#12100E` | App background, page canvas, full-screen foundation. |
| **bg-raised** | `bg-bg-raised` / `var(--color-bg-raised)` | `#1A1714` | Flat cards, list containers, un-blurred panels over dark canvas. |
| **bg-overlay** | `bg-bg-overlay` / `var(--color-bg-overlay)` | `#241F1A` | Dropdowns, popovers, flyout drawers, floating tooltips. |
| **bg-elevated** | `bg-bg-elevated` / `var(--color-bg-elevated)` | `#2E2721` | Modals, active states, highlighted row backgrounds. |
| **border-subtle** | `border-border-subtle` | `#2A241E` | Inner dividers, hairline grid lines, secondary table borders. |
| **border-default** | `border-border-default` | `#3A322A` | Standard card borders, container outlines, input edges. |
| **border-strong** | `border-border-strong` | `#574A3D` | Active focus borders, hover card borders, emphasized divisions. |
| **text-high** | `text-text-high` | `#F8F3EC` | Headlines, titles, primary labels, modal headings (warm ivory). |
| **text-mid** | `text-text-mid` | `#BFB3A4` | Default body copy, descriptions, secondary metadata, paragraph text. |
| **text-low** | `text-text-low` | `#8A7F72` | Timestamps, placeholder text, disabled states, captions. |
| **text-inverse** | `text-text-inverse` | `#12100E` | Text placed directly on bright badges or high-contrast chips. |

---

### 1.2 Fixed Semantic Colors (City-Independent)

| Token | Hex | Role & Usage |
| :--- | :--- | :--- |
| **sos** | `#E23B2E` | Emergency SOS trigger, high-risk warnings, critical alerts. |
| **sos-dim** | `#7A1F18` | SOS card backgrounds, subtle alert badge fills. |
| **success** | `#2FA36B` | Confirmed actions, available slots, verified itineraries. |
| **warning** | `#E0A02E` | Caution notices, high advisory warnings, tentative alerts. |
| **info** | `#5B8FA8` | Informational callouts, audio guide duration badges. |

---

### 1.3 The Live Crowd Status Set (First-Class Feature)

Live crowd data is FINDIA's signature feature. Because accessibility requires **not relying on color alone**, every crowd status token **MUST** be paired with its designated semantic icon and pattern:

| Status | Hex | Token | Paired Icon / Visual Cue | Usage Pattern |
| :--- | :--- | :--- | :--- | :--- |
| **Low Crowd** | `#2FA36B` | `crowd-low` | `●` Single filled dot + Check icon / Calm wave | `< 30%` capacity; ideal visiting time |
| **Moderate** | `#E0A02E` | `crowd-moderate` | `●●` Two dots + Clock icon / Steady indicator | `30–70%` capacity; normal queue times |
| **Heavy Crowd** | `#E2603B` | `crowd-heavy` | `●●●` Three dots + Alert triangle / Busy pulse | `> 70%` capacity; long wait expected |
| **Unknown** | `#8A7F72` | `crowd-unknown` | `○` Hollow circle + Question icon / Dashed line | No live telemetry currently available |

---

### 1.4 The City Accent Architecture Law

> ⚠️ **CRITICAL ARCHITECTURAL LAW**:
> **NO component ever hardcodes an accent color.**
> Never write `#C1440E`, `#F2A0B5`, or static color values in your feature.
> Accent colors are written to `:root` dynamically by `CityContext` as `--accent-300`, `--accent-500`, `--accent-700`.

To consume the active city's accent:
- **Primary brand color**: `bg-brand` / `text-brand` / `border-brand` (resolves to `var(--accent-500)`)
- **Light accent tint**: `var(--accent-300)` (e.g., highlights, active icons)
- **Deep accent shade**: `var(--accent-700)` (e.g., button gradients, dark badge fills)
- **Soft accent tint**: `var(--accent-soft)` / `bg-accent-soft` (14% opacity `color-mix` for card tinting)
- **City Gradient**: `.gradient-accent` (`linear-gradient(135deg, var(--accent-500) 0%, var(--accent-700) 100%)`)

---

## 2. Typography System

Fonts are preloaded in `index.html`:
- **Display**: `"Fraunces", Georgia, serif` — Editorial headings only.
- **Sans (UI & Body)**: `"Inter", sans-serif` — All body text, inputs, buttons, and UI controls.
- **Devanagari**: `"Noto Serif Devanagari", serif` — **Restrained accent only** (e.g., city name in Devanagari on the hero banner: "दिल्ली"). **NEVER use for UI buttons, tabs, or general body copy.**

### 2.1 Type Scale Reference

| Scale Step | Class / Utility | Font Family | Size / Leading / Tracking | Best Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Display XL** | `.type-display-xl` | Fraunces (700) | `clamp(2.75rem, 6vw, 4.5rem)`<br>`leading-[0.92]` `tracking-[-0.03em]` | Hero title only (one per city page). |
| **Display** | `.type-display` | Fraunces (600) | `clamp(2rem, 4.2vw, 3.25rem)`<br>`leading-[0.98]` `tracking-[-0.02em]` | Major feature hero / section titles. |
| **H1** | `.type-h1` | Fraunces (600) | `clamp(1.625rem, 3vw, 2.25rem)`<br>`leading-[1.15]` `tracking-[-0.02em]` | Primary section headers. |
| **H2** | `.type-h2` | Fraunces (600) | `clamp(1.375rem, 2.4vw, 1.75rem)`<br>`leading-[1.20]` `tracking-[-0.015em]` | Card collection titles, modal headings. |
| **H3** | `.type-h3` | Fraunces (600) | `clamp(1.125rem, 1.8vw, 1.375rem)`<br>`leading-[1.25]` `tracking-[-0.01em]` | Sub-card headers, place card names. |
| **Body Large** | `.type-body-lg` | Inter (400) | `1.125rem (18px)`<br>`leading-[1.6]` `tracking-normal` | Introductory lead paragraphs. |
| **Body** | `.type-body` | Inter (400) | `1rem (16px)`<br>`leading-[1.6]` `tracking-normal` | Default body copy, descriptions. |
| **Body Small** | `.type-body-sm` | Inter (400) | `0.875rem (14px)`<br>`leading-[1.6]` `tracking-normal` | Card descriptions, secondary text. |
| **Caption** | `.type-caption` | Inter (400) | `0.75rem (12px)`<br>`leading-[1.4]` `tracking-[0.01em]` | Metadata, photo credits, helper notes. |
| **Overline** | `.type-overline` | Inter (600) | `0.6875rem (11px)`<br>`leading-[1.4]` `tracking-[0.14em] uppercase` | Section eyebrows, category tags. |
| **Numeral** | `.numeral` | Inter | Tabular numerals + slashed zero | Statistics counters, prices, crowd metrics. |

> 💡 **Editorial Typography Rule**: Pair genuinely large display headlines with genuinely small, crisp supporting text. Avoiding mid-sized typography everywhere is what gives FINDIA its premium travel magazine feel.

---

## 3. The Signature Three-Tier Glass System

Use **only** these three utilities. Never hand-roll ad-hoc blur values.

### 3.1 Tier 1: Heavy Glass (`.glass-heavy`)
- **Visuals**: `backdrop-blur: 24px`, `saturate: 1.4`, 13% white background, top-lit border (brighter top edge), warm outer shadow + inner highlight.
- **Fallback**: `@supports not (backdrop-filter)` degrades to `#1A1714` (solid raised).
- **Use Cases**: Top navigation bar, floating AI assistant panel, modal dialogs, city switcher dropdown.

### 3.2 Tier 2: Panel Glass (`.glass-panel`)
- **Visuals**: `backdrop-blur: 16px`, `saturate: 1.2`, 7.5% white background, subtle border with top highlight, gentle shadow.
- **Fallback**: `@supports not (backdrop-filter)` degrades to `#241F1A` (solid overlay).
- **Use Cases**: Hero search bar, floating stats strip, preview cards that overlap photography.

### 3.3 Tier 3: Chip Glass (`.glass-chip`)
- **Visuals**: `backdrop-blur: 8px`, 35% black background (darkens bright imagery behind it), hairline border.
- **Fallback**: `@supports not (backdrop-filter)` degrades to `#1A1714` with subtle border.
- **Use Cases**: Badges, category pills, bookmark buttons placed on top of photography.

### 3.4 Strict Glass Rules
1. **Glass must ONLY sit on top of photography or gradients.** On a flat dark surface, glass reads as muddy grey plastic. If a panel is on a flat surface, use `bg-bg-raised` instead.
2. **Never nest glass inside glass.** Blurring an already-blurred layer produces rendering artifacts and mud.
3. **Always rely on the built-in solid fallback.** Never remove the `@supports not (backdrop-filter)` rules.

---

## 4. Gradients, Texture & Elevation

- **Scrim Bottom (`.scrim-bottom`)**: Multi-stop easing dark gradient for legibility over photos. Never use a harsh 2-stop linear gradient.
- **Scrim Full (`.scrim-full`)**: Softer all-over ambient darkening for hero photography.
- **Noise Grain (`.grain`)**: Fixed SVG noise texture at 3% opacity. Adds film-like tactile depth over gradients.
- **Shadow Scale**:
  - `shadow-soft`: Micro elevation for chips and floating buttons (`0 2px 8px`).
  - `shadow-card`: Standard card resting elevation (`0 4px 20px`).
  - `shadow-lifted`: Hover card and popover elevation (`0 12px 36px`).
  - `shadow-glass`: Signature glass panel drop shadow (`0 8px 32px`).
- **Radius Scale**:
  - `rounded-sharp` (`0px`): Editorial list rows, photographic grid items.
  - `rounded-xs` (`4px`): Micro badges, tags.
  - `rounded-sm` (`6px`): Buttons, input fields.
  - `rounded-md` (`10px`): Dropdowns, list item cards.
  - `rounded-lg` (`14px`): Standard feature cards.
  - `rounded-xl` (`20px`): Modals, hero panels, floating panels.
  - `rounded-pill` (`9999px`): Filter pills, status badges.

---

## 5. Motion Discipline

FINDIA relies on calm, restrained editorial interactions:
- **Duration Tokens**: `duration-fast` (150ms), `duration-base` (250ms), `duration-slow` (400ms), `duration-reveal` (600ms).
- **Easings**: `ease-out-soft` (`cubic-bezier(0.16, 1, 0.3, 1)`), `ease-reveal` (`cubic-bezier(0.22, 1, 0.36, 1)`).
- **Reduced Motion**: Automatically respected globally. All transitions and animations collapse to `0.01ms` under `prefers-reduced-motion: reduce`.
- **Discipline Rule**: The app has ONE signature interaction (smooth drawer/panel reveal); everything else stays calm and instant. Do not animate every hover.

---

## 6. Accessibility Ratios (WCAG AA Verified)

| Pair | Role | Hex Codes | Contrast Ratio | WCAG AA Status |
| :--- | :--- | :--- | :--- | :--- |
| `text-high` on `bg-base` | Primary content on canvas | `#F8F3EC` on `#12100E` | **17.24:1** | PASS (AAA) |
| `text-mid` on `bg-base` | Body copy on canvas | `#BFB3A4` on `#12100E` | **9.22:1** | PASS (AAA) |
| `text-low` on `bg-raised` | Muted copy on card surface | `#8A7F72` on `#1A1714` | **4.56:1** | PASS (AA Body) |
| `text-high` on `accent-500` (Delhi) | Button label on Sandstone | `#F8F3EC` on `#C1440E` | **4.64:1** | PASS (AA Body & Large) |
| `text-high` on `accent-500` (Jaipur)| Button label on Pink | `#F8F3EC` on `#C2185B` | **5.33:1** | PASS (AA Body & Large) |
| `crowd-low` on `bg-raised` | Status badge fill | `#2FA36B` on `#1A1714` | **5.59:1** | PASS (AA Body) |
| `crowd-moderate` on `bg-raised`| Status badge fill | `#E0A02E` on `#1A1714` | **7.85:1** | PASS (AA Body) |
| `crowd-heavy` on `bg-raised` | Status badge fill | `#E2603B` on `#1A1714` | **5.07:1** | PASS (AA Body) |
| `crowd-unknown` on `bg-raised` | Status badge fill | `#8A7F72` on `#1A1714` | **4.56:1** | PASS (AA Body) |

*Note*: `text-high` was calibrated to `#F8F3EC` (from `#F5EFE6`) specifically to lift contrast on Delhi's sandstone accent from 4.48:1 to 4.64:1, guaranteeing >= 4.5:1 body text compliance across all surfaces.

---

## 7. Developer Rules & Best Practices

### The 7 Team Commandments
1. **Never hardcode hex values**: Always use semantic Tailwind classes (`bg-bg-base`, `text-text-high`, `border-border-default`) or CSS variables (`var(--accent-500)`).
2. **Never hardcode an accent color**: Adding a city in the future must require 0 component edits.
3. **Always isolate feature code**: Work exclusively in your designated `src/features/<feature-name>/` directory.
4. **Import shared components only**: Import from `src/components/common/` and `src/components/layout/`. Never duplicate a button or card.
5. **Glass only on photography**: Never place a glass utility on a flat surface; use `bg-bg-raised` or `bg-bg-overlay`.
6. **Never nest glass inside glass**: Keep your visual hierarchy single-layered.
7. **Pair crowd colors with icons**: Always include the status dot/indicator icon for color-blind accessibility.

---

## 8. Do / Don't Checklist

### DO:
- ✅ **DO** use `.glass-heavy` for floating headers and `.glass-chip` for image pills.
- ✅ **DO** pair large `.type-display` headings with small `.type-body-sm` or `.type-overline` text.
- ✅ **DO** use `var(--accent-soft)` for subtle highlight panels instead of inventing new opacity values.
- ✅ **DO** test your feature with both Delhi and Jaipur active to ensure color swappability.
- ✅ **DO** use `.numeral` on stats, prices, and telemetry counters for tabular digit alignment.
- ✅ **DO** verify interactive elements carry a clear `:focus-visible` outline.

### DON'T:
- ❌ **DON'T** use pure black `#000000` or cold slate `#0F172A`. All dark tones must have warm brown/amber undertones.
- ❌ **DON'T** use `font-deva` for standard UI labels or navigation buttons. It is reserved for cultural accents.
- ❌ **DON'T** nest a `.glass-chip` inside a `.glass-panel`.
- ❌ **DON'T** add arbitrary blur values like `backdrop-blur-[7px]`. Stick strictly to the three glass utilities.
- ❌ **DON'T** write ad-hoc hover animations or bouncy transitions. Keep interactions instant and calm.
- ❌ **DON'T** edit shared directories (`src/components/`, `src/config/`, `src/styles/`) from a feature branch without core alignment.
