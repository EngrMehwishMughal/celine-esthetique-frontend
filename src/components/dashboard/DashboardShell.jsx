/**
 * Dashboard shell — shared layout wrapper for all dashboard pages.
 * Adds the site header and centres content (narrow = profile/details, wide = main dashboard).
 */
// Import the site-wide header shown at the top of every page
import Header from "../common/Header";

// Layout wrapper: children = page content, narrow = slimmer column for detail pages
const DashboardShell = ({ children, narrow = false }) => (
  <>
    {/* Site navigation header */}
    <Header />
    {/* Main content area with soft background and vertical padding */}
    <main className="min-h-[calc(100vh-120px)] w-full bg-gradient-to-b from-[#FFF8FA] via-[#FAFAFA] to-white font-[Montserrat] py-10 sm:py-12 md:py-16 lg:py-[72px]">
      {/* Outer container — keeps content centred with side padding */}
      <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
        {/* Inner container — narrower when narrow prop is true */}
        <div
          className={`mx-auto w-full ${narrow ? "max-w-[760px]" : "max-w-[1080px]"}`}
        >
          {/* Whatever page content was passed in */}
          {children}
        </div>
      </div>
    </main>
  </>
);

// Export so pages can wrap their content in this layout
export default DashboardShell;
