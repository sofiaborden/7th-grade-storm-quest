import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface DateNavigatorProps {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}

const DateNavigator: React.FC<DateNavigatorProps> = ({ onPrev, onNext, onToday }) => {
  const buttonClass = "px-6 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 rounded-md bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 shadow-md font-orbitron";
  const iconButtonClass = "p-3 text-sm font-semibold transition-colors duration-200 rounded-full bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border-2 border-slate-300 dark:border-slate-700 shadow-md";

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