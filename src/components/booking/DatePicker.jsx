/**

 * Date picker — step 2 of booking (also reused on the reschedule page).

 * Calendar grid where the user picks an available day (Sundays are blocked).

 */

// React hook to track which month/year the calendar is showing

import { useState } from "react";

// Left/right arrows to change month

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Helpers to build the calendar grid and check if a day can be picked

import {

  WEEKDAYS,

  formatDateKey,

  getCalendarDays,

  getMonthLabel,

  isDateSelectable,

} from "../../utils/helpers/bookingHelpers";



// Calendar UI — parent owns the selected date string

const DatePicker = ({ selectedDate, onSelect }) => {

  // Today's date — used to block past days and highlight today

  const today = new Date();

  // Year currently visible in the calendar

  const [viewYear, setViewYear] = useState(today.getFullYear());

  // Month index (0–11) currently visible

  const [viewMonth, setViewMonth] = useState(today.getMonth());



  // Array of Date objects (and nulls for empty cells) for the grid

  const days = getCalendarDays(viewYear, viewMonth);



  // Go to the previous month (and previous year if January)

  const goToPrevMonth = () => {

    if (viewMonth === 0) {

      setViewMonth(11);

      setViewYear(viewYear - 1);

    } else {

      setViewMonth(viewMonth - 1);

    }

  };



  // Go to the next month (and next year if December)

  const goToNextMonth = () => {

    if (viewMonth === 11) {

      setViewMonth(0);

      setViewYear(viewYear + 1);

    } else {

      setViewMonth(viewMonth + 1);

    }

  };



  // Don't let users go back to months before today

  const canGoPrev =

    viewYear > today.getFullYear() ||

    (viewYear === today.getFullYear() && viewMonth > today.getMonth());



  return (

    <div className="w-full max-w-[480px] mx-auto flex flex-col items-center px-2 sm:px-4">

      {/* Step heading */}

      <h2 className="font-[Great_Vibes] text-[32px] sm:text-[38px] text-[#1A1A1A] mb-3 text-center">

        Pick a Date

      </h2>

      {/* Hint that Sundays are not bookable */}

      <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] text-center uppercase tracking-wide mb-8 sm:mb-10 px-2">

        We are closed on Sundays

      </p>



      {/* Calendar card with shadow and border */}

      <div className="w-full bg-white rounded-[20px] border border-[#F0F0F0] shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-7 py-7 sm:px-8 sm:py-8 md:px-9 md:py-9">

        {/* Month navigation row */}

        <div className="flex items-center justify-between mb-6 px-1">

          {/* Previous month button — disabled if already at current month */}

          <button

            type="button"

            onClick={goToPrevMonth}

            disabled={!canGoPrev}

            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#F5F5F5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"

            aria-label="Previous month"

          >

            <FaChevronLeft className="text-[12px]" />

          </button>

          {/* Current month and year label */}

          <span className="font-[Montserrat] text-[14px] sm:text-[15px] font-bold text-[#1A1A1A]">

            {getMonthLabel(viewYear, viewMonth)}

          </span>

          {/* Next month button — always allowed */}

          <button

            type="button"

            onClick={goToNextMonth}

            className="w-9 h-9 rounded-full flex items-center justify-center text-[#1A1A1A] hover:bg-[#F5F5F5] transition-colors"

            aria-label="Next month"

          >

            <FaChevronRight className="text-[12px]" />

          </button>

        </div>



        {/* Row of weekday abbreviations (Mon, Tue, …) */}

        <div className="grid grid-cols-7 gap-2.5 mb-3 px-0.5">

          {WEEKDAYS.map((day) => (

            <div

              key={day}

              className="text-center font-[Montserrat] text-[10px] sm:text-[11px] font-semibold text-[#999999] py-2"

            >

              {day}

            </div>

          ))}

        </div>



        {/* 7-column grid of day number buttons */}

        <div className="grid grid-cols-7 gap-2.5 px-0.5">

          {days.map((date, index) => {

            // Empty cell at start/end of month to align weekdays

            if (!date) {

              return <div key={`empty-${index}`} />;

            }



            // Stable string id for this day, e.g. "2026-06-28"

            const dateKey = formatDateKey(date);

            // False for past days, Sundays, etc.

            const selectable = isDateSelectable(date);

            // True if parent already selected this day

            const isSelected = selectedDate === dateKey;

            // True if this cell is today's date

            const isToday = formatDateKey(today) === dateKey;



            return (

              <button

                key={dateKey}

                type="button"

                disabled={!selectable}

                onClick={() => onSelect(dateKey)}

                className={`aspect-square rounded-full flex items-center justify-center font-[Montserrat] text-[12px] sm:text-[13px] font-medium transition-all ${

                  isSelected

                    ? "bg-[#E1709A] text-white shadow-[0_2px_8px_rgba(225,112,154,0.4)]"

                    : selectable

                      ? isToday

                        ? "text-[#E1709A] font-bold hover:bg-[#FFF5F8]"

                        : "text-[#1A1A1A] hover:bg-[#F5F5F5]"

                      : "text-[#CCCCCC] cursor-not-allowed"

                }`}

              >

                {date.getDate()}

              </button>

            );

          })}

        </div>

      </div>

    </div>

  );

};



export default DatePicker;

