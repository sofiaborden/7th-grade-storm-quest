import React from 'react';
import { Assignment } from '../types';
import { getWeatherForXP } from '../constants';

interface QuickActionsProps {
  assignments: Assignment[];
  onCompleteAssignment: (id: string) => void;
  onViewSubjects: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  assignments, 
  onCompleteAssignment, 
  onViewSubjects 
}) => {
  const incompleteAssignments = assignments.filter(a => !a.completionDate);
  const easiestTask = incompleteAssignments.sort((a, b) => a.xp - b.xp)[0];
  const hardestTask = incompleteAssignments.sort((a, b) => b.xp - a.xp)[0];
  
  const quickCompleteEasiest = () => {
    if (easiestTask) {
      onCompleteAssignment(easiestTask.id);
    }
  };

  return (
    <div className="bg-white/98 dark:bg-slate-800/98 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-slate-200/60 dark:border-slate-600/60 shadow-lg backdrop-blur-sm">
      <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-3 sm:mb-4 text-center">
        ⚡ Quick Storm Actions ⚡
      </h3>
      
      <div className="space-y-2 sm:space-y-3">
        {/* Quick complete easiest */}
        {easiestTask && (
          <button
            onClick={quickCompleteEasiest}
            className="w-full p-3 sm:p-4 bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:scale-[0.98] min-h-[60px] sm:min-h-[auto]"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm sm:text-base">⚡ Easy Start</span>
              <span className="text-xs sm:text-sm">
                {getWeatherForXP(easiestTask.xp).emoji} +{easiestTask.xp}
              </span>
            </div>
            <div className="text-xs sm:text-sm opacity-90 mt-1 truncate">
              {easiestTask.name.length > 25
                ? easiestTask.name.substring(0, 25) + '...'
                : easiestTask.name}
            </div>
            <div className="text-xs opacity-70 mt-1 hidden sm:block">
              Tip: Ctrl+E (or Cmd+E on Mac)
            </div>
          </button>
        )}

        {/* View all subjects */}
        <button
          onClick={onViewSubjects}
          className="w-full p-3 sm:p-4 bg-gradient-to-r from-blue-400 to-purple-500 hover:from-blue-500 hover:to-purple-600 text-white font-semibold rounded-lg sm:rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:-translate-y-0.5 shadow-lg hover:shadow-xl active:scale-[0.98] min-h-[44px]"
        >
          <div className="flex items-center justify-center gap-2">
            <span>📚</span>
            <span className="text-sm sm:text-base">View All Subjects</span>
          </div>
        </button>

        {/* Motivational stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="p-2 sm:p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-center border border-yellow-200 dark:border-yellow-800">
            <div className="text-base sm:text-lg font-bold text-yellow-600 dark:text-yellow-300">
              {incompleteAssignments.length}
            </div>
            <div className="text-xs text-yellow-700 dark:text-yellow-200">
              Tasks Left
            </div>
          </div>
          <div className="p-2 sm:p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center border border-purple-200 dark:border-purple-800">
            <div className="text-base sm:text-lg font-bold text-purple-600 dark:text-purple-300">
              {assignments.filter(a => a.completionDate).length}
            </div>
            <div className="text-xs text-purple-700 dark:text-purple-200">
              Completed
            </div>
          </div>
        </div>

        {/* Difficulty preview */}
        <div className="p-3 bg-gradient-to-r from-sky-50 to-blue-50 dark:from-sky-900/40 dark:to-blue-900/40 rounded-lg border border-sky-200 dark:border-sky-700">
          <h4 className="text-sm font-bold text-sky-800 dark:text-sky-100 mb-2">
            📊 Upcoming Tasks:
          </h4>
          <div className="flex justify-between text-xs">
            {incompleteAssignments.slice(0, 4).map((assignment, index) => {
              const weather = getWeatherForXP(assignment.xp);
              return (
                <div key={assignment.id} className="text-center">
                  <div className="text-lg">{weather.emoji}</div>
                  <div className="text-xs text-slate-600 dark:text-slate-200">
                    {assignment.subject.slice(0, 4)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;
