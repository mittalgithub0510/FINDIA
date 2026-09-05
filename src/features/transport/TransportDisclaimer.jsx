import React from 'react';
import { ShieldAlert } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function TransportDisclaimer() {
  return (
    <section className="py-8 bg-bg-base">
      <Container size="wide">
        <div className="p-4 sm:p-5 rounded-2xl bg-[#17130F] border border-[#2E271F] flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 text-xs text-[#9C9186] leading-relaxed">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-[#C9A24B] border border-amber-500/20 flex items-center justify-center shrink-0">
            <ShieldAlert size={20} />
          </div>
          <div className="space-y-1">
            <p className="font-mono font-bold text-[#F3EBDC] uppercase text-[11px] tracking-wider">
              Data Transparency & Disclaimer
            </p>
            <p>
              Transport information is curated for the FINDIA Delhi MVP. Travel times and fares are approximate and may vary based on traffic, waiting time, route conditions, and transport operator changes. Verify current information before travelling.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TransportDisclaimer;
