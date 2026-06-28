// Import React hooks used to manage state, side effects, and memoized values
import { useCallback, useEffect, useMemo, useState } from "react";
// Import storage key and helper that creates sample appointments
import {
  APPOINTMENTS_STORAGE_KEY,
  getSeedAppointments,
} from "../utils/constants/mockAppointments";
// Import status values and helpers that split upcoming vs past appointments
import {
  APPOINTMENT_STATUS,
  getHistoryAppointments,
  getUpcomingAppointments,
} from "../utils/helpers/appointmentHelpers";

// Custom hook that loads, saves, and updates appointments in the browser
export const useAppointments = () => {
  // Holds the full list of appointments in memory
  const [appointments, setAppointments] = useState([]);
  // True while we are reading from localStorage on first load
  const [loading, setLoading] = useState(true);

  // Run once when the hook mounts to load saved data or seed defaults
  useEffect(() => {
    // Small delay so the UI can show a loading state briefly
    const timer = setTimeout(() => {
      // Try to read previously saved appointments from the browser
      const stored = localStorage.getItem(APPOINTMENTS_STORAGE_KEY);
      // If saved data exists, parse and use it
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        // Otherwise create fresh sample appointments
        const seed = getSeedAppointments();
        // Save the sample data so it persists on next visit
        localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(seed));
        // Put the sample data into React state
        setAppointments(seed);
      }
      // Loading is finished whether we used stored or seed data
      setLoading(false);
    }, 600);

    // Cleanup: cancel the timer if the component unmounts early
    return () => clearTimeout(timer);
  }, []);

  // Save appointments to localStorage and update React state
  const persist = useCallback((updated) => {
    localStorage.setItem(APPOINTMENTS_STORAGE_KEY, JSON.stringify(updated));
    setAppointments(updated);
  }, []);

  // Find one appointment by its unique id
  const getById = useCallback(
    (id) => appointments.find((appointment) => appointment.id === id),
    [appointments]
  );

  // Mark an appointment as cancelled and record when that happened
  const cancelAppointment = useCallback(
    (id) => {
      // Map over all appointments and change only the matching one
      const updated = appointments.map((appointment) =>
        appointment.id === id
          ? {
              // Keep existing fields and overwrite status and cancelledAt
              ...appointment,
              status: APPOINTMENT_STATUS.CANCELLED,
              cancelledAt: new Date().toISOString(),
            }
          : appointment
      );
      // Write the updated list to storage and state
      persist(updated);
      // Return the cancelled appointment object to the caller
      return updated.find((appointment) => appointment.id === id);
    },
    [appointments, persist]
  );

  // Change date and time for an appointment and record when it was rescheduled
  const rescheduleAppointment = useCallback(
    (id, date, time) => {
      // Map over all appointments and change only the matching one
      const updated = appointments.map((appointment) =>
        appointment.id === id
          ? {
              // Keep existing fields and overwrite date, time, and rescheduledAt
              ...appointment,
              date,
              time,
              rescheduledAt: new Date().toISOString(),
            }
          : appointment
      );
      // Write the updated list to storage and state
      persist(updated);
      // Return the rescheduled appointment object to the caller
      return updated.find((appointment) => appointment.id === id);
    },
    [appointments, persist]
  );

  // Future confirmed appointments, sorted soonest first
  const upcoming = useMemo(
    () => getUpcomingAppointments(appointments),
    [appointments]
  );

  // Past or cancelled appointments, sorted most recent first
  const history = useMemo(
    () => getHistoryAppointments(appointments),
    [appointments]
  );

  // Expose data and actions to components that use this hook
  return {
    appointments,
    upcoming,
    history,
    loading,
    getById,
    cancelAppointment,
    rescheduleAppointment,
  };
};
