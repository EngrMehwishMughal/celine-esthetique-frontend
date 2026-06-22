import { useEffect, useState } from "react";
import {
  addCoupon,
  getCoupons,
  updateCoupon,
  deleteCoupon,
} from "../services/firebase/couponService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

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
      [name]: value.toUpperCase(),
    }));
  };

  const handleDiscountChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      discount: e.target.value,
    }));
  };

  const validateForm = () => {
    if (!formData.code || !formData.discount || !formData.expiry) {
      alert("Please fill coupon code, discount, and expiry date.");
      return false;
    }

    if (Number(formData.discount) <= 0 || Number(formData.discount) > 100) {
      alert("Discount must be between 1 and 100.");
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
      } else {
        await addCoupon(formData);
      }

      resetForm();
      fetchCoupons();
    } catch (error) {
      console.error("Error saving coupon:", error);
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
      fetchCoupons();
    } catch (error) {
      console.error("Error deleting coupon:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedCouponId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading coupons..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Coupons & Promotions"
        subtitle="Manage discount codes and promotional campaigns."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]"
      >
        <h2 className="mb-6 font-['Playfair_Display'] text-[28px]">
          {editingId ? "Update Promotion" : "New Promotion"}
        </h2>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <input
            name="code"
            type="text"
            placeholder="Coupon Code"
            value={formData.code}
            onChange={handleChange}
            className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
          />

          <input
            name="discount"
            type="number"
            placeholder="Discount %"
            value={formData.discount}
            onChange={handleDiscountChange}
            className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
          />

          <input
            name="expiry"
            type="date"
            value={formData.expiry}
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
            <option value="expired">Expired</option>
            <option value="disabled">Disabled</option>
          </select>
        </div>

        <div className="mt-5 flex gap-3">
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
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Code</th>
                <th className="pb-4">Discount</th>
                <th className="pb-4">Expiry Date</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {coupons.map((coupon) => (
                <tr key={coupon.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {coupon.code}
                  </td>

                  <td className="py-4 font-bold text-[#D4AF37]">
                    {coupon.discount}%
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {coupon.expiry}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {coupon.status}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleEdit(coupon)}
                      className="font-semibold text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(coupon.id)}
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
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminCoupons;