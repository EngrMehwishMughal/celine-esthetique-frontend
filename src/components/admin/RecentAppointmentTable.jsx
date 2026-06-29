import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const appointments = [
  {
    client: "Sophie Martin",
    service: "Manicure",
    date: "Today",
    time: "10:30 AM",
    status: "Confirmed",
  },
  {
    client: "Emma Laurent",
    service: "Eyelash Lift",
    date: "Today",
    time: "12:00 PM",
    status: "Pending",
  },
  {
    client: "Amina Khan",
    service: "Head Spa",
    date: "Tomorrow",
    time: "03:00 PM",
    status: "Confirmed",
  },
];

const RecentAppointmentTable = () => {
  return (
    <section className="flex h-full min-h-[340px] flex-col rounded-[26px] border border-[#F2DDE5] bg-white p-4 shadow-[0_14px_40px_rgba(26,26,26,0.06)] md:p-5">
      
      {/* HEADER */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-heading text-2xl font-semibold text-darkText md:text-3xl">
            Recent Appointments
          </h2>

          <p className="mt-1 font-body text-sm text-greyText">
            Latest client bookings and appointment status.
          </p>
        </div>

        <button className="w-full rounded-full bg-gold px-5 py-2.5 font-body text-sm font-semibold text-darkText transition hover:bg-[#C5A028] sm:w-auto">
          View All
        </button>
      </div>

      {/* TABLE */}
      <div className="flex-1 overflow-x-auto">
        <AdminTable
          headers={["Client", "Service", "Date", "Time", "Status"]}
        >
          {appointments.map((item, index) => (
            <tr
              key={index}
              className="transition-colors hover:bg-softPink/35"
            >
              <td className="whitespace-nowrap px-4 py-4 font-medium text-darkText">
                {item.client}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.service}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.date}
              </td>

              <td className="whitespace-nowrap px-4 py-4 text-greyText">
                {item.time}
              </td>

              <td className="whitespace-nowrap px-4 py-4">
                <StatusBadge status={item.status} />
              </td>
            </tr>
          ))}
        </AdminTable>
      </div>
    </section>
  );
};

export default RecentAppointmentTable;