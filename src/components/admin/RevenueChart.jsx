const revenueData = [
  { day: "Mon", value: 40 },
  { day: "Tue", value: 70 },
  { day: "Wed", value: 55 },
  { day: "Thu", value: 90 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 100 },
];

const RevenueChart = () => {
  return (
    <div className="mt-8 rounded-2xl bg-white p-4 shadow-md md:p-6">
      <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
        Weekly Revenue
      </h2>

      <div className="flex h-[220px] items-end justify-between gap-2 overflow-x-auto md:gap-4">
        {revenueData.map((item, index) => (
          <div
            key={index}
            className="flex min-w-[50px] flex-col items-center gap-2"
          >
            <div
              className="w-8 rounded-t-lg bg-gold transition-all md:w-10"
              style={{ height: `${item.value * 2}px` }}
            />

            <p className="font-body text-xs text-greyText md:text-sm">
              {item.day}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RevenueChart;