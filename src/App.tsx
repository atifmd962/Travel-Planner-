import React, { useState, useEffect } from 'react';
import { TripItinerary, TravelMode, TravelStyle } from './types/travel';
import { 
  generateLocalItinerary, 
  parseNaturalLanguageQuery, 
  modifyItinerary 
} from './services/aiPlannerService';
import { optimizeTripBudget } from './services/budgetOptimizer';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { AIPlannerForm } from './components/AIPlannerForm';
import { ItineraryView } from './components/ItineraryView';
import { DestinationExplorer } from './components/DestinationExplorer';
import { KannadaPhrases } from './components/KannadaPhrases';
import { SavedTripsView } from './components/SavedTripsView';
import { AIChatDrawer } from './components/AIChatDrawer';
import { LoadingAnimation } from './components/LoadingAnimation';
import { Sparkles, CheckCircle2, ArrowLeft } from 'lucide-react';

function MainApp() {
  const { t, isKannada } = useLanguage();
  const [currentPage, setCurrentPage] = useState<'home' | 'planner' | 'explore' | 'saved' | 'phrases'>('home');
  const [currentItinerary, setCurrentItinerary] = useState<TripItinerary | null>(null);
  const [savedTrips, setSavedTrips] = useState<TripItinerary[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [prefilledPrompt, setPrefilledPrompt] = useState<string>('');

  // Load saved trips from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('karnataka_saved_trips');
    if (stored) {
      try {
        setSavedTrips(JSON.parse(stored));
      } catch {
        // ignore parse error
      }
    }
  }, []);

  // Save trips to localStorage
  const handleSaveTrip = (trip: TripItinerary) => {
    const exists = savedTrips.some(t => t.id === trip.id);
    let updated: TripItinerary[];
    if (exists) {
      updated = savedTrips.map(t => t.id === trip.id ? trip : t);
    } else {
      updated = [trip, ...savedTrips];
    }
    setSavedTrips(updated);
    localStorage.setItem('karnataka_saved_trips', JSON.stringify(updated));
    showToast(isKannada ? 'ಪ್ರವಾಸ ಯಶಸ್ವಿಯಾಗಿ ಉಳಿಸಲಾಗಿದೆ!' : 'Trip itinerary saved successfully!', 'success');
  };

  const handleDeleteSavedTrip = (id: string) => {
    const updated = savedTrips.filter(t => t.id !== id);
    setSavedTrips(updated);
    localStorage.setItem('karnataka_saved_trips', JSON.stringify(updated));
    showToast(isKannada ? 'ಪ್ರವಾಸ ತೆಗೆದುಹಾಕಲಾಗಿದೆ' : 'Trip removed from saved list', 'info');
  };

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  // Generate Trip via Natural Language
  const handleNaturalGenerate = (prompt: string) => {
    setIsGenerating(true);
    setCurrentPage('planner');

    setTimeout(() => {
      const extracted = parseNaturalLanguageQuery(prompt);
      const itinerary = generateLocalItinerary(extracted);

      setCurrentItinerary(itinerary);
      setIsGenerating(false);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      showToast(isKannada ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧವಾಗಿದೆ!' : 'AI generated your personalized Karnataka itinerary!', 'success');
    }, 1800);
  };

  // Generate Trip via Structured Form
  const handleStructuredGenerate = (params: {
    startingLocation: string;
    durationDays: number;
    startDate?: string;
    budget: number;
    travellersCount: number;
    travelStyle: TravelStyle;
    travelMode: TravelMode;
    interests: string[];
  }) => {
    setIsGenerating(true);
    setCurrentPage('planner');

    setTimeout(() => {
      const itinerary = generateLocalItinerary(params);
      setCurrentItinerary(itinerary);
      setIsGenerating(false);
      window.scrollTo({ top: 300, behavior: 'smooth' });
      showToast(isKannada ? 'ನಿಮ್ಮ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ ಸಿದ್ಧವಾಗಿದೆ!' : 'Itinerary generated successfully!', 'success');
    }, 1500);
  };

  // Modify Trip with AI
  const handleModifyTrip = (instruction: string) => {
    if (!currentItinerary) return;
    setIsGenerating(true);

    setTimeout(() => {
      const { updatedItinerary, explanation } = modifyItinerary(currentItinerary, instruction);
      setCurrentItinerary(updatedItinerary);
      setIsGenerating(false);
      showToast(explanation, 'info');
    }, 1200);
  };

  // Optimize Budget
  const handleOptimizeBudget = () => {
    if (!currentItinerary) return;
    setIsGenerating(true);

    setTimeout(() => {
      const optimized = optimizeTripBudget(currentItinerary);
      setCurrentItinerary(optimized);
      setIsGenerating(false);
      showToast(
        isKannada 
          ? 'ಪ್ರವಾಸ ಬಜೆಟ್ ಆಪ್ಟಿಮೈಸ್ ಆಗಿದೆ! ಸಾರಿಗೆ ಮತ್ತು ವಾಸ್ತವ್ಯ ಸರಿಹೊಂದಿಸಲಾಗಿದೆ.' 
          : 'Trip budget optimized to fit your target budget!',
        'success'
      );
    }, 1000);
  };

  // Handle destination selection from Explorer or Hero
  const handleSelectDestinationForPlan = (destinationName: string) => {
    setPrefilledPrompt(`I want to plan a 4-day trip to ${destinationName} with ₹6,000 budget. I love local food and nature.`);
    setCurrentPage('planner');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open saved trip in planner
  const handleOpenSavedTrip = (trip: TripItinerary) => {
    setCurrentItinerary(trip);
    setCurrentPage('planner');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-slate-900 font-sans selection:bg-amber-500 selection:text-white relative overflow-x-hidden">
      {/* Dynamic warm light background mesh & subtle tactile dot grid */}
      <div className="fixed inset-0 pointer-events-none -z-20 karnataka-light-bg" />
      <div className="fixed inset-0 pointer-events-none -z-10 karnataka-dot-grid opacity-70" />

      {/* Radiant ambient glow orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[34rem] bg-gradient-to-b from-amber-400/20 via-orange-300/10 to-transparent blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-96 -left-40 w-96 h-96 bg-amber-400/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-[48rem] -right-40 w-96 h-96 bg-emerald-500/8 rounded-full blur-[110px] pointer-events-none -z-10" />

      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-24 right-4 z-50 max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-start space-x-3 animate-slide-up">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm font-medium leading-relaxed">{notification.message}</div>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        activePage={currentPage}
        onNavigate={setCurrentPage}
        onOpenAssistant={() => setIsAssistantOpen(true)}
        savedTripsCount={savedTrips.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
        {/* Loading Spinner */}
        {isGenerating && <LoadingAnimation />}

        {/* 1. HOME / LANDING PAGE */}
        {!isGenerating && currentPage === 'home' && (
          <Hero
            onQuickGenerate={handleNaturalGenerate}
            onExploreClick={() => setCurrentPage('explore')}
            onDestinationCardClick={handleSelectDestinationForPlan}
          />
        )}

        {/* 2. AI TRIP PLANNER PAGE */}
        {!isGenerating && currentPage === 'planner' && (
          <div className="space-y-10">
            {/* Page Header */}
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                {isKannada ? 'ಸ್ಮಾರ್ಟ್ ಟ್ರಾವೆಲ್ ಪ್ಲಾನರ್' : 'AI Trip Planner'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {t.plannerTitle}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                {t.plannerSubtitle}
              </p>
            </div>

            {/* Input Form */}
            <AIPlannerForm
              onGenerateNatural={handleNaturalGenerate}
              onGenerateStructured={handleStructuredGenerate}
              isLoading={isGenerating}
              initialPrompt={prefilledPrompt}
            />

            {/* Generated Itinerary Display */}
            {currentItinerary && (
              <div id="itinerary-results" className="pt-8">
                <ItineraryView
                  itinerary={currentItinerary}
                  onModifyTrip={handleModifyTrip}
                  onOptimizeBudget={handleOptimizeBudget}
                  onSaveTrip={handleSaveTrip}
                  isSaved={savedTrips.some(t => t.id === currentItinerary.id)}
                />
              </div>
            )}
          </div>
        )}

        {/* 3. DESTINATION EXPLORER PAGE */}
        {!isGenerating && currentPage === 'explore' && (
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider">
                {isKannada ? 'ಕರ್ನಾಟಕ ದರ್ಶನ' : 'Explore Karnataka'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                {isKannada ? 'ಕರ್ನಾಟಕದ ಅದ್ಭುತ ಪ್ರೇಕ್ಷಣೀಯ ತಾಣಗಳು' : 'Discover the Jewels of Karnataka'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                {isKannada 
                  ? 'ಕರಾವಳಿಯ ಮರಳಿನಿಂದ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳ ಹಸಿರು ಕಾಡು ಮತ್ತು ಹಂಪಿಯ ಐತಿಹಾಸಿಕ ಶಿಲ್ಪಕಲೆಯವರೆಗೆ' 
                  : 'From pristine Arabian Sea beaches to mist-draped Western Ghats and historic UNESCO ruins.'}
              </p>
            </div>

            <DestinationExplorer
              onSelectDestinationForPlan={handleSelectDestinationForPlan}
            />
          </div>
        )}

        {/* 4. SAVED TRIPS PAGE */}
        {!isGenerating && currentPage === 'saved' && (
          <SavedTripsView
            savedTrips={savedTrips}
            onOpenTrip={handleOpenSavedTrip}
            onDeleteTrip={handleDeleteSavedTrip}
            onNavigateToPlan={() => setCurrentPage('planner')}
          />
        )}

        {/* 5. KANNADA PHRASES PAGE */}
        {!isGenerating && currentPage === 'phrases' && (
          <div className="space-y-8">
            <KannadaPhrases />
          </div>
        )}
      </main>

      {/* Floating AI Assistant Drawer */}
      <AIChatDrawer
        isOpen={isAssistantOpen}
        onClose={() => setIsAssistantOpen(false)}
        onPlanTripFromChat={(query) => {
          setIsAssistantOpen(false);
          handleNaturalGenerate(query);
        }}
      />

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
}

export function App() {
  return (
    <LanguageProvider>
      <MainApp />
    </LanguageProvider>
  );
}

export default App;
