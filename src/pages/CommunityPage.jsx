import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { forumTags, forumThreads } from '../data/delhi/community';
import { MessageCircle, Plus, Shield, Search, ArrowRight } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { cn } from '../utils/cn';

/**
 * Community Forum Index Page.
 * Feature Owner: src/features/community/
 *
 * @page
 */
export function CommunityPage() {
  const { city } = useCity();
  usePageMeta(
    `Traveler Forum & Field Intelligence — ${city.name}`,
    `Live field reports, lost & found items, security advisories, and transit tips shared by travelers in ${city.name}.`
  );

  const [activeTag, setActiveTag] = useState('all');

  const filteredThreads = activeTag === 'all'
    ? forumThreads
    : forumThreads.filter((t) => t.tag === activeTag);

  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline={`Field Intelligence • ${city.name}`}
        title="Traveler Forum & Ground Reports"
        description={`Direct peer-to-peer notices regarding metro gate closures, ticketing advisories, safety recommendations, and lost items across ${city.name}.`}
      />

      <Container size="wide" className="pt-8 space-y-8">
        <ComingSoonNote
          featureName="Supabase Community Auth & Realtime Subscriptions"
          owner="community"
          description="Thread listings are currently loaded from mock data. User authentication, thread creation, and live comment sockets belong in src/features/community/."
        />

        {/* Tag Rail across top with distinct Lost & Found pill */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2" style={{ scrollbarWidth: 'none' }}>
          {forumTags.map((tag) => {
            const isActive = tag.id === activeTag;
            const isLostAndFound = tag.id === 'lost-and-found';

            return (
              <button
                key={tag.id}
                type="button"
                onClick={() => setActiveTag(tag.id)}
                className={cn(
                  'shrink-0 px-3.5 py-1.5 rounded-pill text-xs font-medium transition-all cursor-pointer outline-none flex items-center gap-1.5',
                  'focus-visible:ring-1 focus-visible:ring-brand',
                  isActive
                    ? 'bg-brand text-text-inverse font-semibold shadow-soft'
                    : isLostAndFound
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:border-amber-500/60'
                    : 'bg-bg-raised text-text-mid border border-border-default hover:border-brand/40'
                )}
              >
                <span>{tag.label}</span>
              </button>
            );
          })}
        </div>

        {/* Forum Layout: Threads Feed (8 cols) + Rules Sidebar (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Feed */}
          <div className="lg:col-span-8 space-y-3">
            {filteredThreads.map((thread) => {
              const isLostAndFound = thread.tag === 'lost-and-found';

              return (
                <Link
                  key={thread.id}
                  to={`/community/${thread.id}`}
                  className="block p-4 sm:p-5 rounded-2xl bg-bg-raised border border-border-default hover:border-brand/50 transition-all duration-fast space-y-2.5 outline-none focus-visible:ring-1 focus-visible:ring-brand"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        'text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold',
                        isLostAndFound
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          : 'bg-bg-overlay border border-border-subtle text-text-low'
                      )}
                    >
                      {thread.tag}
                    </span>

                    <div className="flex items-center gap-1 text-xs text-text-low font-mono">
                      <MessageCircle size={13} className="text-brand" />
                      <span>{thread.repliesCount} replies</span>
                    </div>
                  </div>

                  <h3 className="font-display font-semibold text-sm sm:text-base text-text-high hover:text-accent-300 transition-colors leading-snug">
                    {thread.title}
                  </h3>

                  <p className="type-body-sm text-text-mid text-xs line-clamp-2 leading-relaxed">
                    {thread.body}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-text-low font-mono pt-1 border-t border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span className="text-text-high font-medium">{thread.author}</span>
                      <span>•</span>
                      <span>{thread.authorBadge}</span>
                    </div>
                    <span>{thread.timeAgo}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Start Thread Button (Disabled with TODO) */}
            {/* TODO: Supabase auth check & open thread creation modal */}
            <div className="p-5 rounded-2xl bg-bg-raised border border-border-default space-y-3">
              <Button
                variant="primary"
                size="md"
                className="w-full justify-center opacity-70 cursor-not-allowed"
                icon={<Plus size={16} />}
                onClick={() => alert('Thread creation form will be wired by community feature owner.')}
              >
                Start a Discussion
              </Button>
              <div className="text-[11px] text-text-low font-mono text-center">
                Requires phone number verification
              </div>
            </div>

            {/* Community Standards */}
            <div className="p-5 rounded-2xl bg-bg-raised border border-border-default space-y-3 text-xs">
              <div className="flex items-center gap-2 text-brand font-mono font-semibold uppercase tracking-wider">
                <Shield size={14} />
                <span>Field Guidelines</span>
              </div>
              <ul className="space-y-2 text-text-mid font-sans leading-relaxed list-disc list-inside">
                <li>Ground advisories must reference specific gates and timings.</li>
                <li>Commercial promotional links are strictly prohibited.</li>
                <li>Lost & found posts should deposit valuables with official ASI booths.</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default CommunityPage;
