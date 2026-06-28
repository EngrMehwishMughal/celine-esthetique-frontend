/**
 * Service card — one treatment on the Services page.
 * Shows name, duration, price, and a "Book" button that goes to the booking flow.
 */
// Router link for the booking button
import { Link } from "react-router-dom";
// Icons for duration, arrow, and popular badge
import { FaClock, FaArrowRight, FaStar } from "react-icons/fa";

// Card displaying one service with price and book action
const ServiceCard = ({ service, accent = "#E1709A" }) => (
  <article className="group relative flex h-full flex-col rounded-[20px] border border-[#F0F0F0] bg-white p-5 shadow-[0_2px_18px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E1709A]/25 hover:shadow-[0_14px_36px_rgba(225,112,154,0.16)] sm:p-6">
    {/* "Popular" badge — only shown for featured services */}
    {service.popular && (
      <span
        className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-[Montserrat] text-[8px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_2px_8px_rgba(225,112,154,0.35)]"
        style={{ backgroundColor: accent }}
      >
        <FaStar className="text-[7px]" />
        Popular
      </span>
    )}

    {/* Service name and optional note */}
    <div className="mb-4 flex-1 pr-16">
      <h3 className="mb-1.5 font-[Montserrat] text-[15px] font-bold leading-snug text-[#1A1A1A] sm:text-[16px]">
        {service.name}
      </h3>
      {service.note && (
        <p className="font-[Montserrat] text-[11px] font-medium text-[#999999]">
          {service.note}
        </p>
      )}
    </div>

    {/* Duration pill with clock icon */}
    <div className="mb-4 flex items-center gap-2">
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FAFAFA] px-3 py-1.5 font-[Montserrat] text-[10px] font-medium text-[#666666] ring-1 ring-[#F0F0F0]">
        <FaClock className="text-[9px]" style={{ color: accent }} />
        {service.duration} min
      </span>
    </div>

    {/* Price and book button row */}
    <div className="mt-auto flex items-center justify-between border-t border-[#F2F2F2] pt-4">
      <div>
        <p className="font-[Montserrat] text-[9px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
          From
        </p>
        <p className="font-[Montserrat] text-[19px] font-bold leading-none" style={{ color: accent }}>
          CHF {service.price}
        </p>
      </div>
      <Link
        to="/booking"
        className="inline-flex items-center justify-center gap-1.5 rounded-[10px] bg-[#1A1A1A] px-4 py-2.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.07em] text-white transition-all hover:bg-[#E1709A] hover:shadow-[0_4px_14px_rgba(225,112,154,0.35)]"
      >
        Book
        <FaArrowRight className="text-[9px] transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  </article>
);

// Export for use in the Services page grid
export default ServiceCard;
