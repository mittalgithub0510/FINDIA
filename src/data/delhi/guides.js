/**
 * FINDIA Delhi MVP - Local Guides Dataset
 * Single source of truth for Delhi heritage narrators, food guides, and storytellers.
 */

export const delhiGuidesData = {
  categories: [
    {
      id: 'heritage',
      name: 'Heritage',
      icon: 'Landmark',
      description: 'Mughal monuments, fortresses, and ancient stepwells.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'food',
      name: 'Food',
      icon: 'Utensils',
      description: 'Chandni Chowk street food, royal Mughlai recipes, and spice markets.',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10 border-orange-500/30'
    },
    {
      id: 'culture',
      name: 'Culture',
      icon: 'Sparkles',
      description: 'Sufi qawwalis, artisan workshops, and living traditions.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30'
    },
    {
      id: 'photography',
      name: 'Photography',
      icon: 'Camera',
      description: 'Golden hour photo walks, street frames, and architectural angles.',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/30'
    },
    {
      id: 'history',
      name: 'History',
      icon: 'BookOpen',
      description: 'Deep chronological storytelling from 7 ancient cities of Delhi.',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10 border-purple-500/30'
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: 'ShoppingBag',
      description: 'Handicraft markets, textiles, jewelry, and antique bazaars.',
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10 border-rose-500/30'
    }
  ],

  zones: [
    {
      id: 'old-delhi',
      name: 'Old Delhi (Shahjahanabad)',
      description: 'Famous for narrow alleys, 350-year-old food stalls, Red Fort, and Jama Masjid.',
      recommendedCategory: 'Heritage & Food'
    },
    {
      id: 'central-delhi',
      name: 'Central Delhi (Lutyens & CP)',
      description: 'Colonial architecture, India Gate, Rashtrapati Bhavan, and vibrant markets.',
      recommendedCategory: 'History & Shopping'
    },
    {
      id: 'south-delhi',
      name: 'South Delhi (Mehrauli & Nizamuddin)',
      description: 'Qutub Minar complex, 14th-century stepwells, and Sufi shrines.',
      recommendedCategory: 'Culture & Heritage'
    },
    {
      id: 'east-delhi',
      name: 'East Delhi & Yamuna Bank',
      description: 'Akshardham, river ghats, and modern cultural monuments.',
      recommendedCategory: 'Culture & Photography'
    }
  ],

  guides: [
    {
      id: 'g1',
      name: 'Rajesh Sharma',
      tagline: 'ASI Licensed Senior Historian & Shahjahanabad Specialist',
      category: 'heritage',
      expertise: ['Heritage', 'History', 'Architecture'],
      zoneId: 'old-delhi',
      zoneName: 'Old Delhi (Shahjahanabad)',
      languages: ['English', 'Hindi', 'German'],
      yearsExperience: 12,
      toursCompleted: 148,
      rating: 4.92,
      pricePerHour: 1200,
      priceFullDay: 4500,
      badge: 'ASI Licensed Senior Guide',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      shortBio: 'Certified Archeological Survey guide with 12+ years uncovering hidden 17th-century havelis and royal courtyards.',
      fullBio: 'Rajesh is a master storyteller of 17th-century Delhi. Having spent over a decade leading international delegations and history scholars, he brings Red Fort, Jama Masjid, and hidden Spice Market secret rooftops to life with authentic historical anecdotes.',
      popularTours: [
        'Secret Havelis of Chandni Chowk',
        'Mughal Imperial Fortresses & Ramparts',
        'Khari Baoli Spice Roof Photography Walk'
      ]
    },
    {
      id: 'g2',
      name: 'Ananya Roy',
      tagline: 'Culinary Historian & Old Delhi Food Trail Specialist',
      category: 'food',
      expertise: ['Food', 'Culture', 'Shopping'],
      zoneId: 'old-delhi',
      zoneName: 'Old Delhi (Shahjahanabad)',
      languages: ['English', 'Hindi', 'Bengali'],
      yearsExperience: 8,
      toursCompleted: 215,
      rating: 4.98,
      pricePerHour: 950,
      priceFullDay: 3800,
      badge: 'Certified Food Historian',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
      shortBio: 'Food writer & heritage enthusiast guiding legendary street food walks through 100-year-old culinary shops.',
      fullBio: 'Ananya combines culinary anthropology with street food exploration. Her tours take foodies through 6th-generation kebab masters, jalebi makers, and secret Mughlai family kitchens safely and authentically.',
      popularTours: [
        'Chandni Chowk 100-Year-Old Recipe Trail',
        'Mughlai Kebab & Biryani Heritage Tasting',
        'Old Delhi Street Desserts & Chai Walk'
      ]
    },
    {
      id: 'g3',
      name: 'Vikramaditya Singh',
      tagline: 'Heritage Photographer & Architectural Frame Leader',
      category: 'photography',
      expertise: ['Photography', 'Heritage', 'Culture'],
      zoneId: 'south-delhi',
      zoneName: 'South Delhi (Mehrauli & Nizamuddin)',
      languages: ['English', 'Hindi', 'French'],
      yearsExperience: 10,
      toursCompleted: 110,
      rating: 4.89,
      pricePerHour: 1500,
      priceFullDay: 5500,
      badge: 'Professional Photo Expedition Leader',
      badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      shortBio: 'National Geographic published photographer curating golden-hour photo walks around Delhi ancient ruins.',
      fullBio: 'Vikram teaches composition, lighting, and street photography while exploring the dramatic shadows of Qutub Minar, Mehrauli Archaeological Park, and Humayun Tomb gardens.',
      popularTours: [
        'Golden Hour at Humayun’s Tomb',
        'Mehrauli Stepwells & Ancient Ruins Photo Trail',
        'Lutyens Delhi Geometric Architecture Walk'
      ]
    },
    {
      id: 'g4',
      name: 'Zoya Siddiqui',
      tagline: 'Sufi Heritage Curator & Islamic Architecture Scholar',
      category: 'culture',
      expertise: ['Culture', 'History', 'Heritage'],
      zoneId: 'south-delhi',
      zoneName: 'South Delhi (Nizamuddin & Mehrauli)',
      languages: ['English', 'Hindi', 'Urdu', 'Farsi'],
      yearsExperience: 9,
      toursCompleted: 175,
      rating: 4.96,
      pricePerHour: 1100,
      priceFullDay: 4200,
      badge: 'Heritage & Qawwali Curator',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80',
      shortBio: 'Urdu literature scholar leading immersive Sufi music walks and Nizamuddin Basti living heritage tours.',
      fullBio: 'Zoya offers an intimate look into Delhi’s mystical Sufi culture. From Nizamuddin Dargah’s Thursday Qawwalis to Amir Khusrau’s poetry and Baolis, her walks are deeply soulful and historic.',
      popularTours: [
        'Nizamuddin Basti & Evening Qawwali Experience',
        'Poetry & Stepwells of Medieval Delhi',
        'Sufi Traditions & Sacred Architecture'
      ]
    },
    {
      id: 'g5',
      name: 'Sanjay Verma',
      tagline: 'Bazaar Specialist & Craft Heritage Collector',
      category: 'shopping',
      expertise: ['Shopping', 'Culture', 'Food'],
      zoneId: 'central-delhi',
      zoneName: 'Central Delhi (Lutyens & CP)',
      languages: ['English', 'Hindi', 'Spanish'],
      yearsExperience: 7,
      toursCompleted: 132,
      rating: 4.86,
      pricePerHour: 850,
      priceFullDay: 3500,
      badge: 'Artisan Trade Guide',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      shortBio: 'Handicraft & antique market insider guiding shoppers through state emporiums, Dilli Haat, and secret brass markets.',
      fullBio: 'Sanjay helps travelers navigate Delhi’s bustling markets safely with fair pricing negotiations, genuine handicraft verification, and artisan workshop visits.',
      popularTours: [
        'State Handicraft Emporiums & Textile Trail',
        'Dilli Haat Craftsmen & Artisan Encounter',
        'Janpath Antique & Vintage Jewelry Walk'
      ]
    },
    {
      id: 'g6',
      name: 'Dr. Meenakshi Malhotra',
      tagline: 'PhD Archeology Historian & Imperial Delhi Authority',
      category: 'history',
      expertise: ['History', 'Heritage'],
      zoneId: 'central-delhi',
      zoneName: 'Central Delhi (Lutyens & CP)',
      languages: ['English', 'Hindi', 'Japanese'],
      yearsExperience: 15,
      toursCompleted: 92,
      rating: 5.0,
      pricePerHour: 1800,
      priceFullDay: 6500,
      badge: 'PhD Archeological Historian',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
      avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      shortBio: 'Published archeological researcher specializing in the Seven Cities of Delhi and Lutyens Colonial Transformation.',
      fullBio: 'Dr. Meenakshi provides academic-grade historical insights into Delhi’s evolution from 12th-century Rai Pithora to British Raj urban planning. Highly sought after by university delegations and history enthusiasts.',
      popularTours: [
        'Seven Cities of Delhi Chronological Masterclass',
        'Lutyens Imperial Planning & Rashtrapati Bhavan',
        'Safdarjung & Lodhi Dynasty Tomb Complex'
      ]
    }
  ]
};

export default delhiGuidesData;
