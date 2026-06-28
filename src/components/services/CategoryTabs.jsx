/**
 * Category tabs — filter buttons on the Services page.
 * Sticks to the top while scrolling so users can switch categories easily.
 */
// Grid icon used on the "All Services" tab
import { FaThLarge } from "react-icons/fa";

// Sticky row of category filter buttons
const CategoryTabs = ({ categories, active, onChange }) => {
  // "All Services" tab plus one tab per category from the catalog
  const tabs = [
    { id: "all", name: "All Services", icon: FaThLarge, accent: "#E1709A" },
    ...categories,
  ];

  return (
    <div className="sticky top-0 z-30 -mx-5 mb-10 border-b border-[#F0F0F0] bg-white/85 px-5 py-4 backdrop-blur-md sm:-mx-8 sm:px-8 sm:py-5 md:mb-12">
      {/* Sticky bar that stays visible while scrolling the service list */}
      {/* Scrollable row of tab buttons on mobile, wrapped on larger screens */}
      <div
        className="flex gap-2.5 overflow-x-auto sm:flex-wrap sm:justify-center"
        style={{ scrollbarWidth: "none" }}
      >
        {tabs.map((tab) => {
          // Icon component for this tab
          const Icon = tab.icon;
          // Whether this tab matches the current filter
          const isActive = active === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 font-[Montserrat] text-[11px] font-bold uppercase tracking-[0.06em] transition-all sm:px-5 ${
                isActive
                  ? "border-transparent bg-[#E1709A] text-white shadow-[0_4px_14px_rgba(225,112,154,0.35)]"
                  : "border-[#ECECEC] bg-white text-[#666666] hover:border-[#E1709A]/40 hover:bg-[#FFF5F8] hover:text-[#E1709A]"
              }`}
            >
              <Icon className="text-[12px]" />
              {tab.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Export for use on the Services page
export default CategoryTabs;
