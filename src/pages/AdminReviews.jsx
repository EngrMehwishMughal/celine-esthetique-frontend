import { useEffect, useState } from "react";
import {
  addReview,
  getReviews,
  updateReview,
  deleteReview,
} from "../services/firebase/reviewService";

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
      showError("Failed to load reviews.");
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
      showError("Please fill client name, service, and review comment.");
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
        showSuccess("Review updated successfully.");
      } else {
        await addReview(formData);
        showSuccess("Review added successfully.");
      }

      await fetchReviews();
      resetForm();
    } catch (error) {
      console.error("Error saving review:", error);
      showError("Failed to save review.");
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
      showSuccess("Review deleted successfully.");
      await fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      showError("Failed to delete review.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedReviewId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading reviews..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Review Management"
        subtitle="Manage client feedback and review approval status."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="client"
          placeholder="Client Name"
          value={formData.client}
          onChange={handleChange}
        />

        <AdminInput
          name="service"
          placeholder="Service"
          value={formData.service}
          onChange={handleChange}
        />

        <AdminSelect
          name="rating"
          value={formData.rating}
          onChange={handleChange}
        >
          <option value="5">5 Stars</option>
          <option value="4">4 Stars</option>
          <option value="3">3 Stars</option>
          <option value="2">2 Stars</option>
          <option value="1">1 Star</option>
        </AdminSelect>

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </AdminSelect>

        <textarea
          name="comment"
          placeholder="Review Comment"
          value={formData.comment}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText outline-none transition-all duration-300 focus:border-primaryPink focus:ring-2 focus:ring-softPink md:col-span-2 lg:col-span-4"
        />

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
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
        <AdminTable
          headers={["Client", "Service", "Rating", "Comment", "Status", "Actions"]}
        >
          {reviews.map((review) => (
            <tr
              key={review.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {review.client}
              </td>

              <td className="py-4 text-greyText">
                {review.service}
              </td>

              <td className="py-4 font-semibold text-gold">
                {"★".repeat(Number(review.rating))}
              </td>

              <td className="max-w-[320px] py-4 text-greyText">
                {review.comment}
              </td>

              <td className="py-4">
                <StatusBadge status={review.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(review)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(review.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
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