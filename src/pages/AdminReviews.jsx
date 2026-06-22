import { useEffect, useState } from "react";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../services/firebase/reviewService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

const initialFormData = {
  client: "",
  service: "",
  rating: "5",
  comment: "",
  status: "pending",
};

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
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
    if (!formData.client || !formData.service || !formData.comment) {
      alert("Please fill client name, service, and review comment.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateReview(editingId, formData);
      } else {
        await addReview(formData);
      }

      resetForm();
      fetchReviews();
    } catch (error) {
      console.error("Error saving review:", error);
    }
  };

  const handleEdit = (review) => {
    setEditingId(review.id);

    setFormData({
      client: review.client || "",
      service: review.service || "",
      rating: review.rating || "5",
      comment: review.comment || "",
      status: review.status || "pending",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedReviewId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteReview(selectedReviewId);
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedReviewId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading reviews..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Review Management"
        subtitle="Manage client feedback and review approval status."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-5"
      >
        <input
          name="client"
          placeholder="Client Name"
          value={formData.client}
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

        <select
          name="rating"
          value={formData.rating}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <textarea
          name="comment"
          placeholder="Review Comment"
          value={formData.comment}
          onChange={handleChange}
          rows="3"
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37] lg:col-span-5"
        />

        <div className="flex gap-3 lg:col-span-5">
          <AdminButton
            type="submit"
            text={editingId ? "Update Review" : "Add Review"}
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

      {reviews.length === 0 ? (
        <EmptyState
          title="No Reviews Found"
          message="No client reviews have been added yet."
        />
      ) : (
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Client</th>
                <th className="pb-4">Service</th>
                <th className="pb-4">Rating</th>
                <th className="pb-4">Comment</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review) => (
                <tr key={review.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {review.client}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {review.service}
                  </td>

                  <td className="py-4 font-bold text-[#D4AF37]">
                    {"★".repeat(Number(review.rating))}
                  </td>

                  <td className="max-w-[320px] py-4 text-[#9CA3AF]">
                    {review.comment}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {review.status}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleEdit(review)}
                      className="font-semibold text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(review.id)}
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
        title="Delete Review"
        message="Are you sure you want to delete this review?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminReviews;