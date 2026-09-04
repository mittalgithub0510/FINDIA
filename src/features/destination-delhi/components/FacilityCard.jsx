import React from 'react';

/**
 * On-Site Facilities Card Component (Section 6, Step 3).
 * Renders Parking, Cloakroom, Washroom, Food, and Accessibility specs.
 * Shows "Info coming soon" for any null fields without inventing data.
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
      value: facilities.parking,
      icon: '🅿️',
    },
    {
      id: 'cloakroom',
      label: 'Baggage Cloakroom',
      value: facilities.cloakroom,
      icon: '🧳',
    },
    {
      id: 'washroom',
      label: 'Restroom Hygiene',
      value: facilities.washroom,
      icon: '🚻',
    },
    {
      id: 'food',
      label: 'Food & Refreshments',
      value: facilities.food,
      icon: '☕',
    },
    {
      id: 'accessibility',
      label: 'Accessibility & Ramps',
      value: facilities.accessibility,
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
        {facilityItems.map((item) => {
          const hasInfo = item.value != null;

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3 transition-colors hover:bg-white/10"
            >
              <span className="text-xl shrink-0 select-none">{item.icon}</span>
              <div className="space-y-0.5 min-w-0">
                <div className="text-xs font-semibold text-text-high flex items-center gap-1.5">
                  <span>{item.label}</span>
                  {hasInfo ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400/60 shrink-0" />
                  )}
                </div>
                <p className="text-xs text-text-mid leading-relaxed line-clamp-2">
                  {item.value ?? 'Info coming soon'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FacilityCard;
