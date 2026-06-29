import AdminButton from "@/components/admin/AdminButton";
import AdminTable from "@/components/admin/AdminTable";
import StatusBadge from "@/components/admin/StatusBadge";

const AppointmentTable = ({ appointments, onEdit, onDelete }) => {
  return (
    <AdminTable
      headers={[
        "Customer",
        "Email",
        "Service",
        "Staff",
        "Date",
        "Time",
        "Status",
        "Actions",
      ]}
    >
      {appointments.map((item) => (
        <tr
          key={item.id}
          className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
        >
          <td className="py-4 font-medium text-darkText">
            {item.customerName}
          </td>

          <td className="py-4 text-greyText">{item.email}</td>

          <td className="py-4 text-greyText">{item.service}</td>

          <td className="py-4 text-greyText">{item.staff || "-"}</td>

          <td className="py-4 text-greyText">{item.date}</td>

          <td className="py-4 text-greyText">{item.time}</td>

          <td className="py-4">
            <StatusBadge status={item.status} />
          </td>

          <td className="flex flex-wrap gap-3 py-4">
            <AdminButton
              text="Edit"
              variant="secondary"
              onClick={() => onEdit(item)}
            />

            <AdminButton
              text="Delete"
              variant="danger"
              onClick={() => onDelete(item.id)}
            />
          </td>
        </tr>
      ))}
    </AdminTable>
  );
};

export default AppointmentTable;