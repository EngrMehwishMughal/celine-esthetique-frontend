const data = [
    { day: "Mon", value: 40 },
    { day: "Tue", value: 70 },
    { day: "Wed", value: 55 },
    { day: "Thu", value: 90 },
    { day: "Fri", value: 65 },
    { day: "Sat", value: 100 },
  ];
  
  const RevenueChart = () => {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mt-8">
        <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
          Weekly Revenue
        </h2>
  
        <div className="flex items-end gap-6 h-[220px]">
          {data.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div
                className="w-10 bg-[#D4AF37] rounded-t-lg"
                style={{ height: `${item.value * 2}px` }}
              ></div>
  
              <p className="text-[14px] text-[#9CA3AF]">
                {item.day}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default RevenueChart;