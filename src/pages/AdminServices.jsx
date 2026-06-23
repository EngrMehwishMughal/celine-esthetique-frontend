import { useEffect, useState } from "react";
import {
  addService,
  getServices,
  updateService,
  deleteService,
} from "../services/firebase/serviceService";

import { showSuccess, showError } from "../utils/toast";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import AdminInput from "../components/admin/AdminInput";
import AdminTable from "../components/admin/AdminTable";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

const initialFormData = {
  name: "",
  category: "",
  duration: "",
  price: "",
};

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.error("Error fetching services:", error);
      showError("Failed to load services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
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
      !formData.name ||
      !formData.category ||
      !formData.duration ||
      !formData.price
    ) {
      showError("Please fill all service fields.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateService(editingId, formData);
        showSuccess("Service updated successfully.");
      } else {
        await addService(formData);
        showSuccess("Service added successfully.");
      }

      await fetchServices();
      resetForm();
    } catch (error) {
      console.error("Error saving service:", error);
      showError("Failed to save service.");
    }
  };

  const handleEdit = (service) => {
    setEditingId(service.id);

    setFormData({
      name: service.name || "",
      category: service.category || "",
      duration: service.duration || "",
      price: service.price || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedServiceId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteService(selectedServiceId);
      setDeleteModalOpen(false);
      showSuccess("Service deleted successfully.");
      await fetchServices();
    } catch (error) {
      console.error("Error deleting service:", error);
      showError("Failed to delete service.");
    } finally {
      setSelectedServiceId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading services..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Service Management"
        subtitle="Add, update, and delete Celine Esthétique services."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="name"
          placeholder="Service Name"
          value={formData.name}
          onChange={handleChange}
        />

        <AdminInput
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <AdminInput
          name="duration"
          placeholder="Duration"
          value={formData.duration}
          onChange={handleChange}
        />

        <AdminInput
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
          <AdminButton
            type="submit"
            text={editingId ? "Update Service" : "Add Service"}
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

      {services.length === 0 ? (
        <EmptyState
          title="No Services Found"
          message="You haven’t added any services yet."
        />
      ) : (
        <AdminTable
          headers={["Service", "Category", "Duration", "Price", "Actions"]}
        >
          {services.map((service) => (
            <tr
              key={service.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {service.name}
              </td>

              <td className="py-4 text-greyText">
                {service.category}
              </td>

              <td className="py-4 text-greyText">
                {service.duration}
              </td>

              <td className="py-4 font-semibold text-gold">
                {service.price}
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(service)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(service.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Service"
        message="Are you sure you want to delete this service?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminServices;