import { NavLink } from "react-router-dom";

const sidebarLinks = [
  { name: "Dashboard", path: "/admin" },
  { name: "Appointments", path: "/admin/appointments" },
  { name: "Calendar", path: "/admin/calendar" },
  { name: "Services", path: "/admin/services" },
  { name: "Staff", path: "/admin/staff" },
  { name: "Users", path: "/admin/users" },
  { name: "Reviews", path: "/admin/reviews" },
  { name: "Blog", path: "/admin/blog" },
  { name: "Products", path: "/admin/products" },
  { name: "Gallery", path: "/admin/gallery" },
  { name: "Coupons", path: "/admin/coupons" },
  { name: "Reports", path: "/admin/reports" },
  { name: "Settings", path: "/admin/settings" },
];

const AdminSidebar = () => {
  return (
    <aside className="hidden min-h-screen w-[260px] shrink-0 bg-darkText p-6 text-white lg:block">
      <h2 className="mb-10 font-heading text-3xl font-semibold">
        Celine Admin
      </h2>

      <nav className="space-y-2 font-body text-sm">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/admin"}
            className={({ isActive }) =>
              `
              block rounded-full px-5 py-3 transition-all duration-300
              ${
                isActive
                  ? "bg-primaryPink text-white shadow-md"
                  : "text-white/75 hover:bg-softPink hover:text-primaryPink"
              }
              `
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;