import { useEffect, useState } from "react";
import {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} from "../services/firebase/productService";

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
  category: "",
  price: "",
  oldPrice: "",
  stock: "",
  imageURL: "",
  status: "available",
};

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      showError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
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
    if (!formData.name || !formData.category || !formData.price) {
      showError("Please fill product name, category, and price.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateProduct(editingId, formData);
        showSuccess("Product updated successfully.");
      } else {
        await addProduct(formData);
        showSuccess("Product added successfully.");
      }

      await fetchProducts();
      resetForm();
    } catch (error) {
      console.error("Error saving product:", error);
      showError("Failed to save product.");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product.id);

    setFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      oldPrice: product.oldPrice || "",
      stock: product.stock || "",
      imageURL: product.imageURL || "",
      status: product.status || "available",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedProductId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteProduct(selectedProductId);
      showSuccess("Product deleted successfully.");
      await fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      showError("Failed to delete product.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedProductId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading products..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Product Management"
        subtitle="Add, update, and manage shop products."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="name"
          placeholder="Product Name"
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
          name="price"
          placeholder="Current Price"
          value={formData.price}
          onChange={handleChange}
        />

        <AdminInput
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleChange}
        />

        <AdminInput
          name="stock"
          placeholder="Stock Quantity"
          value={formData.stock}
          onChange={handleChange}
        />

        <AdminInput
          name="imageURL"
          placeholder="Image URL"
          value={formData.imageURL}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="available">Available</option>
          <option value="out of stock">Out of Stock</option>
          <option value="draft">Draft</option>
        </AdminSelect>

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
          <AdminButton
            type="submit"
            text={editingId ? "Update Product" : "Add Product"}
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

      {products.length === 0 ? (
        <EmptyState
          title="No Products Found"
          message="You haven’t added any shop products yet."
        />
      ) : (
        <AdminTable
          headers={[
            "Image",
            "Product",
            "Category",
            "Price",
            "Stock",
            "Status",
            "Actions",
          ]}
        >
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4">
                {product.imageURL ? (
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="h-14 w-14 rounded-[14px] object-cover"
                  />
                ) : (
                  <div className="h-14 w-14 rounded-[14px] bg-softPink" />
                )}
              </td>

              <td className="py-4 font-medium text-darkText">
                {product.name}
              </td>

              <td className="py-4 text-greyText">
                {product.category}
              </td>

              <td className="py-4">
                <span className="font-semibold text-gold">
                  {product.price}
                </span>

                {product.oldPrice && (
                  <span className="ml-2 text-sm text-greyText line-through">
                    {product.oldPrice}
                  </span>
                )}
              </td>

              <td className="py-4 text-greyText">
                {product.stock || "0"}
              </td>

              <td className="py-4">
                <StatusBadge status={product.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(product)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(product.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminProducts;