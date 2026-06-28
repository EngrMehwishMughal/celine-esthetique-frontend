/**
 * Add-on selection — optional extras after picking a main service.
 * Things like paraffin treatment or nail art — user can toggle multiple on/off.
 */
// Plus icon for unselected, check for selected add-ons
import { FaPlus, FaCheck } from "react-icons/fa";
// List of optional add-on products and prices
import { bookingAddOns } from "../../utils/constants/servicesCatalog";

// Toggle optional extras on or off
const AddOnSelection = ({ selectedAddOns, onToggle }) => {
  // Returns true if this add-on id is already in the selected list
  const isSelected = (id) => selectedAddOns.some((addOn) => addOn.id === id);

  return (
    <div className="w-full max-w-[920px] mx-auto mt-10 sm:mt-12 border-t border-[#F0F0F0] pt-9 sm:pt-10">
      {/* Section title and short description */}
      <div className="text-center mb-6 sm:mb-7">
        <h3 className="font-[Montserrat] text-[15px] sm:text-[16px] font-bold text-[#1A1A1A]">
          Enhance Your Visit
          <span className="ml-2 font-normal normal-case text-[#999999] text-[12px]">(optional)</span>
        </h3>
        <p className="font-[Montserrat] text-[11px] text-[#888888] mt-1">
          Add a little extra to make your appointment even better.
        </p>
      </div>

      {/* Grid of add-on toggle buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {bookingAddOns.map((addOn) => {
          // Whether this add-on is currently turned on
          const selected = isSelected(addOn.id);
          return (
            <button
              key={addOn.id}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggle(addOn)}
              className={`group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E1709A] focus-visible:ring-offset-2 ${
                selected
                  ? "border-[#E1709A] bg-[#FFF5F8] shadow-[0_4px_16px_rgba(225,112,154,0.12)]"
                  : "border-[#E8E8E8] bg-white hover:border-[#E1709A]/40"
              }`}
            >
              {/* Circle with plus or check depending on selection */}
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  selected
                    ? "border-[#E1709A] bg-[#E1709A] text-white"
                    : "border-[#D8D8D8] bg-white text-[#BBBBBB] group-hover:border-[#E1709A]/50"
                }`}
              >
                {selected ? <FaCheck className="text-[11px]" /> : <FaPlus className="text-[11px]" />}
              </span>

              {/* Add-on name and description */}
              <span className="min-w-0 flex-1">
                <span className="block font-[Montserrat] text-[13px] font-bold text-[#1A1A1A]">
                  {addOn.name}
                </span>
                <span className="block font-[Montserrat] text-[11px] leading-snug text-[#888888]">
                  {addOn.description}
                </span>
              </span>

              {/* Extra price and duration on the right */}
              <span className="shrink-0 text-right">
                <span className="block font-[Montserrat] text-[14px] font-bold text-[#E1709A]">
                  +CHF {addOn.price}
                </span>
                <span className="block font-[Montserrat] text-[10px] text-[#AAAAAA]">
                  {addOn.duration} min
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default AddOnSelection;
