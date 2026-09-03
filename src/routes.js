/**
 * Central route definitions for FINDIA.
 * Used for navigation menus, sitemaps, and breadcrumbs.
 */
export const ROUTES = [
  {
    path: '/',
    name: 'Home',
    title: 'India Urban Navigation & Real-Time Crowd Telemetry',
    description: 'Findia monitors crowd congestion at monuments, stepwells, and bazaars across India.',
    navGroup: 'primary',
  },
  {
    path: '/places',
    name: 'Places',
    title: 'Monuments, Bazaars & Stepwells',
    description: 'Audited directory of historical sites in Delhi with confirmed metro transit lines and live visitor counts.',
    navGroup: 'primary',
  },
  {
    path: '/places/:slug',
    name: 'Place Detail',
    title: 'Place Details & Audio Guide',
    description: 'In-depth historical overview, transit directions, crowd-by-hour telemetry, and audio guide player.',
    navGroup: null,
  },
  {
    path: '/hidden-gems',
    name: 'Hidden Gems',
    title: 'Forgotten Masonry & Ancient Ruins',
    description: 'Unrecorded stepwells, hunting lodges, and ruined fortresses off the tourist trail.',
    navGroup: 'primary',
  },
  {
    path: '/plan',
    name: 'Plan',
    title: 'Crowd-Aware Itinerary Planner',
    description: 'Algorithmic day schedules sequenced around metro transfers and ticket queue curves.',
    navGroup: 'primary',
  },
  {
    path: '/community',
    name: 'Community',
    title: 'Traveler Forum & Field Reports',
    description: 'Ground reports, lost and found notices, safety tips, and travel questions.',
    navGroup: 'primary',
  },
  {
    path: '/community/:threadId',
    name: 'Thread Detail',
    title: 'Forum Thread',
    description: 'Community conversation and responses on Delhi travel.',
    navGroup: null,
  },
  {
    path: '/travel-together',
    name: 'Travel Together',
    title: 'Verified Group Meetups',
    description: 'Coordinate morning stepwell walks and group expeditions with fellow history enthusiasts.',
    navGroup: 'primary',
  },
  {
    path: '/sos',
    name: 'Safety SOS',
    title: 'Emergency Contacts & Police Helplines',
    description: 'Direct-dial emergency services, hospital casualty wards, and safety protocols.',
    navGroup: 'safety',
  },
  {
    path: '/districts/:slug',
    name: 'District',
    title: 'Municipal District Directory',
    description: 'Detailed breakdown of audited sites across each municipal zone.',
    navGroup: null,
  },
  {
    path: '/about',
    name: 'About',
    title: 'About the FINDIA Platform',
    description: 'Learn why crowd-aware telemetry matters and how multi-city expansion works.',
    navGroup: 'footer',
  },
];

export default ROUTES;
