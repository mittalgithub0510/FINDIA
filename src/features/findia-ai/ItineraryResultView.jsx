import React, { useState, useMemo } from 'react';
import {
  Sparkle,
  Calendar,
  Clock,
  MapPin,
  Metro,
  Utensils,
  Ticket,
  Copy,
  Check,
  Printer,
  RotateCcw,
  Users,
  Compass,
  Flame,
  ChevronRight,
  Shield,
  MessageCircle,
  Star,
} from '../../components/icons';
import { CrowdBadge } from '../../components/common/CrowdBadge';
import { cn } from '../../utils/cn';
import { Link } from 'react-router-dom';
import { getRecommendedHotels, getTransitGuide } from './itineraryEnrichment';

export function ItineraryResultView({
  plan,
  onReset,
  onRefine,
  isRefining,
  userPreferences,
}) {
  const [activeDayIndex, setActiveDayIndex] = useState(0); // 0-based or -1 for all
  const [showAllDays, setShowAllDays] = useState(false);
  const [copied, setCopied] = useState(false);
  const [refinePrompt, setRefinePrompt] = useState('');
  const [showRefineBox, setShowRefineBox] = useState(false);

  const days = plan.days || [];
  const currentDay = days[activeDayIndex] || days[0];

  // Enrich itinerary with real Findia hotels + metro guide
  const recommendedHotels = useMemo(
    () => getRecommendedHotels(userPreferences),
    [userPreferences]
  );
  const transitGuide = useMemo(() => getTransitGuide(plan), [plan]);

  const handleCopyWhatsApp = () => {
    let text = `🇮🇳 *${plan.tripTitle || 'FINDIA AI Trip Itinerary'}*\n`;
    text += `📍 Destination: ${plan.destination} | 🗓️ Duration: ${plan.duration} Days\n`;
    text += `👥 Travelers: ${plan.groupDescription || userPreferences?.travelersCount + ' people'}\n`;
    text += `💰 Estimated Budget: ${plan.estimatedBudgetTotal || '₹2,500/day'}\n`;
    text += `🚇 Transit: ${plan.transitHighlight || 'Delhi Metro'}\n\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

    days.forEach((d) => {
      text += `📅 *DAY ${d.dayNumber}: ${d.dayTitle}*\n`;
      text += `_Theme: ${d.theme}_\n\n`;

      if (d.morning) {
        text += `🌅 *Morning (${d.morning.time}):* ${d.morning.place}\n`;
        text += `   🚇 Metro: ${d.morning.metro}\n`;
        text += `   🎟️ Fee: ${d.morning.fee} | Crowd: ${d.morning.crowdLevel}\n`;
        text += `   💡 Tip: ${d.morning.tip}\n\n`;
      }

      if (d.lunch) {
        text += `🍲 *Lunch (${d.lunch.time}):* ${d.lunch.restaurant}\n`;
        text += `   ✨ Famous Dish: ${d.lunch.famousDish}\n`;
        text += `   🥗 Type: ${d.lunch.dietary} (${d.lunch.priceRange})\n\n`;
      }

      if (d.afternoon) {
        text += `🏛️ *Afternoon (${d.afternoon.time}):* ${d.afternoon.place}\n`;
        text += `   🚇 Metro: ${d.afternoon.metro}\n`;
        text += `   💡 Tip: ${d.afternoon.tip}\n\n`;
      }

      if (d.evening) {
        text += `🌇 *Evening (${d.evening.time}):* ${d.evening.place}\n`;
        text += `   🚇 Metro: ${d.evening.metro}\n`;
        text += `   💡 Tip: ${d.evening.tip}\n\n`;
      }

      if (d.dinner) {
        text += `🌙 *Dinner (${d.dinner.time}):* ${d.dinner.restaurant}\n`;
        text += `   🍽️ Vibe: ${d.dinner.vibe} (${d.dinner.priceRange})\n\n`;
      }

      if (d.crowdProTip) {
        text += `⚡ *Findia Crowd Advisory:* ${d.crowdProTip}\n\n`;
      }

      text += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
    });

    text += `Generated with FINDIA AI — Explore Beyond Thinking! 🚀`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  const handlePrint = () => {
    // Ensure ALL days are rendered before the browser's print dialog opens.
    // We switch to show-all-days, let React flush (RAF + tiny timeout), then print.
    setShowAllDays(true);
    requestAnimationFrame(() => {
      setTimeout(() => window.print(), 80);
    });
  };

  const handleRefineSubmit = (e) => {
    e?.preventDefault();
    if (!refinePrompt.trim() || isRefining) return;
    onRefine(refinePrompt.trim());
    setRefinePrompt('');
  };

  return (
    <div id="printable-itinerary" className="w-full max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Top Header Card */}
      <div className="glass-heavy p-6 sm:p-8 rounded-3xl border border-white/15 relative overflow-hidden shadow-lifted">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider border border-amber-500/30">
              <Sparkle size={13} className="animate-pulse" />
              <span>FINDIA AI Verified Itinerary</span>
            </div>

            <h1 className="font-display text-2xl sm:text-4xl font-bold text-text-high tracking-tight">
              {plan.tripTitle}
            </h1>

            <p className="text-sm text-text-mid max-w-2xl leading-relaxed">
              {plan.vibeSummary}
            </p>

            {/* Quick Metrics Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1 text-xs">
              <span className="px-3 py-1.5 rounded-xl bg-bg-surface/80 border border-white/10 text-text-high flex items-center gap-1.5 font-medium">
                <MapPin size={13} className="text-amber-400" />
                <span>{plan.destination}</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-bg-surface/80 border border-white/10 text-text-high flex items-center gap-1.5 font-medium">
                <Calendar size={13} className="text-amber-400" />
                <span>{plan.duration} Days</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-bg-surface/80 border border-white/10 text-text-high flex items-center gap-1.5 font-medium">
                <Users size={13} className="text-amber-400" />
                <span>{plan.groupDescription || `${userPreferences?.travelersCount} Travelers`}</span>
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-bg-surface/80 border border-white/10 text-amber-300 flex items-center gap-1.5 font-mono font-semibold">
                <Flame size={13} className="text-amber-400" />
                <span>{plan.estimatedBudgetTotal}</span>
              </span>
              {plan.transitHighlight && (
                <span className="px-3 py-1.5 rounded-xl bg-bg-surface/80 border border-white/10 text-cyan-300 flex items-center gap-1.5 font-mono text-[11px]">
                  <Metro size={13} className="text-cyan-400" />
                  <span>{plan.transitHighlight}</span>
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0 print-hide">
            <button
              type="button"
              onClick={handleCopyWhatsApp}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to WhatsApp!' : 'Copy for WhatsApp'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-text-high font-semibold text-xs transition-all cursor-pointer border border-white/10"
            >
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 font-semibold text-xs transition-all cursor-pointer border border-amber-500/30"
            >
              <RotateCcw size={16} />
              <span>Tweak Questions</span>
            </button>
          </div>
        </div>
      </div>

      {/* Day Selector Tabs — hidden during print */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 overflow-x-auto gap-3 print-hide">
        <div className="flex items-center gap-2">
          {days.map((day, idx) => (
            <button
              key={day.dayNumber}
              type="button"
              onClick={() => {
                setActiveDayIndex(idx);
                setShowAllDays(false);
              }}
              className={cn(
                'px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer whitespace-nowrap',
                !showAllDays && activeDayIndex === idx
                  ? 'bg-amber-500 text-bg-base border border-amber-400 shadow-md shadow-amber-500/20'
                  : 'bg-bg-surface/60 border border-white/10 text-text-mid hover:text-text-high hover:border-white/20'
              )}
            >
              Day {day.dayNumber}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAllDays(!showAllDays)}
          className={cn(
            'px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer whitespace-nowrap border',
            showAllDays
              ? 'bg-amber-500/20 text-amber-300 border-amber-400/50 font-bold'
              : 'bg-bg-surface/40 text-text-mid border-white/10 hover:text-text-high'
          )}
        >
          {showAllDays ? 'Viewing All Days' : 'View All Days'}
        </button>
      </div>

      {/* Day Content Rendering */}
      {(showAllDays ? days : [currentDay]).map((day) => (
        <div key={day.dayNumber} className="space-y-6">
          {/* Day Theme Banner */}
          <div className="p-5 sm:p-6 rounded-2xl bg-bg-surface/70 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Day {day.dayNumber} Schedule
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-text-high mt-0.5">
                {day.dayTitle}
              </h3>
              <p className="text-xs text-text-mid mt-1 italic">
                Theme: {day.theme}
              </p>
            </div>

            {day.transitAdvice && (
              <div className="px-3.5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono max-w-sm">
                <span className="font-bold block text-[10px] uppercase text-cyan-400">Transit Route:</span>
                <span>{day.transitAdvice}</span>
              </div>
            )}
          </div>

          {/* Timeline Sequence Slots */}
          <div className="space-y-4">
            {/* 1. MORNING SLOT */}
            {day.morning && (
              <div className="p-5 sm:p-6 rounded-2xl bg-bg-surface/50 border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                      🌅 Morning • {day.morning.time}
                    </span>
                    <CrowdBadge level={day.morning.crowdLevel || 'low'} />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-text-mid">
                    <span className="text-amber-400 font-semibold">{day.morning.fee}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-text-high">
                    {day.morning.place}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-mid mt-1 leading-relaxed">
                    {day.morning.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-mono bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/20">
                    <Metro size={13} />
                    <span>{day.morning.metro}</span>
                  </div>

                  {day.morning.tip && (
                    <div className="text-xs text-amber-300/90 font-medium bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                      <Sparkle size={12} className="text-amber-400 shrink-0" />
                      <span>{day.morning.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 2. LUNCH & CULINARY SLOT */}
            {day.lunch && (
              <div className="p-5 sm:p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20 hover:border-orange-500/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-orange-500/15 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-orange-500/20 text-orange-300 font-mono text-xs font-bold flex items-center gap-1.5">
                      <Utensils size={13} />
                      <span>Lunch • {day.lunch.time}</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/10 text-text-high border border-white/10">
                      {day.lunch.dietary}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-orange-400 font-bold">
                    {day.lunch.priceRange}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-text-high">
                    {day.lunch.restaurant}
                  </h4>
                  <div className="text-xs sm:text-sm text-text-mid mt-1 flex items-center gap-2">
                    <span className="text-text-low">Must-Try Dish:</span>
                    <span className="font-semibold text-amber-300">{day.lunch.famousDish}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. AFTERNOON SLOT */}
            {day.afternoon && (
              <div className="p-5 sm:p-6 rounded-2xl bg-bg-surface/50 border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-xs font-bold">
                      ☀️ Afternoon • {day.afternoon.time}
                    </span>
                    <CrowdBadge level={day.afternoon.crowdLevel || 'moderate'} />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-text-mid">
                    <span className="text-amber-400 font-semibold">{day.afternoon.fee}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-text-high">
                    {day.afternoon.place}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-mid mt-1 leading-relaxed">
                    {day.afternoon.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-mono bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/20">
                    <Metro size={13} />
                    <span>{day.afternoon.metro}</span>
                  </div>

                  {day.afternoon.tip && (
                    <div className="text-xs text-amber-300/90 font-medium bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                      <Sparkle size={12} className="text-amber-400 shrink-0" />
                      <span>{day.afternoon.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. SUNSET & EVENING SLOT */}
            {day.evening && (
              <div className="p-5 sm:p-6 rounded-2xl bg-bg-surface/50 border border-white/10 hover:border-amber-500/30 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-purple-500/20 text-purple-300 font-mono text-xs font-bold">
                      🌇 Evening Golden Hour • {day.evening.time}
                    </span>
                    <CrowdBadge level={day.evening.crowdLevel || 'moderate'} />
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-text-mid">
                    <span className="text-amber-400 font-semibold">{day.evening.fee}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-text-high">
                    {day.evening.place}
                  </h4>
                  <p className="text-xs sm:text-sm text-text-mid mt-1 leading-relaxed">
                    {day.evening.description}
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-cyan-300 font-mono bg-cyan-950/40 px-3 py-1 rounded-lg border border-cyan-500/20">
                    <Metro size={13} />
                    <span>{day.evening.metro}</span>
                  </div>

                  {day.evening.tip && (
                    <div className="text-xs text-amber-300/90 font-medium bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20 flex items-center gap-1.5">
                      <Sparkle size={12} className="text-amber-400 shrink-0" />
                      <span>{day.evening.tip}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 5. DINNER SLOT */}
            {day.dinner && (
              <div className="p-5 sm:p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-500/15 pb-3">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold flex items-center gap-1.5">
                    <Utensils size={13} />
                    <span>Dinner & Night • {day.dinner.time}</span>
                  </span>

                  <span className="text-xs font-mono text-indigo-400 font-bold">
                    {day.dinner.priceRange}
                  </span>
                </div>

                <div>
                  <h4 className="font-display text-lg font-bold text-text-high">
                    {day.dinner.restaurant}
                  </h4>
                  <div className="text-xs sm:text-sm text-text-mid mt-1">
                    <span className="text-text-low">Ambiance: </span>
                    <span className="text-text-high">{day.dinner.vibe}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Crowd Pro-Tip Callout */}
          {day.crowdProTip && (
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 flex items-start gap-3">
              <Sparkle size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div>
                <div className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                  FINDIA Crowd Intelligence Advisory
                </div>
                <div className="text-xs sm:text-sm text-text-high mt-1 font-medium leading-relaxed">
                  {day.crowdProTip}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* ================================================================
           WHERE TO STAY + HOW TO GET AROUND — Real Findia data
           ================================================================ */}
      <div className="space-y-5">
        {/* Section Title */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center">
              <Sparkle size={16} className="text-amber-400" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-text-high leading-none">
                Where to Stay & How to Get Around
              </h2>
              <p className="text-xs text-text-low mt-0.5">
                Matched from Findia's verified Delhi hotel directory
              </p>
            </div>
          </div>
          <Link
            to="/hotels"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors print-hide"
          >
            <span>View all hotels</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Hotel Cards Strip */}
        {recommendedHotels.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="p-4 rounded-2xl bg-bg-surface/60 border border-white/10 hover:border-amber-500/40 transition-all space-y-3 flex flex-col"
              >
                {/* Category Badge + Rating */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-amber-500/40 text-amber-300 bg-amber-500/10 capitalize">
                    {hotel.category === 'budget'
                      ? 'Budget'
                      : hotel.category === 'moderate'
                        ? 'Mid-range'
                        : 'Premium'}
                  </span>
                  <div className="flex items-center gap-1 text-xs text-text-high">
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                    <span className="font-semibold">{hotel.rating}</span>
                  </div>
                </div>

                {/* Name */}
                <div>
                  <h4 className="font-display text-sm font-bold text-text-high leading-snug">
                    {hotel.name}
                  </h4>
                  <div className="flex items-center gap-1 mt-0.5 text-[11px] text-text-low">
                    <MapPin size={11} />
                    <span className="truncate">{hotel.area}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="text-xs font-mono font-semibold text-amber-300 bg-amber-500/10 px-2.5 py-1.5 rounded-lg border border-amber-500/20">
                  {hotel.priceRange}
                </div>

                {/* Nearest Metro */}
                {hotel.nearestMetro && (
                  <div className="flex items-center gap-1.5 text-[11px] text-cyan-300 font-mono bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/20">
                    <Metro size={11} />
                    <span className="truncate">{hotel.nearestMetro.name}</span>
                    <span className="shrink-0 text-text-low">· {hotel.nearestMetro.distanceKm} km</span>
                  </div>
                )}

                {/* Nearest Attraction */}
                {hotel.nearestAttractions?.[0] && (
                  <div className="flex items-center gap-1.5 text-[11px] text-text-mid">
                    <MapPin size={11} className="text-amber-400 shrink-0" />
                    <span className="truncate">{hotel.nearestAttractions[0].name}</span>
                    <span className="shrink-0 text-emerald-400 font-mono">
                      {hotel.nearestAttractions[0].distanceKm} km
                    </span>
                  </div>
                )}

                {/* Amenities */}
                {hotel.amenities && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {hotel.amenities.slice(0, 3).map((a, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded-full bg-bg-surface border border-white/10 text-text-low"
                      >
                        {a}
                      </span>
                    ))}
                    {hotel.amenities.length > 3 && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono">
                        +{hotel.amenities.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* CTA */}
                <div className="mt-auto pt-2 print-hide">
                  <Link
                    to="/hotels"
                    className="block w-full text-center py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base text-xs font-bold transition-colors"
                  >
                    View details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mobile — View all link */}
        <div className="sm:hidden print-hide">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>View full hotel listings</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        {/* Transport / Metro Quick Guide */}
        {transitGuide.length > 0 && (
          <div className="p-4 sm:p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
              <Metro size={15} className="text-cyan-400" />
              <span>Getting Around — Metro & Transit for This Trip</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {transitGuide.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-bg-surface/50 border border-cyan-500/15"
                >
                  <span className="w-6 h-6 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-[10px] font-mono font-bold uppercase text-cyan-400 tracking-wide">
                      {item.label}
                    </div>
                    <div className="text-xs text-text-mid mt-0.5 leading-snug">{item.detail}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-[11px] text-text-low font-mono">
              💡 Buy a Delhi Metro Smart Card for ₹100 deposit — saves 10% on every journey
            </div>
          </div>
        )}
      </div>

      {/* Refine / AI Modification Box — hidden during print */}
      <div className="glass-heavy p-6 rounded-3xl border border-white/15 space-y-4 print-hide">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-display font-bold text-text-high">
            <MessageCircle size={16} className="text-amber-400" />
            <span>Want to tweak or refine this itinerary?</span>
          </div>
          <button
            type="button"
            onClick={() => setShowRefineBox(!showRefineBox)}
            className="text-xs text-amber-400 hover:text-amber-300 underline font-mono cursor-pointer"
          >
            {showRefineBox ? 'Hide Prompt' : 'Ask AI to Modify'}
          </button>
        </div>

        {showRefineBox && (
          <form onSubmit={handleRefineSubmit} className="space-y-3 pt-2">
            <textarea
              rows="2"
              placeholder="e.g. Day 2 me thoda aur shopping add kardo, ya pure vegetarian dhabas select karo, ya start time 9 AM karo..."
              value={refinePrompt}
              onChange={(e) => setRefinePrompt(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-bg-surface/80 border border-white/15 text-sm text-text-high placeholder-text-low focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 transition-all resize-none"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isRefining || !refinePrompt.trim()}
                className={cn(
                  'inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  isRefining || !refinePrompt.trim()
                    ? 'bg-amber-500/40 text-bg-base/60 cursor-not-allowed'
                    : 'bg-amber-500 hover:bg-amber-400 text-bg-base shadow-md'
                )}
              >
                <Sparkle size={14} className={isRefining ? 'animate-spin' : ''} />
                <span>{isRefining ? 'Regenerating Itinerary...' : 'Update Plan'}</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Explore Related Findia Features — hidden during print */}
      <div className="p-6 rounded-2xl bg-bg-surface/60 border border-white/10 flex flex-wrap items-center justify-between gap-4 print-hide">
        <div>
          <div className="font-display font-bold text-sm text-text-high">
            Explore Ground Telemetry for this Plan
          </div>
          <div className="text-xs text-text-mid mt-0.5">
            Check live crowd meters, nearby boutique hotels, or emergency casualty centers.
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/destination/north/delhi"
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-text-high transition-colors"
          >
            Live Delhi Places
          </Link>
          <Link
            to="/hotels"
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-text-high transition-colors"
          >
            Hotels & Stays
          </Link>
          <Link
            to="/sos"
            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 text-xs font-semibold transition-colors"
          >
            SOS Services
          </Link>
        </div>
      </div>
    </div>
  );
}
