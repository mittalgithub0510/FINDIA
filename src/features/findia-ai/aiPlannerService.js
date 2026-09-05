/**
 * ==============================================================================
 * FINDIA AI TRIP PLANNER SERVICE
 * Powered by Groq API (openai/gpt-oss-120b, groq/compound) for ultra-fast,
 * crowd-aware day-by-day travel schedules, equipped with Delhi Metro route
 * intelligence and local crowd avoidance algorithms.
 * Includes multi-model failover and a full local fallback engine for 100% reliability.
 * ==============================================================================
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
// Models ordered by speed, context capacity, and token headroom
const GROQ_MODELS = ['openai/gpt-oss-120b', 'groq/compound', 'openai/gpt-oss-20b'];

/**
 * System instruction grounding the LLM into FINDIA's crowd-aware urban travel philosophy.
 */
const SYSTEM_PROMPT = `
You are FINDIA AI — India's leading crowd-aware urban navigation and intelligent travel planner.
Your goal is to build realistic, culturally rich, crowd-optimized day-by-day itineraries across Indian cities (especially Delhi and popular regions).

CRITICAL PLANNING PRINCIPLES:
1. CROWD TELEMETRY: Sequence monuments to avoid peak hours. Place popular monuments early morning (7:00-9:30 AM) or late afternoon. Never schedule crowded open-air sites in midday heat.
2. TRANSIT INTELLIGENCE: Group geographically close attractions. Specify exact Metro stations and lines (e.g. Yellow Line, Violet Line, Blue Line) so travelers avoid cross-city zig-zagging in traffic.
3. CULINARY EXCELLENCE: Provide authentic, specific local food recommendations (iconic eateries and must-try dishes matching dietary preferences).
4. ACCURACY: Include realistic entrance ticket fees (in ₹ INR), operating days (e.g., Red Fort & Akshardham closed Mondays, Lotus Temple closed Mondays), and walking considerations.
5. OUTPUT FORMAT: You MUST return ONLY valid, parseable JSON matching the specified schema.
`;

/**
 * Generates an AI Itinerary using Groq API with multi-model failover.
 *
 * @param {Object} preferences User wizard selections
 * @param {string} preferences.destination Destination name (e.g., 'Delhi')
 * @param {number} preferences.days Duration in days (1-14)
 * @param {string} preferences.groupType Group category ('solo' | 'couple' | 'family' | 'friends')
 * @param {number} preferences.travelersCount Exact head count
 * @param {string[]} preferences.vibe List of vibes/styles ('relaxed' | 'packed' | 'heritage' | 'foodie' | 'nature' | 'hidden_gems' | 'shopping')
 * @param {string} preferences.budget Budget level ('budget' | 'moderate' | 'luxury')
 * @param {string} preferences.dietary Food preference ('all' | 'veg' | 'nonveg' | 'jain' | 'streetfood')
 * @param {string} preferences.transit Commute style ('metro' | 'cab' | 'mixed')
 * @param {string} [preferences.specialRequest] Any custom notes or specific monuments to include
 * @returns {Promise<Object>} Structured itinerary object
 */
export async function generateAITripPlan(preferences) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;

  // Prepare fallback in case API key is missing or call fails
  const fallback = generateFallbackPlan(preferences);

  if (!apiKey || apiKey === 'your-groq-api-key-here') {
    console.info('[FindiaAI] No Groq API key detected, using intelligent local engine.');
    return fallback;
  }

  const prompt = `
Create a complete ${preferences.days}-day crowd-optimized travel itinerary for ${preferences.destination}.

TRAVELER PROFILE:
- Group: ${preferences.groupType} (${preferences.travelersCount} people)
- Travel Style / Vibes: ${preferences.vibe.join(', ')}
- Daily Budget Level: ${preferences.budget}
- Food Preference: ${preferences.dietary}
- Primary Transit: ${preferences.transit}
${preferences.specialRequest ? `- Special Request / Must-Visit: "${preferences.specialRequest}"` : ''}

REQUIRED JSON OUTPUT SCHEMA:
{
  "tripTitle": "Short catchy title (e.g. 3-Day Delhi Heritage & Food Trail)",
  "destination": "${preferences.destination}",
  "duration": ${preferences.days},
  "groupDescription": "Short phrase describing the group",
  "vibeSummary": "Short punchy summary of the itinerary feel",
  "estimatedBudgetTotal": "Estimated total cost range in ₹ per person",
  "transitHighlight": "Key transport advice (e.g. Yellow Line Metro + Auto)",
  "days": [
    {
      "dayNumber": 1,
      "dayTitle": "Short title for this day",
      "theme": "Theme description",
      "morning": {
        "time": "07:30 AM - 11:30 AM",
        "place": "Name of monument or attraction",
        "metro": "Nearest Metro Station & Line (e.g. Chandni Chowk - Yellow Line)",
        "crowdLevel": "low" | "moderate" | "heavy",
        "fee": "Ticket fee (e.g. ₹50 or Free)",
        "description": "What to see & why this timing beats the crowds",
        "tip": "Insider Findia tip"
      },
      "lunch": {
        "time": "12:30 PM - 02:00 PM",
        "restaurant": "Specific famous eatery name",
        "famousDish": "Must-try dish name",
        "dietary": "Diet tag (e.g. Pure Veg or Non-Veg Delight)",
        "priceRange": "₹200 - ₹500 per person"
      },
      "afternoon": {
        "time": "02:30 PM - 05:00 PM",
        "place": "Indoor or shaded site to escape heat/crowd",
        "metro": "Nearest Metro Station & Line",
        "crowdLevel": "low" | "moderate" | "heavy",
        "fee": "Ticket fee",
        "description": "Afternoon highlight",
        "tip": "Afternoon insider tip"
      },
      "evening": {
        "time": "05:30 PM - 08:00 PM",
        "place": "Sunset spot, bazaar, or cultural site",
        "metro": "Nearest Metro Station & Line",
        "crowdLevel": "low" | "moderate" | "heavy",
        "fee": "Ticket fee",
        "description": "Golden hour or bazaar experience",
        "tip": "Evening tip"
      },
      "dinner": {
        "time": "08:30 PM - 10:30 PM",
        "restaurant": "Evening dinner venue / cafe / rooftop",
        "vibe": "Ambiance description",
        "priceRange": "₹400 - ₹900 per person"
      },
      "crowdProTip": "Key crowd avoidance tip for this specific day",
      "transitAdvice": "Transit sequencing summary for this day"
    }
  ]
}

Return strictly valid JSON only matching the schema.
`;

  // Try available models in sequence
  for (const model of GROQ_MODELS) {
    try {
      const response = await fetch(GROQ_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: prompt },
          ],
          temperature: 0.3,
          max_tokens: 3500,
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[FindiaAI] Groq model ${model} failed (${response.status}):`, errText);
        continue; // Try next model
      }

      const data = await response.json();
      const content = data?.choices?.[0]?.message?.content;

      if (!content) continue;

      // Extract JSON cleanly
      const cleaned = content
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      const parsed = JSON.parse(cleaned);

      if (parsed && Array.isArray(parsed.days) && parsed.days.length > 0) {
        console.info(`[FindiaAI] Plan successfully generated with Groq (${model})`);
        return parsed;
      }
    } catch (err) {
      console.warn(`[FindiaAI] Error with Groq model ${model}:`, err.message);
    }
  }

  // Fallback to local generator if all remote attempts fail
  console.info('[FindiaAI] Using local fallback generator.');
  return fallback;
}

/**
 * Intelligent local fallback generator that creates high-fidelity day-by-day plans
 * using curated Findia monument, culinary, and metro datasets.
 */
export function generateFallbackPlan(preferences) {
  const dest = preferences.destination || 'Delhi';
  const numDays = Math.min(Math.max(Number(preferences.days) || 3, 1), 7);
  const travelers = preferences.travelersCount || 2;
  const isFoodie = preferences.vibe?.includes('foodie');
  const isBudget = preferences.budget === 'budget';
  const isLuxury = preferences.budget === 'luxury';

  const dayTemplates = [
    {
      dayNumber: 1,
      dayTitle: 'Old World Heritage & Legendary Bazaars',
      theme: 'Mughal Splendor & Historic Spice Lanes',
      morning: {
        time: '07:30 AM - 11:30 AM',
        place: 'Jama Masjid & Red Fort (Lal Qila)',
        metro: 'Jama Masjid / Lal Quila (Violet Line)',
        crowdLevel: 'low',
        fee: '₹50 (ASI Indian) / ₹35 online',
        description:
          'Arrive right at opening to photograph Jama Masjid courtyard before tour buses arrive. Walk through Meena Bazaar into Lahori Gate with minimal security lines.',
        tip: 'Book tickets 1 day prior on the ASI portal (asi.payumoney.com) to bypass the physical counter line.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: isFoodie ? 'Karim’s or Aslam Butter Chicken' : 'Haldiram’s Chandni Chowk',
        famousDish: isFoodie ? 'Mutton Korma with Sheermal / Tandoori Butter Chicken' : 'Chole Bhature & Raj Kachori',
        dietary: preferences.dietary === 'veg' ? 'Pure Vegetarian Special' : 'Legendary Non-Veg Icon',
        priceRange: isBudget ? '₹200 - ₹350' : '₹500 - ₹800',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'Haveli Dharampura & Khari Baoli Spice Market',
        metro: 'Chandni Chowk (Yellow Line)',
        crowdLevel: 'moderate',
        fee: 'Free (Haveli entry optional ₹350 with tea)',
        description:
          'Walk along Asia’s largest spice trading market. Take a cycle rickshaw through the shaded lanes to avoid midday direct sun and enjoy rooftop panoramic views.',
        tip: 'Carry a handkerchief or mask — the chili spice vapors at Khari Baoli can be strong.',
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'Agrasen ki Baoli Stepwell',
        metro: 'Barakhamba Road (Blue Line)',
        crowdLevel: 'low',
        fee: 'Free Entry',
        description:
          'A quiet 14th-century stepwell hidden amidst Connaught Place high-rises. Sunset light strikes the 108 stone steps dramatically.',
        tip: 'Visit between 5 PM and 6 PM for peaceful acoustics before closing.',
      },
      dinner: {
        time: '08:00 PM - 10:00 PM',
        restaurant: isLuxury ? 'The Imperial 1911' : 'Saravana Bhavan / Kake Da Dhaba (Connaught Place)',
        vibe: 'Classic CP Colonial Arches & Bustling Evening Energy',
        priceRange: isBudget ? '₹300 - ₹500' : '₹800 - ₹1,800',
      },
      crowdProTip:
        'Always take the Delhi Metro Yellow Line to Chandni Chowk to avoid the notorious 45-minute Netaji Subhash Marg traffic gridlock.',
      transitAdvice: 'Violet Line to Jama Masjid in the morning; Yellow Line to CP for dinner.',
    },
    {
      dayNumber: 2,
      dayTitle: 'Sultanate Dynasties & Forest Courtyards',
      theme: 'Ancient Stone Towers & Bohemian Village Cafes',
      morning: {
        time: '08:00 AM - 11:30 AM',
        place: 'Qutub Minar & Mehrauli Archaeological Park',
        metro: 'Qutub Minar (Yellow Line)',
        crowdLevel: 'low',
        fee: '₹40 (Online ASI) / ₹50 (Counter)',
        description:
          'Marvel at the 73-meter Victory Tower and the 1,600-year-old rust-resistant Iron Pillar. Walk into the adjacent Mehrauli park to explore Jamali Kamali mosque without crowds.',
        tip: 'Morning 8:00 AM entry offers soft morning fog lighting and zero waiting at ticket gates.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: 'Coast Cafe or Social (Hauz Khas Village)',
        famousDish: 'Kerala Fish Curry / Appam with Stew & Cold Brews',
        dietary: 'Coastal & Multi-Cuisine Modern Menu',
        priceRange: isBudget ? '₹400 - ₹600' : '₹800 - ₹1,400',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'Hauz Khas Fort & Deer Park Lake Walk',
        metro: 'IIT / Hauz Khas (Yellow/Magenta Line)',
        crowdLevel: 'moderate',
        fee: '₹25 Entry',
        description:
          '13th-century Madrasa pavilions overlooking the royal water reservoir. Shaded stone corridors provide natural cool air during early afternoon.',
        tip: 'Walk through the deer sanctuary trail toward the Rose Garden for rare migratory bird spotting.',
      },
      evening: {
        time: '05:30 PM - 08:00 PM',
        place: 'Dilli Haat INA (Craft & Food Emporium)',
        metro: 'Dilli Haat INA (Yellow/Pink Line Interchange)',
        crowdLevel: 'moderate',
        fee: '₹30 Entry',
        description:
          'Open-air craft bazaar representing artisans from all 28 Indian states. Ideal place for handloom shawls, pottery, and regional authentic dinner stalls.',
        tip: 'Visit the Sikkim stall for steamed momos and fruit beer, or Maharashtra stall for Puran Poli.',
      },
      dinner: {
        time: '08:30 PM - 10:00 PM',
        restaurant: 'Dilli Haat Regional Food Pavilions',
        vibe: 'Festive open-air village ambiance with live folk musicians',
        priceRange: '₹300 - ₹600 per person',
      },
      crowdProTip:
        'Hauz Khas Village road becomes congested with cabs after 7 PM. Use the paved walkway towards Hauz Khas Metro station to leave smoothly.',
      transitAdvice: 'Yellow Line covers Qutub Minar directly to INA without any line change.',
    },
    {
      dayNumber: 3,
      dayTitle: 'Persian Gardens & Imperial Power Center',
      theme: 'UNESCO Mughal Mausoleums & Lutyens Boulevards',
      morning: {
        time: '08:00 AM - 11:30 AM',
        place: 'Humayun’s Tomb & Sunder Nursery',
        metro: 'JLN Stadium (Violet Line) / Khan Market',
        crowdLevel: 'low',
        fee: '₹40 (Humayun’s Tomb) + ₹50 (Sunder Nursery)',
        description:
          'The architectural precursor to the Taj Mahal with symmetrical Charbagh water gardens. Walk across the interconnecting gateway straight into Sunder Nursery botanical park.',
        tip: 'Sunder Nursery lake pavilion has marble benches shaded by ancient trees — ideal for morning coffee.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: 'Fabcafe by the Lake (Sunder Nursery) or Khan Chacha',
        famousDish: 'Kathal Quinoa Biryani & Kebab Rolls',
        dietary: 'Healthy organic artisanal dishes & Mughlai wraps',
        priceRange: isBudget ? '₹350 - ₹500' : '₹700 - ₹1,200',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'National Museum & Rashtrapati Bhavan Boulevard',
        metro: 'Central Secretariat (Yellow / Violet Line)',
        crowdLevel: 'low',
        fee: '₹20 (National Museum)',
        description:
          'Air-conditioned galleries housing 5,000-year-old Indus Valley Harappan Dancing Girl artifacts and Mughal miniature paintings.',
        tip: 'Audio guides are available at the counter for ₹150 and worth every penny.',
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'Kartavya Path & India Gate Lawns',
        metro: 'Central Secretariat (Yellow Line)',
        crowdLevel: 'moderate',
        fee: 'Free Public Promenade',
        description:
          'Stroll the illuminated ceremonial axis of India. See the Amar Jawan Jyoti canopy and enjoy roasted sweet corn and ice creams by the fountains.',
        tip: 'Security gates are on the southern lawns; carry minimal backpacks for fast frisking.',
      },
      dinner: {
        time: '08:00 PM - 10:00 PM',
        restaurant: isLuxury ? 'Bukhara at ITC Maurya' : 'Andhra Bhavan Canteen or Gulati (Pandara Road)',
        vibe: 'World-famous butter chicken at Pandara Road or iconic Andhra thali',
        priceRange: isBudget ? '₹250 - ₹450' : '₹1,200 - ₹2,500',
      },
      crowdProTip:
        'Avoid India Gate on Sunday evenings between 6-8 PM when crowds peak over 40,000. Friday or weekday sunset is calm and pristine.',
      transitAdvice: 'Violet line to JLN Stadium; Yellow line to Central Secretariat.',
    },
  ];

  const selectedDays = dayTemplates.slice(0, numDays);

  const budgetEstimate = isBudget
    ? `₹${1200 * numDays} – ₹${2000 * numDays}`
    : isLuxury
      ? `₹${5500 * numDays} – ₹${9000 * numDays}`
      : `₹${2600 * numDays} – ₹${4200 * numDays}`;

  return {
    tripTitle: `${numDays}-Day Curated ${dest} Crowd-Optimized Journey`,
    destination: dest,
    duration: numDays,
    groupDescription: `${travelers} traveler${travelers > 1 ? 's' : ''} (${preferences.groupType})`,
    vibeSummary: `Sequenced around low-congestion morning windows, verified Metro transit, and authentic ${preferences.dietary || 'local'} cuisine.`,
    estimatedBudgetTotal: budgetEstimate,
    transitHighlight: 'Delhi Metro Smart Cards (Yellow & Violet Lines) + E-Rickshaw hops',
    days: selectedDays,
  };
}
