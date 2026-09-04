import React, { useState, useMemo } from 'react';
import { Star, MapPin, Award, ChevronRight, MessageSquare } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function DiscoverGuides({
  guides = [],
  selectedCategory = 'all',
  selectedZone = 'all',
  onSelectZoneChange,
  searchQuery = '',
  onSelectGuide
}) {
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedExperience, setSelectedExperience] = useState('all');

  // Extract all unique languages from dataset
  const availableLanguages = useMemo(() => {
    const langs = new Set();
    guides.forEach((g) => g.languages.forEach((l) => langs.add(l)));
    return Array.from(langs);
  }, [guides]);

  // Filter logic covering Category, Search, Language, Zone, Price, and Experience
  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      // Category filter
      if (selectedCategory !== 'all' && guide.category !== selectedCategory) {
        return false;
      }

      // Search query filter (name, tagline, specialty, languages)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = guide.name.toLowerCase().includes(q);
        const matchesTagline = guide.tagline.toLowerCase().includes(q);
        const matchesBio = guide.shortBio.toLowerCase().includes(q);
        const matchesLang = guide.languages.some((l) => l.toLowerCase().includes(q));
        const matchesExpertise = guide.expertise.some((e) => e.toLowerCase().includes(q));
        if (!matchesName && !matchesTagline && !matchesBio && !matchesLang && !matchesExpertise) {
          return false;
        }
      }

      // Language filter
      if (selectedLanguage !== 'all' && !guide.languages.includes(selectedLanguage)) {
        return false;
      }

      // Zone filter
      if (selectedZone !== 'all' && guide.zoneId !== selectedZone) {
        return false;
      }

      // Price filter
      if (selectedPriceRange === 'budget' && guide.pricePerHour > 1000) return false;
      if (selectedPriceRange === 'mid' && (guide.pricePerHour <= 1000 || guide.pricePerHour > 1500)) return false;
      if (selectedPriceRange === 'premium' && guide.pricePerHour <= 1500) return false;

      // Experience filter
      if (selectedExperience === '5plus' && guide.yearsExperience < 5) return false;
      if (selectedExperience === '10plus' && guide.yearsExperience < 10) return false;

      return true;
    });
  }, [guides, selectedCategory, searchQuery, selectedLanguage, selectedZone, selectedPriceRange, selectedExperience]);

  return (
    <section id="discover-guides" className="py-12 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#F3EBDC]">
              Discover Certified Local Guides
            </h2>
            <p className="type-body text-[#9C9186] text-sm sm:text-base">
              Showing {filteredGuides.length} verified storyteller{filteredGuides.length !== 1 ? 's' : ''} in Delhi.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#9C9186]">Active Filters:</span>
            <span className="text-xs font-mono font-bold text-[#C9A24B] bg-[#1B1613] px-3 py-1 rounded-full border border-[#2E271F]">
              {selectedCategory.toUpperCase()} • {selectedZone.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Detailed Filters Control Bar */}
        <div className="p-4 rounded-2xl bg-[#17130F] border border-[#2E271F] space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">

            {/* Language Filter */}
            <div className="space-y-1">
              <label className="font-mono text-[#9C9186] uppercase text-[10px] block">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Filter by spoken language"
                className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Languages Spoken</option>
                {availableLanguages.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            {/* Area / Zone Filter */}
            <div className="space-y-1">
              <label className="font-mono text-[#9C9186] uppercase text-[10px] block">Tourist Area / Zone:</label>
              <select
                value={selectedZone}
                onChange={(e) => onSelectZoneChange ? onSelectZoneChange(e.target.value) : null}
                aria-label="Filter by tourist area or zone"
                className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Delhi Zones</option>
                <option value="old-delhi">Old Delhi (Shahjahanabad)</option>
                <option value="central-delhi">Central Delhi (Lutyens & CP)</option>
                <option value="south-delhi">South Delhi (Mehrauli & Sufi Trails)</option>
                <option value="east-delhi">East Delhi & Yamuna Bank</option>
              </select>
            </div>

            {/* Price Filter */}
            <div className="space-y-1">
              <label className="font-mono text-[#9C9186] uppercase text-[10px] block">Hourly Rate:</label>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                aria-label="Filter by hourly price range"
                className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Rates</option>
                <option value="budget">Under ₹1,000 / hr</option>
                <option value="mid">₹1,000 – ₹1,500 / hr</option>
                <option value="premium">Above ₹1,500 / hr</option>
              </select>
            </div>

            {/* Experience Filter */}
            <div className="space-y-1">
              <label className="font-mono text-[#9C9186] uppercase text-[10px] block">Experience Level:</label>
              <select
                value={selectedExperience}
                onChange={(e) => setSelectedExperience(e.target.value)}
                aria-label="Filter by experience level"
                className="w-full bg-[#1B1613] text-[#F3EBDC] font-semibold p-2.5 rounded-xl border border-[#2E271F] focus:border-[#C9A24B] focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Experience Levels</option>
                <option value="5plus">5+ Years Experience</option>
                <option value="10plus">10+ Years Senior Historians</option>
              </select>
            </div>
          </div>
        </div>

        {/* Guide Cards Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <div
                key={guide.id}
                className="p-6 rounded-2xl bg-[#17130F] border border-[#2E271F] hover:border-[#8A7238] transition-all space-y-5 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Avatar & Rating Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={guide.avatarUrl}
                        alt={guide.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-[#2E271F] shrink-0"
                      />
                      <div className="space-y-0.5">
                        <h3 className="font-bold text-[#F3EBDC] text-lg font-display leading-tight">
                          {guide.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-[#9C9186]">
                          <MapPin size={12} className="text-[#C9A24B]" />
                          <span>{guide.zoneName}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 bg-[#1B1613] px-2.5 py-1 rounded-full border border-[#2E271F] text-xs font-mono font-bold text-amber-400 shrink-0">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span>{guide.rating}</span>
                    </div>
                  </div>

                  {/* Certification Badge */}
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold border bg-[#1B1613] border-[#2E271F] text-[#F3EBDC]">
                    <Award size={13} className="text-[#C9A24B]" />
                    <span>{guide.badge}</span>
                  </div>

                  <p className="text-xs text-[#9C9186] leading-relaxed line-clamp-2">
                    {guide.shortBio}
                  </p>

                  {/* Expertise Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono uppercase text-[#6E655B]">Expertise:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.expertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#1B1613] text-[#F3EBDC] border border-[#2E271F]"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Spoken Languages & Specs */}
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-[#241F19]">
                    <div>
                      <span className="text-[10px] text-[#6E655B] uppercase block">Languages Spoken:</span>
                      <span className="font-semibold text-[#F3EBDC] text-[11px] truncate block">
                        {guide.languages.join(', ')}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#6E655B] uppercase block">Experience & Tours:</span>
                      <span className="font-semibold text-[#F3EBDC] text-[11px]">
                        {guide.yearsExperience} yrs • {guide.toursCompleted} tours
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price & Action Buttons */}
                <div className="space-y-3 pt-3 border-t border-[#241F19]">
                  <div className="flex items-center justify-between font-mono">
                    <div className="text-xs">
                      <span className="text-[10px] text-[#6E655B] uppercase block">Hourly Rate</span>
                      <span className="text-sm font-bold text-[#5FA97C]">₹{guide.pricePerHour} / hr</span>
                    </div>

                    <div className="text-xs text-right">
                      <span className="text-[10px] text-[#6E655B] uppercase block">Full Day</span>
                      <span className="text-xs font-bold text-[#F3EBDC]">₹{guide.priceFullDay}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectGuide(guide)}
                      className="w-full py-2 px-3 rounded-xl bg-[#C9A24B] hover:bg-amber-400 text-[#0F0D0B] font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>View Profile</span>
                      <ChevronRight size={14} />
                    </button>

                    <a
                      href={`https://wa.me/?text=${encodeURIComponent(`Hi ${guide.name}, I found your guide profile on FINDIA Delhi and would like to inquire about a custom tour.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-3 rounded-xl bg-[#1B1613] hover:bg-[#241E1A] text-[#9C9186] hover:text-[#F3EBDC] border border-[#2E271F] font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare size={13} className="text-emerald-400" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 rounded-2xl bg-[#17130F] border border-[#2E271F] text-center space-y-3">
            <p className="text-base font-bold text-[#F3EBDC]">No Guides Match Your Filters</p>
            <p className="text-xs text-[#9C9186] max-w-md mx-auto">
              Try adjusting your category, language, or zone filters to discover available certified guides.
            </p>
          </div>
        )}
      </Container>
    </section>
  );
}

export default DiscoverGuides;
