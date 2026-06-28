/**
 * Dashboard stats — three summary cards at the top of the main dashboard.
 * Shows how many upcoming bookings, past visits, and when the next appointment is.
 */
// Icons for the three stat cards
import { FaCalendarCheck, FaHistory, FaClock } from "react-icons/fa";
// Helper to turn a date string into readable text like "Mon, 15 Mar 2026"
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";

// One stat box — e.g. "3 upcoming bookings"
const StatCard = ({ icon: Icon, label, value, accent = false }) => (
  // Card container — accent style highlights important stats
  <div
    className={`flex items-center gap-4 rounded-[20px] border px-5 py-5 sm:px-6 sm:py-6 ${
      accent
        ? "border-[#E1709A]/20 bg-gradient-to-br from-[#FFF5F8] to-white shadow-[0_4px_20px_rgba(225,112,154,0.1)]"
        : "border-[#F0F0F0] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)]"
    }`}
  >
    {/* Circular icon background */}
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 ${
        accent ? "bg-[#E1709A] text-white" : "bg-[#FFF5F8] text-[#E1709A]"
      }`}
    >
      {/* Stat icon */}
      <Icon className="text-[16px] sm:text-[18px]" />
    </div>
    {/* Label and value text */}
    <div className="min-w-0">
      {/* Small uppercase label, e.g. "Upcoming" */}
      <p className="mb-0.5 font-[Montserrat] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#999999]">
        {label}
      </p>
      {/* Main stat value */}
      <p className="truncate font-[Montserrat] text-[15px] font-bold text-[#1A1A1A] sm:text-[16px]">
        {value}
      </p>
    </div>
  </div>
);

// Row of three summary stats shown below the dashboard header
const DashboardStats = ({ upcomingCount, historyCount, nextAppointment }) => (
  // Three-column grid on larger screens, stacked on mobile
  <div className="mb-10 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-3 sm:gap-5 md:mb-14">
    {/* How many future bookings the user has */}
    <StatCard icon={FaCalendarCheck} label="Upcoming" value={`${upcomingCount} booking${upcomingCount !== 1 ? "s" : ""}`} accent />
    {/* How many past or cancelled visits are in history */}
    <StatCard icon={FaHistory} label="History" value={`${historyCount} past visit${historyCount !== 1 ? "s" : ""}`} />
    {/* When the next appointment is, or "None scheduled" */}
    <StatCard
      icon={FaClock}
      label="Next Appointment"
      value={
        nextAppointment
          ? `${formatDisplayDate(nextAppointment.date).split(",")[0]} · ${nextAppointment.time}`
          : "None scheduled"
      }
      accent={!!nextAppointment}
    />
  </div>
);

// Export for the main dashboard page
export default DashboardStats;
