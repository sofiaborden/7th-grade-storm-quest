import React from 'react';
import { SunIcon, MoonIcon, BookOpenIcon, FlameIcon, TornadoIcon, CalendarIcon } from './icons';
import XPBar from './XPBar';
import confetti from 'canvas-confetti';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onViewSubjects: () => void;
  level: number;
  totalXp: number;
  xpForNextLevel: number;
  xpForCurrentLevel: number;
  dailyStreak: number;
  completedCount: number;
  totalCount: number;
  estimatedFinishDate: Date;
}

const Header: React.FC<HeaderProps> = ({ 
  isDarkMode,
  onToggleDarkMode,
  onViewSubjects,
  level,
  totalXp,
  xpForNextLevel,
  xpForCurrentLevel,
  dailyStreak,
  completedCount,
  totalCount,
  estimatedFinishDate,
}) => {
  const xpProgress = xpForNextLevel > xpForCurrentLevel ? (totalXp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel) * 100 : 100;

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const handleLevelClick = () => {
    // Fun confetti burst when clicking the level
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6']
    });
  };

  return (
    <header className="bg-gradient-to-r from-white/98 via-sky-50/98 to-white/98 dark:from-slate-900/98 dark:via-slate-800/98 dark:to-slate-900/98 backdrop-blur-xl sticky top-0 z-20 border-b border-slate-200/50 dark:border-slate-600/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">

        <div className="flex justify-between items-center mb-3 sm:mb-4">
          <div className="min-w-0 flex-1 mr-4">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400 bg-clip-text text-transparent tracking-wider font-orbitron uppercase truncate">
              ⚡ 7th Grade Tracker ⚡
            </h1>
            <p className="text-slate-600 dark:text-slate-100 font-semibold text-xs sm:text-sm lg:text-base truncate">Assignment & Activity Management</p>
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3 flex-shrink-0">
            <button
              onClick={onViewSubjects}
              className="p-2 sm:p-3 rounded-full text-slate-500 dark:text-slate-200 hover:bg-sky-200/70 dark:hover:bg-sky-800/70 hover:text-sky-600 dark:hover:text-sky-100 transition-all duration-200 hover:scale-110 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
              aria-label="View all subjects"
            >
              <BookOpenIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              onClick={onToggleDarkMode}
              className="p-2 sm:p-3 rounded-full text-slate-500 dark:text-slate-200 hover:bg-amber-200/70 dark:hover:bg-amber-800/70 hover:text-amber-600 dark:hover:text-amber-100 transition-all duration-200 hover:scale-110 min-w-[40px] min-h-[40px] sm:min-w-[44px] sm:min-h-[44px] flex items-center justify-center"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <SunIcon className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400 animate-pulse" /> : <MoonIcon className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-200/80 via-sky-100/80 to-slate-200/80 dark:from-slate-800/80 dark:via-slate-700/80 dark:to-slate-800/80 rounded-xl p-4 border border-slate-300/70 dark:border-slate-600/70 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex-shrink-0 text-center">
                    <div
                        className="relative w-20 h-20 mx-auto group cursor-pointer transform transition-transform duration-300 hover:scale-110"
                        onClick={handleLevelClick}
                    >
                        <TornadoIcon className="w-full h-full text-slate-500 dark:text-slate-200 group-hover:text-sky-500 transition-colors duration-300 animate-float" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xs text-slate-500 dark:text-slate-200 font-semibold">CAT</span>
                            <span className="font-orbitron font-bold text-3xl text-slate-800 dark:text-white group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors duration-300">{level}</span>
                        </div>
                        {level > 3 && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                                <span className="text-xs font-bold text-white">🔥</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex-grow">
                    <XPBar 
                        progress={xpProgress} 
                        currentXp={totalXp - xpForCurrentLevel}
                        xpToNextLevel={xpForNextLevel - xpForCurrentLevel}
                    />
                    <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 text-center">
                        <StatCard label="Total Energy" value={`${totalXp.toLocaleString()} J`} />
                        <StatCard label="Quests Done" value={`${completedCount}/${totalCount}`} />
                        <StatCard label="Storm Surge" value={dailyStreak} icon={<FlameIcon className={`w-4 h-4 ${dailyStreak > 0 ? 'text-orange-500' : 'text-slate-400'}`} />} />
                        <StatCard label="ETA" value={formatDate(estimatedFinishDate)} icon={<CalendarIcon className="w-4 h-4 text-slate-500 dark:text-slate-200" />} />
                    </div>
                </div>
            </div>
        </div>

      </div>
    </header>
  );
};

const StatCard: React.FC<{label:string, value: string | number, icon?: React.ReactNode}> = ({label, value, icon}) => (
    <div className="bg-white/95 dark:bg-slate-800/95 p-3 rounded-xl border border-slate-200/60 dark:border-slate-600/60 shadow-sm backdrop-blur-sm">
        <p className="text-xs font-semibold text-slate-500 dark:text-slate-200 uppercase tracking-wider mb-1">{label}</p>
        <div className="flex items-center justify-center gap-1.5">
            {icon}
            <p className="text-lg font-bold font-orbitron text-slate-700 dark:text-slate-100">{value}</p>
        </div>
    </div>
)

export default Header;