import React from 'react';
import { Container } from '../layout/Container';
import { communityThreadsData, travelGroupsData } from '../../data/delhi/landing';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MessageCircle, Users, ArrowRight, Calendar, MapPin } from '../icons';

/**
 * Community and Travel Together Section: Reversed split band with tighter vertical rhythm.
 *
 * @component
 */
export function CommunityBandSection() {
  return (
    <section className="py-14 sm:py-18 bg-bg-raised/60 border-y border-border-default relative">
      <Container size="wide" className="space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT HALF: Community Forum Intelligence */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="space-y-0.5">
                <div className="type-overline text-brand">Field Reports</div>
                <h3 className="type-h3 text-text-high">Traveler Forum</h3>
              </div>
              <Button variant="ghost" size="sm" to="/community" iconRight={<ArrowRight size={13} />}>
                All Threads
              </Button>
            </div>

            <div className="space-y-2.5">
              {communityThreadsData.map((thread) => (
                <div
                  key={thread.id}
                  className="p-3.5 rounded-xl bg-bg-base border border-border-default hover:border-brand/40 transition-colors space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <Badge variant={thread.tagVariant || 'default'} size="xs">
                      {thread.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-[11px] text-text-low font-mono">
                      <MessageCircle size={12} />
                      <span>{thread.replies} replies</span>
                    </div>
                  </div>

                  <h4 className="font-sans font-medium text-xs sm:text-sm text-text-high leading-snug">
                    {thread.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-text-low font-mono pt-1">
                    <span>{thread.author}</span>
                    <span>{thread.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT HALF: Travel Together Meetup Groups */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-border-subtle pb-3">
              <div className="space-y-0.5">
                <div className="type-overline text-brand">Shared Walks</div>
                <h3 className="type-h3 text-text-high">Travel Together</h3>
              </div>
              <Button variant="ghost" size="sm" to="/travel-together" iconRight={<ArrowRight size={13} />}>
                Open Groups
              </Button>
            </div>

            <div className="space-y-2.5">
              {travelGroupsData.map((group) => {
                const spotsRemaining = group.maxSpots - group.membersCount;

                return (
                  <div
                    key={group.id}
                    className="p-4 rounded-xl bg-bg-base border border-border-default hover:border-brand/40 transition-colors space-y-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display font-semibold text-sm sm:text-base text-text-high leading-tight">
                        {group.destination}
                      </h4>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-accent-soft text-accent-300 font-semibold shrink-0">
                        {spotsRemaining} {spotsRemaining === 1 ? 'spot left' : 'spots left'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-text-low font-sans pt-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-brand shrink-0" />
                        <span>{group.dateText}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Users size={13} className="text-brand shrink-0" />
                        <span>{group.membersCount} / {group.maxSpots} participants</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle text-[11px] text-text-low font-mono">
                      <div className="flex items-center gap-1 truncate max-w-[200px]">
                        <MapPin size={11} className="text-brand shrink-0" />
                        <span className="truncate">{group.meetingPoint}</span>
                      </div>
                      <span>Led by {group.organizer}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CommunityBandSection;
