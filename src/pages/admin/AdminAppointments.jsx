// React
import { useState } from "react";

// Utils
import { showError } from "@/utils/toast";

// Hooks
import { useAppointments } from "@/hooks/useAppointments";

// Shared Admin Components
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import Loader from "@/components/admin/Loader";
import EmptyState from "@/components/admin/EmptyState";
import ConfirmDeleteModal from "@/components/admin/ConfirmDeleteModal";

// Feature Components
import AppointmentForm from "@/components/admin/appointments/AppointmentForm";
import AppointmentTable from "@/components/admin/appointments/AppointmentTable";
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
  const { appointments, loading, saveAppointment, removeAppointment } =
    useAppointments();

  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

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

    const isSaved = await saveAppointment(editingId, formData);

    if (isSaved) {
      resetForm();
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
    await removeAppointment(selectedAppointmentId);
    setDeleteModalOpen(false);
    setSelectedAppointmentId(null);
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

      <AppointmentForm
        formData={formData}
        editingId={editingId}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onCancel={resetForm}
      />

      {appointments.length === 0 ? (
        <EmptyState
          title="No Appointments Found"
          message="No client appointments have been added yet."
        />
      ) : (
        <AppointmentTable
          appointments={appointments}
          onEdit={handleEdit}
          onDelete={openDeleteModal}
        />
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