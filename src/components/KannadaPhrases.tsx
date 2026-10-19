import React, { useState } from 'react';
import { KANNADA_PHRASES } from '../data/kannadaPhrases';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, Languages, Sparkles, Search } from 'lucide-react';

export const KannadaPhrases: React.FC = () => {
  const { isKannada } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: isKannada ? 'ಎಲ್ಲವೂ' : 'All Phrases' },
    { id: 'greetings', label: isKannada ? 'ಶುಭಾಶಯಗಳು' : 'Greetings' },
    { id: 'direction', label: isKannada ? 'ದಾರಿ & ಸ್ಥಳ' : 'Directions' },
    { id: 'food', label: isKannada ? 'ಆಹಾರ & ಊಟ' : 'Food' },
    { id: 'shopping', label: isKannada ? 'ಶಾಪಿಂಗ್ & ದರ' : 'Shopping' },
    { id: 'emergency', label: isKannada ? 'ತುರ್ತು ಸಹಾಯ' : 'Emergency' }
  ];

  const filtered = KANNADA_PHRASES.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = 
      p.english.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pronunciation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.kannada.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  const handleSpeak = (phrase: typeof KANNADA_PHRASES[0]) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(phrase.kannada);
      utterance.lang = 'kn-IN'; // Kannada language code
      utterance.rate = 0.85;

      setPlayingId(phrase.id);
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white/95 rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/70 backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4 mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 text-white shadow-md">
            <Languages className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-2xl font-bold text-slate-900">
                {isKannada ? 'ಉಪಯುಕ್ತ ಕನ್ನಡ ಸಂಭಾಷಣೆಗಳು' : 'Essential Kannada Travel Phrases'}
              </h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold">
                15+ Phrases
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {isKannada 
                ? 'ಕರ್ನಾಟಕದಾದ್ಯಂತ ಸ್ಥಳೀಯರೊಂದಿಗೆ ಆತ್ಮೀಯವಾಗಿ ಮಾತನಾಡಲು ಇವುಗಳನ್ನು ಬಳಸಿ (ಆಡಿಯೋ ಉಚ್ಚಾರಣೆಯೊಂದಿಗೆ)' 
                : 'Connect with local auto drivers, homestays and shopkeepers with authentic pronunciation'}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isKannada ? 'ವಾಕ್ಯ ಹುಡುಕಿ...' : 'Search phrases...'}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              activeCategory === cat.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-50 hover:bg-amber-100/80 text-slate-700 border border-amber-200/60'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Phrases Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 border border-amber-200/60 hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 border border-amber-200/50">
                  {item.category}
                </span>
                <button
                  onClick={() => handleSpeak(item)}
                  title="Listen pronunciation"
                  className={`p-2 rounded-xl transition ${
                    playingId === item.id 
                      ? 'bg-amber-600 text-white animate-pulse' 
                      : 'bg-slate-100 group-hover:bg-amber-100 text-slate-600 group-hover:text-amber-900'
                  }`}
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Kannada Script */}
              <div className="text-xl font-bold text-red-700 font-kannada my-1">
                {item.kannada}
              </div>

              {/* Phonetic Pronunciation */}
              <div className="text-sm font-semibold text-slate-800 italic">
                "{item.pronunciation}"
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="text-xs font-medium text-slate-600">
                {item.english}
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {item.meaning}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
