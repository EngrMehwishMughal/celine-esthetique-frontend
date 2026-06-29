import { CalendarCheck, DollarSign, Users, UserRound, CalendarDays } from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatsCard from "@/components/admin/StatsCard";
import RecentAppointmentTable from "@/components/admin/RecentAppointmentTable";
import RevenueChart from "@/components/admin/RevenueChart";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import CalendarView from "@/components/admin/CalendarView";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#FFF8FA] lg:flex">
      <AdminSidebar />

      <main className="min-w-0 flex-1 bg-gradient-to-br from-[#FFFDFD] via-[#FFF8FA] to-[#FCE8EF]">
        <AdminTopbar />

        <div className="mx-auto w-full max-w-[1480px] px-3 py-4 sm:px-4 md:px-6 lg:px-8 xl:px-10">
          <AdminPageHeader
            title="Welcome back, Mehwish 👋"
            subtitle="Here’s what’s happening with your salon today."
            actions={
              <div className="flex w-full items-center gap-2 rounded-[14px] border border-[#F2DDE5] bg-white px-4 py-2.5 font-body text-xs font-semibold text-[#1A1A1A] shadow-[0_8px_24px_rgba(201,79,124,0.08)] sm:w-auto sm:text-sm">
                <CalendarDays size={17} className="shrink-0 text-[#C94F7C]" />
                <span className="truncate">Tuesday, 29 June 2025</span>
              </div>
            }
          />

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard
              title="Today’s Appointments"
              value="24"
              icon={<CalendarCheck size={22} />}
              trend="+12% from yesterday"
              variant="pink"
            />

            <StatsCard
              title="Revenue"
              value="$4,500"
              icon={<DollarSign size={22} />}
              trend="+18% from yesterday"
              variant="gold"
            />

            <StatsCard
              title="Clients"
              value="85"
              icon={<Users size={22} />}
              trend="+9% from last week"
              variant="pink"
            />

            <StatsCard
              title="Staff Members"
              value="6"
              icon={<UserRound size={22} />}
              trend="No change"
              variant="pink"
            />
          </section>
          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px] xl:items-stretch">
  <div className="min-w-0 xl:h-full">
    <RecentAppointmentTable />
  </div>

  <div className="min-w-0 xl:h-full">
    <RevenueChart />
  </div>
</section>

          <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <NotificationsPanel />
            <CalendarView />
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;