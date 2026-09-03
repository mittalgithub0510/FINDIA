import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { forumThreads, threadDetailSample } from '../data/delhi/community';
import { MessageCircle, ArrowRight, CornerDownRight, Send } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Thread Detail Page.
 * Feature Owner: src/features/community/
 *
 * @page
 */
export function ThreadDetailPage() {
  const { threadId } = useParams();

  // For demo purposes, we resolve threadId against forumThreads; if match, we augment with sample replies
  const threadMeta = forumThreads.find((t) => t.id === threadId);
  const thread = threadMeta ? { ...threadDetailSample, ...threadMeta } : null;

  usePageMeta(
    thread ? thread.title : 'Discussion Thread Not Found',
    thread ? thread.body : 'Traveler community discussion.'
  );

  if (!thread) {
    return (
      <div className="pt-28 pb-20 w-full min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={<MessageCircle size={32} className="text-brand" />}
          title="Thread Not Found"
          description={`The discussion thread "${threadId}" could not be located.`}
          action={
            <Button variant="primary" size="sm" to="/community" icon={<ArrowRight size={14} />}>
              Back to Forum
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full pt-24 pb-24 select-none">
      <Container size="default" className="space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-low">
          <Link to="/community" className="hover:text-brand transition-colors">
            Community Forum
          </Link>
          <span>/</span>
          <span className="text-brand uppercase">{thread.tag}</span>
        </div>

        {/* 1. Original Post Card */}
        <article className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default space-y-4 shadow-card">
          <div className="flex items-center justify-between border-b border-border-subtle pb-3">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-overlay border border-border-subtle text-brand font-semibold">
              {thread.tag}
            </span>
            <div className="text-xs text-text-low font-mono">
              {thread.timeAgo}
            </div>
          </div>

          <h1 className="font-display font-bold text-xl sm:text-2xl text-text-high leading-tight">
            {thread.title}
          </h1>

          <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {thread.body}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-border-subtle text-xs text-text-low font-mono">
            <div>
              Posted by <strong className="text-text-high">{thread.author}</strong> ({thread.authorBadge})
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle size={13} className="text-brand" />
              <span>{thread.repliesCount} Responses</span>
            </div>
          </div>
        </article>

        <ComingSoonNote
          featureName="Thread Subscriptions & Live Reactions"
          owner="community"
          description="Replies below render from mock data. Thread author badge verification and realtime reply submission belong in src/features/community/."
        />

        {/* 2. Threaded Replies List */}
        <div className="space-y-4">
          <h2 className="font-display font-semibold text-lg text-text-high">
            Discussion Responses
          </h2>

          <div className="space-y-3">
            {thread.replies.map((reply) => (
              <div key={reply.id} className="space-y-3">
                {/* Top-Level Reply */}
                <div className="p-4 sm:p-5 rounded-xl bg-bg-raised border border-border-default space-y-2">
                  <div className="flex items-center justify-between text-xs text-text-low font-mono">
                    <span className="text-text-high font-medium">{reply.author} ({reply.authorBadge})</span>
                    <span>{reply.timeAgo}</span>
                  </div>
                  <p className="type-body-sm text-text-mid text-xs leading-relaxed">
                    {reply.body}
                  </p>
                </div>

                {/* Nested Reply (Correct indentation) */}
                {reply.replies && reply.replies.length > 0 && (
                  <div className="pl-6 sm:pl-10 space-y-2">
                    {reply.replies.map((nested) => (
                      <div
                        key={nested.id}
                        className="p-3.5 rounded-xl bg-bg-base border border-border-default space-y-1.5 relative"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-brand font-mono font-medium">
                          <CornerDownRight size={13} />
                          <span>{nested.author} ({nested.authorBadge})</span>
                          <span className="text-text-low font-normal">• {nested.timeAgo}</span>
                        </div>
                        <p className="type-body-sm text-text-mid text-xs leading-relaxed">
                          {nested.body}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. Disabled Reply Composer */}
        {/* TODO: Supabase auth state check & insert reply row into community_replies */}
        <div className="p-5 rounded-2xl bg-bg-raised border border-border-default space-y-3">
          <div className="text-xs font-semibold text-text-high font-sans">
            Post a Response
          </div>
          <textarea
            disabled
            rows={3}
            placeholder="Sign in with verified mobile to reply to this thread..."
            className="w-full p-3 rounded-xl bg-bg-base border border-border-default text-xs text-text-mid resize-none cursor-not-allowed opacity-70 outline-none"
          />
          <div className="flex justify-end">
            <Button
              variant="primary"
              size="sm"
              icon={<Send size={14} />}
              className="opacity-70 cursor-not-allowed"
              onClick={() => alert('Reply submission form will be wired by community feature owner.')}
            >
              Submit Response
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default ThreadDetailPage;
