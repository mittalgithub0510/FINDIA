import React, { useState } from 'react';
import { delhiTransport } from '../data/delhi/transport';
import { TransportHero } from '../features/transport/TransportHero';
import { TransportModes } from '../features/transport/TransportModes';
import { RoutePlanner } from '../features/transport/RoutePlanner';
import { TouristZones } from '../features/transport/TouristZones';
import { TransportHubs } from '../features/transport/TransportHubs';
import { TransportTips } from '../features/transport/TransportTips';
import { TransportDisclaimer } from '../features/transport/TransportDisclaimer';

/**
 * FINDIA Transport Page - Tourism Transport Information Layer for Delhi MVP.
 * Fully structured and ready for future FINDIA AI decision engine integration.
 */
export function TransportPage() {
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
        destinations={delhiTransport.destinations}
        onSelectQuickDestination={handleQuickDestinationSelect}
      />

      {/* 2. Transport Mode Overview */}
      <TransportModes modes={delhiTransport.modes} />

      {/* 3. How to Reach / Route Options */}
      <RoutePlanner
        hubs={delhiTransport.hubs}
        destinations={delhiTransport.destinations}
        routes={delhiTransport.routes}
        presetDestination={presetDestination}
      />

      {/* 4. Explore Delhi by Tourist Zone */}
      <TouristZones
        zones={delhiTransport.zones}
        onSelectZoneDestination={handleQuickDestinationSelect}
      />

      {/* 5. Major Transport Hubs */}
      <TransportHubs hubs={delhiTransport.hubs} />

      {/* 6. Transport Tips */}
      <TransportTips />

      {/* 7. Data Transparency Disclaimer */}
      <TransportDisclaimer />
    </div>
  );
}

export default TransportPage;
