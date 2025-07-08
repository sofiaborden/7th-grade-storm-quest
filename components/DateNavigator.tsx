import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface DateNavigatorProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({ onPrev, onNext, onToday }) => {
  const buttonClass = "px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-200 rounded-xl bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-500 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] font-orbitron backdrop-blur-sm";
  const iconButtonClass = "p-3 text-sm font-semibold transition-all duration-200 rounded-xl bg-white/95 dark:bg-slate-800/95 text-slate-700 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-500 shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm";

  return (
    <div className="flex items-center justify-between gap-4">
      <button onClick={onPrev} className={iconButtonClass} aria-label="Previous day">
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button onClick={onToday} className={buttonClass}>
        Today
      </button>
      <button onClick={onNext} className={iconButtonClass} aria-label="Next day">
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>
  );
};

export default DateNavigator;