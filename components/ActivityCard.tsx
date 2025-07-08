
import React, { useState } from 'react';
import { Activity } from '../types';
import { BookIcon, GuitarIcon, GolfIcon, BandIcon, DumbbellIcon, LunchIcon, BedIcon, CheckIcon, LightningIcon } from './icons';

interface ActivityCardProps {
  activity: Activity;
  onToggleComplete: () => void;
  isCompleted: boolean;
}

const ICONS: { [key: string]: React.ElementType } = {
  Book: BookIcon,
  Guitar: GuitarIcon,
  Golf: GolfIcon,
  Band: BandIcon,
  Dumbbell: DumbbellIcon,
  Lunch: LunchIcon,
  Bed: BedIcon,
  Math: () => <span className="font-bold text-lg font-orbitron">M+</span> // Custom for Math Tutoring
};

const ActivityCard: React.FC<ActivityCardProps> = ({ activity, onToggleComplete, isCompleted }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const Icon = ICONS[activity.icon];
  
  const handleToggle = () => {
    if (!isCompleted) {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 500);
    }
    onToggleComplete();
  }

  return (
    <div
      className={`
        relative flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl transition-all duration-300 hover:-translate-y-0.5
        bg-slate-100/90 dark:bg-slate-800/95 border border-slate-200/60 dark:border-slate-600/60
        overflow-hidden backdrop-blur-sm
        ${isCompleted ? 'opacity-70' : 'hover:bg-slate-50/95 dark:hover:bg-slate-700/95 hover:shadow-md hover:shadow-slate-200/50 dark:hover:shadow-slate-900/50'}
      `}
    >
      <button
        onClick={handleToggle}
        aria-label={`Mark ${activity.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
        className={`
          flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg border-2 transition-all duration-200 hover:scale-105 active:scale-95
          flex items-center justify-center mt-0.5 min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px]
          ${isCompleted
            ? 'bg-sky-500 border-sky-500 shadow-md shadow-sky-400/40'
            : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 hover:border-sky-400 dark:hover:border-sky-400 hover:shadow-sm'}
        `}
      >
        {isCompleted && <CheckIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white stroke-2 drop-shadow-lg" />}
      </button>

      <div className="flex-grow flex items-center gap-2 sm:gap-3 min-w-0">
        <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/90 dark:bg-slate-700/95 flex items-center justify-center text-slate-500 dark:text-slate-100 shadow-sm">
            {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </div>
        <div className="min-w-0 flex-1">
            <p className={`text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base ${isCompleted ? 'line-through' : ''} truncate`}>
              {activity.title}
            </p>
             <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-200 flex-shrink-0">{activity.time}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-200 flex-shrink-0">
                    <LightningIcon className="w-3 h-3" />
                    +{activity.xp} J
                </span>
             </div>
        </div>
      </div>
      {isAnimating && <div className="absolute inset-0 bg-yellow-400/50 rounded-lg animate-ping"></div>}
    </div>
  );
};

export default ActivityCard;
