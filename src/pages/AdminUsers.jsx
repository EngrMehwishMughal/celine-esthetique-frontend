const AdminUsers = () => {
    const users = [
      {
        name: "Sophie Martin",
        email: "sophie@example.com",
        phone: "+41 78 111 22 33",
        role: "Client",
        status: "Active",
      },
      {
        name: "Emma Laurent",
        email: "emma@example.com",
        phone: "+41 78 444 55 66",
        role: "Client",
        status: "Active",
      },
      {
        name: "Amina Khan",
        email: "amina@example.com",
        phone: "+41 78 777 88 99",
        role: "Client",
        status: "Blocked",
      },
    ];
  
    return (
      <div className="min-h-screen bg-[#F9E4E0] p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-['Playfair_Display'] text-[36px] text-[#1A1A1A]">
            Client Management
          </h1>
  
          <button className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold">
            Add Client
          </button>
        </div>
  
        <div className="bg-white rounded-[20px] p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] overflow-x-auto">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="text-left text-[#9CA3AF] border-b">
                <th className="pb-4">Name</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>
  
            <tbody>
              {users.map((user, index) => (
                <tr key={index} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {user.name}
                  </td>
                  <td className="py-4 text-[#9CA3AF]">{user.email}</td>
                  <td className="py-4 text-[#9CA3AF]">{user.phone}</td>
                  <td className="py-4 text-[#9CA3AF]">{user.role}</td>
                  <td className="py-4">
                    <span className="bg-[#F9E4E0] text-[#B76E79] px-4 py-2 rounded-full text-[12px]">
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 flex gap-3">
                    <button className="text-[#B76E79] font-semibold">
                      View
                    </button>
                    <button className="text-[#800020] font-semibold">
                      Block
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default AdminUsers;