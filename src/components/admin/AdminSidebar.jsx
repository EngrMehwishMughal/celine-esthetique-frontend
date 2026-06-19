const AdminSidebar = () => {
    return (
      <aside className="w-[260px] min-h-screen bg-[#1A1A1A] text-white p-6">
        <h2 className="font-['Playfair_Display'] text-[30px] mb-10">
          Celine Admin
        </h2>
  
        <nav className="font-['Montserrat'] text-[14px] space-y-5">
          <p>Dashboard</p>
          <p>Appointments</p>
          <p>Services</p>
          <p>Staff</p>
          <p>Users</p>
          <p>Reviews</p>
          <p>Blog</p>
          <p>Gallery</p>
        </nav>
      </aside>
    );
  };
  
  export default AdminSidebar;