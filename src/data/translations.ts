export type Language = 'en' | 'kn';

export interface Translations {
  appName: string;
  tagline: string;
  navHome: string;
  navPlan: string;
  navExplore: string;
  navSaved: string;
  navPhrases: string;
  assistantBtn: string;
  
  // Hero
  heroHeading: string;
  heroSubheading: string;
  heroInputPlaceholder: string;
  heroGenerateBtn: string;
  heroExploreBtn: string;
  heroTryPrompts: string;
  
  // How it works
  howItWorksHeading: string;
  howItWorks1Title: string;
  howItWorks1Desc: string;
  howItWorks2Title: string;
  howItWorks2Desc: string;
  howItWorks3Title: string;
  howItWorks3Desc: string;

  // Popular Destinations
  popularHeading: string;
  popularSubheading: string;
  exploreAllDestinations: string;
  
  // Planner
  plannerTitle: string;
  plannerSubtitle: string;
  optionAName: string;
  optionBName: string;
  naturalPromptLabel: string;
  naturalPromptPlaceholder: string;
  generateTripBtn: string;
  
  // Form Labels
  startLocationLabel: string;
  durationLabel: string;
  budgetLabel: string;
  travellersLabel: string;
  travelStyleLabel: string;
  travelModeLabel: string;
  interestsLabel: string;
  
  // Travel Styles
  styleBudget: string;
  styleStandard: string;
  stylePremium: string;
  
  // Itinerary View
  itineraryTitle: string;
  estimatedTotal: string;
  budgetRemaining: string;
  overBudgetWarning: string;
  optimizeTripBtn: string;
  modifyTripBtn: string;
  saveTripBtn: string;
  savedTripSuccess: string;
  shareTripBtn: string;
  printTripBtn: string;
  downloadTripBtn: string;
  interactiveMapTab: string;
  itineraryTimelineTab: string;
  weatherForecastTab: string;
  budgetBreakdownTab: string;

  // Budget Breakdown
  transportation: string;
  accommodation: string;
  food: string;
  activities: string;
  miscellaneous: string;
  totalBudget: string;
  estimatedCost: string;

  // Modify Trip Modal
  modifyModalTitle: string;
  modifyModalSubtitle: string;
  modifyInputPlaceholder: string;
  applyModificationBtn: string;
  quickMod1: string;
  quickMod2: string;
  quickMod3: string;
  quickMod4: string;

  // Assistant
  assistantTitle: string;
  assistantSubtitle: string;
  assistantGreeting: string;
  assistantPlaceholder: string;
  assistantSend: string;

  // Kannada phrases
  phrasesTitle: string;
  phrasesSubtitle: string;

  // Footer
  footerDesc: string;
  footerDisclaimer: string;
  allRightsReserved: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appName: 'Karnataka AI Travel Planner',
    tagline: 'Your AI-powered companion for exploring Karnataka.',
    navHome: 'Home',
    navPlan: 'Plan Trip',
    navExplore: 'Explore Karnataka',
    navSaved: 'Saved Trips',
    navPhrases: 'Kannada Phrases',
    assistantBtn: 'Karnataka Travel AI',
    
    heroHeading: 'Plan Your Karnataka Trip With AI',
    heroSubheading: 'Tell us your budget, time, and interests. Our AI creates a personalized Karnataka itinerary for you.',
    heroInputPlaceholder: 'Try: I have ₹5,000 and 5 days. I love nature and waterfalls.',
    heroGenerateBtn: '✨ Generate My Trip',
    heroExploreBtn: 'Explore Karnataka',
    heroTryPrompts: 'Quick Ideas to Try:',

    howItWorksHeading: 'How It Works',
    howItWorks1Title: '1. Tell us your plan',
    howItWorks1Desc: 'Describe your budget, starting city, preferred days, or travel style in plain English.',
    howItWorks2Title: '2. AI builds your itinerary',
    howItWorks2Desc: 'Smart algorithms match routes, authentic stays, regional food, and accurate costs.',
    howItWorks3Title: '3. Explore, customize & travel',
    howItWorks3Desc: 'Tweak costs with one-click budget optimization, inspect routes on maps, and save.',

    popularHeading: 'Popular Karnataka Destinations',
    popularSubheading: 'From UNESCO stone chariots in Hampi to misty coffee peaks in Coorg.',
    exploreAllDestinations: 'View All 12+ Curated Destinations',

    plannerTitle: 'AI Trip Planner',
    plannerSubtitle: 'Design your personalized journey across Karnataka using plain language or structured filters.',
    optionAName: 'Natural Language AI',
    optionBName: 'Structured Form',
    naturalPromptLabel: 'Tell AI about your trip in your own words...',
    naturalPromptPlaceholder: 'e.g., I have ₹5,000 budget and 5 days. I am starting from Bengaluru. I like nature, waterfalls and local food.',
    generateTripBtn: 'Generate AI Itinerary',

    startLocationLabel: 'Starting Location',
    durationLabel: 'Duration (Days)',
    budgetLabel: 'Total Budget (₹)',
    travellersLabel: 'Number of Travellers',
    travelStyleLabel: 'Travel Style',
    travelModeLabel: 'Preferred Mode of Travel',
    interestsLabel: 'Your Interests (Select Multiple)',

    styleBudget: 'Budget (Hostels & Local Buses)',
    styleStandard: 'Standard (Comfort Hotels & Cabs)',
    stylePremium: 'Premium (Luxury Resorts & Private Tours)',

    itineraryTitle: 'Your Personalized Itinerary',
    estimatedTotal: 'Estimated Total',
    budgetRemaining: 'remaining under budget',
    overBudgetWarning: 'This trip is currently over your requested budget',
    optimizeTripBtn: '✨ Optimize Budget to Fit',
    modifyTripBtn: '💬 Ask AI to Modify Trip',
    saveTripBtn: 'Save Itinerary',
    savedTripSuccess: 'Trip saved to your device!',
    shareTripBtn: 'Share Trip',
    printTripBtn: 'Print / Save PDF',
    downloadTripBtn: 'Export Itinerary',
    interactiveMapTab: 'Interactive Route Map',
    itineraryTimelineTab: 'Day Timeline',
    weatherForecastTab: 'Live Weather',
    budgetBreakdownTab: 'Smart Budget',

    transportation: 'Transportation (Bus/Train/Local)',
    accommodation: 'Accommodation & Stays',
    food: 'Food & Regional Delicacies',
    activities: 'Attractions & Sightseeing Entry',
    miscellaneous: 'Miscellaneous & Emergency Fund',
    totalBudget: 'Total Budget',
    estimatedCost: 'Estimated Cost',

    modifyModalTitle: 'Modify Your Itinerary with AI',
    modifyModalSubtitle: 'Tell AI how you want to alter costs, add sights, or swap destinations.',
    modifyInputPlaceholder: 'e.g. Make this ₹2,000 cheaper, add more waterfalls, or make it family friendly...',
    applyModificationBtn: 'Apply AI Modifications',
    quickMod1: 'Make this ₹2,000 cheaper',
    quickMod2: 'Add more waterfalls & nature',
    quickMod3: 'Make food 100% vegetarian friendly',
    quickMod4: 'Switch to public transport (KSRTC/Train)',

    assistantTitle: 'Karnataka Travel AI',
    assistantSubtitle: 'Ask anything about places, routes, food or Kannada words',
    assistantGreeting: 'Namaskara! I am your Karnataka AI travel assistant. How can I help you explore Karnataka today?',
    assistantPlaceholder: 'Ask about places, budget, best food, or Kannada phrases...',
    assistantSend: 'Send',

    phrasesTitle: 'Useful Kannada Phrases',
    phrasesSubtitle: 'Connect warmly with locals across Karnataka using these key phrases with audio pronunciations.',

    footerDesc: 'Karnataka AI Travel Planner is your smart companion for discovering royal palaces, mist-kissed Western Ghats, ancient UNESCO ruins, and pristine coastal sands.',
    footerDisclaimer: 'Note: Travel estimates are approximate. Verify ticket prices, train schedules, and local weather before embarking.',
    allRightsReserved: 'Crafted with pride for Karnataka Tourism.'
  },
  kn: {
    appName: 'ಕರ್ನಾಟಕ AI ಟ್ರಾವೆಲ್ ಪ್ಲಾನರ್',
    tagline: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸಕ್ಕೆ ನಿಮ್ಮ AI ಚಾಲಿತ ಮಾರ್ಗದರ್ಶಿ.',
    navHome: 'ಮುಖಪುಟ',
    navPlan: 'ಪ್ರವಾಸ ಯೋಜನೆ',
    navExplore: 'ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ',
    navSaved: 'ಉಳಿಸಿದ ಪ್ರವಾಸಗಳು',
    navPhrases: 'ಕನ್ನಡ ಸಂಭಾಷಣೆ',
    assistantBtn: 'ಕರ್ನಾಟಕ AI ಸಹಾಯಕ',
    
    heroHeading: 'AI ಮೂಲಕ ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಯೋಜಿಸಿ',
    heroSubheading: 'ನಿಮ್ಮ ಬಜೆಟ್, ದಿನಗಳು ಮತ್ತು ಆಸಕ್ತಿಯನ್ನು ತಿಳಿಸಿ. ನಮ್ಮ AI ನಿಮಗಾಗಿ ಸೂಕ್ತ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿಯನ್ನು ರೂಪಿಸುತ್ತದೆ.',
    heroInputPlaceholder: 'ಉದಾಹರಣೆ: ನನ್ನಲ್ಲಿ ₹5,000 ಇದೆ ಮತ್ತು 5 ದಿನಗಳು. ನನಗೆ ಪ್ರಕೃತಿ ಮತ್ತು ಜಲಪಾತಗಳು ಇಷ್ಟ.',
    heroGenerateBtn: '✨ ನನ್ನ ಪ್ರವಾಸ ರೂಪಿಸಿ',
    heroExploreBtn: 'ಕರ್ನಾಟಕ ಅನ್ವೇಷಿಸಿ',
    heroTryPrompts: 'ಪ್ರಯತ್ನಿಸಿ ನೋಡಿ:',

    howItWorksHeading: 'ಇದು ಹೇಗೆ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತದೆ',
    howItWorks1Title: '೧. ನಿಮ್ಮ ಯೋಜನೆ ತಿಳಿಸಿ',
    howItWorks1Desc: 'ನಿಮ್ಮ ಬಜೆಟ್, ಹೊರಡುವ ಊರು, ದಿನಗಳು ಅಥವಾ ಪ್ರವಾಸ ಶೈಲಿಯನ್ನು ಸರಳವಾಗಿ ತಿಳಿಸಿ.',
    howItWorks2Title: '೨. AI ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧಪಡಿಸುತ್ತದೆ',
    howItWorks2Desc: 'ಬುದ್ಧಿವಂತ ಅಲ್ಗಾರಿದಮ್‌ಗಳು ಸರಿಯಾದ ಮಾರ್ಗ, ವಾಸ್ತವ್ಯ ಮತ್ತು ಆಹಾರದ ಅಂದಾಜು ನೀಡುತ್ತವೆ.',
    howItWorks3Title: '೩. ಬದಲಾಯಿಸಿ ಮತ್ತು ಪ್ರಯಾಣಿಸಿ',
    howItWorks3Desc: 'ಬಜೆಟ್ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಿ, ಮ್ಯಾಪ್‌ನಲ್ಲಿ ಮಾರ್ಗ ವೀಕ್ಷಿಸಿ ಮತ್ತು ಉಳಿಸಿಕೊಳ್ಳಿ.',

    popularHeading: 'ಜನಪ್ರಿಯ ಕರ್ನಾಟಕ ತಾಣಗಳು',
    popularSubheading: 'ಹಂಪಿಯ ಕಲ್ಲಿನ ರಥದಿಂದ ಕೊಡಗಿನ ಮಂಜಿನ ಕಾಫಿ ಬೆಟ್ಟಗಳವರೆಗೆ.',
    exploreAllDestinations: 'ಎಲ್ಲಾ ೧೨+ ತಾಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ',

    plannerTitle: 'AI ಟ್ರಾವೆಲ್ ಪ್ಲಾನರ್',
    plannerSubtitle: 'ಸರಳ ಭಾಷೆಯಲ್ಲಿ ಬರೆದು ಅಥವಾ ಫಾರ್ಮ್ ತುಂಬುವ ಮೂಲಕ ನಿಮ್ಮ ಪ್ರವಾಸ ಸಿದ್ಧಪಡಿಸಿ.',
    optionAName: 'ನೈಸರ್ಗಿಕ ಭಾಷೆ (AI)',
    optionBName: 'ವಿವರವಾದ ಫಾರ್ಮ್',
    naturalPromptLabel: 'ನಿಮ್ಮ ಪ್ರವಾಸದ ಬಗ್ಗೆ ವಿವರವಾಗಿ ತಿಳಿಸಿ...',
    naturalPromptPlaceholder: 'ಉದಾಹರಣೆಗೆ: ₹5,000 ಬಜೆಟ್ ಇದೆ ಮತ್ತು 5 ದಿನಗಳು. ಬೆಂಗಳೂರಿನಿಂದ ಹೊರಡುತ್ತೇನೆ. ಪ್ರಕೃತಿ ಮತ್ತು ಜಲಪಾತಗಳು ಬೇಕು.',
    generateTripBtn: 'AI ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ ರಚಿಸಿ',

    startLocationLabel: 'ಹೊರಡುವ ಸ್ಥಳ',
    durationLabel: 'ದಿನಗಳ ಸಂಖ್ಯೆ',
    budgetLabel: 'ಒಟ್ಟು ಬಜೆಟ್ (₹)',
    travellersLabel: 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ',
    travelStyleLabel: 'ಪ್ರವಾಸ ಶೈಲಿ',
    travelModeLabel: 'ಪ್ರಯಾಣದ ವಿಧಾನ',
    interestsLabel: 'ನಿಮ್ಮ ಆಸಕ್ತಿಗಳು (ಆಯ್ಕೆ ಮಾಡಿ)',

    styleBudget: 'ಕಡಿಮೆ ಖರ್ಚು (ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ಸು & ಹಾಸ್ಟೆಲ್)',
    styleStandard: 'ಮಧ್ಯಮ (ಕಂಫರ್ಟ್ ಹೋಟೆಲ್ & ಟ್ಯಾಕ್ಸಿ)',
    stylePremium: 'ಪ್ರೀಮಿಯಂ (ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್ & ಖಾಸಗಿ ವಾಹನ)',

    itineraryTitle: 'ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ',
    estimatedTotal: 'ಅಂದಾಜು ಒಟ್ಟು ಮೊತ್ತ',
    budgetRemaining: 'ಬಜೆಟ್‌ನಲ್ಲಿ ಉಳಿದ ಹಣ',
    overBudgetWarning: 'ಈ ಪ್ರವಾಸವು ನಿಮ್ಮ ಬಜೆಟ್‌ಗಿಂತ ಹೆಚ್ಚಾಗಿದೆ',
    optimizeTripBtn: '✨ ಬಜೆಟ್‌ಗೆ ಸರಿಹೊಂದಿಸಿ (ಆಪ್ಟಿಮೈಸ್)',
    modifyTripBtn: '💬 ಪ್ರವಾಸ ಬದಲಾಯಿಸಲು AI ಗೆ ಕೇಳಿ',
    saveTripBtn: 'ಪ್ರವಾಸ ಉಳಿಸಿ',
    savedTripSuccess: 'ಪ್ರವಾಸ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!',
    shareTripBtn: 'ಹಂಚಿಕೊಳ್ಳಿ',
    printTripBtn: 'ಮುದ್ರಿಸಿ / PDF',
    downloadTripBtn: 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ',
    interactiveMapTab: 'ಮ್ಯಾಪ್ ಮಾರ್ಗ',
    itineraryTimelineTab: 'ದಿನಚರಿ ವೇಳಾಪಟ್ಟಿ',
    weatherForecastTab: 'ಹವಾಮಾನ ಮಾಹಿತಿ',
    budgetBreakdownTab: 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್ ವಿವರ',

    transportation: 'ಸಾರಿಗೆ (ಬಸ್ಸು/ರೈಲು/ಸ್ಥಳೀಯ)',
    accommodation: 'ವಾಸ್ತವ್ಯ ಮತ್ತು ಹೋಟೆಲ್',
    food: 'ಆಹಾರ ಮತ್ತು ಊಟೋಪಚಾರ',
    activities: 'ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳ ಪ್ರವೇಶ ಶುಲ್ಕ',
    miscellaneous: 'ಇತರೆ ತುರ್ತು ಖರ್ಚುಗಳು',
    totalBudget: 'ಒಟ್ಟು ಬಜೆಟ್',
    estimatedCost: 'ಅಂದಾಜು ಖರ್ಚು',

    modifyModalTitle: 'AI ಮೂಲಕ ಪ್ರವಾಸ ಬದಲಾಯಿಸಿ',
    modifyModalSubtitle: 'ಖರ್ಚು ಕಡಿಮೆ ಮಾಡಲು, ಹೊಸ ಸ್ಥಳ ಸೇರಿಸಲು ಅಥವಾ ದಿನ ಬದಲಿಸಲು ತಿಳಿಸಿ.',
    modifyInputPlaceholder: 'ಉದಾಹರಣೆಗೆ: ₹2,000 ಕಡಿಮೆ ಮಾಡಿ, ಇನ್ನಷ್ಟು ಜಲಪಾತಗಳನ್ನು ಸೇರಿಸಿ...',
    applyModificationBtn: 'ಬದಲಾವಣೆ ಅನ್ವಯಿಸಿ',
    quickMod1: 'ಖರ್ಚನ್ನು ₹2,000 ಕಡಿಮೆ ಮಾಡಿ',
    quickMod2: 'ಹೆಚ್ಚು ಜಲಪಾತ & ಪ್ರಕೃತಿ ಸೇರಿಸಿ',
    quickMod3: 'ಸಂಪೂರ್ಣ ಸಸ್ಯಾಹಾರಿ ಊಟ ನೀಡಿ',
    quickMod4: 'ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ಸು/ರೈಲು ಬಳಸಿ',

    assistantTitle: 'ಕರ್ನಾಟಕ ಟ್ರಾವೆಲ್ AI',
    assistantSubtitle: 'ಸ್ಥಳಗಳು, ಮಾರ್ಗಗಳು, ಆಹಾರ ಅಥವಾ ಕನ್ನಡ ಪದಗಳ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ',
    assistantGreeting: 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ಕರ್ನಾಟಕ AI ಪ್ರವಾಸ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?',
    assistantPlaceholder: 'ಸ್ಥಳಗಳು, ಬಜೆಟ್, ಊಟ ಅಥವಾ ಕನ್ನಡ ಪದಗಳ ಬಗ್ಗೆ ಕೇಳಿ...',
    assistantSend: 'ಕಳುಹಿಸಿ',

    phrasesTitle: 'ಉಪಯುಕ್ತ ಕನ್ನಡ ಸಂಭಾಷಣೆಗಳು',
    phrasesSubtitle: 'ಕರ್ನಾಟಕದಲ್ಲಿ ಪ್ರಯಾಣಿಸುವಾಗ ಸ್ಥಳೀಯರೊಂದಿಗೆ ಸುಲಭವಾಗಿ ಮಾತನಾಡಲು ಈ ವಾಕ್ಯಗಳು ನೆರವಾಗುತ್ತವೆ.',

    footerDesc: 'ಕರ್ನಾಟಕ AI ಟ್ರಾವೆಲ್ ಪ್ಲಾನರ್ ಅರಮನೆಗಳು, ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಹಸಿರು ಬೆಟ್ಟಗಳು, ಹಂಪಿಯ ಅವಶೇಷಗಳು ಮತ್ತು ಕರಾವಳಿಯನ್ನು ಅನ್ವೇಷಿಸಲು ನಿಮ್ಮ ಡಿಜಿಟಲ್ ಸಂಗಾತಿ.',
    footerDisclaimer: 'ಸೂಚನೆ: ಪ್ರವಾಸದ ವೆಚ್ಚಗಳು ಅಂದಾಜು ಮಾತ್ರ. ಪ್ರಯಾಣಿಸುವ ಮೊದಲು ಸ್ಥಳೀಯ ದರಗಳು ಮತ್ತು ಪರಿಸ್ಥಿತಿಯನ್ನು ಪರಿಶೀಲಿಸಿ.',
    allRightsReserved: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮಕ್ಕಾಗಿ ಹೆಮ್ಮೆಯಿಂದ ರೂಪಿಸಲಾಗಿದೆ.'
  }
};
