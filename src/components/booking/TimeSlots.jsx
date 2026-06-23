import { generateTimeSlots } from "../../utils/bookingHelpers";

const TimeSlots = ({ selectedDate, selectedTime, onSelect }) => {
  const slots = generateTimeSlots(selectedDate);
  const availableSlots = slots.filter((slot) => slot.available);

  return (
    <div>
      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-2 text-center">
        Select a Time
      </h2>
      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-8 sm:mb-10">
        Available slots for your chosen date
      </p>

      {availableSlots.length === 0 ? (
        <p className="text-center font-[Montserrat] text-[13px] text-[#888888] py-8">
          No available slots on this date. Please choose another day.
        </p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3 max-w-[520px] mx-auto">
          {slots.map(({ time, available }) => {
            const isSelected = selectedTime === time;

            return (
              <button
                key={time}
                type="button"
                disabled={!available}
                onClick={() => onSelect(time)}
                className={`py-2.5 sm:py-3 rounded-[10px] font-[Montserrat] text-[11px] sm:text-[12px] font-semibold transition-all ${
                  isSelected
                    ? "bg-[#E1709A] text-white shadow-[0_2px_8px_rgba(225,112,154,0.35)]"
                    : available
                      ? "bg-white border border-[#E8E8E8] text-[#1A1A1A] hover:border-[#E1709A] hover:text-[#E1709A]"
                      : "bg-[#F8F8F8] text-[#CCCCCC] line-through cursor-not-allowed"
                }`}
              >
                {time}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
