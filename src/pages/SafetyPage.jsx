import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { PageHeader } from '../components/layout/PageHeader';
import { Container } from '../components/layout/Container';
import { ComingSoonNote } from '../components/layout/ComingSoonNote';
import { Button } from '../components/common/Button';
import { groundSafetyNotes, emergencyFacilities } from '../data/delhi/safety';
import { ShieldAlert, Phone, MapPin, Radio, Plus, Check } from '../components/icons';
import { usePageMeta } from '../hooks/usePageMeta';
import { cn } from '../utils/cn';

/**
 * Emergency SOS & Safety Hub Page.
 * Feature Owner: src/features/safety-sos/
 *
 * @page
 */
export function SafetyPage() {
  const { city } = useCity();
  usePageMeta(
    `Emergency Contacts & Safety Guide — ${city.name}`,
    `Direct telephone helplines, police control rooms, 24-hour trauma hospitals, and safety protocols for ${city.name}.`
  );

  const [selectedContact, setSelectedContact] = useState('contact-1');

  const emergencyContacts =
    city.emergency && city.emergency.length > 0
      ? city.emergency
      : [
          { label: 'All-India Universal Emergency', number: '112', type: 'universal' },
          { label: 'Police Control Room', number: '100', type: 'police' },
          { label: 'Ambulance & Medical Trauma', number: '102', type: 'medical' },
          { label: 'Fire Service Dispatch', number: '101', type: 'fire' },
          { label: 'Women Helpline Desk', number: '1091', type: 'women' },
        ];

  return (
    <div className="w-full pb-24 select-none">
      {/* 1. High-Clarity Header */}
      <PageHeader
        overline={`Emergency Assistance • ${city.name}`}
        title="Safety Guidelines & Direct-Dial Helplines"
        description={`Direct telephone connections to local police control booths, PCR vans, and medical trauma centers across all districts of ${city.name}.`}
      />

      <Container size="wide" className="pt-8 space-y-12">
        <ComingSoonNote
          featureName="Live SMS Geolocation Dispatch & WebRTC Telemetry"
          owner="safety-sos"
          description="Direct telephone dialing tiles below connect directly to standard carrier networks. The live SMS coordinate broadcaster will be hooked into device geolocation in src/features/safety-sos/."
        />

        {/* 2. Primary Emergency Helpline Tiles (Large Tap Targets) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-subtle pb-2">
            <h2 className="font-display font-bold text-xl text-text-high">
              Direct-Dial Emergency Services
            </h2>
            <span className="text-xs font-mono text-sos font-semibold">Toll-Free Telephones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {emergencyContacts.map((contact, idx) => (
              <a
                key={idx}
                href={`tel:${contact.number}`}
                id={`emergency-call-${contact.number}`}
                className="p-5 rounded-2xl bg-sos/10 border-2 border-sos/30 hover:border-sos hover:bg-sos/20 transition-all flex items-center justify-between gap-4 outline-none focus-visible:ring-2 focus-visible:ring-sos focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
              >
                <div className="space-y-1">
                  <div className="text-xs uppercase font-mono text-text-low tracking-wider">
                    {contact.label}
                  </div>
                  <div className="font-mono font-bold text-3xl text-sos tracking-tight">
                    {contact.number}
                  </div>
                </div>

                <div className="w-12 h-12 rounded-full bg-sos text-white flex items-center justify-center shrink-0 shadow-soft">
                  <Phone size={22} />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 3. Live Location Sharing Shell (Prominent Disabled Button + Contact Selection Shell) */}
        <section className="p-6 sm:p-8 rounded-2xl bg-bg-raised border border-border-default space-y-6">
          <div className="space-y-1">
            <div className="type-overline text-brand">Feature Shell</div>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-text-high">
              Broadcast Real-Time GPS Coordinates
            </h2>
            <p className="type-body text-text-mid text-xs sm:text-sm leading-relaxed max-w-2xl">
              When activated by teammate code, this module captures high-accuracy browser coordinates and generates an encrypted SMS link containing your last verified position and nearest Delhi Metro gate.
            </p>
          </div>

          {/* Contact Selection Shell */}
          <div className="space-y-3">
            <label className="text-xs font-mono uppercase text-text-high font-semibold block">
              Pre-Configured Emergency Contacts
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { id: 'contact-1', name: 'Primary Contact (Family)', phone: '+91 98XXX XXXXX' },
                { id: 'contact-2', name: 'Local Delhi Host', phone: '+91 94XXX XXXXX' },
              ].map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedContact(c.id)}
                  className={cn(
                    'p-3.5 rounded-xl border text-left flex items-center justify-between cursor-pointer outline-none transition-all',
                    selectedContact === c.id
                      ? 'bg-bg-overlay border-brand text-text-high'
                      : 'bg-bg-base border-border-default text-text-mid hover:border-brand/40'
                  )}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-semibold">{c.name}</div>
                    <div className="text-[11px] font-mono text-text-low">{c.phone}</div>
                  </div>
                  {selectedContact === c.id && <Check size={16} className="text-brand shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* Disabled Broadcast Button with prominent TODO */}
          {/* TODO: Feature teammate will wire navigator.geolocation.getCurrentPosition & Twilio SMS API */}
          <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border-subtle">
            <div className="text-xs text-text-low font-mono">
              Ready for Geolocation API hookup in src/features/safety-sos/
            </div>
            <Button
              variant="danger"
              size="md"
              icon={<Radio size={16} />}
              className="opacity-70 cursor-not-allowed"
              onClick={() => alert('Live location dispatch logic will be connected by the safety-sos teammate.')}
            >
              Share Live Location via SMS
            </Button>
          </div>
        </section>

        {/* 4. Practical Ground Safety Guidelines */}
        <section className="space-y-4">
          <h2 className="font-display font-bold text-xl text-text-high">
            City Transit & Ground Security Notes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {groundSafetyNotes.map((note) => (
              <div
                key={note.id}
                className="p-5 rounded-2xl bg-bg-raised border border-border-default space-y-2"
              >
                <h3 className="font-display font-semibold text-sm sm:text-base text-text-high">
                  {note.title}
                </h3>
                <p className="type-body-sm text-text-mid text-xs leading-relaxed">
                  {note.rule}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. Nearby Police Stations & 24/7 Trauma Hospitals + Map Placeholder */}
        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl text-text-high">
              Medical Trauma Blocks & Police Stations
            </h2>
            <p className="type-body-sm text-text-low text-xs">
              Verified 24-hour emergency casualty departments in {city.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* List (7 cols) */}
            <div className="lg:col-span-7 space-y-3">
              {emergencyFacilities.map((fac, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-bg-raised border border-border-default space-y-2"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-semibold text-sm sm:text-base text-text-high">
                      {fac.name}
                    </h3>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-bg-base border border-border-subtle text-text-low shrink-0">
                      {fac.type}
                    </span>
                  </div>

                  <p className="text-xs text-text-mid font-sans">
                    {fac.address}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-text-low pt-2 border-t border-border-subtle">
                    <div className="flex items-center gap-1.5 text-brand">
                      <MapPin size={12} />
                      <span>{fac.distance}</span>
                    </div>
                    <a
                      href={`tel:${fac.phone}`}
                      className="hover:text-text-high transition-colors font-bold text-text-high"
                    >
                      {fac.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Map Placeholder (5 cols) */}
            {/* TODO: Supabase query: mount hospital & police station markers on vector map */}
            <div className="lg:col-span-5 h-72 rounded-2xl bg-bg-raised border border-dashed border-border-strong flex flex-col items-center justify-center p-6 text-center space-y-2 select-none">
              <ShieldAlert size={28} className="text-text-low" />
              <div className="text-xs font-mono text-text-high font-medium">
                SAFETY FACILITIES MAP PLACEHOLDER
              </div>
              <p className="text-[11px] text-text-low max-w-xs">
                Emergency locations mapped. Interactive spatial cluster view will be mounted by feature owner.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

export default SafetyPage;
