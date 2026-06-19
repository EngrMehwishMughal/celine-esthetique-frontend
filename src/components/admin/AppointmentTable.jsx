const AppointmentTable = () => {
    const appointments = [
      {
        client: "Sophie Martin",
        service: "Manicure",
        date: "Today",
        time: "10:30 AM",
        status: "Confirmed",
      },
      {
        client: "Emma Laurent",
        service: "Eyelash Lift",
        date: "Today",
        time: "12:00 PM",
        status: "Pending",
      },
      {
        client: "Amina Khan",
        service: "Head Spa",
        date: "Tomorrow",
        time: "03:00 PM",
        status: "Confirmed",
      },
    ];
  
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mt-8">
        <h2 className="font-['Playfair_Display'] text-[30px] text-[#1A1A1A] mb-6">
          Recent Appointments
        </h2>
  
        <div className="overflow-x-auto">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="text-left text-[#9CA3AF] border-b">
                <th className="pb-4">Client</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
  
            <tbody>
              {appointments.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-4 text-[#1A1A1A] font-medium">
                    {item.client}
                  </td>
                  <td className="py-4 text-[#9CA3AF]">{item.service}</td>
                  <td className="py-4 text-[#9CA3AF]">{item.date}</td>
                  <td className="py-4 text-[#9CA3AF]">{item.time}</td>
                  <td className="py-4">
                    <span className="bg-[#F9E4E0] text-[#B76E79] px-4 py-2 rounded-full text-[12px]">
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AppointmentTable;