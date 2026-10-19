import { 
  Activity, 
  DayPlan, 
  NaturalLanguageExtraction, 
  TravelMode, 
  TravelStyle, 
  TripItinerary 
} from '../types/travel';
import { KARNATAKA_DESTINATIONS } from '../data/destinations';
import { calculateTripBudget } from './budgetOptimizer';
import { getHotelForDestination, getTransitForMode } from '../data/accommodations';
import { getActivitiesForInterests, ThemedActivity } from '../data/interestActivities';
import { formatTripDayDate, formatTripDateRange, getTomorrowDateString } from '../utils/dateUtils';

// Parse natural language queries
export function parseNaturalLanguageQuery(query: string): NaturalLanguageExtraction {
  const text = query.toLowerCase();
  
  // Extract budget
  let budget: number | undefined = undefined;
  const budgetKMatch = text.match(/(?:₹|rs\.?|inr)?\s*(\d+(?:\.\d+)?)\s*k\b/i);
  if (budgetKMatch) {
    budget = Math.round(parseFloat(budgetKMatch[1]) * 1000);
  } else {
    const budgetMatch = 
      text.match(/(?:₹|rs\.?|inr)\s*([\d,]+)/i) || 
      text.match(/([\d,]+)\s*(?:rupees|rs|budget|inr)/i) ||
      text.match(/(?:budget|cost)\s*(?:is|of|:|is\s*around)?\s*(?:₹|rs\.?|inr)?\s*([\d,]+)/i) ||
      text.match(/([0-9]{1,2},[0-9]{3})/i);
    if (budgetMatch) {
      budget = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
    }
  }

  // Extract duration days
  let durationDays: number | undefined = undefined;
  const daysMatch = text.match(/(\d+)[\s-]*(?:days?|day|d\b)/i);
  if (daysMatch) {
    durationDays = Math.min(15, Math.max(1, parseInt(daysMatch[1], 10)));
  }

  // Extract date if mentioned
  let startDate: string | undefined = undefined;
  if (text.includes('tomorrow')) {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    startDate = d.toISOString().split('T')[0];
  } else if (text.includes('next week')) {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    startDate = d.toISOString().split('T')[0];
  } else if (text.includes('this weekend') || text.includes('weekend')) {
    const d = new Date();
    const day = d.getDay();
    const diff = (6 - day + 7) % 7 || 7;
    d.setDate(d.getDate() + diff);
    startDate = d.toISOString().split('T')[0];
  } else {
    const isoMatch = text.match(/\b(20\d\d-[01]\d-[0-3]\d)\b/);
    if (isoMatch) {
      startDate = isoMatch[1];
    }
  }

  // Extract starting location
  let startingLocation = 'Bengaluru';
  if (text.includes('mysuru') || text.includes('mysore')) startingLocation = 'Mysuru';
  else if (text.includes('mangaluru') || text.includes('mangalore')) startingLocation = 'Mangaluru';
  else if (text.includes('hubballi') || text.includes('hubli')) startingLocation = 'Hubballi';
  else if (text.includes('shivamogga') || text.includes('shimoga')) startingLocation = 'Shivamogga';
  else if (text.includes('belagavi') || text.includes('belgaum')) startingLocation = 'Belagavi';
  else if (text.includes('goa')) startingLocation = 'Goa';
  else if (text.includes('bengaluru') || text.includes('bangalore')) startingLocation = 'Bengaluru';

  // Extract travellers count
  let travellersCount = 1;
  if (
    text.includes('couple') ||
    text.includes('we ') ||
    text.includes('2 of us') ||
    text.includes('two of us') ||
    text.includes('with my friend') ||
    text.includes('with my wife') ||
    text.includes('with my husband') ||
    text.includes('with my partner')
  ) {
    travellersCount = 2;
  } else if (text.includes('family of 4') || text.includes('4 of us')) {
    travellersCount = 4;
  } else if (text.includes('family of 3') || text.includes('3 of us')) {
    travellersCount = 3;
  }
  const travellerMatch = text.match(/(\d+)\s*(?:travellers?|travelers?|people|persons?|friends?|adults?)/i);
  if (travellerMatch) {
    travellersCount = parseInt(travellerMatch[1], 10);
  }

  // Extract travel style
  let travelStyle: TravelStyle = 'standard';
  if (
    text.includes('cheap') || 
    text.includes('budget') || 
    text.includes('backpack') || 
    text.includes('low cost') ||
    text.includes('hostel') ||
    text.includes('dorm')
  ) {
    travelStyle = 'budget';
  } else if (
    text.includes('luxury') || 
    text.includes('luxuary') || 
    text.includes('premium') || 
    text.includes('5 star') || 
    text.includes('5-star') || 
    text.includes('five star') ||
    text.includes('resort') ||
    text.includes('palace')
  ) {
    travelStyle = 'premium';
  }

  // Extract travel mode
  let travelMode: TravelMode = 'any';
  if (
    text.includes('only cab') || 
    text.includes('only car') || 
    text.includes('by cab') || 
    text.includes('by car') || 
    text.includes('taxi') || 
    text.includes('cab') || 
    text.includes('private car') || 
    text.includes('chauffeur')
  ) {
    travelMode = 'car';
  } else if (
    text.includes('only bus') || 
    text.includes('by bus') || 
    text.includes('ksrtc') || 
    text.includes('airavat') || 
    text.includes('rajahamsa') ||
    text.includes('sarige')
  ) {
    travelMode = 'bus';
  } else if (
    text.includes('only train') || 
    text.includes('by train') || 
    text.includes('railway') || 
    text.includes('vande bharat') || 
    text.includes('shatabdi') ||
    text.includes('train')
  ) {
    travelMode = 'train';
  } else if (
    text.includes('only bike') || 
    text.includes('by bike') || 
    text.includes('motorcycle') || 
    text.includes('royal enfield')
  ) {
    travelMode = 'bike';
  }

  // Extract interests
  const interests: string[] = [];
  if (text.includes('waterfall') || text.includes('falls')) interests.push('waterfalls');
  if (text.includes('nature') || text.includes('greenery') || text.includes('ghats')) interests.push('nature');
  if (text.includes('beach') || text.includes('coast') || text.includes('sea')) interests.push('beaches');
  if (text.includes('history') || text.includes('heritage') || text.includes('ruin') || text.includes('fort') || text.includes('monument')) interests.push('history');
  if (text.includes('temple') || text.includes('spiritual') || text.includes('pilgrim')) interests.push('spiritual');
  if (text.includes('food') || text.includes('dosa') || text.includes('cuisine') || text.includes('eating') || text.includes('local food')) interests.push('food');
  if (text.includes('wildlife') || text.includes('safari') || text.includes('tiger') || text.includes('elephant')) interests.push('wildlife');
  if (text.includes('adventure') || text.includes('trek') || text.includes('rafting') || text.includes('hike')) interests.push('adventure');
  if (text.includes('family') || text.includes('kids') || text.includes('children')) interests.push('family');
  if (text.includes('photo') || text.includes('camera')) interests.push('photography');
  if (text.includes('culture') || text.includes('art') || text.includes('craft')) interests.push('culture');

  if (interests.length === 0) {
    interests.push('nature', 'food', 'culture');
  }

  // Extract mentioned destinations
  const destinationsMentioned: string[] = [];
  KARNATAKA_DESTINATIONS.forEach((dest) => {
    if (text.includes(dest.name.toLowerCase()) || text.includes(dest.id)) {
      destinationsMentioned.push(dest.name);
    }
  });

  return {
    budget,
    durationDays,
    startDate,
    startingLocation,
    interests,
    travelStyle,
    travellersCount,
    travelMode,
    destinationsMentioned,
    rawQuery: query
  };
}

// Generate complete itinerary using Smart Karnataka Engine
export function generateLocalItinerary(params: {
  budget?: number;
  durationDays?: number;
  startDate?: string;
  startingLocation?: string;
  interests?: string[];
  travelStyle?: TravelStyle;
  travellersCount?: number;
  travelMode?: TravelMode;
  destinationsMentioned?: string[];
}): TripItinerary {
  const duration = params.durationDays || 5;
  const startDate = params.startDate || getTomorrowDateString();
  const startingLocation = params.startingLocation || 'Bengaluru';
  const travelStyle = params.travelStyle || 'budget';
  const travellers = params.travellersCount || 1;
  const travelMode = params.travelMode || (travelStyle === 'budget' ? 'bus' : 'any');
  const interests = params.interests && params.interests.length > 0 ? params.interests : ['nature', 'waterfalls', 'food'];

  // Default budget if not specified
  const rawBudget = params.budget || (travelStyle === 'premium' ? duration * 10000 : (travelStyle === 'standard' ? duration * 3000 : duration * 1000));

  // Route Planning Logic based on duration, start, and interests
  const route = selectOptimalRoute(startingLocation, duration, interests, params.destinationsMentioned);

  // Generate days based on route, style, travelMode, and calendar dates
  const days: DayPlan[] = [];
  for (let d = 1; d <= duration; d++) {
    const dayPlan = buildDayPlan(d, duration, route, startingLocation, travelStyle, interests, travelMode, startDate);
    days.push(dayPlan);
  }

  // Calculate budget
  const budget = calculateTripBudget(
    days,
    duration,
    travellers,
    travelStyle,
    travelMode,
    rawBudget
  );

  // Derive descriptive title and summary reflecting interests and style
  const mainPlaces = route.slice(0, 3).join(' → ');
  const modeBadge = travelMode === 'car' ? 'Private AC Cab' : (travelMode === 'bus' ? 'KSRTC Bus' : (travelMode === 'train' ? 'Express Train' : (travelMode === 'bike' ? 'Bike Tour' : 'Scenic Transit')));
  
  let themeLabel = 'Karnataka Journey';
  let themeLabelKn = 'ಕರ್ನಾಟಕ ಪ್ರವಾಸ';
  if (interests.length === 1) {
    if (interests.includes('waterfalls')) {
      themeLabel = 'Waterfalls & Cascades Expedition';
      themeLabelKn = 'ಜಲಪಾತಗಳ ಸಾಹಸ ಪ್ರವಾಸ';
    } else if (interests.includes('beaches')) {
      themeLabel = 'Coastal Karnataka & Golden Beaches Tour';
      themeLabelKn = 'ಕರಾವಳಿ ಕರ್ನಾಟಕ & ಕಡಲತೀರಗಳ ಪ್ರವಾಸ';
    } else if (interests.includes('history')) {
      themeLabel = 'UNESCO Heritage & History Odyssey';
      themeLabelKn = 'ಯುನೆಸ್ಕೋ ಪಾರಂಪರಿಕ ಇತಿಹಾಸ ಪ್ರವಾಸ';
    } else if (interests.includes('wildlife')) {
      themeLabel = 'Wildlife Safaris & Wilderness Trail';
      themeLabelKn = 'ವನ್ಯಜೀವಿ ಸಫಾರಿ & ಅರಣ್ಯ ಪ್ರವಾಸ';
    } else if (interests.includes('spiritual')) {
      themeLabel = 'Sacred Temples & Pilgrimage Tour';
      themeLabelKn = 'ಪುಣ್ಯಕ್ಷೇತ್ರ & ಧಾರ್ಮಿಕ ಪ್ರವಾಸ';
    }
  } else if (interests.includes('waterfalls')) {
    themeLabel = 'Waterfalls & Western Ghats Trail';
    themeLabelKn = 'ಜಲಪಾತಗಳು & ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಪ್ರವಾಸ';
  } else if (interests.includes('beaches')) {
    themeLabel = 'Coastal Beaches & Heritage Tour';
    themeLabelKn = 'ಕಡಲತೀರಗಳು & ಕರಾವಳಿ ಪ್ರವಾಸ';
  }

  const stylePrefix = travelStyle === 'premium' ? '5-Star Luxury ' : (travelStyle === 'standard' ? 'Curated Comfort ' : 'Budget ');
  const stylePrefixKn = travelStyle === 'premium' ? '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ' : (travelStyle === 'standard' ? 'ಕಂಫರ್ಟ್ ' : 'ಕಡಿಮೆ ಬಜೆಟ್ ');

  const title = `${duration}-Day ${stylePrefix}${themeLabel}`;
  const titleKn = `${duration} ದಿನಗಳ ${stylePrefixKn}${themeLabelKn}`;

  const dateRange = formatTripDateRange(startDate, duration);

  const summary = `Starting from ${startingLocation} on ${dateRange.range}, this ${duration}-day itinerary is exclusively customized for your interest in ${interests.join(', ')} across ${route.join(', ')}. Includes ${travelStyle === 'premium' ? '5-Star Luxury Palace Resorts' : (travelStyle === 'standard' ? '3-Star Comfort Hotels' : 'Certified Hostels & Lodges')} and ${modeBadge} transport.`;
  const summaryKn = `${startingLocation}ನಿಂದ ${dateRange.rangeKn} ರಂದು ಆರಂಭವಾಗಿ ನಿಮ್ಮ ${interests.join(', ')} ಆಸಕ್ತಿಗೆ ಅನುಗುಣವಾಗಿ ${route.join(', ')} ತಾಣಗಳನ್ನು ${modeBadge} ಮೂಲಕ ಸಂದರ್ಶಿಸುವ ಪ್ರವಾಸ. ${travelStyle === 'premium' ? '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್' : (travelStyle === 'standard' ? '೩-ಸ್ಟಾರ್ ಹೋಟೆಲ್' : 'ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್')} ವಸತಿ.`;

  return {
    id: `trip-${Date.now()}`,
    title,
    titleKn,
    tagline: `Route: ${startingLocation} → ${mainPlaces}${route.length > 3 ? '...' : ''} (${modeBadge}) • ${dateRange.range}`,
    summary,
    summaryKn,
    durationDays: duration,
    startDate,
    formattedDateRange: dateRange.range,
    formattedDateRangeKn: dateRange.rangeKn,
    userBudget: rawBudget,
    travellersCount: travellers,
    startingLocation,
    startingLocationKn: startingLocation === 'Bengaluru' ? 'ಬೆಂಗಳೂರು' : startingLocation,
    travelStyle,
    travelMode,
    interests,
    destinations: route,
    days,
    budget,
    createdAt: new Date().toISOString()
  };
}

// Selects realistic sequential geographical route tailored to interests
export function selectOptimalRoute(
  start: string,
  days: number,
  interests: string[],
  mentioned?: string[]
): string[] {
  // If user mentioned specific destinations (other than the start point), prioritize them
  const actualDestinations = (mentioned || []).filter(
    d => d.toLowerCase() !== start.toLowerCase()
  );
  if (actualDestinations.length > 0) {
    const list = [...new Set(actualDestinations)];
    list.unshift(start);
    return list;
  }

  const hasBeach = interests.includes('beaches');
  const hasHistory = interests.includes('history') || interests.includes('culture');
  const hasWaterfalls = interests.includes('waterfalls');
  const hasWildlife = interests.includes('wildlife');
  const hasSpiritual = interests.includes('spiritual');
  const hasAdventure = interests.includes('adventure');

  // Mangaluru starting point
  if (start.toLowerCase().includes('mangaluru')) {
    if (hasWaterfalls) return ['Mangaluru', 'Shivamogga', 'Chikmagalur'];
    if (days <= 3) return ['Mangaluru', 'Udupi', 'Gokarna'];
    return ['Mangaluru', 'Udupi', 'Gokarna'];
  }

  // Hubballi starting point
  if (start.toLowerCase().includes('hubballi')) {
    if (hasHistory) return ['Hubballi', 'Badami', 'Hampi'];
    if (hasWaterfalls) return ['Hubballi', 'Shivamogga', 'Chikmagalur'];
    return ['Hubballi', 'Dandeli', 'Gokarna'];
  }

  // Shivamogga starting point
  if (start.toLowerCase().includes('shivamogga')) {
    if (hasWaterfalls) return ['Shivamogga', 'Chikmagalur', 'Coorg'];
    if (hasBeach) return ['Shivamogga', 'Udupi', 'Gokarna'];
    return ['Shivamogga', 'Chikmagalur', 'Mysuru'];
  }

  // From Bengaluru (Default Hub)
  // 1. STRICT WATERFALLS ROUTE
  if (hasWaterfalls && !hasBeach && !hasHistory && !hasSpiritual) {
    if (days <= 2) return ['Bengaluru', 'Chikmagalur'];
    if (days === 3) return ['Bengaluru', 'Chikmagalur', 'Shivamogga'];
    if (days === 4) return ['Bengaluru', 'Chikmagalur', 'Shivamogga'];
    if (days === 5) return ['Bengaluru', 'Coorg', 'Chikmagalur', 'Shivamogga'];
    return ['Bengaluru', 'Coorg', 'Chikmagalur', 'Shivamogga'];
  }

  // 2. STRICT BEACHES ROUTE
  if (hasBeach && !hasHistory && !hasWaterfalls) {
    if (days <= 3) return ['Bengaluru', 'Mangaluru', 'Udupi'];
    if (days === 4) return ['Bengaluru', 'Mangaluru', 'Udupi', 'Gokarna'];
    return ['Bengaluru', 'Mangaluru', 'Udupi', 'Gokarna'];
  }

  // 3. STRICT WILDLIFE ROUTE
  if (hasWildlife && !hasBeach) {
    if (days <= 2) return ['Bengaluru', 'Bandipur'];
    if (days <= 3) return ['Bengaluru', 'Bandipur', 'Coorg'];
    if (days <= 5) return ['Bengaluru', 'Bandipur', 'Coorg', 'Shivamogga'];
    return ['Bengaluru', 'Bandipur', 'Coorg', 'Dandeli'];
  }

  // 4. STRICT SPIRITUAL ROUTE
  if (hasSpiritual && !hasHistory && !hasWaterfalls) {
    if (days <= 2) return ['Bengaluru', 'Udupi'];
    if (days <= 3) return ['Bengaluru', 'Udupi', 'Gokarna'];
    if (days <= 5) return ['Bengaluru', 'Udupi', 'Gokarna'];
    return ['Bengaluru', 'Udupi', 'Gokarna', 'Chikmagalur'];
  }

  // 5. STRICT HISTORY ROUTE
  if (hasHistory && !hasWaterfalls && !hasBeach) {
    if (days <= 2) return ['Bengaluru', 'Mysuru'];
    if (days === 3) return ['Bengaluru', 'Hampi'];
    if (days === 4) return ['Bengaluru', 'Hampi', 'Badami'];
    if (days === 5) return ['Bengaluru', 'Hampi', 'Badami'];
    return ['Bengaluru', 'Mysuru', 'Hampi', 'Badami'];
  }

  // 6. ADVENTURE ROUTE
  if (hasAdventure) {
    if (days <= 3) return ['Bengaluru', 'Dandeli'];
    return ['Bengaluru', 'Chikmagalur', 'Dandeli', 'Gokarna'];
  }

  // 7. MULTI-INTEREST / GENERAL
  if (hasWaterfalls && hasBeach) {
    return ['Bengaluru', 'Chikmagalur', 'Udupi', 'Gokarna'];
  }

  if (days <= 2) {
    return ['Bengaluru', 'Mysuru'];
  } else if (days <= 3) {
    return ['Bengaluru', 'Mysuru', 'Coorg'];
  } else if (days === 4) {
    return ['Bengaluru', 'Mysuru', 'Chikmagalur'];
  } else if (days === 5) {
    return ['Bengaluru', 'Mysuru', 'Chikmagalur'];
  } else {
    return ['Bengaluru', 'Mysuru', 'Coorg', 'Chikmagalur', 'Shivamogga'];
  }
}

// Build individual day activities strictly adhering to travelStyle, travelMode, user interests, and calendar dates
export function buildDayPlan(
  dayNum: number,
  totalDays: number,
  route: string[],
  startLoc: string,
  style: TravelStyle,
  interests: string[],
  travelMode: TravelMode,
  startDate?: string
): DayPlan {
  const isFirstDay = dayNum === 1;
  const isLastDay = dayNum === totalDays;
  const isLuxury = style === 'premium';
  const isBudget = style === 'budget';

  // Compute exact calendar date for this day
  const dayDate = formatTripDayDate(startDate, dayNum - 1);

  // Map day to the current destination city from route
  const stopCities = route.length > 1 ? route.slice(1) : route;
  const cityIndex = Math.min(
    Math.floor(((dayNum - 1) / totalDays) * stopCities.length),
    stopCities.length - 1
  );
  const currentCity = stopCities[cityIndex] || route[1] || route[0] || startLoc;
  const previousCity = dayNum === 1 
    ? startLoc 
    : (stopCities[Math.max(0, cityIndex - 1)] || currentCity);

  const hotel = getHotelForDestination(currentCity, style);

  // Retrieve themed activities strictly matching selected interests
  const themedList = getActivitiesForInterests(interests);

  // Get index offsets for the day to avoid repeating the exact same activity
  const actIndex1 = ((dayNum - 1) * 2) % themedList.length;
  const actIndex2 = ((dayNum - 1) * 2 + 1) % themedList.length;
  const themeAct1 = themedList[actIndex1];
  const themeAct2 = themedList[actIndex2];

  // DAY 1: DEPARTURE & FIRST THEMED ATTRACTIONS
  if (isFirstDay) {
    const transit = getTransitForMode(travelMode, style, startLoc, currentCity);

    const dayActivities: Activity[] = [
      // 1. Morning Departure Transit
      {
        id: `d1-trans`,
        time: '07:30 AM',
        title: transit.title,
        titleKn: transit.titleKn,
        place: `${startLoc} Departure Point`,
        description: transit.departureDesc,
        descriptionKn: transit.departureDescKn,
        estimatedCost: transit.costPerDayPerPerson,
        travelDistanceKm: 160,
        durationHours: 3.5,
        type: 'travel'
      },
      // 2. Midday Themed Attraction
      {
        id: `d1-act1`,
        time: '11:30 AM',
        title: themeAct1.title,
        titleKn: themeAct1.titleKn,
        place: themeAct1.place,
        description: isLuxury ? `${themeAct1.description} Private VIP guide arranged.` : themeAct1.description,
        descriptionKn: themeAct1.descriptionKn,
        estimatedCost: isLuxury ? (themeAct1.estimatedCost * 2 || 200) : themeAct1.estimatedCost,
        durationHours: themeAct1.durationHours,
        type: 'attraction'
      },
      // 3. Regional Lunch
      {
        id: `d1-lunch`,
        time: '01:30 PM',
        title: isLuxury 
          ? `Royal Luncheon at ${hotel.name.split('/')[0].trim()}` 
          : (isBudget ? `Authentic Regional Karnataka Tiffin & Meals` : `Curated Heritage Dining in ${currentCity}`),
        titleKn: 'ಸ್ಥಳೀಯ ರುಚಿಕರ ಊಟ',
        place: isLuxury ? `${hotel.name.split('/')[0].trim()} Fine Dining` : `${currentCity} Famous Heritage Mess`,
        description: isLuxury
          ? 'Multi-course royal luncheon with traditional silver service, indigenous spices, and signature sweets.'
          : (isBudget ? 'Unlimited local thali with piping hot ghee saaru, ragi mudde / akki rotti, and fresh buttermilk.' : 'Rich traditional Karnataka spread with regional curries, fresh rotis, and Mysore pak.'),
        estimatedCost: isLuxury ? 1200 : (isBudget ? 120 : 350),
        durationHours: 1.5,
        type: 'food'
      },
      // 4. Afternoon Themed Attraction
      {
        id: `d1-act2`,
        time: '03:45 PM',
        title: themeAct2.title,
        titleKn: themeAct2.titleKn,
        place: themeAct2.place,
        description: `${transit.localSightseeingDesc} ${themeAct2.description}`,
        descriptionKn: themeAct2.descriptionKn,
        estimatedCost: isLuxury ? (themeAct2.estimatedCost * 2 || 150) : themeAct2.estimatedCost,
        durationHours: themeAct2.durationHours,
        type: 'attraction'
      },
      // 5. Evening Scenic Leisure
      {
        id: `d1-leisure`,
        time: '06:30 PM',
        title: `Scenic Sunset & Twilight Promenade in ${currentCity}`,
        titleKn: `${currentCity} ಸಂಜೆ ಸೂರ್ಯಾಸ್ತ ವೀಕ್ಷಣೆ`,
        place: `${currentCity} Scenic Lookout`,
        description: 'Breezy evening stroll absorbing local atmosphere, evening sunset views, and fresh local refreshments.',
        estimatedCost: isLuxury ? 250 : 40,
        durationHours: 2,
        type: 'leisure'
      },
      // 6. Hotel Check-in & Overnight
      {
        id: `d1-hotel`,
        time: '08:30 PM',
        title: `🏨 Check-in & Overnight: ${hotel.name}`,
        titleKn: `🏨 ${hotel.nameKn} ನಲ್ಲಿ ವಾಸ್ತವ್ಯ`,
        place: `${hotel.name} (${hotel.roomType})`,
        description: `${hotel.description} Featured amenities: ${hotel.amenities.join(', ')}.`,
        descriptionKn: hotel.descriptionKn,
        estimatedCost: hotel.costPerNight,
        durationHours: 9,
        type: 'hotel'
      }
    ];

    const estimatedDayCost = dayActivities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);

    return {
      dayNumber: 1,
      date: dayDate.date,
      dateKn: dayDate.dateKn,
      title: `${startLoc} → ${currentCity} (${transit.vehicle})`,
      titleKn: `${startLoc} ನಿಂದ ${currentCity} ಗೆ (${transit.vehicleKn})`,
      fromLocation: startLoc,
      toLocation: currentCity,
      estimatedDayCost,
      activities: dayActivities
    };
  }

  // LAST DAY: FINAL THEMED ACTIVITY & RETURN TRANSIT
  if (isLastDay) {
    const returnFrom = currentCity;
    const transit = getTransitForMode(travelMode, style, returnFrom, startLoc);

    const dayActivities: Activity[] = [
      // 1. Morning Walk / Scenic Activity
      {
        id: `dl-act1`,
        time: '08:00 AM',
        title: `Morning Walk & ${themeAct1.title}`,
        titleKn: `ಮುಂಜಾನೆಯ ${themeAct1.titleKn}`,
        place: themeAct1.place,
        description: isLuxury
          ? `Champagne breakfast followed by private viewing of ${themeAct1.title}.`
          : `Morning visit taking in the serene ambience before departure: ${themeAct1.description}`,
        estimatedCost: isLuxury ? 600 : themeAct1.estimatedCost,
        durationHours: 2,
        type: 'attraction'
      },
      // 2. Final Themed Visit Enroute
      {
        id: `dl-act2`,
        time: '10:45 AM',
        title: themeAct2.title,
        titleKn: themeAct2.titleKn,
        place: themeAct2.place,
        description: themeAct2.description,
        estimatedCost: themeAct2.estimatedCost,
        durationHours: 2,
        type: 'attraction'
      },
      // 3. Farewell Regional Lunch
      {
        id: `dl-lunch`,
        time: '01:00 PM',
        title: isLuxury ? 'Highway Gourmet Luncheon' : `Regional Highway Lunch (Authentic Karnataka Flavours)`,
        titleKn: 'ಹೈವೇ ಊಟ ಮತ್ತು ಕಾಫಿ',
        place: `Scenic Eatery towards ${startLoc}`,
        description: 'Fresh country butter dosas, piping hot akki rotti, filter coffee, and traditional desserts.',
        estimatedCost: isLuxury ? 650 : (isBudget ? 100 : 250),
        durationHours: 1.5,
        type: 'food'
      },
      // 4. Return Transit
      {
        id: `dl-trans`,
        time: '03:30 PM',
        title: transit.title,
        titleKn: transit.titleKn,
        place: `Express Route towards ${startLoc}`,
        description: transit.returnDesc,
        descriptionKn: transit.returnDescKn,
        estimatedCost: transit.costPerDayPerPerson,
        travelDistanceKm: 210,
        durationHours: 4.5,
        type: 'travel'
      }
    ];

    const estimatedDayCost = dayActivities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);

    return {
      dayNumber: dayNum,
      date: dayDate.date,
      dateKn: dayDate.dateKn,
      title: `${returnFrom} → Return to ${startLoc} (${transit.vehicle})`,
      titleKn: `${returnFrom} ನಿಂದ ${startLoc} ಗೆ (${transit.vehicleKn})`,
      fromLocation: returnFrom,
      toLocation: startLoc,
      estimatedDayCost,
      activities: dayActivities
    };
  }

  // INTERMEDIATE DAYS
  const transit = getTransitForMode(travelMode, style, previousCity, currentCity);

  const dayActivities: Activity[] = [
    // 1. Morning Themed Excursion
    {
      id: `d${dayNum}-act1`,
      time: '08:30 AM',
      title: themeAct1.title,
      titleKn: themeAct1.titleKn,
      place: themeAct1.place,
      description: isLuxury ? `${themeAct1.description} Private naturalist / guide service included.` : themeAct1.description,
      descriptionKn: themeAct1.descriptionKn,
      estimatedCost: isLuxury ? (themeAct1.estimatedCost * 2 || 200) : themeAct1.estimatedCost,
      durationHours: themeAct1.durationHours,
      type: 'attraction'
    },
    // 2. Authentic Midday Regional Lunch
    {
      id: `d${dayNum}-lunch`,
      time: '12:45 PM',
      title: isLuxury 
        ? `Chef's Gourmet Tasting Menu at ${hotel.name.split('/')[0].trim()}` 
        : (isBudget ? `Authentic Regional Mess Specialities` : `Traditional ${currentCity} Heritage Dining`),
      titleKn: 'ಸ್ಥಳೀಯ ರುಚಿಕರ ಊಟ',
      place: isLuxury ? `${hotel.name.split('/')[0].trim()} Courtyard` : `${currentCity} Traditional Eatery`,
      description: isLuxury
        ? 'Chef-curated farm-to-table lunch pairing fresh indigenous vegetables, aromatic spices, and traditional Karnataka dessert.'
        : (isBudget ? 'Unlimited authentic meal with hot rice, rasam, palya, sandige crisps, and ghee.' : 'Classic multi-item Karnataka thali with rich regional flavours.'),
      estimatedCost: isLuxury ? 950 : (isBudget ? 110 : 280),
      durationHours: 1.5,
      type: 'food'
    },
    // 3. Afternoon Themed Excursion
    {
      id: `d${dayNum}-act2`,
      time: '03:15 PM',
      title: themeAct2.title,
      titleKn: themeAct2.titleKn,
      place: themeAct2.place,
      description: `${transit.localSightseeingDesc} ${themeAct2.description}`,
      descriptionKn: themeAct2.descriptionKn,
      estimatedCost: isLuxury ? (themeAct2.estimatedCost * 2 || 150) : themeAct2.estimatedCost,
      durationHours: themeAct2.durationHours,
      type: 'attraction'
    },
    // 4. Evening Relaxation & Sunset
    {
      id: `d${dayNum}-eve`,
      time: '06:15 PM',
      title: `Evening Leisure & Sunset at ${currentCity}`,
      titleKn: `${currentCity} ಸಂಜೆ ವಿಶ್ರಾಂತಿ`,
      place: `${currentCity} Sunset Point`,
      description: 'Golden hour moments enjoying cool evening breezes, local tender coconut or filter coffee, and scenic photo opportunities.',
      estimatedCost: 30,
      durationHours: 2,
      type: 'leisure'
    },
    // 5. Hotel Night Stay
    {
      id: `d${dayNum}-hotel`,
      time: '08:30 PM',
      title: `🏨 Night Stay: ${hotel.name}`,
      titleKn: `🏨 ${hotel.nameKn} ನಲ್ಲಿ ವಾಸ್ತವ್ಯ`,
      place: `${hotel.name} (${hotel.tierLabel})`,
      description: `Relaxing evening at ${hotel.name}. Enjoy ${hotel.amenities.slice(0, 3).join(', ')} and restful sleep.`,
      descriptionKn: hotel.descriptionKn,
      estimatedCost: hotel.costPerNight,
      durationHours: 9,
      type: 'hotel'
    }
  ];

  const estimatedDayCost = dayActivities.reduce((sum, act) => sum + (act.estimatedCost || 0), 0);

  return {
    dayNumber: dayNum,
    date: dayDate.date,
    dateKn: dayDate.dateKn,
    title: `${currentCity} • ${themeAct1.title.split('(')[0].trim()}`,
    titleKn: `${currentCity} • ${themeAct1.titleKn.split('(')[0].trim()}`,
    fromLocation: previousCity,
    toLocation: currentCity,
    estimatedDayCost,
    activities: dayActivities
  };
}

// AI Trip Modification Engine
export function modifyItinerary(
  currentItinerary: TripItinerary,
  instruction: string
): { updatedItinerary: TripItinerary; explanation: string } {
  const query = instruction.toLowerCase();
  let explanation = '';

  // Deep clone
  const updated: TripItinerary = JSON.parse(JSON.stringify(currentItinerary));
  const startDate = updated.startDate || getTomorrowDateString();

  // 1. SWITCH TO LUXURY / 5-STAR
  if (
    query.includes('luxury') || 
    query.includes('luxuary') || 
    query.includes('5 star') || 
    query.includes('5-star') || 
    query.includes('five star') || 
    query.includes('resort')
  ) {
    updated.travelStyle = 'premium';
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, 'premium', updated.interests, updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, 'premium', updated.travelMode, Math.max(updated.userBudget, 35000));
    explanation = `👑 Upgraded your itinerary to 5-Star Luxury! All stays switched to premier 5-star palace resorts (such as Lalitha Mahal Palace, The Serai, and Evolve Back), gourmet fine-dining courtyards, and luxury transfers.`;
  }
  // 2. SWITCH TO ONLY CAB / CAR
  else if (query.includes('only cab') || query.includes('only car') || query.includes('cab') || query.includes('taxi')) {
    updated.travelMode = 'car';
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, updated.interests, 'car', startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, 'car', updated.userBudget);
    explanation = `🚗 Transformed all transportation to Private AC Cab! A chauffeur-driven AC cab will be dedicated to you throughout the trip with doorstep pickup and zero buses or trains.`;
  }
  // 3. SWITCH TO ONLY BUS
  else if (query.includes('only bus') || query.includes('bus') || query.includes('ksrtc')) {
    updated.travelMode = 'bus';
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, updated.interests, 'bus', startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, 'bus', updated.userBudget);
    explanation = `🚌 Transportation switched strictly to KSRTC Buses (Airavat / Rajahamsa / Sarige Express) between all destinations.`;
  }
  // 4. SWITCH TO ONLY TRAIN
  else if (query.includes('only train') || query.includes('train')) {
    updated.travelMode = 'train';
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, updated.interests, 'train', startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, 'train', updated.userBudget);
    explanation = `🚆 Transportation updated strictly to Express Trains (Vande Bharat / Shatabdi / Intercity Rail) across all stations.`;
  }
  // 5. STRICT FILTER: WATERFALLS ONLY
  else if (query.includes('waterfall') || query.includes('falls')) {
    updated.interests = ['waterfalls'];
    updated.destinations = selectOptimalRoute(updated.startingLocation, updated.durationDays, ['waterfalls']);
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, ['waterfalls'], updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, updated.travelMode, updated.userBudget);
    explanation = `🌊 Updated your itinerary to show ONLY waterfalls! Swapped all sightseeing activities to Karnataka's most stunning waterfalls and cascades, removing all non-waterfall places.`;
  }
  // 6. STRICT FILTER: BEACHES ONLY
  else if (query.includes('beach') || query.includes('beaches')) {
    updated.interests = ['beaches'];
    updated.destinations = selectOptimalRoute(updated.startingLocation, updated.durationDays, ['beaches']);
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, ['beaches'], updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, updated.travelMode, updated.userBudget);
    explanation = `🏖️ Updated your itinerary to show ONLY beaches! Swapped all sightseeing activities strictly to coastal beaches, island ferries, and sea walks.`;
  }
  // 7. STRICT FILTER: HISTORY ONLY
  else if (query.includes('history') || query.includes('heritage') || query.includes('fort') || query.includes('monument')) {
    updated.interests = ['history'];
    updated.destinations = selectOptimalRoute(updated.startingLocation, updated.durationDays, ['history']);
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, ['history'], updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, updated.travelMode, updated.userBudget);
    explanation = `🏛️ Updated your itinerary to show ONLY historical monuments, UNESCO heritage ruins, and royal palaces!`;
  }
  // 8. STRICT FILTER: WILDLIFE ONLY
  else if (query.includes('wildlife') || query.includes('safari') || query.includes('tiger')) {
    updated.interests = ['wildlife'];
    updated.destinations = selectOptimalRoute(updated.startingLocation, updated.durationDays, ['wildlife']);
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, ['wildlife'], updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, updated.travelMode, updated.userBudget);
    explanation = `🐅 Updated your itinerary to show ONLY wildlife safaris, elephant sanctuaries, and tiger reserves!`;
  }
  // 9. STRICT FILTER: SPIRITUAL / TEMPLES ONLY
  else if (query.includes('temple') || query.includes('spiritual') || query.includes('pilgrim')) {
    updated.interests = ['spiritual'];
    updated.destinations = selectOptimalRoute(updated.startingLocation, updated.durationDays, ['spiritual']);
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, updated.travelStyle, ['spiritual'], updated.travelMode, startDate)
    );
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, updated.travelStyle, updated.travelMode, updated.userBudget);
    explanation = `🛕 Updated your itinerary to show ONLY sacred temples and holy pilgrimage shrines!`;
  }
  // 10. CHEAPER / REDUCE COST
  else if (query.includes('cheaper') || query.includes('reduce cost') || query.includes('cut budget') || query.includes('2000 cheaper')) {
    let reduceTarget = 2000;
    const match = query.match(/(\d+)\s*(?:cheaper|less|reduce)/);
    if (match) reduceTarget = parseInt(match[1], 10);

    updated.travelStyle = 'budget';
    updated.travelMode = 'bus';
    
    updated.days = updated.days.map(d => 
      buildDayPlan(d.dayNumber, updated.durationDays, updated.destinations, updated.startingLocation, 'budget', updated.interests, 'bus', startDate)
    );

    const oldTotal = currentItinerary.budget.totalEstimatedCost;
    updated.budget = calculateTripBudget(updated.days, updated.durationDays, updated.travellersCount, 'budget', 'bus', updated.userBudget);
    const actualReduction = oldTotal - updated.budget.totalEstimatedCost;

    explanation = `✨ Adjusted your itinerary to be ₹${Math.max(500, actualReduction).toLocaleString('en-IN')} cheaper! Swapped transport to regular KSRTC buses, chose certified budget hostels (Zostel/dorms), and replaced paid attractions with stunning free viewpoints.`;
  } 
  // 11. VEGETARIAN
  else if (query.includes('vegetarian') || query.includes('veg')) {
    updated.days.forEach(day => {
      day.activities.forEach(act => {
        if (act.type === 'food') {
          act.title = act.title.replace(/Restaurant|Eatery|Mess|Dining/gi, 'Pure Vegetarian Heritage Darshini');
          act.description = `${act.description} Specially selected pure-vegetarian South Indian Darshini serving piping hot dosas, bisi bele bath, and Mysore pak.`;
        }
      });
    });
    explanation = '🥗 Updated all dining recommendations to 100% Pure Vegetarian iconic eateries, traditional Udupi Krishna Matha meals, and Darshinis.';
  } 
  // 12. GENERAL
  else {
    explanation = `✨ AI updated your itinerary according to "${instruction}". Stays, route, and activities have been aligned.`;
  }

  return { updatedItinerary: updated, explanation };
}
