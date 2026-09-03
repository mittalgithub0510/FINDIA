# FINDIA — 5-Minute Hackathon Demo Script & Judge Q&A

---

## 1. Quick Presentation Outline (5 Minutes Total)

| Minute | Stage | Action / Screen | Core Message to Judges |
|---|---|---|---|
| **0:00 - 0:45** | The Problem | Landing Page Hero | "Traditional travel apps send everyone to the same three gates at noon. Delhi has 150+ monuments; we route by crowd load, not ratings." |
| **0:45 - 1:45** | Landing & Signature UX | Scroll to Hidden Gems | Hover on *03 Khirki Masjid* (clipped reveal): "Notice the honesty: we tell you there are no signposts and the gates are locked behind ASI fencing." |
| **1:45 - 2:45** | **WOW Moment 1: AI Assistant** | Click Sparkle Button | Trigger AI assistant: "Chandni Chowk is at 92% capacity right now. The assistant reroutes you to Mirza Ghalib Haveli, 12 minutes away on the Yellow Line." |
| **2:45 - 3:45** | **WOW Moment 2: City Switch** | Click City Switcher | Select **Jaipur**: "Watch the entire app instantaneously re-theme to Pink (`#C2185B`), update Devanagari branding (`जयपुर`), and switch emergency helplines with zero reload." |
| **3:45 - 4:15** | Safety & Emergency | Navigate to `/sos` | Show large direct-dial emergency tiles (112, 100) and live location dispatch shell. |
| **4:15 - 5:00** | Architecture & Closing | Show `FEATURE_OWNERSHIP.md` | "Built as an isolated team architecture where 6 engineers build in parallel without merge conflicts." Open for Q&A. |

---

## 2. Step-by-Step Click Path & Talk Track

### 1. Landing Page (`/`)
- **Action**: Open `http://localhost:5173/`.
- **What to say**:
  > *"This is FINDIA. Notice the quiet greeting at the top: 'Good afternoon in Delhi'. Our headline is an opinionated statement: 'Most guidebooks point at the same three gates. Delhi has three hundred.' Look at the floating card on the right: real-time telemetry showing Red Fort ticket lines are at 45 minutes, while Sunder Nursery has direct entry."*

### 2. Signature Interaction: Hidden Gems
- **Action**: Scroll smoothly down past the asymmetric Places grid to Section 4: *Forgotten Masonry & Stepwells*.
- **Action**: Hover cursor over row `03 Khirki Masjid`.
- **What to say**:
  > *"Instead of another generic carousel, we built an editorial numbered archive. Hovering row 03 smoothly displays the archival photograph and our verified ground condition: '89 roof domes, but no signposts exist inside the residential alleys.' Honesty stops this from sounding like a marketing brochure."*

### 3. WOW Moment 1: AI Crowd Assistant
- **Action**: Click the floating circular sparkle button at the bottom-right.
- **What to say**:
  > *"When a traveler encounters sudden crowding, they tap the assistant. In this seeded query, the traveler asks where to escape crowds near Chandni Chowk. Notice how the assistant returns structured AlternativeCards with walking distance and verified crowd badges: Mirza Ghalib Haveli (8 mins walk, Low crowd) and Fatehpuri Masjid Courtyard."*

### 4. WOW Moment 2: Instant Multi-City Switch
- **Action**: Close assistant. Click the City Switcher pill in the navbar.
- **Action**: Click **Jaipur**.
- **What to say**:
  > *"This is our core architectural achievement. FINDIA is not hardcoded to Delhi. With one click, the active city switches to Jaipur. Every button, glow ring, overline, and Devanagari wordmark instantaneously re-colors to Hawa Mahal Pink (`#C2185B`). The emergency contacts update to Jaipur police, and the entire layout remains identical. Adding a third city like Varanasi takes literally one config file."*

### 5. Emergency Safety Hub (`/sos`)
- **Action**: Click the persistent red SOS button in the navbar.
- **What to say**:
  > *"Physical safety is non-negotiable for solo travelers. Notice our emergency tiles: massive tap targets connecting directly to 112, 100, and women helplines. No complex forms; direct carrier telephone dialing in under 2 seconds."*

---

## 3. Tough Judge Questions & Honest Answers

### Q1: "Is the crowd telemetry live or mocked?"
> **Answer**: *"For today's hackathon demo, the telemetry is seeded from verified historical crowd curves and DMRC exit patterns in `src/data/delhi/places.js`. Our Technical Design Document (`docs/TLD.md`) outlines our production three-tier ingestion pipeline: Google Popular Times API, DMRC smart card exit volumes, and verified traveler geofenced pings decaying over 45 minutes."*

### Q2: "Why didn't you include an interactive map on the place page?"
> **Answer**: *"We made a deliberate engineering decision to cut Mapbox GL from our P0 bundle to keep payload size under 300 kB and First Contentful Paint under 600ms. More importantly, in dense urban quarters like Shahjahanabad, GPS pins drift by 40 meters. Detailed, concrete instructions from the nearest metro gate ('Exit Gate 2, walk 800m eastward on Lodhi Road') are far more actionable for real travelers."*

### Q3: "How does the team build features in parallel without merge conflicts?"
> **Answer**: *"We established an isolated feature-ownership architecture (`docs/FEATURE_OWNERSHIP.md`). Six developers each own an isolated folder in `src/features/` and their respective data file. They import shared layout primitives and icons as read-only components. Shared components, routing, and design tokens are locked from direct edits."*

### Q4: "How difficult is it to add another city like Mumbai or Varanasi?"
> **Answer**: *"It requires exactly two files: `src/config/cities/varanasi.js` for the color ramp and emergency helplines, and `src/data/varanasi/places.js` for the site facts. Our city registry auto-discovers city files via `import.meta.glob`. Zero component or layout edits are required."*
