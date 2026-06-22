import { useEffect, useState } from "react";
import {
  addAvailability,
  getAvailability,
  updateAvailability,
  deleteAvailability,
} from "../services/firebase/availabilityService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

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
      alert("Please select day, start time, and end time.");
      return false;
    }

    if (formData.startTime >= formData.endTime) {
      alert("End time must be greater than start time.");
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
      } else {
        await addAvailability(formData);
      }

      resetForm();
      fetchAvailability();
    } catch (error) {
      console.error("Error saving availability:", error);
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
      fetchAvailability();
    } catch (error) {
      console.error("Error deleting availability:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedAvailabilityId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading availability..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Availability Settings"
        subtitle="Set salon opening hours, breaks, holidays, and closed days."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
      >
        <select
          name="day"
          value={formData.day}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="">Select Day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>

        <input
          name="startTime"
          type="time"
          value={formData.startTime}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="endTime"
          type="time"
          value={formData.endTime}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
          <option value="break">Break</option>
          <option value="holiday">Holiday</option>
        </select>

        <input
          name="note"
          placeholder="Note"
          value={formData.note}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <div className="flex gap-3 lg:col-span-5">
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
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Day</th>
                <th className="pb-4">Start Time</th>
                <th className="pb-4">End Time</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Note</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {availabilityList.map((item) => (
                <tr key={item.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {item.day}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.startTime}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.endTime}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {item.status}
                    </span>
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {item.note || "-"}
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
        title="Delete Availability"
        message="Are you sure you want to delete this availability setting?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminAvailability;