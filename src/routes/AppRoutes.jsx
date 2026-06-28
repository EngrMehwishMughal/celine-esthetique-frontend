/**
 * All website URLs are defined here.
 * Each path maps to one page — e.g. /booking opens the booking flow.
 */
// Import Routes and Route from React Router to set up page URLs
import { Routes, Route } from "react-router-dom";
// Import the home page component shown at the site root URL /
import HomePage from "../pages/HomePage";
// Import the services listing page
import Services from "../pages/Services";
// Import the photo gallery page
import GalleryPage from "../pages/GalleryPage";
// Import the about us page
import About from "../pages/About";
// Import the contact page
import Contact from "../pages/Contact";
// Import the appointment booking flow page
import BookingPage from "../pages/BookingPage";
// Import the client dashboard page
import DashboardPage from "../pages/DashboardPage";
// Import the user profile settings page
import ProfilePage from "../pages/ProfilePage";
// Import the page that shows details for one appointment
import AppointmentDetailsPage from "../pages/AppointmentDetailsPage";
// Import the page where clients can reschedule an appointment
import ReschedulePage from "../pages/ReschedulePage";

// Define the AppRoutes component that maps URLs to page components
const AppRoutes = () => {
  // Return a collection of route definitions
  return (
    <Routes>
      {/* Public marketing pages */}
      {/* Show HomePage when the user visits the home URL / */}
      <Route path="/" element={<HomePage />} />
      {/* Show Services when the user visits /services */}
      <Route path="/services" element={<Services />} />
      {/* Show GalleryPage when the user visits /gallery */}
      <Route path="/gallery" element={<GalleryPage />} />
      {/* Show About when the user visits /about */}
      <Route path="/about" element={<About />} />
      {/* Show Contact when the user visits /contact */}
      <Route path="/contact" element={<Contact />} />

      {/* Booking flow */}
      {/* Show BookingPage when the user visits /booking */}
      <Route path="/booking" element={<BookingPage />} />

      {/* Client account area */}
      {/* Show DashboardPage when the user visits /dashboard */}
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* Show ProfilePage when the user visits /profile */}
      <Route path="/profile" element={<ProfilePage />} />
      {/* Show appointment details when the URL includes an appointment id */}
      <Route path="/dashboard/appointments/:id" element={<AppointmentDetailsPage />} />
      {/* Show the reschedule form for a specific appointment by id */}
      <Route path="/dashboard/appointments/:id/reschedule" element={<ReschedulePage />} />
    </Routes>
  );
};

// Export AppRoutes so App.jsx can render all page routes
export default AppRoutes;
