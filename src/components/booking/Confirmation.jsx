import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatDisplayDate } from "../../utils/bookingHelpers";

const Confirmation = ({ booking, referenceId }) => {
  const { service, date, time, client } = booking;

  return (
    <div className="w-full max-w-[540px] mx-auto flex flex-col items-center text-center px-2 sm:px-4">
      <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-[#FFF5F8] flex items-center justify-center mx-auto mb-6">
        <FaCheckCircle className="text-[32px] sm:text-[36px] text-[#E1709A]" />
      </div>

      <h2 className="font-[Great_Vibes] text-[36px] sm:text-[44px] text-[#1A1A1A] mb-3">
        Booking Confirmed!
      </h2>
      <p className="font-[Montserrat] text-[12px] sm:text-[13px] text-[#666666] uppercase tracking-wide mb-8 sm:mb-10 max-w-[400px] mx-auto">
        Thank you {client.firstName}! A confirmation email has been sent to{" "}
        {client.email}
      </p>

      <div className="w-full bg-white rounded-[20px] border border-[#F0F0F0] shadow-[0_4px_24px_rgba(0,0,0,0.06)] px-7 py-7 sm:px-8 sm:py-8 md:px-9 md:py-9 text-left mb-8 sm:mb-10">
        <p className="font-[Montserrat] text-[10px] font-bold uppercase tracking-wider text-[#E1709A] mb-5">
          Reference: {referenceId}
        </p>

        <div className="space-y-5">
          <div className="flex justify-between gap-6 pb-5 border-b border-[#F0F0F0]">
            <span className="font-[Montserrat] text-[11px] uppercase tracking-wide text-[#888888] shrink-0">
              Service
            </span>
            <span className="font-[Montserrat] text-[13px] font-semibold text-[#1A1A1A] text-right">
              {service.name}
            </span>
          </div>
          <div className="flex justify-between gap-6 pb-5 border-b border-[#F0F0F0]">
            <span className="font-[Montserrat] text-[11px] uppercase tracking-wide text-[#888888] shrink-0">
              Date
            </span>
            <span className="font-[Montserrat] text-[13px] font-semibold text-[#1A1A1A] text-right">
              {formatDisplayDate(date)}
            </span>
          </div>
          <div className="flex justify-between gap-6 pb-5 border-b border-[#F0F0F0]">
            <span className="font-[Montserrat] text-[11px] uppercase tracking-wide text-[#888888] shrink-0">
              Time
            </span>
            <span className="font-[Montserrat] text-[13px] font-semibold text-[#1A1A1A] text-right">
              {time}
            </span>
          </div>
          <div className="flex justify-between gap-6 pb-5 border-b border-[#F0F0F0]">
            <span className="font-[Montserrat] text-[11px] uppercase tracking-wide text-[#888888] shrink-0">
              Duration
            </span>
            <span className="font-[Montserrat] text-[13px] font-semibold text-[#1A1A1A] text-right">
              {service.duration} min
            </span>
          </div>
          <div className="flex justify-between gap-6">
            <span className="font-[Montserrat] text-[11px] uppercase tracking-wide text-[#888888] shrink-0">
              Price
            </span>
            <span className="font-[Montserrat] text-[15px] font-bold text-[#E1709A] text-right">
              CHF {service.price}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
        <Link
          to="/"
          className="inline-flex items-center justify-center h-[46px] min-w-[180px] px-6 rounded-[8px] bg-[#E85A8A] text-white font-[Montserrat] text-[12px] font-bold tracking-[0.07em] uppercase shadow-[0_3px_10px_rgba(232,90,138,0.34)] hover:bg-[#D85A87] transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/services"
          className="inline-flex items-center justify-center h-[46px] min-w-[180px] px-6 rounded-[8px] bg-white border border-[#1A1A1A] text-[#1A1A1A] font-[Montserrat] text-[12px] font-bold tracking-[0.07em] uppercase hover:bg-[#FAFAFA] transition-colors"
        >
          View Services
        </Link>
      </div>
    </div>
  );
};

export default Confirmation;
