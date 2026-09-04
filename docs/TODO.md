# FINDIA — Consolidated Team Backlog & TODO Tracker

This document compiles every deliberate engineering TODO remaining across the codebase, organized by feature ownership folder.

---

## 1. Places & Maps (`src/features/places/`)

- [ ] **URL Query Filtering**: Connect `FilterBar.jsx` category chips (`monument`, `stepwell`, `garden`) to `?category=` URL search query parameters.
- [ ] **Multi-District Sorting**: Implement sort selector in `PlacesPage.jsx` (`least crowded`, `nearest metro`, `alphabetical`) connected to Supabase query ordering.
- [ ] **Interactive Map Canvas**: Mount MapLibre GL / Leaflet vector map inside the marked placeholder in `PlaceDetailPage.jsx` displaying monument boundary geojson and metro walking paths.
- [ ] **Audio Streaming Endpoint**: Connect audio guide player in `PlaceDetailPage.jsx` to live CDN-hosted MP3 audio files (`audio_url`).

---

## 2. Hidden Gems (`src/features/hidden-gems/`)

- [ ] **Community Site Submissions**: Build modal form allowing verified travelers and heritage fellows to propose unrecorded stepwells and ruins.
- [ ] **Offline Waypoints Export**: Allow stepwell surveyors to export GPX/KML waypoint coordinates for offline field navigation.

---

## 3. Itinerary Planner (`src/features/itinerary-planner/`)

- [ ] **Edge Function AI Generation**: Hook Step 1 form inputs (days, budget, pace, crowd preference) to `POST /api/generate-itinerary`.
- [ ] **Multi-Day Timeline Tabs**: Implement Day 1, Day 2, and Day 3 view switching in `ItineraryPlannerPage.jsx`.
- [ ] **Dynamic Metro Fare Calculation**: Compute exact DMRC smart card token costs based on interchange hops.

---

## 4. Community Forum (`src/features/community/`)

- [ ] **Discussion Submission**: Connect `Start a Discussion` button in `CommunityPage.jsx` to Supabase `threads` insertion modal.
- [ ] **Threaded Reply Composer**: Wire disabled reply form in `ThreadDetailPage.jsx` to `community_replies` table.
- [ ] **Realtime Subscriptions**: Enable Supabase Realtime channel to display new incoming ground reports without page refresh.

---

## 5. Travel Together (`src/features/travel-together/`)

- [ ] **Join Request Modal**: Connect `Request to Join` button in `TravelTogetherPage.jsx` to user RSVP confirmation dialog.
- [ ] **Group Creation Form**: Build group creation flow capturing meeting metro gate, date, and participant cap.
- [ ] **Rendezvous Messaging**: Provide lightweight group coordinator chat for verified walk participants.

---

## 6. Safety & SOS (`src/features/safety-sos/`)

- [ ] **Browser Geolocation Hookup**: Wire `Share Live Location via SMS` button in `SafetyPage.jsx` and `SOSButton.jsx` to `navigator.geolocation.getCurrentPosition()`.
- [ ] **Emergency SMS Formatting**: Generate pre-filled SMS message containing GPS latitude/longitude and the nearest verified Delhi Metro station gate.
- [ ] **Hospital & Police Map Cluster**: Mount interactive map pins on the emergency facilities map canvas in `SafetyPage.jsx`.

---

## 7. AI Crowd Assistant (`src/features/crowd-assistant/`)

- [ ] **Live LLM API Streaming**: Connect `AssistantPanel.jsx` input form to streaming OpenAI/Gemini/Supabase edge function.
- [ ] **Dynamic Telemetry Injection**: Inject real-time crowd levels of the user's nearest monuments into the assistant context window.

---

## 8. Core Shell & Platform (`src/components/layout/`)

- [ ] **Global Search Dialog**: Wire navbar search icon button to a command palette modal (`Ctrl+K` search modal).
- [ ] **Custom SVG Brandmark**: Swap typography Fraunces wordmark with finalized responsive brand logo icon if desired.
