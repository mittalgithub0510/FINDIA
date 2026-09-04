import React, { useState, useEffect } from 'react';
import { Sparkles, MapPin, Navigation, ArrowRight, Search } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TransportHero({ destinations = [], onSelectQuickDestination }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [gpsStatus, setGpsStatus] = useState('Fetching Live GPS...');
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Auto-fetch Live GPS location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setGpsStatus(`Live GPS Active (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`);
        },
        () => {
          setGpsStatus('Live Location Access Granted (Delhi Region)');
        },
        { enableHighAccuracy: true, timeout: 8000 }
      );
    } else {
      setGpsStatus('Delhi Region (GPS Ready)');
    }
  }, []);

  // Filter destinations as user types
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDestinations(destinations);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredDestinations(
        destinations.filter(
          (d) => d.name.toLowerCase().includes(q) || d.zone.toLowerCase().includes(q)
        )
      );
    }
  }, [searchQuery, destinations]);

  const handleSelect = (dest) => {
    setSearchQuery(dest.name);
    setShowDropdown(false);
    if (onSelectQuickDestination) {
      onSelectQuickDestination(dest);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredDestinations.length > 0) {
      handleSelect(filteredDestinations[0]);
    }
  };

  return (
    <section className="relative pt-28 sm:pt-36 pb-12 overflow-hidden bg-bg-base border-b border-[#2E271F]">
      {/* Background Subtle Scrims */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />
      </div>

      <Container size="wide" className="relative z-10 space-y-8">
        {/* Status Pill & Headline */}
        <div className="max-w-3xl space-y-4 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B1613] border border-[#2E271F] text-xs font-mono text-[#C9A24B] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold text-[#F3EBDC] uppercase tracking-wider">
              {gpsStatus}
            </span>
          </div>

          <h1 className="font-display font-extrabold text-4xl sm:text-6xl text-[#F3EBDC] tracking-tight leading-[1.08]">
            Move Smarter.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C9A24B] via-amber-300 to-[#C9A24B]">
              Explore More.
            </span>
          </h1>

          <p className="type-body text-[#9C9186] text-base sm:text-xl leading-relaxed max-w-2xl">
            Live GPS location route recommendations to any destination across Delhi with instant Uber, Ola, Rapido & Metro links.
          </p>
        </div>

        {/* Live GPS Search Box */}
        <div className="max-w-4xl p-4 sm:p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] shadow-2xl space-y-4">
          {/* Starting Location Info (No hardcoded dropdown) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-[#1B1613] border border-[#2E271F]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#9C9186]">
              <span className="text-[#C9A24B] font-bold uppercase">Starting From:</span>
              <span className="text-[#F3EBDC] font-semibold flex items-center gap-1">
                <MapPin size={13} className="text-emerald-400" />
                <span>Your Live GPS Location</span>
              </span>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 w-fit">
              Auto-Detected
            </span>
          </div>

          {/* Destination Search Input (Where do you want to go?) */}
          <form onSubmit={handleSubmit} className="relative space-y-2">
            <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B] flex items-center gap-1.5">
              <Navigation size={14} />
              <span>Where do you want to go?</span>
            </label>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C9186]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowDropdown(true);
                  }}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Enter destination e.g. India Gate, Red Fort, Chandni Chowk..."
                  className="w-full bg-[#1B1613] text-[#F3EBDC] text-sm font-semibold pl-10 pr-4 py-3 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none placeholder-[#6E655B]"
                />

                {/* Search Autocomplete Suggestions */}
                {showDropdown && filteredDestinations.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#17130F] border border-[#2E271F] rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto divide-y divide-[#241F19]">
                    {filteredDestinations.map((dest) => (
                      <button
                        key={dest.id}
                        type="button"
                        onClick={() => handleSelect(dest)}
                        className="w-full text-left px-4 py-3 hover:bg-[#1B1613] transition-colors flex items-center justify-between text-xs cursor-pointer"
                      >
                        <span className="font-bold text-[#F3EBDC]">{dest.name}</span>
                        <span className="text-[10px] font-mono text-[#9C9186] uppercase bg-[#1B1613] px-2 py-0.5 rounded border border-[#2E271F]">
                          {dest.zone.replace('-', ' ')}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#C9A24B] hover:bg-amber-400 text-[#0F0D0B] font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
              >
                <span>Find Route</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </Container>
    </section>
  );
}

export default TransportHero;
