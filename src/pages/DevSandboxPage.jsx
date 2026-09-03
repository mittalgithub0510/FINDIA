import React from 'react';
import { Container } from '../components/layout/Container';
import { PageHeader } from '../components/layout/PageHeader';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { CrowdBadge } from '../components/common/CrowdBadge';
import { GlassPanel } from '../components/common/GlassPanel';
import { Skeleton } from '../components/common/Skeleton';
import { Sparkle, Compass, Metro, Ticket } from '../components/icons';

/**
 * Developer Component & Token Audit Sandbox.
 * DEV ONLY ROUTE.
 *
 * @page
 */
export function DevSandboxPage() {
  return (
    <div className="w-full pb-24 select-none">
      <PageHeader
        overline="Internal Tooling • Dev Only"
        title="Component & Token Sandbox"
        description="Visual audit surface for shared primitives, glass panels, crowd badges, and semantic color tokens."
      />

      <Container size="wide" className="pt-8 space-y-12">
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
          DEV ONLY ROUTE — Not linked in public navigation.
        </div>

        {/* Buttons */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-lg text-text-high">Button Variants</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" size="md" icon={<Sparkle size={16} />}>Primary Button</Button>
            <Button variant="secondary" size="md">Secondary Button</Button>
            <Button variant="outline" size="md">Outline Button</Button>
            <Button variant="ghost" size="md">Ghost Button</Button>
            <Button variant="danger" size="md">Danger Button</Button>
          </div>
        </section>

        {/* Crowd Badges */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-lg text-text-high">Crowd Badges</h2>
          <div className="flex flex-wrap items-center gap-4">
            <CrowdBadge level="low" updatedAt="just now" />
            <CrowdBadge level="moderate" updatedAt="5m ago" />
            <CrowdBadge level="heavy" updatedAt="2m ago" />
            <CrowdBadge level="closed" />
          </div>
        </section>

        {/* Glass Panels */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-lg text-text-high">Glass Panels</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassPanel tier="chip" className="p-4 rounded-xl">Glass Chip</GlassPanel>
            <GlassPanel tier="panel" className="p-4 rounded-xl">Glass Panel</GlassPanel>
            <GlassPanel tier="heavy" className="p-4 rounded-xl">Glass Heavy</GlassPanel>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default DevSandboxPage;
