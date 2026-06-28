/**
 * Appointment details page — full view of one booking.
 * Clients can reschedule or cancel from here (if the appointment allows it).
 */
// Import useState for cancel dialog and success screen state
import { useState } from "react";
// Import Link, useNavigate, and useParams for routing
import { Link, useNavigate, useParams } from "react-router-dom";
// Icons for warning, reschedule, and cancel buttons
import { FaExclamationCircle, FaRedo, FaTimes } from "react-icons/fa";
// Shared dashboard layout wrapper (narrow column)
import DashboardShell from "../components/dashboard/DashboardShell";
// Page title with back link
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
// Full booking detail breakdown
import AppointmentSummary from "../components/dashboard/AppointmentSummary";
// Cancel confirmation popup
import CancelAppointmentDialog from "../components/dashboard/CancelAppointmentDialog";
// Thank-you screen after successful cancel
import CancelSuccessState from "../components/dashboard/CancelSuccessState";
// Loading placeholders
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
// Hook to load and manage appointment data
import { useAppointments } from "../hooks/useAppointments";
// Helpers to check what actions are allowed on this booking
import {
  canCancelAppointment,
  canRescheduleAppointment,
  isUpcomingAppointment,
} from "../utils/helpers/appointmentHelpers";

// Appointment details page component
const AppointmentDetailsPage = () => {
  // booking ID from the URL, e.g. /dashboard/appointments/abc123
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, loading, cancelAppointment } = useAppointments();
  // Look up the appointment matching the URL id
  const appointment = getById(id);

  // Whether the cancel confirmation dialog is open
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  // True while the cancel request is processing
  const [isCancelling, setIsCancelling] = useState(false);
  // Set after cancel succeeds — switches page to success screen
  const [cancelledAppointment, setCancelledAppointment] = useState(null);

  // When user confirms cancellation in the dialog
  const handleConfirmCancel = async () => {
    // Safety check — do nothing if appointment was not found
    if (!appointment) return;

    setIsCancelling(true);
    // Brief delay to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 700));
    // Mark the appointment as cancelled
    const updated = cancelAppointment(appointment.id);
    setIsCancelling(false);
    setShowCancelDialog(false);
    setCancelledAppointment(updated);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Still loading appointment data — show skeleton
  if (loading) {
    return (
      <DashboardShell narrow>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  // Bad link or deleted booking
  if (!appointment) {
    return (
      <DashboardShell narrow>
        {/* "Not found" error card */}
        <div className="overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white px-8 py-14 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:px-12 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F8]">
            <FaExclamationCircle className="text-[28px] text-[#E1709A]" />
          </div>
          <h1 className="mb-3 font-[Great_Vibes] text-[40px] text-[#1A1A1A]">
            Appointment Not Found
          </h1>
          <p className="mb-8 font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
            This appointment may have been removed or the link is incorrect.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87]"
          >
            Back to Dashboard
          </Link>
        </div>
      </DashboardShell>
    );
  }

  // Show success screen after cancellation
  if (cancelledAppointment) {
    return (
      <DashboardShell narrow>
        <CancelSuccessState appointment={cancelledAppointment} />
      </DashboardShell>
    );
  }

  // Check what kind of appointment this is and what actions are allowed
  const isUpcoming = isUpcomingAppointment(appointment);
  const canCancel = canCancelAppointment(appointment);
  const canReschedule = canRescheduleAppointment(appointment);

  return (
    <DashboardShell narrow>
      <DashboardPageHeader
        backTo="/dashboard"
        backLabel="Back to Dashboard"
        badge={isUpcoming ? "Upcoming Booking" : "Booking Record"}
        title="Appointment Details"
        subtitle={
          isUpcoming
            ? "Review your booking information and manage your appointment below."
            : "View the full details of this past appointment."
        }
      />

      {/* Main details card */}
      <div className="overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
        <div className="px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-12">
          <AppointmentSummary appointment={appointment} showClient showStatus />
        </div>

        {/* Manage section — only shown for upcoming appointments */}
        {isUpcoming && (
          <div className="border-t border-[#F5F5F5] bg-gradient-to-b from-[#FCFCFC] to-white px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-12">
            {/* Warning when cancellation is blocked (within 24 hours) */}
            {!canCancel && (
              <div className="mb-7 flex gap-4 rounded-[18px] border border-[#FFF0D6] bg-[#FFFBF0] px-5 py-5 sm:px-6 sm:py-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E6]">
                  <FaExclamationCircle className="text-[18px] text-[#D4A017]" />
                </div>
                <div>
                  <p className="mb-1 font-[Montserrat] text-[13px] font-bold text-[#8A7340]">
                    Cancellation unavailable
                  </p>
                  <p className="font-[Montserrat] text-[13px] leading-relaxed text-[#8A7340]/90">
                    This appointment is within 24 hours and cannot be cancelled online. Please
                    call us at{" "}
                    <a
                      href="tel:+41789494039"
                      className="font-semibold text-[#E1709A] hover:underline"
                    >
                      +41 78 949 40 39
                    </a>
                    .
                  </p>
                </div>
              </div>
            )}

            <p className="mb-5 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.1em] text-[#888888]">
              Manage Appointment
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              {/* Reschedule button — only when rescheduling is allowed */}
              {canReschedule && (
                <button
                  type="button"
                  onClick={() =>
                    navigate(`/dashboard/appointments/${appointment.id}/reschedule`)
                  }
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border-2 border-[#E1709A] bg-white px-6 py-4 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#E1709A] transition-all hover:bg-[#FFF5F8] hover:shadow-[0_4px_14px_rgba(225,112,154,0.12)]"
                >
                  <FaRedo className="text-[11px]" />
                  Reschedule Appointment
                </button>
              )}
              {/* Cancel button — opens the cancel dialog */}
              <button
                type="button"
                onClick={() => setShowCancelDialog(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#ECECEC] bg-white px-6 py-4 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#888888] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
              >
                <FaTimes className="text-[11px]" />
                Cancel Appointment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cancel confirmation dialog */}
      <CancelAppointmentDialog
        appointment={appointment}
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleConfirmCancel}
        isSubmitting={isCancelling}
      />
    </DashboardShell>
  );
};

export default AppointmentDetailsPage;
