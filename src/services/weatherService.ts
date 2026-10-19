import { WeatherInfo } from '../types/travel';

// WMO Weather interpretation codes (WW)
const WMO_CODES: Record<number, { condition: string; icon: string; rainLikely: boolean }> = {
  0: { condition: 'Clear sky', icon: '☀️', rainLikely: false },
  1: { condition: 'Mainly clear', icon: '🌤️', rainLikely: false },
  2: { condition: 'Partly cloudy', icon: '⛅', rainLikely: false },
  3: { condition: 'Overcast', icon: '☁️', rainLikely: false },
  45: { condition: 'Misty fog', icon: '🌫️', rainLikely: false },
  48: { condition: 'Depositing rime fog', icon: '🌫️', rainLikely: false },
  51: { condition: 'Light drizzle', icon: '🌦️', rainLikely: true },
  53: { condition: 'Moderate drizzle', icon: '🌦️', rainLikely: true },
  55: { condition: 'Dense drizzle', icon: '🌧️', rainLikely: true },
  61: { condition: 'Slight rain', icon: '🌧️', rainLikely: true },
  63: { condition: 'Moderate rain', icon: '🌧️', rainLikely: true },
  65: { condition: 'Heavy rain showers', icon: '⛈️', rainLikely: true },
  80: { condition: 'Rain showers', icon: '🌦️', rainLikely: true },
  81: { condition: 'Moderate showers', icon: '🌧️', rainLikely: true },
  82: { condition: 'Violent rain showers', icon: '⛈️', rainLikely: true },
  95: { condition: 'Thunderstorm', icon: '⛈️', rainLikely: true },
};

export async function fetchDestinationWeather(
  destinationName: string,
  lat: number,
  lng: number
): Promise<WeatherInfo> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=precipitation_probability_max&timezone=Asia%2FKolkata`;
    
    // Set a 3.5s timeout for fast UI fallback
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Weather API responded with status ${response.status}`);
    }

    const data = await response.json();
    const current = data.current_weather;
    const weatherCode = current?.weathercode ?? 1;
    const tempC = Math.round(current?.temperature ?? 26);
    const rainChance = data.daily?.precipitation_probability_max?.[0] ?? (weatherCode >= 50 ? 65 : 15);

    const info = WMO_CODES[weatherCode] || { condition: 'Pleasant', icon: '🌤️', rainLikely: false };

    let advisory = '🌤️ Pleasant weather expected. Great for daytime sightseeing and walks.';
    let advisoryKn = '🌤️ ಆಹ್ಲಾದಕರ ವಾತಾವರಣ. ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳನ್ನು ವೀಕ್ಷಿಸಲು ಸೂಕ್ತ ದಿನ.';

    if (rainChance > 50 || info.rainLikely) {
      advisory = '🌧️ Rain expected — carry an umbrella, light raincoat & waterproof bag.';
      advisoryKn = '🌧️ ಮಳೆ ಸಾಧ್ಯತೆ — ಛತ್ರಿ, ರೇನ್‌ಕೋಟ್ ಮತ್ತು ಜಲನಿರೋಧಕ ಬ್ಯಾಗ್ ಜೊತೆಗಿಡಿ.';
    } else if (tempC > 31) {
      advisory = '☀️ Warm sunny climate — carry sunglasses, sunhat & stay hydrated with fresh coconut water.';
      advisoryKn = '☀️ ಬಿಸಿಲು ಹೆಚ್ಚು — ಸನ್‌ಗ್ಲಾಸ್ ಬಳಸಿ ಹಾಗೂ ಎಳನೀರು ಕುಡಿದು ದೇಹವನ್ನು ತಂಪಾಗಿಡಿ.';
    } else if (tempC < 20) {
      advisory = '🧣 Cool hilly breeze — pack a cozy fleece sweater or shawl for early mornings and late evenings.';
      advisoryKn = '🧣 ತಂಪಾದ ಗಾಳಿ — ಮುಂಜಾನೆ ಮತ್ತು ರಾತ್ರಿಯ ವೇಳೆ ಬೆಚ್ಚಗಿನ ಸ್ವೆಟರ್ ಅಥವಾ ಶಾಲು ಧರಿಸಿ.';
    }

    return {
      destination: destinationName,
      tempC,
      condition: info.condition,
      conditionIcon: info.icon,
      rainChancePercent: rainChance,
      advisory,
      advisoryKn
    };
  } catch {
    // Graceful fallback for offline / blocked environment
    return getFallbackWeather(destinationName);
  }
}

export function getFallbackWeather(destinationName: string): WeatherInfo {
  const lower = destinationName.toLowerCase();
  
  if (lower.includes('coorg') || lower.includes('chikmagalur') || lower.includes('shivamogga')) {
    return {
      destination: destinationName,
      tempC: 22,
      condition: 'Misty & Breezy',
      conditionIcon: '🌫️',
      rainChancePercent: 35,
      advisory: '🌿 Pleasant misty hill station climate. Carry a light windcheater or umbrella.',
      advisoryKn: '🌿 ಮಂಜಿನಿಂದ ಕೂಡಿದ ಆಹ್ಲಾದಕರ ಹವಾಮಾನ. ಲಘು ಸ್ವೆಟರ್ ಅಥವಾ ಛತ್ರಿ ಜೊತೆಗಿಡಿ.'
    };
  } else if (lower.includes('gokarna') || lower.includes('mangaluru') || lower.includes('udupi')) {
    return {
      destination: destinationName,
      tempC: 29,
      condition: 'Tropical Coastal Breeze',
      conditionIcon: '🏖️',
      rainChancePercent: 20,
      advisory: '🌊 Sunny coastal weather. Perfect for beach walks; wear cottons and keep hydrated.',
      advisoryKn: '🌊 ಕರಾವಳಿಯ ಆಹ್ಲಾದಕರ ಬಿಸಿಲು. ಹತ್ತಿ ಬಟ್ಟೆ ಧರಿಸಿ ಮತ್ತು ಸಾಕಷ್ಟು ನೀರು ಕುಡಿಯಿರಿ.'
    };
  } else if (lower.includes('hampi') || lower.includes('badami')) {
    return {
      destination: destinationName,
      tempC: 30,
      condition: 'Sunny & Clear',
      conditionIcon: '☀️',
      rainChancePercent: 5,
      advisory: '☀️ Bright and sunny among heritage ruins. Start explorations early morning or late afternoon.',
      advisoryKn: '☀️ ಬಿಸಿಲು ಇರುತ್ತದೆ. ಸ್ಮಾರಕಗಳ ವೀಕ್ಷಣೆಯನ್ನು ಮುಂಜಾನೆ ಅಥವಾ ಸಂಜೆ ಕೈಗೊಳ್ಳಿ.'
    };
  }

  return {
    destination: destinationName,
    tempC: 25,
    condition: 'Pleasant & Partly Cloudy',
    conditionIcon: '🌤️',
    rainChancePercent: 15,
    advisory: '🌤️ Excellent travel weather. Ideal for sightseeing and local street food exploration.',
    advisoryKn: '🌤️ ಪ್ರವಾಸಕ್ಕೆ ಅತ್ಯುತ್ತಮ ಹವಾಮಾನ. ಸ್ಥಳೀಯ ತಾಣಗಳು ಮತ್ತು ಆಹಾರ ಸವಿಯಲು ಸೂಕ್ತ.'
  };
}
