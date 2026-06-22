const AdminSettings = () => {
    return (
      <div className="min-h-screen bg-[#F9E4E0] p-8">
        <div className="mb-8">
          <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A]">
            Admin Settings
          </h1>
          <p className="font-['Montserrat'] text-[14px] text-[#9CA3AF] mt-2">
            Manage salon profile, contact details, booking rules, and account settings.
          </p>
        </div>
  
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* SALON INFO */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
              Salon Information
            </h2>
  
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Salon Name"
                defaultValue="Celine Esthétique"
                className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
              />
  
              <input
                type="text"
                placeholder="Phone Number"
                defaultValue="+41 78 949 40 39"
                className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
              />
  
              <input
                type="email"
                placeholder="Email Address"
                defaultValue="info@celineesthetic.com"
                className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
              />
  
              <textarea
                rows="4"
                placeholder="Salon Address"
                defaultValue="Cheneau-de-Bourg Street, Billens Stairs 1, 1003 Lausanne"
                className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']"
              ></textarea>
            </div>
          </div>
  
          {/* BOOKING RULES */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
            <h2 className="font-['Playfair_Display'] text-[28px] text-[#1A1A1A] mb-6">
              Booking Rules
            </h2>
  
            <div className="space-y-4">
              <select className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']">
                <option>Allow booking 30 days in advance</option>
                <option>Allow booking 60 days in advance</option>
                <option>Allow booking 90 days in advance</option>
              </select>
  
              <select className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']">
                <option>Cancel before 24 hours</option>
                <option>Cancel before 12 hours</option>
                <option>Cancel before 48 hours</option>
              </select>
  
              <select className="w-full border border-[#F9E4E0] rounded-[12px] px-4 py-3 font-['Montserrat']">
                <option>Reminder: 1 day before appointment</option>
                <option>Reminder: 2 hours before appointment</option>
                <option>Reminder: Both</option>
              </select>
            </div>
          </div>
        </div>
  
        <button className="mt-8 bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold">
          Save Settings
        </button>
      </div>
    );
  };
  
  export default AdminSettings;