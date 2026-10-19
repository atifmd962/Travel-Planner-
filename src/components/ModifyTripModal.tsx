import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, X, MessageSquare, Send, Check } from 'lucide-react';

interface ModifyTripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyModification: (instruction: string) => void;
  isLoading?: boolean;
}

export const ModifyTripModal: React.FC<ModifyTripModalProps> = ({
  isOpen,
  onClose,
  onApplyModification,
  isLoading
}) => {
  const { t, isKannada } = useLanguage();
  const [instruction, setInstruction] = useState('');

  if (!isOpen) return null;

  const quickOptions = [
    { label: '👑 Upgrade to 5-Star Luxury Resorts', prompt: 'Switch to 5-star luxury resorts and palace hotels' },
    { label: '🚗 Switch to Only Private AC Cab', prompt: 'Use only private cab for all transportation' },
    { label: '🚌 Switch to Only KSRTC Bus', prompt: 'Use only KSRTC bus for all travel' },
    { label: t.quickMod1, prompt: 'Make this ₹2,000 cheaper and switch to budget stays' },
    { label: t.quickMod2, prompt: 'Add more waterfalls and peaceful nature spots' },
    { label: t.quickMod3, prompt: 'Make this trip vegetarian-food friendly' },
    { label: 'Add beaches (Gokarna / Malpe)', prompt: 'Add coastal beaches and sea walk to the trip' },
    { label: 'Make suitable for family & kids', prompt: 'Make this suitable for a family with children and relax pacing' },
    { label: 'Focus on temples & history', prompt: 'I want more historical monuments and ancient temples' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instruction.trim()) return;
    onApplyModification(instruction.trim());
    setInstruction('');
    onClose();
  };

  const handleQuickSelect = (prompt: string) => {
    onApplyModification(prompt);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">{t.modifyModalTitle}</h3>
            <p className="text-xs text-slate-500">{t.modifyModalSubtitle}</p>
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="relative">
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows={3}
              placeholder={t.modifyInputPlaceholder}
              className="w-full px-4 py-3 text-sm rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition resize-none placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={!instruction.trim() || isLoading}
              className="absolute bottom-3 right-3 px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-sm transition active:scale-95"
            >
              <span>{isKannada ? 'ಬದಲಾಯಿಸಿ' : 'Modify'}</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        {/* Quick Suggestions */}
        <div className="mt-6">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2.5">
            {isKannada ? 'ಜನಪ್ರಿಯ ತ್ವರಿತ ಬದಲಾವಣೆಗಳು:' : 'Quick AI Adjustments:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {quickOptions.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleQuickSelect(opt.prompt)}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-amber-100 text-slate-700 hover:text-amber-900 text-xs font-medium border border-slate-200 transition active:scale-95 text-left"
              >
                + {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
