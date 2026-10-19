import React, { useState } from 'react';
import { TripItinerary } from '../types/travel';
import { useLanguage } from '../context/LanguageContext';
import { BudgetCard } from './BudgetCard';
import { InteractiveMap } from './InteractiveMap';
import { WeatherWidget } from './WeatherWidget';
import { ModifyTripModal } from './ModifyTripModal';
import { 
  Calendar, 
  MapPin, 
  Wallet, 
  Users, 
  Compass, 
  Clock, 
  Sparkles, 
  Share2, 
  Bookmark, 
  Printer, 
  Download, 
  Check, 
  MessageSquare, 
  Navigation,
  Utensils,
  Hotel,
  Ticket,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ItineraryViewProps {
  itinerary: TripItinerary;
  onModifyTrip: (instruction: string) => void;
  onOptimizeBudget: () => void;
  onSaveTrip: (trip: TripItinerary) => void;
  isSaved?: boolean;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({
  itinerary,
  onModifyTrip,
  onOptimizeBudget,
  onSaveTrip,
  isSaved = false
}) => {
  const { t, isKannada } = useLanguage();
  const [activeTab, setActiveTab] = useState<'timeline' | 'map' | 'budget' | 'weather'>('timeline');
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const [copySuccess, setCopySuccess] = useState(false);

  const toggleDay = (dayNum: number) => {
    if (expandedDays.includes(dayNum)) {
      setExpandedDays(expandedDays.filter(d => d !== dayNum));
    } else {
      setExpandedDays([...expandedDays, dayNum]);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: itinerary.title,
        text: `Check out my Karnataka travel itinerary: ${itinerary.title} (Budget: ₹${itinerary.userBudget})!`,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    }
  };

  const handleSave = () => {
    onSaveTrip(itinerary);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Top Hero Summary Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden border border-amber-500/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <span className="px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold tracking-wide uppercase">
              {isKannada ? 'ವೈಯಕ್ತಿಕ AI ಪ್ರವಾಸ ಯೋಜನೆ' : 'Personalized AI Itinerary'}
            </span>

            <div className="flex items-center space-x-2 no-print">
              <button
                onClick={handleSave}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition active:scale-95 ${
                  isSaved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {isSaved ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isSaved ? t.savedTripSuccess : t.saveTripBtn}</span>
              </button>

              <button
                onClick={handleShare}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center space-x-1.5 transition active:scale-95"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copySuccess ? (isKannada ? 'ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ!' : 'Copied!') : t.shareTripBtn}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold flex items-center space-x-1.5 transition active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.printTripBtn}</span>
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
            {isKannada ? itinerary.titleKn : itinerary.title}
          </h2>
          <p className="text-amber-200/90 text-sm sm:text-base font-medium max-w-2xl mb-5">
            {isKannada ? itinerary.summaryKn : itinerary.summary}
          </p>

          {/* Date Range & Route Highlight Banner */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            {(itinerary.formattedDateRange || itinerary.formattedDateRangeKn) && (
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-amber-500/25 to-amber-600/20 border border-amber-400/40 text-amber-300 px-4 py-2 rounded-2xl text-xs sm:text-sm font-black shadow-sm">
                <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  {isKannada 
                    ? itinerary.formattedDateRangeKn || itinerary.formattedDateRange 
                    : itinerary.formattedDateRange}
                </span>
              </div>
            )}
            <div className="inline-flex items-center space-x-2 bg-white/10 border border-white/15 text-slate-200 px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{itinerary.destinations.join(' → ')}</span>
            </div>
          </div>

          {/* Quick Stat Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-6 border-t border-white/10 text-xs">
            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.durationLabel}</span>
              <span className="font-extrabold text-amber-300 text-base">{itinerary.durationDays} Days</span>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.budgetLabel}</span>
              <span className="font-extrabold text-emerald-400 text-base">₹{itinerary.userBudget.toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.estimatedTotal}</span>
              <span className="font-extrabold text-amber-400 text-base">₹{itinerary.budget.totalEstimatedCost.toLocaleString('en-IN')}</span>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{isKannada ? 'ಬ್ಯಾಲೆನ್ಸ್' : 'Remaining'}</span>
              <span className={`font-extrabold text-base ${itinerary.budget.isOverBudget ? 'text-red-400' : 'text-emerald-300'}`}>
                {itinerary.budget.isOverBudget
                  ? `-₹${itinerary.budget.overBudgetAmount.toLocaleString('en-IN')}`
                  : `+₹${itinerary.budget.remaining.toLocaleString('en-IN')}`}
              </span>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.travellersLabel}</span>
              <span className="font-extrabold text-white text-base">{itinerary.travellersCount} Person(s)</span>
            </div>

            <div className="bg-white/5 p-3 rounded-2xl border border-white/5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">{t.travelStyleLabel}</span>
              <span className="font-extrabold text-amber-200 text-base capitalize">{itinerary.travelStyle}</span>
            </div>
          </div>

          {/* AI Modification & Optimization Trigger Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 no-print">
            <button
              onClick={() => setIsModifyModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition flex items-center space-x-2 active:scale-95"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.modifyTripBtn}</span>
            </button>

            {itinerary.budget.isOverBudget && (
              <button
                onClick={onOptimizeBudget}
                className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 transition flex items-center space-x-2 active:scale-95 animate-pulse"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.optimizeTripBtn}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-2 overflow-x-auto no-print">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center space-x-2 ${
            activeTab === 'timeline'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>{t.itineraryTimelineTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('map')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center space-x-2 ${
            activeTab === 'map'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Navigation className="w-4 h-4" />
          <span>{t.interactiveMapTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('budget')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center space-x-2 ${
            activeTab === 'budget'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Wallet className="w-4 h-4" />
          <span>{t.budgetBreakdownTab}</span>
        </button>

        <button
          onClick={() => setActiveTab('weather')}
          className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition flex items-center space-x-2 ${
            activeTab === 'weather'
              ? 'border-amber-600 text-amber-700'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{t.weatherForecastTab}</span>
        </button>
      </div>

      {/* TAB CONTENT */}

      {/* 1. TIMELINE OF DAYS */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {itinerary.days.map((day) => {
            const isExpanded = expandedDays.includes(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                className="bg-white/95 rounded-3xl border border-amber-200/80 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-amber-300"
              >
                {/* Day Header */}
                <div
                  onClick={() => toggleDay(day.dayNumber)}
                  className="p-5 sm:p-6 bg-gradient-to-r from-amber-50/70 via-amber-50/30 to-white hover:bg-amber-100/50 cursor-pointer flex items-center justify-between transition border-b border-amber-100/80"
                >
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-500 text-white font-extrabold flex items-center justify-center text-sm shadow-md shadow-amber-500/20 shrink-0">
                      D{day.dayNumber}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base sm:text-lg font-bold text-slate-900">
                          {isKannada ? day.titleKn || day.title : day.title}
                        </h3>
                        {(day.date || day.dateKn) && (
                          <span className="inline-flex items-center text-xs font-black text-amber-800 bg-amber-100/90 px-2.5 py-0.5 rounded-full border border-amber-300 shadow-xs">
                            <Calendar className="w-3 h-3 mr-1 text-amber-700" />
                            {isKannada ? day.dateKn || day.date : day.date}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span>{day.fromLocation} → {day.toLocation}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right hidden sm:block">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Day Cost</span>
                      <span className="text-sm font-extrabold text-emerald-700">₹{day.estimatedDayCost.toLocaleString('en-IN')}</span>
                    </div>

                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-700 transition">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Day Activities List */}
                {isExpanded && (
                  <div className="p-5 sm:p-8 space-y-4">
                    <div className="relative border-l-2 border-amber-200 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-6">
                      {day.activities.map((act) => {
                        let IconComponent = Navigation;
                        if (act.type === 'food') IconComponent = Utensils;
                        else if (act.type === 'hotel') IconComponent = Hotel;
                        else if (act.type === 'attraction') IconComponent = Ticket;

                        return (
                          <div key={act.id} className="relative group">
                            {/* Dot */}
                            <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center text-[10px] font-bold text-amber-700 shadow-sm">
                              •
                            </span>

                            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/40 border border-amber-200/60 hover:border-amber-400 hover:bg-white hover:shadow-md transition">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md flex items-center space-x-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{act.time}</span>
                                  </span>
                                  <span className="text-xs font-bold text-slate-800">
                                    {isKannada ? act.placeKn || act.place : act.place}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-3 text-xs">
                                  {act.travelDistanceKm && (
                                    <span className="text-slate-500 font-medium">
                                      🛣️ {act.travelDistanceKm} km
                                    </span>
                                  )}
                                  <span className="text-slate-500 font-medium">
                                    ⏳ {act.durationHours} hrs
                                  </span>
                                  <span className="font-extrabold text-emerald-700">
                                    {act.isFree ? 'Free' : `₹${act.estimatedCost}`}
                                  </span>
                                </div>
                              </div>

                              <h4 className="text-sm font-bold text-slate-900 mb-1">
                                {isKannada ? act.titleKn || act.title : act.title}
                              </h4>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                {isKannada ? act.descriptionKn || act.description : act.description}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 2. INTERACTIVE MAP */}
      {activeTab === 'map' && (
        <div className="space-y-4">
          <InteractiveMap itinerary={itinerary} />
        </div>
      )}

      {/* 3. BUDGET CARD */}
      {activeTab === 'budget' && (
        <BudgetCard
          budget={itinerary.budget}
          onOptimize={onOptimizeBudget}
          isOptimized={itinerary.isOptimized}
        />
      )}

      {/* 4. WEATHER FORECAST */}
      {activeTab === 'weather' && (
        <WeatherWidget destinations={itinerary.destinations} />
      )}

      {/* Modify Trip Modal */}
      <ModifyTripModal
        isOpen={isModifyModalOpen}
        onClose={() => setIsModifyModalOpen(false)}
        onApplyModification={onModifyTrip}
      />
    </div>
  );
};
