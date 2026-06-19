const notifications = [
    { title: "New appointment request", time: "10 mins ago" },
    { title: "Payment received from Sophie", time: "25 mins ago" },
    { title: "Review waiting for approval", time: "1 hour ago" },
  ];
  
  const NotificationsPanel = () => {
    return (
      <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] mt-8">
        <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
          Notifications
        </h2>
  
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div
              key={index}
              className="border border-[#F9E4E0] rounded-[16px] p-4"
            >
              <p className="font-['Montserrat'] text-[14px] font-semibold text-[#1A1A1A]">
                {item.title}
              </p>
              <p className="font-['Montserrat'] text-[12px] text-[#9CA3AF] mt-1">
                {item.time}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default NotificationsPanel;