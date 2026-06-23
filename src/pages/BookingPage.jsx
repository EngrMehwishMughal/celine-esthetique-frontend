import { useState } from "react";
import Header from "../components/common/Header";
import StepIndicator from "../components/booking/StepIndicator";
import ServiceSelection from "../components/booking/ServiceSelection";
import DatePicker from "../components/booking/DatePicker";
import TimeSlots from "../components/booking/TimeSlots";
import ClientForm from "../components/booking/ClientForm";
import Confirmation from "../components/booking/Confirmation";
import { generateTimeSlots } from "../utils/bookingHelpers";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

const generateReferenceId = () => {
  const part = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CEL-${part}`;
};

const BookingPage = () => {
  const [step, setStep] = useState(1);
  const [service, setService] = useState(null);
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [referenceId, setReferenceId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\d\s+()-]{8,}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const canContinue = () => {
    if (step === 1) return !!service;
    if (step === 2) return !!date;
    if (step === 3) return !!time;
    if (step === 4) return true;
    return false;
  };

  const handleNext = async () => {
    if (step === 4) {
      if (!validateForm()) return;

      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 800));
      setReferenceId(generateReferenceId());
      setIsSubmitting(false);
      setStep(5);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!canContinue()) return;

    setStep((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    if (step > 1 && step < 5) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleServiceSelect = (selected) => {
    setService(selected);
  };

  const handleDateSelect = (dateKey) => {
    setDate(dateKey);
    setTime(null);
  };

  const handleTimeSelect = (slot) => {
    setTime(slot);
  };

  const hasAvailableSlots =
    date && generateTimeSlots(date).some((slot) => slot.available);

  return (
    <>
      <Header />
      <main className="w-full bg-[#FAFAFA] min-h-[calc(100vh-120px)] py-8 sm:py-12 md:py-14">
        <div className="w-full max-w-[1440px] mx-auto pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16 pr-5 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12">
          <div className="max-w-[720px] mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="font-[Great_Vibes] text-[36px] sm:text-[44px] md:text-[48px] text-[#E1709A] mb-2">
                Online Booking
              </h1>
              <p className="font-[Montserrat] text-[11px] sm:text-[12px] text-[#666666] uppercase tracking-wide">
                Celine Esthétique — City Centre Lausanne
              </p>
            </div>

            {step < 5 && <StepIndicator currentStep={step} />}

            <div className="bg-white rounded-[24px] shadow-[0_4px_32px_rgba(0,0,0,0.06)] p-5 sm:p-8 md:p-10 mb-6 sm:mb-8">
              {step === 1 && (
                <ServiceSelection selectedService={service} onSelect={handleServiceSelect} />
              )}
              {step === 2 && (
                <DatePicker selectedDate={date} onSelect={handleDateSelect} />
              )}
              {step === 3 && (
                <TimeSlots
                  selectedDate={date}
                  selectedTime={time}
                  onSelect={handleTimeSelect}
                />
              )}
              {step === 4 && (
                <ClientForm formData={formData} onChange={handleFormChange} errors={errors} />
              )}
              {step === 5 && (
                <Confirmation
                  booking={{ service, date, time, client: formData }}
                  referenceId={referenceId}
                />
              )}
            </div>

            {step < 5 && (
              <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 1}
                  className="inline-flex items-center justify-center h-[46px] sm:h-[48px] px-6 rounded-[8px] border border-[#1A1A1A] text-[#1A1A1A] font-[Montserrat] text-[12px] font-bold tracking-[0.07em] uppercase hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={
                    !canContinue() ||
                    isSubmitting ||
                    (step === 3 && !hasAvailableSlots)
                  }
                  className="inline-flex items-center justify-center h-[46px] sm:h-[48px] min-w-[160px] px-8 rounded-[8px] bg-[#E85A8A] text-white font-[Montserrat] text-[12px] font-bold tracking-[0.07em] uppercase shadow-[0_3px_10px_rgba(232,90,138,0.34)] hover:bg-[#D85A87] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
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
      </main>
    </>
  );
};

export default BookingPage;
