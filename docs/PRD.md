# FINDIA — Product Requirements Document (PRD)

---

## 1. Problem Statement

Modern travel platforms (Google Maps, TripAdvisor, MakeMyTrip) optimize for static popularity ratings and linear geographic distance. In dense heritage capitals like Delhi, this algorithmic bias produces severe crowd aggregation:
- Tens of thousands of travelers are directed to the same three monuments (Red Fort, Qutub Minar, India Gate) at the identical midday hours.
- Visitors spend up to 45 minutes in unshaded ticket queues, enduring temperatures exceeding 42°C during summer months.
- Over 140 architectural marvels (such as fourteenth-century Tughlaq dams, secluded Lodi garden tombs, and medieval stepwells) sit virtually deserted just hundreds of meters away from choked corridors.
- Existing apps offer no ground reality checks: they do not warn travelers when a gate is locked for stadium repair, when entry requires cash versus UPI QR codes, or when forest guards close park access at 5:30 PM.

---

## 2. Target Personas

1. **Independent Heritage Travelers & First-Time Visitors**:
   - *Need*: Want to understand Indian architecture deeply without getting trapped in tourist bus herds or commercial shopping traps.
   - *Pain Point*: Intimidated by chaotic navigation and unverified ticket queues.
2. **Solo & Women Travelers**:
   - *Need*: Transparent safety guidance, direct-dial police connections, verified meeting groups, and clear instructions for navigating women-reserved metro coaches.
   - *Pain Point*: Hesitant to explore off-the-beaten-path ruins without confirmed daylight timings and reliable transport links.
3. **Domestic Weekend Travelers & Commuters**:
   - *Need*: Quick, high-efficiency itineraries that sequence visits around metro lines and avoid weekend afternoon surges.
   - *Pain Point*: Frustrated by spending precious weekend leisure hours trapped in monument traffic bottlenecks.
4. **Local Cultural Stewards & Heritage Walk Leaders (Supply Side)**:
   - *Need*: Platform to coordinate historical sketching walks, stepwell surveys, and morning architectural documentation.

---

## 3. The Core Insight

> **Travel routing must optimize for crowd telemetry and transit friction, not merely geographic proximity.**

A stepwell located 3 kilometers away that takes 12 minutes via direct Delhi Metro transit with zero queue is superior to a crowded bazaar located 500 meters away that requires pushing through 40 minutes of stationary pedestrian gridlock.

---

## 4. Feature Matrix & Priority

| Feature | Description | User Value | Priority | Status | Owning Feature Folder |
|---|---|---|---|---|---|
| **Global Application Shell** | Responsive fixed navbar, scroll transparency, dynamic city switcher, Devanagari branding, and footer. | Instant navigation, city context re-theming, and persistent emergency dialing. | **P0** | Built | `src/components/layout/` |
| **Landing Hero & Telemetry** | Full-bleed hero with time-aware greeting, opinionated headline, live crowd right now card, and stats counters. | Communicates real-time value proposition within 5 seconds of visit. | **P0** | Built | `src/components/landing/` |
| **AI Crowd Assistant** | Floating widget offering conversational low-crowd alternative rerouting (*Mirza Ghalib Haveli*, *Fatehpuri Masjid*). | On-demand alternative discovery when major attractions become congested. | **P0** | Shell Built | `src/features/crowd-assistant/` |
| **Emergency SOS Dial & Sheet** | Persistent emergency button opening active city direct-dial helplines (112, 100, 102). | Unconditional physical safety and one-tap emergency calling. | **P0** | Shell Built | `src/features/safety-sos/` |
| **Places Directory & Detail** | Searchable site cards with metro lines, fees, audio guide player shell, and hourly crowd histograms. | Verified transit instructions and crowd-by-hour planning. | **P0** | Shell Built | `src/features/places/` |
| **Hidden Gems Archive** | Editorial register of 8–10 lesser-known sites with verified inconvenient ground truths. | Authentic discoveries free of tourist congestion. | **P0** | Shell Built | `src/features/hidden-gems/` |
| **Itinerary Day Planner** | 2-step scheduler: input parameter form + static generated multi-stop timeline with metro transitions. | Automated crowd-optimized day sequencing. | **P0** | Shell Built | `src/features/itinerary-planner/` |
| **Community Forum & Field Reports** | Traveler message board with category tags and distinct lost-and-found notice styling. | Hyper-local ground intelligence (gate closures, UPI requirements). | **P1** | Shell Built | `src/features/community/` |
| **Travel Together Meetup Board** | Open walking groups showing dates, hosts, spots remaining, and meeting metro stations. | Safe, collaborative morning architectural trails for solo travelers. | **P1** | Shell Built | `src/features/travel-together/` |
| **Live SMS Location Dispatch** | Broadcast high-accuracy GPS coordinates and nearest metro gate to emergency contacts via SMS. | Rapid emergency broadcasting in cellular dead zones. | **P1** | Shell Planned | `src/features/safety-sos/` |
| **Vector Map Canvas** | Interactive MapLibre / Leaflet map displaying monument pins and metro interchange walking paths. | Spatial orientation for visual navigators. | **P2** | Shell Marked | `src/features/places/` |
| **Live Audio Streaming** | In-browser streaming player for 3-minute architectural guides narrated by historians. | On-site educational enrichment without hired guides. | **P2** | Shell Marked | `src/features/places/` |

---

## 5. Hackathon P0 Scope & Intentional Cuts

### What is Included in P0 (Demo Ready):
1. Complete visual design system with dark warm palette and CSS-first `@theme` tokens.
2. Full multi-city runtime re-theming engine demonstrated across Delhi and Jaipur.
3. Complete application shell, accessible skip links, and full routing for 10 distinct routes.
4. Flagship Landing Page with live crowd snapshot and signature hover photo reveal.
5. Interactive AI Crowd Assistant demo conversation with recommendation cards.
6. Persistent Emergency SOS modal and dedicated `/sos` helpline directory.
7. Feature starter shells with factual descriptions and checkable inconvenient truths.

### What Was Deliberately Cut from P0 (and Why):
- **No Native Map Engine**: Vector maps require large WebGL bundles (Mapbox GL ~800kB). Replaced with clear metro transit walking directions, which are faster to load and more actionable in dense Delhi alleys.
- **No Complex Auth System**: Forcing user login before exploring places creates immediate onboarding drop-off. Public browsing is 100% friction-free; auth will only be required for thread posting.
- **No Fake Form Submissions**: Forms currently operate in transparent mock state with explicit `ComingSoonNote` callouts rather than pretending to write to a fake backend.

---

## 6. Success Metrics

1. **Crowd Diversion Rate**: Percentage of users who choose a low-congestion alternative card over a peak-congestion monument when prompted by the AI assistant. (Target: > 28%).
2. **Transit Accuracy**: Zero reported discrepancies between recommended Delhi Metro stations and actual monument pedestrian access gates.
3. **Emergency Accessibility**: Median time to initiate an emergency call via the SOS button under 2.5 seconds from any screen in the app.
4. **Load & Bundle Performance**: Initial bundle payload under 300 kB gzipped, with First Contentful Paint (FCP) under 800ms on 4G networks.

---

## 7. Known Limitations & Real-World Telemetry Roadmap

### Current Limitation:
Crowd density indicators (`low`, `moderate`, `heavy`) and hourly histograms currently render from structured seed datasets (`src/data/delhi/places.js`).

### Production Sourcing Architecture:
In production, crowd telemetry will be sourced via a hybrid three-tier pipeline:
1. **Aggregated Popular Times & Anonymized Cell Signals**: Ingestion of Google Places Popular Times API and municipal pedestrian sensor feeds.
2. **Delhi Metro Smart Card Tap-Out Volumes**: DMRC publishes hourly station exit volumes; high exit volumes at stations like *Chandni Chowk* or *Central Secretariat* directly correlate with monument surges.
3. **Verified Traveler Ground Pings**: Verified travelers within 100m of a monument gate submit 1-tap crowd pings, weighted by karma score and timestamp decay.
