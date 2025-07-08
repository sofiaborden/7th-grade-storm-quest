import { Assignment, Activity } from './types';

// Assign XP based on perceived effort - Weather themed!
const standardXP = 50;      // ☀️ Sunny Day (Easy)
const dbaXP = 75;          // ⛅ Partly Cloudy (Medium)
const examXP = 150;        // 🌧️ Rainy Day (Hard)
const bigExamXP = 200;     // ⛈️ Thunderstorm (Very Hard)
const paperXP = 100;       // 🌤️ Overcast (Medium-Hard)
const activityXP = 15;     // 🌈 Rainbow (Fun & Easy)

// Weather difficulty mapping
export const getWeatherForXP = (xp: number): { emoji: string; description: string; color: string } => {
  if (xp >= 200) return { emoji: '⛈️', description: 'Thunderstorm', color: 'text-purple-600 dark:text-purple-200' };
  if (xp >= 150) return { emoji: '🌧️', description: 'Rainy Day', color: 'text-blue-600 dark:text-blue-200' };
  if (xp >= 100) return { emoji: '🌤️', description: 'Overcast', color: 'text-gray-600 dark:text-gray-200' };
  if (xp >= 75) return { emoji: '⛅', description: 'Partly Cloudy', color: 'text-slate-600 dark:text-slate-200' };
  if (xp >= 50) return { emoji: '☀️', description: 'Sunny', color: 'text-yellow-600 dark:text-yellow-200' };
  return { emoji: '🌈', description: 'Rainbow', color: 'text-pink-600 dark:text-pink-200' };
};

export const initialAssignments: Assignment[] = [
  // Science Semester 2
  { id: 'sci-1', subject: 'Science', name: '05.05 Module 05 Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'sci-2', subject: 'Science', name: '05.06 Advanced Module 05 Exam Honors', completionDate: null, xp: examXP },
  { id: 'sci-3', subject: 'Science', name: '06.01 Biotechnology', completionDate: null, xp: standardXP },
  { id: 'sci-4', subject: 'Science', name: '06.02 Heredity', completionDate: null, xp: standardXP },
  { id: 'sci-5', subject: 'Science', name: '06.03 Patterns of Inheritance', completionDate: null, xp: standardXP },
  { id: 'sci-6', subject: 'Science', name: '06.04 Mitosis and Meiosis', completionDate: null, xp: standardXP },
  { id: 'sci-7', subject: 'Science', name: '06.05 Module 06 Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'sci-8', subject: 'Science', name: '06.06 Advanced Module 06 Exam Honors', completionDate: null, xp: examXP },
  { id: 'sci-9', subject: 'Science', name: '06.07 Advanced Segment 02 Exam Part One Honors', completionDate: null, xp: bigExamXP },
  { id: 'sci-10', subject: 'Science', name: '06.07 Advanced Segment 02 Exam Part Two Honors', completionDate: null, xp: bigExamXP },
  // Spanish Semester 1
  { id: 'spa-1', subject: 'Spanish', name: '01.06 ¡Conversemos! Discussion Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'spa-2', subject: 'Spanish', name: '01.10 My life and me exam', completionDate: null, xp: bigExamXP },
  { id: 'spa-3', subject: 'Spanish', name: '02.06 ¡Conversemos! Discussion Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'spa-4', subject: 'Spanish', name: '02.07 Voice Activity', completionDate: null, xp: standardXP },
  { id: 'spa-5', subject: 'Spanish', name: '02.08 Me gusta la escuela', completionDate: null, xp: standardXP },
  { id: 'spa-6', subject: 'Spanish', name: '02.09 Oral Evaluation', completionDate: null, xp: standardXP },
  { id: 'spa-7', subject: 'Spanish', name: '02.10 Segment One Exam', completionDate: null, xp: bigExamXP },
  // Journalism Semester 2
  { id: 'jour-1', subject: 'Journalism', name: '04.04 The Write Stuff Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'jour-2', subject: 'Journalism', name: '05.03 Visual News', completionDate: null, xp: standardXP },
  { id: 'jour-3', subject: 'Journalism', name: '05.04 Now Hear This', completionDate: null, xp: standardXP },
  { id: 'jour-4', subject: 'Journalism', name: '06.02 The Op-Ed', completionDate: null, xp: paperXP },
  { id: 'jour-5', subject: 'Journalism', name: '06.03 Point Taken Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'jour-6', subject: 'Journalism', name: '06.04 Segment Two Exam', completionDate: null, xp: examXP },
  // Civics Semester 2
  { id: 'civ-1', subject: 'Civics', name: '04.05 Art Inspiring Action (Advanced) Honors', completionDate: null, xp: paperXP },
  { id: 'civ-2', subject: 'Civics', name: '04.07 The Election Process', completionDate: null, xp: paperXP },
  { id: 'civ-3', subject: 'Civics', name: '04.08 Active Citizens Review and Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'civ-4', subject: 'Civics', name: '04.09 Active Citizens Unit Exam', completionDate: null, xp: bigExamXP },
  { id: 'civ-5', subject: 'Civics', name: '05.01 Comparing Forms and Systems of Government', completionDate: null, xp: standardXP },
  { id: 'civ-6', subject: 'Civics', name: '05.02 Standards of Living', completionDate: null, xp: paperXP },
  { id: 'civ-7', subject: 'Civics', name: '05.03 Single Resource v. Diversified Economies', completionDate: null, xp: standardXP },
  { id: 'civ-8', subject: 'Civics', name: '05.04 Global Current Events (Advanced) Honors', completionDate: null, xp: paperXP },
  { id: 'civ-9', subject: 'Civics', name: '05.05 Foreign and Domestic Policies', completionDate: null, xp: standardXP },
  { id: 'civ-10', subject: 'Civics', name: '05.06 Currency Exchange and Trade', completionDate: null, xp: paperXP },
  { id: 'civ-11', subject: 'Civics', name: '05.07 The United States and International Affairs', completionDate: null, xp: standardXP },
  { id: 'civ-12', subject: 'Civics', name: '05.08 Going Global Review and Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'civ-13', subject: 'Civics', name: '05.09 Going Global Unit Exam', completionDate: null, xp: bigExamXP },
  { id: 'civ-14', subject: 'Civics', name: '06.01 Wants, Needs, Availability, and Costs', completionDate: null, xp: standardXP },
  { id: 'civ-15', subject: 'Civics', name: '06.02 Entrepreneurs and Incentives', completionDate: null, xp: paperXP },
  { id: 'civ-16', subject: 'Civics', name: '06.03 The Role of Competition', completionDate: null, xp: standardXP },
  { id: 'civ-17', subject: 'Civics', name: '06.04 The Banking System', completionDate: null, xp: standardXP },
  { id: 'civ-18', subject: 'Civics', name: '06.05 Taxes and Budgeting', completionDate: null, xp: paperXP },
  { id: 'civ-19', subject: 'Civics', name: '06.06 The Federal Budget (Advanced) Honors', completionDate: null, xp: paperXP },
  { id: 'civ-20', subject: 'Civics', name: '06.07 Borrowing and Lending', completionDate: null, xp: standardXP },
  { id: 'civ-21', subject: 'Civics', name: '06.08 American Money Review and Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'civ-22', subject: 'Civics', name: '06.09 American Money Unit Exam', completionDate: null, xp: bigExamXP },
  { id: 'civ-23', subject: 'Civics', name: '06.10 Segment Two Exam (Advanced) Honors', completionDate: null, xp: bigExamXP },
  // Language Semester 1
  { id: 'lang-1', subject: 'Language', name: '02.07 Wrap It Up – Paper Due', completionDate: null, xp: paperXP },
  { id: 'lang-2', subject: 'Language', name: '02.10 Advanced On the Case Honors', completionDate: null, xp: standardXP },
  { id: 'lang-3', subject: 'Language', name: '03.02 On the Hunt for Fallacies', completionDate: null, xp: standardXP },
  { id: 'lang-4', subject: 'Language', name: '03.04 Helpful Affixes and Roots', completionDate: null, xp: standardXP },
  { id: 'lang-5', subject: 'Language', name: '03.05 Varying Viewpoints', completionDate: null, xp: standardXP },
  { id: 'lang-6', subject: 'Language', name: '03.06 Conquering Colons', completionDate: null, xp: standardXP },
  { id: 'lang-7', subject: 'Language', name: '03.07 Powerful Allusions', completionDate: null, xp: standardXP },
  { id: 'lang-8', subject: 'Language', name: '03.08 Advanced Which Pitch? Honors', completionDate: null, xp: standardXP },
  { id: 'lang-9', subject: 'Language', name: '03.09 Analyze This Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'lang-10', subject: 'Language', name: '03.10 Advanced Segment One Exam Honors', completionDate: null, xp: bigExamXP },
  // Math Semester 2
  { id: 'math-1', subject: 'Math', name: '04.07 Probability Exam', completionDate: null, xp: examXP },
  { id: 'math-2', subject: 'Math', name: '05.01 Area of Polygons and Composite Figures', completionDate: null, xp: standardXP },
  { id: 'math-3', subject: 'Math', name: '05.02 Scale Factor', completionDate: null, xp: standardXP },
  { id: 'math-4', subject: 'Math', name: '05.03 Circumference', completionDate: null, xp: standardXP },
  { id: 'math-5', subject: 'Math', name: '05.04 Area of Circles', completionDate: null, xp: standardXP },
  { id: 'math-6', subject: 'Math', name: '05.05 Surface Area of Cylinders', completionDate: null, xp: standardXP },
  { id: 'math-7', subject: 'Math', name: '05.06 Volume of Cylinders', completionDate: null, xp: standardXP },
  { id: 'math-8', subject: 'Math', name: '05.07 Geometry Practice Exam', completionDate: null, xp: dbaXP },
  { id: 'math-9', subject: 'Math', name: '05.08 Geometry Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'math-10', subject: 'Math', name: '05.09 Geometry Exam', completionDate: null, xp: examXP },
  { id: 'math-11', subject: 'Math', name: '06.01 Circle Graphs', completionDate: null, xp: standardXP },
  { id: 'math-12', subject: 'Math', name: '06.02 Creating Graphical Representations', completionDate: null, xp: standardXP },
  { id: 'math-13', subject: 'Math', name: '06.03 Appropriate Measures', completionDate: null, xp: standardXP },
  { id: 'math-14', subject: 'Math', name: '06.04 Comparing Data', completionDate: null, xp: standardXP },
  { id: 'math-15', subject: 'Math', name: '06.05 Making Predictions', completionDate: null, xp: standardXP },
  { id: 'math-16', subject: 'Math', name: '06.06 Statistics Practice Exam', completionDate: null, xp: dbaXP },
  { id: 'math-17', subject: 'Math', name: '06.07 Statistics Discussion-Based Assessment', completionDate: null, xp: dbaXP },
  { id: 'math-18', subject: 'Math', name: '06.08 Statistics Exam', completionDate: null, xp: examXP },
  { id: 'math-19', subject: 'Math', name: '06.09 Segment Two Practice Exam', completionDate: null, xp: dbaXP },
  { id: 'math-20', subject: 'Math', name: '06.10 Segment Two Exam Part One', completionDate: null, xp: examXP },
  { id: 'math-21', subject: 'Math', name: '06.10 Segment Two Exam Part Two', completionDate: null, xp: examXP },
].map(a => ({...a, type: 'Assignment' as const}));


export const recurringActivities: Activity[] = [
    { id: 'act-wake', type: 'Activity', title: 'Wake up, breakfast, stretch', time: '8:30 am', icon: 'Dumbbell', days: [1, 2, 3, 4, 5], xp: activityXP, completionDate: null },
    { id: 'act-read', type: 'Activity', title: 'Reading', time: '10:15 am', icon: 'Book', days: [1, 2, 3, 4, 5], xp: activityXP, completionDate: null },
    { id: 'act-lunch', type: 'Activity', title: 'Lunch', time: '12:00 pm', icon: 'Lunch', days: [1, 2, 3, 4, 5], xp: 5, completionDate: null },
    { id: 'act-music', type: 'Activity', title: 'Music Practice', time: '1:00 pm', icon: 'Guitar', days: [1, 2, 3, 4, 5], xp: activityXP, completionDate: null },
    { id: 'act-guitar', type: 'Activity', title: 'Guitar Class', time: '2:00 pm', icon: 'Guitar', days: [1], xp: activityXP, completionDate: null },
    { id: 'act-tutor', type: 'Activity', title: 'Math Tutoring', time: '11:00 am', icon: 'Math', days: [2], xp: activityXP, completionDate: null },
    { id: 'act-golf', type: 'Activity', title: 'Golf', time: '5:45 pm', icon: 'Golf', days: [2], xp: activityXP, completionDate: null },
    { id: 'act-band', type: 'Activity', title: 'Band Practice', time: '4:40 pm', icon: 'Band', days: [3], xp: activityXP, completionDate: null },
    { id: 'act-winddown', type: 'Activity', title: 'Wind down', time: '9:00 pm', icon: 'Bed', days: [0, 1, 2, 3, 4, 5, 6], xp: 5, completionDate: null },
];

export const SUBJECT_COLORS: { [key: string]: { base: string, dark: string, neon: string } } = {
  'Science':    { base: 'bg-teal-300 text-teal-900',      dark: 'dark:bg-teal-700/80 dark:text-teal-100',    neon: 'shadow-teal-400/50' },
  'Spanish':    { base: 'bg-rose-300 text-rose-900',      dark: 'dark:bg-rose-700/80 dark:text-rose-100',      neon: 'shadow-rose-400/50' },
  'Journalism': { base: 'bg-amber-300 text-amber-900',    dark: 'dark:bg-amber-700/80 dark:text-amber-100',  neon: 'shadow-amber-400/50' },
  'Civics':     { base: 'bg-lime-300 text-lime-900',      dark: 'dark:bg-lime-700/80 dark:text-lime-100',    neon: 'shadow-lime-400/50' },
  'Language':   { base: 'bg-violet-300 text-violet-900',  dark: 'dark:bg-violet-700/80 dark:text-violet-100',neon: 'shadow-violet-400/50' },
  'Math':       { base: 'bg-sky-300 text-sky-900',        dark: 'dark:bg-sky-700/80 dark:text-sky-100',      neon: 'shadow-sky-400/50' },
};

export const LEVEL_THRESHOLDS = [0, 500, 1200, 2200, 3500, 5000, 7000, 10000]; // XP needed to reach level (index+1)

export const TARGET_FINISH_date = new Date('2025-08-08T00:00:00');
export const START_DATE = new Date('2025-07-07T00:00:00');