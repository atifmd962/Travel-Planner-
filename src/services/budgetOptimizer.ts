import { BudgetBreakdown, DayPlan, TravelMode, TravelStyle, TripItinerary } from '../types/travel';

export function calculateTripBudget(
  days: DayPlan[],
  durationDays: number,
  travellersCount: number,
  travelStyle: TravelStyle,
  travelMode: TravelMode,
  userBudget: number
): BudgetBreakdown {
  const safeTravellers = Math.max(1, travellersCount);
  const safeDays = Math.max(1, durationDays);

  // 1. Transportation cost calculation
  let transportPerDayPerPerson = 340; // Default KSRTC bus
  if (travelMode === 'train') {
    transportPerDayPerPerson = travelStyle === 'premium' ? 950 : (travelStyle === 'standard' ? 450 : 180);
  } else if (travelMode === 'bus') {
    transportPerDayPerPerson = travelStyle === 'premium' ? 650 : (travelStyle === 'standard' ? 400 : 240);
  } else if (travelMode === 'bike') {
    transportPerDayPerPerson = 450;
  } else if (travelMode === 'car') {
    transportPerDayPerPerson = travelStyle === 'premium' ? Math.max(1200, Math.round(3200 / safeTravellers)) : Math.max(450, Math.round(2200 / safeTravellers));
  } else if (travelMode === 'any') {
    transportPerDayPerPerson = travelStyle === 'premium' ? 1400 : (travelStyle === 'standard' ? 500 : 240);
  }

  const transportation = transportPerDayPerPerson * safeDays * safeTravellers;

  // 2. Accommodation cost calculation (rooms shared by pairs)
  const roomsNeeded = Math.ceil(safeTravellers / 2);
  let roomCostPerNight = 800; // Standard budget double/dorm
  if (travelStyle === 'budget') {
    roomCostPerNight = safeTravellers === 1 ? 480 : 750; // Dorm bed or budget room
  } else if (travelStyle === 'standard') {
    roomCostPerNight = 2400; // 3-4 Star Comfort Hotel
  } else if (travelStyle === 'premium') {
    roomCostPerNight = 8500; // 5-Star Luxury Resort / Palace Hotel
  }
  const nights = Math.max(1, safeDays - 1);
  const accommodation = roomCostPerNight * nights * roomsNeeded;

  // 3. Food cost calculation
  let foodPerDayPerPerson = 300; // Darshini breakfasts, meals thali, coffee
  if (travelStyle === 'budget') foodPerDayPerPerson = 220;
  else if (travelStyle === 'standard') foodPerDayPerPerson = 550;
  else if (travelStyle === 'premium') foodPerDayPerPerson = 1250;
  const food = foodPerDayPerPerson * safeDays * safeTravellers;

  // 4. Sightseeing / Activities cost
  let activitiesSum = 0;
  days.forEach((day) => {
    day.activities.forEach((act) => {
      activitiesSum += (act.estimatedCost || 0) * safeTravellers;
    });
  });
  // Moderate activities for budget style
  const activities = travelStyle === 'budget' 
    ? Math.min(Math.round(activitiesSum * 0.4), 300 * safeTravellers)
    : (activitiesSum > 0 ? activitiesSum : Math.round(120 * safeDays * safeTravellers));

  // 5. Miscellaneous & Buffer
  const subtotal = transportation + accommodation + food + activities;
  const miscellaneous = Math.round(subtotal * 0.06);

  const totalEstimatedCost = transportation + accommodation + food + activities + miscellaneous;
  const remaining = userBudget - totalEstimatedCost;
  const isOverBudget = remaining < 0;
  const overBudgetAmount = isOverBudget ? Math.abs(remaining) : 0;

  // Feasibility evaluation
  const minRealisticPerDayPerPerson = 700;
  const minRealisticTotal = minRealisticPerDayPerPerson * safeDays * safeTravellers;

  let feasibilityLevel: 'feasible' | 'tight' | 'unrealistic' = 'feasible';
  const recommendations: string[] = [];

  if (userBudget < minRealisticTotal * 0.8) {
    feasibilityLevel = 'unrealistic';
    recommendations.push(`Your ₹${userBudget.toLocaleString('en-IN')} budget is too low for a ${safeDays}-day trip for ${safeTravellers} traveller(s). Realistic minimum is around ₹${minRealisticTotal.toLocaleString('en-IN')}.`);
    recommendations.push('Consider reducing trip duration by 1 or 2 days.');
    recommendations.push('Switch to public transit (KSRTC Sarige buses & unreserved passenger trains).');
    recommendations.push('Stay at youth hostels (e.g. Zostel), temple guest houses, or budget homestays.');
  } else if (isOverBudget || userBudget < minRealisticTotal * 1.15) {
    feasibilityLevel = 'tight';
    recommendations.push(`This trip is ₹${overBudgetAmount.toLocaleString('en-IN')} over budget.`);
    recommendations.push('Click "Optimize My Trip" to automatically trim hotel tiers and swap paid activities for free scenic viewpoints.');
    recommendations.push('Dine at iconic local Darshinis and Sagar veg restaurants for delicious ₹60-₹120 meals.');
  } else {
    recommendations.push(`Great news! Your budget has ₹${remaining.toLocaleString('en-IN')} surplus for souvenirs and coffee.`);
    recommendations.push('You have room to try specialty coffee tasting or an auto-safari upgrade.');
  }

  return {
    transportation,
    accommodation,
    food,
    activities,
    miscellaneous,
    totalEstimatedCost,
    userBudget,
    remaining,
    isOverBudget,
    overBudgetAmount,
    feasibilityLevel,
    recommendations
  };
}

export function optimizeTripBudget(itinerary: TripItinerary): TripItinerary {
  const safeTravellers = Math.max(1, itinerary.travellersCount);
  const safeDays = Math.max(1, itinerary.durationDays);

  // Force budget style adjustments
  const newTravelStyle: TravelStyle = 'budget';
  const newTravelMode: TravelMode = itinerary.travelMode === 'car' ? 'bus' : itinerary.travelMode;

  // Modify days to prioritize free/low-cost activities
  const optimizedDays: DayPlan[] = itinerary.days.map((day) => {
    const updatedActivities = day.activities.map((act) => {
      // If activity is expensive, swap or discount
      if (act.estimatedCost > 150) {
        return {
          ...act,
          title: `${act.title} (Self-guided / Budget entry)`,
          description: `${act.description} Opted for free viewpoint/public garden entry.`,
          estimatedCost: Math.min(40, act.estimatedCost),
          isFree: act.estimatedCost <= 40
        };
      }
      return act;
    });

    const dayCost = updatedActivities.reduce((acc, curr) => acc + curr.estimatedCost * safeTravellers, 0);

    return {
      ...day,
      activities: updatedActivities,
      estimatedDayCost: dayCost
    };
  });

  // Calculate new budget with strict budget parameters
  // Ensure total estimated cost stays within or close to userBudget
  const nights = Math.max(1, safeDays - 1);
  const roomsNeeded = Math.ceil(safeTravellers / 2);
  
  // Dynamic scaling to honor user budget
  const targetPerDay = Math.floor(itinerary.userBudget / safeDays);
  
  const optTransport = Math.min(260 * safeDays * safeTravellers, Math.round(targetPerDay * 0.28 * safeDays));
  const optAccom = Math.min(650 * nights * roomsNeeded, Math.round(targetPerDay * 0.32 * safeDays));
  const optFood = Math.min(260 * safeDays * safeTravellers, Math.round(targetPerDay * 0.25 * safeDays));
  const optAct = Math.min(80 * safeDays * safeTravellers, Math.round(targetPerDay * 0.10 * safeDays));
  const optMisc = Math.round((optTransport + optAccom + optFood + optAct) * 0.05);

  const totalCost = optTransport + optAccom + optFood + optAct + optMisc;
  const remaining = itinerary.userBudget - totalCost;

  const newBudget: BudgetBreakdown = {
    transportation: optTransport,
    accommodation: optAccom,
    food: optFood,
    activities: optAct,
    miscellaneous: optMisc,
    totalEstimatedCost: totalCost,
    userBudget: itinerary.userBudget,
    remaining: remaining,
    isOverBudget: remaining < 0,
    overBudgetAmount: remaining < 0 ? Math.abs(remaining) : 0,
    feasibilityLevel: remaining < 0 ? 'tight' : 'feasible',
    recommendations: [
      '✅ Itinerary optimized! Transport converted to KSRTC public bus & local trains.',
      '✅ Accommodation switched to certified clean youth hostels / budget homestay sharing.',
      '✅ Dining focused on wholesome Darshini dosa breakfasts and local Karnataka thalis.',
      remaining >= 0
        ? `🎉 Perfect! Your trip now fits comfortably within ₹${itinerary.userBudget.toLocaleString('en-IN')} with ₹${remaining.toLocaleString('en-IN')} savings!`
        : `Trip costs reduced to ₹${totalCost.toLocaleString('en-IN')}, within reach of your ₹${itinerary.userBudget.toLocaleString('en-IN')} budget.`
    ]
  };

  return {
    ...itinerary,
    travelStyle: newTravelStyle,
    travelMode: newTravelMode,
    days: optimizedDays,
    budget: newBudget,
    isOptimized: true
  };
}
