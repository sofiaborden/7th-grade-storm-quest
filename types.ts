export interface Assignment {
  id: string;
  type: 'Assignment';
  subject: string;
  name: string;
  completionDate: string | null; // ISO date string
  xp: number;
}

export interface Activity {
  id:string;
  type: 'Activity';
  title: string;
  time: string;
  icon: 'Book' | 'Guitar' | 'Golf' | 'Band' | 'Dumbbell' | 'Lunch' | 'Bed' | 'Math';
  days: number[]; // 0 = Sunday, 1 = Monday, etc.
  xp: number;
  completionDate: string | null; // Can now be completed
}

export type ScheduledItem = Assignment | Activity;

export interface DaySchedule {
  date: string; // ISO date string
  items: ScheduledItem[];
  bonusItems?: Assignment[];
}