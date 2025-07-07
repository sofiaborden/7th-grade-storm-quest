
import { useMemo, useCallback } from 'react';
import { Assignment, DaySchedule, ScheduledItem, Activity } from '../types';
import { recurringActivities, START_DATE, initialAssignments, LEVEL_THRESHOLDS } from '../constants';
import { toISODateString } from '../utils';

const getActivitiesForDay = (date: Date): Activity[] => {
  const dayOfWeek = date.getDay();
  return recurringActivities.filter(act => act.days.includes(dayOfWeek));
};

const generateMasterSchedule = (): Map<string, { assignments: Assignment[], bonus: Assignment[] }> => {
    const schedule = new Map<string, { assignments: Assignment[], bonus: Assignment[] }>();
    const allAssignments = JSON.parse(JSON.stringify(initialAssignments));
    
    const subjectPools: Record<string, Assignment[]> = {};
    allAssignments.forEach((a: Assignment) => {
        if (!subjectPools[a.subject]) subjectPools[a.subject] = [];
        subjectPools[a.subject].push(a);
    });
    for (const subject in subjectPools) {
        subjectPools[subject].sort((a, b) => b.xp - a.xp || a.name.localeCompare(b.name));
    }
    
    const pullAssignmentBySubject = (subject: string): Assignment | undefined => subjectPools[subject]?.shift();

    const pullGenericAssignments = (count: number, priorities: string[]): Assignment[] => {
        const pulled: Assignment[] = [];
        const usedIds = new Set<string>();

        const pull = (subject: string) => {
            const assignment = pullAssignmentBySubject(subject);
            if (assignment && !usedIds.has(assignment.id)) {
                pulled.push(assignment);
                usedIds.add(assignment.id);
            }
        };
        
        for (const subject of priorities) {
            if (pulled.length >= count) break;
            pull(subject);
        }

        const allSubjects = Object.keys(subjectPools).filter(s => subjectPools[s].length > 0);
        let currentSubjectIndex = 0;
        while (pulled.length < count && allSubjects.some(s => subjectPools[s].length > 0)) {
            const subject = allSubjects[currentSubjectIndex];
            if(subjectPools[subject]?.length > 0) {
                pull(subject);
            }
            currentSubjectIndex = (currentSubjectIndex + 1) % (allSubjects.length || 1);
        }
        return pulled;
    };

    const cursorDate = new Date(START_DATE.getTime());
    let remainingAssignments = allAssignments.length;

    while (remainingAssignments > 0) {
        const dateKey = toISODateString(cursorDate);
        const dayOfWeek = cursorDate.getDay();

        if (dayOfWeek === 0) {
             cursorDate.setDate(cursorDate.getDate() + 1);
             continue;
        }

        const diffTime = cursorDate.getTime() - START_DATE.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const weekNumber = Math.floor(diffDays / 7) + 1;
        
        let assignmentsForDay: Assignment[] = [];
        let bonusAssignments: Assignment[] = [];
        
        if (weekNumber === 1) {
            const subjectsToPull: string[] = [];
            switch(dayOfWeek) {
                case 1: subjectsToPull.push(...['Science', 'Science', 'Math']); break;
                case 2: subjectsToPull.push(...['Math', 'Math', 'Spanish']); break;
                case 3: subjectsToPull.push(...['Science', 'Spanish', 'Math']); break;
                case 4: subjectsToPull.push(...['Spanish', 'Science', 'Math']); break;
                case 5: subjectsToPull.push(...['Science', 'Math', 'Spanish']); break;
                case 6: subjectsToPull.push(...['Science', 'Spanish']); break;
            }
            assignmentsForDay = subjectsToPull.map(s => pullAssignmentBySubject(s)).filter((a): a is Assignment => !!a);
        } else {
            const activities = getActivitiesForDay(cursorDate);
            const hasHeavyActivity = activities.some(a => ['Guitar Class', 'Golf', 'Band Practice'].includes(a.title));
            const assignmentCapacity = dayOfWeek === 6 ? 2 : (hasHeavyActivity ? 3 : 4);
            
            let priorities: string[] = [];
            if (weekNumber === 2) priorities = ['Math', 'Journalism', 'Civics'];
            else if (weekNumber === 3) priorities = ['Civics', 'Journalism', 'Language'];
            else if (weekNumber === 4) priorities = ['Language', 'Civics', 'Journalism'];
            else priorities = ['Science', 'Spanish', 'Journalism', 'Civics', 'Language', 'Math'];
            
            if (dayOfWeek === 2) priorities = ['Math', ...priorities.filter(p => p !== 'Math')];
            
            assignmentsForDay = pullGenericAssignments(assignmentCapacity, priorities);
            bonusAssignments = pullGenericAssignments(2, priorities);
        }
        
        if (assignmentsForDay.length > 0 || bonusAssignments.length > 0) {
             schedule.set(dateKey, { assignments: assignmentsForDay, bonus: bonusAssignments });
        }
        
        remainingAssignments = Object.values(subjectPools).reduce((sum, pool) => sum + pool.length, 0);
        cursorDate.setDate(cursorDate.getDate() + 1);
        if (cursorDate.getFullYear() > 2026) break;
    }
    return schedule;
};

export const useSchedule = (assignments: Assignment[], completedActivities: Record<string, string[]>) => {

  const masterSchedule = useMemo(() => generateMasterSchedule(), []);

  const { completedAssignmentsByDate, uncompletedAssignments, completedCount, assignmentsById } = useMemo(() => {
    const completed: { [key: string]: Assignment[] } = {};
    const uncompleted: Assignment[] = [];
    const byId: { [key: string]: Assignment } = {};
    
    assignments.forEach(a => {
      byId[a.id] = a;
      if (a.completionDate) {
        if (!completed[a.completionDate]) completed[a.completionDate] = [];
        completed[a.completionDate].push(a);
      } else {
        uncompleted.push(a);
      }
    });
    
    return {
      completedAssignmentsByDate: completed,
      uncompletedAssignments: uncompleted,
      completedCount: assignments.length - uncompleted.length,
      assignmentsById: byId
    };
  }, [assignments]);
  
  const estimatedFinishDate = useMemo(() => {
    if (uncompletedAssignments.length === 0) {
        const dates = Object.keys(completedAssignmentsByDate);
        if(dates.length === 0) return new Date();
        dates.sort();
        const lastDate = new Date(dates[dates.length - 1]);
        lastDate.setMinutes(lastDate.getMinutes() + lastDate.getTimezoneOffset());
        return lastDate;
    }

    const cursorDate = new Date();
    cursorDate.setHours(0,0,0,0);
    
    if (START_DATE.getTime() > cursorDate.getTime()){
        cursorDate.setTime(START_DATE.getTime());
    }

    let remainingCount = uncompletedAssignments.length;
    let lastDate = cursorDate;

    while (remainingCount > 0) {
        const dayOfWeek = cursorDate.getDay();
        if (dayOfWeek !== 0) {
            const activities = getActivitiesForDay(cursorDate);
            const hasHeavyActivity = activities.some(a => ['Guitar Class', 'Golf', 'Band Practice'].includes(a.title));
            let assignmentCapacity = dayOfWeek === 6 ? 2 : (hasHeavyActivity ? 3 : 4);
            remainingCount -= assignmentCapacity;
        }
        lastDate = new Date(cursorDate);
        cursorDate.setDate(cursorDate.getDate() + 1);
        if (cursorDate.getFullYear() > 2026) break; 
    }
    return lastDate;
  }, [uncompletedAssignments, completedAssignmentsByDate]);

  const getScheduleForDate = useCallback((date: Date): DaySchedule => {
    const dateKey = toISODateString(date);
    const plannedDay = masterSchedule.get(dateKey);
    const activities = getActivitiesForDay(date);

    const getFreshAssignment = (id: string) => assignmentsById[id];
    
    const primaryAssignments = (plannedDay?.assignments || [])
        .map(a => getFreshAssignment(a.id))
        .filter((a): a is Assignment => !!a);
        
    const bonusAssignments = (plannedDay?.bonus || [])
        .map(a => getFreshAssignment(a.id))
        .filter((a): a is Assignment => !!a);

    const completedToday = completedAssignmentsByDate[dateKey] || [];
    const completedOffSchedule = completedToday.filter(completed => 
        !primaryAssignments.some(p => p.id === completed.id) &&
        !bonusAssignments.some(b => b.id === completed.id)
    );
    
    const items: ScheduledItem[] = [...activities, ...primaryAssignments, ...completedOffSchedule];
    return { date: dateKey, items, bonusItems: bonusAssignments };
  }, [masterSchedule, assignmentsById, completedAssignmentsByDate]);

   // Gamification Calculations
  const { totalXp, level, xpForNextLevel, xpForCurrentLevel, dailyStreak } = useMemo(() => {
    const assignmentXp = assignments.reduce((sum, a) => a.completionDate ? sum + a.xp : sum, 0);
    
    const activityXp = Object.values(completedActivities).flat().reduce((sum, activityId) => {
        const activity = recurringActivities.find(a => a.id === activityId);
        return sum + (activity?.xp || 0);
    }, 0);

    const xp = assignmentXp + activityXp;
    
    let currentLevel = 1;
    for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
        if (xp >= LEVEL_THRESHOLDS[i]) {
            currentLevel = i + 1;
            break;
        }
    }
    
    const xpForLvl = LEVEL_THRESHOLDS[currentLevel - 1] ?? 0;
    const xpForNext = LEVEL_THRESHOLDS[currentLevel] ?? xpForLvl;

    // Daily streak calculation
    let currentStreak = 0;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 1; i < 365; i++) {
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - i);
        
        if (pastDate.getTime() < START_DATE.getTime()) break;

        const dateKey = toISODateString(pastDate);
        const plannedDay = masterSchedule.get(dateKey);
        
        const scheduledActivities = getActivitiesForDay(pastDate);
        const scheduledAssignments = plannedDay?.assignments || [];
        
        if (scheduledActivities.length === 0 && scheduledAssignments.length === 0) {
            continue; 
        }

        const completedActsForPastDay = completedActivities[dateKey] || [];
        
        const allActivitiesDone = scheduledActivities.every(act => completedActsForPastDay.includes(act.id));
        const allAssignmentsDone = scheduledAssignments.every(assign => assignmentsById[assign.id]?.completionDate);
        
        if (allActivitiesDone && allAssignmentsDone) {
            currentStreak++;
        } else {
            break;
        }
    }

    return { totalXp: xp, level: currentLevel, xpForNextLevel: xpForNext, xpForCurrentLevel: xpForLvl, dailyStreak: currentStreak };
  }, [assignments, completedActivities, masterSchedule, assignmentsById]);


  return { getScheduleForDate, estimatedFinishDate, completedCount, totalXp, level, xpForNextLevel, xpForCurrentLevel, dailyStreak };
};
