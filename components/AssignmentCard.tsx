import React, { useState } from 'react';
import { Assignment } from '../types';
import { SUBJECT_COLORS, getWeatherForXP } from '../constants';
import { CheckIcon, LightningIcon } from './icons';
import confetti from 'canvas-confetti';

interface AssignmentCardProps {
  assignment: Assignment;
  onToggleComplete: (id: string) => void;
}

const AssignmentCard: React.FC<AssignmentCardProps> = ({ assignment, onToggleComplete }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const isCompleted = !!assignment.completionDate;
  const colors = SUBJECT_COLORS[assignment.subject];
  const subjectColor = `${colors.base} ${colors.dark}`;
  const weather = getWeatherForXP(assignment.xp);

  const handleToggle = () => {
    if (!isCompleted) {
        setIsAnimating(true);
        // Celebration confetti for completing tasks!
        confetti({
          particleCount: 30,
          spread: 50,
          origin: { y: 0.7 },
          colors: ['#10b981', '#34d399', '#6ee7b7']
        });
        setTimeout(() => setIsAnimating(false), 500);
    }
    onToggleComplete(assignment.id);
  }

  const getDifficultyMessage = () => {
    if (assignment.xp >= 200) return "Complex task - break into smaller parts";
    if (assignment.xp >= 150) return "Requires focus and time";
    if (assignment.xp >= 100) return "Moderate difficulty";
    if (assignment.xp >= 75) return "Should be straightforward";
    return "Quick task";
  };

  return (
    <div
      className={`
        relative flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-[1.01] hover:-translate-y-1
        ${isCompleted
          ? 'bg-green-50/90 dark:bg-green-900/30 border-green-200/60 dark:border-green-600/60 opacity-80'
          : 'bg-white/98 dark:bg-slate-800/98 border-slate-200/60 dark:border-slate-500/60 hover:shadow-xl hover:shadow-sky-200/30 dark:hover:shadow-sky-900/30'
        }
        border overflow-hidden group backdrop-blur-sm
      `}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isCompleted ? 'bg-green-500' : colors.base.split(' ')[0]} ${colors.neon}`}></div>

      {/* Weather indicator */}
      <div className="absolute top-2 right-2 text-xl sm:text-2xl" title={`${weather.description} - ${weather.emoji}`}>
        {weather.emoji}
      </div>

      <button
        onClick={handleToggle}
        aria-label={`Mark ${assignment.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
        className={`
          flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl border-2 transition-all duration-300 transform
          flex items-center justify-center mt-0.5 hover:scale-105 active:scale-95 min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]
          ${isCompleted
            ? 'bg-green-500 border-green-500 shadow-lg shadow-green-400/40'
            : 'border-slate-300 dark:border-slate-500 bg-white dark:bg-slate-800 hover:border-green-400 dark:hover:border-green-400 hover:bg-green-50 dark:hover:bg-green-900/40 hover:shadow-md'}
        `}
      >
        {isCompleted && <CheckIcon className="w-5 h-5 text-white stroke-2 drop-shadow-lg" />}
        {!isCompleted && (
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-400 group-hover:bg-green-400 transition-colors duration-200"></div>
        )}
      </button>

      <div className="flex-grow pr-6 sm:pr-8 min-w-0">
        <p
          className={`text-slate-800 dark:text-slate-100 font-bold text-base sm:text-lg leading-tight mb-2 ${isCompleted ? 'line-through text-green-600 dark:text-green-300' : ''} break-words`}
        >
          {assignment.name}
        </p>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-3">
          <span
            className={`text-xs font-semibold px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl ${subjectColor} shadow-sm flex-shrink-0`}
          >
            {assignment.subject}
          </span>
          <span className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm font-semibold text-amber-600 dark:text-amber-200 flex-shrink-0">
            <LightningIcon className="w-3 h-3 sm:w-4 sm:h-4" />
            +{assignment.xp} Energy
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-lg ${weather.color} bg-white/70 dark:bg-slate-800/90 flex-shrink-0`}>
            {weather.description}
          </span>
        </div>

        {!isCompleted && (
          <p className="text-xs text-slate-600 dark:text-slate-200 italic">
            {getDifficultyMessage()}
          </p>
        )}

        {isCompleted && (
          <p className="text-xs text-green-600 dark:text-green-300 font-medium">
            ✅ Completed
          </p>
        )}
      </div>

      {isAnimating && (
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/30 via-emerald-400/30 to-teal-400/30 rounded-xl animate-pulse"></div>
      )}
    </div>
  );
};

export default AssignmentCard;