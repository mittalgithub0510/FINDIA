# FINDIA Feature Ownership & Team Collaboration Guide

This document defines the architectural boundaries, folder ownership, and contribution rules for all team members building on FINDIA.

---

## 1. Non-Negotiable Collaboration Rules

1. **Own Your Folder Exclusively**:
   - Work **only** inside your assigned directory (`src/features/<feature>/`) and your data file (`src/data/<city>/<feature>.js`).
   - Never edit another teammate's feature directory.
2. **Never Edit Shared Core Files Directly**:
   - **DO NOT** edit:
     - Shared components in `src/components/common/`
     - Shared layout primitives in `src/components/layout/`
     - Global design tokens or stylesheets in `src/styles/index.css`
     - City registries in `src/config/cities/`
     - Application routing in `src/routes.js` or `src/App.jsx`
   - If a shared component requires an additional prop or variant, **submit a pull request request/comment** with the proposed backwards-compatible addition rather than editing the file directly.
3. **No Hardcoded Hex Values**:
   - Use semantic Tailwind tokens (`bg-bg-raised`, `text-text-high`, `text-brand`, `border-border-default`) and `--accent-*` CSS variables.
4. **No Marketing Jargon**:
   - Preserve editorial restraint. Strictly avoid: *discover*, *explore*, *curated*, *seamless*, *unlock*, *immersive*, *journey*, *embark*, *vibrant*, *bustling*, *breathtaking*, *nestled*, *unforgettable*, *must-visit*, *rich history*, *hidden gem* (in prose), and AI poetry.
5. **Concrete Facts & Real Ground Truths**:
   - Every site description must contain at least one verifiable fact: a year, a fee, a metro station, an operating hour. Admit inconvenient ground truths honestly.

---

## 2. Feature Ownership Matrix

| Feature Area | Folder Location | Owned Routes | Mock Data File | Primary Focus |
|---|---|---|---|---|
| **Places Directory** | `src/features/places/` | `/places`, `/places/:slug`, `/districts/:slug` | `src/data/delhi/places.js` | Search filter engine, map canvas, audio guide player |
| **Hidden Gems** | `src/features/hidden-gems/` | `/hidden-gems` | `src/data/delhi/hiddenGems.js` | Editorial archive, ground advisories, field submissions |
| **Itinerary Planner** | `src/features/itinerary-planner/` | `/plan` | `src/data/delhi/itinerary.js` | Algorithmic scheduler, metro transfer calculation, LLM generation |
| **Community Forum** | `src/features/community/` | `/community`, `/community/:threadId` | `src/data/delhi/community.js` | Field reports, lost & found tracker, threaded discussions |
| **Travel Together** | `src/features/travel-together/` | `/travel-together` | `src/data/delhi/travelTogether.js` | Walking group board, spots management, participant chat |
| **Safety & SOS** | `src/features/safety-sos/` | `/sos` | `src/data/delhi/safety.js` | Direct helplines, live SMS location dispatch, hospital locator |
| **AI Crowd Assistant**| `src/features/crowd-assistant/` | Global floating shell | `src/features/crowd-assistant/mockConversation.js` | Realtime alternative rerouting, conversational assistance |

---

## 3. Exact TODOs Left in Feature Starter Shells

### Places (`src/features/places/`)
- [ ] Connect `FilterBar` category chips to URL search parameters (`?category=stepwells`).
- [ ] Implement multi-district dropdown filter and sort control (`least crowded`, `nearest metro`).
- [ ] Mount interactive vector map (MapLibre / Leaflet) inside the marked `MAP CANVAS PLACEHOLDER` in `PlaceDetailPage.jsx`.
- [ ] Connect audio guide play/pause and progress bar to live CDN MP3 streaming audio in `PlaceDetailPage.jsx`.

### Hidden Gems (`src/features/hidden-gems/`)
- [ ] Implement community site suggestion modal and submission review queue.
- [ ] Connect offline GPS waypoint coordinates export for stepwell surveyors.

### Itinerary Planner (`src/features/itinerary-planner/`)
- [ ] Hook Step 1 form inputs to the Edge Function route generation endpoint (`POST /api/generate-itinerary`).
- [ ] Implement multi-day tabs (Day 1, Day 2, Day 3) in the generated timeline output.
- [ ] Calculate live running ticket totals and metro fare estimations.

### Community Forum (`src/features/community/`)
- [ ] Connect `Start a Discussion` button to authenticated Supabase insert dialog.
- [ ] Wire threaded reply composer in `ThreadDetailPage.jsx` to `community_replies` table.
- [ ] Add category filter state persistence.

### Travel Together (`src/features/travel-together/`)
- [ ] Connect `Request to Join` button to user attendance confirmation modal.
- [ ] Implement `Create a Group` modal capturing host verification, dates, and meeting metro stations.

### Safety & SOS (`src/features/safety-sos/`)
- [ ] Wire `Share Live Location via SMS` button to browser `navigator.geolocation.getCurrentPosition()`.
- [ ] Format emergency SMS text with GPS coordinates and nearest Delhi Metro gate.
- [ ] Mount interactive hospital and police station pins on the marked map placeholder.
