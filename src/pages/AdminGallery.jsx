import { useEffect, useState } from "react";
import {
  addGalleryItem,
  getGalleryItems,
  updateGalleryItem,
  deleteGalleryItem,
  uploadGalleryImage,
} from "../services/firebase/galleryService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

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
  const [oldImagePath, setOldImagePath] = useState("");

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      setGalleryItems(data);
    } catch (error) {
      console.error("Error fetching gallery:", error);
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
    setOldImagePath("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) {
      alert("Please fill title and category.");
      return;
    }

    if (!editingId && !imageFile) {
      alert("Please upload an image.");
      return;
    }

    try {
      let imageData = {};

      if (imageFile) {
        imageData = await uploadGalleryImage(imageFile);
      }

      if (editingId) {
        await updateGalleryItem(editingId, {
          ...formData,
          ...imageData,
        });
      } else {
        await addGalleryItem({
          ...formData,
          ...imageData,
        });
      }

      resetForm();
      fetchGallery();
    } catch (error) {
      console.error("Error saving gallery item:", error);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setOldImagePath(item.imagePath || "");

    setFormData({
      title: item.title || "",
      category: item.category || "",
      status: item.status || "published",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (item) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteGalleryItem(selectedItem.id, selectedItem.imagePath);
      fetchGallery();
    } catch (error) {
      console.error("Error deleting gallery item:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedItem(null);
    }
  };

  if (loading) {
    return <Loader text="Loading gallery..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Gallery Management"
        subtitle="Upload, update, and manage salon gallery images."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <input
          name="title"
          placeholder="Image Title"
          value={formData.title}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <input
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3"
        />

        <div className="flex gap-3 lg:col-span-4">
          <AdminButton
            type="submit"
            text={editingId ? "Update Image" : "Upload Image"}
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

      {galleryItems.length === 0 ? (
        <EmptyState
          title="No Gallery Images"
          message="You haven’t uploaded any gallery images yet."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-[20px] bg-white shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
            >
              <img
                src={item.imageURL}
                alt={item.title}
                className="h-[220px] w-full object-cover"
              />

              <div className="p-5">
                <h2 className="font-['Playfair_Display'] text-[24px] text-[#1A1A1A]">
                  {item.title}
                </h2>

                <p className="mt-2 font-['Montserrat'] text-[14px] text-[#9CA3AF]">
                  {item.category}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="rounded-full bg-[#F9E4E0] px-4 py-2 font-['Montserrat'] text-[12px] capitalize text-[#B76E79]">
                    {item.status}
                  </span>

                  <div className="flex gap-3 font-['Montserrat'] text-[14px] font-semibold">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(item)}
                      className="text-[#800020]"
                    >
                      Delete
                    </button>
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