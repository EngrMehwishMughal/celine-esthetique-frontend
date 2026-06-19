const AdminServices = () => {
    const services = [
      { name: "Manicure", category: "Nails", duration: "45 min", price: "$60" },
      { name: "Pedicure", category: "Feet", duration: "60 min", price: "$80" },
      { name: "Eyelash Lift", category: "Eyes", duration: "45 min", price: "$70" },
    ];
  
    return (
      <div className="min-h-screen bg-[#F9E4E0] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A]">
            Service Management
          </h1>
  
          <button className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold">
            Add Service
          </button>
        </div>
  
        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="text-left text-[#9CA3AF] border-b">
                <th className="pb-4">Service</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Duration</th>
                <th className="pb-4">Price</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {services.map((service, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {service.name}
                  </td>
                  <td className="py-4 text-[#9CA3AF]">{service.category}</td>
                  <td className="py-4 text-[#9CA3AF]">{service.duration}</td>
                  <td className="py-4 text-[#D4AF37] font-bold">
                    {service.price}
                  </td>
                  <td className="py-4 flex gap-3">
                    <button className="text-[#B76E79] font-semibold">Edit</button>
                    <button className="text-[#800020] font-semibold">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AdminServices;