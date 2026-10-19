import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import { 
  Compass, 
  MapPin, 
  Sparkles, 
  Bookmark, 
  Languages, 
  Bot, 
  Menu, 
  X, 
  BookOpen
} from 'lucide-react';

interface NavbarProps {
  activePage: 'home' | 'planner' | 'explore' | 'saved' | 'phrases';
  onNavigate: (page: 'home' | 'planner' | 'explore' | 'saved' | 'phrases') => void;
  onOpenAssistant: () => void;
  savedTripsCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  onOpenAssistant,
  savedTripsCount = 0
}) => {
  const { language, toggleLanguage, t, isKannada } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t.navHome, icon: Compass },
    { id: 'planner', label: t.navPlan, icon: Sparkles },
    { id: 'explore', label: t.navExplore, icon: MapPin },
    { id: 'saved', label: t.navSaved, icon: Bookmark, badge: savedTripsCount > 0 ? savedTripsCount : null },
    { id: 'phrases', label: t.navPhrases, icon: BookOpen }
  ];

  const handleNavClick = (id: 'home' | 'planner' | 'explore' | 'saved' | 'phrases') => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/90 backdrop-blur-xl border-b border-amber-900/10 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left"
        >
          <Logo size="md" showTagline={true} />
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1.5 bg-amber-100/60 p-1.5 rounded-2xl border border-amber-200/70">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as any)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                  isActive
                    ? 'bg-white text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-300/80'
                    : 'text-slate-700 hover:text-amber-950 hover:bg-white/70'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-amber-600' : 'text-slate-500'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 rounded-full bg-amber-600 text-white text-[10px] font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Actions: Language Switcher & AI Assistant Button */}
        <div className="hidden md:flex items-center space-x-3">
          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            className="px-3.5 py-2 rounded-2xl border border-slate-200/80 hover:border-amber-400 text-slate-700 text-xs font-bold transition flex items-center space-x-2 bg-white shadow-2xs hover:bg-amber-50/50"
            title="Switch Language (English / ಕನ್ನಡ)"
          >
            <Languages className="w-3.5 h-3.5 text-amber-600" />
            <span className={language === 'en' ? 'font-bold text-slate-900' : 'text-slate-400'}>EN</span>
            <span className="text-slate-300">|</span>
            <span className={language === 'kn' ? 'font-bold font-kannada text-amber-700' : 'text-slate-400 font-kannada'}>ಕನ್ನಡ</span>
          </button>

          {/* Assistant Trigger */}
          <button
            onClick={onOpenAssistant}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-500 text-slate-950 text-xs font-black shadow-md shadow-amber-500/25 transition flex items-center space-x-2 active:scale-95"
          >
            <Bot className="w-4 h-4 text-slate-950" />
            <span>{t.assistantBtn}</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <button
            onClick={toggleLanguage}
            className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-xs font-bold bg-slate-50"
          >
            {language === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white p-4 space-y-2 animate-fade-in">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id as any)}
                className={`w-full p-3 rounded-2xl text-left text-sm font-bold flex items-center justify-between ${
                  isActive
                    ? 'bg-amber-50 text-amber-900 font-extrabold'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4 text-amber-600" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="px-2 py-0.5 rounded-full bg-amber-600 text-white text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAssistant();
              }}
              className="w-full py-3 rounded-2xl bg-amber-600 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-sm"
            >
              <Bot className="w-4 h-4" />
              <span>{t.assistantBtn}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
