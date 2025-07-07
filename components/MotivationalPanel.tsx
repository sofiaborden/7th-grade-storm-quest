import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

interface MotivationalPanelProps {
  completedToday: number;
  totalToday: number;
  currentStreak: number;
  level: number;
}

const MotivationalPanel: React.FC<MotivationalPanelProps> = ({ 
  completedToday, 
  totalToday, 
  currentStreak, 
  level 
}) => {
  const [showEncouragement, setShowEncouragement] = useState(false);
  
  const completionPercentage = totalToday > 0 ? (completedToday / totalToday) * 100 : 0;
  
  const getMotivationalMessage = () => {
    if (completedToday === 0) {
      return {
        emoji: '🌅',
        message: "Ready to tackle today's work?",
        color: 'text-blue-600 dark:text-blue-300'
      };
    }

    if (completionPercentage === 100) {
      return {
        emoji: '🏆',
        message: "All done. Nice work today.",
        color: 'text-green-600 dark:text-green-300'
      };
    }

    if (completionPercentage >= 75) {
      return {
        emoji: '⚡',
        message: "Almost finished - solid progress",
        color: 'text-yellow-600 dark:text-yellow-300'
      };
    }

    if (completionPercentage >= 50) {
      return {
        emoji: '🌪️',
        message: "Halfway there - keep it up",
        color: 'text-purple-600 dark:text-purple-300'
      };
    }

    if (completionPercentage >= 25) {
      return {
        emoji: '🌤️',
        message: "Good start - building momentum",
        color: 'text-orange-600 dark:text-orange-300'
      };
    }

    return {
      emoji: '☀️',
      message: "Pick a task and get started",
      color: 'text-sky-600 dark:text-sky-300'
    };
  };

  const handleEncouragementClick = () => {
    setShowEncouragement(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981']
    });
    setTimeout(() => setShowEncouragement(false), 3000);
  };

  const motivation = getMotivationalMessage();

  return (
    <div className="bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800 rounded-xl p-6 border-2 border-sky-200 dark:border-slate-600 shadow-lg">
      <div className="text-center mb-4">
        <div className="text-4xl mb-2 animate-bounce">{motivation.emoji}</div>
        <h3 className={`text-lg font-bold ${motivation.color} mb-1`}>
          {motivation.message}
        </h3>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          {completedToday} of {totalToday} assignments completed today
        </p>
      </div>

      {/* Progress visualization */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 dark:text-slate-300 mb-1">
          <span>Today's Progress</span>
          <span>{Math.round(completionPercentage)}%</span>
        </div>
        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
          <div className="text-2xl font-bold text-orange-600 dark:text-orange-300">
            {currentStreak}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Day Streak 🔥
          </div>
        </div>
        <div className="text-center p-3 bg-white/50 dark:bg-slate-900/50 rounded-lg">
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-300">
            {level}
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300">
            Level ⚡
          </div>
        </div>
      </div>

      {/* Quick boost button */}
      <button
        onClick={handleEncouragementClick}
        className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
      >
        {showEncouragement ? '⚡ Nice work!' : '⚡ Quick boost'}
      </button>

      {/* Strategy tips */}
      <div className="mt-4 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">
          💡 Strategy:
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          {completionPercentage < 25
            ? "Start with easier tasks (☀️) to build momentum"
            : completionPercentage < 75
            ? "Take breaks between harder assignments"
            : "Final push - you've got this"
          }
        </p>
      </div>
    </div>
  );
};

export default MotivationalPanel;
