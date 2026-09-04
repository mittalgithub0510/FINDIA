import React, { useState } from 'react';
import { delhiGuidesData } from '../data/delhi/guides';
import { GuidesHero } from '../features/guides/GuidesHero';
import { GuideCategories } from '../features/guides/GuideCategories';
import { DiscoverGuides } from '../features/guides/DiscoverGuides';
import { TouristZoneGuides } from '../features/guides/TouristZoneGuides';
import { GuideDetailModal } from '../features/guides/GuideDetailModal';
import { SmartGuideMatching } from '../features/guides/SmartGuideMatching';
import { usePageMeta } from '../hooks/usePageMeta';

export function GuidesPage() {
  usePageMeta({
    title: 'Local Heritage & Food Guides in Delhi | FINDIA',
    description: 'Connect with certified ASI historians, culinary experts, street photographers, and Sufi heritage storytellers across Delhi.'
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
        categories={delhiGuidesData.categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* 3. Discover Guides: Guide cards, Language, Expertise, Experience, Area, Price */}
      <DiscoverGuides
        guides={delhiGuidesData.guides}
        selectedCategory={selectedCategory}
        selectedZone={selectedZone}
        onSelectZoneChange={setSelectedZone}
        searchQuery={searchQuery}
        onSelectGuide={setSelectedGuideForModal}
      />

      {/* 4. Explore by Tourist Zone */}
      <TouristZoneGuides
        zones={delhiGuidesData.zones}
        onSelectZone={handleSelectZone}
      />

      {/* 5. Future FINDIA AI: Smart Guide Matching */}
      <SmartGuideMatching guides={delhiGuidesData.guides} />

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
