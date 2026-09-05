import React, { useState } from 'react';
import {
  Sparkle,
  MapPin,
  Calendar,
  Users,
  Clock,
  Compass,
  Utensils,
  Metro,
  ChevronLeft,
  ChevronRight,
  Check,
  Flame,
} from '../../components/icons';
import { cn } from '../../utils/cn';

const POPULAR_DESTINATIONS = [
  { id: 'Delhi', label: 'Delhi (NCT)', tag: 'Live Active', desc: 'Monuments, Bazaars & Metro', active: true, state: 'Delhi' },
  { id: 'Prayagraj', label: 'Prayagraj (UP)', tag: 'Live Active', desc: 'Triveni Sangam, Fort & Ghats', active: true, state: 'Uttar Pradesh' },
  { id: 'Jaipur', label: 'Jaipur (RJ)', tag: 'Pink City', desc: 'Amber Fort & Hawa Mahal', state: 'Rajasthan' },
  { id: 'Varanasi', label: 'Varanasi (UP)', tag: 'Spiritual Ghats', desc: 'Ganga Aarti & Ancient Lanes', state: 'Uttar Pradesh' },
  { id: 'Agra', label: 'Agra (UP)', tag: 'Mughal Heritage', desc: 'Taj Mahal & Agra Fort', state: 'Uttar Pradesh' },
  { id: 'Goa', label: 'Goa', tag: 'Coast & Chill', desc: 'Beaches, Forts & Cafes', state: 'Goa' },
];

const QUICK_PRESETS_BY_CITY = {
  Delhi: [
    {
      id: 'delhi_heritage_3d',
      title: '3-Day Classic Delhi Heritage',
      desc: 'Red Fort, Qutub, Humayun’s Tomb + Sunder Nursery',
      days: 3,
      groupType: 'couple',
      travelersCount: 2,
      vibe: ['heritage', 'nature'],
      budget: 'moderate',
      dietary: 'all',
    },
    {
      id: 'delhi_foodie_weekend',
      title: '2-Day Old Delhi Foodie Crawl',
      desc: 'Chandni Chowk parathas, Karim’s, Majnu Ka Tilla',
      days: 2,
      groupType: 'friends',
      travelersCount: 4,
      vibe: ['foodie', 'shopping'],
      budget: 'budget',
      dietary: 'streetfood',
    },
    {
      id: 'delhi_relaxed_solo',
      title: '1-Day Calm Solo Exploration',
      desc: 'Agrasen ki Baoli, Lodhi Art District, Sunder Nursery',
      days: 1,
      groupType: 'solo',
      travelersCount: 1,
      vibe: ['relaxed', 'hidden_gems'],
      budget: 'budget',
      dietary: 'veg',
    },
  ],
  Prayagraj: [
    {
      id: 'prayagraj_sangam_3d',
      title: '3-Day Holy Sangam & Grand Heritage',
      desc: 'Triveni Sangam boat, Bade Hanuman Ji, Akbar Fort, Anand Bhavan',
      days: 3,
      groupType: 'family',
      travelersCount: 4,
      vibe: ['heritage', 'nature'],
      budget: 'moderate',
      dietary: 'veg',
    },
    {
      id: 'prayagraj_spiritual_1d',
      title: '1-Day Spiritual Ghats & Netram Kachori',
      desc: 'Sunrise boat dip, Lete Hanuman Ji, Netram jalebi & Chowk',
      days: 1,
      groupType: 'solo',
      travelersCount: 1,
      vibe: ['relaxed', 'foodie'],
      budget: 'budget',
      dietary: 'streetfood',
    },
    {
      id: 'prayagraj_culture_2d',
      title: '2-Day Anand Bhavan, Literature & Food',
      desc: 'Alfred Park, All Saints Cathedral, Civil Lines & Raja Ram Lassi',
      days: 2,
      groupType: 'couple',
      travelersCount: 2,
      vibe: ['heritage', 'foodie'],
      budget: 'moderate',
      dietary: 'all',
    },
  ],
};

const VIBE_OPTIONS = [
  {
    id: 'heritage',
    icon: '🏛️',
    label: 'Heritage & History',
    desc: 'Mughal & Sultanate monuments, UNESCO tombs, museums',
  },
  {
    id: 'foodie',
    icon: '🍲',
    label: 'Foodie & Street Food',
    desc: 'Iconic street food lanes, legendary dhabas, authentic taste',
  },
  {
    id: 'relaxed',
    icon: '🧘',
    label: 'Relaxed & Peaceful',
    desc: 'Slow pace, heritage gardens, quiet stepwells, scenic cafes',
  },
  {
    id: 'packed',
    icon: '⚡',
    label: 'Fast & High Energy',
    desc: 'Cover maximum iconic landmarks from morning to night',
  },
  {
    id: 'nature',
    icon: '🌿',
    label: 'Nature & Greenery',
    desc: 'Botanical parks, lake promenades, early morning walks',
  },
  {
    id: 'hidden_gems',
    icon: '💎',
    label: 'Hidden Gems & Low Crowd',
    desc: 'Offbeat courtyards and trails avoiding tourist crowds',
  },
  {
    id: 'shopping',
    icon: '🛍️',
    label: 'Bazaars & Shopping',
    desc: 'Dilli Haat handicrafts, Janpath, spice markets, textiles',
  },
];

const GROUP_OPTIONS = [
  { id: 'solo', label: 'Solo Traveler', icon: '🧍', defaultCount: 1, desc: 'Solo adventure' },
  { id: 'couple', label: 'Couple / Duo', icon: '👫', defaultCount: 2, desc: 'Romantic & curated' },
  { id: 'family', label: 'Family Trip', icon: '👨‍👩‍👧‍👦', defaultCount: 4, desc: 'Kids & seniors friendly' },
  { id: 'friends', label: 'Friends Group', icon: '🎒', defaultCount: 4, desc: 'Vibrant & energetic' },
];

const BUDGET_OPTIONS = [
  {
    id: 'budget',
    label: 'Budget / Pocket-Friendly',
    icon: '🪙',
    range: '₹800 – ₹2,000 / day',
    desc: 'Delhi Metro, authentic street food, free entry monuments & hostels',
  },
  {
    id: 'moderate',
    label: 'Balanced / Comfort',
    icon: '💳',
    range: '₹2,000 – ₹5,000 / day',
    desc: 'Cabs & Metro, heritage cafes, boutique stays & guided tickets',
  },
  {
    id: 'luxury',
    label: 'Premium / Luxury',
    icon: '👑',
    range: '₹5,000+ / day',
    desc: 'Chauffeur car, fine dining, 5-star heritage hotels & private tours',
  },
];

const DIETARY_OPTIONS = [
  { id: 'all', label: 'No Restrictions / All Foods', icon: '🍽️', desc: 'Open to all cuisines' },
  { id: 'veg', label: 'Pure Vegetarian', icon: '🥗', desc: 'No meat, pure veg eateries' },
  { id: 'nonveg', label: 'Non-Veg Specialties', icon: '🍗', desc: 'Mughlai kebabs, butter chicken, biryani' },
  { id: 'jain', label: 'Jain / Vegan Friendly', icon: '🍃', desc: 'No root vegetables or plant-based' },
  { id: 'streetfood', label: 'Street Food Fanatic', icon: '🌶️', desc: 'Must-visit iconic food lanes' },
];

export function TripPlannerWizard({
  onGenerate,
  isGenerating,
  initialDestination = 'Delhi',
  initialSpecialRequest = '',
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const normalizedInitial =
    initialDestination &&
    (initialDestination.toLowerCase().includes('prayagraj') ||
      initialDestination.toLowerCase().includes('allahabad'))
      ? 'Prayagraj'
      : initialDestination || 'Delhi';

  // Form State
  const [destination, setDestination] = useState(normalizedInitial);
  const [customDestination, setCustomDestination] = useState('');
  const [days, setDays] = useState(3);
  const [groupType, setGroupType] = useState('couple');
  const [travelersCount, setTravelersCount] = useState(2);
  const [selectedVibes, setSelectedVibes] = useState(['heritage', 'foodie']);
  const [budget, setBudget] = useState('moderate');
  const [dietary, setDietary] = useState('all');
  const [transit, setTransit] = useState(normalizedInitial === 'Prayagraj' ? 'e_rickshaw' : 'metro');
  const [earlyStart, setEarlyStart] = useState(true);
  const [accessible, setAccessible] = useState(false);
  const [specialRequest, setSpecialRequest] = useState(initialSpecialRequest || '');

  const activeDestination = customDestination.trim() || destination;
  const isPrayagraj =
    activeDestination.toLowerCase().includes('prayagraj') ||
    activeDestination.toLowerCase().includes('allahabad');

  const activePresets = isPrayagraj
    ? QUICK_PRESETS_BY_CITY.Prayagraj
    : QUICK_PRESETS_BY_CITY.Delhi;

  const handleSelectCity = (cityId) => {
    setDestination(cityId);
    setCustomDestination('');
    if (cityId === 'Prayagraj') {
      setTransit('e_rickshaw');
    } else if (cityId === 'Delhi') {
      setTransit('metro');
    }
  };

  const toggleVibe = (id) => {
    setSelectedVibes((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((v) => v !== id) : prev;
      }
      return [...prev, id];
    });
  };

  const handleGroupSelect = (group) => {
    setGroupType(group.id);
    setTravelersCount(group.defaultCount);
  };

  const applyPreset = (preset) => {
    setDays(preset.days);
    setGroupType(preset.groupType);
    setTravelersCount(preset.travelersCount);
    setSelectedVibes(preset.vibe);
    setBudget(preset.budget);
    setDietary(preset.dietary);
    setCurrentStep(3);
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onGenerate({
      destination: activeDestination,
      days,
      groupType,
      travelersCount,
      vibe: selectedVibes,
      budget,
      dietary,
      transit,
      earlyStart,
      accessible,
      specialRequest: specialRequest.trim(),
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* 🌟 1. State / Live City Focus Selector */}
      <div className="p-4 sm:p-6 rounded-3xl bg-bg-surface/90 border border-white/15 shadow-lifted backdrop-blur-md space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
              Select City / State to Inquire (Kahan Ghumna Chahte Hain?)
            </span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
            Real-Time Crowd Telemetry Active
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Delhi Option */}
          <button
            type="button"
            onClick={() => handleSelectCity('Delhi')}
            className={cn(
              'p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group',
              destination === 'Delhi' && !customDestination
                ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/50'
                : 'bg-bg-raised/60 border-white/10 hover:border-white/25 hover:bg-bg-raised'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🏛️</span>
                <div>
                  <div className="font-display font-bold text-base text-text-high group-hover:text-amber-300 transition-colors">
                    Delhi (NCT)
                  </div>
                  <div className="text-[11px] text-text-mid font-medium">National Capital Region</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● Live Active
              </span>
            </div>
            <p className="text-xs text-text-low mt-2 leading-relaxed">
              Mughal monuments, Red Fort, Chandni Chowk street food & precise Delhi Metro line routes.
            </p>
          </button>

          {/* Prayagraj Option */}
          <button
            type="button"
            onClick={() => handleSelectCity('Prayagraj')}
            className={cn(
              'p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden group',
              destination === 'Prayagraj' && !customDestination
                ? 'bg-amber-500/20 border-amber-400 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/50'
                : 'bg-bg-raised/60 border-white/10 hover:border-white/25 hover:bg-bg-raised'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🕉️</span>
                <div>
                  <div className="font-display font-bold text-base text-text-high group-hover:text-amber-300 transition-colors">
                    Prayagraj (UP)
                  </div>
                  <div className="text-[11px] text-text-mid font-medium">Uttar Pradesh • The Holy Sangam</div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                ● Live Active
              </span>
            </div>
            <p className="text-xs text-text-low mt-2 leading-relaxed">
              Triveni Sangam boats, Lete Hanuman Ji, Akbar Fort, Anand Bhavan, Netram Kachori & Raja Ram Lassi.
            </p>
          </button>
        </div>
      </div>

      {/* 🌟 2. 1-Click Fast Presets (Dynamically tailored to active city) */}
      <div className="p-4 sm:p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
            <Sparkle size={14} className="animate-pulse" />
            <span>
              {isPrayagraj ? 'Prayagraj 1-Click Curated Presets' : 'Delhi 1-Click Curated Presets'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-text-mid">
            Tap any preset to auto-configure
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {activePresets.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => applyPreset(p)}
              className="text-left p-3.5 rounded-xl bg-bg-surface/80 hover:bg-bg-raised border border-white/10 hover:border-amber-500/40 transition-all cursor-pointer group"
            >
              <div className="font-display font-bold text-sm text-text-high group-hover:text-amber-300 transition-colors">
                {p.title}
              </div>
              <div className="text-xs text-text-mid mt-1 line-clamp-1">{p.desc}</div>
              <div className="flex items-center gap-2 mt-2 text-[10px] font-mono text-amber-400">
                <span>{p.days} Days</span>
                <span>•</span>
                <span>{p.groupType}</span>
                <span>•</span>
                <span className="capitalize">{p.budget}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Wizard Form */}
      <div className="glass-heavy p-6 sm:p-10 rounded-3xl border border-white/15 shadow-lifted relative overflow-hidden">
        {/* Glow ambient background element */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Wizard Step Navigation */}
        <div className="mb-8 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Step {currentStep} of {totalSteps}
            </span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((stepNum) => (
                <button
                  key={stepNum}
                  type="button"
                  onClick={() => setCurrentStep(stepNum)}
                  className={cn(
                    'w-8 h-2 rounded-full transition-all cursor-pointer',
                    currentStep === stepNum
                      ? 'bg-amber-400 w-12'
                      : currentStep > stepNum
                        ? 'bg-amber-500/50'
                        : 'bg-white/15'
                  )}
                />
              ))}
            </div>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-text-high">
            {currentStep === 1 && 'Where & How Long? (Kahan & Kitne Din)'}
            {currentStep === 2 && 'Who & What Vibe? (Kitne Log & Kaise Ghumna Hai)'}
            {currentStep === 3 && 'Budget, Food & Transit (Kharcha, Khana & Commute)'}
          </h2>
          <p className="text-sm text-text-mid mt-1">
            {currentStep === 1 && 'Select your destination and trip duration to calculate crowd patterns.'}
            {currentStep === 2 && 'Tell us your group size and desired pace so Findia AI can tune walking & wait times.'}
            {currentStep === 3 && 'Finalize meal preferences and transit to generate the complete custom itinerary.'}
          </p>
        </div>

        {/* STEP 1: DESTINATION & DURATION */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Destination Selection */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <MapPin size={14} className="text-amber-400" />
                <span>Choose Destination</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {POPULAR_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => {
                      setDestination(dest.id);
                      setCustomDestination('');
                    }}
                    className={cn(
                      'p-3.5 rounded-xl text-left border transition-all cursor-pointer relative',
                      destination === dest.id && !customDestination
                        ? 'bg-amber-500/20 border-amber-400 text-text-high shadow-sm shadow-amber-500/20 ring-1 ring-amber-400/40'
                        : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20 hover:text-text-high'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-bold text-sm text-text-high">{dest.label}</span>
                      {dest.active && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          Live
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-text-low block mt-1">{dest.desc}</span>
                  </button>
                ))}
              </div>

              {/* Custom Destination Field */}
              <div className="pt-2">
                <input
                  type="text"
                  placeholder="Or enter any other Indian city / region (e.g. Udaipur, Amritsar, Rishikesh)..."
                  value={customDestination}
                  onChange={(e) => setCustomDestination(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-bg-surface/80 border border-white/15 text-sm text-text-high placeholder-text-low focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all"
                />
              </div>
            </div>

            {/* Duration / Number of Days */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <Calendar size={14} className="text-amber-400" />
                <span>Kitne Din Ka Plan Banana Hai? (Trip Duration)</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {[
                  { d: 1, label: '1 Day', sub: 'Express' },
                  { d: 2, label: '2 Days', sub: 'Weekend' },
                  { d: 3, label: '3 Days', sub: 'Classic 🌟' },
                  { d: 5, label: '5 Days', sub: 'Complete' },
                  { d: 7, label: '7 Days', sub: 'Grand Tour' },
                ].map((item) => (
                  <button
                    key={item.d}
                    type="button"
                    onClick={() => setDays(item.d)}
                    className={cn(
                      'p-3 rounded-xl text-center border transition-all cursor-pointer',
                      days === item.d
                        ? 'bg-amber-500 text-bg-base font-bold border-amber-400 shadow-md shadow-amber-500/30'
                        : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/25 hover:text-text-high'
                    )}
                  >
                    <div className="text-base font-bold">{item.label}</div>
                    <div className={cn('text-[11px]', days === item.d ? 'text-bg-base/80 font-medium' : 'text-text-low')}>
                      {item.sub}
                    </div>
                  </button>
                ))}
              </div>

              {/* Slider for custom days */}
              <div className="flex items-center gap-4 pt-3 px-1">
                <span className="text-xs text-text-mid font-mono">Custom Days:</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="flex-1 accent-amber-400 cursor-pointer"
                />
                <span className="text-sm font-mono font-bold text-amber-400 w-12 text-right">
                  {days} {days === 1 ? 'day' : 'days'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: GROUP SIZE & TRAVEL STYLE */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Group Type */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <Users size={14} className="text-amber-400" />
                <span>Kitne Log Ho Aap? (Who is Traveling?)</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {GROUP_OPTIONS.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleGroupSelect(g)}
                    className={cn(
                      'p-4 rounded-xl text-left border transition-all cursor-pointer',
                      groupType === g.id
                        ? 'bg-amber-500/20 border-amber-400 text-text-high ring-1 ring-amber-400/30'
                        : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20 hover:text-text-high'
                    )}
                  >
                    <div className="text-2xl mb-1">{g.icon}</div>
                    <div className="font-display font-bold text-sm text-text-high">{g.label}</div>
                    <div className="text-xs text-text-low mt-0.5">{g.desc}</div>
                  </button>
                ))}
              </div>

              {/* Number of Travelers Counter */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-bg-surface/60 border border-white/10 mt-3">
                <div>
                  <div className="text-xs font-semibold text-text-high">Total Number of People</div>
                  <div className="text-[11px] text-text-low">Adjust exact head count for transport & ticket math</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelersCount((c) => Math.max(1, c - 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-text-high flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-mono font-bold text-lg text-amber-300 w-6 text-center">
                    {travelersCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setTravelersCount((c) => Math.min(20, c + 1))}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-text-high flex items-center justify-center font-bold text-base cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Kaise Ghumna Hai (Vibe / Travel Style) */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <Compass size={14} className="text-amber-400" />
                <span>Kaise Ghumna Hai? (Travel Style & Vibes — Multi-select)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {VIBE_OPTIONS.map((vibe) => {
                  const isSelected = selectedVibes.includes(vibe.id);
                  return (
                    <button
                      key={vibe.id}
                      type="button"
                      onClick={() => toggleVibe(vibe.id)}
                      className={cn(
                        'p-3.5 rounded-xl text-left border transition-all cursor-pointer flex items-start gap-3',
                        isSelected
                          ? 'bg-amber-500/15 border-amber-400/80 text-text-high'
                          : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20 hover:text-text-high'
                      )}
                    >
                      <span className="text-2xl shrink-0 mt-0.5">{vibe.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-display font-bold text-sm text-text-high">{vibe.label}</span>
                          {isSelected && <Check size={16} className="text-amber-400" />}
                        </div>
                        <span className="text-xs text-text-low block mt-1">{vibe.desc}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: BUDGET, FOOD & COMMUTE */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fadeIn">
            {/* Daily Budget Level */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <Flame size={14} className="text-amber-400" />
                <span>Budget Kaisa Rakhna Hai? (Per Person Daily)</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUDGET_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setBudget(b.id)}
                    className={cn(
                      'p-4 rounded-xl text-left border transition-all cursor-pointer',
                      budget === b.id
                        ? 'bg-amber-500/20 border-amber-400 text-text-high ring-1 ring-amber-400/30'
                        : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20 hover:text-text-high'
                    )}
                  >
                    <div className="text-2xl mb-1">{b.icon}</div>
                    <div className="font-display font-bold text-sm text-text-high">{b.label}</div>
                    <div className="text-xs font-mono text-amber-400 font-semibold my-1">{b.range}</div>
                    <div className="text-xs text-text-low">{b.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary & Food Preferences */}
            <div className="space-y-3">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                <Utensils size={14} className="text-amber-400" />
                <span>Khane-Peene Ki Preference? (Food & Diet)</span>
              </label>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {DIETARY_OPTIONS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDietary(d.id)}
                    className={cn(
                      'p-3 rounded-xl text-left border transition-all cursor-pointer',
                      dietary === d.id
                        ? 'bg-amber-500/20 border-amber-400 text-text-high'
                        : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20 hover:text-text-high'
                    )}
                  >
                    <div className="flex items-center gap-1.5 mb-1">
                      <span>{d.icon}</span>
                      <span className="font-display font-bold text-xs text-text-high">{d.label}</span>
                    </div>
                    <span className="text-[11px] text-text-low line-clamp-1">{d.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Transit Mode & Timing Preferences */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                  <Metro size={14} className="text-amber-400" />
                  <span>
                    {isPrayagraj ? 'Commute in Prayagraj' : 'Commute Preference'}
                  </span>
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(isPrayagraj
                    ? [
                        { id: 'e_rickshaw', label: 'Eco E-Rickshaw', sub: 'Flat ₹10-20 Citywide' },
                        { id: 'boat_auto', label: 'Sangam Boat + Auto', sub: 'Ghats & Riverfront' },
                        { id: 'cab', label: 'Cab / Private Auto', sub: 'Direct Comfort' },
                      ]
                    : [
                        { id: 'metro', label: 'Delhi Metro', sub: 'Fast & Cheap' },
                        { id: 'cab', label: 'Cab / Auto', sub: 'Direct Pickup' },
                        { id: 'mixed', label: 'Mixed', sub: 'Metro + Auto' },
                      ]
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setTransit(t.id)}
                      className={cn(
                        'p-2.5 rounded-xl text-center border text-xs font-semibold transition-all cursor-pointer',
                        transit === t.id
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-1 ring-amber-400/40'
                          : 'bg-bg-surface/60 border-white/10 text-text-mid hover:border-white/20'
                      )}
                    >
                      <div className="font-bold">{t.label}</div>
                      <div className="text-[10px] text-text-low font-normal mt-0.5">{t.sub}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Toggles */}
              <div className="space-y-2">
                <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold flex items-center gap-1.5">
                  <Clock size={14} className="text-amber-400" />
                  <span>Smart Preferences</span>
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-surface/60 border border-white/10 cursor-pointer hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={earlyStart}
                      onChange={(e) => setEarlyStart(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-xs text-text-high">
                      Early morning starts (6:00/7:30 AM) to beat crowd & heat
                    </span>
                  </label>
                  <label className="flex items-center gap-2 p-2.5 rounded-xl bg-bg-surface/60 border border-white/10 cursor-pointer hover:border-white/20">
                    <input
                      type="checkbox"
                      checked={accessible}
                      onChange={(e) => setAccessible(e.target.checked)}
                      className="accent-amber-400 w-4 h-4 rounded cursor-pointer"
                    />
                    <span className="text-xs text-text-high">
                      Accessible / Minimal walking (For seniors or kids)
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Custom Request */}
            <div className="space-y-2">
              <label className="text-xs uppercase font-mono tracking-wider text-text-high font-semibold block">
                Any specific spot you MUST visit? (Special Wishlist)
              </label>
              <textarea
                rows="2"
                placeholder={
                  isPrayagraj
                    ? 'e.g. Triveni Sangam mein sunrise boat ride karni hai, Netram ki kachori khani hai, Lete Hanuman Ji darshan, Anand Bhavan & Khusro Bagh...'
                    : 'e.g. Qutub Minar at sunset dekhna hai, Chandni Chowk paratha wali gali jaana hai, Dilli Haat shopping...'
                }
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-bg-surface/80 border border-white/15 text-sm text-text-high placeholder-text-low focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all resize-none"
              />
            </div>
          </div>
        )}

        {/* Wizard Footer / Actions */}
        <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between gap-4">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s - 1)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-text-high text-xs font-semibold transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={() => setCurrentStep((s) => s + 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors shadow-lifted cursor-pointer"
            >
              <span>Continue</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              type="button"
              disabled={isGenerating}
              onClick={handleSubmit}
              className={cn(
                'inline-flex items-center gap-2 px-7 py-3 rounded-xl font-display font-bold text-sm transition-all shadow-lifted cursor-pointer',
                isGenerating
                  ? 'bg-amber-500/50 text-bg-base/70 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-bg-base shadow-lg shadow-amber-500/30 hover:scale-[1.02]'
              )}
            >
              <Sparkle size={18} className={cn(isGenerating ? 'animate-spin' : 'animate-pulse')} />
              <span>{isGenerating ? 'Sequencing Itinerary...' : 'Generate AI Itinerary ✨'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
