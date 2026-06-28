// Short names for days of the week shown in the calendar header
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// Full month names used in calendar labels
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Turn a Date object into a string like "2026-06-28" for storage and keys
export const formatDateKey = (date) => {
  const y = date.getFullYear();
  // getMonth() is 0-based, so add 1; padStart keeps two digits (e.g. "06")
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

// Turn a date key like "2026-06-28" into a friendly label for the UI
export const formatDisplayDate = (dateKey) => {
  const [y, m, d] = dateKey.split("-").map(Number);
  // Month in Date constructor is 0-based, so subtract 1 from m
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

// Build an array of Date objects (and nulls) for one calendar month grid
export const getCalendarDays = (year, month) => {
  // First day of the month
  const firstDay = new Date(year, month, 1);
  // Last day of the month (day 0 of next month = last day of this month)
  const lastDay = new Date(year, month + 1, 0);
  // How many empty cells before the 1st (Sunday = 0)
  const startPad = firstDay.getDay();
  const days = [];

  // Add null placeholders for days before the 1st of the month
  for (let i = 0; i < startPad; i++) {
    days.push(null);
  }

  // Add a Date for each day from 1 through the last day of the month
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};

// Return a label like "June 2026" for the calendar title
export const getMonthLabel = (year, month) => `${MONTHS[month]} ${year}`;

// Decide whether the user is allowed to pick this date when booking
export const isDateSelectable = (date) => {
  const today = new Date();
  // Compare dates at midnight so time of day does not matter
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  // Bookings are allowed up to 60 days ahead
  maxDate.setDate(maxDate.getDate() + 60);

  // Must be today or later, within 60 days, and not a Sunday (getDay() === 0)
  return date >= today && date <= maxDate && date.getDay() !== 0;
};

// Create half-hour time slots from 9:00 to 17:30 with fake availability
export const generateTimeSlots = (dateKey) => {
  const slots = [];
  const startHour = 9;
  const endHour = 18;

  // Loop each hour from 9 up to (but not including) 18
  for (let hour = startHour; hour < endHour; hour++) {
    // Offer :00 and :30 for each hour
    for (const minute of [0, 30]) {
      const h = String(hour).padStart(2, "0");
      const m = String(minute).padStart(2, "0");
      slots.push(`${h}:${m}`);
    }
  }

  // Simple number from the date so the same day always gets the same pattern
  const seed = dateKey.split("-").reduce((acc, part) => acc + Number(part), 0);
  // Mark some slots unavailable based on index (demo logic, not real booking data)
  return slots.map((time, index) => ({
    time,
    available: (seed + index) % 5 !== 0,
  }));
};

// Re-export weekday and month names for calendar components
export { WEEKDAYS, MONTHS };
