import React from "react";

const StatsCard = ({ title, value }) => {
  return (
    <div
      className="
        rounded-[24px]
        bg-white
        p-6
        border border-softPink
        shadow-[0_8px_20px_rgba(0,0,0,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]
      "
    >
      {/* Title */}
      <p className="font-body text-sm text-greyText">
        {title}
      </p>

      {/* Value */}
      <h2 className="mt-3 font-heading text-3xl md:text-4xl font-semibold text-gold">
        {value}
      </h2>
    </div>
  );
};

export default StatsCard;