/**
 * Dashboard page header — title area with optional back link, badge, and action button.
 * Used at the top of dashboard, profile, appointment details, and reschedule pages.
 */
// Import Link for client-side navigation without full page reload
import { Link } from "react-router-dom";
// Import back-arrow icon for the optional back button
import { FaArrowLeft } from "react-icons/fa";

// Reusable page title block used at the top of dashboard pages
const DashboardPageHeader = ({
  backTo, // URL to go back to (optional)
  backLabel = "Back to Dashboard", // Text shown on the back link
  title, // Main heading text
  subtitle, // Smaller description under the title (optional)
  badge, // Small label above the title, e.g. "Your Account" (optional)
  action, // Extra button or link on the right side (optional)
}) => (
  // Wrapper with bottom spacing before the rest of the page
  <div className="mb-10 sm:mb-12 md:mb-14">
    {/* Show back link only when backTo URL is provided */}
    {backTo && (
      <Link
        to={backTo}
        className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#F0F0F0] bg-white px-4 py-2 font-[Montserrat] text-[11px] font-semibold uppercase tracking-[0.08em] text-[#E1709A] shadow-[0_2px_12px_rgba(0,0,0,0.04)] transition-all hover:border-[#E1709A]/30 hover:bg-[#FFF5F8] hover:shadow-[0_4px_16px_rgba(225,112,154,0.1)]"
      >
        {/* Left arrow icon */}
        <FaArrowLeft className="text-[10px]" />
        {/* Back link label text */}
        {backLabel}
      </Link>
    )}

    {/* Row: title block on the left, optional action on the right */}
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      {/* Title and subtitle column */}
      <div className="max-w-[640px]">
        {/* Small badge above the title, only if badge prop exists */}
        {badge && (
          <span className="mb-4 inline-flex rounded-full bg-[#FFF5F8] px-4 py-1.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A] ring-1 ring-[#E1709A]/15">
            {badge}
          </span>
        )}
        {/* Main page heading */}
        <h1 className="mb-3 font-[Great_Vibes] text-[38px] leading-tight text-[#1A1A1A] sm:text-[46px] md:text-[52px]">
          {title}
        </h1>
        {/* Subtitle paragraph, only if subtitle prop exists */}
        {subtitle && (
          <p className="font-[Montserrat] text-[12px] leading-relaxed text-[#666666] sm:text-[13px] md:text-[14px]">
            {subtitle}
          </p>
        )}
      </div>
      {/* Optional action slot (e.g. "Book Appointment" button) */}
      {action && <div className="shrink-0">{action}</div>}
    </div>
  </div>
);

// Export for use on dashboard-related pages
export default DashboardPageHeader;
