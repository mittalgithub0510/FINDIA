import React from 'react';
import { Metro, Navigation, Walk, Ticket, Clock, CheckCircle2 } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TransportTips() {
  const tips = [
    {
      icon: <Metro size={20} className="text-purple-400" />,
      title: 'METRO EFFICIENT CORRIDORS',
      description: 'Useful for longer city crossings and major tourist corridors without traffic congestion.'
    },
    {
      icon: <Navigation size={20} className="text-emerald-400" />,
      title: 'LAST-MILE CONNECTIVITY',
      description: 'Auto or e-rickshaws can be extremely useful between metro stations and inner market/monument entry gates.'
    },
    {
      icon: <Walk size={20} className="text-emerald-300" />,
      title: 'HERITAGE WALKING TRAILS',
      description: 'Many compact heritage zones (like Chandni Chowk or Lodhi Gardens) are better explored on foot after reaching the nearest point.'
    },
    {
      icon: <Ticket size={20} className="text-[#C9A24B]" />,
      title: 'APPROXIMATE FARES',
      description: 'Displayed fares are approximate baseline estimates and can vary based on app surge, meter fare card updates, or negotiation.'
    },
    {
      icon: <Clock size={20} className="text-amber-400" />,
      title: 'TRAVEL TIME VARIANCE',
      description: 'Actual travel time can change due to peak road traffic, waiting time, seasonal rush, or operational metro schedule shifts.'
    }
  ];

  return (
    <section className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Header */}
        <div className="space-y-2 max-w-2xl">
          <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
            Practical Delhi Travel Tips
          </h2>
          <p className="type-body text-[#9C9186] text-sm sm:text-base leading-relaxed">
            Essential guidelines for moving around Delhi comfortably as a visitor.
          </p>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#1B1613] border border-[#2E271F] flex items-center justify-center shrink-0">
                  {tip.icon}
                </div>
                <h3 className="font-mono font-bold text-xs text-[#C9A24B] tracking-wider uppercase">
                  {tip.title}
                </h3>
              </div>

              <p className="text-xs text-[#9C9186] leading-relaxed">
                {tip.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default TransportTips;
