import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { delhiTransport } from '../data/delhi/transport';
import { prayagrajTransport } from '../data/prayagraj/transport';
import { TransportHero } from '../features/transport/TransportHero';
import { TransportModes } from '../features/transport/TransportModes';
import { RoutePlanner } from '../features/transport/RoutePlanner';
import { TouristZones } from '../features/transport/TouristZones';
import { TransportHubs } from '../features/transport/TransportHubs';
import { TransportTips } from '../features/transport/TransportTips';
import { TransportDisclaimer } from '../features/transport/TransportDisclaimer';

/**
 * FINDIA Transport Page - Tourism Transport Information Layer.
 */
export function TransportPage() {
  const { city } = useCity();
  const transportData = city?.slug === 'prayagraj' ? prayagrajTransport : delhiTransport;
  const [presetDestination, setPresetDestination] = useState(null);

  const handleQuickDestinationSelect = (dest) => {
    setPresetDestination(dest);
    // Scroll smoothly to route planner section
    const el = document.getElementById('route-planner');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-[#F3EBDC] selection:bg-[#C9A24B] selection:text-[#0F0D0B]">
      {/* 1. Hero Section */}
      <TransportHero
        destinations={transportData.destinations}
        onSelectQuickDestination={handleQuickDestinationSelect}
      />

      {/* 2. Transport Mode Overview */}
      <TransportModes modes={transportData.modes} />

      {/* 3. How to Reach / Route Options */}
      <RoutePlanner
        hubs={transportData.hubs}
        destinations={transportData.destinations}
        routes={transportData.routes}
        presetDestination={presetDestination}
      />

      {/* 4. Explore by Tourist Zone */}
      <TouristZones
        zones={transportData.zones}
        onSelectZoneDestination={handleQuickDestinationSelect}
      />

      {/* 5. Major Transport Hubs */}
      <TransportHubs hubs={transportData.hubs} />

      {/* 6. Transport Tips */}
      <TransportTips />

      {/* 7. Data Transparency Disclaimer */}
      <TransportDisclaimer />
    </div>
  );
}

export default TransportPage;
