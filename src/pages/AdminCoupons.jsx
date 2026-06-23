import { useEffect, useState } from "react";
import {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "../services/firebase/couponService";

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
  code: "",
  discount: "",
  expiry: "",
  status: "active",
};

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedCouponId, setSelectedCouponId] = useState(null);

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const data = await getCoupons();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      showError("Failed to load coupons.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const resetForm = () => {
    setFormData(initialFormData);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const validateForm = () => {
    if (!formData.code || !formData.discount || !formData.expiry) {
      showError("Please fill coupon code, discount, and expiry date.");
      return false;
    }

    if (Number(formData.discount) <= 0 || Number(formData.discount) > 100) {
      showError("Discount must be between 1 and 100.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateCoupon(editingId, formData);
        showSuccess("Coupon updated successfully.");
      } else {
        await addCoupon(formData);
        showSuccess("Coupon created successfully.");
      }

      await fetchCoupons();
      resetForm();
    } catch (error) {
      console.error("Error saving coupon:", error);
      showError("Failed to save coupon.");
    }
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon.id);

    setFormData({
      code: coupon.code || "",
      discount: coupon.discount || "",
      expiry: coupon.expiry || "",
      status: coupon.status || "active",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedCouponId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteCoupon(selectedCouponId);
      showSuccess("Coupon deleted successfully.");
      await fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
      showError("Failed to delete coupon.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedCouponId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading coupons..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Coupons & Promotions"
        subtitle="Manage discount codes and promotional campaigns."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
      >
        <h2 className="mb-6 font-heading text-2xl font-semibold text-darkText md:text-3xl">
          {editingId ? "Update Promotion" : "New Promotion"}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AdminInput
            name="code"
            type="text"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
          />

          <AdminInput
            name="discount"
            type="number"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleChange}
          />

          <AdminInput
            name="expiry"
            type="date"
            value={formData.expiry}
            onChange={handleChange}
          />

          <AdminSelect
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </AdminSelect>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <AdminButton
            type="submit"
            text={editingId ? "Update Coupon" : "Create Coupon"}
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

      {coupons.length === 0 ? (
        <EmptyState
          title="No Coupons Found"
          message="You haven’t created any discount coupons yet."
        />
      ) : (
        <AdminTable
          headers={["Code", "Discount", "Expiry Date", "Status", "Actions"]}
        >
          {coupons.map((coupon) => (
            <tr
              key={coupon.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {coupon.code}
              </td>

              <td className="py-4 font-semibold text-gold">
                {coupon.discount}%
              </td>

              <td className="py-4 text-greyText">
                {coupon.expiry}
              </td>

              <td className="py-4">
                <StatusBadge status={coupon.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(coupon)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(coupon.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminCoupons;