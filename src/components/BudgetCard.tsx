import React from 'react';
import { BudgetBreakdown } from '../types/travel';
import { useLanguage } from '../context/LanguageContext';
import { 
  Wallet, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  Bus, 
  Hotel, 
  UtensilsCrossed, 
  Ticket, 
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

interface BudgetCardProps {
  budget: BudgetBreakdown;
  onOptimize?: () => void;
  isOptimized?: boolean;
}

export const BudgetCard: React.FC<BudgetCardProps> = ({ budget, onOptimize, isOptimized }) => {
  const { t, isKannada } = useLanguage();

  const percentUsed = Math.min(100, Math.round((budget.totalEstimatedCost / budget.userBudget) * 100));
  const isOver = budget.isOverBudget;

  const categories = [
    {
      name: t.transportation,
      amount: budget.transportation,
      icon: Bus,
      color: 'bg-blue-500',
      lightBg: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      name: t.accommodation,
      amount: budget.accommodation,
      icon: Hotel,
      color: 'bg-purple-500',
      lightBg: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      name: t.food,
      amount: budget.food,
      icon: UtensilsCrossed,
      color: 'bg-amber-500',
      lightBg: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      name: t.activities,
      amount: budget.activities,
      icon: Ticket,
      color: 'bg-emerald-500',
      lightBg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    },
    {
      name: t.miscellaneous,
      amount: budget.miscellaneous,
      icon: Wallet,
      color: 'bg-slate-500',
      lightBg: 'bg-slate-50 text-slate-700 border-slate-200'
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-sm border border-amber-200/80 hover:shadow-md transition">
      {/* Top Banner & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Wallet className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              {isKannada ? 'ಸ್ಮಾರ್ಟ್ ಬಜೆಟ್ ವಿಶ್ಲೇಷಣೆ' : 'Smart Budget Calculator'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {isKannada ? 'ಕರ್ನಾಟಕದ ವಾಸ್ತವಿಕ ದರಗಳ ಆಧಾರದಲ್ಲಿ ಅಂದಾಜಿಸಲಾಗಿದೆ' : 'Calculated against real Karnataka transport & living costs'}
          </p>
        </div>

        {/* Status Badge */}
        {isOver ? (
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-200 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>₹{budget.overBudgetAmount.toLocaleString('en-IN')} {isKannada ? 'ಹೆಚ್ಚುವರಿ ಖರ್ಚು' : 'Over Budget'}</span>
          </div>
        ) : (
          <div className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>₹{budget.remaining.toLocaleString('en-IN')} {isKannada ? 'ಉಳಿಕೆ' : 'Remaining'}</span>
          </div>
        )}
      </div>

      {/* Main Numbers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
          <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{t.totalBudget}</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">
            ₹{budget.userBudget.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-100">
          <span className="text-xs font-medium text-amber-800 uppercase tracking-wider">{t.estimatedCost}</span>
          <div className="text-2xl font-extrabold text-amber-900 mt-1">
            ₹{budget.totalEstimatedCost.toLocaleString('en-IN')}
          </div>
        </div>

        <div className={`p-4 rounded-2xl border ${isOver ? 'bg-red-50/80 border-red-100' : 'bg-emerald-50/80 border-emerald-100'}`}>
          <span className={`text-xs font-medium uppercase tracking-wider ${isOver ? 'text-red-700' : 'text-emerald-700'}`}>
            {isOver ? (isKannada ? 'ಕೊರತೆ ಮೊತ್ತ' : 'Budget Deficit') : (isKannada ? 'ಬ್ಯಾಲೆನ್ಸ್ ಉಳಿಕೆ' : 'Budget Surplus')}
          </span>
          <div className={`text-2xl font-extrabold mt-1 ${isOver ? 'text-red-800' : 'text-emerald-800'}`}>
            {isOver ? `-₹${budget.overBudgetAmount.toLocaleString('en-IN')}` : `+₹${budget.remaining.toLocaleString('en-IN')}`}
          </div>
        </div>
      </div>

      {/* Visual Budget Progress Bar */}
      <div className="space-y-2 mb-8">
        <div className="flex justify-between text-xs font-semibold text-slate-600">
          <span>{isKannada ? 'ಬಜೆಟ್ ಬಳಕೆ ಪ್ರಮಾಣ' : 'Budget Utilized'}</span>
          <span className={percentUsed > 100 ? 'text-red-600' : 'text-emerald-600'}>{percentUsed}%</span>
        </div>
        <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden flex">
          {categories.map((cat, idx) => {
            const share = (cat.amount / budget.userBudget) * 100;
            return (
              <div
                key={idx}
                style={{ width: `${Math.min(100, share)}%` }}
                className={`${cat.color} transition-all duration-500`}
                title={`${cat.name}: ₹${cat.amount}`}
              />
            );
          })}
        </div>
      </div>

      {/* Category Breakdown Chips */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
              <div className="flex items-center space-x-2.5">
                <div className={`p-1.5 rounded-lg ${cat.lightBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-medium text-slate-700 truncate max-w-[140px]">{cat.name}</span>
              </div>
              <span className="text-xs font-bold text-slate-900">₹{cat.amount.toLocaleString('en-IN')}</span>
            </div>
          );
        })}
      </div>

      {/* Over Budget or Tight Alert & Optimize Action */}
      {isOver && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/90 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start space-x-3">
            <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-amber-900">
                {isKannada ? 'ಬಜೆಟ್‌ಗಿಂತ ಹೆಚ್ಚು ವೆಚ್ಚವಾಗುತ್ತಿದೆ' : 'Trip exceeds your specified budget'}
              </h4>
              <p className="text-xs text-amber-800 mt-0.5">
                {isKannada 
                  ? `ಈ ಪ್ರವಾಸವು ನಿಮ್ಮ ₹${budget.userBudget.toLocaleString('en-IN')} ಬಜೆಟ್‌ಗಿಂತ ₹${budget.overBudgetAmount.toLocaleString('en-IN')} ಹೆಚ್ಚಾಗಿದೆ.`
                  : `Your ₹${budget.userBudget.toLocaleString('en-IN')} budget is ₹${budget.overBudgetAmount.toLocaleString('en-IN')} below current estimates.`}
              </p>
            </div>
          </div>

          {onOptimize && (
            <button
              onClick={onOptimize}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-700 text-white font-semibold text-xs shadow-md hover:from-amber-700 hover:to-amber-800 transition flex items-center justify-center space-x-2 shrink-0 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>{t.optimizeTripBtn}</span>
            </button>
          )}
        </div>
      )}

      {/* Feasibility Recommendations List */}
      {budget.recommendations && budget.recommendations.length > 0 && (
        <div className="pt-4 border-t border-slate-100 text-xs text-slate-600 space-y-1.5">
          <span className="font-semibold text-slate-700 block mb-1">
            💡 {isKannada ? 'ಬುದ್ಧಿವಂತ ಉಳಿತಾಯ ಸಲಹೆಗಳು:' : 'Smart Recommendations & Advice:'}
          </span>
          {budget.recommendations.map((rec, i) => (
            <p key={i} className="flex items-start space-x-2">
              <span className="text-amber-500 font-bold">•</span>
              <span>{rec}</span>
            </p>
          ))}
        </div>
      )}

      {/* Success banner if already optimized */}
      {isOptimized && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            {isKannada 
              ? 'ಪ್ರವಾಸವನ್ನು ನಿಮ್ಮ ಬಜೆಟ್‌ಗೆ ತಕ್ಕಂತೆ ಯಶಸ್ವಿಯಾಗಿ ಆಪ್ಟಿಮೈಸ್ ಮಾಡಲಾಗಿದೆ!' 
              : 'Trip optimized! Transport and accommodations updated to fit your budget.'}
          </span>
        </div>
      )}
    </div>
  );
};
