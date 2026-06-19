const bookings = [
    { time: "09:00", client: "Sophie Martin", service: "Manicure" },
    { time: "11:30", client: "Emma Laurent", service: "Eyelash Lift" },
    { time: "14:00", client: "Amina Khan", service: "Head Spa" },
  ];
  
  const CalendarView = () => {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mt-8">
        <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
          Today’s Booking Calendar
        </h2>
  
        <div className="space-y-4">
          {bookings.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-l-4 border-[#D4AF37] bg-[#F9E4E0] rounded-[16px] p-4"
            >
              <div>
                <p className="font-['Montserrat'] text-[14px] font-semibold text-[#1A1A1A]">
                  {item.client}
                </p>
                <p className="font-['Montserrat'] text-[12px] text-[#9CA3AF]">
                  {item.service}
                </p>
              </div>
  
              <span className="font-['Montserrat'] text-[14px] font-semibold text-[#B76E79]">
                {item.time}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CalendarView;