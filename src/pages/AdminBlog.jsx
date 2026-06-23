import { useEffect, useState } from "react";
import {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../services/firebase/blogService";

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
  title: "",
  category: "",
  author: "Admin",
  status: "draft",
  content: "",
};

const AdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialFormData);

  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      showError("Failed to load blogs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
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
    if (!formData.title || !formData.category || !formData.content) {
      showError("Please fill title, category, and content.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (editingId) {
        await updateBlog(editingId, formData);
        showSuccess("Blog updated successfully.");
      } else {
        await addBlog(formData);
        showSuccess("Blog added successfully.");
      }

      await fetchBlogs();
      resetForm();
    } catch (error) {
      console.error("Error saving blog:", error);
      showError("Failed to save blog.");
    }
  };

  const handleEdit = (blog) => {
    setEditingId(blog.id);

    setFormData({
      title: blog.title || "",
      category: blog.category || "",
      author: blog.author || "Admin",
      status: blog.status || "draft",
      content: blog.content || "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openDeleteModal = (id) => {
    setSelectedBlogId(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await deleteBlog(selectedBlogId);
      showSuccess("Blog deleted successfully.");
      await fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      showError("Failed to delete blog.");
    } finally {
      setDeleteModalOpen(false);
      setSelectedBlogId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading blogs..." />;
  }

  return (
    <div className="min-h-screen bg-softPink p-4 md:p-6 lg:p-8">
      <AdminPageHeader
        title="Blog Management"
        subtitle="Create, update, publish, and manage blog posts."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[24px] border border-softPink bg-white p-5 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <AdminInput
          name="title"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
        />

        <AdminInput
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <AdminInput
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
        />

        <AdminSelect
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </AdminSelect>

        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          className="w-full rounded-[14px] border border-softPink bg-white px-4 py-3 font-body text-darkText outline-none transition-all duration-300 focus:border-primaryPink focus:ring-2 focus:ring-softPink md:col-span-2 lg:col-span-4"
        />

        <div className="flex flex-wrap gap-3 md:col-span-2 lg:col-span-4">
          <AdminButton
            type="submit"
            text={editingId ? "Update Blog" : "Add Blog"}
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

      {blogs.length === 0 ? (
        <EmptyState
          title="No Blogs Found"
          message="You haven’t added any blog posts yet."
        />
      ) : (
        <AdminTable
          headers={["Title", "Category", "Author", "Status", "Actions"]}
        >
          {blogs.map((blog) => (
            <tr
              key={blog.id}
              className="border-b border-softPink transition-colors hover:bg-softPink/30 last:border-none"
            >
              <td className="py-4 font-medium text-darkText">
                {blog.title}
              </td>

              <td className="py-4 text-greyText">
                {blog.category}
              </td>

              <td className="py-4 text-greyText">
                {blog.author || "Admin"}
              </td>

              <td className="py-4">
                <StatusBadge status={blog.status} />
              </td>

              <td className="flex flex-wrap gap-3 py-4">
                <AdminButton
                  text="Edit"
                  variant="secondary"
                  onClick={() => handleEdit(blog)}
                />

                <AdminButton
                  text="Delete"
                  variant="danger"
                  onClick={() => openDeleteModal(blog.id)}
                />
              </td>
            </tr>
          ))}
        </AdminTable>
      )}

      <ConfirmDeleteModal
        isOpen={deleteModalOpen}
        title="Delete Blog"
        message="Are you sure you want to delete this blog post?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminBlog;