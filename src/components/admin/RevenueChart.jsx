import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 400 },
  { day: "Tue", revenue: 700 },
  { day: "Wed", revenue: 550 },
  { day: "Thu", revenue: 900 },
  { day: "Fri", revenue: 650 },
  { day: "Sat", revenue: 1000 },
];

const RevenueChart = () => {
  return (
    <section className="flex h-full min-h-[430px] w-full flex-col rounded-[26px] border border-[#F2DDE5] bg-white p-4 shadow-[0_14px_40px_rgba(26,26,26,0.06)] md:p-5">
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-xl font-semibold text-darkText md:text-2xl">
            Weekly Revenue
          </h2>

          <p className="mt-1 max-w-[260px] text-xs text-greyText md:text-sm">
            Revenue generated from salon bookings.
          </p>
        </div>

        <select className="w-full rounded-full border border-[#F1E4E8] bg-white px-3 py-2 text-xs outline-none sm:w-auto">
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>

      {/* SUMMARY */}
      <div className="mb-6 grid grid-cols-2 gap-3">
        <div className="rounded-[18px] bg-[#FFF7F9] p-4">
          <p className="text-xs text-greyText">Total Revenue</p>
          <h3 className="mt-1 font-heading text-2xl text-gold">$4,200</h3>
        </div>

        <div className="rounded-[18px] bg-[#F5FFF7] p-4">
          <p className="text-xs text-greyText">Growth</p>
          <h3 className="mt-1 text-lg font-semibold text-green-600">
            +12.4%
          </h3>
        </div>
      </div>

      {/* CHART */}
      <div className="mt-auto h-[170px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData} margin={{ top: 10, right: 4, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="revenue" radius={[10, 10, 0, 0]} fill="#D4AF37" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default RevenueChart;