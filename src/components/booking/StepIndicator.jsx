/**
 * Step indicator — progress bar for the booking flow (steps 1–4).
 * Desktop shows numbered circles; mobile shows a simple progress bar.
 */
// List of step ids and labels (Service, Date, Time, Details)
import { BOOKING_STEPS } from "../../utils/constants/bookingServices";

// Shows progress through the booking steps
const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full max-w-[720px] mx-auto mb-6 sm:mb-8 px-1">
      {/* Desktop layout: circles and connecting lines (hidden on small screens) */}
      <div className="hidden sm:flex items-center justify-between gap-3">
        {/* Loop over each step definition */}
        {BOOKING_STEPS.map((step, index) => {
          // True when this step is the one the user is on
          const isActive = currentStep === step.id;
          // True when the user has already passed this step
          const isComplete = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              {/* Circle number and label stacked vertically */}
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                {/* Numbered circle — pink if active or done, grey if upcoming */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors ${
                    isComplete || isActive
                      ? "bg-[#E1709A] text-white"
                      : "bg-[#F5F5F5] text-[#999999]"
                  }`}
                >
                  {/* Checkmark for completed steps, otherwise show step number */}
                  {isComplete ? "✓" : step.id}
                </div>
                {/* Step name under the circle */}
                <span
                  className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-center truncate w-full ${
                    isActive ? "text-[#E1709A]" : "text-[#888888]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {/* Horizontal line between steps (not after the last one) */}
              {index < BOOKING_STEPS.length - 1 && (
                <div
                  className={`h-[2px] flex-1 mx-1 mb-5 transition-colors ${
                    currentStep > step.id ? "bg-[#E1709A]" : "bg-[#E8E8E8]"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile layout: text + thin progress bar (hidden on sm and up) */}
      <div className="sm:hidden">
        {/* "Step X of Y" and current step label */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#E1709A]">
            Step {currentStep} of {BOOKING_STEPS.length}
          </span>
          <span className="text-[11px] font-medium text-[#666666]">
            {BOOKING_STEPS[currentStep - 1]?.label}
          </span>
        </div>
        {/* Grey track with pink fill showing percent complete */}
        <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#E1709A] rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / BOOKING_STEPS.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;
