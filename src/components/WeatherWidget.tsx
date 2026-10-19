import React, { useEffect, useState } from 'react';
import { WeatherInfo } from '../types/travel';
import { fetchDestinationWeather, getFallbackWeather } from '../services/weatherService';
import { KARNATAKA_DESTINATIONS } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';
import { CloudSun, Droplets, Thermometer, Info } from 'lucide-react';

interface WeatherWidgetProps {
  destinations: string[];
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ destinations }) => {
  const { isKannada } = useLanguage();
  const [weatherList, setWeatherList] = useState<WeatherInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadWeather() {
      setLoading(true);
      const uniqueDests = [...new Set(destinations)];
      const results: WeatherInfo[] = [];

      for (const destName of uniqueDests) {
        const match = KARNATAKA_DESTINATIONS.find(
          d => d.name.toLowerCase() === destName.toLowerCase() || destName.toLowerCase().includes(d.id)
        );

        if (match) {
          const w = await fetchDestinationWeather(match.name, match.lat, match.lng);
          results.push(w);
        } else {
          results.push(getFallbackWeather(destName));
        }
      }

      if (isMounted) {
        setWeatherList(results);
        setLoading(false);
      }
    }

    if (destinations && destinations.length > 0) {
      loadWeather();
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [destinations]);

  if (destinations.length === 0) return null;

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/80">
      <div className="flex items-center space-x-2.5 mb-6">
        <div className="p-2 rounded-xl bg-sky-50 text-sky-600">
          <CloudSun className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            {isKannada ? 'ಪ್ರವಾಸ ತಾಣಗಳ ಹವಾಮಾನ ಮಾಹಿತಿ' : 'Destination Weather & Climate Advice'}
          </h3>
          <p className="text-xs text-slate-500">
            {isKannada ? 'ಲೈವ್ ಹವಾಮಾನ ಮುನ್ಸೂಚನೆ ಮತ್ತು ಪ್ರವಾಸ ಸಿದ್ಧತೆ ಸಲಹೆಗಳು' : 'Live forecast & travel packing recommendations'}
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="animate-pulse bg-slate-100 rounded-2xl h-36 p-4"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weatherList.map((info, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/70 hover:border-sky-300 transition shadow-sm hover:shadow-md"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-slate-800 text-base">{info.destination}</span>
                <span className="text-2xl" role="img" aria-label="weather-icon">
                  {info.conditionIcon}
                </span>
              </div>

              <div className="flex items-baseline space-x-3 mb-2">
                <div className="text-3xl font-extrabold text-slate-900 flex items-center">
                  <span>{info.tempC}°</span>
                  <span className="text-sm font-normal text-slate-500 ml-1">C</span>
                </div>
                <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">
                  {info.condition}
                </div>
              </div>

              <div className="flex items-center space-x-2 text-xs text-sky-700 font-medium mb-3">
                <Droplets className="w-3.5 h-3.5 text-sky-500" />
                <span>{isKannada ? 'ಮಳೆ ಸಂಭವನೀಯತೆ:' : 'Rain Probability:'} {info.rainChancePercent}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-100 text-[11px] text-amber-900 flex items-start space-x-2 leading-relaxed">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span>{isKannada ? info.advisoryKn : info.advisory}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
