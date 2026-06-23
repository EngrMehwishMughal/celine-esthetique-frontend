import AdminSidebar from "../components/admin/AdminSidebar";
import AdminTopbar from "../components/admin/AdminTopbar";
import StatsCard from "../components/admin/StatsCard";
import AppointmentTable from "../components/admin/AppointmentTable";
import RevenueChart from "../components/admin/RevenueChart";
import NotificationsPanel from "../components/admin/NotificationsPanel";
import CalendarView from "../components/admin/CalendarView";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-softPink">
      <AdminSidebar />

      <main className="min-w-0 flex-1">
        <AdminTopbar />

        <div className="w-full p-4 md:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="font-heading text-3xl font-semibold text-darkText md:text-4xl">
              Admin Dashboard
            </h1>

            <p className="mt-2 font-body text-sm text-greyText md:text-base">
              Overview of appointments, revenue, clients, and salon activity.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatsCard title="Today’s Appointments" value="24" />
            <StatsCard title="Revenue" value="$4,500" />
            <StatsCard title="Clients" value="85" />
            <StatsCard title="Staff Members" value="6" />
          </div>

          <AppointmentTable />

          <RevenueChart />

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
            <NotificationsPanel />
            <CalendarView />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;