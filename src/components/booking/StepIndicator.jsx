import { BOOKING_STEPS } from "../../data/bookingServices";

const StepIndicator = ({ currentStep }) => {
  return (
    <div className="w-full max-w-[720px] mx-auto mb-6 sm:mb-8 px-1">
      <div className="hidden sm:flex items-center justify-between gap-3">
        {BOOKING_STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const isComplete = currentStep > step.id;

          return (
            <div key={step.id} className="flex items-center flex-1 min-w-0">
              <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 transition-colors ${
                    isComplete || isActive
                      ? "bg-[#E1709A] text-white"
                      : "bg-[#F5F5F5] text-[#999999]"
                  }`}
                >
                  {isComplete ? "✓" : step.id}
                </div>
                <span
                  className={`text-[10px] sm:text-[11px] font-medium uppercase tracking-wide text-center truncate w-full ${
                    isActive ? "text-[#E1709A]" : "text-[#888888]"
                  }`}
                >
                  {step.label}
                </span>
              </div>
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

      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-wide text-[#E1709A]">
            Step {currentStep} of {BOOKING_STEPS.length}
          </span>
          <span className="text-[11px] font-medium text-[#666666]">
            {BOOKING_STEPS[currentStep - 1]?.label}
          </span>
        </div>
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
