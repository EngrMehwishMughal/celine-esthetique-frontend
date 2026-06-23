import { useEffect, useState } from "react";
import {
  addGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
} from "../services/firebase/galleryService";

import { showSuccess, showError } from "../utils/toast";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import AdminInput from "../components/admin/AdminInput";
import AdminSelect from "../components/admin/AdminSelect";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";
import StatusBadge from "../components/admin/StatusBadge";

const initialFormData = {
  title: "",
  category: "",
  status: "published",
};

const AdminGallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
      showError("Failed to load gallery images.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setImageFile(null);
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
    if (!formData.title || !formData.category) {
      showError("Please fill title and category.");
      return false;
    }

    if (!editingId && !imageFile) {
      showError("Please upload an image.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setSaving(true);

      let imageData = {};

      if (imageFile) {
        imageData = await uploadGalleryImage(imageFile);
      }

      if (editingId) {
        await updateGalleryItem(editingId, {
          ...formData,
          ...imageData,
        });

        showSuccess("Gallery image updated successfully.");
      } else {
        await addGalleryItem({
          ...formData,
          ...imageData,
        });

        showSuccess("Gallery image uploaded successfully.");
      }

      await fetchGallery();
      resetForm();
    } catch (error) {
      console.error("Error saving gallery item:", error);
      showError("Failed to save gallery image.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);

    setFormData({
      title: item.title || "",
      category: item.category || "",
      status: item.status || "published",
    });

    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteGalleryItem(selectedItem.id, selectedItem.imagePath);
      showSuccess("Gallery image deleted successfully.");
      await fetchGallery();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      showError("Failed to delete gallery image.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  if (loading) {
    return <Loader text="Loading gallery..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Gallery Management"
        subtitle="Upload, update, and manage salon gallery images."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="title"
          placeholder="Image Title"
          value={formData.title}
          onChange={handleChange}
        />

        <AdminInput
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </AdminSelect>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText file:mr-4 file:rounded-full file:border-0 file:bg-primaryPink file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-pink-600"
        />

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
          <AdminButton
            type="submit"
            text={
              saving
                ? "Saving..."
                : editingId
                ? "Update Image"
                : "Upload Image"
            }
            variant="primary"
            disabled={saving}
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

      {galleryItems.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          message="You haven’t uploaded any gallery images yet."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[24px] border border-softPink bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(0,0,0,0.12)]"
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="h-[220px] w-full object-cover"
              />

              <div className="p-5">
                <h2 className="font-heading text-2xl font-semibold text-darkText">
                  {item.title}
                </h2>

                <p className="mt-2 font-body text-sm text-greyText">
                  {item.category}
                </p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                  <StatusBadge status={item.status} />

                  <div className="flex flex-wrap gap-3">
                    <AdminButton
                      text="Edit"
                      variant="secondary"
                      onClick={() => handleEdit(item)}
                    />

                    <AdminButton
                      text="Delete"
                      variant="danger"
                      onClick={() => openDeleteModal(item)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Gallery Image"
        message="Are you sure you want to delete this image?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminGallery;