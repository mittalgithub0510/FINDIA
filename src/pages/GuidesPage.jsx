import React, { useState } from 'react';
import { useCity } from '../config/CityContext';
import { delhiGuidesData } from '../data/delhi/guides';
import { prayagrajGuidesData } from '../data/prayagraj/guides';
import { GuidesHero } from '../features/guides/GuidesHero';
import { GuideCategories } from '../features/guides/GuideCategories';
import { DiscoverGuides } from '../features/guides/DiscoverGuides';
import { TouristZoneGuides } from '../features/guides/TouristZoneGuides';
import { GuideDetailModal } from '../features/guides/GuideDetailModal';
import { SmartGuideMatching } from '../features/guides/SmartGuideMatching';
import { usePageMeta } from '../hooks/usePageMeta';

export function GuidesPage() {
  const { city } = useCity();
  const guidesData = city?.slug === 'prayagraj' ? prayagrajGuidesData : delhiGuidesData;

  usePageMeta({
    title: `Local Heritage & Food Guides in ${city?.name || 'Delhi'} | FINDIA`,
    description: `Connect with certified historians, boat navigators, culinary experts, and heritage storytellers across ${city?.name || 'Delhi'}.`
  });

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedZone, setSelectedZone] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGuideForModal, setSelectedGuideForModal] = useState(null);

  const handleSelectZone = (zoneId) => {
    setSelectedZone(zoneId);
    const el = document.getElementById('discover-guides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHeroSearch = (query) => {
    setSearchQuery(query);
    const el = document.getElementById('discover-guides');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-bg-base text-[#F3EBDC]">
      {/* 1. Hero Section: Find Your Local Guide */}
      <GuidesHero onSearch={handleHeroSearch} />

      {/* 2. Guide Categories: Heritage, Food, Culture, Photography, History, Shopping */}
      <GuideCategories
        categories={guidesData.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Discover Guides: Guide cards, Language, Expertise, Experience, Area, Price */}
      <DiscoverGuides
        guides={guidesData.guides}
        selectedCategory={selectedCategory}
        selectedZone={selectedZone}
        onSelectZoneChange={setSelectedZone}
        searchQuery={searchQuery}
        onSelectGuide={setSelectedGuideForModal}
      />

      {/* 4. Explore by Tourist Zone */}
      <TouristZoneGuides
        zones={guidesData.zones}
        selectedZone={selectedZone}
        onSelectZone={handleSelectZone}
      />

      {/* 5. Smart Guide Matching CTA */}
      <SmartGuideMatching guides={guidesData.guides} />

      {/* 6. Guide Profile / Details Modal */}
      {selectedGuideForModal && (
        <GuideDetailModal
          guide={selectedGuideForModal}
          onClose={() => setSelectedGuideForModal(null)}
        />
      )}
    </div>
  );
}

export default GuidesPage;
