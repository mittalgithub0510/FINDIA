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
Your goal is to build realistic, culturally rich, crowd-optimized day-by-day itineraries across Indian cities, with specialized in-depth intelligence for Delhi (NCT) and Prayagraj (Uttar Pradesh).

CRITICAL PLANNING PRINCIPLES:
1. CROWD TELEMETRY: Sequence monuments to avoid peak hours. Place popular monuments early morning (7:00-9:30 AM) or late afternoon. Never schedule crowded open-air sites in midday heat.
2. CITY-SPECIFIC TRANSIT INTELLIGENCE:
   - For Delhi: Group geographically close attractions. Specify exact Delhi Metro stations and lines (e.g. Yellow Line, Violet Line, Blue Line) to prevent cross-city traffic delays.
   - For Prayagraj: Specify eco E-Rickshaws (flat ₹10-20), government-authorized wooden boats for Triveni Sangam, shared tempos, and proximity to railway stations (Prayagraj Junction PRYJ, Subedarganj, Prayag).
3. CULINARY EXCELLENCE:
   - For Delhi: Chandni Chowk parathas, Karim's korma, Haldiram's, Hauz Khas cafes, Pandara Road butter chicken, Dilli Haat.
   - For Prayagraj: Netram Mulchand & Sons (desi ghee kachori-sabzi & jalebi), Dehati Ke Rasgulle (Civil Lines), Raja Ram Lassi (Civil Lines), Loknath Gali / Sulaki Chaat (dahi batasha & palak chaat), Kamdhenu Sweets, El Chico.
4. ACCURACY: Include realistic entrance ticket fees (in ₹ INR), operating days (e.g., Anand Bhavan closed Mondays, Red Fort closed Mondays), and walking considerations.
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

  const isPrayagraj =
    dest.toLowerCase().includes('prayagraj') ||
    dest.toLowerCase().includes('allahabad') ||
    dest.toLowerCase().includes('sangam') ||
    dest.toLowerCase().includes('anand-bhavan') ||
    dest.toLowerCase().includes('khusro-bagh');

  // ============================================================================
  // PRAYAGRAJ (UTTAR PRADESH) TEMPLATES
  // ============================================================================
  const prayagrajTemplates = [
    {
      dayNumber: 1,
      dayTitle: 'Sacred Confluence & Divine Legends',
      theme: 'Triveni Sangam Sunrise, Reclining Hanuman & Akbar’s Fort',
      morning: {
        time: '05:45 AM - 09:30 AM',
        place: 'Triveni Sangam & Bade Hanuman Ji Temple',
        metro: 'Kila Ghat / Sangam Ghat (Govt Boat & E-Rickshaw)',
        crowdLevel: 'low',
        fee: 'Free (Govt Shared Boat ₹60-₹80 / Private ₹450-₹600)',
        description:
          'Witness the confluence of the holy Ganga, Yamuna, and mythical Saraswati at sunrise. Take an authorized wooden boat into the calm waters, feed migratory Siberian gulls in season, and seek blessings at the subterranean Lete Hanuman Ji shrine.',
        tip: 'Reach Kila Ghat before 6:30 AM for undisturbed sunrise photography and peaceful temple darshan before festival queues start.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: 'Netram Mulchand & Sons (Katra / Chowk)',
        famousDish: 'Desi Ghee Bedmi Kachori with Hing Aloo Sabzi, Boondi Raita & Crispy Jalebi',
        dietary: '160-Year-Old Legendary Pure Veg Institution',
        priceRange: isBudget ? '₹120 - ₹200' : '₹250 - ₹400',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'Akbar’s Allahabad Fort & Patalpuri Temple',
        metro: 'Bandh Road / Fort Corridor (E-Rickshaw ₹15)',
        crowdLevel: 'moderate',
        fee: 'Free ASI entry (Akshaya Vat section)',
        description:
          'Explore Emperor Akbar’s 1583 grand red-sandstone fortress overlooking the confluence. Step down into the cool subterranean Patalpuri Temple to view the immortal banyan tree (Akshaya Vat).',
        tip: 'Carry government photo ID (Aadhaar or Passport) for security clearance at the army section.',
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'Arail Ghat Riverfront Promenade & Boat Sunset',
        metro: 'New Yamuna Bridge corridor / Arail Ghat (Auto or Boat)',
        crowdLevel: 'low',
        fee: 'Free Public Ghats',
        description:
          'A serene, paved modern promenade on the southern Yamuna bank. Enjoy dramatic twilight views of the illuminated cable-stayed bridge and tranquil sandbank breezes.',
        tip: 'Best spot for tranquil meditation and photography away from boat bargaining hubs.',
      },
      dinner: {
        time: '08:00 PM - 10:00 PM',
        restaurant: isLuxury ? 'El Chico Restaurant (Civil Lines)' : 'Dehati Rasgulle & Royal Tandoor (Civil Lines)',
        vibe: 'Civil Lines heritage dining with iconic Awadhi-North Indian specialties',
        priceRange: isBudget ? '₹200 - ₹350' : '₹600 - ₹1,400',
      },
      crowdProTip:
        'Avoid visiting Bade Hanuman Ji on Tuesday or Saturday evenings when waiting times exceed 90 minutes. Early sunrise darshan is completely peaceful.',
      transitAdvice: 'Take an E-Rickshaw to Kila Ghat (₹20), then a government-rate wooden boat to Sangam.',
    },
    {
      dayNumber: 2,
      dayTitle: 'Freedom Struggle & Victorian Grandeur',
      theme: 'Anand Bhavan, Alfred Park, All Saints Cathedral & Street Food',
      morning: {
        time: '08:30 AM - 11:30 AM',
        place: 'Anand Bhavan & Swaraj Bhavan',
        metro: 'Tagore Town / Colonelganj (E-Rickshaw ₹15)',
        crowdLevel: 'low',
        fee: '₹70 (Museum) / Planetarium ₹100',
        description:
          'The historic neoclassical ancestral home of Motilal and Jawaharlal Nehru, which served as the brain center of India’s freedom movement. Stroll through the lush heritage gardens and vintage library rooms.',
        tip: 'Book the 10:30 AM English/Hindi sky show at the Jawahar Planetarium; Anand Bhavan is closed on Mondays.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: 'Indian Coffee House (Civil Lines) or Kamdhenu Sweets',
        famousDish: 'Classic Dosa & Filter Coffee / UP Royal Thali & Gulab Jamun',
        dietary: 'Colonial Vintage Intellectual Hub & Pure Veg Delicacies',
        priceRange: isBudget ? '₹150 - ₹250' : '₹400 - ₹700',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'Chandrashekhar Azad Park (Alfred Park) & Allahabad Museum',
        metro: 'Civil Lines / Thornhill Road',
        crowdLevel: 'low',
        fee: '₹5 (Park) + ₹50 (Allahabad Museum)',
        description:
          '133-acre verdant central park where legendary freedom fighter Chandrashekhar Azad made his heroic final stand. The Allahabad Museum on grounds exhibits Bharhut stone sculptures and Nehru’s personal letters.',
        tip: 'The museum galleries are fully air-conditioned — an ideal educational retreat during sunny afternoon hours.',
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'All Saints Cathedral (Patthar Girja)',
        metro: 'MG Marg, Civil Lines (Walking / E-Rickshaw)',
        crowdLevel: 'low',
        fee: 'Free Entry',
        description:
          'A majestic 13th-century style Gothic Revival cathedral designed by Sir William Emerson. Stained glass rose windows and hand-carved stone pulpit create an atmosphere of European tranquility.',
        tip: 'Visit between 5 PM and 6 PM to hear the evening bells echo across Civil Lines.',
      },
      dinner: {
        time: '08:00 PM - 10:00 PM',
        restaurant: 'Raja Ram Lassi & Sulaki Chaat (Civil Lines / Loknath)',
        vibe: 'Thick malai kulhad lassi paired with crispy dahi batasha and palak chaat',
        priceRange: isBudget ? '₹150 - ₹300' : '₹400 - ₹800',
      },
      crowdProTip:
        'Civil Lines MG Marg becomes pedestrian-friendly in the evening. Stroll between Patthar Girja and Subhash Chauraha for hassle-free shopping.',
      transitAdvice: 'All Day 2 attractions are within a 2.5 km circle in Civil Lines; E-Rickshaws (₹10-15) are instantaneous.',
    },
    {
      dayNumber: 3,
      dayTitle: 'Mughal Mausoleums & Waterfront Serenity',
      theme: 'Khusro Bagh, Yamuna Riverfront, Siberian Gulls & Bazaars',
      morning: {
        time: '08:00 AM - 11:30 AM',
        place: 'Khusro Bagh Mughal Quadrangle',
        metro: 'Near Prayagraj Junction (PRYJ) Railway Station',
        crowdLevel: 'low',
        fee: 'Free Entry (ASI Protected)',
        description:
          'A grand walled Mughal Charbagh housing the ornate red sandstone mausoleums of Prince Khusro and Princess Nithar Begum. Intricate chhatris, Persian floral inscriptions, and surrounded by famous Allahabad guava trees.',
        tip: 'Morning 8 AM sunlight illuminates the intricate sandstone lattice carvings without a single tourist tour group in sight.',
      },
      lunch: {
        time: '12:30 PM - 02:00 PM',
        restaurant: isFoodie ? 'Hari Ram & Sons Hing Kachori (Loknath)' : 'Sagar Ratna Civil Lines',
        famousDish: isFoodie ? 'Signature Hing Kachori with Samosa & Aloo Dum' : 'Special South Indian Thali with Butter Lassi',
        dietary: preferences.dietary === 'veg' ? '120-Year-Old Old City Pure Veg Legacy' : 'Iconic Street Food & Multi-Cuisine',
        priceRange: isBudget ? '₹100 - ₹200' : '₹350 - ₹650',
      },
      afternoon: {
        time: '02:30 PM - 05:00 PM',
        place: 'Katra Bazaar & Thatheri Bazaar Heritage Walk',
        metro: 'Katra Old Core (Cycle Rickshaw ₹20)',
        crowdLevel: 'moderate',
        fee: 'Free Heritage Market Stroll',
        description:
          'Stroll through the lively student and traditional brass markets of old Prayagraj. Shop for exquisite brassware in Thatheri Bazaar, Chikan fabrics, and fresh red-spotted Allahabad guavas (surkha amrood).',
        tip: 'Cycle rickshaws glide through these narrow historic alleys much easier than e-rickshaws or autos.',
      },
      evening: {
        time: '05:30 PM - 07:30 PM',
        place: 'Boat Club & Saraswati Ghat Evening Aarti',
        metro: 'Yamuna Bank / Saraswati Ghat',
        crowdLevel: 'moderate',
        fee: 'Free Ghat Promenade',
        description:
          'Sit on the stone steps of Saraswati Ghat overlooking the broad Yamuna. Watch local wooden boats glide at dusk as temple bells and evening river aarti chants resonate.',
        tip: 'Grab a warm kulhad chai at the Boat Club cafe terrace while watching the dusk reflection.',
      },
      dinner: {
        time: '08:00 PM - 10:00 PM',
        restaurant: 'Tandoori Nights / Haldiram’s Bhikharam (Civil Lines)',
        vibe: 'Relaxed family dinner with hot rabdi-faluda and fresh jalebi sweets',
        priceRange: isBudget ? '₹200 - ₹350' : '₹500 - ₹1,000',
      },
      crowdProTip:
        'Do not take cars into Loknath Gali or Thatheri Bazaar; park at Civil Lines or the Railway Station and use cycle rickshaws.',
      transitAdvice: 'Cycle rickshaw for Old City bazaars; E-Rickshaw for the Yamuna riverfront.',
    },
  ];

  // ============================================================================
  // DELHI (NCT) TEMPLATES
  // ============================================================================
  const delhiDayTemplates = [
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

  const templates = isPrayagraj ? prayagrajTemplates : delhiDayTemplates;
  const selectedDays = templates.slice(0, numDays);

  const budgetEstimate = isBudget
    ? `₹${(isPrayagraj ? 800 : 1200) * numDays} – ₹${(isPrayagraj ? 1500 : 2000) * numDays}`
    : isLuxury
      ? `₹${(isPrayagraj ? 3500 : 5500) * numDays} – ₹${(isPrayagraj ? 6000 : 9000) * numDays}`
      : `₹${(isPrayagraj ? 1800 : 2600) * numDays} – ₹${(isPrayagraj ? 3000 : 4200) * numDays}`;

  const transitHighlight = isPrayagraj
    ? 'Govt-authorized Wooden Boat to Sangam + Eco E-Rickshaws (₹10-20 flat)'
    : 'Delhi Metro Smart Cards (Yellow & Violet Lines) + E-Rickshaw hops';

  const vibeSummary = isPrayagraj
    ? `Sequenced around peaceful Sangam sunrise boat slots, Bade Hanuman Ji crowd avoidance, and authentic Prayagraj food (Netram, Raja Ram, Dehati).`
    : `Sequenced around low-congestion morning windows, verified Metro transit, and authentic ${preferences.dietary || 'local'} cuisine.`;

  return {
    tripTitle: `${numDays}-Day Curated ${isPrayagraj ? 'Prayagraj (UP)' : dest} Crowd-Optimized Journey`,
    destination: isPrayagraj ? 'Prayagraj' : dest,
    duration: numDays,
    groupDescription: `${travelers} traveler${travelers > 1 ? 's' : ''} (${preferences.groupType})`,
    vibeSummary,
    estimatedBudgetTotal: budgetEstimate,
    transitHighlight,
    days: selectedDays,
  };
}
