/**
 * Reschedule page — lets a client pick a new date and time for an existing booking.
 * Three steps: date → time → review & confirm.
 */
// Import useState for wizard step, selected date/time, and submit state
import { useState } from "react";
// Import Link, useNavigate, and useParams for routing
import { Link, useNavigate, useParams } from "react-router-dom";
// Warning icon for the error state
import { FaExclamationCircle } from "react-icons/fa";
// Shared dashboard layout wrapper (narrow column)
import DashboardShell from "../components/dashboard/DashboardShell";
// Page title with back link
import DashboardPageHeader from "../components/dashboard/DashboardPageHeader";
// Calendar picker from the booking flow — reused here
import DatePicker from "../components/booking/DatePicker";
// Time slot picker from the booking flow — reused here
import TimeSlots from "../components/booking/TimeSlots";
// Three-step progress indicator (Date → Time → Review)
import RescheduleStepIndicator from "../components/dashboard/RescheduleStepIndicator";
// Thank-you screen after successful reschedule
import RescheduleSuccessState from "../components/dashboard/RescheduleSuccessState";
// Loading placeholders
import DashboardSkeleton from "../components/dashboard/DashboardSkeleton";
// Hook to load and update appointment data
import { useAppointments } from "../hooks/useAppointments";
// Helper to check if this booking can still be rescheduled
import { canRescheduleAppointment } from "../utils/helpers/appointmentHelpers";
// Helpers to format dates and generate available time slots
import { formatDisplayDate, generateTimeSlots } from "../utils/helpers/bookingHelpers";

// Reschedule wizard page component
const ReschedulePage = () => {
  // Booking ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { getById, loading, rescheduleAppointment } = useAppointments();
  // Look up the appointment to reschedule
  const appointment = getById(id);

  // 1 = date, 2 = time, 3 = review
  const [step, setStep] = useState(1);
  // Selected new date (ISO string key from DatePicker)
  const [date, setDate] = useState(null);
  // Selected new time slot string
  const [time, setTime] = useState(null);
  // True while the confirm request is processing
  const [isSubmitting, setIsSubmitting] = useState(false);
  // show thank-you screen when done
  const [isSuccess, setIsSuccess] = useState(false);
  // True when the chosen date has at least one available time slot
  const hasAvailableSlots =
    date && generateTimeSlots(date).some((slot) => slot.available);

  // When user picks a new date — reset the time selection
  const handleDateSelect = (dateKey) => {
    setDate(dateKey);
    setTime(null);
  };

  // When user confirms the reschedule on step 3
  const handleConfirm = async () => {
    // Safety check — need appointment, date, and time
    if (!appointment || !date || !time) return;

    setIsSubmitting(true);
    // Brief delay to simulate a network request
    await new Promise((resolve) => setTimeout(resolve, 800));
    // Save the new date and time on the appointment
    rescheduleAppointment(appointment.id, date, time);
    setIsSubmitting(false);
    setIsSuccess(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show skeleton while appointment data is loading
  if (loading) {
    return (
      <DashboardShell narrow>
        <DashboardSkeleton />
      </DashboardShell>
    );
  }

  // Booking can't be rescheduled (too late, already completed, etc.)
  if (!appointment || !canRescheduleAppointment(appointment)) {
    return (
      <DashboardShell narrow>
        {/* Error card when rescheduling is not allowed */}
        <div className="overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white px-8 py-14 text-center shadow-[0_8px_40px_rgba(0,0,0,0.06)] sm:px-12 sm:py-16">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5F8]">
            <FaExclamationCircle className="text-[28px] text-[#E1709A]" />
          </div>
          <h1 className="mb-3 font-[Great_Vibes] text-[40px] text-[#1A1A1A]">
            Cannot Reschedule
          </h1>
          <p className="mb-8 font-[Montserrat] text-[14px] leading-relaxed text-[#666666]">
            This appointment is no longer available for rescheduling.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex h-[50px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87]"
          >
            Back to Dashboard
          </Link>
        </div>
      </DashboardShell>
    );
  }

  // Done — show the success screen with the new date and time
  if (isSuccess) {
    return (
      <DashboardShell narrow>
        <RescheduleSuccessState appointment={appointment} date={date} time={time} />
      </DashboardShell>
    );
  }

  // Main reschedule wizard
  return (
    <DashboardShell narrow>
      <DashboardPageHeader
        backTo={`/dashboard/appointments/${appointment.id}`}
        backLabel="Back to Details"
        badge="Reschedule"
        title="Reschedule Appointment"
        subtitle={`${appointment.service.name} · ${appointment.referenceId}`}
      />

      {/* Wizard card */}
      <div className="overflow-hidden rounded-[28px] border border-[#F0F0F0] bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
        <div className="flex flex-col items-center px-6 py-8 sm:px-9 sm:py-10 md:px-10 md:py-12">
          {/* Step progress dots */}
          <RescheduleStepIndicator currentStep={step} />

          {/* Step 1: pick a new date */}
          {step === 1 && <DatePicker selectedDate={date} onSelect={handleDateSelect} />}
          {/* Step 2: pick a new time slot */}
          {step === 2 && (
            <TimeSlots selectedDate={date} selectedTime={time} onSelect={setTime} />
          )}
          {/* Step 3: review old vs new date/time before confirming */}
          {step === 3 && (
            <div className="w-full max-w-[520px] px-2 sm:px-4">
              <div className="mb-8 text-center sm:mb-10">
                <h2 className="mb-3 font-[Great_Vibes] text-[34px] text-[#1A1A1A] sm:text-[40px]">
                  Review Changes
                </h2>
                <p className="font-[Montserrat] text-[13px] text-[#666666]">
                  Please confirm your updated appointment details below.
                </p>
              </div>

              {/* Comparison table: old schedule vs new schedule */}
              <div className="overflow-hidden rounded-[20px] ring-1 ring-[#F0F0F0]">
                <div className="bg-gradient-to-r from-[#FFF5F8] to-white px-6 py-4 sm:px-7">
                  <p className="font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.12em] text-[#E1709A]">
                    Updated Schedule
                  </p>
                </div>
                <div className="space-y-0 bg-white px-6 py-6 sm:px-7 sm:py-7">
                  {/* Service name row */}
                  <div className="flex justify-between gap-6 border-b border-[#F0F0F0] py-4">
                    <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                      Service
                    </span>
                    <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#1A1A1A]">
                      {appointment.service.name}
                    </span>
                  </div>
                  {/* Previous date/time — shown with strikethrough */}
                  <div className="flex justify-between gap-6 border-b border-[#F0F0F0] py-4">
                    <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                      Previous
                    </span>
                    <span className="text-right font-[Montserrat] text-[13px] text-[#AAAAAA] line-through">
                      {formatDisplayDate(appointment.date)} · {appointment.time}
                    </span>
                  </div>
                  {/* New date row */}
                  <div className="flex justify-between gap-6 border-b border-[#F0F0F0] py-4">
                    <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                      New Date
                    </span>
                    <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#1A1A1A]">
                      {formatDisplayDate(date)}
                    </span>
                  </div>
                  {/* New time row — highlighted in pink */}
                  <div className="flex justify-between gap-6 py-4">
                    <span className="font-[Montserrat] text-[11px] font-semibold uppercase tracking-wide text-[#888888]">
                      New Time
                    </span>
                    <span className="text-right font-[Montserrat] text-[14px] font-bold text-[#E1709A]">
                      {time}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Back and Continue / Confirm buttons */}
        <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-[#F5F5F5] bg-[#FCFCFC] px-6 py-6 sm:flex-row sm:items-center sm:px-9 sm:py-8 md:px-10">
          {/* Back button — goes to previous step or back to details on step 1 */}
          <button
            type="button"
            onClick={() => {
              if (step === 1) {
                navigate(`/dashboard/appointments/${appointment.id}`);
              } else {
                setStep((prev) => prev - 1);
              }
            }}
            className="inline-flex h-[50px] min-w-[140px] items-center justify-center rounded-[10px] border border-[#1A1A1A] bg-white px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-[#1A1A1A] transition-all hover:bg-[#FAFAFA] sm:w-auto"
          >
            Back
          </button>

          {/* Continue or Confirm button — disabled until required selections are made */}
          <button
            type="button"
            onClick={() => {
              if (step === 3) {
                handleConfirm();
              } else {
                setStep((prev) => prev + 1);
              }
            }}
            disabled={
              (step === 1 && !date) ||
              (step === 2 && !time) ||
              (step === 2 && !hasAvailableSlots) ||
              isSubmitting
            }
            className="inline-flex h-[50px] min-w-[180px] items-center justify-center rounded-[10px] bg-[#E85A8A] px-8 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.07em] text-white shadow-[0_4px_14px_rgba(232,90,138,0.34)] transition-all hover:bg-[#D85A87] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            {isSubmitting
              ? "Confirming..."
              : step === 3
                ? "Confirm Reschedule"
                : "Continue"}
          </button>
        </div>
      </div>
    </DashboardShell>
  );
};

export default ReschedulePage;
