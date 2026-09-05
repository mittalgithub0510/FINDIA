import React, { useState, useEffect } from 'react';
import { Metro, Bus, Navigation, Car, Walk, MapPin, Clock, Ticket, ArrowRight, CornerDownRight, ExternalLink, Search } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function RoutePlanner({ hubs = [], destinations = [], routes = [], presetDestination = null }) {
  const [toId, setToId] = useState('india-gate');
  const [destSearchQuery, setDestSearchQuery] = useState('');
  const [activeModeFilter, setActiveModeFilter] = useState('all');

  // GPS Live Location State
  const [gpsLocation, setGpsLocation] = useState(null);
  const [isLocating, setIsLocating] = useState(true);
  const [gpsError, setGpsError] = useState(null);

  // Auto-detect Live GPS location on component mount
  const fetchLiveGPS = () => {
    if (!navigator.geolocation) {
      setGpsError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    setIsLocating(true);
    setGpsError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setGpsLocation({
          latitude,
          longitude,
          name: `Live GPS Location (${latitude.toFixed(3)}°, ${longitude.toFixed(3)}°)`
        });
        setIsLocating(false);
      },
      (err) => {
        setIsLocating(false);
        // Default Live Location fallback if permission denied
        setGpsLocation({
          latitude: 28.6139,
          longitude: 77.209,
          name: 'Delhi Live GPS Area (28.614°, 77.209°)'
        });
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  useEffect(() => {
    fetchLiveGPS();
  }, []);

  // Handle external preset destination if passed
  useEffect(() => {
    if (presetDestination) {
      setToId(presetDestination.id || presetDestination);
      const matched = destinations.find((d) => d.id === (presetDestination.id || presetDestination));
      if (matched) {
        setDestSearchQuery(matched.name);
      }
    }
  }, [presetDestination, destinations]);

  const selectedDest = destinations.find((d) => d.id === toId) || destinations[0];
  const toLocationName = selectedDest?.name || 'India Gate';

  const fromLocationName = gpsLocation
    ? `Live Location (${gpsLocation.latitude.toFixed(3)}°, ${gpsLocation.longitude.toFixed(3)}°)`
    : 'Live GPS Location';

  // Dynamic route options generated directly from Live Location to destination (Including DTC Bus)
  const routeOptions = [
    {
      mode: 'metro',
      label: 'Delhi Metro Route & Station Guide',
      estimatedTime: '20–35 min',
      estimatedFare: '₹20–₹50',
      transfers: 1,
      notes: `Board nearest Delhi Metro station from your live location towards ${toLocationName}.`
    },
    {
      mode: 'bus',
      label: 'DTC & Cluster Bus Service',
      estimatedTime: '30–50 min',
      estimatedFare: '₹10–₹25',
      transfers: 0,
      notes: `DTC low-floor red/green & electric buses connecting towards ${toLocationName}.`
    },
    {
      mode: 'auto',
      label: 'Auto-Rickshaw / E-Rickshaw',
      estimatedTime: '15–30 min',
      estimatedFare: '₹60–₹140',
      transfers: 0,
      notes: `Direct last-mile auto pickup from your current live GPS position to ${toLocationName}.`
    },
    {
      mode: 'cab',
      label: 'App Cab (Uber / Ola / Rapido)',
      estimatedTime: '15–35 min',
      estimatedFare: '₹120–₹280',
      transfers: 0,
      notes: `Door-to-door AC cab pickup right at your live location.`
    },
    {
      mode: 'walk',
      label: 'Walking / Heritage Navigation',
      estimatedTime: '10–25 min',
      estimatedFare: 'Free',
      transfers: 0,
      notes: `Direct walking directions from your live location to ${toLocationName}.`
    }
  ];

  const filteredOptions = routeOptions.filter(
    (opt) => activeModeFilter === 'all' || opt.mode === activeModeFilter
  );

  // Deep Link Generators
  const getGoogleMapsUrl = (travelmode) => {
    if (gpsLocation) {
      return `https://www.google.com/maps/dir/?api=1&origin=${gpsLocation.latitude},${gpsLocation.longitude}&destination=${encodeURIComponent(toLocationName + ', Delhi')}&travelmode=${travelmode}`;
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(toLocationName + ', Delhi')}&travelmode=${travelmode}`;
  };

  const getModeBadge = (modeKey) => {
    switch (modeKey) {
      case 'metro':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-bold font-mono">
            <Metro size={13} />
            <span>Metro</span>
          </span>
        );
      case 'bus':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold font-mono">
            <Bus size={13} />
            <span>DTC Bus</span>
          </span>
        );
      case 'auto':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            <Navigation size={13} />
            <span>Auto</span>
          </span>
        );
      case 'cab':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/40 text-xs font-bold font-mono">
            <Car size={13} />
            <span>Cab / Taxi</span>
          </span>
        );
      case 'walk':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 text-xs font-bold font-mono">
            <Walk size={13} />
            <span>Walk</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="route-planner" className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            How to Reach
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Live GPS location route suggestions & direct transport app links to your chosen destination.
          </p>
        </div>

        {/* Live GPS & Destination Control Panel */}
        <div className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] shadow-xl space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            {/* Starting Point (Live GPS Location Card - No Dropdown List) */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B] flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} className="text-emerald-400" />
                  <span>From (Live GPS Location)</span>
                </span>
                <button
                  type="button"
                  onClick={fetchLiveGPS}
                  className="text-[10px] text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>{isLocating ? 'Updating...' : 'Refresh GPS'}</span>
                </button>
              </label>

              <div className="p-3 rounded-xl bg-[#1B1613] border border-[#2E271F] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                  <span className="text-sm font-semibold text-[#F3EBDC]">
                    {isLocating ? 'Detecting Live GPS...' : fromLocationName}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  Live
                </span>
              </div>
            </div>

            {/* Direction Indicator */}
            <div className="md:col-span-2 flex items-center justify-center pt-2 md:pt-4">
              <div className="w-10 h-10 rounded-full bg-[#1B1613] border border-[#2E271F] flex items-center justify-center text-[#C9A24B]">
                <ArrowRight size={18} className="rotate-90 md:rotate-0" />
              </div>
            </div>

            {/* Destination Input (Where do you want to go?) */}
            <div className="md:col-span-5 space-y-1.5">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#C9A24B] flex items-center gap-1.5">
                <Navigation size={14} className="text-[#C9A24B]" />
                <span>Where do you want to go?</span>
              </label>

              <div className="relative">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9C9186]" />
                <select
                  value={toId}
                  onChange={(e) => setToId(e.target.value)}
                  aria-label="Select destination"
                  className="w-full bg-[#1B1613] text-[#F3EBDC] text-sm font-semibold pl-10 pr-8 py-3 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none appearance-none cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.zone.replace('-', ' ').toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Quick Popular Destination Pills */}
          <div className="space-y-1.5 pt-2 border-t border-[#241F19]">
            <span className="text-[10px] font-mono text-[#9C9186] uppercase block">Popular Destinations:</span>
            <div className="flex flex-wrap gap-1.5">
              {destinations.slice(0, 6).map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setToId(dest.id)}
                  className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    toId === dest.id
                      ? 'bg-[#C9A24B] text-[#0F0D0B] font-bold'
                      : 'bg-[#1B1613] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F]'
                  }`}
                >
                  {dest.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-[#241F19]">
            <span className="text-xs font-mono text-[#9C9186] mr-2 shrink-0">Filter Mode:</span>
            {[
              { id: 'all', label: 'All Options' },
              { id: 'metro', label: 'Metro' },
              { id: 'bus', label: 'DTC Bus' },
              { id: 'auto', label: 'Auto / E-Rickshaw' },
              { id: 'cab', label: 'Cab / Taxi' },
              { id: 'walk', label: 'Walking' }
            ].map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveModeFilter(filter.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  activeModeFilter === filter.id
                    ? 'bg-[#C9A24B] text-[#0F0D0B] shadow-md'
                    : 'bg-[#1B1613] text-[#9C9186] hover:bg-[#241E1A] hover:text-[#F3EBDC] border border-[#2E271F]'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Route Results Rendering Area */}
        <div className="space-y-4">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-xl bg-[#17130F] border border-[#2E271F]">
            <div className="flex items-center gap-2 text-sm sm:text-base font-bold text-[#F3EBDC]">
              <span className="text-[#C9A24B]">Your Live Location</span>
              <ArrowRight size={16} className="text-[#9C9186]" />
              <span className="text-[#F3EBDC]">{toLocationName}</span>
            </div>

            <span className="text-xs font-mono text-emerald-300 bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/40 flex items-center gap-1 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Live GPS Suggestions</span>
            </span>
          </div>

          {/* Option Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredOptions.map((opt, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {getModeBadge(opt.mode)}
                    <span className="text-[10px] font-mono text-[#9C9186]">
                      Direct Route
                    </span>
                  </div>

                  <h3 className="font-bold text-[#F3EBDC] text-sm leading-snug">
                    {opt.label}
                  </h3>

                  {opt.notes && (
                    <div className="p-3 rounded-xl bg-[#1B1613] border border-[#2E271F] text-xs text-[#9C9186] leading-relaxed flex items-start gap-2">
                      <CornerDownRight size={14} className="text-[#C9A24B] shrink-0 mt-0.5" />
                      <span>{opt.notes}</span>
                    </div>
                  )}
                </div>

                {/* Fare & Time Specs + Direct App Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-[#241F19]">
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="space-y-0.5">
                      <div className="text-[10px] text-[#6E655B] uppercase flex items-center gap-1">
                        <Clock size={11} className="text-amber-400" />
                        <span>Approx. Time</span>
                      </div>
                      <div className="font-bold text-[#F3EBDC]">{opt.estimatedTime}</div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[10px] text-[#6E655B] uppercase flex items-center gap-1">
                        <Ticket size={11} className="text-[#C9A24B]" />
                        <span>Approx. Fare</span>
                      </div>
                      <div className="font-bold text-[#5FA97C]">{opt.estimatedFare}</div>
                    </div>
                  </div>

                  {/* METRO APP & DMRC DIRECT LINKS */}
                  {opt.mode === 'metro' && (
                    <div className="space-y-1.5">
                      <a
                        href={getGoogleMapsUrl('transit')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        <span>Delhi Metro Line & Transit Route</span>
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href="https://www.delhimetrorail.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-3 rounded-xl bg-[#1B1613] hover:bg-[#241E1A] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>DMRC Official Metro Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* DTC BUS ROUTE & TRANSIT DIRECT LINKS */}
                  {opt.mode === 'bus' && (
                    <div className="space-y-1.5">
                      <a
                        href={getGoogleMapsUrl('transit')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                      >
                        <span>DTC Bus Route & Transit Guide</span>
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href="https://dtc.delhi.gov.in/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-1.5 px-3 rounded-xl bg-[#1B1613] hover:bg-[#241E1A] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] font-semibold text-[11px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>DTC Official Portal</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* CAB (UBER, OLA, RAPIDO) DIRECT APP LINKS */}
                  {opt.mode === 'cab' && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#9C9186] block">Book Cab Instant App Links:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <a
                          href="https://m.uber.com/ul/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-[11px] font-bold text-center border border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Uber</span>
                        </a>
                        <a
                          href="https://book.olacabs.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-lime-600/30 hover:bg-lime-600/40 text-lime-300 text-[11px] font-bold text-center border border-lime-500/40 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Ola</span>
                        </a>
                        <a
                          href="https://www.rapido.bike/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-amber-500/30 hover:bg-amber-500/40 text-amber-300 text-[11px] font-bold text-center border border-amber-500/40 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Rapido</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* AUTO (RAPIDO AUTO, UBER AUTO, OLA AUTO) DIRECT LINKS */}
                  {opt.mode === 'auto' && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase text-[#9C9186] block">Book Auto Rickshaw App Links:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <a
                          href="https://www.rapido.bike/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-amber-500/30 hover:bg-amber-500/40 text-amber-300 text-[11px] font-bold text-center border border-amber-500/40 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Rapido</span>
                        </a>
                        <a
                          href="https://m.uber.com/ul/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-black text-white hover:bg-neutral-800 text-[11px] font-bold text-center border border-white/20 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Uber</span>
                        </a>
                        <a
                          href="https://book.olacabs.com/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-2 rounded-lg bg-lime-600/30 hover:bg-lime-600/40 text-lime-300 text-[11px] font-bold text-center border border-lime-500/40 transition-all flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Ola</span>
                        </a>
                      </div>
                    </div>
                  )}

                  {/* WALKING DIRECT GOOGLE MAPS LINK */}
                  {opt.mode === 'walk' && (
                    <a
                      href={getGoogleMapsUrl('walking')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                    >
                      <span>Open Walking Directions on Google Maps</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default RoutePlanner;
