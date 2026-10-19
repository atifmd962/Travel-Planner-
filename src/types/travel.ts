export type TravelStyle = 'budget' | 'standard' | 'premium';
export type TravelMode = 'bus' | 'train' | 'car' | 'bike' | 'any';

export type DestinationCategory = 
  | 'nature' 
  | 'waterfalls' 
  | 'beaches' 
  | 'history' 
  | 'culture' 
  | 'adventure' 
  | 'food' 
  | 'wildlife' 
  | 'shopping' 
  | 'photography' 
  | 'spiritual' 
  | 'family';

export interface Attraction {
  id: string;
  name: string;
  nameKn: string;
  description: string;
  lat: number;
  lng: number;
  estimatedCost: number;
  durationHours: number;
  type: 'sightseeing' | 'adventure' | 'temple' | 'viewpoint' | 'waterfall' | 'heritage' | 'beach' | 'food' | 'wildlife' | 'culture';
  isFree?: boolean;
}

export interface Destination {
  id: string;
  name: string;
  nameKn: string;
  tagline: string;
  taglineKn: string;
  category: DestinationCategory[];
  description: string;
  descriptionKn: string;
  bestTime: string;
  approxBudgetPerDay: number;
  image: string;
  lat: number;
  lng: number;
  district: string;
  topAttractions: Attraction[];
  localFoodSpecialities: string[];
  kannadaCultureTip: string;
}

export interface Activity {
  id: string;
  time: string;
  title: string;
  titleKn?: string;
  place: string;
  placeKn?: string;
  description: string;
  descriptionKn?: string;
  estimatedCost: number;
  travelDistanceKm?: number;
  durationHours: number;
  lat?: number;
  lng?: number;
  type: 'travel' | 'attraction' | 'food' | 'hotel' | 'leisure';
  isFree?: boolean;
  category?: string;
}

export interface DayPlan {
  dayNumber: number;
  date?: string;
  dateKn?: string;
  title: string;
  titleKn?: string;
  fromLocation: string;
  toLocation: string;
  estimatedDayCost: number;
  activities: Activity[];
  summaryNotes?: string;
}

export interface BudgetBreakdown {
  transportation: number;
  accommodation: number;
  food: number;
  activities: number;
  miscellaneous: number;
  totalEstimatedCost: number;
  userBudget: number;
  remaining: number;
  isOverBudget: boolean;
  overBudgetAmount: number;
  feasibilityLevel: 'feasible' | 'tight' | 'unrealistic';
  recommendations: string[];
}

export interface TripItinerary {
  id: string;
  title: string;
  titleKn: string;
  tagline?: string;
  summary: string;
  summaryKn?: string;
  durationDays: number;
  startDate?: string;
  formattedDateRange?: string;
  formattedDateRangeKn?: string;
  userBudget: number;
  travellersCount: number;
  startingLocation: string;
  startingLocationKn?: string;
  travelStyle: TravelStyle;
  travelMode: TravelMode;
  interests: string[];
  destinations: string[];
  days: DayPlan[];
  budget: BudgetBreakdown;
  createdAt: string;
  isOptimized?: boolean;
}

export interface WeatherInfo {
  destination: string;
  tempC: number;
  condition: string;
  conditionIcon: string;
  rainChancePercent: number;
  advisory: string;
  advisoryKn: string;
}

export interface KannadaPhrase {
  id: string;
  english: string;
  kannada: string;
  pronunciation: string;
  meaning: string;
  category: 'greetings' | 'direction' | 'food' | 'shopping' | 'emergency' | 'general';
}

export interface NaturalLanguageExtraction {
  budget?: number;
  durationDays?: number;
  startDate?: string;
  startingLocation?: string;
  interests?: string[];
  travelStyle?: TravelStyle;
  travellersCount?: number;
  travelMode?: TravelMode;
  destinationsMentioned?: string[];
  rawQuery: string;
}
