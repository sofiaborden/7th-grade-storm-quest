import React, { useEffect, useState } from 'react';

interface XPBarProps {
  progress: number;
  currentXp: number;
  xpToNextLevel: number;
}

const XPBar: React.FC<XPBarProps> = ({ progress, currentXp, xpToNextLevel }) => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timer);
  }, [progress]);

  const getProgressColor = () => {
    if (progress >= 80) return "from-green-400 via-emerald-500 to-teal-500";
    if (progress >= 60) return "from-yellow-400 via-orange-500 to-red-500";
    if (progress >= 40) return "from-blue-400 via-cyan-500 to-sky-500";
    return "from-purple-400 via-pink-500 to-rose-500";
  };

  const getGlowEffect = () => {
    if (progress >= 80) return "shadow-lg shadow-green-400/50";
    if (progress >= 60) return "shadow-lg shadow-orange-400/50";
    if (progress >= 40) return "shadow-lg shadow-blue-400/50";
    return "shadow-lg shadow-purple-400/50";
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2 text-sm">
        <span className="font-semibold text-slate-600 dark:text-slate-200 flex items-center gap-1">
          ⚡ Storm Energy ⚡
        </span>
        <span className="font-bold text-slate-700 dark:text-slate-100 font-orbitron">
          {currentXp.toLocaleString()} / {xpToNextLevel.toLocaleString()} J
        </span>
      </div>
      <div className="relative w-full bg-slate-300 dark:bg-slate-800 rounded-full h-5 border-2 border-slate-400/50 dark:border-slate-600/60 p-0.5 overflow-hidden">
        <div
          className={`bg-gradient-to-r ${getProgressColor()} h-full rounded-full transition-all duration-1000 ease-out ${getGlowEffect()} relative overflow-hidden`}
          style={{ width: `${animatedProgress}%` }}
        >
          {/* Lightning effect for high progress */}
          {progress >= 70 && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
          )}
        </div>
        {/* Sparkle effects */}
        {progress > 0 && (
          <div className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white text-xs animate-pulse">
            ✨
          </div>
        )}
      </div>
      {progress >= 90 && (
        <div className="text-center mt-1 text-xs font-bold text-green-600 dark:text-green-200 animate-bounce">
          🌟 Almost there! Level up incoming! 🌟
        </div>
      )}
    </div>
  );
};

export default XPBar;
