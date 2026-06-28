/**

 * Time slots — step 3 of booking.

 * Shows available hours for the date the user already chose. Greyed-out = already taken.

 */

// Builds slot list with available flag for the given date

import { generateTimeSlots } from "../../utils/helpers/bookingHelpers";



// Grid of time buttons for one selected date

const TimeSlots = ({ selectedDate, selectedTime, onSelect }) => {

  // All slots for this date (some may be unavailable)

  const slots = generateTimeSlots(selectedDate);

  // Subset that are still free — used for empty-state message

  const availableSlots = slots.filter((slot) => slot.available);



  return (

    <div className="w-full max-w-[580px] mx-auto flex flex-col items-center px-2 sm:px-4">

      {/* Step heading */}

      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-3 text-center">

        Select a Time

      </h2>

      {/* Short instruction under the title */}

      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-8 sm:mb-10 px-2">

        Available slots for your chosen date

      </p>



      {/* If every slot is taken, show a friendly message instead of buttons */}

      {availableSlots.length === 0 ? (

        <p className="text-center font-[Montserrat] text-[13px] text-[#888888] py-8 px-4">

          No available slots on this date. Please choose another day.

        </p>

      ) : (

        <div className="w-full flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5 px-2">

          {/* Show all slots — unavailable ones are disabled and struck through */}

          {slots.map(({ time, available }) => {

            // True if user already picked this time

            const isSelected = selectedTime === time;



            return (

              <button

                key={time}

                type="button"

                disabled={!available}

                onClick={() => onSelect(time)}

                className={`min-w-[92px] sm:min-w-[100px] px-6 py-4 sm:px-7 sm:py-[18px] rounded-[10px] font-[Montserrat] text-[11px] sm:text-[12px] font-semibold transition-all ${

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

