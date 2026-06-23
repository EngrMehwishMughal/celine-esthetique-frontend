import { useEffect, useState } from "react";
import {
  addStaff,
  getStaff,
  updateStaff,
  deleteStaff,
} from "../services/firebase/staffService";

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
      console.error(error);
      showError("Failed to load staff.");
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
      showError("Please fill all required fields.");
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
        showSuccess("Staff updated successfully.");
      } else {
        await addStaff(formData);
        showSuccess("Staff added successfully.");
      }

      resetForm();
      await fetchStaff();
    } catch (error) {
      console.error(error);
      showError("Failed to save staff.");
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
      showSuccess("Staff deleted successfully.");
      await fetchStaff();
    } catch (error) {
      console.error(error);
      showError("Failed to delete staff.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedStaffId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading staff..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Staff Management"
        subtitle="Manage salon team and specialists."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
      >
        <AdminInput
          name="name"
          placeholder="Staff Name"
          value={formData.name}
          onChange={handleChange}
        />

        <AdminInput
          name="role"
          placeholder="Role / Specialist"
          value={formData.role}
          onChange={handleChange}
        />

        <AdminInput
          name="services"
          placeholder="Services Offered"
          value={formData.services}
          onChange={handleChange}
        />

        <AdminInput
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
          <option value="inactive">Inactive</option>
        </AdminSelect>

        <div className="flex flex-wrap gap-3 lg:col-span-5">
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
        <AdminTable
          headers={[
            "Name",
            "Role",
            "Services",
            "Phone",
            "Status",
            "Actions",
          ]}
        >
          {staffList.map((staff) => (
            <tr
              key={staff.id}
              className="border-b border-softPink hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {staff.name}
              </td>

              <td className="py-4 text-greyText">
                {staff.role}
              </td>

              <td className="py-4 text-greyText">
                {staff.services}
              </td>

              <td className="py-4 text-greyText">
                {staff.phone || "-"}
              </td>

              <td className="py-4">
                <StatusBadge status={staff.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(staff)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(staff.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
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