import React from 'react';
import { Container } from '../layout/Container';

/**
 * City Teaser Section: A single quiet line before the footer with no heading or card.
 *
 * @component
 */
export function CityTeaserSection() {
  return (
    <section className="py-14 sm:py-20 text-center select-none border-t border-border-subtle/80">
      <Container size="narrow">
        <p className="type-body text-text-low text-xs sm:text-sm font-mono leading-relaxed">
          Delhi is the first city in FINDIA. Jaipur, Mumbai and Varanasi follow next.
        </p>
      </Container>
    </section>
  );
}

export default CityTeaserSection;
