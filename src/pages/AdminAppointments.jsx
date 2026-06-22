import { useEffect, useState } from "react";
import {
  addAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../services/firebase/appointmentService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

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
      alert("Please fill all required appointment fields.");
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
      } else {
        await addAppointment(formData);
      }

      resetForm();
      fetchAppointments();
    } catch (error) {
      console.error("Error saving appointment:", error);
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
      fetchAppointments();
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedAppointmentId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading appointments..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Appointment Management"
        subtitle="Create, update, and manage client appointments."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <input
          name="customerName"
          placeholder="Customer Name"
          value={formData.customerName}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="email"
          type="email"
          placeholder="Customer Email"
          value={formData.email}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="staff"
          placeholder="Staff"
          value={formData.staff}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="time"
          type="time"
          value={formData.time}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <div className="flex gap-3 lg:col-span-4">
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
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Customer</th>
                <th className="pb-4">Email</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Staff</th>
                <th className="pb-4">Date</th>
                <th className="pb-4">Time</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {item.customerName}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.email}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.service}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.staff || "-"}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.date}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.time}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {item.status}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="font-semibold text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(item.id)}
                      className="font-semibold text-[#800020]"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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