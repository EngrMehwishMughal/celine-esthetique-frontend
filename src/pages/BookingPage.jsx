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
      <main className="w-full bg-white min-h-[calc(100vh-120px)] font-[Montserrat] py-8 sm:py-10 md:py-12 lg:py-14">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          <div
            className={`w-full mx-auto flex flex-col items-center ${
              step === 1 ? "max-w-[920px]" : "max-w-[640px]"
            }`}
          >
            <div className="w-full text-center mb-6 sm:mb-8 md:mb-10">
              <h1 className="font-[Great_Vibes] text-[34px] sm:text-[42px] md:text-[48px] text-[#E1709A] mb-2 leading-tight">
                Online Booking
              </h1>
              <p className="text-[10px] sm:text-[11px] md:text-[12px] text-[#666666] uppercase tracking-[0.12em] px-2">
                Celine Esthétique — City Centre Lausanne
              </p>
            </div>

            {step < 5 && (
              <div className="w-full mb-6 sm:mb-8">
                <StepIndicator currentStep={step} />
              </div>
            )}

            <div className="w-full rounded-[20px] sm:rounded-[24px] border border-[#F0F0F0] bg-white shadow-[0_2px_24px_rgba(0,0,0,0.04)] p-6 sm:p-8 md:p-10 lg:p-12">
              <div className="w-full flex flex-col items-center">
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

              {step < 5 && (
                <div className="w-full mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#F0F0F0] flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={step === 1}
                    className="inline-flex items-center justify-center w-full sm:w-auto min-w-[140px] h-[48px] sm:h-[50px] px-8 sm:px-10 py-3 rounded-[8px] border border-[#1A1A1A] bg-white text-[#1A1A1A] text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase hover:bg-[#FAFAFA] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
                    className="inline-flex items-center justify-center w-full sm:w-auto min-w-[160px] h-[48px] sm:h-[50px] px-8 sm:px-10 py-3 rounded-[8px] bg-[#E85A8A] text-white text-[11px] sm:text-[12px] font-bold tracking-[0.07em] uppercase shadow-[0_3px_10px_rgba(232,90,138,0.34)] hover:bg-[#D85A87] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingPage;
