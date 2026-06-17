const Navbar = () => {
    return (
      <nav className="bg-pink-500 w-full h-[110px]">
        
        <div className="w-full h-full flex justify-between items-center px-20">
          
          {/* Logo */}
          <h1 className="text-white text-4xl font-bold">
            Celine Esthétique
          </h1>
  
          {/* Menu */}
          <ul className="hidden md:flex gap-12 text-white text-base font-medium">
            <li>HOME</li>
            <li>SERVICES</li>
            <li>ABOUT</li>
            <li>CONTACT</li>
          </ul>
  
          {/* Button */}
          <button className="bg-white text-pink-500 px-6 py-3 rounded-full text-sm font-semibold">
            BOOK NOW
          </button>
  
        </div>
      </nav>
    );
  };
  
  export default Navbar;