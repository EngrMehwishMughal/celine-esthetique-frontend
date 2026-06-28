/**
 * Empty state — friendly message when a list has no items yet.
 * Used when the user has no upcoming or past appointments.
 */
// Calendar-plus icon for the empty state illustration
import { FaCalendarPlus } from "react-icons/fa";

// Friendly "nothing here yet" message with optional action button
const EmptyState = ({ title, description, action }) => (
  // Centred dashed box
  <div className="flex flex-col items-center justify-center rounded-[20px] border-2 border-dashed border-[#ECECEC] bg-gradient-to-b from-[#FAFAFA] to-white px-8 py-14 text-center sm:px-10 sm:py-16">
    {/* Icon circle */}
    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F8] shadow-[0_4px_20px_rgba(225,112,154,0.12)] ring-1 ring-[#E1709A]/10 sm:h-[72px] sm:w-[72px]">
      {/* Calendar icon */}
      <FaCalendarPlus className="text-[26px] text-[#E1709A] sm:text-[28px]" />
    </div>
    {/* Empty state heading, e.g. "No Upcoming Appointments" */}
    <h3 className="mb-3 font-[Montserrat] text-[17px] font-bold text-[#1A1A1A] sm:text-[18px]">
      {title}
    </h3>
    {/* Helpful explanation text */}
    <p className="mb-8 max-w-[360px] font-[Montserrat] text-[14px] leading-relaxed text-[#888888]">
      {description}
    </p>
    {/* Optional button or link, e.g. "Book Your First Appointment" */}
    {action}
  </div>
);

// Export for dashboard sections with empty lists
export default EmptyState;
