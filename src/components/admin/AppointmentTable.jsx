import AdminTable from "./AdminTable";
import StatusBadge from "./StatusBadge";

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

const AppointmentTable = () => {
  return (
    <div className="mt-8">
      <h2 className="mb-5 font-heading text-2xl font-semibold text-darkText md:text-3xl">
        Recent Appointments
      </h2>

      <AdminTable headers={["Client", "Service", "Date", "Time", "Status"]}>
        {appointments.map((item, index) => (
          <tr
            key={index}
            className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
          >
            <td className="py-4 font-medium text-darkText">{item.client}</td>
            <td className="py-4 text-greyText">{item.service}</td>
            <td className="py-4 text-greyText">{item.date}</td>
            <td className="py-4 text-greyText">{item.time}</td>
            <td className="py-4">
              <StatusBadge status={item.status} />
            </td>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
};

export default AppointmentTable;