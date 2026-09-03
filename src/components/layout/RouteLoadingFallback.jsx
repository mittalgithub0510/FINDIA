import React from 'react';
import { Container } from './Container';
import { Skeleton } from '../common/Skeleton';

/**
 * Editorial loading skeleton displayed during React.lazy route resolution.
 * Replaces blank screens and spinners with an on-brand structured placeholder.
 */
export function RouteLoadingFallback() {
  return (
    <div className="pt-24 pb-16 w-full animate-in fade-in duration-fast">
      <Container size="wide" className="space-y-8">
        {/* Header Skeleton */}
        <div className="space-y-3 max-w-2xl">
          <Skeleton variant="text" lines={1} className="w-24 h-4" />
          <Skeleton variant="title" className="w-3/4 h-8" />
          <Skeleton variant="text" lines={2} className="w-full" />
        </div>

        {/* Filter Bar Skeleton */}
        <div className="flex items-center gap-2 pt-2">
          <Skeleton variant="text" className="w-20 h-7 rounded-pill" />
          <Skeleton variant="text" className="w-24 h-7 rounded-pill" />
          <Skeleton variant="text" className="w-20 h-7 rounded-pill" />
          <Skeleton variant="text" className="w-28 h-7 rounded-pill" />
        </div>

        {/* Card Grid Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <Skeleton variant="card" className="h-80" />
          <Skeleton variant="card" className="h-80" />
          <Skeleton variant="card" className="h-80" />
        </div>
      </Container>
    </div>
  );
}

export default RouteLoadingFallback;
