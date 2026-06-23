import { useEffect, useState } from "react";
import {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../services/firebase/appointmentService";

import { showSuccess, showError } from "../utils/toast";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import AdminInput from "../components/admin/AdminInput";
import AdminSelect from "../components/admin/AdminSelect";
import AdminTable from "../components/admin/AdminTable";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";
import StatusBadge from "../components/admin/StatusBadge";

const initialFormData = {
  customerName: "",
  email: "",
  service: "",
  date: "",
  time: "",
  staff: "",
  status: "pending",
};

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (
      !formData.customerName ||
      !formData.email ||
      !formData.service ||
      !formData.date ||
      !formData.time
    ) {
      showError("Please fill all required appointment fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateAppointment(editingId, formData);
        showSuccess("Appointment updated successfully.");
      } else {
        await addAppointment(formData);
        showSuccess("Appointment added successfully.");
      }

      await fetchAppointments();
      resetForm();
    } catch (error) {
      console.error("Error saving appointment:", error);
      showError("Failed to save appointment.");
    }
  };

  const handleEdit = (appointment) => {
    setEditingId(appointment.id);

    setFormData({
      customerName: appointment.customerName || "",
      email: appointment.email || "",
      service: appointment.service || "",
      date: appointment.date || "",
      time: appointment.time || "",
      staff: appointment.staff || "",
      status: appointment.status || "pending",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedAppointmentId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteAppointment(selectedAppointmentId);
      showSuccess("Appointment deleted successfully.");
      await fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showError("Failed to delete appointment.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedAppointmentId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading appointments..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Appointment Management"
        subtitle="Create, update, and manage client appointments."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
        />

        <AdminInput
          name="email"
          type="email"
          placeholder="Customer Email"
          value={formData.email}
          onChange={handleChange}
        />

        <AdminInput
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleChange}
        />

        <AdminInput
          name="staff"
          placeholder="Staff"
          value={formData.staff}
          onChange={handleChange}
        />

        <AdminInput
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
        />

        <AdminInput
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
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
            <AdminButton
              text="Cancel"
              variant="secondary"
              onClick={resetForm}
            />
          )}
        </div>
      </form>

      {appointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          message="No client appointments have been added yet."
        />
      ) : (
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

              <td className="py-4 text-greyText">
                {item.email}
              </td>

              <td className="py-4 text-greyText">
                {item.service}
              </td>

              <td className="py-4 text-greyText">
                {item.staff || "-"}
              </td>

              <td className="py-4 text-greyText">
                {item.date}
              </td>

              <td className="py-4 text-greyText">
                {item.time}
              </td>

              <td className="py-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(item)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(item.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Appointment"
        message="Are you sure you want to delete this appointment?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAppointments;