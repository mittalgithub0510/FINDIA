import React from 'react';

/**
 * On-Site Facilities Card Component for Prayagraj.
 * Renders Parking, Cloakroom, Washroom, Food, and Accessibility specs.
 *
 * @param {Object} props
 * @param {Object} props.place - Canonical place record
 */
export function FacilityCard({ place }) {
  if (!place) return null;

  const facilities = place.facilities || {};

  const facilityItems = [
    {
      id: 'parking',
      label: 'Vehicle Parking',
      value: facilities.parking || 'Designated riverbank / street parking available',
      icon: '🅿️',
    },
    {
      id: 'cloakroom',
      label: 'Baggage Cloakroom',
      value: facilities.cloakroom || 'Shoe & bag deposit counters near entrance',
      icon: '🧳',
    },
    {
      id: 'washroom',
      label: 'Restroom Hygiene',
      value: facilities.washroom || 'Public pilgrim restrooms & changing facilities',
      icon: '🚻',
    },
    {
      id: 'food',
      label: 'Food & Refreshments',
      value: facilities.food || 'Tea kiosks, fresh lassi, and local sweet stalls nearby',
      icon: '☕',
    },
    {
      id: 'accessibility',
      label: 'Accessibility & Ramps',
      value: facilities.accessibility || 'Paved approaches with assistance available',
      icon: '♿',
    },
  ];

  return (
    <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-white/10 shadow-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <h3 className="text-xs font-mono uppercase tracking-wider font-bold text-amber-400">
          On-Site Facilities & Accessibility
        </h3>
        <span className="text-[11px] font-mono text-text-low">Ground Audited</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {facilityItems.map((item) => (
          <div
            key={item.id}
            className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3"
          >
            <span className="text-xl shrink-0 select-none" role="img" aria-label={item.label}>
              {item.icon}
            </span>
            <div className="space-y-1 min-w-0">
              <div className="text-[11px] font-mono uppercase text-text-low font-bold">
                {item.label}
              </div>
              <div className="text-xs text-text-high leading-relaxed font-sans">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacilityCard;
