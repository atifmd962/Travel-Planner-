import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = true }) => {
  const { isKannada } = useLanguage();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className="flex items-center space-x-3 group">
      {/* Custom Designed Karnataka AI Emblem */}
      <div className={`${iconSizes[size]} relative shrink-0 transition-transform duration-300 group-hover:scale-105`}>
        {/* Glow backdrop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 blur-sm opacity-60 group-hover:opacity-90 transition-opacity" />

        {/* Outer shield badge */}
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-amber-950 via-slate-900 to-red-950 p-1 border border-amber-400/40 shadow-lg flex items-center justify-center overflow-hidden">
          {/* Karnataka Flag Dual-Tone Subtle Accent */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-red-600/30 blur-md pointer-events-none" />
          <div className="absolute -bottom-3 -left-3 w-8 h-8 rounded-full bg-amber-400/30 blur-md pointer-events-none" />

          {/* Custom SVG Icon: Hampi Stone Chariot + Compass Star + Western Ghats Peaks */}
          <svg
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
          >
            {/* Mountain Ridge Background (Western Ghats) */}
            <path
              d="M6 31L16 17L23 26L30 18L36 31H6Z"
              fill="url(#ghatsGradient)"
              opacity="0.4"
            />

            {/* Hampi Stone Chariot Silhouette Base & Pillars */}
            <rect x="13" y="27" width="14" height="3" rx="1" fill="#FDE047" />
            <rect x="14" y="22" width="12" height="5" rx="0.5" fill="#FACC15" />
            
            {/* Chariot Stone Wheels */}
            <circle cx="15.5" cy="29" r="2.5" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
            <circle cx="24.5" cy="29" r="2.5" fill="#B91C1C" stroke="#FDE047" strokeWidth="1" />
            
            {/* Chariot Dome / Gopura */}
            <path
              d="M17 22L20 16L23 22H17Z"
              fill="#FDE047"
            />
            <path
              d="M18.5 16L20 13L21.5 16H18.5Z"
              fill="#F59E0B"
            />
            {/* Kalasa Top */}
            <circle cx="20" cy="12" r="1.2" fill="#FEF08A" />

            {/* AI Compass Sparkle (Top Right) */}
            <path
              d="M29 6L30.5 10L34.5 11.5L30.5 13L29 17L27.5 13L23.5 11.5L27.5 10L29 6Z"
              fill="url(#sparkleGradient)"
              className="animate-pulse"
            />

            {/* Gradients */}
            <defs>
              <linearGradient id="ghatsGradient" x1="6" y1="17" x2="36" y2="31" gradientUnits="userSpaceOnUse">
                <stop stopColor="#059669" />
                <stop offset="1" stopColor="#047857" />
              </linearGradient>
              <linearGradient id="sparkleGradient" x1="23.5" y1="6" x2="34.5" y2="17" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FEF08A" />
                <stop offset="0.5" stopColor="#F59E0B" />
                <stop offset="1" stopColor="#DC2626" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>

      {/* Brand Name Typography */}
      <div>
        <div className="flex items-center space-x-1.5">
          <span className="text-lg font-black tracking-tight text-slate-900 group-hover:text-amber-800 transition-colors">
            Karnataka
          </span>
          <span className="px-1.5 py-0.5 rounded-md bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
            AI
          </span>
        </div>
        {showTagline && (
          <p className="text-[10px] font-semibold text-amber-700 font-kannada -mt-0.5">
            {isKannada ? 'ಕರ್ನಾಟಕ AI ಪ್ರವಾಸ ಯೋಜನೆ' : 'AI Travel Planner'}
          </p>
        )}
      </div>
    </div>
  );
};
