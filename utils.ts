
export const toISODateString = (date: Date): string => {
  // This function creates a date string like "2025-07-07" in the user's local timezone,
  // avoiding the issues with .toISOString() which converts to UTC first.
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};
