import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { getCitySOSData, SOS_CATEGORIES } from '../data/sosData';
import {
  ShieldAlert,
  Hospital,
  Wrench,
  Fuel,
  Layers,
  Phone,
  ExternalLink,
  MapPin,
  Search,
  Users,
  Plus,
  Close,
  Radio,
  Sparkles,
} from '../components/icons';
import { cn } from '../utils/cn';

export function SOSPage() {
  const { city } = useCity();

  // Load SOS data for the currently active city (e.g. 'delhi')
  const citySOSData = getCitySOSData(city?.slug);
  const helplines = citySOSData?.helplines || [];
  const allServices = citySOSData?.services || [];

  // Active Category State for Nearby Services
  const [activeCategory, setActiveCategory] = useState('hospital');
  const [searchQuery, setSearchQuery] = useState('');

  // Quick Action UI States
  const [isLiveLocationOn, setIsLiveLocationOn] = useState(true);
  const [familyContacts, setFamilyContacts] = useState([]);
  const [isAddContactModalOpen, setIsAddContactModalOpen] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactRelation, setNewContactRelation] = useState('');

  // Add Family Contact Handler
  const handleAddContact = (e) => {
    e.preventDefault();
    if (!newContactName || !newContactPhone) return;
    if (familyContacts.length >= 5) {
      alert('Maximum 5 emergency contacts limit reached.');
      return;
    }
    setFamilyContacts((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: newContactName,
        phone: newContactPhone,
        relation: newContactRelation || 'Family',
      },
    ]);
    setNewContactName('');
    setNewContactPhone('');
    setNewContactRelation('');
    setIsAddContactModalOpen(false);
  };

  // Remove Family Contact Handler
  const handleRemoveContact = (id) => {
    setFamilyContacts((prev) => prev.filter((c) => c.id !== id));
  };

  // Filter nearby services
  const filteredServices = allServices.filter((item) => {
    const matchesCategory = item.category === activeCategory;
    const matchesQuery =
      searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen bg-bg-base text-text-high pb-24 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* HEADER BADGE & CITY SCOPED TITLE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/15 text-red-400 border border-red-500/30 text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldAlert size={14} className="text-red-400 animate-pulse" />
              <span>SOS Emergency Response System</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <h1 className="type-h1 font-display font-bold text-text-high">
              {city?.name || 'India'} Emergency Services Telemetry
            </h1>
            <p className="text-xs text-text-mid">
              Direct emergency helpline dispatch, live coordinates, and city-scoped casualty telemetry.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-text-low bg-white/5 px-3.5 py-2 rounded-xl border border-white/10 shrink-0">
            <MapPin size={14} className="text-red-400" />
            <span>Active Location: <strong className="text-text-high">{city?.name || 'Delhi'}</strong></span>
          </div>
        </div>

        {/* TWO-COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: QUICK ACTIONS PANEL (4 COLS DESKTOP / TOP MOBILE) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* 1. LARGE PROMINENT SOS BUTTON */}
            <div className="glass-heavy p-6 rounded-3xl border border-red-500/40 shadow-lifted space-y-4 relative overflow-hidden bg-gradient-to-b from-red-950/60 to-bg-raised">
              <div className="text-center space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-red-400">
                  Instant Emergency Dispatch
                </div>

                {/* Main Tap-to-Call Button */}
                <a
                  href="tel:112"
                  className="w-full py-5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-lg tracking-wider transition-all duration-fast flex items-center justify-center gap-3 shadow-lg shadow-red-600/40 hover:scale-[1.02] active:scale-95 border border-red-400/30 cursor-pointer"
                >
                  <ShieldAlert size={26} className="animate-pulse shrink-0 text-white" />
                  <span className="drop-shadow">CALL 112 EMERGENCY</span>
                </a>

                <p className="text-[11px] text-text-low pt-1 font-mono">
                  Universal Police, Fire & Medical Control Room
                </p>
              </div>

              {/* 2. LIVE LOCATION TOGGLE */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Radio
                    size={18}
                    className={isLiveLocationOn ? 'text-emerald-400 animate-pulse' : 'text-text-low'}
                  />
                  <div>
                    <div className="text-xs font-semibold text-text-high">Live Geolocation</div>
                    <div className="text-[10px] text-text-low">Transmit GPS coords to dispatch</div>
                  </div>
                </div>

                {/* Switch button */}
                <button
                  type="button"
                  onClick={() => setIsLiveLocationOn((prev) => !prev)}
                  className={cn(
                    'w-12 h-6 rounded-full transition-colors p-0.5 cursor-pointer relative',
                    isLiveLocationOn ? 'bg-emerald-500' : 'bg-white/20'
                  )}
                >
                  <div
                    className={cn(
                      'w-5 h-5 rounded-full bg-white transition-transform shadow-md',
                      isLiveLocationOn ? 'translate-x-6' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>

              {/* 3. SHARE WITH FAMILY PANEL */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-text-high flex items-center gap-1.5">
                    <Users size={15} className="text-red-400" />
                    <span>Family Safety Contacts</span>
                  </span>
                  <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/10 text-amber-300">
                    {familyContacts.length}/5 Contacts
                  </span>
                </div>

                {/* Added Family Contacts list */}
                {familyContacts.length > 0 && (
                  <div className="space-y-2">
                    {familyContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center justify-between p-2 rounded-xl bg-white/5 border border-white/10 text-xs"
                      >
                        <div className="truncate pr-2">
                          <div className="font-semibold text-text-high truncate">{contact.name} ({contact.relation})</div>
                          <div className="text-[10px] text-text-low font-mono">{contact.phone}</div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveContact(contact.id)}
                          className="p-1 text-text-low hover:text-red-400 transition-colors shrink-0"
                          title="Remove contact"
                        >
                          <Close size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => setIsAddContactModalOpen(true)}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-dashed border-white/20 text-xs font-semibold text-text-high flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Plus size={14} className="text-red-400" />
                  <span>Add Emergency Contact</span>
                </button>
              </div>
            </div>

            {/* 4. HELPLINE NUMBERS LIST BLOCK (CITY SCOPED) */}
            <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <h3 className="text-xs font-mono uppercase font-bold text-red-400">
                  {city?.name || 'City'} Emergency Helplines
                </h3>
                <span className="text-[10px] font-mono text-text-low">Direct Dial</span>
              </div>

              <div className="space-y-2.5">
                {helplines.map((item, idx) => (
                  <a
                    key={idx}
                    href={`tel:${item.number}`}
                    className="group flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-red-500/15 border border-white/10 hover:border-red-500/40 transition-all cursor-pointer"
                  >
                    <div className="space-y-0.5">
                      <div className="text-xs font-semibold text-text-high group-hover:text-red-200">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-text-low leading-tight">
                        {item.description}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-500/20 text-red-300 font-mono font-bold text-xs group-hover:bg-red-600 group-hover:text-white transition-colors shrink-0">
                      <Phone size={12} />
                      <span>{item.number}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: NEARBY SERVICES (8 COLS DESKTOP / BOTTOM MOBILE) */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 space-y-6">
            {/* Category Selection & Search Bar */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="type-h2 font-display text-text-high">
                    Nearby Essential Services
                  </h2>
                  <p className="text-xs text-text-mid mt-0.5">
                    Hospitals, police booths, breakdown towing, petrol stations & public amenities.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative max-w-xs w-full">
                  <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-low" />
                  <input
                    type="text"
                    placeholder="Search by name or landmark..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-red-500/50"
                  />
                </div>
              </div>

              {/* 5 Category Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {SOS_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat.id;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setActiveCategory(cat.id)}
                      className={cn(
                        'flex items-center justify-center gap-2 p-3 rounded-xl transition-all cursor-pointer border text-xs font-semibold select-none',
                        isActive
                          ? 'bg-red-600 text-white border-red-500 font-bold shadow-md shadow-red-600/20'
                          : 'bg-white/5 border-white/10 text-text-mid hover:text-text-high hover:bg-white/10'
                      )}
                    >
                      {cat.id === 'hospital' && <Hospital size={16} />}
                      {cat.id === 'police' && <ShieldAlert size={16} />}
                      {cat.id === 'mechanic' && <Wrench size={16} />}
                      {cat.id === 'petrol' && <Fuel size={16} />}
                      {cat.id === 'amenities' && <Layers size={16} />}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RESULTS LIST / CARDS GRID */}
            {filteredServices.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    className="group flex flex-col justify-between p-5 rounded-2xl glass-panel border border-white/10 hover:border-red-500/40 transition-all duration-base shadow-card space-y-4"
                  >
                    <div className="space-y-2.5">
                      {/* Distance & Readiness Badge */}
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[11px] font-mono font-bold">
                          <MapPin size={12} className="text-red-400" />
                          <span>{service.distance}</span>
                        </span>
                        <span className="text-[10px] text-text-low font-mono bg-white/5 px-2 py-0.5 rounded">
                          {service.type}
                        </span>
                      </div>

                      {/* Name */}
                      <h3 className="type-h3 text-base font-display text-text-high group-hover:text-red-300 transition-colors">
                        {service.name}
                      </h3>

                      {/* Address */}
                      <p className="text-xs text-text-mid leading-relaxed">
                        {service.address}
                      </p>
                    </div>

                    {/* Actions Row */}
                    <div className="grid grid-cols-2 gap-2 border-t border-white/10 pt-3">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          service.name + ' ' + service.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-white/5 hover:bg-white/15 text-text-high border border-white/10 text-xs font-semibold transition-colors"
                      >
                        <span>Directions</span>
                        <ExternalLink size={13} />
                      </a>

                      <a
                        href={`tel:${service.phone}`}
                        className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-colors shadow-md"
                      >
                        <Phone size={13} />
                        <span>Call Now</span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* EMPTY / COMING SOON STATE FOR CITY */
              <div className="glass-panel p-10 rounded-3xl border border-white/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 text-amber-400 flex items-center justify-center mx-auto border border-white/10">
                  <Sparkles size={24} />
                </div>
                <div className="space-y-1">
                  <h3 className="type-h3 text-text-high font-display">
                    SOS Service Directory for {city?.name || 'City'}
                  </h3>
                  <p className="text-xs text-text-mid max-w-md mx-auto">
                    Ground audited casualty hospitals, police booths, and mechanics for {city?.name} will be active upon municipal rollout.
                  </p>
                </div>
                <div className="pt-2 text-xs font-mono text-red-400 font-bold">
                  Use universal helpline 112 for direct dispatch in {city?.name}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ADD EMERGENCY CONTACT MODAL */}
      {/* ========================================================================= */}
      {isAddContactModalOpen && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-fast">
          <div className="max-w-sm w-full glass-heavy p-6 rounded-3xl border border-white/20 shadow-lifted space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-sm font-display font-bold text-text-high flex items-center gap-2">
                <Users size={16} className="text-red-400" />
                <span>Add Family Contact</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsAddContactModalOpen(false)}
                className="p-1 rounded-full text-text-low hover:text-text-high"
              >
                <Close size={18} />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-low">Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-red-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-mono uppercase text-text-low">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-red-500"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-text-low font-semibold">Relationship</label>
                <input
                  type="text"
                  placeholder="Type relation (e.g. Father, Sister, Friend, Doctor)"
                  value={newContactRelation}
                  onChange={(e) => setNewContactRelation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl glass-panel text-xs text-text-high placeholder-text-low border border-white/10 outline-none focus:border-red-500"
                  required
                />
                
                {/* Quick Selection Chips */}
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="text-[9px] font-mono text-text-low self-center mr-1">Quick Fill:</span>
                  {['Father', 'Mother', 'Spouse', 'Sibling', 'Friend', 'Doctor'].map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => setNewContactRelation(rel)}
                      className={cn(
                        'py-0.5 px-2 rounded-lg text-[10px] font-mono transition-all border cursor-pointer',
                        newContactRelation === rel
                          ? 'bg-red-500/30 text-red-200 border-red-500/50 font-bold'
                          : 'bg-white/5 border-white/10 text-text-low hover:text-text-high hover:bg-white/10'
                      )}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddContactModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-text-high border border-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold cursor-pointer shadow-md"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SOSPage;
