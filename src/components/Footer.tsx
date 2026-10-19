import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { Compass, Sparkles, MapPin, Heart, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'planner' | 'explore' | 'saved' | 'phrases') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { t, isKannada } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 no-print mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="brightness-110">
              <Logo size="lg" showTagline={true} />
            </div>

            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              {t.footerDesc}
            </p>

            <div className="flex items-center space-x-2 text-xs text-amber-500 font-medium">
              <span>💛</span>
              <span>ಕೆಂಪಾಗುವ ಕರ್ನಾಟಕ, ಹಸಿರಾಗುವ ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isKannada ? 'ತ್ವರಿತ ಲಿಂಕ್‌ಗಳು' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigate('planner')}
                  className="hover:text-amber-400 transition"
                >
                  {t.navPlan}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-amber-400 transition"
                >
                  {t.navExplore}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('saved')}
                  className="hover:text-amber-400 transition"
                >
                  {t.navSaved}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('phrases')}
                  className="hover:text-amber-400 transition"
                >
                  {t.navPhrases}
                </button>
              </li>
            </ul>
          </div>

          {/* Popular Destinations Column */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {isKannada ? 'ಪ್ರಮುಖ ಜಿಲ್ಲೆಗಳು' : 'Key Destinations'}
            </h4>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Bengaluru', 'Mysuru', 'Hampi', 'Coorg', 'Chikmagalur', 'Gokarna', 'Udupi', 'Shivamogga'].map((d) => (
                <span
                  key={d}
                  onClick={() => onNavigate('explore')}
                  className="cursor-pointer px-2 py-1 rounded-md bg-slate-800 hover:bg-amber-900/50 hover:text-amber-300 text-slate-400 transition"
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer Note */}
        <div className="p-4 rounded-2xl bg-slate-800/60 border border-slate-700/60 text-[11px] text-slate-400 flex items-start space-x-3">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            {t.footerDisclaimer}
          </p>
        </div>

        {/* Copyright */}
        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} Karnataka AI Travel Planner. {t.allRightsReserved}</span>
          <span className="flex items-center space-x-1">
            <span>Powered by Smart AI & OpenStreetMap</span>
          </span>
        </div>
      </div>
    </footer>
  );
};
