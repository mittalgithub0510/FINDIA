import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../layout/Container';
import { GlassPanel } from '../common/GlassPanel';
import { Button } from '../common/Button';
import { Sparkle, Users, MessageSquare, ChevronRight, CheckCircle2 } from '../icons';

const COMMUNITY_PREVIEWS = [
  {
    id: 'report_1',
    category: 'Ground Report',
    author: 'Aarav Sharma',
    handle: '@aarav_delhi',
    time: '20 mins ago',
    title: 'Agrasen Ki Baoli quiet after 4 PM today',
    content: 'Perfect lighting for portraits right now. Ticket line at Red Fort was 30+ mins, so came here instead. Very peaceful!',
    verified: true,
    tag: 'Quiet Site',
  },
  {
    id: 'report_2',
    category: 'Local Discovery',
    author: 'Priya Nair',
    handle: '@priya_travels',
    time: '1 hour ago',
    title: 'Hidden Paranthe Wali Gali secret stall',
    content: 'Try the rabri parantha at shop #6 near Kinari Bazaar. Zero queue if you visit before 1:30 PM.',
    verified: true,
    tag: 'Food Signal',
  },
  {
    id: 'report_3',
    category: 'Metro & Transit',
    author: 'Kabir Verma',
    handle: '@kabir_v',
    time: '2 hours ago',
    title: 'Yellow Line Chandni Chowk Gate 3 advice',
    content: 'Gate 3 is less crowded than Gate 1. Quickest exit towards Town Hall walking tour.',
    verified: true,
    tag: 'Transit Advice',
  },
];

/**
 * SECTION 7 — COMMUNITY PREVIEW
 * Heading: India, Through the People Who Know It.
 * Shows representative preview cards + direct CTA to /community.
 */
export function CommunityPreviewSection() {
  return (
    <section className="py-20 bg-bg-base border-t border-white/5 relative">
      <Container size="wide" className="space-y-10">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-amber-400">
              <Sparkle size={14} />
              <span>Ground Verification</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-text-high tracking-tight">
              India, Through the People Who Know It.
            </h2>
            <p className="type-body text-text-mid text-sm leading-relaxed">
              Real-time ground reports, crowd verifications, and local intelligence shared by residents and travelers.
            </p>
          </div>

          <Button
            variant="secondary"
            size="md"
            to="/community"
            icon={<Users size={16} className="text-amber-400" />}
          >
            Explore Community
          </Button>
        </div>

        {/* 3 Preview Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COMMUNITY_PREVIEWS.map((item) => (
            <GlassPanel
              key={item.id}
              tier="heavy"
              className="p-5 rounded-2xl border border-white/10 space-y-3.5 flex flex-col justify-between hover:border-amber-500/40 transition-colors"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {item.category}
                  </span>
                  <span className="text-[10px] text-text-low font-mono">{item.time}</span>
                </div>

                <h3 className="font-display font-bold text-base text-text-high line-clamp-1">
                  {item.title}
                </h3>

                <p className="text-xs text-text-mid leading-relaxed line-clamp-3">
                  &ldquo;{item.content}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-text-high">{item.author}</span>
                  {item.verified && (
                    <CheckCircle2 size={13} className="text-emerald-400 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] font-mono text-text-low">{item.tag}</span>
              </div>
            </GlassPanel>
          ))}
        </div>

      </Container>
    </section>
  );
}

export default CommunityPreviewSection;
