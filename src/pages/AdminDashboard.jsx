import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import StatsCard from "../components/admin/StatsCard";
import AppointmentTable from "../components/admin/AppointmentTable";
import RevenueChart from "../components/admin/RevenueChart";
import NotificationsPanel from "../components/admin/NotificationsPanel";
import CalendarView from "../components/admin/CalendarView";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#F9E4E0] flex">
      <AdminSidebar />

      <main className="flex-1">
        <AdminTopbar />

        <div className="p-8 w-full">
          {/* STATS CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard title="Today’s Appointments" value="24" />
            <StatsCard title="Revenue" value="$4,500" />
            <StatsCard title="Clients" value="85" />
            <StatsCard title="Staff Members" value="6" />
          </div>

          {/* TABLE SHOULD BE OUTSIDE GRID */}
          <AppointmentTable />
          <RevenueChart />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  <NotificationsPanel />
  <CalendarView />
</div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;