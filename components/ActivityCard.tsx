
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
        relative flex items-start gap-4 p-3 rounded-lg transition-all duration-300
        bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300/50 dark:border-slate-800/50
        overflow-hidden
        ${isCompleted ? 'opacity-60' : 'hover:bg-slate-200/90 dark:hover:bg-slate-800/90'}
      `}
    >
      <button
        onClick={handleToggle}
        aria-label={`Mark ${activity.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
        className={`
          flex-shrink-0 w-7 h-7 rounded-md border-2 transition-all duration-200
          flex items-center justify-center mt-0.5
          ${isCompleted 
            ? 'bg-sky-500 border-sky-500' 
            : 'border-slate-400 dark:border-slate-600 bg-white dark:bg-slate-900 hover:border-sky-400 dark:hover:border-sky-500'}
        `}
      >
        {isCompleted && <CheckIcon className="w-5 h-5 text-white stroke-2 drop-shadow-lg" />}
      </button>

      <div className="flex-grow flex items-center gap-3">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-white/70 dark:bg-slate-700/70 flex items-center justify-center text-slate-500 dark:text-slate-300">
            {Icon && <Icon className="w-5 h-5" />}
        </div>
        <div>
            <p className={`text-slate-800 dark:text-slate-200 font-semibold text-base ${isCompleted ? 'line-through' : ''}`}>
              {activity.title}
            </p>
             <div className="flex items-center gap-4">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{activity.time}</span>
                <span className="flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-400">
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
