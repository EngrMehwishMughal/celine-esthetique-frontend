/**
 * Reschedule step indicator — progress dots for the 3-step reschedule flow.
 * Steps: pick date → pick time → review changes.
 */
// Checkmark icon shown on completed steps
import { FaCheck } from "react-icons/fa";

// The three steps in the reschedule wizard
const RESCHEDULE_STEPS = [
  { id: 1, label: "Date" },
  { id: 2, label: "Time" },
  { id: 3, label: "Review" },
];

// Horizontal progress bar showing which reschedule step the user is on
const RescheduleStepIndicator = ({ currentStep }) => (
  // Grey rounded container for the step dots
  <div className="mb-10 w-full max-w-[540px] rounded-[20px] bg-[#FAFAFA] px-5 py-6 ring-1 ring-[#F0F0F0] sm:px-8 sm:py-7">
    {/* Row of three step circles */}
    <div className="flex items-start justify-between">
      {/* Loop through each step and render a circle + label */}
      {RESCHEDULE_STEPS.map((step, index) => {
        // True when this step is the one the user is currently on
        const isActive = step.id === currentStep;
        // True when the user has already finished this step
        const isCompleted = step.id < currentStep;

        return (
          // One step column — circle on top, label below
          <div key={step.id} className="relative flex flex-1 flex-col items-center">
            {/* Connecting line between steps — hidden after the last step */}
            {index < RESCHEDULE_STEPS.length - 1 && (
              <div
                className={`absolute left-[calc(50%+20px)] top-5 h-[2px] w-[calc(100%-40px)] rounded-full ${
                  isCompleted ? "bg-[#E1709A]" : "bg-[#E8E8E8]"
                }`}
              />
            )}

            {/* Step circle — pink when active or completed, grey when not reached yet */}
            <div
              className={`relative z-10 mb-3 flex h-10 w-10 items-center justify-center rounded-full font-[Montserrat] text-[13px] font-bold transition-all sm:h-11 sm:w-11 ${
                isActive
                  ? "bg-[#E1709A] text-white shadow-[0_4px_14px_rgba(225,112,154,0.4)]"
                  : isCompleted
                    ? "bg-[#E1709A] text-white"
                    : "bg-white text-[#AAAAAA] ring-2 ring-[#E8E8E8]"
              }`}
            >
              {/* Show checkmark for completed steps, step number otherwise */}
              {isCompleted ? <FaCheck className="text-[11px]" /> : step.id}
            </div>
            {/* Step label under the circle */}
            <span
              className={`text-center font-[Montserrat] text-[10px] font-bold uppercase tracking-[0.08em] ${
                isActive || isCompleted ? "text-[#E1709A]" : "text-[#AAAAAA]"
              }`}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  </div>
);

// Export for the reschedule page
export default RescheduleStepIndicator;
