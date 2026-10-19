import React, { useState } from 'react';
import { KARNATAKA_DESTINATIONS } from '../data/destinations';
import { Destination, DestinationCategory } from '../types/travel';
import { useLanguage } from '../context/LanguageContext';
import { 
  Compass, 
  MapPin, 
  Calendar, 
  Wallet, 
  Sparkles, 
  Search, 
  ChevronRight,
  X,
  CheckCircle,
  ExternalLink
} from 'lucide-react';

interface DestinationExplorerProps {
  onSelectDestinationForPlan?: (destinationName: string) => void;
}

export const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  onSelectDestinationForPlan
}) => {
  const { isKannada } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalDest, setActiveModalDest] = useState<Destination | null>(null);

  const categories = [
    { id: 'all', label: isKannada ? 'ಎಲ್ಲಾ ತಾಣಗಳು' : 'All Places' },
    { id: 'nature', label: isKannada ? 'ಪ್ರಕೃತಿ & ಗಿರಿಧಾಮ' : 'Nature & Hills' },
    { id: 'beaches', label: isKannada ? 'ಕಡಲತೀರಗಳು' : 'Beaches' },
    { id: 'history', label: isKannada ? 'ಐತಿಹಾಸಿಕ & ಪಾರಂಪರಿಕ' : 'History & Heritage' },
    { id: 'waterfalls', label: isKannada ? 'ಜಲಪಾತಗಳು' : 'Waterfalls' },
    { id: 'spiritual', label: isKannada ? 'ಧಾರ್ಮಿಕ ಕ್ಷೇತ್ರಗಳು' : 'Spiritual' },
    { id: 'adventure', label: isKannada ? 'ಸಾಹಸ ಕ್ರೀಡೆ' : 'Adventure' },
    { id: 'wildlife', label: isKannada ? 'ವನ್ಯಜೀವಿ ಸಫಾರಿ' : 'Wildlife' },
    { id: 'food', label: isKannada ? 'ಆಹಾರ & ರುಚಿ' : 'Cuisine & Food' }
  ];

  const filteredDestinations = KARNATAKA_DESTINATIONS.filter((dest) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      dest.category.includes(selectedCategory as DestinationCategory);

    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.nameKn.includes(searchQuery) ||
      dest.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.district.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-8">
      {/* Search & Category Filter Toolbar */}
      <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-amber-200/70 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition active:scale-95 ${
                selectedCategory === cat.id
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-amber-50 hover:bg-amber-100/80 text-slate-700 border border-amber-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isKannada ? 'ತಾಣ, ಜಿಲ್ಲೆ ಅಥವಾ ಆಸಕ್ತಿ ಹುಡುಕಿ...' : 'Search destination, district...'}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Grid of Destination Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="group bg-white/95 rounded-3xl overflow-hidden border border-amber-200/70 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

                <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-amber-500/90 text-white text-[11px] font-bold backdrop-blur-md">
                    {dest.district}
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white flex items-center justify-between">
                    <span>{dest.name}</span>
                    <span className="text-sm font-normal text-amber-300 font-kannada">{dest.nameKn}</span>
                  </h3>
                  <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
                    {isKannada ? dest.taglineKn : dest.tagline}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                  {isKannada ? dest.descriptionKn : dest.description}
                </p>

                {/* Key stats */}
                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div className="flex items-center space-x-1.5 text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="truncate">{dest.bestTime}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-emerald-700 font-semibold justify-end">
                    <Wallet className="w-3.5 h-3.5 shrink-0" />
                    <span>~₹{dest.approxBudgetPerDay}/day</span>
                  </div>
                </div>

                {/* Top attractions mini list */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {isKannada ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳು:' : 'Top Attractions:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {dest.topAttractions.slice(0, 3).map((att) => (
                      <span
                        key={att.id}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200/70"
                      >
                        {att.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-5 pt-0 flex items-center space-x-2">
              <button
                onClick={() => setActiveModalDest(dest)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
              >
                {isKannada ? 'ವಿವರಗಳು' : 'Details'}
              </button>
              {onSelectDestinationForPlan && (
                <button
                  onClick={() => onSelectDestinationForPlan(dest.name)}
                  className="flex-1 py-2 px-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm transition flex items-center justify-center space-x-1"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isKannada ? 'ಪ್ರವಾಸ ಯೋಜಿಸಿ' : 'Plan Trip'}</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Destination Detail Modal */}
      {activeModalDest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setActiveModalDest(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center space-x-3 mb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-2xl font-bold text-slate-900">{activeModalDest.name}</h3>
                  <span className="text-lg font-bold text-amber-600 font-kannada">{activeModalDest.nameKn}</span>
                </div>
                <p className="text-xs text-slate-500">{activeModalDest.district} District • {activeModalDest.tagline}</p>
              </div>
            </div>

            <img
              src={activeModalDest.image}
              alt={activeModalDest.name}
              className="w-full h-64 object-cover rounded-2xl mb-6 shadow-md"
            />

            <div className="space-y-4 text-sm text-slate-700">
              <p className="leading-relaxed">
                {isKannada ? activeModalDest.descriptionKn : activeModalDest.description}
              </p>

              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/70 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold">✨ {isKannada ? 'ಕರ್ನಾಟಕ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಪ್ರವಾಸ ಸಲಹೆ:' : 'Local Cultural Insight:'} </span>
                {activeModalDest.kannadaCultureTip}
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  {isKannada ? 'ತಪ್ಪದೇ ಸವಿಯಬೇಕಾದ ಊಟ & ತಿನಿಸುಗಳು:' : 'Must-Try Regional Food & Specialties:'}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalDest.localFoodSpecialities.map((food, i) => (
                    <span key={i} className="px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-semibold">
                      🍽️ {food}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-2">
                  {isKannada ? 'ಪ್ರಮುಖ ಆಕರ್ಷಣೆಗಳ ವಿವರ:' : 'Top Attractions & Entry:'}
                </h4>
                <div className="space-y-2">
                  {activeModalDest.topAttractions.map(att => (
                    <div key={att.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-xs text-slate-800">{att.name} ({att.nameKn})</div>
                        <div className="text-[11px] text-slate-500">{att.description}</div>
                      </div>
                      <div className="text-right shrink-0 ml-4">
                        <span className="text-xs font-bold text-emerald-700">
                          {att.isFree ? 'Free' : `₹${att.estimatedCost}`}
                        </span>
                        <div className="text-[10px] text-slate-400">{att.durationHours} hrs</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end space-x-3">
              <button
                onClick={() => setActiveModalDest(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                {isKannada ? 'ಮುಚ್ಚಿ' : 'Close'}
              </button>
              {onSelectDestinationForPlan && (
                <button
                  onClick={() => {
                    const name = activeModalDest.name;
                    setActiveModalDest(null);
                    onSelectDestinationForPlan(name);
                  }}
                  className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-md flex items-center space-x-1.5"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isKannada ? `${activeModalDest.name} ಗೆ ಪ್ರವಾಸ ರೂಪಿಸಿ` : `Plan Trip to ${activeModalDest.name}`}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
