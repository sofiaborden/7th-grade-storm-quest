import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface DateNavigatorProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({ onPrev, onNext, onToday }) => {
  const buttonClass = "px-4 sm:px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-200 rounded-xl bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] font-orbitron backdrop-blur-sm min-h-[44px]";
  const iconButtonClass = "p-3 text-sm font-semibold transition-all duration-200 rounded-xl bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm min-w-[44px] min-h-[44px] flex items-center justify-center";

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 px-2">
      <button onClick={onPrev} className={iconButtonClass} aria-label="Previous day">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button onClick={onToday} className={buttonClass}>
        <span className="hidden sm:inline">Today</span>
        <span className="sm:hidden">📅</span>
      </button>
      <button onClick={onNext} className={iconButtonClass} aria-label="Next day">
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DateNavigator;