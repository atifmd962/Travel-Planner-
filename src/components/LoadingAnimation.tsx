import React, { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, MapPin, Wallet, Navigation, CheckCircle } from 'lucide-react';

interface LoadingAnimationProps {
  onComplete?: () => void;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = () => {
  const { isKannada } = useLanguage();
  const [stepIndex, setStepIndex] = useState(0);

  const stepsEn = [
    { text: '🤖 Planning your perfect Karnataka trip...', icon: Sparkles },
    { text: '📍 Finding destinations & hidden spots...', icon: MapPin },
    { text: '💰 Optimizing your budget against real transport & stay costs...', icon: Wallet },
    { text: '🗺️ Building your scenic route across Karnataka...', icon: Navigation },
    { text: '✨ Finalizing your personalized itinerary...', icon: CheckCircle }
  ];

  const stepsKn = [
    { text: '🤖 ನಿಮಗಾಗಿ ಅದ್ಭುತ ಕರ್ನಾಟಕ ಪ್ರವಾಸ ಯೋಜಿಸಲಾಗುತ್ತಿದೆ...', icon: Sparkles },
    { text: '📍 ಅತ್ಯುತ್ತಮ ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳನ್ನು ಆಯ್ಕೆ ಮಾಡಲಾಗುತ್ತಿದೆ...', icon: MapPin },
    { text: '💰 ನಿಮ್ಮ ಬಜೆಟ್‌ಗೆ ತಕ್ಕಂತೆ ವೆಚ್ಚಗಳನ್ನು ಸರಿಹೊಂದಿಸಲಾಗುತ್ತಿದೆ...', icon: Wallet },
    { text: '🗺️ ಸುಲಭ ಮತ್ತು ಸುಂದರ ಪ್ರವಾಸ ಮಾರ್ಗ ರೂಪಿಸಲಾಗುತ್ತಿದೆ...', icon: Navigation },
    { text: '✨ ನಿಮ್ಮ ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿಯನ್ನು ಅಂತಿಮಗೊಳಿಸಲಾಗುತ್ತಿದೆ...', icon: CheckCircle }
  ];

  const steps = isKannada ? stepsKn : stepsEn;

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600);

    return () => clearInterval(timer);
  }, [steps.length]);

  const CurrentIcon = steps[stepIndex].icon;

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200/80 max-w-lg mx-auto text-center animate-fade-in my-8">
      {/* Animated Orb */}
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-red-600 animate-ping opacity-25" />
        <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
          <CurrentIcon className="w-9 h-9 animate-bounce" />
        </div>
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        {isKannada ? 'AI ಪ್ರವಾಸ ವೇಳಾಪಟ್ಟಿ ತಯಾರಾಗುತ್ತಿದೆ' : 'AI is Crafting Your Itinerary'}
      </h3>

      <p className="text-amber-700 font-semibold text-sm min-h-[40px] flex items-center justify-center transition-all duration-300">
        {steps[stepIndex].text}
      </p>

      {/* Progress Bars */}
      <div className="flex justify-center space-x-2 mt-6">
        {steps.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i <= stepIndex ? 'w-8 bg-amber-600' : 'w-2 bg-slate-200'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
