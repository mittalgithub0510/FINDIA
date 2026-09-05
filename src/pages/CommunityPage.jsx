import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../config/CityContext';
import {
  CHANNELS as DELHI_CHANNELS,
  INITIAL_THREADS as DELHI_THREADS,
  TOP_REPUTATION_USERS as DELHI_USERS,
  COMMUNITY_TOURISM_SIGNALS as DELHI_SIGNALS,
} from '../data/delhi/community';
import {
  CHANNELS as PRAYAGRAJ_CHANNELS,
  INITIAL_THREADS as PRAYAGRAJ_THREADS,
  TOP_REPUTATION_USERS as PRAYAGRAJ_USERS,
  COMMUNITY_TOURISM_SIGNALS as PRAYAGRAJ_SIGNALS,
} from '../data/prayagraj/community';
import { DELHI_PLACES } from '../data/delhiData';
import { PRAYAGRAJ_PLACES } from '../data/prayagrajData';
import {
  MessageCircle,
  Plus,
  Shield,
  Search,
  ArrowUp,
  ArrowDown,
  Flame,
  Sparkles,
  MapPin,
  Crowd,
  Landmark,
  Utensils,
  Metro,
  Gem,
  ShieldAlert,
  Share,
  Close,
  Check,
  ChevronDown,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  Clock,
  Star,
  Activity,
  Award,
} from '../components/icons';
import { cn } from '../utils/cn';

/**
 * FINDIA Community — People-Powered Tourism Intelligence Page.
 * Features:
 * - Structured Tourism Content Types: Ground Report, Ask a Local, Discovery, Travel Experience
 * - Reddit Upvote/Downvote + Helpful Counter + Freshness Badges
 * - Linked Destination Telemetry & FINDIA AI Signals Panel
 * - Government Tourism Intelligence Aggregation Bridge
 * - Dynamic 4-Type Post Creation Modal
 */
export function CommunityPage() {
  const { city } = useCity();
  const isPrayagraj = city?.slug === 'prayagraj';
  const availablePlaces = isPrayagraj ? PRAYAGRAJ_PLACES : DELHI_PLACES;
  const CHANNELS = isPrayagraj ? PRAYAGRAJ_CHANNELS : DELHI_CHANNELS;
  const TOP_REPUTATION_USERS = isPrayagraj ? PRAYAGRAJ_USERS : DELHI_USERS;
  const COMMUNITY_TOURISM_SIGNALS = isPrayagraj ? PRAYAGRAJ_SIGNALS : DELHI_SIGNALS;

  // Active Category Filters State
  const [activeChannel, setActiveChannel] = useState('all');
  const [activePostType, setActivePostType] = useState('all'); // 'all', 'ground_report', 'ask_local', 'discovery', 'experience'
  const [activeSort, setActiveSort] = useState('hot'); // 'hot', 'new', 'top', 'helpful'
  const [searchQuery, setSearchQuery] = useState('');
  const [threads, setThreads] = useState(isPrayagraj ? PRAYAGRAJ_THREADS : DELHI_THREADS);

  // Sync threads on city change
  React.useEffect(() => {
    setThreads(isPrayagraj ? PRAYAGRAJ_THREADS : DELHI_THREADS);
  }, [isPrayagraj]);

  // Modal State for New Post Creation, Guidelines & Contributors
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isGuidelinesModalOpen, setIsGuidelinesModalOpen] = useState(false);
  const [isContributorsModalOpen, setIsContributorsModalOpen] = useState(false);
  const [postTypeCategory, setPostTypeCategory] = useState('ground_report'); // 'ground_report', 'ask_local', 'discovery', 'experience'

  // Feed Layout & Density Controls (persisted in localStorage)
  const [viewDensity, setViewDensity] = useState(() => {
    try {
      return localStorage.getItem('findia_feed_density') || 'comfortable';
    } catch {
      return 'comfortable';
    }
  });
  const [visiblePostCount, setVisiblePostCount] = useState(6);

  const handleDensityChange = (density) => {
    setViewDensity(density);
    try {
      localStorage.setItem('findia_feed_density', density);
    } catch (e) {
      console.error('Failed to save feed density preference:', e);
    }
  };

  // Form Fields State
  const [newTitle, setNewTitle] = useState('');
  const [newBody, setNewBody] = useState('');
  const [newChannel, setNewChannel] = useState('Crowd Alerts');
  const [newPlaceSlug, setNewPlaceSlug] = useState('humayuns-tomb');
  const [newCrowdStatus, setNewCrowdStatus] = useState('moderate');
  
  // Type-Specific Extra State
  const [newQueueTime, setNewQueueTime] = useState('15-20 mins');
  const [newAskCategory, setNewAskCategory] = useState('Food & Dining');
  const [newBestTime, setNewBestTime] = useState('08:00 AM – 10:00 AM');
  const [newBudget, setNewBudget] = useState('₹100 – ₹300');
  const [newRating, setNewRating] = useState(5);

  // Custom Dropdown Toggle States
  const [isChannelDropdownOpen, setIsChannelDropdownOpen] = useState(false);
  const [isPlaceDropdownOpen, setIsPlaceDropdownOpen] = useState(false);

  // Open Modal with preselected post type
  const openModalWithType = (type) => {
    setPostTypeCategory(type);
    if (type === 'ground_report') setNewChannel('Crowd Alerts');
    else if (type === 'ask_local') setNewChannel('Heritage Reviews');
    else if (type === 'discovery') setNewChannel('Hidden Gems');
    else if (type === 'experience') setNewChannel('Street Food');
    setIsCreateModalOpen(true);
  };



  // Signal Authenticity Handler (True Signal vs False Report)
  const handleSignalFeedback = (threadId, feedbackType) => {
    setThreads((prevThreads) => {
      const targetThread = prevThreads.find((t) => t.id === threadId);
      if (!targetThread) return prevThreads;

      let currentFeedback = targetThread.userFeedback;
      let newHelpful = targetThread.helpfulCount || 0;
      let newUnhelpful = targetThread.unhelpfulCount || 0;
      let newFeedbackState = null;

      if (currentFeedback === feedbackType) {
        if (feedbackType === 'helpful') newHelpful -= 1;
        if (feedbackType === 'unhelpful') newUnhelpful -= 1;
        newFeedbackState = null;
      } else {
        if (currentFeedback === 'helpful') newHelpful -= 1;
        if (currentFeedback === 'unhelpful') newUnhelpful -= 1;

        if (feedbackType === 'helpful') newHelpful += 1;
        if (feedbackType === 'unhelpful') newUnhelpful += 1;
        newFeedbackState = feedbackType;
      }

      newHelpful = Math.max(0, newHelpful);
      newUnhelpful = Math.max(0, newUnhelpful);

      // AUTOMATIC PRUNING RULE: If False signals > True signals, delete post automatically
      if (newUnhelpful > newHelpful) {
        setTimeout(() => {
          alert(`🚫 Report Auto-Pruned: "${targetThread.title.slice(0, 40)}..." was automatically deleted because False signals exceeded True signals.`);
        }, 100);
        return prevThreads.filter((t) => t.id !== threadId);
      }

      return prevThreads.map((t) => {
        if (t.id !== threadId) return t;
        return {
          ...t,
          helpfulCount: newHelpful,
          unhelpfulCount: newUnhelpful,
          userFeedback: newFeedbackState,
        };
      });
    });
  };

  // Submit New Post Handler
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newBody.trim()) {
      alert('Please fill in both the headline and detailed experience.');
      return;
    }

    const matchedPlace = availablePlaces.find((p) => p.slug === newPlaceSlug) || availablePlaces[0];

    // Build structured data based on post type category
    let structuredData = {};
    if (postTypeCategory === 'ground_report') {
      structuredData = {
        reportType: 'Live Crowd Report',
        queueTime: newQueueTime,
        transportCondition: 'Normal Metro / Transit Flow',
        advisory: 'Reported directly by verified traveler',
      };
    } else if (postTypeCategory === 'ask_local') {
      structuredData = {
        category: newAskCategory,
        questionTarget: `Question regarding ${matchedPlace.name}`,
      };
    } else if (postTypeCategory === 'discovery') {
      structuredData = {
        discoveryType: 'Alternative Heritage & Spot Discovery',
        bestTime: newBestTime,
        approxBudget: newBudget,
        whyVisit: 'Authentic experience recommended by traveler',
        alternativeTo: 'Overcrowded tourist hubs',
      };
    } else if (postTypeCategory === 'experience') {
      structuredData = {
        rating: newRating,
        visitTime: newBestTime,
        budget: newBudget,
        reviewSummary: newTitle.trim(),
      };
    }

    const newPost = {
      id: `th-${Date.now()}`,
      channel: newChannel,
      postType: postTypeCategory,
      title: newTitle.trim(),
      body: newBody.trim(),
      placeName: matchedPlace.name,
      placeSlug: matchedPlace.slug,
      crowdStatus: newCrowdStatus,
      freshness: 'fresh',
      freshnessLabel: 'Fresh Signal (Just now)',
      author: 'You (Traveler)',
      authorBadge: 'Local Contributor',
      isVerifiedLocal: false,
      upvotes: 1,
      userVote: 'up',
      helpfulCount: 1,
      userHelpful: true,
      timeAgo: 'Just now',
      repliesCount: 0,
      viewsCount: 1,
      structuredData,
    };

    setThreads((prev) => [newPost, ...prev]);

    // Reset filters
    setActiveChannel('all');
    setActivePostType('all');
    setActiveSort('new');
    setSearchQuery('');

    // Reset form & close
    setNewTitle('');
    setNewBody('');
    setIsChannelDropdownOpen(false);
    setIsPlaceDropdownOpen(false);
    setIsCreateModalOpen(false);
  };

  // Filter & Sort Threads
  let displayedThreads = threads.filter((t) => {
    const matchesChannel = activeChannel === 'all' || t.channel === activeChannel;
    const matchesPostType = activePostType === 'all' || t.postType === activePostType;
    const matchesQuery =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.placeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesPostType && matchesQuery;
  });

  if (activeSort === 'top') {
    displayedThreads = [...displayedThreads].sort((a, b) => b.upvotes - a.upvotes);
  } else if (activeSort === 'helpful') {
    displayedThreads = [...displayedThreads].sort((a, b) => b.helpfulCount - a.helpfulCount);
  }

  const activeChannelObj = CHANNELS.find((s) => s.id === activeChannel) || CHANNELS[0];

  return (
    <div className="min-h-screen bg-bg-base text-text-high pb-24 pt-4 sm:pt-6 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* FINDIA COMMUNITY HERO HEADER & CTA BAR */}
        <div className="glass-heavy p-6 sm:p-8 rounded-3xl border border-white/10 shadow-lifted relative overflow-hidden bg-gradient-to-r from-bg-raised via-bg-base to-amber-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles size={14} className="text-amber-400" />
                <span>FINDIA Community • People-Powered Tourism Intelligence</span>
              </div>
              <h1 className="type-h1 font-display font-bold text-text-high">
                Discover {city?.name || 'Delhi'} through people who know it.
              </h1>
              <p className="text-xs text-text-mid max-w-2xl leading-relaxed">
                Real experiences, local knowledge, and on-ground crowd signals shared by travelers and local scouts to power smarter decisions and tourism demand redistribution.
              </p>
            </div>

            {/* 3 Quick Actions CTA Buttons & 2 Tags at bottom right */}
            <div className="flex flex-col md:items-end gap-3 shrink-0">
              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openModalWithType('ask_local')}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-text-high border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <HelpCircle size={15} className="text-amber-400" />
                  <span>Ask a Question</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModalWithType('discovery')}
                  className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/15 text-text-high border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                >
                  <Gem size={15} className="text-sky-400" />
                  <span>Share a Discovery</span>
                </button>

                <button
                  type="button"
                  onClick={() => openModalWithType('ground_report')}
                  className="px-5 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs flex items-center gap-1.5 transition-all shadow-lifted hover:scale-105 cursor-pointer"
                >
                  <Plus size={16} />
                  <span>Post Ground Report</span>
                </button>
              </div>

              {/* Bottom Right Tags inside Discover Delhi card */}
              <div className="flex items-center gap-2 pt-0.5">
                <button
                  type="button"
                  onClick={() => setIsGuidelinesModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-text-high border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  <Shield size={13} className="text-rose-400" />
                  <span>Guidelines</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsContributorsModalOpen(true)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-text-high border border-white/10 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm hover:scale-105"
                >
                  <Award size={13} className="text-amber-400" />
                  <span>Top Contributors</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3-COLUMN RESPONSIVE LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* LEFT COLUMN: CHANNELS & CONTENT TYPE FILTERS (3 COLS DESKTOP) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Content Type Filter Pills */}
            <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-amber-400 tracking-wider pb-1 border-b border-white/10">
                Content Types
              </div>
              <div className="space-y-1">
                {[
                  { id: 'all', label: 'All Content Types', icon: 'Sparkles' },
                  { id: 'ground_report', label: '🔴 Ground Reports', icon: 'Crowd' },
                  { id: 'ask_local', label: '❓ Ask a Local', icon: 'HelpCircle' },
                  { id: 'discovery', label: '💎 Hidden Discoveries', icon: 'Gem' },
                  { id: 'experience', label: '⭐ Travel Experiences', icon: 'Star' },
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setActivePostType(type.id)}
                    className={cn(
                      'w-full flex items-center justify-between p-2 rounded-xl text-xs font-medium transition-all cursor-pointer border text-left',
                      activePostType === type.id
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-sm'
                        : 'bg-white/5 border-white/5 text-text-mid hover:text-text-high hover:bg-white/10'
                    )}
                  >
                    <span>{type.label}</span>
                    {activePostType === type.id && <Check size={14} className="text-amber-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Channels Navigation */}
            <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-2">
              <div className="text-[11px] font-mono uppercase font-bold text-amber-400 tracking-wider pb-1 border-b border-white/10">
                Topic Channels
              </div>

              <div className="space-y-1">
                {CHANNELS.map((ch) => {
                  const isActive = activeChannel === ch.id;

                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setActiveChannel(ch.id)}
                      className={cn(
                        'w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer border text-left',
                        isActive
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 font-bold shadow-sm'
                          : 'bg-white/5 border-white/5 text-text-mid hover:text-text-high hover:bg-white/10'
                      )}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {ch.id === 'all' && <Sparkles size={15} className="text-amber-400 shrink-0" />}
                        {ch.id === 'Crowd Alerts' && <Crowd size={15} className="text-rose-400 shrink-0" />}
                        {ch.id === 'Heritage Reviews' && <Landmark size={15} className="text-amber-400 shrink-0" />}
                        {ch.id === 'Street Food' && <Utensils size={15} className="text-orange-400 shrink-0" />}
                        {ch.id === 'Metro & Transit' && <Metro size={15} className="text-emerald-400 shrink-0" />}
                        {ch.id === 'Hidden Gems' && <Gem size={15} className="text-sky-400 shrink-0" />}
                        {ch.id === 'Lost & Found' && <ShieldAlert size={15} className="text-rose-400 shrink-0" />}
                        <span className="truncate">{ch.label}</span>
                      </div>

                      {isActive && <Check size={14} className="text-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* About Active Channel */}
            <div className="glass-panel p-4 rounded-3xl border border-white/10 space-y-1.5">
              <div className="text-xs font-mono font-bold text-text-high">
                Channel: {activeChannelObj.label}
              </div>
              <p className="text-[11px] text-text-mid leading-relaxed">
                {activeChannelObj.description}
              </p>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* CENTER FEED: CARDS & SORT TABS (6 COLS DESKTOP) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* SORT TABS & SEARCH BAR — SINGLE LINE CONTROL BAR */}
            <div className="flex items-center justify-between gap-2 p-1.5 rounded-2xl glass-panel border border-white/10 overflow-x-auto scrollbar-none">
              {/* Sort Tabs */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  type="button"
                  onClick={() => setActiveSort('hot')}
                  className={cn(
                    'px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0',
                    activeSort === 'hot'
                      ? 'bg-amber-500 text-bg-base font-bold'
                      : 'text-text-mid hover:text-text-high hover:bg-white/10'
                  )}
                >
                  <Flame size={14} />
                  <span>Hot</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSort('new')}
                  className={cn(
                    'px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0',
                    activeSort === 'new'
                      ? 'bg-amber-500 text-bg-base font-bold'
                      : 'text-text-mid hover:text-text-high hover:bg-white/10'
                  )}
                >
                  <Sparkles size={14} />
                  <span>New</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSort('top')}
                  className={cn(
                    'px-2.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer shrink-0',
                    activeSort === 'top'
                      ? 'bg-amber-500 text-bg-base font-bold'
                      : 'text-text-mid hover:text-text-high hover:bg-white/10'
                  )}
                >
                  <ThumbsUp size={14} />
                  <span>Top Verified</span>
                </button>
              </div>

              {/* Density View Switcher & Search Filter */}
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="flex items-center p-0.5 rounded-xl bg-white/5 border border-white/10 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleDensityChange('comfortable')}
                    title="Detailed Card View"
                    className={cn(
                      'px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1',
                      viewDensity === 'comfortable'
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                        : 'text-text-mid hover:text-text-high'
                    )}
                  >
                    <span>🗂️ Cards</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDensityChange('compact')}
                    title="Compact Row View for high post volume"
                    className={cn(
                      'px-2 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1',
                      viewDensity === 'compact'
                        ? 'bg-amber-500/25 text-amber-300 border border-amber-500/40'
                        : 'text-text-mid hover:text-text-high'
                    )}
                  >
                    <span>☰ Compact</span>
                  </button>
                </div>

                <div className="relative w-28 sm:w-36 shrink-0">
                  <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-text-low" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-2 py-1 rounded-xl bg-white/5 text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>

            {/* THREAD CARDS LIST */}
            <div className="space-y-3">
              {displayedThreads.slice(0, visiblePostCount).map((thread) => {

                // ==========================================================
                // DENSE COMPACT MODE (Ultra-efficient space saver)
                // ==========================================================
                if (viewDensity === 'compact') {
                  return (
                    <div
                      key={thread.id}
                      className="p-3 rounded-2xl glass-panel border border-white/10 hover:border-amber-500/40 transition-all flex items-center justify-between gap-3 text-xs group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Category Badge */}
                        <span
                          className={cn(
                            'px-2 py-0.5 rounded font-mono font-bold text-[9px] uppercase shrink-0 border',
                            thread.postType === 'ground_report' && 'bg-rose-950/80 text-rose-300 border-rose-500/40',
                            thread.postType === 'ask_local' && 'bg-sky-950/80 text-sky-300 border-sky-500/40',
                            thread.postType === 'discovery' && 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
                            thread.postType === 'experience' && 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                          )}
                        >
                          {thread.postType === 'ground_report' ? 'Report' : thread.postType === 'ask_local' ? 'Ask' : thread.postType === 'discovery' ? 'Gem' : 'Review'}
                        </span>

                        {/* Title Link */}
                        <Link
                          to={`/community/${thread.id}`}
                          className="font-medium text-text-high hover:text-amber-300 truncate text-xs"
                        >
                          {thread.title}
                        </Link>
                      </div>

                      {/* Right Meta & Actions */}
                      <div className="flex items-center gap-3 shrink-0 text-[11px] text-text-low font-mono">
                        <button
                          type="button"
                          onClick={() => handleSignalFeedback(thread.id, 'helpful')}
                          className={cn(
                            'flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]',
                            thread.userFeedback === 'helpful' ? 'text-emerald-300 bg-emerald-500/20' : 'hover:text-emerald-300'
                          )}
                        >
                          <ThumbsUp size={11} />
                          <span>{thread.helpfulCount || 0} True</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSignalFeedback(thread.id, 'unhelpful')}
                          className={cn(
                            'flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px]',
                            thread.userFeedback === 'unhelpful' ? 'text-rose-300 bg-rose-500/20' : 'hover:text-rose-400'
                          )}
                        >
                          <ThumbsDown size={11} />
                          <span>{thread.unhelpfulCount || 0} False</span>
                        </button>
                        <Link
                          to={`/community/${thread.id}`}
                          className="flex items-center gap-1 hover:text-amber-400"
                        >
                          <MessageCircle size={12} className="text-amber-400" />
                          <span>{thread.repliesCount}</span>
                        </Link>
                        <span className="text-[10px]">{thread.timeAgo}</span>
                      </div>
                    </div>
                  );
                }

                // ==========================================================
                // COMFORTABLE MODE (Default detailed card view)
                // ==========================================================
                return (
                  <div
                    key={thread.id}
                    className="p-4 sm:p-5 rounded-3xl glass-panel border border-white/10 hover:border-amber-500/40 transition-all duration-base overflow-hidden shadow-card group space-y-3"
                  >
                    {/* Top Meta Bar: Post Type Pill + Channel + Monument + Freshness */}
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      
                      {/* Post Type Badge */}
                      <span
                        className={cn(
                          'px-2.5 py-0.5 rounded-md font-mono font-bold text-[10px] uppercase flex items-center gap-1 border',
                          thread.postType === 'ground_report' && 'bg-rose-950/80 text-rose-300 border-rose-500/40',
                          thread.postType === 'ask_local' && 'bg-sky-950/80 text-sky-300 border-sky-500/40',
                          thread.postType === 'discovery' && 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
                          thread.postType === 'experience' && 'bg-amber-950/80 text-amber-300 border-amber-500/40'
                        )}
                      >
                        {thread.postType === 'ground_report' && <span>🔴 Ground Report</span>}
                        {thread.postType === 'ask_local' && <span>❓ Ask a Local</span>}
                        {thread.postType === 'discovery' && <span>💎 Discovery</span>}
                        {thread.postType === 'experience' && <span>⭐ Experience</span>}
                      </span>

                      {/* Channel Badge */}
                      <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-text-mid font-mono text-[10px]">
                        {thread.channel}
                      </span>

                      {/* Linked Monument Pill */}
                      <Link
                        to={`/destination/north/delhi/${thread.placeSlug}`}
                        className="px-2 py-0.5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-text-high font-mono text-[10px] flex items-center gap-1 transition-colors"
                      >
                        <MapPin size={11} className="text-amber-400" />
                        <span>{thread.placeName}</span>
                      </Link>

                      {/* Freshness Badge */}
                      <span
                        className={cn(
                          'px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 border ml-auto',
                          thread.freshness === 'fresh' && 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-bold',
                          thread.freshness === 'recent' && 'bg-amber-500/10 text-amber-300 border-amber-500/30',
                          thread.freshness === 'outdated' && 'bg-white/5 text-text-low border-white/10'
                        )}
                      >
                        <Clock size={10} />
                        <span>{thread.freshnessLabel || thread.timeAgo}</span>
                      </span>
                    </div>

                    {/* Title & Author */}
                    <div>
                      <Link
                        to={`/community/${thread.id}`}
                        className="type-h3 text-base font-display text-text-high group-hover:text-amber-300 transition-colors line-clamp-2"
                      >
                        {thread.title}
                      </Link>

                      <div className="flex items-center gap-2 text-[11px] text-text-low font-mono pt-0.5">
                        <span>By <strong className="text-text-mid">{thread.author}</strong></span>
                        <span>•</span>
                        <span className="text-amber-400/90 font-semibold">{thread.authorBadge}</span>
                        {thread.isVerifiedLocal && (
                          <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[9px] font-bold border border-amber-500/40">
                            Verified Resident
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Body Snippet - Clamped to 2 lines max */}
                    <p className="text-xs text-text-mid leading-relaxed line-clamp-2">
                      {thread.body}
                    </p>

                    {/* STRUCTURED TOURISM DATA BOX */}
                    {thread.structuredData && (
                      <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 space-y-0.5 text-xs">
                        {thread.structuredData.queueTime && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-text-low">Est. Queue Time:</span>
                            <span className="font-mono font-bold text-amber-300">{thread.structuredData.queueTime}</span>
                          </div>
                        )}
                        {thread.structuredData.bestTime && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-text-low">Best Time to Visit:</span>
                            <span className="font-mono text-emerald-300">{thread.structuredData.bestTime}</span>
                          </div>
                        )}
                        {thread.structuredData.alternativeTo && (
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="text-text-low">Alternative to:</span>
                            <span className="font-mono text-sky-300">{thread.structuredData.alternativeTo}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* UNIFIED BOTTOM ACTIONS BAR */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 border-t border-white/10 text-xs text-text-low">
                      
                      {/* True vs False Signal Counter Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleSignalFeedback(thread.id, 'helpful')}
                          title="Verify as true signal"
                          className={cn(
                            'flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-xl transition-all cursor-pointer border',
                            thread.userFeedback === 'helpful'
                              ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50 shadow-sm'
                              : 'bg-white/5 text-text-mid border-white/10 hover:text-emerald-300 hover:bg-white/10'
                          )}
                        >
                          <ThumbsUp size={13} />
                          <span>{thread.helpfulCount || 0} True</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleSignalFeedback(thread.id, 'unhelpful')}
                          title="Flag as false report or inaccurate"
                          className={cn(
                            'flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1 rounded-xl transition-all cursor-pointer border',
                            thread.userFeedback === 'unhelpful'
                              ? 'bg-rose-500/25 text-rose-300 border-rose-500/50 shadow-sm'
                              : 'bg-white/5 text-text-mid border-white/10 hover:text-rose-400 hover:bg-white/10'
                          )}
                        >
                          <ThumbsDown size={13} />
                          <span>{thread.unhelpfulCount || 0} False</span>
                        </button>
                      </div>

                      {/* Right Group: Comments & Share */}
                      <div className="flex items-center gap-3">
                        <Link
                          to={`/community/${thread.id}`}
                          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors font-semibold text-xs"
                        >
                          <MessageCircle size={14} className="text-amber-400" />
                          <span>{thread.repliesCount} Comments</span>
                        </Link>

                        <button
                          type="button"
                          onClick={() => alert(`Link copied for ${thread.title}`)}
                          className="hover:text-text-high flex items-center gap-1 text-[11px] cursor-pointer"
                        >
                          <Share size={13} />
                          <span>Share</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LOAD MORE / PAGINATION CONTROL FOR HIGH USER VOLUME */}
            {displayedThreads.length > visiblePostCount && (
              <div className="pt-3 pb-2 flex flex-col items-center gap-2">
                <div className="text-[11px] font-mono text-text-low">
                  Showing {visiblePostCount} of {displayedThreads.length} community signals
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setVisiblePostCount((prev) => prev + 5)}
                    className="px-5 py-2 rounded-2xl bg-white/10 hover:bg-white/15 text-text-high border border-white/10 text-xs font-bold transition-all cursor-pointer shadow-sm hover:scale-105"
                  >
                    Load More Signals ({displayedThreads.length - visiblePostCount} remaining)
                  </button>
                  <button
                    type="button"
                    onClick={() => setVisiblePostCount(displayedThreads.length)}
                    className="px-3.5 py-2 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
                  >
                    Show All
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: TOURISM SIGNALS & GOVT INTELLIGENCE PANEL (3 COLS DESKTOP) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* FINDIA COMMUNITY TOURISM SIGNALS PANEL */}
            <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 space-y-4 relative overflow-hidden bg-gradient-to-b from-amber-950/20 to-transparent">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-amber-400" />
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    Community Signals
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-semibold">
                  FINDIA AI
                </span>
              </div>

              <div className="space-y-2.5">
                {COMMUNITY_TOURISM_SIGNALS.map((sig) => (
                  <div key={sig.id} className="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-1 hover:bg-white/10 transition-colors">
                    {/* Tag Badge */}
                    <div className="flex items-center">
                      <span className={cn(
                        "px-2 py-0.5 rounded-lg text-[11px] font-semibold flex items-center gap-1",
                        sig.type === 'high_crowd' && "bg-rose-500/20 text-rose-300 border border-rose-500/30",
                        sig.type === 'discovery' && "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
                        sig.type === 'food' && "bg-amber-500/20 text-amber-300 border border-amber-500/30",
                        sig.type === 'transit' && "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                      )}>
                        {sig.title}
                      </span>
                    </div>

                    {/* Full Place Title - Fully Visible */}
                    <div className="text-xs font-bold text-amber-300 pt-0.5">{sig.place}</div>

                    {/* Detail text */}
                    <p className="text-[11px] text-text-mid leading-relaxed">{sig.detail}</p>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/10 space-y-1">
                <div className="text-[11px] font-semibold text-amber-400 flex items-center gap-1.5">
                  <Shield size={13} />
                  <span>Government Intelligence Bridge</span>
                </div>
                <p className="text-[10px] text-text-low leading-relaxed">
                  Aggregated crowd signals feed directly into regional tourism opportunity detection to help balance footfall.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4-TYPE TOURISM GROUND REPORT & EXPERIENCE MODAL */}
      {/* ========================================================================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-fast overflow-y-auto">
          <div className="max-w-xl w-full glass-heavy p-6 rounded-3xl border border-white/20 shadow-lifted space-y-4 relative my-auto">
            
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-400" />
                <h3 className="text-sm font-display font-bold text-text-high">
                  Post Tourism Intelligence
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded-full text-text-low hover:text-text-high"
              >
                <Close size={18} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              
              {/* STEP 1: CONTENT TYPE SELECTOR PILLS */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-text-low font-semibold">
                  What do you want to share?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'ground_report', label: '🔴 Ground Report' },
                    { id: 'ask_local', label: '❓ Ask a Local' },
                    { id: 'discovery', label: '💎 Discovery' },
                    { id: 'experience', label: '⭐ Experience' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPostTypeCategory(cat.id)}
                      className={cn(
                        'py-2 px-2 rounded-xl text-xs font-semibold transition-all border cursor-pointer text-center',
                        postTypeCategory === cat.id
                          ? 'bg-amber-500 text-bg-base border-amber-400 font-bold shadow-md'
                          : 'bg-white/5 border-white/10 text-text-mid hover:bg-white/10'
                      )}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: SELECT CHANNEL & PLACE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Channel Selector */}
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-mono uppercase text-text-low font-semibold">Topic Channel</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChannelDropdownOpen((prev) => !prev);
                      setIsPlaceDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-500/40 text-xs text-text-high flex items-center justify-between transition-all cursor-pointer shadow-sm outline-none"
                  >
                    <span className="font-bold text-amber-300 font-mono">
                      {newChannel}
                    </span>
                    <ChevronDown size={14} className={cn('text-amber-400 transition-transform', isChannelDropdownOpen && 'rotate-180')} />
                  </button>

                  {isChannelDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 z-[100] max-h-48 overflow-y-auto scrollbar-none rounded-2xl bg-bg-raised border border-amber-500/40 shadow-lifted p-1.5 space-y-1 backdrop-blur-md">
                      {CHANNELS.filter((s) => s.id !== 'all').map((ch) => (
                        <button
                          key={ch.id}
                          type="button"
                          onClick={() => {
                            setNewChannel(ch.id);
                            setIsChannelDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left',
                            newChannel === ch.id
                              ? 'bg-amber-500 text-bg-base font-bold'
                              : 'text-text-high hover:bg-white/10'
                          )}
                        >
                          <span>{ch.label}</span>
                          {newChannel === ch.id && <Check size={14} className="text-bg-base" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Monument Selector */}
                <div className="space-y-1 relative">
                  <label className="text-[10px] font-mono uppercase text-text-low font-semibold">Linked Destination</label>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaceDropdownOpen((prev) => !prev);
                      setIsChannelDropdownOpen(false);
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-amber-500/40 text-xs text-text-high flex items-center justify-between transition-all cursor-pointer shadow-sm outline-none"
                  >
                    <span className="truncate font-semibold text-text-high flex items-center gap-1">
                      <MapPin size={13} className="text-amber-400 shrink-0" />
                      <span className="truncate">{availablePlaces.find((p) => p.slug === newPlaceSlug)?.name || 'Select Place'}</span>
                    </span>
                    <ChevronDown size={14} className={cn('text-amber-400 transition-transform shrink-0', isPlaceDropdownOpen && 'rotate-180')} />
                  </button>

                  {isPlaceDropdownOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1.5 z-[100] max-h-52 overflow-y-auto scrollbar-none rounded-2xl bg-bg-raised border border-amber-500/40 shadow-lifted p-1.5 space-y-1 backdrop-blur-md">
                      {availablePlaces.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => {
                            setNewPlaceSlug(p.slug);
                            setIsPlaceDropdownOpen(false);
                          }}
                          className={cn(
                            'w-full flex items-center justify-between p-2 rounded-xl text-xs transition-all cursor-pointer text-left',
                            newPlaceSlug === p.slug
                              ? 'bg-amber-500 text-bg-base font-bold'
                              : 'text-text-high hover:bg-white/10'
                          )}
                        >
                          <div className="truncate pr-2">
                            <div className="font-semibold truncate">{p.name}</div>
                            <div className={cn('text-[10px] font-mono', newPlaceSlug === p.slug ? 'text-bg-base/80' : 'text-text-low')}>{p.district}</div>
                          </div>
                          {newPlaceSlug === p.slug && <Check size={14} className="text-bg-base shrink-0" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

              </div>

              {/* DYNAMIC FIELDS PER CONTENT TYPE */}
              {postTypeCategory === 'ground_report' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Observed Crowd Density</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['low', 'moderate', 'heavy'].map((lvl) => (
                        <button
                          key={lvl}
                          type="button"
                          onClick={() => setNewCrowdStatus(lvl)}
                          className={cn(
                            'py-1.5 px-2 rounded-xl text-[11px] font-semibold uppercase border cursor-pointer text-center',
                            newCrowdStatus === lvl ? 'bg-amber-500 text-bg-base font-bold border-amber-400' : 'bg-white/5 border-white/10 text-text-mid'
                          )}
                        >
                          {lvl}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Est. Queue / Delay Time</label>
                    <input
                      type="text"
                      placeholder="e.g. 35-40 min ticket queue"
                      value={newQueueTime}
                      onChange={(e) => setNewQueueTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {postTypeCategory === 'ask_local' && (
                <div className="space-y-1">
                  <label className="text-[10px] font-mono uppercase text-text-low font-semibold">Question Category</label>
                  <div className="flex flex-wrap gap-1.5 pt-0.5">
                    {[
                      { id: 'Food & Dining', label: '🍜 Food & Dining' },
                      { id: 'Metro & Transport', label: '🚇 Metro & Transport' },
                      { id: 'Hidden Places', label: '💎 Hidden Places' },
                      { id: 'Culture & Heritage', label: '🕌 Culture & Heritage' },
                      { id: 'Safety & Tips', label: '🛡️ Safety & Tips' },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setNewAskCategory(cat.id)}
                        className={cn(
                          'py-1.5 px-3 rounded-xl text-xs font-semibold border cursor-pointer transition-all',
                          newAskCategory === cat.id
                            ? 'bg-amber-500 text-bg-base font-bold border-amber-400 shadow-sm'
                            : 'bg-white/5 border-white/10 text-text-mid hover:bg-white/10 hover:text-text-high'
                        )}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {postTypeCategory === 'discovery' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Best Time to Visit</label>
                    <input
                      type="text"
                      placeholder="e.g. 7:00 AM – 9:00 AM"
                      value={newBestTime}
                      onChange={(e) => setNewBestTime(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high border border-white/10 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Approx Budget / Entry</label>
                    <input
                      type="text"
                      placeholder="e.g. Free Entry / ₹50"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high border border-white/10 outline-none"
                    />
                  </div>
                </div>
              )}

              {postTypeCategory === 'experience' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Overall Rating (1–5 Stars)</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className={cn(
                            'p-1 text-base cursor-pointer transition-transform hover:scale-125',
                            star <= newRating ? 'text-amber-400' : 'text-white/20'
                          )}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono uppercase text-text-low">Total Budget Spent</label>
                    <input
                      type="text"
                      placeholder="e.g. ₹200 per head"
                      value={newBudget}
                      onChange={(e) => setNewBudget(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high border border-white/10 outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Headline / Title Input */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-low">Headline / Subject</label>
                <input
                  type="text"
                  placeholder="Summarize your report, question, or discovery..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400"
                  required
                />
              </div>

              {/* Body Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-low">Detailed Experience / Advice</label>
                <textarea
                  rows={3}
                  placeholder="Provide timing, gate numbers, food stalls, or crowd advisories..."
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-amber-400 resize-none"
                  required
                />
              </div>

              {/* Modal Buttons */}
              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-high border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  onClick={handleCreatePost}
                  className="flex-1 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base text-xs font-bold cursor-pointer shadow-lifted transition-all hover:scale-[1.02] active:scale-95"
                >
                  Publish Intelligence
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* COMMUNITY GUIDELINES & GOVERNANCE MODAL */}
      {/* ========================================================================= */}
      {isGuidelinesModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-fast overflow-y-auto">
          <div className="max-w-xl w-full glass-heavy p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lifted space-y-6 relative my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <Shield size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-text-high">Community Guidelines & Governance</h3>
                  <p className="text-xs text-text-low">Rules for authentic tourism intelligence & crowd signal moderation</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsGuidelinesModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-text-low hover:text-text-high transition-colors cursor-pointer"
              >
                <Close size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs text-text-mid leading-relaxed">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
                  <Shield size={16} />
                  <span>FINDIA Community Guidelines & Rules</span>
                </div>
                <ul className="space-y-2.5 list-disc list-inside text-text-high text-xs leading-relaxed">
                  <li>Always include gate numbers, metro exit numbers & exact wait times in live crowd alerts.</li>
                  <li>Reports where False signals exceed True signals are automatically deleted from the feed.</li>
                  <li>Commercial spam, fake reviews & unverified vendor guide promotions are strictly prohibited.</li>
                  <li>Highlight authentic heritage photo angles, quiet visiting hours, and local food hygiene tips.</li>
                  <li>Verified community signals feed directly into regional tourism opportunity detection systems to assist local authorities in balancing footfall.</li>
                </ul>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setIsGuidelinesModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs cursor-pointer shadow-lifted transition-all"
              >
                I Understand & Agree
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TOP CONTRIBUTORS & LEADERBOARD MODAL */}
      {/* ========================================================================= */}
      {isContributorsModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-fast overflow-y-auto">
          <div className="max-w-xl w-full glass-heavy p-6 sm:p-8 rounded-3xl border border-white/20 shadow-lifted space-y-6 relative my-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Award size={20} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-text-high">Top Community Contributors</h3>
                  <p className="text-xs text-text-low">Recognizing local scouts & top intelligence contributors</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsContributorsModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/10 text-text-low hover:text-text-high transition-colors cursor-pointer"
              >
                <Close size={18} />
              </button>
            </div>

            <div className="space-y-3">
              {TOP_REPUTATION_USERS.map((usr, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between transition-all hover:bg-white/10"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-semibold text-text-high text-sm flex items-center gap-2">
                        <span>{usr.name}</span>
                        <span className="text-[10px] text-text-low font-normal">({usr.role})</span>
                      </div>
                      <div className="text-xs font-mono text-amber-300">{usr.badge}</div>
                    </div>
                  </div>

                  <span
                    className={cn(
                      'px-3 py-1 rounded-xl font-mono text-xs font-bold border flex items-center gap-1.5',
                      usr.tier === 'gold' && 'bg-amber-500/20 text-amber-300 border-amber-500/40',
                      usr.tier === 'silver' && 'bg-slate-300/20 text-slate-200 border-slate-300/40',
                      usr.tier === 'bronze' && 'bg-amber-700/20 text-amber-400 border-amber-700/40'
                    )}
                  >
                    <span>⭐</span>
                    <span>{usr.score}</span>
                  </span>
                </div>
              ))}
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-text-mid">
              💡 <span>Earn contributor stars by publishing verified live reports and helping fellow travelers.</span>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setIsContributorsModalOpen(false)}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-text-high font-semibold text-xs cursor-pointer border border-white/10"
              >
                Close Leaderboard
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default CommunityPage;
