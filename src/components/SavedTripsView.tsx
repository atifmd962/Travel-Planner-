import React from 'react';
import { TripItinerary } from '../types/travel';
import { useLanguage } from '../context/LanguageContext';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  Calendar, 
  Wallet, 
  MapPin, 
  Compass, 
  Users 
} from 'lucide-react';

interface SavedTripsViewProps {
  savedTrips: TripItinerary[];
  onOpenTrip: (trip: TripItinerary) => void;
  onDeleteTrip: (id: string) => void;
  onNavigateToPlan: () => void;
}

export const SavedTripsView: React.FC<SavedTripsViewProps> = ({
  savedTrips,
  onOpenTrip,
  onDeleteTrip,
  onNavigateToPlan
}) => {
  const { isKannada } = useLanguage();

  if (savedTrips.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center max-w-lg mx-auto border border-slate-200/80 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4">
          <Bookmark className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {isKannada ? 'ಯಾವುದೇ ಪ್ರವಾಸಗಳನ್ನು ಉಳಿಸಿಲ್ಲ' : 'No Saved Trips Yet'}
        </h3>
        <p className="text-xs text-slate-500 mb-6 leading-relaxed">
          {isKannada 
            ? 'ನಿಮ್ಮ ಮೊದಲ ಕರ್ನಾಟಕ ಪ್ರವಾಸವನ್ನು AI ಮೂಲಕ ರೂಪಿಸಿ ಮತ್ತು ನಂತರ ವೀಕ್ಷಿಸಲು ಇಲ್ಲಿ ಉಳಿಸಿಕೊಳ್ಳಿ.' 
            : 'Generate your first Karnataka itinerary using AI and save it to review anytime.'}
        </p>
        <button
          onClick={onNavigateToPlan}
          className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition"
        >
          {isKannada ? 'ಪ್ರವಾಸ ಯೋಜಿಸಲು ಆರಂಭಿಸಿ' : 'Start Planning a Trip'}
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {isKannada ? 'ಉಳಿಸಿದ ಪ್ರವಾಸಗಳು' : 'Your Saved Trips'}
          </h2>
          <p className="text-xs text-slate-500">
            {savedTrips.length} {isKannada ? 'ಪ್ರವಾಸಗಳು ನಿಮ್ಮ ಸಾಧನದಲ್ಲಿ ಉಳಿದಿವೆ' : 'itinerary plans stored in your browser'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedTrips.map((trip) => (
          <div
            key={trip.id}
            className="bg-white/95 rounded-3xl p-6 border border-amber-200/70 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group backdrop-blur-md"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold uppercase tracking-wider">
                  {trip.durationDays} Days • {trip.travelStyle}
                </span>

                <button
                  onClick={() => onDeleteTrip(trip.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                  title="Delete trip"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-amber-700 transition">
                {isKannada ? trip.titleKn : trip.title}
              </h3>

              {(trip.formattedDateRange || trip.formattedDateRangeKn) && (
                <div className="flex items-center space-x-1.5 text-xs font-bold text-amber-700 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{isKannada ? trip.formattedDateRangeKn || trip.formattedDateRange : trip.formattedDateRange}</span>
                </div>
              )}

              <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span className="truncate">{trip.destinations.join(' → ')}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs py-3 border-y border-slate-100">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">User Budget</span>
                  <span className="font-bold text-slate-800">₹{trip.userBudget.toLocaleString('en-IN')}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Est. Cost</span>
                  <span className="font-bold text-emerald-700">₹{trip.budget.totalEstimatedCost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-2 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">
                Saved {new Date(trip.createdAt).toLocaleDateString()}
              </span>

              <button
                onClick={() => onOpenTrip(trip)}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-sm transition flex items-center space-x-1.5 group-hover:translate-x-0.5"
              >
                <span>{isKannada ? 'ವೀಕ್ಷಿಸಿ' : 'View Itinerary'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
