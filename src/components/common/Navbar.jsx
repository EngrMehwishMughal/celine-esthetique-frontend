import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "HOME", path: "/" },
  { label: "SERVICE", path: "/services" },
  { label: "ABOUT", path: "/about" },
  { label: "CONTACT", path: "/contact" },
];

const linkClass = ({ isActive }) =>
  `text-[12px] lg:text-[13px] font-medium tracking-[0.08em] uppercase transition-colors ${
    isActive ? "text-white/90 underline underline-offset-4" : "text-white hover:text-white/80"
  }`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-[#E1709A] relative z-50">
      <div className="w-full max-w-[1440px] mx-auto pl-8 sm:pl-10 md:pl-12 lg:pl-14 xl:pl-16 pr-5 sm:pr-6 md:pr-8 lg:pr-10 xl:pr-12 py-3 md:py-4 flex justify-between items-center gap-4">
        <NavLink
          to="/"
          className="flex items-center gap-2 sm:gap-2.5 shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-full border border-white/50 items-center justify-center shrink-0">
            <svg
              viewBox="0 0 40 40"
              fill="none"
              className="w-7 h-7 text-white"
              aria-hidden="true"
            >
              <circle cx="20" cy="14" r="7" stroke="currentColor" strokeWidth="1.2" />
              <path
                d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12"
                stroke="currentColor"
                strokeWidth="1.2"
              />
              <path
                d="M28 22c3 2 5 5 6 9"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block font-[Great_Vibes] text-[20px] sm:text-[24px] md:text-[28px] text-white whitespace-nowrap">
              Celine Ongles
            </span>
            <span className="block font-[Great_Vibes] text-[16px] sm:text-[18px] md:text-[20px] text-white/95 -mt-1 whitespace-nowrap">
              & Esthetique
            </span>
          </div>
        </NavLink>

        <div className="hidden lg:flex items-center gap-8 xl:gap-10 ml-auto shrink-0">
          <ul className="flex items-center gap-7 xl:gap-9">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink to={path} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 xl:gap-4">
            <button
              type="button"
              className="w-10 h-10 rounded-full border border-white flex items-center justify-center text-white hover:bg-white/10 transition-colors shrink-0"
              aria-label="Shopping cart"
            >
              <FaShoppingCart className="text-[14px]" />
            </button>

            <Link
              to="/booking"
              className="inline-flex items-center justify-center h-[40px] min-w-[168px] xl:min-w-[180px] px-6 xl:px-8 bg-white text-[#E1709A] rounded-[8px] text-[11px] xl:text-[12px] font-bold tracking-[0.07em] uppercase hover:bg-white/90 transition-colors whitespace-nowrap"
            >
              Online Booking
            </Link>
          </div>
        </div>

        <button
          type="button"
          className="lg:hidden text-white text-[22px] p-1 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#E1709A] border-t border-white/20 pl-8 sm:pl-10 md:pl-12 pr-5 sm:pr-6 md:pr-8 py-5">
          <ul className="flex flex-col gap-4">
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
          <div className="mt-5 flex flex-col gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 w-full border border-white/50 text-white py-2.5 rounded-full text-[12px] font-medium tracking-wide uppercase"
            >
              <FaShoppingCart className="text-[13px]" />
              Cart
            </button>
            <Link
              to="/booking"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center w-full bg-white text-[#E1709A] py-2.5 rounded-[8px] text-[12px] font-bold tracking-[0.07em] uppercase"
            >
              Online Booking
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
