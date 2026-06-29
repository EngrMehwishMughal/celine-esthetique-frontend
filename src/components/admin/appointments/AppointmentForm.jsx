import AdminButton from "@/components/admin/AdminButton";
import AdminInput from "@/components/admin/AdminInput";
import AdminSelect from "@/components/admin/AdminSelect";

const AppointmentForm = ({
  formData,
  editingId,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
    >
      <AdminInput
        name="customerName"
        placeholder="Customer Name"
        value={formData.customerName}
        onChange={onChange}
      />

      <AdminInput
        name="email"
        type="email"
        placeholder="Customer Email"
        value={formData.email}
        onChange={onChange}
      />

      <AdminInput
        name="service"
        placeholder="Service"
        value={formData.service}
        onChange={onChange}
      />

      <AdminInput
        name="staff"
        placeholder="Staff"
        value={formData.staff}
        onChange={onChange}
      />

      <AdminInput
        name="date"
        type="date"
        value={formData.date}
        onChange={onChange}
      />

      <AdminInput
        name="time"
        type="time"
        value={formData.time}
        onChange={onChange}
      />

      <AdminSelect name="status" value={formData.status} onChange={onChange}>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </AdminSelect>

      <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
        <AdminButton
          type="submit"
          text={editingId ? "Update Appointment" : "Add Appointment"}
          variant="primary"
        />

        {editingId && (
          <AdminButton text="Cancel" variant="secondary" onClick={onCancel} />
        )}
      </div>
    </form>
  );
};

export default AppointmentForm;