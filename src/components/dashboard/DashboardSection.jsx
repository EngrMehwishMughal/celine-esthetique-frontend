/**
 * Dashboard section — a titled card block (e.g. "Upcoming Appointments").
 * Has an icon, title, optional count badge, and whatever content you pass as children.
 */
// Card section with a header bar and a content area below
const DashboardSection = ({ icon: Icon, title, description, count, action, children }) => (
  // Outer section card with rounded corners and shadow
  <section className="overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_32px_rgba(0,0,0,0.05)]">
    {/* Top header strip with icon, title, and optional action */}
    <div className="border-b border-[#F5F5F5] bg-gradient-to-r from-[#FFFBFC] to-white px-6 py-6 sm:px-8 sm:py-7 md:px-10 md:py-8">
      {/* Header row: left side = icon + text, right side = optional action */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Icon and title block */}
        <div className="flex items-start gap-4 sm:items-center">
          {/* Show icon box only when an icon was passed in */}
          {Icon && (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF5F8] ring-1 ring-[#E1709A]/10 sm:h-14 sm:w-14">
              {/* Section icon (calendar, history, etc.) */}
              <Icon className="text-[18px] text-[#E1709A] sm:text-[20px]" />
            </div>
          )}
          {/* Title, count badge, and description */}
          <div>
            {/* Title row with optional count pill */}
            <div className="mb-1 flex flex-wrap items-center gap-3">
              {/* Section heading */}
              <h2 className="font-[Montserrat] text-[18px] font-bold text-[#1A1A1A] sm:text-[20px] md:text-[22px]">
                {title}
              </h2>
              {/* Pink count badge — only when count is a number */}
              {typeof count === "number" && (
                <span className="rounded-full bg-[#E1709A] px-3 py-1 font-[Montserrat] text-[10px] font-bold uppercase tracking-wide text-white">
                  {count}
                </span>
              )}
            </div>
            {/* Optional helper text under the title */}
            {description && (
              <p className="font-[Montserrat] text-[13px] leading-relaxed text-[#888888]">
                {description}
              </p>
            )}
          </div>
        </div>
        {/* Optional action button on the right side of the header */}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>

    {/* Main content area — cards, empty states, etc. */}
    <div className="px-6 py-7 sm:px-8 sm:py-8 md:px-10 md:py-10">{children}</div>
  </section>
);

// Export for use on the main dashboard page
export default DashboardSection;
