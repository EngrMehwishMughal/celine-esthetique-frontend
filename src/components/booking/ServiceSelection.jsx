import { bookingServices } from "../../data/bookingServices";

const ServiceSelection = ({ selectedService, onSelect }) => {
  const categories = [...new Set(bookingServices.map((s) => s.category))];

  return (
    <div>
      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-2 text-center">
        Choose Your Service
      </h2>
      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-8 sm:mb-10">
        Select the treatment you would like to book
      </p>

      <div className="space-y-8">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="font-[Montserrat] text-[12px] sm:text-[13px] font-bold uppercase tracking-wide text-[#E1709A] mb-4">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {bookingServices
                .filter((service) => service.category === category)
                .map((service) => {
                  const isSelected = selectedService?.id === service.id;

                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => onSelect(service)}
                      className={`w-full text-left rounded-[16px] p-4 sm:p-5 border-2 transition-all ${
                        isSelected
                          ? "border-[#E1709A] bg-[#FFF5F8] shadow-[0_4px_16px_rgba(225,112,154,0.2)]"
                          : "border-[#F0F0F0] bg-white hover:border-[#E1709A]/40 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="font-[Montserrat] text-[13px] sm:text-[14px] font-bold text-[#1A1A1A] mb-1">
                            {service.name}
                          </p>
                          <p className="font-[Montserrat] text-[11px] text-[#888888]">
                            {service.duration} min
                          </p>
                        </div>
                        <span className="font-[Montserrat] text-[14px] sm:text-[15px] font-bold text-[#E1709A] shrink-0">
                          CHF {service.price}
                        </span>
                      </div>
                      {isSelected && (
                        <span className="inline-block mt-3 text-[10px] font-bold uppercase tracking-wide text-[#E1709A]">
                          Selected
                        </span>
                      )}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceSelection;
