import { useEffect, useState } from "react";
import {
  addAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} from "../services/firebase/availabilityService";

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
  day: "",
  startTime: "",
  endTime: "",
  status: "open",
  note: "",
};

const AdminAvailability = () => {
  const [availabilityList, setAvailabilityList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedAvailabilityId, setSelectedAvailabilityId] = useState(null);

  const fetchAvailability = async () => {
    try {
      setLoading(true);
      const data = await getAvailability();
      setAvailabilityList(data);
    } catch (error) {
      console.error("Error fetching availability:", error);
      showError("Failed to load availability settings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
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
    if (!formData.day || !formData.startTime || !formData.endTime) {
      showError("Please select day, start time, and end time.");
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      showError("End time must be greater than start time.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateAvailability(editingId, formData);
        showSuccess("Availability updated successfully.");
      } else {
        await addAvailability(formData);
        showSuccess("Availability added successfully.");
      }

      await fetchAvailability();
      resetForm();
    } catch (error) {
      console.error("Error saving availability:", error);
      showError("Failed to save availability.");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      day: item.day || "",
      startTime: item.startTime || "",
      endTime: item.endTime || "",
      status: item.status || "open",
      note: item.note || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedAvailabilityId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteAvailability(selectedAvailabilityId);
      showSuccess("Availability deleted successfully.");
      await fetchAvailability();
    } catch (error) {
      console.error("Error deleting availability:", error);
      showError("Failed to delete availability.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedAvailabilityId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading availability..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Availability Settings"
        subtitle="Set salon opening hours, breaks, holidays, and closed days."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
      >
        <AdminSelect
          name="day"
          value={formData.day}
          onChange={handleChange}
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </AdminSelect>

        <AdminInput
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
        />

        <AdminInput
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="break">Break</option>
          <option value="holiday">Holiday</option>
        </AdminSelect>

        <AdminInput
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
        />

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-5">
          <AdminButton
            type="submit"
            text={editingId ? "Update Availability" : "Add Availability"}
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

      {availabilityList.length === 0 ? (
        <EmptyState
          title="No Availability Found"
          message="You haven’t added any availability settings yet."
        />
      ) : (
        <AdminTable
          headers={["Day", "Start Time", "End Time", "Status", "Note", "Actions"]}
        >
          {availabilityList.map((item) => (
            <tr
              key={item.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {item.day}
              </td>

              <td className="py-4 text-greyText">
                {item.startTime}
              </td>

              <td className="py-4 text-greyText">
                {item.endTime}
              </td>

              <td className="py-4">
                <StatusBadge status={item.status} />
              </td>

              <td className="py-4 text-greyText">
                {item.note || "-"}
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
        title="Delete Availability"
        message="Are you sure you want to delete this availability setting?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAvailability;