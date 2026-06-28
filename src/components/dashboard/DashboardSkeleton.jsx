/**
 * Dashboard skeleton — grey placeholder blocks shown while data is loading.
 * Gives users visual feedback instead of a blank screen.
 */
// Single grey pulsing block — pass className to control size and shape
const SkeletonBlock = ({ className = "" }) => (
  <div className={`animate-pulse rounded-2xl bg-gradient-to-r from-[#F0F0F0] via-[#F5F5F5] to-[#F0F0F0] ${className}`} />
);

// Full-page loading placeholder that mimics the real dashboard layout
const DashboardSkeleton = () => (
  // Vertical stack of placeholder sections
  <div className="space-y-10 sm:space-y-12">
    {/* Fake page title area */}
    <div className="space-y-4 text-center">
      {/* Placeholder for the main heading */}
      <SkeletonBlock className="mx-auto h-12 w-72 rounded-full" />
      {/* Placeholder for the subtitle line */}
      <SkeletonBlock className="mx-auto h-4 w-96 max-w-full" />
    </div>

    {/* Placeholder for the three stat cards */}
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
      <SkeletonBlock className="h-24" />
      <SkeletonBlock className="h-24" />
      <SkeletonBlock className="h-24" />
    </div>

    {/* Placeholder for the "Upcoming Appointments" section */}
    <div className="overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white">
      {/* Placeholder for section header */}
      <SkeletonBlock className="h-24 rounded-none" />
      <div className="space-y-5 p-8">
        {/* Placeholder for two appointment cards side by side */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <SkeletonBlock className="h-72" />
          <SkeletonBlock className="h-72" />
        </div>
      </div>
    </div>

    {/* Placeholder for the "Appointment History" section */}
    <div className="overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white">
      {/* Placeholder for section header */}
      <SkeletonBlock className="h-24 rounded-none" />
      <div className="space-y-4 p-8">
        {/* Placeholder for three history rows */}
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
        <SkeletonBlock className="h-28" />
      </div>
    </div>
  </div>
);

// Export for pages that show loading state
export default DashboardSkeleton;
