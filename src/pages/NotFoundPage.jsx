import React from 'react';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/common/Button';
import { Compass, ArrowRight } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';

/**
 * Custom Designed 404 Not Found Page.
 *
 * @page
 */
export function NotFoundPage() {
  usePageMeta('404 — Page Not Found', 'The requested route does not exist in the FINDIA directory.');

  return (
    <div className="min-h-[75vh] flex items-center justify-center p-6 select-none pt-24 pb-20">
      <EmptyState
        headingLevel="h1"
        icon={<Compass size={36} className="text-brand" />}
        title="Waypoint Not Found (404)"
        description="The coordinates or URL you entered do not correspond to any registered page in the FINDIA platform."
        action={
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button variant="secondary" size="sm" to="/places">
              Browse Places
            </Button>
            <Button variant="primary" size="sm" to="/" icon={<ArrowRight size={14} />}>
              Return to Home
            </Button>
          </div>
        }
      />
    </div>
  );
}

export default NotFoundPage;
