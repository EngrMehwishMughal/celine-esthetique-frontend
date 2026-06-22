import { useEffect, useState } from "react";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../services/firebase/staffService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

const initialFormData = {
  name: "",
  role: "",
  services: "",
  phone: "",
  status: "active",
};

const AdminStaff = () => {
  const [staffList, setStaffList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState(null);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await getStaff();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
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
    if (!formData.name || !formData.role || !formData.services) {
      alert("Please fill all required fields.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateStaff(editingId, formData);
      } else {
        await addStaff(formData);
      }

      resetForm();
      fetchStaff();
    } catch (error) {
      console.error("Error saving staff:", error);
    }
  };

  const handleEdit = (staff) => {
    setEditingId(staff.id);

    setFormData({
      name: staff.name || "",
      role: staff.role || "",
      services: staff.services || "",
      phone: staff.phone || "",
      status: staff.status || "active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedStaffId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteStaff(selectedStaffId);
      fetchStaff();
    } catch (error) {
      console.error("Error deleting staff:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedStaffId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading staff..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Staff Management"
        subtitle="Manage salon team and specialists."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
      >
        <input
          name="name"
          placeholder="Staff Name"
          value={formData.name}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="role"
          placeholder="Role / Specialist"
          value={formData.role}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="services"
          placeholder="Services Offered"
          value={formData.services}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="active">Active</option>
          <option value="on leave">On Leave</option>
          <option value="inactive">Inactive</option>
        </select>

        <div className="flex gap-3 lg:col-span-5">
          <AdminButton
            type="submit"
            text={editingId ? "Update Staff" : "Add Staff"}
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

      {staffList.length === 0 ? (
        <EmptyState
          title="No Staff Found"
          message="You haven’t added any staff members yet."
        />
      ) : (
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Name</th>
                <th className="pb-4">Role</th>
                <th className="pb-4">Services</th>
                <th className="pb-4">Phone</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {staffList.map((staff) => (
                <tr key={staff.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {staff.name}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {staff.role}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {staff.services}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {staff.phone || "-"}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {staff.status}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleEdit(staff)}
                      className="font-semibold text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(staff.id)}
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
        title="Delete Staff Member"
        message="Are you sure you want to delete this staff member?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminStaff;