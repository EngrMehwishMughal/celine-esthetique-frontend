/**
 * Payment options — part of step 4 in booking.
 * User chooses: pay everything at the salon, or pay a small deposit online now.
 */
// Icons for salon payment, card deposit, and secure lock note
import { FaStore, FaCreditCard, FaLock } from "react-icons/fa";

// Fixed deposit amount in CHF (also used on confirmation screen)
export const DEPOSIT_AMOUNT = 20;

// Two payment choices shown as large toggle buttons
const options = [
  {
    id: "salon",
    icon: FaStore,
    title: "Pay at the salon",
    description: "Settle the full amount during your visit.",
  },
  {
    id: "deposit",
    icon: FaCreditCard,
    title: `Pay a CHF ${DEPOSIT_AMOUNT} deposit now`,
    description: "Secure your slot — balance due at the salon.",
  },
];

// Controlled component — parent holds `value` and passes `onChange`
const PaymentOption = ({ value, onChange }) => (
  <div className="w-full max-w-[540px] mx-auto mt-9 sm:mt-10 border-t border-[#F0F0F0] pt-8">
    {/* Section heading */}
    <div className="mb-5 text-center">
      <h3 className="font-[Montserrat] text-[14px] sm:text-[15px] font-bold text-[#1A1A1A]">
        Payment
        <span className="ml-2 font-normal normal-case text-[#999999] text-[12px]">(optional)</span>
      </h3>
    </div>

    {/* Stack of payment option buttons */}
    <div className="space-y-3">
      {options.map((option) => {
        // Icon component for this option
        const Icon = option.icon;
        // True if this option matches the current value
        const selected = value === option.id;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(option.id)}
            className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E1709A] focus-visible:ring-offset-2 ${
              selected
                ? "border-[#E1709A] bg-[#FFF5F8] shadow-[0_4px_16px_rgba(225,112,154,0.12)]"
                : "border-[#E8E8E8] bg-white hover:border-[#E1709A]/40"
            }`}
          >
            {/* Square icon badge — filled pink when selected */}
            <span
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                selected ? "bg-[#E1709A] text-white" : "bg-[#FFF5F8] text-[#E1709A]"
              }`}
            >
              <Icon className="text-[15px]" />
            </span>
            {/* Title and short description */}
            <span className="min-w-0 flex-1">
              <span className="block font-[Montserrat] text-[13px] font-bold text-[#1A1A1A]">
                {option.title}
              </span>
              <span className="block font-[Montserrat] text-[11px] text-[#888888]">
                {option.description}
              </span>
            </span>
            {/* Radio-style dot on the right */}
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                selected ? "border-[#E1709A]" : "border-[#D8D8D8]"
              }`}
            >
              {selected && <span className="h-2.5 w-2.5 rounded-full bg-[#E1709A]" />}
            </span>
          </button>
        );
      })}
    </div>

    {/* Extra note when deposit option is selected */}
    {value === "deposit" && (
      <p className="mt-3 flex items-center justify-center gap-1.5 font-[Montserrat] text-[10px] text-[#999999]">
        <FaLock className="text-[9px]" />
        Secured by Stripe — you'll complete payment after confirming.
      </p>
    )}
  </div>
);

export default PaymentOption;
