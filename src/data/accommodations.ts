import { TravelMode, TravelStyle } from '../types/travel';

export interface HotelInfo {
  name: string;
  nameKn: string;
  tierLabel: string;
  tierLabelKn: string;
  roomType: string;
  costPerNight: number;
  description: string;
  descriptionKn: string;
  amenities: string[];
}

export interface TransitInfo {
  title: string;
  titleKn: string;
  vehicle: string;
  vehicleKn: string;
  departureDesc: string;
  departureDescKn: string;
  localSightseeingDesc: string;
  localSightseeingDescKn: string;
  returnDesc: string;
  returnDescKn: string;
  costPerDayPerPerson: number;
}

export const HOTEL_CATALOG: Record<string, Record<TravelStyle, HotelInfo>> = {
  bengaluru: {
    premium: {
      name: 'The Leela Palace Bengaluru (5-Star Luxury)',
      nameKn: 'ದ ಲೀಲಾ ಪ್ಯಾಲೇಸ್ ಬೆಂಗಳೂರು (೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ)',
      tierLabel: '5-Star Luxury Hotel',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ಹೋಟೆಲ್',
      roomType: 'Royal Premier Room with Butler Service',
      costPerNight: 9500,
      description: 'Opulent Vijayanagara architectural grandeur, lush royal gardens, private balconies, fine-dining courtyards, and signature spa.',
      descriptionKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ವಾಸ್ತುಶಿಲ್ಪ ವೈಭವ, ಸುಂದರ ಉದ್ಯಾನ ಮತ್ತು ಐಷಾರಾಮಿ ಕೊಠಡಿಗಳು.',
      amenities: ['24/7 Butler', 'Temperature-controlled Pool', 'Spa', 'Fine-dining Courts', 'Complimentary Champagne']
    },
    standard: {
      name: 'Lemon Tree Premier / Chancery Pavilion (4-Star Comfort)',
      nameKn: 'ಲೆಮನ್ ಟ್ರೀ ಪ್ರೀಮಿಯರ್ (೪-ಸ್ಟಾರ್ ಹೋಟೆಲ್)',
      tierLabel: '4-Star Comfort Hotel',
      tierLabelKn: '೪-ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Executive Deluxe AC King Room',
      costPerNight: 2400,
      description: 'Prime central location, contemporary plush furnishings, rooftop pool, fitness centre, and extensive buffet breakfast.',
      descriptionKn: 'ನಗರದ ಕೇಂದ್ರ ಭಾಗ, ಸುಸಜ್ಜಿತ ಎಸಿ ಕೊಠಡಿಗಳು, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಮತ್ತು ಬಫೆ ಉಪಾಹಾರ.',
      amenities: ['Free WiFi', 'Buffet Breakfast', 'Swimming Pool', 'Fitness Centre']
    },
    budget: {
      name: 'Zostel Bangalore / Hotel Kamat Yatri Nivas (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಬೆಂಗಳೂರು / ಕಾಮತ್ ಯಾತ್ರಿ ನಿವಾಸ್',
      tierLabel: 'Certified Budget Hostel / Lodge',
      tierLabelKn: 'ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್ / ಯಾತ್ರಿ ನಿವಾಸ್',
      roomType: 'Clean AC Backpackers Dorm Bed / Economy Room',
      costPerNight: 650,
      description: 'High-speed WiFi, clean shared spaces, hot shower facilities, cozy reading corners, and energetic traveler community.',
      descriptionKn: 'ಸ್ವಚ್ಛವಾದ ಕೊಠಡಿ, ಬಿಸಿನೀರಿನ ವ್ಯವಸ್ಥೆ, ವೈಫೈ ಮತ್ತು ಕೈಗೆಟುಕುವ ದರ.',
      amenities: ['High-speed WiFi', 'Hot Showers', 'Locker', '24/7 Front Desk']
    }
  },
  mysuru: {
    premium: {
      name: 'Lalitha Mahal Palace Hotel / Radisson Blu Plaza (5-Star Luxury Heritage)',
      nameKn: 'ಲಲಿತ ಮಹಲ್ ಪ್ಯಾಲೇಸ್ ಹೋಟೆಲ್ / ರ್ಯಾಡಿಸನ್ ಬ್ಲೂ (೫-ಸ್ಟಾರ್)',
      tierLabel: '5-Star Royal Palace Hotel',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಅರಮನೆ ಹೋಟೆಲ್',
      roomType: 'Heritage Royal Suite with Chamundi Hill Vista',
      costPerNight: 8500,
      description: 'Pure white Italian marble palace commissioned by the Maharaja of Mysore, crystal chandeliers, royal banquet halls, and regal lawns.',
      descriptionKn: 'ಮೈಸೂರು ಮಹಾರಾಜರ ಐತಿಹಾಸಿಕ ಅಮೃತಶಿಲೆಯ ಅರಮನೆ, ಭವ್ಯ ಝುಮ್ಮರ್‌ಗಳು ಮತ್ತು ರಾಜಾತಿಥ್ಯ.',
      amenities: ['Palace Grounds Walk', 'Tennis Court', 'Ayurvedic Spa', 'Bespoke Royal Dining']
    },
    standard: {
      name: 'Hotel Southern Star / Fortune JP Palace (3-4 Star Comfort)',
      nameKn: 'ಹೋಟೆಲ್ ಸದರ್ನ್ ಸ್ಟಾರ್ / ಫಾರ್ಚೂನ್ ಜೆಪಿ ಪ್ಯಾಲೇಸ್ (೩-೪ ಸ್ಟಾರ್)',
      tierLabel: '3-4 Star Comfort Hotel',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Deluxe Superior AC Room',
      costPerNight: 2200,
      description: 'Sprawling hotel near Mysore Palace with manicured gardens, swimming pool, cozy cocktail lounge, and multi-cuisine dining.',
      descriptionKn: 'ಅರಮನೆಯ ಸಮೀಪವಿರುವ ಸುಂದರ ಹೋಟೆಲ್, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಮತ್ತು ರುಚಿಕರ ಊಟ.',
      amenities: ['Swimming Pool', 'Free Breakfast', 'Free Parking', 'Travel Desk']
    },
    budget: {
      name: 'Zostel Mysore / Roambay Heritage Hostel (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಮೈಸೂರು / ರೋಂಬೇ ಹೆರಿಟೇಜ್ ಹಾಸ್ಟೆಲ್',
      tierLabel: 'Certified Budget Hostel',
      tierLabelKn: 'ಬಜೆಟ್ ಹೆರಿಟೇಜ್ ಹಾಸ್ಟೆಲ್',
      roomType: 'Clean AC Dorm Bed / Standard Economy Room',
      costPerNight: 550,
      description: 'Charming colonial-era bungalow, rooftop social cafe, bicycle rentals, minutes away from Mysore Palace and Mylari Dosa.',
      descriptionKn: 'ಹಳೆಯ ಕಾಲದ ಸುಂದರ ಬಂಗಲೆ, ಸೈಕಲ್ ಬಾಡಿಗೆ, ಮತ್ತು ಕೈಗೆಟುಕುವ ದರದ ಸ್ವಚ್ಛ ವಾಸ್ತವ್ಯ.',
      amenities: ['Bicycle Rental', 'Community Lounge', 'Free High-speed WiFi', 'Hot Water']
    }
  },
  coorg: {
    premium: {
      name: 'The Tamara Coorg / Evolve Back Kuruba Safari Lodge (5-Star Luxury Nature Resort)',
      nameKn: 'ದ ತಮಾರಾ ಕೊಡಗು / ಇವಾಲ್ವ್ ಬ್ಯಾಕ್ (೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್)',
      tierLabel: '5-Star Luxury Nature Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ಪ್ರಕೃತಿ ರೆಸಾರ್ಟ್',
      roomType: 'Luxury Wooden Villa with Private Jacuzzi / Plunge Pool',
      costPerNight: 12000,
      description: 'Perched amidst 180 acres of organic coffee and cardamom plantations, waterfalls, yoga pavilions, and award-winning spa.',
      descriptionKn: 'ಕಾಫಿ ತೋಟಗಳ ನಡುವೆ ಇರುವ ಭವ್ಯ ಐಷಾರಾಮಿ ಕಾಟೇಜ್, ಖಾಸಗಿ ಜಕೂಝಿ ಮತ್ತು ಸ್ಪಾ.',
      amenities: ['Private Jacuzzi', 'Plantation Trail with Naturalist', 'Signature Spa', 'Infinity Pool']
    },
    standard: {
      name: 'Coorg Cliff Resort / Heritage Coffee Homestay (Comfort Stay)',
      nameKn: 'ಕೊಡಗು ಕ್ಲಿಫ್ ರೆಸಾರ್ಟ್ / ಹೆರಿಟೇಜ್ ಕಾಫಿ ಹೋಂಸ್ಟೇ',
      tierLabel: '3-Star Plantation Comfort Stay',
      tierLabelKn: '೩-ಸ್ಟಾರ್ ಪ್ಲಾಂಟೇಶನ್ ಹೋಂಸ್ಟೇ',
      roomType: 'Valley View Deluxe Cottage Room',
      costPerNight: 2800,
      description: 'Dramatic cliff views, night campfires, authentic Kodava cuisine, and personal guided coffee estate tours.',
      descriptionKn: 'ಕಣಿವೆಯ ಸುಂದರ ನೋಟ, ಕ್ಯಾಂಪ್‌ಫೈರ್ ಮತ್ತು ಸಾಂಪ್ರದಾಯಿಕ ಕೊಡವ ಊಟ.',
      amenities: ['Campfire', 'Estate Walking Tour', 'Home-cooked Meals', 'Mountain Views']
    },
    budget: {
      name: 'Zostel Coorg / Backpackers Den Madikeri (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಕೊಡಗು / ಮಡಿಕೇರಿ ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್',
      tierLabel: 'Certified Budget Hostel / Dorm',
      tierLabelKn: 'ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್ & ಡಾರ್ಮಿಟರಿ',
      roomType: 'Cozy Mixed AC Dorm Bed / Basic Room',
      costPerNight: 650,
      description: 'Nestled under tall silver oak and coffee bushes, common lounge, board games, and budget travel assistance.',
      descriptionKn: 'ಕಾಫಿ ಮರಗಳ ನೆರಳಿನಲ್ಲಿರುವ ಯುವಜನರ ಬಜೆಟ್ ವಾಸ್ತವ್ಯ, ವೈಫೈ ಮತ್ತು ಬಿಸಿನೀರು.',
      amenities: ['Bonfire', 'Common Room', 'Luggage Storage', 'Free WiFi']
    }
  },
  chikmagalur: {
    premium: {
      name: 'The Serai Chikmagalur (5-Star Luxury Private Pool Villa)',
      nameKn: 'ದ ಸೆರಾಯ್ ಚಿಕ್ಕಮಗಳೂರು (೫-ಸ್ಟಾರ್ ಪ್ರೈವೇಟ್ ಪೂಲ್ ವಿಲ್ಲಾ)',
      tierLabel: '5-Star Luxury Pool Villa Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ಪೂಲ್ ವಿಲ್ಲಾ ರೆಸಾರ್ಟ್',
      roomType: 'Estate Terrace Villa with Private Plunge Pool',
      costPerNight: 11000,
      description: 'Enveloped in coffee country, glass-walled luxury villas, private plunge pools, gourmet bean-to-cup cuisine, and Oma spa therapies.',
      descriptionKn: 'ಕಾಫಿ ಎಸ್ಟೇಟ್‌ನ ಮಧ್ಯೆ ಇರುವ ಐಷಾರಾಮಿ ವಿಲ್ಲಾ, ಖಾಸಗಿ ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಮತ್ತು ಮಸಾಜ್ ಸ್ಪಾ.',
      amenities: ['Private Pool', 'Bean-to-cup Coffee Experience', 'Luxury Spa', 'Estate Cycling']
    },
    standard: {
      name: 'Gateway Chikmagalur - IHCL SeleQtions / Planters Court (3-4 Star Comfort)',
      nameKn: 'ಗೇಟ್‌ವೇ ಚಿಕ್ಕಮಗಳೂರು (೩-೪ ಸ್ಟಾರ್ ಹೋಟೆಲ್)',
      tierLabel: '3-4 Star Comfort Hotel',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Superior Cottage Garden Room',
      costPerNight: 2600,
      description: 'Colonial plantation aesthetic, mountain viewpoints, outdoor pool, and authentic Malnad vegetarian & non-veg fare.',
      descriptionKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ನೋಟ, ಸುಂದರ ಈಜುಕೊಳ ಮತ್ತು ಮಲೆನಾಡಿನ ಊಟ.',
      amenities: ['Swimming Pool', 'Garden Walk', 'Restaurant & Bar', 'Free WiFi']
    },
    budget: {
      name: 'Zostel Homes Chikmagalur / Nature Nest Backpacker Stay',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಹೋಮ್ಸ್ ಚಿಕ್ಕಮಗಳೂರು / ನೇಚರ್ ನೆಸ್ಟ್',
      tierLabel: 'Certified Budget Homestay / Dorm',
      tierLabelKn: 'ಬಜೆಟ್ ಹೋಂಸ್ಟೇ & ಡಾರ್ಮ್',
      roomType: 'Clean AC Dorm Bed / Economy Room',
      costPerNight: 600,
      description: 'Peaceful plantation setting, hot showers, campfire area, and local trekking advice for Mullayanagiri and Hebbe falls.',
      descriptionKn: 'ಶಾಂತ ಪರಿಸರ, ಮುಳ್ಳಯ್ಯನಗಿರಿ ಚಾರಣಕ್ಕೆ ಮಾಹಿತಿ ಮತ್ತು ಬಜೆಟ್ ವಾಸ್ತವ್ಯ.',
      amenities: ['Campfire', 'Hot Water', 'Trek Guidance', 'Free WiFi']
    }
  },
  hampi: {
    premium: {
      name: 'Evolve Back Kamalapura Palace Hampi (5-Star Luxury Fort Palace)',
      nameKn: 'ಇವಾಲ್ವ್ ಬ್ಯಾಕ್ ಕಮಲಾಪುರ ಪ್ಯಾಲೇಸ್ ಹಂಪಿ (೫-ಸ್ಟಾರ್ ಅರಮನೆ)',
      tierLabel: '5-Star Royal Fort Palace Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ರಾಯಲ್ ಪ್ಯಾಲೇಸ್ ರೆಸಾರ್ಟ್',
      roomType: 'Nivasa Luxury Suite with Private Jacuzzi',
      costPerNight: 14000,
      description: 'Inspired by the 14th-century Vijayanagara empire, stone ramparts, royal palace arches, Olympic-sized swimming pool, and heritage walks.',
      descriptionKn: 'ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಶೈಲಿಯಲ್ಲಿ ನಿರ್ಮಿಸಲಾದ ಭವ್ಯ ಕೋಟೆ ಅರಮನೆ, ಖಾಸಗಿ ಜಕೂಝಿ ಮತ್ತು ರಾಜ ವೈಭವ.',
      amenities: ['Private Jacuzzi', 'Historian-guided Tour', 'Olympic Pool', 'Royal Dining']
    },
    standard: {
      name: 'Heritage Resort Hampi / Clarks Inn Hampi (3-4 Star Comfort)',
      nameKn: 'ಹೆರಿಟೇಜ್ ರೆಸಾರ್ಟ್ ಹಂಪಿ / ಕ್ಲಾರ್ಕ್ಸ್ ಇನ್ (೩-೪ ಸ್ಟಾರ್)',
      tierLabel: '3-4 Star Heritage Comfort',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಹೆರಿಟೇಜ್ ರೆಸಾರ್ಟ್',
      roomType: 'Deluxe AC Villa Room',
      costPerNight: 2400,
      description: 'Traditional terracotta roof cottages, swimming pool, organic farm, and located right next to the UNESCO monument trails.',
      descriptionKn: 'ಸಾಂಪ್ರದಾಯಿಕ ವಿಲ್ಲಾ, ಸ್ವಿಮ್ಮಿಂಗ್ ಪೂಲ್ ಮತ್ತು ಹಂಪಿಯ ಸ್ಮಾರಕಗಳ ಸಮೀಪವಿರುವ ತಾಣ.',
      amenities: ['Swimming Pool', 'Organic Garden', 'AC Restaurant', 'Travel Desk']
    },
    budget: {
      name: 'Zostel Hampi / Mowgli River Guesthouse (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಹಂಪಿ / ಮೌಗ್ಲಿ ರಿವರ್ ಗೆಸ್ಟ್‌ಹೌಸ್',
      tierLabel: 'Certified Budget Guesthouse / Dorm',
      tierLabelKn: 'ಬಜೆಟ್ ಗೆಸ್ಟ್‌ಹೌಸ್ & ಡಾರ್ಮಿಟರಿ',
      roomType: 'Riverside Backpacker Dorm Bed / Budget Hut',
      costPerNight: 500,
      description: 'Picturesque views of Tungabhadra boulder hills, open-air hammocks, bicycle rentals, and relaxed traveller community.',
      descriptionKn: 'ನದಿಯ ಸುಂದರ ನೋಟ, ಹ್ಯಾಮಾಕ್‌ಗಳು, ಸೈಕಲ್ ಬಾಡಿಗೆ ಮತ್ತು ಬಜೆಟ್ ಸ್ನೇಹಿ ಕೊಠಡಿಗಳು.',
      amenities: ['Bicycle Rental', 'Hammocks', 'Cafe', 'Free WiFi']
    }
  },
  gokarna: {
    premium: {
      name: 'SwaSwara - CGH Earth / Kahani Paradise (5-Star Luxury Wellness Resort)',
      nameKn: 'ಸ್ವಸ್ವರ - ಸಿಜಿಎಚ್ ಅರ್ತ್ (೫-ಸ್ಟಾರ್ ವೆಲ್‌ನೆಸ್ ರೆಸಾರ್ಟ್)',
      tierLabel: '5-Star Luxury Wellness Sanctuary',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ವೆಲ್‌ನೆಸ್ ರೆಸಾರ್ಟ್',
      roomType: 'Konkan Private Villa with Open Courtyard & Plunge Pool',
      costPerNight: 11500,
      description: 'Cliffside paradise overlooking Om Beach, meditation yoga domes, ocean-view Ayurvedic wellness, and gourmet organic dining.',
      descriptionKn: 'ಓಂ ಬೀಚ್ ಕಡಿದಾದ ಬೆಟ್ಟದ ಮೇಲಿರುವ ಐಷಾರಾಮಿ ವಿಲ್ಲಾ, ಆಯುರ್ವೇದ ಮಸಾಜ್ ಮತ್ತು ಯೋಗ ತಾಣ.',
      amenities: ['Private Yoga Instructor', 'Ayurvedic Spa', 'Beach Cliff Walk', 'Organic Dining']
    },
    standard: {
      name: 'Kudle Beach View Resort & Spa / Stone Wood Nature Resort (3-Star Comfort)',
      nameKn: 'ಕುಡ್ಲೆ ಬೀಚ್ ವ್ಯೂ ರೆಸಾರ್ಟ್ & ಸ್ಪಾ (೩-ಸ್ಟಾರ್)',
      tierLabel: '3-Star Beachfront Comfort',
      tierLabelKn: '೩-ಸ್ಟಾರ್ ಬೀಚ್ ರೆಸಾರ್ಟ್',
      roomType: 'Sea View Deluxe AC Cottage',
      costPerNight: 2300,
      description: 'Steps away from golden sands of Kudle beach, outdoor pool, sea breeze restaurant, and Ayurvedic massage centre.',
      descriptionKn: 'ಕುಡ್ಲೆ ಕಡಲತೀರದ ಬಳಿಯಿರುವ ಸುಂದರ ಕಾಟೇಜ್, ಈಜುಕೊಳ ಮತ್ತು ಸಮುದ್ರ ಆಹಾರ.',
      amenities: ['Beach Access', 'Swimming Pool', 'Seaside Restaurant', 'Spa']
    },
    budget: {
      name: 'Zostel Gokarna / Namaste Cafe Beach Stay (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಗೋಕರ್ಣ / ನಮಸ್ತೆ ಕೆಫೆ ಬಜೆಟ್ ಸ್ಟೇ',
      tierLabel: 'Certified Beachfront Budget Stay',
      tierLabelKn: 'ಬಜೆಟ್ ಬೀಚ್ ಹಾಸ್ಟೆಲ್',
      roomType: 'Cliffside AC Dorm Bed / Backpacker Shack',
      costPerNight: 550,
      description: 'Perched on the cliff overlooking Gokarna Main Beach, chillout terrace, beach volleyball, and trek info.',
      descriptionKn: 'ಸಮುದ್ರದ ಅದ್ಭುತ ನೋಟ ನೀಡುವ ಕ್ಲಿಫ್ ಹಾಸ್ಟೆಲ್, ವೈಫೈ ಮತ್ತು ಕಡಿಮೆ ಖರ್ಚಿನ ವಸತಿ.',
      amenities: ['Cliffside Sunset Deck', 'Locker', 'Free WiFi', 'Beach Trail Access']
    }
  },
  shivamogga: {
    premium: {
      name: 'Royal Orchid Central / Kimmane Golf Resort (5-Star Luxury)',
      nameKn: 'ರಾಯಲ್ ಆರ್ಕಿಡ್ ಸೆಂಟ್ರಲ್ / ಕಿಮ್ಮಾನೆ ಗಾಲ್ಫ್ ರೆಸಾರ್ಟ್ (೫-ಸ್ಟಾರ್)',
      tierLabel: '5-Star Luxury Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್',
      roomType: 'Golf View Luxury Suite',
      costPerNight: 7500,
      description: 'Lush 9-hole golf course nestled in Western Ghats foothills, fine dining restaurant, infinity pool, and wellness spa.',
      descriptionKn: 'ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ತಪ್ಪಲಿನಲ್ಲಿರುವ ಗಾಲ್ಫ್ ರೆಸಾರ್ಟ್, ಈಜುಕೊಳ ಮತ್ತು ಪಂಚತಾರಾ ಆತಿಥ್ಯ.',
      amenities: ['Golf Course', 'Infinity Pool', 'Spa', 'Multi-cuisine Dining']
    },
    standard: {
      name: 'Hotel Jewel Rock / Green View Clarks Inn (3-4 Star Comfort)',
      nameKn: 'ಹೋಟೆಲ್ ಜ್ಯುವೆಲ್ ರಾಕ್ / ಗ್ರೀನ್ ವ್ಯೂ ಕ್ಲಾರ್ಕ್ಸ್ ಇನ್ (೩-೪ ಸ್ಟಾರ್)',
      tierLabel: '3-4 Star Comfort Hotel',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Executive Deluxe AC Room',
      costPerNight: 2100,
      description: 'Prime central location in Shivamogga, clean AC rooms, vegetarian and multi-cuisine restaurant, and travel desk for Jog Falls.',
      descriptionKn: 'ಶಿವಮೊಗ್ಗದ ಕೇಂದ್ರ ಭಾಗ, ಸುಸಜ್ಜಿತ ಎಸಿ ಕೊಠಡಿಗಳು ಮತ್ತು ಜೋಗ ಜಲಪಾತಕ್ಕೆ ಪ್ರವಾಸ ಮಾಹಿತಿ.',
      amenities: ['Free WiFi', 'AC Restaurant', 'Travel Desk', 'Room Service']
    },
    budget: {
      name: 'Navaratna Deluxe Lodge / Sharavathi River Lodge (Budget Stay)',
      nameKn: 'ನವರತ್ನ ಡಿಲಕ್ಸ್ ಲಾಡ್ಜ್ / ಶರಾವತಿ ರಿವರ್ ಲಾಡ್ಜ್',
      tierLabel: 'Certified Budget Lodge',
      tierLabelKn: 'ಬಜೆಟ್ ಲಾಡ್ಜ್',
      roomType: 'Clean Non-AC / Economy AC Room',
      costPerNight: 550,
      description: 'Close to Shivamogga KSRTC bus stand and railway station, clean beds, hot water, and helpful staff for local waterfall routes.',
      descriptionKn: 'ಬಸ್ ನಿಲ್ದಾಣದ ಸಮೀಪ, ಬಿಸಿನೀರು, ಸ್ವಚ್ಛ ಹಾಸಿಗೆ ಮತ್ತು ಕಡಿಮೆ ದರದ ವಾಸ್ತವ್ಯ.',
      amenities: ['Hot Water', '24/7 Desk', 'Near KSRTC Stand', 'Free Parking']
    }
  },
  udupi: {
    premium: {
      name: 'Country Inn & Suites by Radisson / Paradise Isle Beach Resort (5-Star Luxury)',
      nameKn: 'ಕಂಟ್ರಿ ಇನ್ ಬೈ ರ್ಯಾಡಿಸನ್ / ಪ್ಯಾರಡೈಸ್ ಐಲ್ ಬೀಚ್ ರೆಸಾರ್ಟ್ (೫-ಸ್ಟಾರ್)',
      tierLabel: '5-Star Beach & Wellness Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಬೀಚ್ ರೆಸಾರ್ಟ್',
      roomType: 'Arabian Sea Beachfront Suite with Private Balcony',
      costPerNight: 8000,
      description: 'Located directly on Malpe beach sand, seaside swimming pool, fresh coastal seafood grills, and Ayurvedic spa.',
      descriptionKn: 'ಮಲ್ಪೆ ಕಡಲತೀರದ ಮೇಲಿರುವ ಐಷಾರಾಮಿ ಬೀಚ್ ರೆಸಾರ್ಟ್, ಸಮುದ್ರ ವೀಕ್ಷಣೆ ಮತ್ತು ಸ್ಪಾ.',
      amenities: ['Beachfront Access', 'Outdoor Pool', 'Ayurvedic Spa', 'Seafood Grill']
    },
    standard: {
      name: 'Fortune Inn Valley View / Hotel Kediyoor (3-4 Star Comfort)',
      nameKn: 'ಫಾರ್ಚೂನ್ ಇನ್ ವ್ಯಾಲಿ ವ್ಯೂ / ಹೋಟೆಲ್ ಕೆದಿಯೂರು (೩-೪ ಸ್ಟಾರ್)',
      tierLabel: '3-4 Star Comfort Hotel',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Deluxe AC Double Room',
      costPerNight: 2300,
      description: 'Contemporary comfort near Sri Krishna Matha, authentic South Indian vegetarian dining, and coastal tour assistance.',
      descriptionKn: 'ಶ್ರೀ ಕೃಷ್ಣ ಮಠದ ಸಮೀಪವಿರುವ ಸುಸಜ್ಜಿತ ಹೋಟೆಲ್, ರುಚಿಕರ ಸಾತ್ವಿಕ ಊಟ ಮತ್ತು ಈಜುಕೊಳ.',
      amenities: ['Free Breakfast', 'Swimming Pool', 'Pure Veg Restaurant', 'Free WiFi']
    },
    budget: {
      name: 'Zostel Udupi / Manipal Backpacker Dorms (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಉಡುಪಿ / ಮಣಿಪಾಲ್ ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್',
      tierLabel: 'Certified Budget Hostel / Dorm',
      tierLabelKn: 'ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್ & ಡಾರ್ಮ್',
      roomType: 'Clean AC Mixed Dorm Bed / Economy Room',
      costPerNight: 550,
      description: 'Youthful backpacker vibe, bicycle rentals to Malpe beach, vibrant common lounge, and student budget cafe.',
      descriptionKn: 'ಮಲ್ಪೆ ಬೀಚ್‌ಗೆ ಸೈಕಲ್ ಬಾಡಿಗೆ, ವೈಫೈ, ಮತ್ತು ಯುವ ಪ್ರವಾಸಿಗರ ಸ್ನೇಹಿ ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್.',
      amenities: ['Bicycle Rental', 'Common Room', 'High-speed WiFi', 'Lockers']
    }
  },
  mangaluru: {
    premium: {
      name: 'Vivanta Mangalore Old Port Road - Taj / The Gateway Hotel (5-Star Luxury)',
      nameKn: 'ವಿವಾಂತ ಮಂಗಳೂರು (ತಾಜ್) (೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ)',
      tierLabel: '5-Star Luxury Hotel',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ಹೋಟೆಲ್',
      roomType: 'Port View Luxury Suite',
      costPerNight: 8500,
      description: 'Legendary Taj hospitality overlooking Gurupura river and Arabian sea, Cardamom multi-cuisine restaurant, and outdoor pool.',
      descriptionKn: 'ತಾಜ್ ಸಮೂಹದ ಐಷಾರಾಮಿ ಹೋಟೆಲ್, ನದಿಯ ಸುಂದರ ನೋಟ ಮತ್ತು ವಿಶ್ವದರ್ಜೆಯ ಸೇವೆ.',
      amenities: ['Outdoor Pool', 'Fitness Centre', 'Taj Signature Dining', 'River View']
    },
    standard: {
      name: 'The Ocean Pearl Mangalore / Hotel Deepa Comforts (3-4 Star Comfort)',
      nameKn: 'ದ ಓಷಿಯನ್ ಪರ್ಲ್ ಮಂಗಳೂರು (೩-೪ ಸ್ಟಾರ್)',
      tierLabel: '3-4 Star Comfort Hotel',
      tierLabelKn: '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Executive Deluxe AC Room',
      costPerNight: 2400,
      description: 'Renowned for hospitality and coastal seafood delicacy Sagar Ratna, plush AC rooms, and central city location.',
      descriptionKn: 'ಮಂಗಳೂರಿನ ಹೃದಯ ಭಾಗ, ಅತ್ಯುತ್ತಮ ಸಮುದ್ರ ಆಹಾರ ಮತ್ತು ಆರಾಮದಾಯಕ ಕೊಠಡಿಗಳು.',
      amenities: ['Famous Coastal Dining', 'Buffet Breakfast', 'Valet Parking', 'Free WiFi']
    },
    budget: {
      name: 'Zostel Mangalore / Hotel Roopa Central (Budget Stay)',
      nameKn: 'ಜೋಸ್ಟೆಲ್ ಮಂಗಳೂರು / ಹೋಟೆಲ್ ರೂಪಾ ಬಜೆಟ್ ಸ್ಟೇ',
      tierLabel: 'Certified Budget Stay',
      tierLabelKn: 'ಬಜೆಟ್ ಹೋಟೆಲ್ & ಡಾರ್ಮ್',
      roomType: 'Clean AC Dorm Bed / Standard Room',
      costPerNight: 550,
      description: 'Budget-friendly base near Mangaluru Central station, quick access to Tannirbhavi ferry and local ghee roast restaurants.',
      descriptionKn: 'ರೈಲ್ವೆ ನಿಲ್ದಾಣದ ಸಮೀಪವಿರುವ ಬಜೆಟ್ ಕೊಠಡಿಗಳು ಮತ್ತು ಶುಚಿತ್ವ.',
      amenities: ['Free WiFi', 'Near Central Station', 'Hot Water', 'Travel Info']
    }
  },
  badami: {
    premium: {
      name: 'The Heritage Resort Badami (Luxury Stone Cottage)',
      nameKn: 'ದ ಹೆರಿಟೇಜ್ ರೆಸಾರ್ಟ್ ಬಾದಾಮಿ (ಐಷಾರಾಮಿ ಕಾಟೇಜ್)',
      tierLabel: 'Luxury Heritage Cottage Resort',
      tierLabelKn: 'ಐಷಾರಾಮಿ ಹೆರಿಟೇಜ್ ಕಾಟೇಜ್',
      roomType: 'Chalukya Heritage Stone Villa',
      costPerNight: 7000,
      description: 'Cottages built in native sandstone mimicking Chalukyan cave aesthetics, private gardens, swimming pool, and local folk evenings.',
      descriptionKn: 'ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಸುಂದರ ಕಾಟೇಜ್‌ಗಳು, ಈಜುಕೊಳ ಮತ್ತು ಚಾಲುಕ್ಯ ಶೈಲಿಯ ಪರಿಸರ.',
      amenities: ['Swimming Pool', 'Heritage Architecture', 'Garden', 'Folk Music']
    },
    standard: {
      name: 'Clarks Inn Badami / Badami Court (3-Star Comfort)',
      nameKn: 'ಕ್ಲಾರ್ಕ್ಸ್ ಇನ್ ಬಾದಾಮಿ / ಬಾದಾಮಿ ಕೋರ್ಟ್ (೩-ಸ್ಟಾರ್)',
      tierLabel: '3-Star Heritage Comfort',
      tierLabelKn: '೩-ಸ್ಟಾರ್ ಹೆರಿಟೇಜ್ ಹೋಟೆಲ್',
      roomType: 'Deluxe AC Room',
      costPerNight: 2200,
      description: 'Short walk to Badami Cave Temples, landscaped gardens, outdoor pool, and North Karnataka Jolada Rotti dining.',
      descriptionKn: 'ಬಾದಾಮಿ ಗುಹೆಗಳ ಸಮೀಪ, ಈಜುಕೊಳ ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕದ ಜೋಳದ ರೊಟ್ಟಿ ಊಟ.',
      amenities: ['Outdoor Pool', 'Near Cave Temples', 'Restaurant', 'Free Parking']
    },
    budget: {
      name: 'Hotel Mayura Chalukya Badami (KSTDC Budget Stay)',
      nameKn: 'ಹೋಟೆಲ್ ಮಯೂರ ಚಾಲುಕ್ಯ ಬಾದಾಮಿ (ಕೆಎಸ್‌ಟಿಡಿಸಿ)',
      tierLabel: 'Certified Government Heritage Lodge',
      tierLabelKn: 'ಕೆಎಸ್‌ಟಿಡಿಸಿ ಬಜೆಟ್ ಲಾಡ್ಜ್',
      roomType: 'Clean Economy AC/Non-AC Room',
      costPerNight: 600,
      description: 'Peaceful government-certified tourist home, spacious compound with peacocks, clean rooms, and honest local prices.',
      descriptionKn: 'ಶಾಂತ ವಾತಾವರಣ, ಸರ್ಕಾರಿ ಮಾನ್ಯತೆಯ ಸ್ವಚ್ಛ ಕೊಠಡಿಗಳು ಮತ್ತು ಕೈಗೆಟುಕುವ ದರ.',
      amenities: ['Spacious Grounds', 'In-house Restaurant', 'Travel Desk', 'Hot Water']
    }
  },
  bandipur: {
    premium: {
      name: 'The Serai Bandipur / Windflower Tusker Trails (5-Star Wildlife Resort)',
      nameKn: 'ದ ಸೆರಾಯ್ ಬಂಡೀಪುರ / ವಿಂಡ್‌ಫ್ಲವರ್ (೫-ಸ್ಟಾರ್ ವನ್ಯಜೀವಿ ರೆಸಾರ್ಟ್)',
      tierLabel: '5-Star Luxury Wildlife Safari Lodge',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ಸಫಾರಿ ಲಾಡ್ಜ್',
      roomType: 'Mountain View Log Hut Villa with Open Gazebo',
      costPerNight: 12500,
      description: 'Adjacent to Nilgiri biosphere reserve, open-to-sky gazebos overlooking watering holes, jungle safaris with expert naturalists, and luxury spa.',
      descriptionKn: 'ದಟ್ಟ ಅರಣ್ಯದ ಅಂಚಿನಲ್ಲಿರುವ ಐಷಾರಾಮಿ ಲಾಗ್ ಹಟ್, ನೈಸರ್ಗಿಕ ಸಫಾರಿ ಮತ್ತು ವನ್ಯಜೀವಿ ವೀಕ್ಷಣೆ.',
      amenities: ['Guided Wildlife Safari', 'Jungle Spa', 'Watchtower', 'Campfire Dinner']
    },
    standard: {
      name: 'Bandipur Safari Lodge (Jungle Lodges & Resorts - JLR Comfort)',
      nameKn: 'ಬಂಡೀಪುರ ಸಫಾರಿ ಲಾಡ್ಜ್ (ಜಂಗಲ್ ಲಾಡ್ಜಸ್)',
      tierLabel: 'Certified Wildlife Eco-Lodge',
      tierLabelKn: 'ವನ್ಯಜೀವಿ ಇಕೋ ಲಾಡ್ಜ್',
      roomType: 'Special Cottages with Forest Verandah',
      costPerNight: 3500,
      description: 'Managed by Karnataka eco-tourism, rustic forest cottages, safari jeep expeditions, and wildlife documentary screenings.',
      descriptionKn: 'ಕರ್ನಾಟಕ ಸರ್ಕಾರದ ಜಂಗಲ್ ಲಾಡ್ಜಸ್, ಜೀಪ್ ಸಫಾರಿ ಮತ್ತು ಕಾಡಿನ ಅನುಭವ.',
      amenities: ['Safari Included', 'Forest Campfire', 'Buffet Meals', 'Naturalist Guide']
    },
    budget: {
      name: 'MC Resort Bandipur / Forest Edge Backpacker Camp (Budget Stay)',
      nameKn: 'ಎಂಸಿ ರೆಸಾರ್ಟ್ ಬಂಡೀಪುರ / ಬಜೆಟ್ ಕ್ಯಾಂಪ್',
      tierLabel: 'Certified Wildlife Budget Stay',
      tierLabelKn: 'ಬಜೆಟ್ ವನ್ಯಜೀವಿ ಕ್ಯಾಂಪ್',
      roomType: 'Clean Standard Forest Room',
      costPerNight: 700,
      description: 'Affordable forest border stay, swimming pool, evening tribal dance, and assistance with government tiger safari tickets.',
      descriptionKn: 'ಕಾಡಿನ ಅಂಚಿನಲ್ಲಿ ಕಡಿಮೆ ಖರ್ಚಿನ ವಾಸ್ತವ್ಯ, ಈಜುಕೊಳ ಮತ್ತು ಸಫಾರಿ ಸಹಾಯ.',
      amenities: ['Swimming Pool', 'Bonfire', 'Safari Desk', 'Free WiFi']
    }
  },
  dandeli: {
    premium: {
      name: 'Bison River Resort / Kali Wilderness Camp (Luxury Riverfront Resort)',
      nameKn: 'ಬೈಸನ್ ರಿವರ್ ರೆಸಾರ್ಟ್ / ಕಾಳಿ ವೈಲ್ಡರ್‌ನೆಸ್ ಕ್ಯಾಂಪ್ (೫-ಸ್ಟಾರ್)',
      tierLabel: 'Luxury Riverfront Adventure Resort',
      tierLabelKn: 'ಐಷಾರಾಮಿ ನದಿ ತೀರದ ಸಾಹಸ ರೆಸಾರ್ಟ್',
      roomType: 'Kali River Facing Luxury Swiss Cottage',
      costPerNight: 8500,
      description: 'Private balconies hanging over the white-water Kali river, private rafting access, coracle rides, hornbill spotting, and riverside barbecue.',
      descriptionKn: 'ಕಾಳಿ ನದಿಯ ತೀರದಲ್ಲಿರುವ ಐಷಾರಾಮಿ ಕಾಟೇಜ್, ರಾಫ್ಟಿಂಗ್ ಸೌಲಭ್ಯ ಮತ್ತು ಪಕ್ಷಿ ವೀಕ್ಷಣೆ.',
      amenities: ['River Rafting Deck', 'Coracle Ride', 'Riverside Barbecue', 'Naturalist Guide']
    },
    standard: {
      name: 'Magenta Resort Dandeli / Whistling Woodzs (3-Star Comfort)',
      nameKn: 'ಮೆಜೆಂಟಾ ರೆಸಾರ್ಟ್ ದಾಂಡೇಲಿ / ವಿಸ್ಲಿಂಗ್ ವುಡ್ಸ್ (೩-ಸ್ಟಾರ್)',
      tierLabel: '3-Star Adventure Comfort Resort',
      tierLabelKn: '೩-ಸ್ಟಾರ್ ಸಾಹಸ ರೆಸಾರ್ಟ್',
      roomType: 'Jungle Lake AC Cottage',
      costPerNight: 2600,
      description: 'Surrounded by dense teak trees, swimming pool with rain dance, zip line, kayaking, and hearty buffet meals.',
      descriptionKn: 'ದಟ್ಟ ತೇಗದ ಕಾಡು, ಈಜುಕೊಳ, ಕಯಾಕಿಂಗ್ ಮತ್ತು ವಾಟರ್ ಸ್ಪೋರ್ಟ್ಸ್.',
      amenities: ['Swimming Pool', 'Kayaking', 'Zipline', 'Buffet Dining']
    },
    budget: {
      name: 'Dandeli Nature Camp / Backpacker River Tents (Budget Stay)',
      nameKn: 'ದಾಂಡೇಲಿ ನೇಚರ್ ಕ್ಯಾಂಪ್ / ಬಜೆಟ್ ಟೆಂಟ್ ಸ್ಟೇ',
      tierLabel: 'Certified Adventure Camp / Dorm',
      tierLabelKn: 'ಬಜೆಟ್ ಸಾಹಸ ಕ್ಯಾಂಪ್',
      roomType: 'Riverside Alpine Tent / Dorm Bed',
      costPerNight: 600,
      description: 'True jungle camping under the stars, shared clean washrooms, campfire, and budget water rafting packages.',
      descriptionKn: 'ನಕ್ಷತ್ರಗಳ ಅಡಿಯಲ್ಲಿ ಟೆಂಟ್ ವಾಸ್ತವ್ಯ, ಕ್ಯಾಂಪ್‌ಫೈರ್ ಮತ್ತು ಕಡಿಮೆ ದರದ ರಾಫ್ಟಿಂಗ್.',
      amenities: ['Campfire', 'Tent Camping', 'Rafting Package', 'Jungle Walk']
    }
  }
};

// Generic fallback hotel generator
export function getHotelForDestination(destName: string, style: TravelStyle): HotelInfo {
  const key = destName.toLowerCase();
  for (const [k, v] of Object.entries(HOTEL_CATALOG)) {
    if (key.includes(k)) return v[style];
  }

  // Fallbacks
  if (style === 'premium') {
    return {
      name: `Grand Palace & Luxury Resort ${destName} (5-Star Luxury)`,
      nameKn: `${destName} ೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್`,
      tierLabel: '5-Star Luxury Resort',
      tierLabelKn: '೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್',
      roomType: 'Luxury Suite with Panoramic Balcony View',
      costPerNight: 8500,
      description: 'Five-star world-class hospitality, fine dining, infinity pool, luxury spa, and personalized concierge.',
      descriptionKn: '೫-ಸ್ಟಾರ್ ದರ್ಜೆಯ ವಿಶ್ವವಿಖ್ಯಾತ ಆತಿಥ್ಯ, ಈಜುಕೊಳ ಮತ್ತು ಐಷಾರಾಮಿ ಕೊಠಡಿಗಳು.',
      amenities: ['Infinity Pool', '24/7 Room Service', 'Spa', 'Free Breakfast']
    };
  } else if (style === 'standard') {
    return {
      name: `Hotel Grand Comfort / Treebo Trend ${destName} (3-Star Comfort)`,
      nameKn: `${destName} ೩-ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್`,
      tierLabel: '3-Star Comfort Hotel',
      tierLabelKn: '೩-ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್',
      roomType: 'Deluxe AC Executive Room',
      costPerNight: 2200,
      description: 'Comfortable air-conditioned rooms, free high-speed WiFi, hot water, and delicious multi-cuisine breakfast.',
      descriptionKn: 'ಸುಸಜ್ಜಿತ ಎಸಿ ಕೊಠಡಿಗಳು, ಬಿಸಿನೀರು, ವೈಫೈ ಮತ್ತು ಉಪಾಹಾರ.',
      amenities: ['Free WiFi', 'AC', 'Complimentary Breakfast', 'Free Parking']
    };
  } else {
    return {
      name: `Zostel / Certified Budget Yatri Nivas ${destName}`,
      nameKn: `${destName} ಬಜೆಟ್ ಯಾತ್ರಿ ನಿವಾಸ್ / ಹಾಸ್ಟೆಲ್`,
      tierLabel: 'Certified Budget Lodge / Hostel',
      tierLabelKn: 'ಬಜೆಟ್ ಲಾಡ್ಜ್ / ಡಾರ್ಮಿಟರಿ',
      roomType: 'Clean AC Dorm Bed / Standard Economy Room',
      costPerNight: 550,
      description: 'Clean bed, hot water, safe storage locker, friendly travel host, and great value for budget travelers.',
      descriptionKn: 'ಸ್ವಚ್ಛವಾದ ಬೆಡ್, ಬಿಸಿನೀರು, ಸುರಕ್ಷಿತ ಲಾಕರ್ ಮತ್ತು ಕಡಿಮೆ ದರ.',
      amenities: ['Clean Linen', 'Hot Showers', 'Free WiFi', 'Locker']
    };
  }
}

// Transit template provider strictly matching travelMode
export function getTransitForMode(
  mode: TravelMode,
  style: TravelStyle,
  fromLoc: string,
  toLoc: string
): TransitInfo {
  // STRICT CAB / CAR
  if (mode === 'car') {
    const isLuxury = style === 'premium';
    const carName = isLuxury ? 'Private Luxury AC Innova Crysta / BMW Sedan' : 'Private AC Sedan Cab (Dzire / Etios)';
    return {
      title: `Private AC Cab Transfer: ${fromLoc} → ${toLoc}`,
      titleKn: `ಖಾಸಗಿ ಎಸಿ ಕ್ಯಾಬ್ ಪ್ರಯಾಣ: ${fromLoc} ನಿಂದ ${toLoc}`,
      vehicle: carName,
      vehicleKn: isLuxury ? 'ಖಾಸಗಿ ಐಷಾರಾಮಿ ಎಸಿ ಇನ್ನೋವಾ / ಸೆಡಾನ್ ಕ್ಯಾಬ್' : 'ಖಾಸಗಿ ಎಸಿ ಸೆಡಾನ್ ಕ್ಯಾಬ್',
      departureDesc: `Chauffeur arrives at your doorstep in a sanitized ${carName}. Private highway drive with optional stops for tender coconut and scenic photo spots.`,
      departureDescKn: `ನಿಮ್ಮ ಮನೆಯ ಬಳಿಯೇ ಖಾಸಗಿ ಎಸಿ ಕ್ಯಾಬ್ ಪಿಕಪ್. ದಾರಿಯಲ್ಲಿ ಫೋಟೋ ಮತ್ತು ಎಳನೀರು ನಿಲುಗಡೆಯೊಂದಿಗೆ ಆರಾಮದಾಯಕ ಪ್ರಯಾಣ.`,
      localSightseeingDesc: `Dedicated private AC Cab on standby throughout the day for seamless door-to-door sightseeing without waiting.`,
      localSightseeingDescKn: `ದಿನವಿಡೀ ನಿಮ್ಮೊಂದಿಗೆ ಇರುವ ಖಾಸಗಿ ಎಸಿ ಕ್ಯಾಬ್. ಸ್ಥಳದಿಂದ ಸ್ಥಳಕ್ಕೆ ಸುಲಭ ಪ್ರವಾಸ.`,
      returnDesc: `Comfortable private AC Cab drive back directly to your destination drop point with luggage assistance.`,
      returnDescKn: `ಖಾಸಗಿ ಎಸಿ ಕ್ಯಾಬ್ ಮೂಲಕ ನೇರವಾಗಿ ಮನೆಗೆ ಹಿಂದಿರುಗುವ ನೆಮ್ಮದಿಯ ಪ್ರಯಾಣ.`,
      costPerDayPerPerson: isLuxury ? 1200 : 650
    };
  }

  // STRICT BUS
  if (mode === 'bus') {
    let busName = 'KSRTC Karnataka Sarige Express Bus';
    let busCost = 240;
    if (style === 'premium') {
      busName = 'KSRTC Airavat Club Class Multi-Axle AC Sleeper Bus';
      busCost = 650;
    } else if (style === 'standard') {
      busName = 'KSRTC Rajahamsa Executive / Corona AC Bus';
      busCost = 420;
    }

    return {
      title: `${busName}: ${fromLoc} → ${toLoc}`,
      titleKn: `${busName}: ${fromLoc} ನಿಂದ ${toLoc}`,
      vehicle: busName,
      vehicleKn: busName,
      departureDesc: `Board scheduled ${busName} from the central KSRTC bus stand. Punctual, safe, and scenic journey across Karnataka highways.`,
      departureDescKn: `ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ ಬಸ್ ನಿಲ್ದಾಣದಿಂದ ಸಮಯಕ್ಕೆ ಸರಿಯಾಗಿ ಹೊರಡುವ ${busName} ಪ್ರಯಾಣ. ಸುರಕ್ಷಿತ ಮತ್ತು ಸುಲಭ.`,
      localSightseeingDesc: `Connecting city bus / local auto shuttle for visiting nearby sights and viewpoints.`,
      localSightseeingDescKn: `ಸ್ಥಳೀಯ ನಗರ ಸಾರಿಗೆ ಬಸ್ಸು ಅಥವಾ ಆಟೋ ಮೂಲಕ ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳ ವೀಕ್ಷಣೆ.`,
      returnDesc: `Return ${busName} journey back to central bus terminal. Punctual arrival.`,
      returnDescKn: `ಹಿಂತಿರುಗುವ ${busName} ಪ್ರಯಾಣ.`,
      costPerDayPerPerson: busCost
    };
  }

  // STRICT TRAIN
  if (mode === 'train') {
    let trainName = 'Chamundi / Tippu Express Train (Sleeper / 2S)';
    let trainCost = 180;
    if (style === 'premium') {
      trainName = 'Vande Bharat Express / Shatabdi Express (Executive Chair Car)';
      trainCost = 950;
    } else if (style === 'standard') {
      trainName = 'Superfast Intercity Express (AC 3-Tier / AC Chair Car)';
      trainCost = 450;
    }

    return {
      title: `${trainName}: ${fromLoc} → ${toLoc}`,
      titleKn: `${trainName}: ${fromLoc} ನಿಂದ ${toLoc}`,
      vehicle: trainName,
      vehicleKn: trainName,
      departureDesc: `Board ${trainName} from the railway station. Enjoy smooth rail travel, scenic countryside fields, and onboard snacks.`,
      departureDescKn: `ರೈಲ್ವೆ ನಿಲ್ದಾಣದಿಂದ ${trainName} ಮೂಲಕ ಆಹ್ಲಾದಕರ ರೈಲು ಪ್ರಯಾಣ.`,
      localSightseeingDesc: `Short connecting station taxi / auto shuttle to attractions and hotel.`,
      localSightseeingDescKn: `ರೈಲ್ವೆ ನಿಲ್ದಾಣದಿಂದ ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳಿಗೆ ಆಟೋ ಅಥವಾ ಟ್ಯಾಕ್ಸಿ.`,
      returnDesc: `Scenic evening return rail journey aboard ${trainName} directly to home railway station.`,
      returnDescKn: `ರೈಲು ಮೂಲಕ ನಿಗದಿತ ಸಮಯಕ್ಕೆ ಹಿಂತಿರುಗುವ ಪ್ರಯಾಣ.`,
      costPerDayPerPerson: trainCost
    };
  }

  // STRICT BIKE
  if (mode === 'bike') {
    return {
      title: `Royal Enfield Motorcycle Touring: ${fromLoc} → ${toLoc}`,
      titleKn: `ರಾಯಲ್ ಎನ್‌ಫೀಲ್ಡ್ ಬೈಕ್ ಸವಾರಿ: ${fromLoc} ನಿಂದ ${toLoc}`,
      vehicle: 'Royal Enfield Himalayan 450 / Classic 350',
      vehicleKn: 'ರಾಯಲ್ ಎನ್‌ಫೀಲ್ಡ್ ಹಿಮಾಲಯನ್ / ಕ್ಲಾಸಿಕ್ ಬೈಕ್',
      departureDesc: `Gear up with helmet and riding jacket. Throttle along scenic ghat curves, mountain mist, and highway chai halts.`,
      departureDescKn: `ಹೆಲ್ಮೆಟ್ ಮತ್ತು ಜಾಕೆಟ್ ಧರಿಸಿ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ರಮಣೀಯ ತಿರುವುಗಳಲ್ಲಿ ಬೈಕ್ ಸವಾರಿ.`,
      localSightseeingDesc: `Freedom to explore hidden viewpoint trails and offbeat mountain stream bridges on your bike.`,
      localSightseeingDescKn: `ಬೈಕ್ ಮೂಲಕ ಗುಪ್ತ ಜಲಪಾತಗಳು ಮತ್ತು ಪ್ರಕೃತಿ ತಾಣಗಳ ಮುಕ್ತ ಅನ್ವೇಷಣೆ.`,
      returnDesc: `Sunset highway cruise back with memorable riding memories across Karnataka.`,
      returnDescKn: `ಸಂಜೆ ರಸ್ತೆಯಲ್ಲಿ ಬೈಕ್ ಸವಾರಿಯೊಂದಿಗೆ ಹಿಂತಿರುಗುವಿಕೆ.`,
      costPerDayPerPerson: 420
    };
  }

  // ANY / CHEAPEST (adapts intelligently to travelStyle)
  if (style === 'premium') {
    return getTransitForMode('car', 'premium', fromLoc, toLoc);
  } else if (style === 'standard') {
    return getTransitForMode('car', 'standard', fromLoc, toLoc);
  } else {
    return getTransitForMode('bus', 'budget', fromLoc, toLoc);
  }
}
