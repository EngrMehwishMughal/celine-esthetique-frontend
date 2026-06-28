/**
 * Dashboard page — the client's home base after logging in.
 * Shows upcoming bookings, past visits, quick stats, and options to cancel or reschedule.
 */
// Import useState to track cancel dialog and success screen state
import { useState } from "react";
// Import Link for navigation and useNavigate to go to other pages programmatically
import { Link, useNavigate } from "react-router-dom";
// Icons for section headers and the book button
import { FaCalendarAlt, FaHistory, FaPlus } from "react-icons/fa";
// Shared layout wrapper for all dashboard pages
import DashboardShell from "../components/dashboard/DashboardShell";
// Page title area with badge, heading, and optional action button
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
// Titled card block for upcoming and history sections
import DashboardSection from "../components/dashboard/DashboardSection";
// Three summary stat cards at the top
import DashboardStats from "../components/dashboard/DashboardStats";
// Card for each upcoming booking
import UpcomingAppointmentCard from "../components/dashboard/UpcomingAppointmentCard";
// Compact row for each past booking
import HistoryAppointmentCard from "../components/dashboard/HistoryAppointmentCard";
// Friendly message when a list is empty
import EmptyState from "../components/dashboard/EmptyState";
// Grey loading placeholders
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
// Popup to confirm cancellation
import CancelAppointmentDialog from "../components/dashboard/CancelAppointmentDialog";
// Thank-you screen after a successful cancel
import CancelSuccessState from "../components/dashboard/CancelSuccessState";
// Custom hook that loads and manages appointment data
import { useAppointments } from "../hooks/useAppointments";

// Main dashboard page component
const DashboardPage = () => {
  // Hook for programmatic navigation (e.g. to reschedule page)
  const navigate = useNavigate();
  // Load upcoming list, history list, loading flag, cancel function, and all appointments
  const { upcoming, history, loading, cancelAppointment, appointments } = useAppointments();
  // appointment user wants to cancel — opens the cancel dialog when set
  const [cancelTarget, setCancelTarget] = useState(null);
  // True while the cancel request is being processed
  const [isCancelling, setIsCancelling] = useState(false);
  // show success screen after cancel — set to the cancelled appointment object
  const [cancelledAppointment, setCancelledAppointment] = useState(null);

  // Try to get the client's first name from the first appointment for a personalised greeting
  const clientName = appointments[0]?.client?.firstName;

  // When user clicks Cancel on a card — store which appointment to cancel
  const handleCancelClick = (appointment) => {
    setCancelTarget(appointment);
  };

  // When user clicks Reschedule — go to the reschedule page for that booking
  const handleReschedule = (appointment) => {
    navigate(`/dashboard/appointments/${appointment.id}/reschedule`);
  };

  // When user confirms cancellation in the dialog
  const handleConfirmCancel = async () => {
    // Safety check — do nothing if no appointment was selected
    if (!cancelTarget) return;

    // Show loading state on the confirm button
    setIsCancelling(true);
    // Brief delay to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 700));
    // Mark the appointment as cancelled in local state
    const updated = cancelAppointment(cancelTarget.id);
    // Reset dialog state
    setIsCancelling(false);
    setCancelTarget(null);
    // Switch the page to the success screen
    setCancelledAppointment(updated);
    // Scroll to top so the user sees the success message
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // After a successful cancel, swap the whole page for the success message
  if (cancelledAppointment) {
    return (
      <DashboardShell narrow>
        <CancelSuccessState
          appointment={cancelledAppointment}
          onDone={() => setCancelledAppointment(null)}
        />
      </DashboardShell>
    );
  }

  // Main dashboard view
  return (
    <DashboardShell>
      {/* Page header with welcome message and book button */}
      <DashboardPageHeader
        badge="Your Account"
        title={clientName ? `Welcome back, ${clientName}` : "My Dashboard"}
        subtitle="Manage your upcoming bookings, view your appointment history, and reschedule or cancel with ease."
        action={
          /* Pink "Book Appointment" button in the header */
          <Link
            to="/booking"
            className="inline-flex h-[50px] items-center justify-center gap-2 rounded-[10px] bg-[#E85A8A] px-6 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87] hover:shadow-[0_6px_20px_rgba(232,90,138,0.4)] sm:px-7"
          >
            <FaPlus className="text-[11px]" />
            Book Appointment
          </Link>
        }
      />

      {loading ? (
        /* Grey skeleton placeholders while data loads */
        <DashboardSkeleton />
      ) : (
        <>
          {/* Three stat cards: upcoming count, history count, next appointment */}
          <DashboardStats
            upcomingCount={upcoming.length}
            historyCount={history.length}
            nextAppointment={upcoming[0] ?? null}
          />

          <div className="space-y-8 sm:space-y-10">
            {/* Upcoming appointments section */}
            <DashboardSection
              icon={FaCalendarAlt}
              title="Upcoming Appointments"
              description="Your confirmed bookings — view details, reschedule, or cancel anytime."
              count={upcoming.length}
            >
              {upcoming.length === 0 ? (
                <EmptyState
                  title="No Upcoming Appointments"
                  description="You don't have any upcoming bookings yet. Book your next treatment and it will appear here."
                  action={
                    <Link
                      to="/booking"
                      className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87]"
                    >
                      Book Your First Appointment
                    </Link>
                  }
                />
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-7">
                  {upcoming.map((appointment) => (
                    <UpcomingAppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                      onCancel={handleCancelClick}
                      onReschedule={handleReschedule}
                    />
                  ))}
                </div>
              )}
            </DashboardSection>

            {/* Past and cancelled appointments section */}
            <DashboardSection
              icon={FaHistory}
              title="Appointment History"
              description="A record of your past visits and cancelled bookings."
              count={history.length}
            >
              {history.length === 0 ? (
                <EmptyState
                  title="No Appointment History"
                  description="Once you complete or cancel appointments, they will appear in your history."
                />
              ) : (
                <div className="space-y-4 sm:space-y-5">
                  {history.map((appointment) => (
                    <HistoryAppointmentCard
                      key={appointment.id}
                      appointment={appointment}
                    />
                  ))}
                </div>
              )}
            </DashboardSection>
          </div>
        </>
      )}

      {/* Cancel confirmation popup — opens when cancelTarget is set */}
      <CancelAppointmentDialog
        appointment={cancelTarget}
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleConfirmCancel}
        isSubmitting={isCancelling}
      />
    </DashboardShell>
  );
};

export default DashboardPage;
