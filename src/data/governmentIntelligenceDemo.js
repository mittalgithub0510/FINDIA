/**
 * Government Tourism Intelligence Data for FINDIA.
 */

export const GOVERNMENT_INTELLIGENCE_DEMO = {
  badge: "Tourism Planning Intelligence",
  tagline: "From guiding tourists to guiding tourism.",
  subtitle: "Aggregated, anonymized tourism demand signals for destination management & planning.",
  
  metrics: [
    {
      id: 'demand_index',
      label: 'Regional Congestion Index',
      value: '74%',
      status: 'High Peak Detected',
      trend: '+12% vs last week',
      color: 'amber',
    },
    {
      id: 'redistribution_rate',
      label: 'Demand Redistribution Impact',
      value: '28.4%',
      status: 'Active Alternatives Taken',
      trend: '3.2k visitors redirected',
      color: 'emerald',
    },
    {
      id: 'emerging_engagement',
      label: 'Emerging Destination Lift',
      value: '+41%',
      status: 'Secondary Heritage Sites',
      trend: 'Higher local spend',
      color: 'sky',
    },
  ],

  cards: [
    {
      id: 'card_demand',
      type: 'Destination Demand Alert',
      title: 'High Demand Detected at Qutub Minar',
      badge: 'Demand Peak',
      badgeColor: 'amber',
      detail: 'Current ticket line waits exceed 45 minutes. Signal recommends highlighting Agrasen Ki Baoli to nearby photo-enthusiasts.',
      metricLabel: 'Current Congestion',
      metricValue: '88% Capacity',
    },
    {
      id: 'card_trend',
      type: 'Crowd Trend Prediction',
      title: 'Weekend Evening Surge Predicted at Chandni Chowk',
      badge: 'Predictive Signal',
      badgeColor: 'sky',
      detail: 'Forecasted 3.5x crowd increase between 5 PM - 8 PM. Suggesting morning heritage walks to early-bird travelers.',
      metricLabel: 'Forecasted Spike',
      metricValue: '+250% Density',
    },
    {
      id: 'card_emerging',
      type: 'Emerging Destination Discovery',
      title: 'Humayun’s Tomb Gardens Under-utilized',
      badge: 'Opportunity',
      badgeColor: 'emerald',
      detail: 'Spacious gardens operating at only 32% capacity while Red Fort reaches threshold limits.',
      metricLabel: 'Available Capacity',
      metricValue: '68% Open Space',
    },
    {
      id: 'card_opportunity',
      type: 'Tourism Growth Opportunity',
      title: 'Nizamuddin Heritage Walk Redistribution Potential',
      badge: 'Actionable Insight',
      badgeColor: 'indigo',
      detail: 'High intent for cultural food tours near Central Delhi can be channeled to Nizamuddin walking circuits.',
      metricLabel: 'Potential Visitors',
      metricValue: '1.4k / day',
    },
  ],
};

export default GOVERNMENT_INTELLIGENCE_DEMO;
