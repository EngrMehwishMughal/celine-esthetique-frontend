// Import the flat list of all bookable services from the main catalogue
import { flatBookingServices } from "./servicesCatalog";

/**
 * The booking flow and dashboard consume the full treatment catalogue
 * (30+ services) defined in `servicesCatalog.js`, flattened to a simple shape.
 */
// Re-export the flat list under a name used by booking pages
export const bookingServices = flatBookingServices;

// Steps shown in the booking wizard progress bar
export const BOOKING_STEPS = [
  { id: 1, label: "Service" }, // Step 1: pick a treatment
  { id: 2, label: "Date" }, // Step 2: pick a day
  { id: 3, label: "Time" }, // Step 3: pick a time slot
  { id: 4, label: "Details" }, // Step 4: enter client details
  { id: 5, label: "Confirm" }, // Step 5: review and confirm
];
