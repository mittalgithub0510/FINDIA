import React from 'react';
import { Landmark, Utensils, Sparkles, Camera, BookOpen, ShoppingBag, CheckCircle2 } from '../../components/icons';
import { Container } from '../../components/layout/Container';

export function GuideCategories({ categories = [], selectedCategory = 'all', onSelectCategory }) {
  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'Landmark':
        return <Landmark size={20} />;
      case 'Utensils':
        return <Utensils size={20} />;
      case 'Sparkles':
        return <Sparkles size={20} />;
      case 'Camera':
        return <Camera size={20} />;
      case 'BookOpen':
        return <BookOpen size={20} />;
      case 'ShoppingBag':
        return <ShoppingBag size={20} />;
      default:
        return <Sparkles size={20} />;
    }
  };

  return (
    <section className="py-10 bg-bg-base border-b border-[#2E271F]">
      <Container size="wide" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <h2 className="font-display font-bold text-xl sm:text-2xl text-[#F3EBDC]">
              Guide Categories
            </h2>
            <p className="type-body text-[#9C9186] text-xs sm:text-sm">
              Filter tour guides by their primary storytelling focus and expertise.
            </p>
          </div>

          {selectedCategory !== 'all' && (
            <button
              onClick={() => onSelectCategory('all')}
              className="text-xs font-mono text-[#C9A24B] hover:underline cursor-pointer w-fit"
            >
              Reset Category Filter
            </button>
          )}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {/* All Categories Pill */}
          <button
            onClick={() => onSelectCategory('all')}
            className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0F0D0B] shadow-lg scale-[1.02]'
                : 'bg-[#17130F] border-[#2E271F] hover:border-[#8A7238] text-[#F3EBDC]'
            }`}
          >
            <div className="w-9 h-9 rounded-xl bg-black/20 flex items-center justify-center font-bold">
              ★
            </div>
            <div>
              <div className="font-bold text-sm">All Specialities</div>
              <div className={`text-[10px] ${selectedCategory === 'all' ? 'text-[#0F0D0B]/80' : 'text-[#9C9186]'}`}>
                View All Guides
              </div>
            </div>
          </button>

          {/* Individual Category Cards */}
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between space-y-3 cursor-pointer ${
                  isSelected
                    ? 'bg-[#C9A24B] border-[#C9A24B] text-[#0F0D0B] shadow-lg scale-[1.02]'
                    : 'bg-[#17130F] border-[#2E271F] hover:border-[#8A7238] text-[#F3EBDC]'
                }`}
              >
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-black/20 text-[#0F0D0B]' : `${cat.color} bg-[#1B1613]`}`}>
                  {getCategoryIcon(cat.icon)}
                </div>
                <div>
                  <div className="font-bold text-sm flex items-center justify-between">
                    <span>{cat.name}</span>
                    {isSelected && <CheckCircle2 size={12} className="text-[#0F0D0B]" />}
                  </div>
                  <div className={`text-[10px] line-clamp-1 ${isSelected ? 'text-[#0F0D0B]/80' : 'text-[#9C9186]'}`}>
                    {cat.description}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default GuideCategories;
