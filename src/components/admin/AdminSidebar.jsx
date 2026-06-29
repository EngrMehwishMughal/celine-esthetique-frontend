import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  ClipboardList,
  Scissors,
  Users,
  Star,
  Newspaper,
  ShoppingBag,
  TicketPercent,
  BarChart3,
  Settings,
  CreditCard,
  Headphones,
} from "lucide-react";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Appointments", path: "/admin/appointments", icon: ClipboardList },
  { name: "Services", path: "/admin/services", icon: Scissors },
  { name: "Staff", path: "/admin/staff", icon: Users },
  { name: "Clients", path: "/admin/users", icon: Users },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Reviews", path: "/admin/reviews", icon: Star },
  { name: "Products", path: "/admin/products", icon: ShoppingBag },
  { name: "Coupons", path: "/admin/coupons", icon: TicketPercent },
  { name: "Blog", path: "/admin/blog", icon: Newspaper },
  { name: "Reports", path: "/admin/reports", icon: BarChart3 },
  { name: "Settings", path: "/admin/settings", icon: Settings },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden min-h-screen w-[250px] shrink-0 border-r border-[#F2E4E7] bg-[#FFFDFD] px-4 py-6 shadow-[8px_0_30px_rgba(26,26,26,0.04)] lg:flex lg:flex-col">
      {/* LOGO */}
      <div className="mb-8 px-4">
        <h2 className="font-heading text-4xl font-semibold italic text-[#C94F7C]">
          Celine
        </h2>
        <p className="mt-1 font-body text-[11px] uppercase tracking-[5px] text-darkText">
          Esthétique
        </p>
      </div>

      {/* NAV */}
      <nav className="flex-1 space-y-1.5 font-body text-sm">
        {sidebarLinks.map((link) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-[10px] px-4 py-3 font-medium transition-all duration-300
                ${
                  isActive
                    ? "bg-[#C94F7C] text-white shadow-[0_10px_24px_rgba(201,79,124,0.28)]"
                    : "text-[#2B2B2B] hover:bg-[#FFF1F5] hover:text-[#C94F7C]"
                }`
              }
            >
              <Icon size={18} />
              <span>{link.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* ADMIN PROFILE */}
      <div className="mt-6 rounded-[14px] border border-[#F2E4E7] bg-white p-3 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C94F7C] font-semibold text-white">
            M
          </div>

          <div>
            <p className="font-body text-sm font-semibold text-darkText">
              Mehwish Mughal
            </p>
            <p className="font-body text-xs text-greyText">Administrator</p>
          </div>
        </div>
      </div>

      {/* HELP CARD */}
      <div className="mt-5 rounded-[14px] border border-[#F2E4E7] bg-white p-4 shadow-sm">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF1F5] text-[#C94F7C]">
          <Headphones size={18} />
        </div>

        <p className="font-body text-sm font-semibold text-darkText">
          Need Help?
        </p>
        <p className="mt-1 font-body text-xs leading-5 text-greyText">
          Contact support for assistance.
        </p>

        <button className="mt-4 w-full rounded-[10px] bg-[#C94F7C] px-4 py-2.5 font-body text-xs font-semibold text-white transition hover:bg-[#B5446F]">
          Contact Support
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;