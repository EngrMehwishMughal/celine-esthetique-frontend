/**
 * History appointment card — one past or cancelled booking in the history list.
 * Compact row with date, status badge, price, and a link to full details.
 */
// Import Link for navigating to appointment details
import { Link } from "react-router-dom";
// Icons for time and arrow
import { FaArrowRight, FaClock } from "react-icons/fa";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";
// Helpers to get status label text and badge colours
import { getStatusColor, getStatusLabel } from "../../utils/helpers/appointmentHelpers";

// Compact card for one past or cancelled appointment
const HistoryAppointmentCard = ({ appointment }) => {
  // Look up background and text colours for the status badge
  const statusColors = getStatusColor(appointment);
  // Split "2024-03-15" into year, month, day numbers
  const [year, month, day] = appointment.date.split("-").map(Number);
  // Turn month number into short name like "Mar"
  const monthLabel = new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    month: "short",
  });

  return (
    // Horizontal card — stacks vertically on small screens
    <article className="group flex flex-col overflow-hidden rounded-[20px] border border-[#F0F0F0] bg-white shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#E1709A]/20 hover:shadow-[0_8px_28px_rgba(225,112,154,0.1)] sm:flex-row sm:items-stretch">
      {/* Left date block — big day number and month abbreviation */}
      <div className="flex shrink-0 items-center justify-center border-b border-[#F5F5F5] bg-gradient-to-br from-[#FFF8FA] to-[#FFF5F8] px-6 py-5 sm:w-[100px] sm:flex-col sm:border-b-0 sm:border-r sm:px-0 sm:py-8 md:w-[110px]">
        {/* Day of the month, e.g. "15" */}
        <span className="font-[Montserrat] text-[28px] font-bold leading-none text-[#E1709A] sm:text-[32px]">
          {day}
        </span>
        {/* Month abbreviation, e.g. "Mar" */}
        <span className="ml-2 font-[Montserrat] text-[12px] font-bold uppercase tracking-[0.12em] text-[#888888] sm:ml-0 sm:mt-1">
          {monthLabel}
        </span>
      </div>

      {/* Middle section: service name, status, date/time, reference */}
      <div className="flex min-w-0 flex-1 flex-col justify-center px-6 py-5 sm:px-7 sm:py-6 md:px-8">
        {/* Service name and coloured status badge */}
        <div className="mb-3 flex flex-wrap items-center gap-2.5">
          <h3 className="font-[Montserrat] text-[16px] font-bold text-[#1A1A1A] sm:text-[17px]">
            {appointment.service.name}
          </h3>
          {/* Status pill — colours come from statusColors */}
          <span
            className="rounded-full px-3 py-1 font-[Montserrat] text-[9px] font-bold uppercase tracking-[0.08em]"
            style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
          >
            {getStatusLabel(appointment)}
          </span>
        </div>

        {/* Full date and time row */}
        <div className="mb-1 flex flex-wrap items-center gap-x-4 gap-y-2 font-[Montserrat] text-[12px] text-[#666666] sm:text-[13px]">
          <span>{formatDisplayDate(appointment.date)}</span>
          <span className="inline-flex items-center gap-1.5">
            <FaClock className="text-[10px] text-[#E1709A]" />
            {appointment.time}
          </span>
        </div>
        {/* Booking reference ID */}
        <p className="font-[Montserrat] text-[11px] font-medium uppercase tracking-[0.08em] text-[#BBBBBB]">
          {appointment.referenceId}
        </p>
      </div>

      {/* Right section: price and view link */}
      <div className="flex items-center justify-between gap-4 border-t border-[#F5F5F5] px-6 py-5 sm:w-auto sm:flex-col sm:items-end sm:justify-center sm:border-l sm:border-t-0 sm:px-7 sm:py-6 md:px-8">
        {/* Treatment price */}
        <span className="font-[Montserrat] text-[17px] font-bold text-[#E1709A] sm:text-[18px]">
          CHF {appointment.service.price}
        </span>
        {/* Link to full appointment details */}
        <Link
          to={`/dashboard/appointments/${appointment.id}`}
          className="inline-flex items-center justify-center gap-2 rounded-[10px] border border-[#E8E8E8] bg-white px-5 py-2.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.06em] text-[#1A1A1A] transition-all hover:border-[#E1709A]/40 hover:bg-[#FFF5F8] hover:text-[#E1709A]"
        >
          View
          <FaArrowRight className="text-[9px] transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </article>
  );
};

// Export for the appointment history list on the dashboard
export default HistoryAppointmentCard;
