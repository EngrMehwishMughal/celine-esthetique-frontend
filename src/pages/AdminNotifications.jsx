const AdminNotifications = () => {
    const notifications = [
      {
        title: "Appointment Reminder",
        audience: "All Clients",
        date: "20 June 2026",
        status: "Sent",
      },
      {
        title: "Weekend Offer",
        audience: "Active Clients",
        date: "18 June 2026",
        status: "Scheduled",
      },
      {
        title: "New Service Launch",
        audience: "All Users",
        date: "15 June 2026",
        status: "Sent",
      },
    ];
  
    return (
      <div className="min-h-screen bg-[#F9E4E0] p-8">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A]">
            Push Notifications
          </h1>
          <p className="font-['Montserrat'] text-[14px] text-[#9CA3AF] mt-2">
            Send broadcast notifications to clients about offers, reminders, and updates.
          </p>
        </div>
  
        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mb-8">
          <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
            Create Notification
          </h2>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Notification Title"
              className="border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
            />
  
            <select className="border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']">
              <option>All Clients</option>
              <option>Active Clients</option>
              <option>New Clients</option>
            </select>
  
            <textarea
              placeholder="Notification message"
              rows="4"
              className="md:col-span-2 border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
            ></textarea>
          </div>
  
          <button className="mt-6 bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold">
            Send Notification
          </button>
        </div>
  
        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] overflow-x-auto">
          <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
            Notification History
          </h2>
  
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="text-left text-[#9CA3AF] border-b">
                <th className="pb-4">Title</th>
                <th className="pb-4">Audience</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Status</th>
              </tr>
            </thead>
  
            <tbody>
              {notifications.map((item, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {item.title}
                  </td>
                  <td className="py-4 text-[#9CA3AF]">{item.audience}</td>
                  <td className="py-4 text-[#9CA3AF]">{item.date}</td>
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
  
  export default AdminNotifications;