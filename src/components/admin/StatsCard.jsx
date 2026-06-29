const StatsCard = ({ title, value, icon, trend }) => {
  return (
    <div
      className="
        group rounded-[24px]
        border border-white/70
        bg-white
        p-6
        shadow-[0_10px_30px_rgba(26,26,26,0.06)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_16px_40px_rgba(26,26,26,0.10)]
      "
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-body text-sm font-medium text-greyText">
          {title}
        </p>

        {icon && (
          <div
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-full bg-softPink text-primaryPink
              transition group-hover:bg-primaryPink group-hover:text-white
            "
          >
            {icon}
          </div>
        )}
      </div>

      <h2 className="mt-5 font-heading text-3xl font-semibold text-gold md:text-4xl">
        {value}
      </h2>

      {trend && (
        <p className="mt-3 font-body text-xs font-medium text-green-600">
          {trend}
        </p>
      )}
    </div>
  );
};

export default StatsCard;