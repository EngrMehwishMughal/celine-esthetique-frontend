import { FaCheck, FaClock, FaEye, FaPaintBrush, FaShoePrints, FaSpa } from "react-icons/fa";
import { bookingServices } from "../../data/bookingServices";

const categoryMeta = {
  "Nails and Pedicure": { icon: FaPaintBrush, color: "#E1709A" },
  Aesthetic: { icon: FaSpa, color: "#D66291" },
  "Eyelash Lift": { icon: FaEye, color: "#E1709A" },
  "Simple Foot Beauty": { icon: FaShoePrints, color: "#D66291" },
};

const ServiceSelection = ({ selectedService, onSelect }) => {
  const categories = [...new Set(bookingServices.map((s) => s.category))];

  return (
    <div className="w-full max-w-[860px] mx-auto flex flex-col items-center px-4 sm:px-6 md:px-8">

      {/* Header */}
      <div className="w-full text-center mb-8 sm:mb-10">
        <h2 className="font-[Great_Vibes] text-[32px] sm:text-[40px] md:text-[44px] text-[#1A1A1A] mb-2 leading-tight">
          Choose Your Service
        </h2>
        <p className="font-[Montserrat] text-[10px] sm:text-[11px] text-[#666666] uppercase tracking-[0.14em]">
          Select the treatment you would like to book
        </p>
      </div>

      {/* Selected service banner */}
      {selectedService && (
        <div className="w-full mb-6 sm:mb-8 flex items-center gap-3 sm:gap-4 rounded-2xl bg-[#FFF5F8] border border-[#E1709A]/25 px-4 py-4 sm:px-6 sm:py-5">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#E1709A] flex items-center justify-center shrink-0">
            <FaCheck className="text-white text-[11px]" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-[Montserrat] text-[9px] sm:text-[10px] uppercase tracking-wide text-[#E1709A] font-semibold mb-0.5">
              Selected
            </p>
            <p className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold text-[#1A1A1A] truncate">
              {selectedService.name}
            </p>
          </div>
          <span className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold text-[#E1709A] shrink-0">
            CHF {selectedService.price}
          </span>
        </div>
      )}

      {/* Category sections */}
      <div className="w-full space-y-10 sm:space-y-12">
        {categories.map((category) => {
          const meta = categoryMeta[category] ?? { icon: FaSpa, color: "#E1709A" };
          const Icon = meta.icon;
          const services = bookingServices.filter((s) => s.category === category);

          return (
            <section key={category} className="w-full">

              {/* Category header */}
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFF5F8] flex items-center justify-center shrink-0">
                  <Icon className="text-[16px] sm:text-[18px]" style={{ color: meta.color }} />
                </div>
                <div>
                  <h3 className="font-[Montserrat] text-[12px] sm:text-[13px] font-bold uppercase tracking-wide text-[#1A1A1A] leading-tight">
                    {category}
                  </h3>
                  <p className="font-[Montserrat] text-[10px] sm:text-[11px] text-[#999999] mt-0.5">
                    {services.length} treatment{services.length > 1 ? "s" : ""} available
                  </p>
                </div>
              </div>

              {/* Service cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {services.map((service) => {
                  const isSelected = selectedService?.id === service.id;

                  return (
                    <div
                      key={service.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      onClick={() => onSelect(service)}
                      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onSelect(service)}
                      className={`
                        group relative w-full flex flex-col rounded-2xl border cursor-pointer
                        transition-all duration-200 focus:outline-none
                        focus-visible:ring-2 focus-visible:ring-[#E1709A] focus-visible:ring-offset-2
                        ${isSelected
                          ? "border-[#E1709A] bg-[#FFF5F8] shadow-[0_6px_20px_rgba(225,112,154,0.15)]"
                          : "border-[#E8E8E8] bg-white hover:border-[#E1709A]/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
                        }
                      `}
                    >
                      {/* Card inner — consistent padding */}
                      <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col h-full w-full">

                        {/* Top row: name + radio */}
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <p className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold leading-snug text-[#1A1A1A] flex-1 min-w-0">
                            {service.name}
                          </p>
                          {/* Radio indicator */}
                          <span
                            className={`
                              mt-0.5 shrink-0 flex items-center justify-center
                              w-5 h-5 rounded-full border-2 transition-all
                              ${isSelected
                                ? "border-[#E1709A] bg-[#E1709A]"
                                : "border-[#D8D8D8] bg-white group-hover:border-[#E1709A]/50"
                              }
                            `}
                            aria-hidden="true"
                          >
                            {isSelected && <FaCheck className="text-white text-[8px]" />}
                          </span>
                        </div>

                        {/* Duration badge */}
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F5F5] px-3 py-1.5 font-[Montserrat] text-[10px] sm:text-[11px] font-medium text-[#666666]">
                            <FaClock className="text-[#E1709A] text-[9px] shrink-0" />
                            {service.duration} min
                          </span>
                        </div>

                        {/* Price row — pinned to bottom */}
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
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default ServiceSelection;