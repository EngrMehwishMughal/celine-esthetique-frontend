/**
 * Appointment summary — full detail breakdown of one booking.
 * Used on the appointment details page; can optionally show client info and status.
 */
// Icons for each detail row in the summary
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaSpa,
  FaStickyNote,
  FaUser,
} from "react-icons/fa";
// Helper to format dates for display
import { formatDisplayDate } from "../../utils/helpers/bookingHelpers";
// Helpers for status badge colours and label text
import { getStatusColor, getStatusLabel } from "../../utils/helpers/appointmentHelpers";

// Single row in the summary — icon, label, and value
const DetailRow = ({ icon: Icon, label, value, highlight = false }) => (
  // Grey rounded row
  <div className="flex items-start gap-4 rounded-[14px] bg-[#FAFAFA] px-4 py-4 ring-1 ring-[#F0F0F0] sm:px-5 sm:py-4">
    {/* Icon box — only shown when an icon was passed */}
    {Icon && (
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FFF5F8]">
        <Icon className="text-[12px] text-[#E1709A]" />
      </div>
    )}
    {/* Label and value */}
    <div className="min-w-0 flex-1">
      {/* Small uppercase label */}
      <p className="mb-1 font-[Montserrat] text-[10px] font-semibold uppercase tracking-[0.1em] text-[#AAAAAA]">
        {label}
      </p>
      {/* Value text — pink when highlight is true */}
      <p
        className={`font-[Montserrat] text-[14px] font-semibold leading-snug sm:text-[15px] ${
          highlight ? "text-[#E1709A]" : "text-[#1A1A1A]"
        }`}
      >
        {value}
      </p>
    </div>
  </div>
);

// Section title inside the summary (e.g. "Booking Details")
const SectionHeading = ({ title, description }) => (
  // Heading block with optional description
  <div className="mb-5 sm:mb-6">
    <h3 className="font-[Montserrat] text-[13px] font-bold uppercase tracking-[0.1em] text-[#1A1A1A] sm:text-[14px]">
      {title}
    </h3>
    {/* Optional smaller description under the heading */}
    {description && (
      <p className="mt-1 font-[Montserrat] text-[12px] text-[#888888]">{description}</p>
    )}
  </div>
);

// Full appointment detail panel used on the details page
const AppointmentSummary = ({ appointment, showClient = false, showStatus = true }) => {
  // Colours for the status badge
  const statusColors = getStatusColor(appointment);

  return (
    <div className="w-full">
      {/* Top banner: booking reference and status badge */}
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4 rounded-[18px] bg-gradient-to-r from-[#FFF5F8] to-white px-6 py-5 ring-1 ring-[#E1709A]/10 sm:px-7 sm:py-6">
        {/* Reference ID block */}
        <div>
          <p className="mb-1 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
            Booking Reference
          </p>
          <p className="font-[Montserrat] text-[18px] font-bold text-[#1A1A1A] sm:text-[20px]">
            {appointment.referenceId}
          </p>
        </div>
        {/* Status badge — only when showStatus is true */}
        {showStatus && (
          <span
            className="rounded-full px-4 py-1.5 font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.08em] shadow-sm"
            style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
          >
            {getStatusLabel(appointment)}
          </span>
        )}
      </div>

      {/* Booking details section heading */}
      <SectionHeading title="Booking Details" description="Treatment and schedule information" />
      {/* Grid of service, date, time, duration, and price rows */}
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <DetailRow icon={FaSpa} label="Service" value={appointment.service.name} />
        <DetailRow icon={FaSpa} label="Category" value={appointment.service.category} />
        <DetailRow icon={FaCalendarAlt} label="Date" value={formatDisplayDate(appointment.date)} />
        <DetailRow icon={FaClock} label="Time" value={appointment.time} />
        <DetailRow icon={FaClock} label="Duration" value={`${appointment.service.duration} min`} />
        <DetailRow
          icon={FaSpa}
          label="Price"
          value={`CHF ${appointment.service.price}`}
          highlight
        />
      </div>

      {/* Client info section — only when showClient is true */}
      {showClient && (
        <>
          <div className="mb-8 border-t border-[#F0F0F0] pt-8">
            {/* Client section heading */}
            <SectionHeading title="Client Information" description="Contact details on file" />
            {/* Grid of name, email, phone, and optional notes */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <DetailRow
                icon={FaUser}
                label="Full Name"
                value={`${appointment.client.firstName} ${appointment.client.lastName}`}
              />
              <DetailRow icon={FaEnvelope} label="Email" value={appointment.client.email} />
              <DetailRow icon={FaPhone} label="Phone" value={appointment.client.phone} />
              {/* Notes row — only shown when the client left notes */}
              {appointment.client.notes && (
                <div className="sm:col-span-2">
                  <DetailRow icon={FaStickyNote} label="Notes" value={appointment.client.notes} />
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Export for the appointment details page
export default AppointmentSummary;
