
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Assignment, ScheduledItem } from './types';
import { initialAssignments, LEVEL_THRESHOLDS, START_DATE, recurringActivities } from './constants';
import { useDarkMode } from './hooks/useDarkMode';
import { useSchedule } from './hooks/useSchedule';
import Header from './components/Header';
import DateNavigator from './components/DateNavigator';
import DaySchedule from './components/DaySchedule';
import ViewSubjectsModal from './components/ViewSubjectsModal';
import MotivationalPanel from './components/MotivationalPanel';
import QuickActions from './components/QuickActions';
import { toISODateString } from './utils';

const getInitialAssignments = (): Assignment[] => {
  try {
    const saved = localStorage.getItem('assignments_v4_storm');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && (parsed.length === 0 || 'xp' in parsed[0])) {
        return parsed;
      }
    }
  } catch (error) {
    console.error("Could not parse assignments from localStorage", error);
  }
  return initialAssignments.map(a => ({...a, type: 'Assignment'}));
};

const getInitialCompletedActivities = (): Record<string, string[]> => {
    try {
        const saved = localStorage.getItem('completed_activities_v4_storm');
        return saved ? JSON.parse(saved) : {};
    } catch(e) {
        return {};
    }
}

const getEffectiveStartDate = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // If today is before START_DATE, use START_DATE. Otherwise, use today.
    return new Date(Math.max(today.getTime(), START_DATE.getTime()));
};


const App: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(getInitialAssignments);
  const [completedActivities, setCompletedActivities] = useState<Record<string, string[]>>(getInitialCompletedActivities);
  const [isDarkMode, toggleDarkMode] = useDarkMode();

  const [viewDate, setViewDate] = useState(getEffectiveStartDate);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('assignments_v4_storm', JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem('completed_activities_v4_storm', JSON.stringify(completedActivities));
  }, [completedActivities]);

  const { 
    getScheduleForDate, 
    estimatedFinishDate, 
    completedCount,
    totalXp,
    level,
    xpForNextLevel,
    xpForCurrentLevel,
    dailyStreak
  } = useSchedule(assignments, completedActivities);
  
  const handleToggleItemComplete = useCallback((item: ScheduledItem) => {
    const dateKey = toISODateString(viewDate);
    if (item.type === 'Assignment') {
        setAssignments(prev =>
          prev.map(a => 
            a.id === item.id 
              ? { ...a, completionDate: a.completionDate ? null : dateKey } 
              : a
          )
        );
    } else if (item.type === 'Activity') {
        setCompletedActivities(prev => {
            const newCompleted = {...prev};
            const completedForDate = newCompleted[dateKey] ? [...newCompleted[dateKey]] : [];
            const itemIndex = completedForDate.indexOf(item.id);

            if (itemIndex > -1) {
                completedForDate.splice(itemIndex, 1); // Un-complete
            } else {
                completedForDate.push(item.id); // Complete
            }
            
            if (completedForDate.length > 0) {
                 newCompleted[dateKey] = completedForDate;
            } else {
                delete newCompleted[dateKey]; // Clean up empty array
            }
            return newCompleted;
        });
    }
  }, [viewDate]);

  const scheduleForViewDate = useMemo(() => {
    return getScheduleForDate(viewDate);
  }, [viewDate, getScheduleForDate]);

  const allPrimaryTasksDoneForViewDate = useMemo(() => {
    const day = scheduleForViewDate;
    if (!day || day.items.length === 0) return false;

    const completedActs = completedActivities[toISODateString(viewDate)] || [];

    // Filter out bonus assignments that might have been completed on this day
    const primaryAssignments = day.items.filter(item => {
        if (item.type !== 'Assignment') return true;
        const inPrimary = day.items.some(p => p.id === item.id && p.type === 'Assignment');
        const inBonus = day.bonusItems?.some(b => b.id === item.id) ?? false;
        return inPrimary && !inBonus;
    });

    if (primaryAssignments.filter(i => i.type === 'Assignment').length === 0 && primaryAssignments.filter(i => i.type === 'Activity').length > 0) {
         return primaryAssignments.every(item => {
            if (item.type === 'Activity') return completedActs.includes(item.id);
            return true;
        });
    }


    return day.items.every(item => {
        if (item.type === 'Assignment') {
             // An assignment is only primary if it's not in the bonus list for this day
            const isBonus = day.bonusItems?.some(b => b.id === item.id) ?? false;
            return isBonus || !!item.completionDate;
        }
        if (item.type === 'Activity') return completedActs.includes(item.id);
        return true;
    });
  }, [scheduleForViewDate, completedActivities, viewDate]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Ctrl/Cmd + E = complete easiest task
      if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        const incomplete = assignments.filter(a => !a.completionDate);
        if (incomplete.length > 0) {
          const easiest = incomplete.reduce((min, curr) => curr.xp < min.xp ? curr : min);
          handleToggleItemComplete(easiest);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [assignments, handleToggleItemComplete]);

  const changeDate = (offset: number) => {
      setViewDate(current => {
          const newDate = new Date(current);
          newDate.setDate(newDate.getDate() + offset);
          return newDate;
      });
  };

  const goToToday = () => {
      setViewDate(getEffectiveStartDate());
  };
  
  const allDone = completedCount === assignments.length;

  useEffect(() => {
      if (allDone && assignments.length > 0) {
          // Trigger confetti celebration
          confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
          });
      }
  }, [allDone, assignments]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 transition-all duration-500 storm-pattern">
      <Header
        completedCount={completedCount}
        totalCount={assignments.length}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => toggleDarkMode()}
        onViewSubjects={() => setIsModalOpen(true)}
        level={level}
        totalXp={totalXp}
        xpForCurrentLevel={xpForCurrentLevel}
        xpForNextLevel={xpForNextLevel}
        dailyStreak={dailyStreak}
        estimatedFinishDate={estimatedFinishDate}
      />
      <main className="p-4 sm:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Top section with motivational panel and quick actions */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <MotivationalPanel
                completedToday={assignments.filter(a => a.completionDate && toISODateString(new Date(a.completionDate)) === toISODateString(viewDate)).length}
                totalToday={scheduleForViewDate?.assignments?.length || 0}
                currentStreak={dailyStreak}
                level={level}
              />
            </div>
            <div>
              <QuickActions
                assignments={assignments}
                onCompleteAssignment={(id) => {
                  const assignment = assignments.find(a => a.id === id);
                  if (assignment) handleToggleItemComplete(assignment);
                }}
                onViewSubjects={() => setIsModalOpen(true)}
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <DateNavigator
              onPrev={() => changeDate(-1)}
              onNext={() => changeDate(1)}
              onToday={goToToday}
            />
            {allDone && assignments.length > 0 ? (
              <div className="text-center py-16 mt-6 px-6 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 dark:from-green-900/50 dark:via-emerald-900/50 dark:to-teal-900/50 rounded-xl shadow-2xl border-2 border-green-200 dark:border-green-800">
                <div className="text-6xl mb-4">🏆</div>
                <h2 className="text-4xl font-bold font-orbitron bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  STORM QUEST COMPLETE!
                </h2>
                <p className="mt-4 text-slate-700 dark:text-slate-200 text-lg font-semibold">
                  🌟 Congratulations, Storm Chaser! You've conquered 7th Grade! 🌟
                </p>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  You've weathered every storm and emerged victorious!
                </p>
              </div>
            ) : (
              <div className="mt-6">
                <DaySchedule
                  day={scheduleForViewDate}
                  onToggleComplete={handleToggleItemComplete}
                  isToday={toISODateString(viewDate) === toISODateString(getEffectiveStartDate())}
                  allPrimaryTasksDone={allPrimaryTasksDoneForViewDate}
                />
              </div>
            )}
          </div>
        </div>
      </main>
      <ViewSubjectsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        assignments={assignments}
        onToggleComplete={(id) => {
            const assignment = assignments.find(a => a.id === id);
            if (assignment) handleToggleItemComplete(assignment);
        }}
      />
    </div>
  );
};

export default App;
