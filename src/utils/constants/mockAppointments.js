// Import list of bookable services used to attach full service objects to appointments
import { bookingServices } from "./bookingServices";
// Import status enum and helper to compute dates relative to today
import {
  APPOINTMENT_STATUS,
  dateTimeFromOffset,
} from "../helpers/appointmentHelpers";

// Look up one service object from the catalogue by its id
const findService = (id) => bookingServices.find((service) => service.id === id);

// Shared client details reused on every sample appointment
const client = {
  firstName: "Sophie", // Client first name on every demo booking
  lastName: "Martin", // Client last name on every demo booking
  email: "sophie.martin@email.com", // Client email on every demo booking
  phone: "+41 79 123 45 67", // Client phone on every demo booking
  notes: "", // Empty special requests field
};

// Return a fixed set of demo appointments with varied dates and statuses
export const getSeedAppointments = () => {
  // Appointment three days from now
  const inThreeDays = dateTimeFromOffset({ days: 3 });
  // Appointment five days from now
  const inFiveDays = dateTimeFromOffset({ days: 5 });
  // Appointment about twelve hours from now (tests short-notice rules)
  const inTwelveHours = dateTimeFromOffset({ hours: 12 });
  // Completed visit one week ago
  const lastWeek = dateTimeFromOffset({ days: -7 });
  // Completed visit about a month ago
  const lastMonth = dateTimeFromOffset({ days: -28 });
  // Cancelled visit two weeks ago
  const cancelledPast = dateTimeFromOffset({ days: -14 });

  return [
    // Upcoming confirmed gel application
    {
      id: "apt-001",
      referenceId: "CEL-A1B2C3",
      service: findService("gel-application"),
      date: inThreeDays.date,
      time: inThreeDays.time,
      client,
      status: APPOINTMENT_STATUS.CONFIRMED,
      createdAt: new Date().toISOString(),
    },
    // Upcoming confirmed head spa at a fixed afternoon time
    {
      id: "apt-002",
      referenceId: "CEL-D4E5F6",
      service: findService("head-spa-japanese"),
      date: inFiveDays.date,
      time: "14:00",
      client,
      status: APPOINTMENT_STATUS.CONFIRMED,
      createdAt: new Date().toISOString(),
    },
    // Upcoming confirmed pedicure very soon (within 24 hours)
    {
      id: "apt-003",
      referenceId: "CEL-G7H8I9",
      service: findService("pedicure"),
      date: inTwelveHours.date,
      time: inTwelveHours.time,
      client,
      status: APPOINTMENT_STATUS.CONFIRMED,
      createdAt: new Date().toISOString(),
    },
    // Past completed manicure
    {
      id: "apt-004",
      referenceId: "CEL-J1K2L3",
      service: findService("manicure"),
      date: lastWeek.date,
      time: "10:30",
      client,
      status: APPOINTMENT_STATUS.COMPLETED,
      createdAt: new Date().toISOString(),
    },
    // Older completed eyelash lift
    {
      id: "apt-005",
      referenceId: "CEL-M4N5O6",
      service: findService("eyelash-lift"),
      date: lastMonth.date,
      time: "11:00",
      client,
      status: APPOINTMENT_STATUS.COMPLETED,
      createdAt: new Date().toISOString(),
    },
    // Past appointment that was cancelled
    {
      id: "apt-006",
      referenceId: "CEL-P7Q8R9",
      service: findService("revitalization-treatment"),
      date: cancelledPast.date,
      time: "15:30",
      client,
      status: APPOINTMENT_STATUS.CANCELLED,
      createdAt: new Date().toISOString(),
      cancelledAt: new Date().toISOString(),
    },
  ];
};

// Key used when saving appointments in the browser's localStorage
export const APPOINTMENTS_STORAGE_KEY = "celine_user_appointments";
