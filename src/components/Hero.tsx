import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { KARNATAKA_DESTINATIONS } from '../data/destinations';
import { 
  Sparkles, 
  Compass, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  SlidersHorizontal,
  ChevronRight,
  ShieldCheck,
  Zap,
  Hotel,
  Languages
} from 'lucide-react';

interface HeroProps {
  onQuickGenerate: (prompt: string) => void;
  onExploreClick: () => void;
  onDestinationCardClick: (destName: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onQuickGenerate,
  onExploreClick,
  onDestinationCardClick
}) => {
  const { t, isKannada } = useLanguage();
  const [promptInput, setPromptInput] = useState('');

  const samplePrompts = [
    { label: '👑 5-Star Luxury • Only Cab', prompt: 'Plan a 3-day luxury trip to Coorg with 5-star resort and only cab transport.' },
    { label: '🌊 Waterfalls Only • 4 Days', prompt: 'I have ₹8,000 and 4 days. Give me only waterfalls and nature.' },
    { label: '🏖️ Coastal Beaches • Gokarna & Udupi', prompt: 'I have 5 days. Include Gokarna beaches and Udupi coastal sea walk.' },
    { label: '🚌 ₹5,000 Budget • 5 Days (Demo)', prompt: 'I have ₹5,000 budget. Give me a 5-day Karnataka trip from Bengaluru. I like nature and local food.' },
    { label: '🏛️ UNESCO Heritage • Hampi & Badami', prompt: 'I want a 4-day history and heritage trip covering Hampi stone chariot and Badami caves.' },
    { label: '🐅 Wildlife Safaris • Bandipur & Kabini', prompt: 'Plan a 3-day wildlife safari to Bandipur tiger reserve and Kabini backwaters.' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    onQuickGenerate(promptInput.trim());
  };

  const popularDestinations = KARNATAKA_DESTINATIONS.slice(0, 8);

  return (
    <div className="space-y-20 py-4 sm:py-8">
      {/* CINEMATIC HERO SECTION */}
      <div className="relative rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-[#0B132B] to-[#1C1018] text-white p-6 sm:p-12 lg:p-20 border border-amber-500/25 shadow-2xl overflow-hidden text-center">
        {/* Dynamic Multi-Color Ambient Backlight Glows */}
        <div className="absolute -top-24 -right-24 w-[32rem] h-[32rem] bg-amber-500/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-[32rem] h-[32rem] bg-red-600/20 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[20rem] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-8">
          {/* Glowing Pill Badge */}
          <div className="inline-flex items-center space-x-2.5 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-amber-400/30 shadow-lg text-xs font-extrabold text-amber-300">
            <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 animate-pulse" />
            <span className="tracking-wide">
              {isKannada ? '✨ ಕರ್ನಾಟಕದ ಪ್ರಥಮ ಅಧಿಕೃತ AI ಪ್ರವಾಸ ಮಾರ್ಗದರ್ಶಿ' : '✨ Next-Gen Karnataka AI Travel Companion • 100% Free'}
            </span>
          </div>

          {/* Majestic Hero Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              {isKannada ? (
                <>
                  ಕರ್ನಾಟಕದ ಅದ್ಭುತ ತಾಣಗಳನ್ನು <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    AI ಮೂಲಕ ಅನ್ವೇಷಿಸಿ
                  </span>
                </>
              ) : (
                <>
                  Explore Karnataka, <br className="hidden sm:inline" />
                  <span className="bg-gradient-to-r from-amber-300 via-yellow-200 to-orange-400 bg-clip-text text-transparent">
                    Personalized by AI
                  </span>
                </>
              )}
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed font-normal">
              {isKannada ? (
                'ನಿಮ್ಮ ಬಜೆಟ್, ದಿನಗಳು ಮತ್ತು ಆಸಕ್ತಿಗಳನ್ನು ತಿಳಿಸಿ. ಕೇವಲ ೧೦ ಸೆಕೆಂಡುಗಳಲ್ಲಿ ನೈಜ ಹೋಟೆಲ್‌ಗಳು, ಜಲಪಾತಗಳು, ಕಡಲತೀರಗಳು ಮತ್ತು ಮಾರ್ಗ ನಕ್ಷೆಯೊಂದಿಗೆ ಪರಿಪೂರ್ಣ ಪ್ರವಾಸ ಸಿದ್ಧಪಡಿಸಿ.'
              ) : (
                'Tell us your budget, days, and interests. Get a complete realistic day-by-day itinerary with named 5-star & budget hotels, route maps, and weather in seconds.'
              )}
            </p>
          </div>

          {/* ULTRA-MODERN GLASSMORPHIC AI SEARCH BAR */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
            <div className="relative p-2 sm:p-2.5 bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/50 border border-white/20 hover:border-amber-400/60 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-400/20 transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                <div className="flex items-center flex-1 px-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mr-3 animate-pulse" />
                  <input
                    type="text"
                    value={promptInput}
                    onChange={(e) => setPromptInput(e.target.value)}
                    placeholder={t.heroInputPlaceholder}
                    className="w-full py-3.5 text-sm sm:text-base text-white placeholder:text-slate-400 focus:outline-none bg-transparent font-medium"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-sm shadow-xl shadow-amber-500/30 transition-all duration-300 flex items-center justify-center space-x-2 shrink-0 active:scale-95 group"
                >
                  <span>{t.heroGenerateBtn}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </form>

          {/* INSPIRATION CHIPS */}
          <div className="space-y-2 pt-1">
            <span className="text-xs font-bold text-amber-200/80 uppercase tracking-wider block">
              {t.heroTryPrompts}
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-3xl mx-auto">
              {samplePrompts.map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPromptInput(item.prompt)}
                  className="text-xs px-3.5 py-2 rounded-full bg-white/10 hover:bg-white/20 hover:border-amber-400/60 text-slate-200 hover:text-white border border-white/15 backdrop-blur-md transition-all duration-200 shadow-sm text-left active:scale-95"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* TRUST / VALUE HIGHLIGHTS STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10 text-left">
            <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">10-Second Plan</div>
                <div className="text-[10px] text-slate-400">Instant AI generation</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Hotel className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Real Named Stays</div>
                <div className="text-[10px] text-slate-400">5-Star, Comfort & Zostels</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Compass className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Strict Modes</div>
                <div className="text-[10px] text-slate-400">Cab, Bus & Train isolation</div>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">ಕನ್ನಡ & English</div>
                <div className="text-[10px] text-slate-400">100% Native bilingual</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS SECTION */}
      <div className="space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-extrabold uppercase tracking-wider border border-amber-500/20">
            {isKannada ? 'ಸರಳ ಪ್ರಕ್ರಿಯೆ' : 'Simple & Smart'}
          </span>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {t.howItWorksHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            {isKannada ? 'ಮೂರು ಸರಳ ಹಂತಗಳಲ್ಲಿ ನಿಮ್ಮ ಕನಸಿನ ಪ್ರವಾಸವನ್ನು ಸಿದ್ಧಪಡಿಸಿ' : 'Three smart steps from an idea to an optimized, unforgettable journey'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-white/95 rounded-3xl p-7 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/90 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 font-black flex items-center justify-center text-lg mb-5 shadow-md shadow-amber-500/20">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t.howItWorks1Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.howItWorks1Desc}
            </p>
          </div>

          <div className="group bg-white/95 rounded-3xl p-7 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/90 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-red-600 to-orange-500 text-white font-black flex items-center justify-center text-lg mb-5 shadow-md shadow-red-500/20">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t.howItWorks2Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.howItWorks2Desc}
            </p>
          </div>

          <div className="group bg-white/95 rounded-3xl p-7 border border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400/90 transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none" />
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white font-black flex items-center justify-center text-lg mb-5 shadow-md shadow-emerald-500/20">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              {t.howItWorks3Title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {t.howItWorks3Desc}
            </p>
          </div>
        </div>
      </div>

      {/* POPULAR DESTINATIONS SHOWCASE */}
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 text-xs font-extrabold uppercase tracking-wider border border-amber-500/20">
              {isKannada ? 'ಪ್ರಸಿದ್ಧ ತಾಣಗಳು' : 'Iconic Karnataka'}
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {t.popularHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {t.popularSubheading}
            </p>
          </div>

          <button
            onClick={onExploreClick}
            className="text-xs sm:text-sm font-bold text-amber-700 hover:text-amber-800 flex items-center space-x-1.5 group self-start sm:self-auto bg-amber-50 hover:bg-amber-100/80 px-4 py-2.5 rounded-2xl border border-amber-200 transition"
          >
            <span>{t.exploreAllDestinations}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Destination Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularDestinations.map((dest) => (
            <div
              key={dest.id}
              onClick={() => onDestinationCardClick(dest.name)}
              className="group cursor-pointer bg-white rounded-[2rem] overflow-hidden border border-slate-200/90 hover:border-amber-400 hover:shadow-2xl transition-all duration-300 relative h-72 flex flex-col justify-end p-5"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              {/* Dynamic Contrast Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent group-hover:via-slate-950/60 transition-colors" />

              <div className="relative z-10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {dest.district}
                  </span>
                  <span className="text-[11px] font-bold text-white bg-amber-600/90 px-2 py-0.5 rounded-md">
                    ~₹{dest.approxBudgetPerDay}/day
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white group-hover:text-amber-300 transition-colors">
                    {dest.name}
                  </h3>
                  <span className="text-xs text-amber-200/90 font-kannada font-medium block">
                    {dest.nameKn}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/20 text-xs text-slate-300">
                  <span className="line-clamp-1 text-[11px] text-slate-300">
                    {dest.tagline}
                  </span>
                  <span className="text-amber-300 font-bold group-hover:translate-x-1 transition-transform shrink-0 ml-2">
                    Plan →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
