/**
 * Service selection — step 1 of booking.
 * User picks a category, then clicks a treatment card to select it.
 */
// React hook to remember which category tab is active
import { useState } from "react";
// Icons for checkmark on selected card and clock for duration
import { FaCheck, FaClock } from "react-icons/fa";
// All service categories and their treatments from the catalog
import { serviceCategories } from "../../utils/constants/servicesCatalog";

// Lets the user browse categories and pick one service
const ServiceSelection = ({ selectedService, onSelect }) => {
  // Which category tab is shown — starts with the first category
  const [activeCategory, setActiveCategory] = useState(serviceCategories[0].id);

  // User clicked a service card — tell the parent what was picked
  const handleSelect = (category, service) => {
    // Shape the data so the rest of the booking flow knows what was picked
    onSelect({
      id: service.id,
      name: service.name,
      category: category.name,
      duration: service.duration,
      price: service.price,
    });
  };

  return (
    <div className="w-full max-w-[920px] mx-auto flex flex-col items-center px-1 sm:px-2">
      {/* Header */}
      <div className="w-full text-center mb-7 sm:mb-9">
        {/* Main section title */}
        <h2 className="font-[Great_Vibes] text-[32px] sm:text-[40px] md:text-[44px] text-[#1A1A1A] mb-2 leading-tight">
          Choose Your Service
        </h2>
        {/* Subtitle with total treatment count */}
        <p className="font-[Montserrat] text-[10px] sm:text-[11px] text-[#666666] uppercase tracking-[0.14em]">
          Select from our {serviceCategories.reduce((n, c) => n + c.services.length, 0)}+ treatments
        </p>
      </div>

      {/* Selected service banner — only when something is already chosen */}
      {selectedService && (
        <div className="w-full mb-6 sm:mb-7 flex items-center gap-3 sm:gap-4 rounded-2xl bg-[#FFF5F8] border border-[#E1709A]/25 px-4 py-4 sm:px-6 sm:py-5">
          {/* Pink circle with check icon */}
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E1709A] flex items-center justify-center shrink-0">
            <FaCheck className="text-white text-[11px]" />
          </div>
          {/* Service name and category */}
          <div className="min-w-0 flex-1">
            <p className="font-[Montserrat] text-[9px] sm:text-[10px] uppercase tracking-wide text-[#E1709A] font-semibold mb-0.5">
              Selected
            </p>
            <p className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold text-[#1A1A1A] truncate">
              {selectedService.name}
              <span className="text-[#999999] font-medium"> · {selectedService.category}</span>
            </p>
          </div>
          {/* Price on the right */}
          <span className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold text-[#E1709A] shrink-0">
            CHF {selectedService.price}
          </span>
        </div>
      )}

      {/* Category filter pills — horizontal scroll on mobile */}
      <div
        className="w-full mb-7 sm:mb-8 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:justify-center"
        style={{ scrollbarWidth: "none" }}
      >
        {/* One pill button per category */}
        {serviceCategories.map((category) => {
          // Icon component for this category (e.g. nail, face)
          const Icon = category.icon;
          // True if this pill matches the active category
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => setActiveCategory(category.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 font-[Montserrat] text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.05em] transition-all ${
                isActive
                  ? "border-transparent bg-[#E1709A] text-white shadow-[0_4px_12px_rgba(225,112,154,0.32)]"
                  : "border-[#ECECEC] bg-white text-[#777777] hover:border-[#E1709A]/40 hover:text-[#E1709A]"
              }`}
            >
              <Icon className="text-[11px]" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Service cards for the active category only */}
      {serviceCategories
        .filter((category) => category.id === activeCategory)
        .map((category) => (
          <div
            key={category.id}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            {/* Each treatment in this category as a clickable card */}
            {category.services.map((service) => {
              // True if this card is the currently selected service
              const isSelected = selectedService?.id === service.id;
              return (
                <div
                  key={service.id}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={0}
                  onClick={() => handleSelect(category, service)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") && handleSelect(category, service)
                  }
                  className={`group relative w-full flex flex-col rounded-2xl border cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E1709A] focus-visible:ring-offset-2 ${
                    isSelected
                      ? "border-[#E1709A] bg-[#FFF5F8] shadow-[0_6px_20px_rgba(225,112,154,0.15)]"
                      : "border-[#E8E8E8] bg-white hover:border-[#E1709A]/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                  }`}
                >
                  <div className="px-5 py-5 sm:px-5 sm:py-5 flex flex-col h-full w-full">
                    {/* Top row: name, optional note, selection radio dot */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="min-w-0 flex-1">
                        <p className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold leading-snug text-[#1A1A1A]">
                          {service.name}
                        </p>
                        {/* Extra note on some services, if defined */}
                        {service.note && (
                          <p className="mt-0.5 font-[Montserrat] text-[10px] text-[#999999]">
                            {service.note}
                          </p>
                        )}
                      </div>
                      {/* Small circle — filled with check when selected */}
                      <span
                        className={`mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all ${
                          isSelected
                            ? "border-[#E1709A] bg-[#E1709A]"
                            : "border-[#D8D8D8] bg-white group-hover:border-[#E1709A]/50"
                        }`}
                        aria-hidden="true"
                      >
                        {isSelected && <FaCheck className="text-white text-[8px]" />}
                      </span>
                    </div>

                    {/* Duration badge (feature: Duration Display) */}
                    <div className="mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1.5 font-[Montserrat] text-[10px] sm:text-[11px] font-medium text-[#666666]">
                        <FaClock className="text-[#E1709A] text-[9px] shrink-0" />
                        {service.duration} min
                      </span>
                    </div>

                    {/* Price (feature: Price Display) */}
                    <div className="mt-auto flex items-center justify-between border-t border-[#EEEEEE] pt-3 gap-2">
                      <span className="font-[Montserrat] text-[9px] sm:text-[10px] uppercase tracking-[0.08em] text-[#AAAAAA]">
                        From
                      </span>
                      <span className="font-[Montserrat] text-[15px] sm:text-[16px] font-bold text-[#E1709A]">
                        CHF {service.price}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </div>
  );
};

export default ServiceSelection;
