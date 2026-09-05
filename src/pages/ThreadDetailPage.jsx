import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { INITIAL_THREADS } from '../data/delhi/community';
import {
  MessageCircle,
  ArrowRight,
  CornerDownRight,
  Send,
  ArrowUp,
  ArrowDown,
  MapPin,
  Sparkles,
  Share,
  Bookmark,
  ThumbsUp,
  ThumbsDown,
  Clock,
} from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { cn } from '../utils/cn';

/**
 * FINDIA Tourism Intelligence Thread Detail Page.
 * Displays structured ground reports, local Q&A, hidden discoveries, and user comments.
 */
export function ThreadDetailPage() {
  const { threadId } = useParams();

  // Find thread by ID from INITIAL_THREADS
  const threadData = INITIAL_THREADS.find((t) => t.id === threadId) || INITIAL_THREADS[0];

  usePageMeta(
    threadData ? threadData.title : 'Discussion Thread',
    threadData ? threadData.body : 'Traveler community discussion.'
  );

  // Voting state
  const [upvotes, setUpvotes] = useState(threadData.upvotes);
  const [userVote, setUserVote] = useState(threadData.userVote);
  const [helpfulCount, setHelpfulCount] = useState(threadData.helpfulCount || 42);
  const [unhelpfulCount, setUnhelpfulCount] = useState(threadData.unhelpfulCount || 3);
  const [userFeedback, setUserFeedback] = useState(null);

  // Handle signal authenticity feedback (True vs False)
  const handleFeedback = (type) => {
    if (userFeedback === type) {
      if (type === 'helpful') setHelpfulCount((p) => p - 1);
      if (type === 'unhelpful') setUnhelpfulCount((p) => p - 1);
      setUserFeedback(null);
    } else {
      if (userFeedback === 'helpful') setHelpfulCount((p) => p - 1);
      if (userFeedback === 'unhelpful') setUnhelpfulCount((p) => p - 1);

      if (type === 'helpful') setHelpfulCount((p) => p + 1);
      if (type === 'unhelpful') setUnhelpfulCount((p) => p + 1);
      setUserFeedback(type);
    }
  };

  // Interactive replies list
  const [replies, setReplies] = useState(
    threadData.comments && threadData.comments.length > 0
      ? threadData.comments
      : [
          {
            id: 'rep-1',
            author: 'Rajiv_OldDelhi',
            authorBadge: 'Verified Local',
            timeAgo: '1 hr ago',
            body: 'Confirmed! Walked past at 10:15 AM today. The QR e-ticket gate moved 3x faster than cash line.',
            replies: [
              {
                id: 'rep-1-1',
                author: threadData.author,
                authorBadge: threadData.authorBadge,
                timeAgo: '45 mins ago',
                body: 'Thanks for verifying Rajiv! Good to know the e-ticket scanner is operating properly.',
              },
            ],
          },
        ]
  );

  const [newReplyText, setNewReplyText] = useState('');

  // Handle voting
  const handleVote = (direction) => {
    if (userVote === direction) {
      setUpvotes((prev) => (direction === 'up' ? prev - 1 : prev + 1));
      setUserVote(null);
    } else if (userVote === null) {
      setUpvotes((prev) => (direction === 'up' ? prev + 1 : prev - 1));
      setUserVote(direction);
    } else {
      setUpvotes((prev) => (direction === 'up' ? prev + 2 : prev - 2));
      setUserVote(direction);
    }
  };

  // Handle helpful toggle
  const handleHelpful = () => {
    setHelpfulCount((prev) => (userHelpful ? prev - 1 : prev + 1));
    setUserHelpful((prev) => !prev);
  };

  // Add new reply
  const handleAddReply = (e) => {
    e.preventDefault();
    if (!newReplyText.trim()) return;

    setReplies((prev) => [
      ...prev,
      {
        id: `rep-${Date.now()}`,
        author: 'You (Traveler)',
        authorBadge: 'Local Contributor',
        timeAgo: 'Just now',
        body: newReplyText,
      },
    ]);
    setNewReplyText('');
  };

  if (!threadData) {
    return (
      <div className="pt-28 pb-20 w-full min-h-[60vh] flex items-center justify-center">
        <EmptyState
          icon={<MessageCircle size={32} className="text-amber-400" />}
          title="Intelligence Report Not Found"
          description={`The report "${threadId}" could not be located.`}
          action={
            <Button variant="primary" size="sm" to="/community" icon={<ArrowRight size={14} />}>
              Back to Community
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="w-full pt-6 pb-24 select-none">
      <Container size="default" className="space-y-6">
        
        {/* Breadcrumb Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-text-low">
          <Link to="/community" className="hover:text-amber-400 transition-colors">
            FINDIA Community
          </Link>
          <span>/</span>
          <span className="text-amber-400 font-bold">{threadData.channel || threadData.subreddit}</span>
        </div>

        {/* 1. ORIGINAL POST CARD */}
        <article className="flex rounded-3xl glass-panel border border-white/10 overflow-hidden shadow-lifted">
          {/* LEFT VOTING PILLAR */}
          <div className="w-14 bg-black/20 flex flex-col items-center justify-start pt-6 pb-6 gap-1 border-r border-white/5 shrink-0">
            <button
              type="button"
              aria-label="Upvote"
              onClick={() => handleVote('up')}
              className={cn(
                'p-2 rounded-xl transition-colors cursor-pointer',
                userVote === 'up'
                  ? 'text-amber-400 bg-amber-500/20'
                  : 'text-text-low hover:text-amber-400 hover:bg-white/10'
              )}
            >
              <ArrowUp size={20} />
            </button>

            <span
              className={cn(
                'text-sm font-mono font-bold',
                userVote === 'up' && 'text-amber-400',
                userVote === 'down' && 'text-indigo-400',
                !userVote && 'text-text-high'
              )}
            >
              {upvotes}
            </span>

            <button
              type="button"
              aria-label="Downvote"
              onClick={() => handleVote('down')}
              className={cn(
                'p-2 rounded-xl transition-colors cursor-pointer',
                userVote === 'down'
                  ? 'text-indigo-400 bg-indigo-500/20'
                  : 'text-text-low hover:text-indigo-400 hover:bg-white/10'
              )}
            >
              <ArrowDown size={20} />
            </button>
          </div>

          {/* MAIN ARTICLE BODY */}
          <div className="p-6 sm:p-8 flex-1 space-y-4">
            
            {/* Top Badges Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-bold text-[11px]">
                {threadData.channel || threadData.subreddit}
              </span>

              {/* Linked Monument Pill */}
              <Link
                to={`/destination/north/delhi/${threadData.placeSlug}`}
                className="px-2.5 py-0.5 rounded-md bg-white/5 hover:bg-white/15 border border-white/10 text-text-high font-mono text-[11px] flex items-center gap-1 transition-colors"
              >
                <MapPin size={12} className="text-amber-400" />
                <span>{threadData.placeName}</span>
              </Link>

              {/* Crowd Status Badge */}
              <span
                className={cn(
                  'px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase flex items-center gap-1 border',
                  threadData.crowdStatus === 'low' && 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
                  threadData.crowdStatus === 'moderate' && 'bg-amber-950/60 text-amber-300 border-amber-500/30',
                  threadData.crowdStatus === 'heavy' && 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                )}
              >
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    threadData.crowdStatus === 'low' && 'bg-emerald-400',
                    threadData.crowdStatus === 'moderate' && 'bg-amber-400',
                    threadData.crowdStatus === 'heavy' && 'bg-rose-400 animate-ping'
                  )}
                />
                <span>{threadData.crowdStatus} Crowd</span>
              </span>

              {/* Freshness Badge */}
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1 ml-auto">
                <Clock size={10} />
                <span>{threadData.freshnessLabel || threadData.timeAgo}</span>
              </span>
            </div>

            <h1 className="font-display font-bold text-xl sm:text-2xl text-text-high leading-tight">
              {threadData.title}
            </h1>

            <p className="type-body text-text-mid text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {threadData.body}
            </p>

            {/* STRUCTURED DATA BOX IF AVAILABLE */}
            {threadData.structuredData && (
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs">
                <div className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  Structured Tourism Signals
                </div>
                {Object.entries(threadData.structuredData).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center text-xs">
                    <span className="text-text-low capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                    <span className="font-mono text-amber-300 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            )}

            {/* BOTTOM ACTIONS BAR */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-text-low">
              
              <div className="font-mono flex items-center gap-2">
                <span>Posted by <strong className="text-text-high">{threadData.author}</strong> ({threadData.authorBadge})</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleFeedback('helpful')}
                    title="Verify as true signal"
                    className={cn(
                      'flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-xl transition-all cursor-pointer border',
                      userFeedback === 'helpful'
                        ? 'bg-emerald-500/25 text-emerald-300 border-emerald-500/50'
                        : 'bg-white/5 text-text-mid border-white/10 hover:text-emerald-300'
                    )}
                  >
                    <ThumbsUp size={12} />
                    <span>{helpfulCount} True</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFeedback('unhelpful')}
                    title="Flag as false report or inaccurate"
                    className={cn(
                      'flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-xl transition-all cursor-pointer border',
                      userFeedback === 'unhelpful'
                        ? 'bg-rose-500/25 text-rose-300 border-rose-500/50'
                        : 'bg-white/5 text-text-mid border-white/10 hover:text-rose-400'
                    )}
                  >
                    <ThumbsDown size={12} />
                    <span>{unhelpfulCount} False</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => alert('Link copied to clipboard!')}
                  className="hover:text-text-high flex items-center gap-1 cursor-pointer"
                >
                  <Share size={14} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </article>

        {/* 2. REPLIES LIST */}
        <div className="space-y-4">
          <h2 className="font-display font-bold text-lg text-text-high flex items-center gap-2">
            <MessageCircle size={18} className="text-amber-400" />
            <span>Community Discussion ({replies.length})</span>
          </h2>

          <div className="space-y-3">
            {replies.map((reply) => (
              <div key={reply.id} className="space-y-3">
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-amber-300 font-bold">{reply.author} <span className="text-text-low font-normal">({reply.authorBadge})</span></span>
                    <span className="text-text-low">{reply.timeAgo}</span>
                  </div>
                  <p className="text-xs text-text-mid leading-relaxed">
                    {reply.body}
                  </p>
                </div>

                {reply.replies && reply.replies.length > 0 && (
                  <div className="pl-6 sm:pl-10 space-y-2">
                    {reply.replies.map((nested) => (
                      <div
                        key={nested.id}
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5"
                      >
                        <div className="flex items-center gap-1.5 text-xs text-amber-300 font-mono font-medium">
                          <CornerDownRight size={13} className="text-amber-400" />
                          <span>{nested.author} ({nested.authorBadge})</span>
                          <span className="text-text-low font-normal">• {nested.timeAgo}</span>
                        </div>
                        <p className="text-xs text-text-mid leading-relaxed">
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

        {/* 3. INTERACTIVE REPLY COMPOSER */}
        <form onSubmit={handleAddReply} className="p-5 rounded-3xl glass-panel border border-white/10 space-y-3">
          <div className="text-xs font-semibold text-text-high flex items-center gap-1.5">
            <Sparkles size={14} className="text-amber-400" />
            <span>Join the Discussion</span>
          </div>

          <textarea
            rows={3}
            value={newReplyText}
            onChange={(e) => setNewReplyText(e.target.value)}
            placeholder="Write your advice, queue update, or feedback..."
            className="w-full p-3.5 rounded-2xl glass-panel border border-white/10 text-xs text-text-high placeholder-text-low resize-none outline-none focus:border-amber-400"
            required
          />

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-bg-base font-bold text-xs transition-colors flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Send size={14} />
              <span>Submit Comment</span>
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
}

export default ThreadDetailPage;
