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
        relative flex items-start gap-4 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02]
        ${isCompleted
          ? 'bg-green-50/80 dark:bg-green-900/30 border-green-200 dark:border-green-700 opacity-75'
          : 'bg-white/95 dark:bg-slate-800/95 border-slate-200 dark:border-slate-600 hover:shadow-lg hover:shadow-sky-200/50 dark:hover:shadow-sky-900/50'
        }
        border-2 overflow-hidden group
      `}
    >
      <div className={`absolute left-0 top-0 bottom-0 w-2 ${isCompleted ? 'bg-green-500' : colors.base.split(' ')[0]} shadow-lg ${colors.neon}`}></div>

      {/* Weather indicator */}
      <div className="absolute top-2 right-2 text-2xl" title={`${weather.description} - ${weather.emoji}`}>
        {weather.emoji}
      </div>

      <button
        onClick={handleToggle}
        aria-label={`Mark ${assignment.name} as ${isCompleted ? 'incomplete' : 'complete'}`}
        className={`
          flex-shrink-0 w-8 h-8 rounded-full border-3 transition-all duration-300 transform
          flex items-center justify-center mt-1 hover:scale-110
          ${isCompleted
            ? 'bg-green-500 border-green-500 shadow-lg shadow-green-400/50'
            : 'border-slate-400 dark:border-slate-400 bg-white dark:bg-slate-700 hover:border-green-400 dark:hover:border-green-500 hover:bg-green-50 dark:hover:bg-green-900/30'}
        `}
      >
        {isCompleted && <CheckIcon className="w-5 h-5 text-white stroke-2 drop-shadow-lg" />}
        {!isCompleted && (
          <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-400 group-hover:bg-green-400 transition-colors duration-200"></div>
        )}
      </button>

      <div className="flex-grow pr-8">
        <p
          className={`text-slate-800 dark:text-slate-100 font-bold text-lg leading-tight mb-2 ${isCompleted ? 'line-through text-green-600 dark:text-green-300' : ''}`}
        >
          {assignment.name}
        </p>

        <div className="flex items-center gap-3 mb-2">
          <span
            className={`text-xs font-bold px-3 py-1.5 rounded-full ${subjectColor} shadow-sm`}
          >
            {assignment.subject}
          </span>
          <span className="flex items-center gap-1 text-sm font-bold text-amber-600 dark:text-amber-300">
            <LightningIcon className="w-4 h-4" />
            +{assignment.xp} Energy
          </span>
          <span className={`text-xs font-medium ${weather.color}`}>
            {weather.description}
          </span>
        </div>

        {!isCompleted && (
          <p className="text-xs text-slate-600 dark:text-slate-300 italic">
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