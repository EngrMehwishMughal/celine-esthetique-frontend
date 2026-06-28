/**
 * Services page — full list of treatments with prices.
 * Visitors can filter by category (nails, lashes, etc.) and book from any card.
 */
// React hooks for filter state and memoized category list
import { useMemo, useState } from "react";
// Router link for booking and CTA buttons
import { Link } from "react-router-dom";
// Icons for the page badge and booking buttons
import { FaCalendarCheck, FaLeaf } from "react-icons/fa";
// Shared site header with navigation
import Header from "../components/common/Header";
// Sticky category filter tabs
import CategoryTabs from "../components/services/CategoryTabs";
// Card component for each individual service
import ServiceCard from "../components/services/ServiceCard";
// All service categories and total count from the catalog data file
import { serviceCategories, totalServiceCount } from "../utils/constants/servicesCatalog";

// Full services and pricing page
const Services = () => {
  // Which category tab is selected — "all" shows everything
  const [active, setActive] = useState("all");

  // Only show categories that match the active filter
  const visibleCategories = useMemo(
    () =>
      active === "all"
        ? serviceCategories
        : serviceCategories.filter((category) => category.id === active),
    [active]
  );

  return (
    <>
      {/* Site header with contact strip and navbar */}
      <Header />

      <main className="min-h-screen w-full bg-gradient-to-b from-[#FFF8FA] via-[#FAFAFA] to-white font-[Montserrat]">
        {/* Hero */}
        <section className="w-full px-5 pt-12 sm:px-8 sm:pt-16 md:px-10 md:pt-20 lg:px-12">
          <div className="mx-auto w-full max-w-[1080px] text-center">
            {/* Small badge above the page title */}
            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#FFF5F8] px-4 py-1.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A] ring-1 ring-[#E1709A]/15">
              <FaLeaf className="text-[10px]" />
              Our Treatments
            </span>
            {/* Main page heading */}
            <h1 className="mb-4 font-[Great_Vibes] text-[40px] leading-tight text-[#1A1A1A] sm:text-[52px] md:text-[60px]">
              Services &amp; Pricing
            </h1>
            {/* Intro text with total treatment count */}
            <p className="mx-auto max-w-[560px] font-[Montserrat] text-[12px] leading-relaxed text-[#666666] sm:text-[13px] md:text-[14px]">
              From nails and waxing to lashes and relaxing head spa rituals — explore our
              full range of {totalServiceCount} professional treatments, individualised
              and adapted to your needs.
            </p>

            {/* Top call-to-action buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                to="/booking"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-[#E85A8A] px-7 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_16px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87] hover:shadow-[0_6px_22px_rgba(232,90,138,0.42)]"
              >
                <FaCalendarCheck className="text-[12px]" />
                Book an Appointment
              </Link>
              <a
                href="https://wa.me/41789494039"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] items-center justify-center rounded-[12px] border border-[#E1709A]/30 bg-white px-7 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#E1709A] transition-all hover:bg-[#FFF5F8]"
              >
                Ask a Question
              </a>
            </div>
          </div>
        </section>

        {/* Catalogue */}
        <section className="w-full px-5 pb-16 pt-10 sm:px-8 sm:pb-20 sm:pt-12 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[1080px]">
            {/* Category filter tabs — updates active state on click */}
            <CategoryTabs
              categories={serviceCategories}
              active={active}
              onChange={setActive}
            />

            {/* One section per visible category */}
            <div className="space-y-14 sm:space-y-16">
              {visibleCategories.map((category) => {
                // Category icon component from catalog data
                const Icon = category.icon;

                return (
                  <section key={category.id} id={category.id}>
                    {/* Category header */}
                    <div className="mb-6 flex items-start gap-4 sm:mb-7 sm:items-center">
                      {/* Colored icon box for the category */}
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl sm:h-14 sm:w-14"
                        style={{ backgroundColor: `${category.accent}14` }}
                      >
                        <Icon className="text-[20px] sm:text-[22px]" style={{ color: category.accent }} />
                      </div>
                      <div className="min-w-0">
                        {/* Category name and treatment count badge */}
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="font-[Montserrat] text-[19px] font-bold text-[#1A1A1A] sm:text-[22px]">
                            {category.name}
                          </h2>
                          <span className="rounded-full bg-[#FFF5F8] px-3 py-1 font-[Montserrat] text-[10px] font-bold uppercase tracking-wide text-[#E1709A] ring-1 ring-[#E1709A]/10">
                            {category.services.length} treatment{category.services.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        {/* Short tagline for the category */}
                        <p className="mt-1 font-[Montserrat] text-[12px] leading-relaxed text-[#888888] sm:text-[13px]">
                          {category.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Service grid */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
                      {category.services.map((service) => (
                        <ServiceCard key={service.id} service={service} accent={category.accent} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>

            {/* Bottom CTA */}
            <div className="mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E1709A] to-[#D66291] px-7 py-10 text-center shadow-[0_12px_40px_rgba(214,98,145,0.3)] sm:mt-20 sm:px-12 sm:py-14">
              <h2 className="mb-3 font-[Great_Vibes] text-[32px] leading-tight text-white sm:text-[40px]">
                Not sure which to choose?
              </h2>
              <p className="mx-auto mb-7 max-w-[480px] font-[Montserrat] text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
                Book a visit and we&apos;ll recommend the perfect treatment for you. Our team
                is happy to guide you every step of the way.
              </p>
              <Link
                to="/booking"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-white px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#E1709A] shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all hover:bg-[#FFF5F8]"
              >
                <FaCalendarCheck className="text-[12px]" />
                Book Your Appointment
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Export for the /services route
export default Services;
