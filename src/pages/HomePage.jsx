/**
 * Home page — the first thing visitors see.
 * Shows the salon header, hero banner, and a quick intro to our services.
 */
// Import the site-wide header with navigation links
import Header from "../components/common/Header";
// Import the large hero banner at the top of the home page
import Hero from "../components/home/Hero";
// Import the section that introduces our services briefly
import IntroSection from "../components/home/IntroSection";

// Define the HomePage component
const HomePage = () => {
  // Return the home page layout
  return (
    <>
      {/* Full-width wrapper for all home page sections */}
      <div className="w-full">
  {/* Site header with logo and menu */}
  <Header />
  {/* Main hero image and welcome message */}
  <Hero />
  {/* Short introduction to what the salon offers */}
  <IntroSection />
</div>
    </>
  );
};

// Export HomePage so AppRoutes can show it at the / URL
export default HomePage;
