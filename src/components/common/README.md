# Shared Components & Icons Reference Guide

> **For Teammates**: All feature pages must import from this shared library. Never duplicate components, never hardcode colors, and never edit files outside your assigned feature folder.

---

## 🚨 The Three Non-Negotiable Rules

1. **Import from `components/common` and `components/icons` only**: Never create your own buttons, cards, badges, or icon SVGs inside feature folders.
2. **Never hardcode a color or hex value**: Accent colors are dynamic and must be consumed via theme classes (`bg-brand`, `text-accent-300`, etc.) or CSS variables (`var(--accent-500)`).
3. **Never copy-paste UI markup**: If a shared component needs an enhancement or prop, request a shared update.

---

## 🎨 Icon Usage & Accessibility Note

All icons are exported as named React components from `src/components/icons`:
```jsx
import { Search, Compass, Metro, Ticket, Clock, Crowd, Gem, ShieldAlert } from '../../components/icons';
```

### Accessibility Rule
- **Icons are decorative by default** (`aria-hidden="true"`).
- **Never render a bare icon button without an accessible name**. When rendering an icon-only button, always provide an `aria-label` on the parent `<button>` or pass `title="Search"` to the icon:
```jsx
// Correct accessible icon button:
<button type="button" aria-label="Search monuments" className="...">
  <Search size={18} />
</button>

// Or with title:
<Search size={18} title="Search monuments" />
```

---

## 📋 Copy-Paste Component Examples

### 1. `Button`
```jsx
import { Button } from '../../components/common';
import { Sparkle, ArrowRight, ShieldAlert } from '../../components/icons';

// 1. Primary Action (Uses active city accent)
<Button variant="primary" size="md" icon={<Sparkle size={16} />} onClick={handleGenerate}>
  Generate Day Plan
</Button>

// 2. Secondary Action
<Button variant="secondary" size="sm" iconRight={<ArrowRight size={14} />} to="/places">
  Explore All
</Button>

// 3. Ghost Action
<Button variant="ghost" size="sm">
  Cancel
</Button>

// 4. Glass Action (ONLY over photography)
<Button variant="glass" size="sm">
  View Gallery
</Button>

// 5. Emergency SOS Action (Strictly for safety/police triggers)
<Button variant="danger" size="lg" icon={<ShieldAlert size={20} />} onClick={callEmergency}>
  SOS Police (112)
</Button>

// 6. Loading State
<Button variant="primary" loading>
  Saving...
</Button>
```

---

### 2. `Badge`
```jsx
import { Badge } from '../../components/common';
import { Clock } from '../../components/icons';

// Default tag
<Badge variant="default">Heritage Trail</Badge>

// City accent tint
<Badge variant="accent">Mughal Era</Badge>

// Outline
<Badge variant="outline">Old Delhi</Badge>

// Glass chip (over photos)
<Badge variant="glass">Free Entry</Badge>

// Signature Hidden Gem Badge (includes glow and Gem icon automatically)
<Badge variant="gem">Secret Baoli</Badge>
```

---

### 3. `CrowdBadge` (Signature Telemetry Element)
```jsx
import { CrowdBadge } from '../../components/common';

// Standard live crowd level with relative time
<CrowdBadge level="low" updatedAt={place.crowdUpdatedAt} />

// Over photography
<CrowdBadge level="heavy" onGlass size="sm" />

// Compact without text label
<CrowdBadge level="moderate" showLabel={false} />
```

*Status Levels*:
- `low`: Displays "Not crowded" (1 bar filled)
- `moderate`: Displays "Getting busy" (2 bars filled)
- `heavy`: Displays "Very crowded" (3 bars filled)
- `unknown`: Displays "No data" (dashed meter)

---

### 4. `Card` (Primary Editorial Component)
```jsx
import { Card } from '../../components/common';
import { Metro, Ticket, Clock } from '../../components/icons';

<Card
  image="https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
  imageAlt="Humayun's Tomb red sandstone facade"
  imageCredit="FINDIA Archive"
  title="Humayun's Tomb"
  subtitle="Nizamuddin East • South Delhi"
  description="The first garden-tomb on the Indian subcontinent, built in 1570 with red sandstone and white marble."
  crowdLevel="low"
  crowdUpdatedAt="2026-09-03T10:00:00Z"
  hasAudio
  badges={[
    { label: "UNESCO", variant: "accent" },
    { label: "Mughal", variant: "glass" }
  ]}
  meta={[
    { icon: <Metro size={13} />, label: "JLN Stadium Metro" },
    { icon: <Ticket size={13} />, label: "₹40" },
    { icon: <Clock size={13} />, label: "Sunrise – Sunset" }
  ]}
  to="/places/humayuns-tomb"
/>
```

#### Card Features:
- **Graceful Broken Image Fallback**: Missing or failed image URLs automatically render the city accent gradient and the first letter of the title. No broken image icons ever appear.
- **Asymmetric Grid Feature Layout**: Set `size="feature"` for large hero cards.
- **Horizontal Thumbnail Layout**: Set `orientation="horizontal"`.
- **Title-Only Resilience**: Safe to pass only `{ title: "Place Name" }`.

---

### 5. `GlassPanel`
```jsx
import { GlassPanel } from '../../components/common';

// Tier 1: Heavy (Navbar, modals, floating panels)
<GlassPanel tier="heavy" className="p-4 rounded-xl">
  <NavigationItems />
</GlassPanel>

// Tier 2: Panel (Hero search, stats strip, floating cards over photos)
<GlassPanel tier="panel" className="p-6 rounded-lg">
  <SearchBar />
</GlassPanel>

// Tier 3: Chip (Badges over imagery)
<GlassPanel tier="chip" className="px-3 py-1 rounded-pill">
  <span>Highlight</span>
</GlassPanel>
```
*Note*: Glass must only be used over photography or gradients. Never nest a `GlassPanel` inside another `GlassPanel`.

---

### 6. `SectionHeader`
```jsx
import { SectionHeader } from '../../components/common';

<SectionHeader
  overline="Curated Trails"
  title="Stepwells & Ancient Ruins"
  description="Discover medieval water architecture preserved inside Delhi's urban forest."
  action={{ label: "View All 8 Trails", to: "/trails" }}
/>
```

---

### 7. `Skeleton`
```jsx
import { Skeleton } from '../../components/common';

// Text loading lines
<Skeleton variant="text" lines={3} />

// Image loading block
<Skeleton variant="image" className="aspect-[4/3] rounded-lg" />

// Card loading container
<Skeleton variant="card" />
```

---

### 8. `EmptyState`
```jsx
import { EmptyState, Button } from '../../components/common';
import { Search } from '../../components/icons';

<EmptyState
  icon={<Search size={28} />}
  title="No Places Found"
  description="We could not find any monuments matching your search. Try changing your filters."
  action={
    <Button variant="secondary" size="sm" onClick={reset}>
      Reset Search
    </Button>
  }
/>
```
