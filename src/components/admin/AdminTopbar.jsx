const AdminTopbar = () => {
    return (
      <div className="h-[72px] bg-white border-b flex items-center justify-between px-8">
        <h1 className="font-['Playfair_Display'] text-[30px] text-[#1A1A1A]">
          Dashboard
        </h1>
  
        <button className="bg-[#D4AF37] text-[#1A1A1A] px-7 py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold">
          Admin
        </button>
      </div>
    );
  };
  
  export default AdminTopbar;