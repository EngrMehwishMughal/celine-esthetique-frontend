/**
 * Booking page — the full online appointment flow in 5 steps:
 * 1. Pick a service (+ optional add-ons)
 * 2. Choose a date
 * 3. Pick a time slot
 * 4. Enter contact details & payment preference
 * 5. Confirmation screen with booking reference
 */
// React hook for storing values that change over time
import { useState } from "react";
// Site header shown at the top of every page
import Header from "../components/common/Header";
// Shows which step (1–4) the user is on
import StepIndicator from "../components/booking/StepIndicator";
// Step 1: pick a treatment/service
import ServiceSelection from "../components/booking/ServiceSelection";
// Step 1 extra: optional add-ons after a service is chosen
import AddOnSelection from "../components/booking/AddOnSelection";
// Step 2: calendar to pick a date
import DatePicker from "../components/booking/DatePicker";
// Step 3: available time buttons for the chosen date
import TimeSlots from "../components/booking/TimeSlots";
// Step 4: name, email, phone, and notes form
import ClientForm from "../components/booking/ClientForm";
// Step 4: pay at salon vs deposit online
import PaymentOption from "../components/booking/PaymentOption";
// Step 5: thank-you summary with booking reference
import Confirmation from "../components/booking/Confirmation";
// Builds the list of time slots and checks if any are free
import { generateTimeSlots } from "../utils/helpers/bookingHelpers";
// Fake logged-in user data used to pre-fill the form
import { currentUser } from "../utils/constants/currentUser";

// If the user is logged in, pre-fill their name, email, and phone
// Returns the starting values for the contact form
const buildInitialFormData = () => ({
  // First name from account if logged in, otherwise empty
  firstName: currentUser.isLoggedIn ? currentUser.firstName : "",
  // Last name from account if logged in, otherwise empty
  lastName: currentUser.isLoggedIn ? currentUser.lastName : "",
  // Email from account if logged in, otherwise empty
  email: currentUser.isLoggedIn ? currentUser.email : "",
  // Phone from account if logged in, otherwise empty
  phone: currentUser.isLoggedIn ? currentUser.phone : "",
  // Optional notes always start empty
  notes: "",
});

// Creates a unique booking ID like "CEL-A3B9X2"
const generateReferenceId = () => {
  // Random letters/numbers, uppercased, 6 characters long
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  // Prefix with salon brand code
  return `CEL-${part}`;
};

// Main booking page component
const BookingPage = () => {
  // Which step we are on (1 through 5)
  const [step, setStep] = useState(1);
  // The treatment the user picked (null until they choose one)
  const [service, setService] = useState(null);
  // List of optional add-ons the user toggled on
  const [addOns, setAddOns] = useState([]);
  // Selected date as a string key like "2026-06-28"
  const [date, setDate] = useState(null);
  // Selected time slot string like "10:00"
  const [time, setTime] = useState(null);
  // Contact form fields (name, email, phone, notes)
  const [formData, setFormData] = useState(buildInitialFormData);
  // Payment choice: "salon" or "deposit"
  const [payment, setPayment] = useState("salon");
  // Validation error messages keyed by field name
  const [errors, setErrors] = useState({});
  // Unique booking reference shown on confirmation
  const [referenceId, setReferenceId] = useState("");
  // True while fake "submitting" runs before step 5
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sum prices of all selected add-ons
  const addOnsTotal = addOns.reduce((sum, addOn) => sum + addOn.price, 0);
  // Service price plus add-ons (0 if no service yet)
  const totalPrice = (service?.price ?? 0) + addOnsTotal;

  // Updates one form field and clears its error if the user fixes it
  const handleFormChange = (field, value) => {
    // Merge the new value into formData
    setFormData((prev) => ({ ...prev, [field]: value }));
    // If this field had an error, remove it when they type again
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // Check that name, email, and phone are filled in correctly
  const validateForm = () => {
    // Object to collect any error messages
    const newErrors = {};

    // First name must not be blank
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    // Last name must not be blank
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    // Email required and must look like an email
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    // Phone required and must have enough digits/symbols
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Save errors to state so inputs can show them
    setErrors(newErrors);
    // Return true only if there are zero errors
    return Object.keys(newErrors).length === 0;
  };

  // Each step has its own requirement before the user can continue
  const canContinue = () => {
    // Step 1: must pick a service
    if (step === 1) return !!service;
    // Step 2: must pick a date
    if (step === 2) return !!date;
    // Step 3: must pick a time
    if (step === 3) return !!time;
    // Step 4: form is validated on submit, not here
    if (step === 4) return true;
    // Step 5 or unknown: cannot continue
    return false;
  };

  // Runs when user clicks Continue or Confirm Booking
  const handleNext = async () => {
    // On step 4, validate and then go to confirmation
    if (step === 4) {
      // Stop if form has errors
      if (!validateForm()) return;

      // Show loading state on the button
      setIsSubmitting(true);
      // Pretend to wait for a server (800 ms)
      await new Promise((resolve) => setTimeout(resolve, 800));
      // Create and store the booking reference number
      setReferenceId(generateReferenceId());
      // Done "submitting"
      setIsSubmitting(false);
      // Move to confirmation step
      setStep(5);
      // Scroll page to top smoothly
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Other steps: block if requirements not met
    if (!canContinue()) return;

    // Go to the next step
    setStep((prev) => prev + 1);
    // Scroll page to top smoothly
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Goes back one step (not from step 1 or confirmation)
  const handleBack = () => {
    // Only allow back on steps 2, 3, or 4
    if (step > 1 && step < 5) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Called when user picks a service in step 1
  const handleServiceSelect = (selected) => {
    setService(selected);
  };

  // Toggles an add-on on or off in the list
  const handleToggleAddOn = (addOn) => {
    setAddOns((prev) =>
      // If already selected, remove it; otherwise add it
      prev.some((item) => item.id === addOn.id)
        ? prev.filter((item) => item.id !== addOn.id)
        : [...prev, addOn]
    );
  };

  // Fills the form from the logged-in user's profile
  const handleAutofill = () => {
    setFormData((prev) => ({
      ...prev,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      phone: currentUser.phone,
    }));
    // Clear any old validation errors
    setErrors({});
  };

  // User picked a new date — reset time because slots change per day
  const handleDateSelect = (dateKey) => {
    setDate(dateKey);
    setTime(null);
  };

  // User picked a time slot
  const handleTimeSelect = (slot) => {
    setTime(slot);
  };

  // True if the chosen date has at least one bookable time
  const hasAvailableSlots =
    date && generateTimeSlots(date).some((slot) => slot.available);

  return (
    <>
      {/* Top navigation bar */}
      <Header />
      {/* Main page content area below the header */}
      <main className="w-full bg-white min-h-[calc(100vh-120px)] font-[Montserrat] py-8 sm:py-10 md:py-12 lg:py-14">
        {/* Centered container with responsive side padding */}
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          {/* Inner column — wider on step 1 (service grid), narrower on other steps */}
          <div
            className={`w-full mx-auto flex flex-col items-center ${
              step === 1 ? "max-w-[920px]" : "max-w-[640px]"
            }`}
          >
            {/* Page title and salon subtitle */}
            <div className="w-full text-center mb-6 sm:mb-8 md:mb-10">
              {/* Decorative script heading */}
              <h1 className="font-[Great_Vibes] text-[34px] sm:text-[42px] md:text-[48px] text-[#E1709A] mb-2 leading-tight">
                Online Booking
              </h1>
              {/* Location line under the title */}
              <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#666666] uppercase tracking-[0.12em] px-2">
                Celine Esthétique — City Centre Lausanne
              </p>
            </div>

            {/* Progress bar — hidden on final confirmation step */}
            {step < 5 && (
              <div className="w-full mb-6 sm:mb-8">
                <StepIndicator currentStep={step} />
              </div>
            )}

            {/* White card that holds the current step content */}
            <div className="w-full rounded-[20px] sm:rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="w-full flex flex-col items-center">
              {/* Each step shows a different booking component */}
              {/* Step 1: service list and optional add-ons */}
              {step === 1 && (
                <>
                  <ServiceSelection selectedService={service} onSelect={handleServiceSelect} />
                  {/* Add-ons only appear after a service is selected */}
                  {service && (
                    <AddOnSelection selectedAddOns={addOns} onToggle={handleToggleAddOn} />
                  )}
                </>
              )}
              {/* Step 2: calendar date picker */}
              {step === 2 && (
                <DatePicker selectedDate={date} onSelect={handleDateSelect} />
              )}
              {/* Step 3: time slot buttons */}
              {step === 3 && (
                <TimeSlots
                  selectedDate={date}
                  selectedTime={time}
                  onSelect={handleTimeSelect}
                />
              )}
              {/* Step 4: contact form and payment choice */}
              {step === 4 && (
                <>
                  <ClientForm
                    formData={formData}
                    onChange={handleFormChange}
                    errors={errors}
                    currentUser={currentUser}
                    onAutofill={handleAutofill}
                  />
                  <PaymentOption value={payment} onChange={setPayment} />
                </>
              )}
              {/* Step 5: booking summary and reference */}
              {step === 5 && (
                <Confirmation
                  booking={{ service, addOns, date, time, client: formData, payment }}
                  totalPrice={totalPrice}
                  referenceId={referenceId}
                />
              )}

              {/* Back / Continue buttons — not shown on confirmation */}
              {step < 5 && (
                <div className="w-full mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#F0F0F0] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  {/* Go to previous step */}
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center w-full sm:w-auto min-w-[140px] h-[48px] sm:h-[50px] px-8 sm:px-10 py-3 rounded-[8px] border border-[#1A1A1A] bg-white text-[#1A1A1A] text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase hover:bg-[#FAFAFA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Back
                  </button>

                  {/* Go forward or confirm booking */}
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={
                      !canContinue() ||
                      isSubmitting ||
                      (step === 3 && !hasAvailableSlots)
                    }
                    className="inline-flex items-center justify-center w-full sm:w-auto min-w-[160px] h-[48px] sm:h-[50px] px-8 sm:px-10 py-3 rounded-[8px] bg-[#E85A8A] text-white text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase shadow-[0_3px_10px_rgba(232,90,138,0.34)] hover:bg-[#D85A87] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Button label changes by step and loading state */}
                    {isSubmitting
                      ? "Confirming..."
                      : step === 4
                        ? "Confirm Booking"
                        : "Continue"}
                  </button>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

// Export so the router can render this page
export default BookingPage;
