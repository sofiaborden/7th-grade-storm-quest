
import React, { useState } from 'react';
import { DaySchedule as DayScheduleType, ScheduledItem } from '../types';
import AssignmentCard from './AssignmentCard';
import ActivityCard from './ActivityCard';
import { SparklesIcon, PlusCircleIcon } from './icons';

interface DayScheduleProps {
  day: DayScheduleType;
  onToggleComplete: (item: ScheduledItem) => void;
  isToday: boolean;
  allPrimaryTasksDone: boolean;
  completedActivities: string[];
}

const DaySchedule: React.FC<DayScheduleProps> = ({ day, onToggleComplete, isToday, allPrimaryTasksDone, completedActivities }) => {
  const [showBonus, setShowBonus] = useState(false);
  
  const dateObj = new Date(day.date);
  // Account for timezone offset to prevent date from being off by one
  const displayDate = new Date(dateObj.valueOf() + dateObj.getTimezoneOffset() * 60 * 1000);

  const formatDate = (d: Date) => {
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });
  };

  const sortedItems = [...day.items].sort((a, b) => {
    const timeA = 'time' in a ? a.time : '09:00 am';
    const timeB = 'time' in b ? b.time : '09:00 am';
    
    const convertTo24Hour = (time: string) => {
      const [hourMinute, period] = time.split(' ');
      let [hour, minute] = hourMinute.split(':').map(Number);
      if (period?.toLowerCase() === 'pm' && hour !== 12) hour += 12;
      if (period?.toLowerCase() === 'am' && hour === 12) hour = 0;
      return hour * 60 + (minute || 0);
    };

    return convertTo24Hour(timeA) - convertTo24Hour(timeB);
  });
  
  const hasBonusItems = !!day.bonusItems && day.bonusItems.length > 0;

  return (
    <div className="w-full">
      <div className="flex items-center gap-3 mb-4">
        <h2 className="font-bold font-orbitron text-2xl sm:text-3xl text-slate-800 dark:text-sky-200 uppercase tracking-wide">
          {formatDate(displayDate)}
        </h2>
        {isToday && (
           <span className="text-xs font-semibold uppercase tracking-wider bg-yellow-300 text-yellow-900 dark:bg-yellow-500/80 dark:text-yellow-100 px-3 py-1.5 rounded-xl animate-pulse shadow-sm">
            Today's Forecast
          </span>
        )}
      </div>
      
      {allPrimaryTasksDone && (
         <div className="text-center mb-6 py-8 px-6 rounded-2xl shadow-xl border border-cyan-400/40 dark:border-cyan-500/40 bg-gradient-to-br from-slate-50/95 to-cyan-100/95 dark:from-slate-800/95 dark:to-cyan-900/95 backdrop-blur-sm">
          <style>{`
              @keyframes fade-in-scale { 0% { opacity: 0; transform: scale(0.95); } 100% { opacity: 1; transform: scale(1); } }
              .animate-fade-in-scale { animation: fade-in-scale 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both; }
          `}</style>
          <div className="animate-fade-in-scale">
              <SparklesIcon className="w-12 h-12 mx-auto text-cyan-500 dark:text-cyan-200" />
              <h3 className="mt-4 text-2xl font-bold font-orbitron text-cyan-700 dark:text-cyan-100">
                  DAILY QUEST COMPLETE!
              </h3>
              <p className="mt-2 text-cyan-600 dark:text-cyan-200 font-semibold">
                  Forecast cleared! Amazing work.
              </p>
              
              {hasBonusItems && !showBonus && (
                  <div className="mt-6">
                      <button 
                          onClick={() => setShowBonus(true)}
                          className="inline-flex items-center gap-3 px-6 py-3 text-base font-semibold text-white bg-gradient-to-r from-sky-500 to-cyan-500 hover:from-sky-600 hover:to-cyan-600 dark:from-sky-600 dark:to-cyan-600 dark:hover:from-sky-700 dark:hover:to-cyan-700 rounded-xl shadow-lg transition-all transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]"
                      >
                          <PlusCircleIcon className="w-6 h-6" />
                          Go for a Bonus Round?
                      </button>
                  </div>
              )}
          </div>
        </div>
      )}


      <div className="space-y-4">
        {sortedItems.length > 0 ? (
          sortedItems.map(item => {
            if (item.type === 'Assignment') {
              return <AssignmentCard key={item.id} assignment={item} onToggleComplete={() => onToggleComplete(item)} />;
            }
            if (item.type === 'Activity') {
              return <ActivityCard key={item.id} activity={item} onToggleComplete={() => onToggleComplete(item)} isCompleted={completedActivities.includes(item.id)} />;
            }
            return null;
          })
        ) : (
          <div className="text-center py-16 px-6 bg-slate-100 dark:bg-slate-800/70 rounded-lg shadow-sm border border-slate-200 dark:border-slate-600">
            <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-200">Clear Skies!</h3>
            <p className="mt-2 text-slate-500 dark:text-slate-300">No assignments scheduled for today. Enjoy the calm!</p>
          </div>
        )}
        
        {showBonus && day.bonusItems && day.bonusItems.length > 0 && (
            <div className="pt-4 space-y-4 border-t-2 border-dashed border-slate-300 dark:border-slate-600 mt-6">
                <h4 className="font-orbitron font-bold text-lg text-slate-700 dark:text-sky-200">Bonus Storms</h4>
                {day.bonusItems.map(item => (
                    <AssignmentCard key={`bonus-${item.id}`} assignment={item} onToggleComplete={() => onToggleComplete(item)} />
                ))}
            </div>
        )}
      </div>
    </div>
  );
};

export default DaySchedule;
