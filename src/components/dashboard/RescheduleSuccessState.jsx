/**
 * Reschedule success state — thank-you screen after changing an appointment date/time.
 * Shows the new date and time with links to view the booking or return to dashboard.
 */
// Green checkmark icon for success
import { FaCheckCircle } from "react-icons/fa";
// Import Link for navigation buttons
import { Link } from "react-router-dom";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";

// Thank-you screen shown after a successful reschedule
const RescheduleSuccessState = ({ appointment, date, time }) => (
  // Centred success card
  <div className="w-full overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white px-6 py-10 shadow-[0_8px_40px_rgba(0,0,0,0.08)] sm:px-10 sm:py-12 md:px-12 md:py-14">
    <div className="mx-auto flex max-w-[520px] flex-col items-center text-center">
      {/* Success icon with soft glow behind it */}
      <div className="relative mb-8">
        <div className="absolute inset-0 scale-150 rounded-full bg-[#E1709A]/10 blur-2xl" />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#FFF5F8] sm:h-[88px] sm:w-[88px]">
          <FaCheckCircle className="text-[36px] text-[#E1709A] sm:text-[40px]" />
        </div>
      </div>

      {/* Success badge */}
      <span className="mb-4 inline-flex rounded-full bg-[#FFF5F8] px-4 py-1.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
        Reschedule Confirmed
      </span>
      {/* Main heading */}
      <h1 className="mb-4 font-[Great_Vibes] text-[40px] leading-tight text-[#1A1A1A] sm:text-[48px]">
        All Set!
      </h1>
      {/* Confirmation message about email */}
      <p className="mb-10 max-w-[420px] font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
        Your appointment has been updated. A confirmation email will be sent shortly.
      </p>

      {/* Summary box with the new date and time */}
      <div className="mb-10 w-full rounded-[20px] bg-gradient-to-br from-[#FFF8FA] to-white p-6 text-left ring-1 ring-[#E1709A]/10 sm:p-8">
        <p className="mb-5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
          Updated Booking
        </p>
        <div className="space-y-4">
          {/* Service name row */}
          <div className="flex justify-between gap-6 border-b border-[#F0F0F0] pb-4">
            <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              Service
            </span>
            <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#1A1A1A]">
              {appointment.service.name}
            </span>
          </div>
          {/* New date row */}
          <div className="flex justify-between gap-6 border-b border-[#F0F0F0] pb-4">
            <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              New Date
            </span>
            <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#1A1A1A]">
              {formatDisplayDate(date)}
            </span>
          </div>
          {/* New time row */}
          <div className="flex justify-between gap-6">
            <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
              New Time
            </span>
            <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#E1709A]">
              {time}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
        {/* View the updated appointment details */}
        <Link
          to={`/dashboard/appointments/${appointment.id}`}
          className="inline-flex h-[50px] min-w-[200px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-7 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87]"
        >
          View Appointment
        </Link>
        {/* Return to the main dashboard */}
        <Link
          to="/dashboard"
          className="inline-flex h-[50px] min-w-[200px] items-center justify-center rounded-[10px] border border-[#1A1A1A] bg-white px-7 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:bg-[#FAFAFA]"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  </div>
);

// Export for the reschedule page
export default RescheduleSuccessState;
