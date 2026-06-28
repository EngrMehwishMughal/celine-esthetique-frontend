/**
 * Upcoming appointment card — one future booking on the dashboard.
 * Shows date, time, service, price, and buttons to view, reschedule, or cancel.
 */
// Import Link for navigating to appointment details
import { Link } from "react-router-dom";
// Icons used inside the card
import {
  FaCalendarAlt,
  FaClock,
  FaEye,
  FaMapMarkerAlt,
  FaRedo,
  FaTimes,
} from "react-icons/fa";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";
// Helper to check if rescheduling is still allowed
import { canRescheduleAppointment } from "../../utils/helpers/appointmentHelpers";

// Small row with icon + label + value (date, time, location, etc.)
const InfoChip = ({ icon: Icon, label, value }) => (
  // Grey rounded box for one piece of info
  <div className="flex items-start gap-3 rounded-[14px] bg-[#FAFAFA] px-4 py-3.5 ring-1 ring-[#F0F0F0]">
    {/* Small icon circle */}
    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F8]">
      <Icon className="text-[12px] text-[#E1709A]" />
    </div>
    {/* Label and value text */}
    <div className="min-w-0">
      {/* Uppercase label, e.g. "Date" */}
      <p className="mb-0.5 font-[Montserrat] text-[10px] font-semibold uppercase tracking-[0.08em] text-[#AAAAAA]">
        {label}
      </p>
      {/* The actual value, e.g. "Mon, 15 Mar 2026" */}
      <p className="font-[Montserrat] text-[13px] font-semibold leading-snug text-[#1A1A1A] sm:text-[14px]">
        {value}
      </p>
    </div>
  </div>
);

// Card for one upcoming booking on the dashboard
const UpcomingAppointmentCard = ({ appointment, onCancel, onReschedule }) => {
  // Check whether the reschedule button should be shown
  const canReschedule = canRescheduleAppointment(appointment);

  return (
    // Main card — lifts slightly on hover
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_4px_28px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E1709A]/25 hover:shadow-[0_12px_40px_rgba(225,112,154,0.14)]">
      {/* Pink accent stripe on the left edge */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-[#E1709A] to-[#F5A3BC]" />

      {/* Top section: service name, badges, and price */}
      <div className="border-b border-[#FFF0F5] bg-gradient-to-br from-[#FFF8FA] via-white to-white px-7 pb-6 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-5 flex items-start justify-between gap-4">
          {/* Left side: status badge, reference, service info */}
          <div className="min-w-0 flex-1 pl-1">
            {/* "Upcoming" badge and booking reference ID */}
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#E1709A] px-3 py-1 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_2px_8px_rgba(225,112,154,0.3)]">
                Upcoming
              </span>
              <span className="font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.1em] text-[#E1709A]/80">
                {appointment.referenceId}
              </span>
            </div>
            {/* Treatment name */}
            <h3 className="mb-2 font-[Montserrat] text-[18px] font-bold leading-snug text-[#1A1A1A] sm:text-[20px]">
              {appointment.service.name}
            </h3>
            {/* Category and duration */}
            <p className="font-[Montserrat] text-[13px] text-[#888888]">
              {appointment.service.category}
              <span className="mx-2 text-[#DDDDDD]">·</span>
              {appointment.service.duration} min
            </p>
          </div>

          {/* Right side: price box */}
          <div className="shrink-0 rounded-[16px] bg-[#FFF5F8] px-4 py-3 text-right ring-1 ring-[#E1709A]/10">
            <p className="mb-0.5 font-[Montserrat] text-[10px] font-semibold uppercase tracking-wide text-[#AAAAAA]">
              Total
            </p>
            <p className="font-[Montserrat] text-[20px] font-bold text-[#E1709A]">
              CHF {appointment.service.price}
            </p>
          </div>
        </div>
      </div>

      {/* Middle section: date, time, and location chips */}
      <div className="flex flex-1 flex-col gap-4 px-7 py-6 sm:px-8 sm:py-7">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {/* Appointment date */}
          <InfoChip
            icon={FaCalendarAlt}
            label="Date"
            value={formatDisplayDate(appointment.date)}
          />
          {/* Appointment time */}
          <InfoChip icon={FaClock} label="Time" value={appointment.time} />
        </div>
        {/* Salon location (fixed text for now) */}
        <InfoChip icon={FaMapMarkerAlt} label="Location" value="City Centre Lausanne" />
      </div>

      {/* Bottom section: action buttons */}
      <div className="mt-auto border-t border-[#F5F5F5] bg-[#FCFCFC] px-5 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-3 sm:flex-row">
          {/* Link to full appointment details page */}
          <Link
            to={`/dashboard/appointments/${appointment.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#1A1A1A] px-5 py-3.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white transition-all hover:bg-[#333333] hover:shadow-[0_4px_14px_rgba(0,0,0,0.15)]"
          >
            <FaEye className="text-[11px]" />
            View Details
          </Link>
          {/* Reschedule button — only shown when rescheduling is allowed */}
          {canReschedule && (
            <button
              type="button"
              onClick={() => onReschedule(appointment)}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border-2 border-[#E1709A] bg-white px-5 py-3.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#E1709A] transition-all hover:bg-[#FFF5F8] hover:shadow-[0_4px_14px_rgba(225,112,154,0.12)]"
            >
              <FaRedo className="text-[10px]" />
              Reschedule
            </button>
          )}
          {/* Cancel button — opens the cancel confirmation dialog */}
          <button
            type="button"
            onClick={() => onCancel(appointment)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[10px] border border-[#ECECEC] bg-white px-5 py-3.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#888888] transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500"
          >
            <FaTimes className="text-[10px]" />
            Cancel
          </button>
        </div>
      </div>
    </article>
  );
};

// Export for the upcoming appointments grid on the dashboard
export default UpcomingAppointmentCard;
