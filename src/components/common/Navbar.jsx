import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "SERVICE", path: "/services" },
  { label: "ABOUT", path: "/about" },
  { label: "GALLERY", path: "/gallery" },
  { label: "CONTACT", path: "/contact" },
];

const linkClass = ({ isActive }) =>
  `transition-colors cursor-pointer ${
    isActive ? "text-[#D4AF37]" : "text-white hover:text-[#D4AF37]"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#B76E79] relative z-50">
      <div className="w-full px-4 md:px-12 lg:px-16 py-4 md:py-5 flex justify-between items-center gap-4">
        <NavLink to="/" className="min-w-0" onClick={() => setMenuOpen(false)}>
          <h1 className="font-['Playfair_Display'] text-[24px] sm:text-[30px] md:text-[36px] font-bold text-white truncate">
            Celine Esthétique
          </h1>
        </NavLink>

        <ul className="hidden md:flex gap-6 lg:gap-10 font-['Montserrat'] text-[13px] lg:text-[14px] font-medium">
          {navLinks.map(({ label, path }) => (
            <li key={path}>
              <NavLink to={path} className={linkClass}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="hidden md:block bg-[#D4AF37] text-[#1A1A1A] px-6 lg:px-7 py-2.5 lg:py-3 rounded-full font-['Montserrat'] text-[13px] lg:text-[14px] font-semibold hover:bg-[#C5A028] transition-all duration-300"
          >
            BOOK NOW
          </button>

          <button
            type="button"
            className="md:hidden text-white text-[22px] p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#A35F69] border-t border-white/15 px-4 py-4">
          <ul className="flex flex-col gap-4 font-['Montserrat'] text-[14px] font-medium">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  className={linkClass}
                  onClick={() => setMenuOpen(false)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 w-full bg-[#D4AF37] text-[#1A1A1A] py-3 rounded-full font-['Montserrat'] text-[14px] font-semibold"
          >
            BOOK NOW
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
