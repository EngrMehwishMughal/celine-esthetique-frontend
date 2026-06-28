/**
 * Cancel success state — shown after a booking was successfully cancelled.
 * Confirms what was cancelled and offers links back to dashboard or to book again.
 */
// Green checkmark icon for success
import { FaCheckCircle } from "react-icons/fa";
// Import Link for navigation buttons
import { Link } from "react-router-dom";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";

// Thank-you screen shown after a successful cancellation
const CancelSuccessState = ({ appointment, onDone }) => (
  // Centred success card
  <div className="w-full overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white px-6 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:px-10 sm:py-12 md:px-12 md:py-14">
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      {/* Success icon with soft glow behind it */}
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 rounded-full bg-[#E1709A]/10 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5F8] ring-4 ring-[#FFF5F8] sm:h-[88px] sm:w-[88px]">
          <FaCheckCircle className="text-[36px] text-[#E1709A] sm:text-[40px]" />
        </div>
      </div>

      {/* Success badge */}
      <span className="mb-4 inline-flex rounded-full bg-[#FFF5F8] px-4 py-1.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
        Successfully Cancelled
      </span>
      {/* Main heading */}
      <h2 className="mb-4 font-[Great_Vibes] text-[40px] leading-tight text-[#1A1A1A] sm:text-[48px]">
        Appointment Cancelled
      </h2>
      {/* Confirmation message about email */}
      <p className="mb-10 max-w-[420px] font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
        Your booking has been successfully cancelled. A confirmation email will be sent to your
        inbox shortly.
      </p>

      {/* Summary box showing what was cancelled */}
      <div className="mb-10 w-full rounded-[20px] bg-gradient-to-br from-[#FFF8FA] to-white p-6 text-left ring-1 ring-[#E1709A]/10 sm:p-8">
        <p className="mb-5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
          Cancelled Booking
        </p>
        <div className="space-y-3">
          {/* Service name */}
          <p className="font-[Montserrat] text-[16px] font-bold text-[#1A1A1A]">
            {appointment.service.name}
          </p>
          {/* Date and time */}
          <p className="font-[Montserrat] text-[14px] text-[#666666]">
            {formatDisplayDate(appointment.date)} at {appointment.time}
          </p>
          {/* Booking reference */}
          <p className="font-[Montserrat] text-[12px] font-medium uppercase tracking-[0.08em] text-[#BBBBBB]">
            {appointment.referenceId}
          </p>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        {/* Return to dashboard — onDone clears the success state on the dashboard page */}
        <Link
          to="/dashboard"
          onClick={onDone}
          className="inline-flex h-[50px] min-w-[200px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-7 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87]"
        >
          Back to Dashboard
        </Link>
        {/* Start a new booking */}
        <Link
          to="/booking"
          className="inline-flex h-[50px] min-w-[200px] items-center justify-center rounded-[10px] border border-[#1A1A1A] bg-white px-7 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:bg-[#FAFAFA]"
        >
          Book Again
        </Link>
      </div>
    </div>
  </div>
);

// Export for dashboard and appointment details pages
export default CancelSuccessState;
