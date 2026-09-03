/**
 * ==============================================================================
 * MOCK CONVERSATION DATA
 * TODO: Replace this mock dataset with live Supabase / LLM API endpoint integration.
 * ==============================================================================
 */

export const MOCK_CONVERSATION = [
  {
    id: 'msg-1',
    sender: 'user',
    text: 'Chandni Chowk is completely packed right now. Any quieter alternatives within walking distance?',
    timestamp: 'Just now',
  },
  {
    id: 'msg-2',
    sender: 'assistant',
    text: 'Old Delhi gets intense around noon. Head a few hundred meters off the main road into the quieter haveli alleys instead of fighting the main bazaar crowd.',
    timestamp: 'Just now',
    alternatives: [
      {
        id: 'alt-1',
        title: 'Mirza Ghalib Haveli',
        distance: '450m walk (6 min)',
        crowdLevel: 'low',
        crowdUpdatedAt: '2 min ago',
        description: 'Serene 19th-century courtyard dedicated to the Urdu poet, tucked inside the quiet Ballimaran lane.',
      },
      {
        id: 'alt-2',
        title: 'Fatehpuri Masjid Courtyard',
        distance: '600m walk (8 min)',
        crowdLevel: 'moderate',
        crowdUpdatedAt: '5 min ago',
        description: 'Tranquil 1650 red sandstone mosque at the western terminus of the street, with a quiet reflecting pond.',
      },
      {
        id: 'alt-3',
        title: 'Khari Baoli Spice Roof',
        distance: '800m walk (10 min)',
        crowdLevel: 'low',
        crowdUpdatedAt: 'just now',
        description: 'Elevated terrace above the wholesale spice market offering dramatic open air and fresh breezes.',
      },
    ],
  },
];

export const SUGGESTION_CHIPS = [
  'Too crowded here',
  'Quiet places nearby',
  'Plan my day',
  'Is it open now?',
  'Stepwells near me',
];
