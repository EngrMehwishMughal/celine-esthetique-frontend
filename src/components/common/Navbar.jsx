const Navbar = () => {
  return (
    <nav className="w-full h-96px bg-[#B76E79]">
      <div className="w-full h-full flex justify-between items-center 'px-4px' md:'px-12' lg:px-16">
        
        {/* Logo */}
        <h1 className="font-['Playfair_Display'] text-[30px] md:text-[36px] font-bold text-white">
          Celine Esthétique
        </h1>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 lg:gap-12 font-[Montserrat] text-[14px] font-medium text-white">
          <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">HOME</li>
          <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">SERVICE</li>
          <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">ABOUT</li>
          <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">GALLERY</li>
          <li className="hover:text-[#D4AF37] transition-colors cursor-pointer">CONTACT</li>
        </ul>

        {/* Button */}
        <button className="hidden md:block bg-[#D4AF37] text-[#1A1A1A] 'px-7' 'py-3' rounded-full font-['Montserrat'] text-[14px] font-semibold hover:bg-[#C5A028] transition-all duration-300">
          BOOK NOW
        </button>

      </div>
    </nav>
  );
};

export default Navbar;