/**
 * Cancel appointment dialog — popup that asks "Are you sure?"
 * If the appointment is within 24 hours, it explains they must call instead.
 */
// Icons used inside the dialog
import { FaCalendarAlt, FaClock, FaExclamationTriangle, FaTimes } from "react-icons/fa";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";
// Helper to check if online cancellation is allowed
import { canCancelAppointment } from "../../utils/helpers/appointmentHelpers";

// Modal popup for confirming or blocking cancellation
const CancelAppointmentDialog = ({
  appointment, // The booking the user wants to cancel
  isOpen, // Whether the dialog should be visible
  onClose, // Called when user closes the dialog
  onConfirm, // Called when user confirms cancellation
  isSubmitting, // True while the cancel request is processing
}) => {
  // Don't render anything if dialog is closed or no appointment was selected
  if (!isOpen || !appointment) return null;

  // false if less than 24h away — user must call instead
  const canCancel = canCancelAppointment(appointment);

  return (
    // Full-screen overlay — items-end on mobile slides dialog up from bottom
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
      {/* Dark backdrop — clicking it closes the dialog */}
      <button
        type="button"
        className="absolute inset-0 bg-[#1A1A1A]/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Close dialog"
      />

      {/* Dialog panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cancel-dialog-title"
        className="relative w-full max-w-[520px] overflow-hidden rounded-t-[28px] border border-[#F0F0F0] bg-white shadow-[0_24px_80px_rgba(0,0,0,0.2)] sm:rounded-[28px]"
      >
        {/* Pink gradient stripe at the top */}
        <div className="h-1.5 bg-gradient-to-r from-[#E1709A] via-[#F5A3BC] to-[#E1709A]" />

        {/* Dialog body */}
        <div className="px-7 py-7 sm:px-9 sm:py-9">
          {/* X button in the top-right corner */}
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5F5F5] text-[#999999] transition-all hover:bg-[#EEEEEE] hover:text-[#1A1A1A] sm:right-6 sm:top-6"
            aria-label="Close"
          >
            <FaTimes className="text-[13px]" />
          </button>

          {/* Show confirmation flow when cancellation is allowed */}
          {canCancel ? (
            <>
              {/* Title and warning text */}
              <div className="mb-6 pr-10">
                <span className="mb-4 inline-flex rounded-full bg-[#FFF5F8] px-3 py-1 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.1em] text-[#E1709A]">
                  Cancellation
                </span>
                <h2
                  id="cancel-dialog-title"
                  className="mb-3 font-[Great_Vibes] text-[34px] leading-tight text-[#1A1A1A] sm:text-[40px]"
                >
                  Cancel Appointment?
                </h2>
                <p className="font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
                  You are about to cancel your booking. This action cannot be undone.
                </p>
              </div>

              {/* Summary of the booking being cancelled */}
              <div className="mb-8 rounded-[18px] bg-[#FAFAFA] p-5 ring-1 ring-[#F0F0F0] sm:p-6">
                <p className="mb-4 font-[Montserrat] text-[15px] font-bold text-[#1A1A1A]">
                  {appointment.service.name}
                </p>
                <div className="space-y-3">
                  {/* Date row */}
                  <div className="flex items-center gap-3 font-[Montserrat] text-[13px] text-[#666666]">
                    <FaCalendarAlt className="shrink-0 text-[#E1709A]" />
                    {formatDisplayDate(appointment.date)}
                  </div>
                  {/* Time row */}
                  <div className="flex items-center gap-3 font-[Montserrat] text-[13px] text-[#666666]">
                    <FaClock className="shrink-0 text-[#E1709A]" />
                    {appointment.time}
                  </div>
                </div>
              </div>

              {/* Action buttons: keep or confirm cancel */}
              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                {/* Dismiss dialog without cancelling */}
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSubmitting}
                  className="inline-flex h-[50px] items-center justify-center rounded-[10px] border border-[#1A1A1A] bg-white px-7 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:bg-[#FAFAFA] disabled:opacity-50"
                >
                  Keep Appointment
                </button>
                {/* Confirm the cancellation */}
                <button
                  type="button"
                  onClick={onConfirm}
                  disabled={isSubmitting}
                  className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-red-500 px-7 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(239,68,68,0.35)] transition-all hover:bg-red-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Cancelling..." : "Confirm Cancellation"}
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Warning icon when cancellation is not allowed */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8E6] ring-1 ring-[#F5E6B8]">
                <FaExclamationTriangle className="text-[24px] text-[#D4A017]" />
              </div>
              {/* Title explaining cancellation is blocked */}
              <h2
                id="cancel-dialog-title"
                className="mb-3 font-[Great_Vibes] text-[34px] leading-tight text-[#1A1A1A] sm:text-[40px]"
              >
                Cancellation Not Available
              </h2>
              {/* Explanation of the 24-hour rule */}
              <p className="mb-5 font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
                Appointments can only be cancelled more than 24 hours before the scheduled time.
                Your appointment is too soon to cancel online.
              </p>

              {/* Booking summary */}
              <div className="mb-6 rounded-[18px] bg-[#FAFAFA] p-5 ring-1 ring-[#F0F0F0]">
                <p className="mb-1 font-[Montserrat] text-[14px] font-bold text-[#1A1A1A]">
                  {appointment.service.name}
                </p>
                <p className="font-[Montserrat] text-[13px] text-[#888888]">
                  {formatDisplayDate(appointment.date)} at {appointment.time}
                </p>
              </div>

              {/* Phone number to call instead */}
              <p className="mb-8 font-[Montserrat] text-[13px] leading-relaxed text-[#888888]">
                Please contact us directly at{" "}
                <a href="tel:+41789494039" className="font-semibold text-[#E1709A] hover:underline">
                  +41 78 949 40 39
                </a>{" "}
                for assistance.
              </p>
              {/* Close button */}
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-[50px] w-full items-center justify-center rounded-[10px] bg-[#E85A8A] px-7 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87] sm:w-auto"
              >
                Understood
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// Export for dashboard and appointment details pages
export default CancelAppointmentDialog;
