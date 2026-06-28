/**
 * Gallery page — photos of the salon and before/after results.
 * Includes a lightbox so users can tap any image to view it full size.
 */
// React hooks for filter state, lightbox, and memoized image list
import { useMemo, useState } from "react";
// Router link for the booking CTA
import { Link } from "react-router-dom";
// Icons for badges, lightbox close, and CTA buttons
import { FaCamera, FaTimes, FaCalendarCheck, FaArrowRight } from "react-icons/fa";
// Shared site header with navigation
import Header from "../components/common/Header";
// Gallery categories, before/after sets, and image list from data file
import {
  galleryCategories,
  beforeAfterSets,
  galleryImages,
} from "../utils/constants/galleryData";

// Small card showing a before/after pair side by side
const BeforeAfterCard = ({ set, onOpen }) => (
  <article className="overflow-hidden rounded-[22px] border border-[#F0F0F0] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(225,112,154,0.14)]">
    {/* Two-column grid: before on left, after on right */}
    <div className="grid grid-cols-2">
      {[
        { label: "Before", src: set.before, tone: "bg-[#1A1A1A]/70" },
        { label: "After", src: set.after, tone: "bg-[#E1709A]" },
      ].map((side) => (
        <button
          key={side.label}
          type="button"
          onClick={() => onOpen(side.src)}
          className="group relative block aspect-[4/5] overflow-hidden"
        >
          <img
            src={side.src}
            alt={`${set.title} — ${side.label}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Before / After label overlay */}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 font-[Montserrat] text-[9px] font-bold uppercase tracking-[0.1em] text-white ${side.tone}`}
          >
            {side.label}
          </span>
        </button>
      ))}
    </div>
    {/* Card footer with title and category tag */}
    <div className="flex items-center justify-between gap-3 px-5 py-4">
      <h3 className="font-[Montserrat] text-[13px] font-bold text-[#1A1A1A]">{set.title}</h3>
      <span className="rounded-full bg-[#FFF5F8] px-3 py-1 font-[Montserrat] text-[9px] font-bold uppercase tracking-wide text-[#E1709A]">
        {set.category}
      </span>
    </div>
  </article>
);

// Gallery page with before/after section, photo grid, and lightbox
const GalleryPage = () => {
  // Which gallery category filter is selected — "All" shows every image
  const [activeCategory, setActiveCategory] = useState("All");
  // URL of image shown in the full-screen popup — null when closed
  const [lightbox, setLightbox] = useState(null);

  // Images filtered by the active category tab
  const visibleImages = useMemo(
    () =>
      activeCategory === "All"
        ? galleryImages
        : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory]
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
              <FaCamera className="text-[10px]" />
              Our Work
            </span>
            {/* Main page heading */}
            <h1 className="mb-4 font-[Great_Vibes] text-[40px] leading-tight text-[#1A1A1A] sm:text-[52px] md:text-[60px]">
              Gallery
            </h1>
            {/* Intro paragraph */}
            <p className="mx-auto max-w-[560px] font-[Montserrat] text-[12px] leading-relaxed text-[#666666] sm:text-[13px] md:text-[14px]">
              A glimpse of the transformations we create and the calm, welcoming space
              where it all happens. Real results, real care.
            </p>
          </div>
        </section>

        {/* Before & After */}
        <section className="w-full px-5 pt-12 sm:px-8 sm:pt-16 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[1080px]">
            {/* Section heading */}
            <div className="mb-7 text-center sm:mb-9">
              <h2 className="font-[Montserrat] text-[19px] font-bold text-[#1A1A1A] sm:text-[22px]">
                Before &amp; After
              </h2>
              <p className="mt-1 font-[Montserrat] text-[12px] text-[#888888]">
                Tap any image to view it larger.
              </p>
            </div>
            {/* Grid of before/after comparison cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {beforeAfterSets.map((set) => (
                <BeforeAfterCard key={set.id} set={set} onOpen={setLightbox} />
              ))}
            </div>
          </div>
        </section>

        {/* Salon & treatments grid */}
        <section className="w-full px-5 pb-16 pt-14 sm:px-8 sm:pb-20 sm:pt-16 md:px-10 lg:px-12">
          <div className="mx-auto w-full max-w-[1080px]">
            {/* Section heading */}
            <div className="mb-7 text-center sm:mb-9">
              <h2 className="font-[Montserrat] text-[19px] font-bold text-[#1A1A1A] sm:text-[22px]">
                Inside the Salon
              </h2>
              <p className="mt-1 font-[Montserrat] text-[12px] text-[#888888]">
                Browse our space and recent treatments.
              </p>
            </div>

            {/* Filter tabs */}
            <div
              className="mb-8 flex gap-2.5 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center"
              style={{ scrollbarWidth: "none" }}
            >
              {galleryCategories.map((category) => {
                // Whether this category tab is currently selected
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.06em] transition-all sm:px-5 ${
                      isActive
                        ? "border-transparent bg-[#E1709A] text-white shadow-[0_4px_14px_rgba(225,112,154,0.35)]"
                        : "border-[#ECECEC] bg-white text-[#666666] hover:border-[#E1709A]/40 hover:bg-[#FFF5F8] hover:text-[#E1709A]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            {/* Masonry-style grid */}
            <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
              {visibleImages.map((image) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setLightbox(image.src)}
                  className="group relative block w-full overflow-hidden rounded-[18px] border border-[#F0F0F0] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_12px_30px_rgba(225,112,154,0.16)]"
                >
                  <img
                    src={image.src}
                    alt={image.caption}
                    loading="lazy"
                    className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                      image.tall ? "aspect-[4/5]" : "aspect-square"
                    }`}
                  />
                  {/* Caption shown on hover */}
                  <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-3 py-3 text-left font-[Montserrat] text-[11px] font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {image.caption}
                  </span>
                </button>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 overflow-hidden rounded-[28px] bg-gradient-to-br from-[#E1709A] to-[#D66291] px-7 py-10 text-center shadow-[0_12px_40px_rgba(214,98,145,0.3)] sm:mt-20 sm:px-12 sm:py-14">
              <h2 className="mb-3 font-[Great_Vibes] text-[32px] leading-tight text-white sm:text-[40px]">
                Love what you see?
              </h2>
              <p className="mx-auto mb-7 max-w-[440px] font-[Montserrat] text-[12px] leading-relaxed text-white/90 sm:text-[13px]">
                Book your appointment and let us create your next transformation.
              </p>
              <Link
                to="/booking"
                className="inline-flex h-[52px] items-center justify-center gap-2 rounded-[12px] bg-white px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#E1709A] shadow-[0_4px_16px_rgba(0,0,0,0.15)] transition-all hover:bg-[#FFF5F8]"
              >
                <FaCalendarCheck className="text-[12px]" />
                Book Now
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox — full-screen image overlay when lightbox URL is set */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-5 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          {/* Close button in the top-right corner */}
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/25"
          >
            <FaTimes className="text-[18px]" />
          </button>
          {/* Full-size image — click does not close the overlay */}
          <img
            src={lightbox}
            alt="Gallery preview"
            onClick={(e) => e.stopPropagation()}
            className="max-h-[85vh] max-w-[92vw] rounded-[20px] object-contain shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
          />
        </div>
      )}
    </>
  );
};

// Export for the /gallery route
export default GalleryPage;
