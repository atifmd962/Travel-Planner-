import React, { useState } from 'react';
import { TravelMode, TravelStyle } from '../types/travel';
import { STARTING_LOCATIONS, TRAVEL_INTERESTS } from '../data/destinations';
import { useLanguage } from '../context/LanguageContext';
import { getTomorrowDateString } from '../utils/dateUtils';
import { 
  Sparkles, 
  Send, 
  MapPin, 
  Calendar, 
  Wallet, 
  Users, 
  Compass, 
  Bus, 
  Train, 
  Car, 
  Bike, 
  SlidersHorizontal,
  FileText,
  HelpCircle
} from 'lucide-react';

interface AIPlannerFormProps {
  onGenerateNatural: (prompt: string) => void;
  onGenerateStructured: (params: {
    startingLocation: string;
    durationDays: number;
    startDate?: string;
    budget: number;
    travellersCount: number;
    travelStyle: TravelStyle;
    travelMode: TravelMode;
    interests: string[];
  }) => void;
  isLoading?: boolean;
  initialPrompt?: string;
}

export const AIPlannerForm: React.FC<AIPlannerFormProps> = ({
  onGenerateNatural,
  onGenerateStructured,
  isLoading,
  initialPrompt = ''
}) => {
  const { t, isKannada } = useLanguage();
  const [activeTab, setActiveTab] = useState<'natural' | 'structured'>('natural');

  // Natural Language State
  const [naturalPrompt, setNaturalPrompt] = useState(initialPrompt);

  // Structured Form State
  const [startingLocation, setStartingLocation] = useState('Bengaluru');
  const [startDate, setStartDate] = useState(getTomorrowDateString());
  const [durationDays, setDurationDays] = useState(5);
  const [budget, setBudget] = useState(5000);
  const [travellersCount, setTravellersCount] = useState(1);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>('budget');
  const [travelMode, setTravelMode] = useState<TravelMode>('bus');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['nature', 'waterfalls', 'food']);

  const quickPrompts = [
    {
      label: '🗓️ 4 Days • Starting This Weekend',
      prompt: 'Plan a 4-day trip starting this weekend from Bengaluru with ₹8,000 budget for waterfalls and nature.'
    },
    {
      label: '👑 5-Star Luxury • Only Cab',
      prompt: 'Plan a 3-day luxury trip to Coorg with 5-star resort and only cab transport.'
    },
    {
      label: '🚌 ₹5k • 5 Days • Bus (Demo)',
      prompt: 'I have ₹5,000 budget. Give me a 5-day Karnataka trip starting tomorrow from Bengaluru. I like nature and waterfalls.'
    },
    {
      label: '🚗 4 Days • Only Cab • Mysore & Chikmagalur',
      prompt: 'I have 4 days starting from Bengaluru. Use only cab transport and comfortable standard hotels.'
    },
    {
      label: '🏖️ 5 Days • Beaches & Temples',
      prompt: 'I have ₹10,000 for 5 days. Include Gokarna beaches and Udupi temples.'
    }
  ];

  const setDatePreset = (preset: 'tomorrow' | 'weekend' | 'nextWeek') => {
    const d = new Date();
    if (preset === 'tomorrow') {
      d.setDate(d.getDate() + 1);
    } else if (preset === 'weekend') {
      const day = d.getDay();
      const diff = (6 - day + 7) % 7 || 7;
      d.setDate(d.getDate() + diff);
    } else if (preset === 'nextWeek') {
      d.setDate(d.getDate() + 7);
    }
    setStartDate(d.toISOString().split('T')[0]);
  };

  const handleNaturalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!naturalPrompt.trim()) return;
    onGenerateNatural(naturalPrompt.trim());
  };

  const handleStructuredSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateStructured({
      startingLocation,
      durationDays,
      startDate,
      budget,
      travellersCount,
      travelStyle,
      travelMode,
      interests: selectedInterests
    });
  };

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter(i => i !== id));
    } else {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-amber-950/5 border border-amber-200/80 overflow-hidden transition-all">
      {/* Switcher Header Tabs */}
      <div className="flex border-b border-amber-200/60 bg-gradient-to-r from-amber-50/90 via-orange-50/50 to-amber-50/90 p-2.5 gap-2">
        <button
          onClick={() => setActiveTab('natural')}
          className={`flex-1 py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-2 transition-all duration-300 ${
            activeTab === 'natural'
              ? 'bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 text-slate-950 shadow-md shadow-amber-500/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <Sparkles className={`w-4 h-4 ${activeTab === 'natural' ? 'text-slate-950' : 'text-amber-500'}`} />
          <span>{t.optionAName}</span>
          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-extrabold hidden sm:inline-block ${
            activeTab === 'natural' ? 'bg-black/15 text-slate-950' : 'bg-amber-100 text-amber-800'
          }`}>
            {isKannada ? 'ಶಿಫಾರಸು' : 'Recommended'}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('structured')}
          className={`flex-1 py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center space-x-2 transition-all duration-300 ${
            activeTab === 'structured'
              ? 'bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-md shadow-slate-900/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
          }`}
        >
          <SlidersHorizontal className={`w-4 h-4 ${activeTab === 'structured' ? 'text-amber-400' : 'text-slate-500'}`} />
          <span>{t.optionBName}</span>
        </button>
      </div>

      <div className="p-6 sm:p-10">
        {/* OPTION A: NATURAL LANGUAGE */}
        {activeTab === 'natural' && (
          <form onSubmit={handleNaturalSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-900 mb-2">
                {t.naturalPromptLabel}
              </label>
              <div className="relative">
                <textarea
                  value={naturalPrompt}
                  onChange={(e) => setNaturalPrompt(e.target.value)}
                  rows={4}
                  placeholder={t.naturalPromptPlaceholder}
                  className="w-full px-5 py-4 text-sm sm:text-base rounded-2xl border-2 border-slate-200 focus:outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition resize-none text-slate-800 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Quick Prompt Ideas */}
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
                {t.heroTryPrompts}
              </span>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setNaturalPrompt(item.prompt)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 hover:text-amber-900 text-slate-700 text-xs font-medium border border-slate-200 transition active:scale-95 text-left"
                  >
                    💡 {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !naturalPrompt.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 font-black text-base shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/35 transition-all duration-300 flex items-center justify-center space-x-2.5 disabled:opacity-50 active:scale-[0.99]"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>{isLoading ? (isKannada ? 'ಯೋಜಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating Itinerary...') : t.generateTripBtn}</span>
            </button>
          </form>
        )}

        {/* OPTION B: STRUCTURED FORM */}
        {activeTab === 'structured' && (
          <form onSubmit={handleStructuredSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Starting Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <MapPin className="w-4 h-4 text-amber-600" />
                  <span>{t.startLocationLabel}</span>
                </label>
                <select
                  value={startingLocation}
                  onChange={(e) => setStartingLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 text-sm font-medium text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm"
                >
                  {STARTING_LOCATIONS.map((loc) => (
                    <option key={loc.id} value={loc.name}>
                      {loc.name} ({loc.nameKn})
                    </option>
                  ))}
                </select>
              </div>

              {/* Departure Date */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{isKannada ? 'ಪ್ರವಾಸ ಆರಂಭ ದಿನಾಂಕ' : 'Departure Date'}</span>
                  </span>
                  <span className="text-amber-700 font-bold text-xs bg-amber-100/80 px-2 py-0.5 rounded-full border border-amber-200">
                    {startDate ? new Date(startDate + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) : ''}
                  </span>
                </label>
                <input
                  type="date"
                  value={startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-sm font-bold text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm"
                />
                <div className="flex gap-1.5 mt-2">
                  <button
                    type="button"
                    onClick={() => setDatePreset('tomorrow')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 transition active:scale-95"
                  >
                    {isKannada ? 'ನಾಳೆ' : 'Tomorrow'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDatePreset('weekend')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 transition active:scale-95"
                  >
                    {isKannada ? 'ಈ ವಾರಾಂತ್ಯ' : 'This Weekend'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDatePreset('nextWeek')}
                    className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 transition active:scale-95"
                  >
                    {isKannada ? 'ಮುಂದಿನ ವಾರ' : 'Next Week'}
                  </button>
                </div>
              </div>

              {/* Number of Days */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span className="flex items-center space-x-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>{t.durationLabel}</span>
                  </span>
                  <span className="text-amber-600 font-extrabold text-sm">{durationDays} Days</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="15"
                  value={durationDays}
                  onChange={(e) => setDurationDays(parseInt(e.target.value, 10))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-semibold">
                  <span>1 Day</span>
                  <span>5 Days</span>
                  <span>10 Days</span>
                  <span>15 Days</span>
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Wallet className="w-4 h-4 text-amber-600" />
                  <span>{t.budgetLabel}</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-slate-400 font-bold">₹</span>
                  <input
                    type="number"
                    min="1000"
                    step="500"
                    value={budget}
                    onChange={(e) => setBudget(Math.max(1000, parseInt(e.target.value || '0', 10)))}
                    className="w-full pl-9 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  />
                </div>
              </div>

              {/* Number of Travellers */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                  <Users className="w-4 h-4 text-amber-600" />
                  <span>{t.travellersLabel}</span>
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setTravellersCount(num)}
                      className={`py-2.5 rounded-xl text-xs font-bold border transition ${
                        travellersCount === num
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {num === 5 ? '5+' : num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.travelStyleLabel}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { 
                    id: 'budget', 
                    label: isKannada ? 'ಬಜೆಟ್ ಹಾಸ್ಟೆಲ್ & ಬಸ್ಸು' : 'Budget (Hostels & Lodges)', 
                    desc: isKannada ? 'ಜೋಸ್ಟೆಲ್ ಡಾರ್ಮಿಟರಿ, ಬಜೆಟ್ ಲಾಡ್ಜ್ & ಕೆಎಸ್‌ಆರ್‌ಟಿಸಿ' : 'Zostel dorms, certified budget lodges & KSRTC Sarige' 
                  },
                  { 
                    id: 'standard', 
                    label: isKannada ? '೩-೪ ಸ್ಟಾರ್ ಕಂಫರ್ಟ್ ಹೋಟೆಲ್' : 'Standard (3-4 Star Comfort)', 
                    desc: isKannada ? 'ಸದರ್ನ್ ಸ್ಟಾರ್, ಲೆಮನ್ ಟ್ರೀ, ಕೂರ್ಗ್ ಕ್ಲಿಫ್ ರೆಸಾರ್ಟ್' : 'Hotel Southern Star, Lemon Tree, Coorg Cliff & AC cabs' 
                  },
                  { 
                    id: 'premium', 
                    label: isKannada ? '👑 ೫-ಸ್ಟಾರ್ ಐಷಾರಾಮಿ ರೆಸಾರ್ಟ್' : '👑 5-Star Luxury & Palace Resorts', 
                    desc: isKannada ? 'ದ ಲೀಲಾ ಪ್ಯಾಲೇಸ್, ಲಲಿತ ಮಹಲ್, ದ ಸೆರಾಯ್ ಪೂಲ್ ವಿಲ್ಲಾ' : 'The Leela Palace, Lalitha Mahal, The Serai Pool Villas & Evolve Back' 
                  }
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setTravelStyle(st.id as TravelStyle)}
                    className={`p-3.5 rounded-2xl text-left border transition ${
                      travelStyle === st.id
                        ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-500/20 shadow-sm'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{st.label}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{st.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Travel Mode */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.travelModeLabel}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'car', label: isKannada ? 'ಕ್ಯಾಬ್ ಮಾತ್ರ' : 'Only Cab / Car', icon: Car, hint: 'Private AC Cab' },
                  { id: 'bus', label: isKannada ? 'ಬಸ್ಸು ಮಾತ್ರ' : 'Only Bus', icon: Bus, hint: 'KSRTC Airavat/Sarige' },
                  { id: 'train', label: isKannada ? 'ರೈಲು ಮಾತ್ರ' : 'Only Train', icon: Train, hint: 'Vande Bharat/Express' },
                  { id: 'bike', label: isKannada ? 'ಬೈಕ್' : 'Bike', icon: Bike, hint: 'Royal Enfield' },
                  { id: 'any', label: isKannada ? 'ಯಾವುದಾದರೂ' : 'Any / Best Fit', icon: Compass, hint: 'Budget optimal' }
                ].map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setTravelMode(mode.id as TravelMode)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold border flex flex-col items-center justify-center space-y-1 transition ${
                        travelMode === mode.id
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center space-x-1.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span>{mode.label}</span>
                      </div>
                      <span className={`text-[9px] ${travelMode === mode.id ? 'text-amber-200' : 'text-slate-400'}`}>
                        {mode.hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interests Multi-Select Chips */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {t.interestsLabel}
              </label>
              <div className="flex flex-wrap gap-2">
                {TRAVEL_INTERESTS.map((interest) => {
                  const isSelected = selectedInterests.includes(interest.id);
                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleInterest(interest.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                        isSelected
                          ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                          : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}
                      {isKannada ? interest.labelKn : interest.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-700 hover:to-amber-700 text-white font-bold text-base shadow-lg shadow-amber-500/25 hover:shadow-xl transition-all flex items-center justify-center space-x-2 disabled:opacity-50 active:scale-[0.99]"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLoading ? (isKannada ? 'ಯೋಜಿಸಲಾಗುತ್ತಿದೆ...' : 'Generating Itinerary...') : t.generateTripBtn}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
