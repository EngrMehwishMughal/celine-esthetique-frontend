// Import helper that formats dates as "YYYY-MM-DD" strings
import { formatDateKey } from "./bookingHelpers";

// String values used for appointment status across the app
export const APPOINTMENT_STATUS = {
  CONFIRMED: "confirmed",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
};

// Combine appointment date and time strings into one JavaScript Date
export const getAppointmentDateTime = (appointment) => {
  const [year, month, day] = appointment.date.split("-").map(Number);
  const [hours, minutes] = appointment.time.split(":").map(Number);
  // Month is 0-based in the Date constructor
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
};

// How many hours from now until the appointment starts (can be negative if past)
export const getHoursUntilAppointment = (appointment) => {
  const appointmentDate = getAppointmentDateTime(appointment);
  const diffMs = appointmentDate.getTime() - Date.now();
  // Convert milliseconds to hours
  return diffMs / (1000 * 60 * 60);
};

// User can cancel only confirmed appointments more than 24 hours away
export const canCancelAppointment = (appointment) => {
  if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) return false;
  return getHoursUntilAppointment(appointment) > 24;
};

// User can reschedule only confirmed appointments that have not started yet
export const canRescheduleAppointment = (appointment) => {
  if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) return false;
  return getAppointmentDateTime(appointment) > new Date();
};

// Upcoming means confirmed and scheduled in the future
export const isUpcomingAppointment = (appointment) => {
  if (appointment.status !== APPOINTMENT_STATUS.CONFIRMED) return false;
  return getAppointmentDateTime(appointment) > new Date();
};

// History is anything that is not upcoming (past, completed, or cancelled)
export const isHistoryAppointment = (appointment) => !isUpcomingAppointment(appointment);

// Sort appointments by date and time; "asc" = earliest first, "desc" = latest first
export const sortByDateTime = (appointments, direction = "asc") => {
  const multiplier = direction === "asc" ? 1 : -1;
  // Copy the array so we do not mutate the original list
  return [...appointments].sort(
    (a, b) =>
      multiplier *
      (getAppointmentDateTime(a).getTime() - getAppointmentDateTime(b).getTime())
  );
};

// Filter to upcoming only, then sort soonest first
export const getUpcomingAppointments = (appointments) =>
  sortByDateTime(appointments.filter(isUpcomingAppointment), "asc");

// Filter to history only, then sort most recent first
export const getHistoryAppointments = (appointments) =>
  sortByDateTime(appointments.filter(isHistoryAppointment), "desc");

// Display time as-is (placeholder if formatting is added later)
export const formatAppointmentTime = (time) => time;

// Human-readable status label for badges and lists
export const getStatusLabel = (appointment) => {
  if (appointment.status === APPOINTMENT_STATUS.CANCELLED) return "Cancelled";
  if (appointment.status === APPOINTMENT_STATUS.COMPLETED) return "Completed";
  if (isUpcomingAppointment(appointment)) return "Upcoming";
  return "Completed";
};

// Background and text colors for status badges in the UI
export const getStatusColor = (appointment) => {
  if (appointment.status === APPOINTMENT_STATUS.CANCELLED) {
    return { bg: "#F5F5F5", text: "#888888" };
  }
  if (isUpcomingAppointment(appointment)) {
    return { bg: "#FFF5F8", text: "#E1709A" };
  }
  return { bg: "#F0F9F4", text: "#4A9B6E" };
};

// Round a date to the nearest half hour (:00 or :30)
const roundToSlot = (date) => {
  const rounded = new Date(date);
  const minutes = rounded.getMinutes();
  rounded.setMinutes(minutes < 30 ? 0 : 30, 0, 0);
  return rounded;
};

// Build a date key and time string relative to now (used for mock data)
export const dateTimeFromOffset = ({ days = 0, hours = 0 }) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(date.getHours() + hours);
  const slot = roundToSlot(date);
  const h = String(slot.getHours()).padStart(2, "0");
  const m = String(slot.getMinutes()).padStart(2, "0");
  return {
    date: formatDateKey(slot),
    time: `${h}:${m}`,
  };
};
