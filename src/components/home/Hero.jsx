/**
 * Hero — big welcome section on the home page.
 * Salon name, short tagline, booking button, and a hero image.
 */
// Router link for navigating to the booking page
import { Link } from "react-router-dom";
// Main hero image shown on the right side of the section
import heroImage from "../../assets/hero.png";

// Large welcome banner at the top of the home page
const Hero = () => {
  return (
    <section className="w-full bg-white overflow-hidden">
      {/* Inner container with padding and max width */}
      <div className="w-full max-w-[1320px] mx-auto px-8 sm:px-12 md:px-16 lg:px-20 xl:px-28 2xl:px-32 pt-10 sm:pt-12 md:pt-14 lg:pt-16 pb-8 sm:pb-10 md:pb-12">
        {/* Two-column layout: text on left, image on right (reversed on mobile) */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-14 xl:gap-20">
          {/* Text — centered block */}
          <div className="w-full max-w-[560px] mx-auto text-center shrink-0 order-2 lg:order-1">
            {/* Main salon title with pink and dark name parts */}
            <h1 className="leading-[1.15] mb-6 sm:mb-8">
              <span className="font-[Great_Vibes] text-[42px] sm:text-[52px] md:text-[60px] lg:text-[66px] text-[#E1709A]">
                Celine{" "}
              </span>
              <span className="font-[Great_Vibes] text-[42px] sm:text-[52px] md:text-[60px] lg:text-[66px] text-[#1A1A1A]">
                Esthetiquec
              </span>
              <br />
              <span className="font-[Great_Vibes] text-[42px] sm:text-[52px] md:text-[60px] lg:text-[66px] text-[#1A1A1A]">
                City Centre{" "}
              </span>
              <span className="font-[Great_Vibes] text-[42px] sm:text-[52px] md:text-[60px] lg:text-[66px] text-[#E1709A]">
                Lausanne
              </span>
            </h1>

            {/* Short description of the salon and its services */}
            <p className="font-[Montserrat] font-normal text-[10px] sm:text-[11px] md:text-[12px] leading-[1.95] tracking-[0.35px] uppercase text-[#1A1A1A] max-w-[500px] mx-auto text-center px-1 mb-0">
              Celine Esthétique City Centre Lausanne offers premium beauty and
              skincare treatments tailored to enhance your natural glow.
              Experience expert care in a luxurious and relaxing environment.
            </p>

            {/* Call-to-action buttons */}
            <div className="mt-[48px] sm:mt-[54px] md:mt-[60px] lg:mt-[64px] flex flex-row flex-wrap items-stretch justify-center gap-[18px] sm:gap-5">
              {/* Primary button — goes to online booking */}
              <Link
                to="/booking"
                className="inline-flex items-center justify-center h-[46px] sm:h-[48px] min-w-[220px] sm:min-w-[240px] px-6 sm:px-8 rounded-[8px] bg-[#E85A8A] text-white font-[Montserrat] text-[12px] sm:text-[13px] font-bold tracking-[0.07em] uppercase shadow-[0_3px_10px_rgba(232,90,138,0.34)] hover:bg-[#D85A87] transition-colors whitespace-nowrap"
              >
                Make a Appointment
              </Link>

              {/* Secondary button — scroll or navigate to services (placeholder action) */}
              <button
                type="button"
                className="inline-flex items-center justify-center h-[46px] sm:h-[48px] min-w-[168px] sm:min-w-[178px] px-5 sm:px-6 rounded-[8px] bg-white border border-[#1A1A1A] text-[#1A1A1A] font-[Montserrat] text-[12px] sm:text-[13px] font-bold tracking-[0.07em] uppercase hover:bg-[#FAFAFA] transition-colors whitespace-nowrap"
              >
                View Services
              </button>
            </div>
          </div>

          {/* Image — soft bottom fade, blends into white bg (Figma) */}
          <div className="flex justify-center mx-auto order-1 lg:order-2 w-full max-w-[580px] shrink-0">
            <div className="relative w-full max-w-[340px] sm:max-w-[400px] md:max-w-[460px] lg:max-w-[520px] xl:max-w-[560px] mx-auto">
              <img
                src={heroImage}
                alt="Celine Esthétique beauty treatment"
                className="w-full h-auto object-contain object-bottom
                  [mask-image:linear-gradient(to_bottom,#000_0%,#000_75%,rgba(0,0,0,0.6)_88%,transparent_100%)]
                  [-webkit-mask-image:linear-gradient(to_bottom,#000_0%,#000_75%,rgba(0,0,0,0.6)_88%,transparent_100%)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Export for use on the home page
export default Hero;
