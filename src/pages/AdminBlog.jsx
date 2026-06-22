import { useEffect, useState } from "react";
import {
  addBlog,
  getBlogs,
  updateBlog,
  deleteBlog,
} from "../services/firebase/blogService";

import AdminPageHeader from "../components/admin/AdminPageHeader";
import AdminButton from "../components/admin/AdminButton";
import Loader from "../components/admin/Loader";
import EmptyState from "../components/admin/EmptyState";
import ConfirmDeleteModal from "../components/admin/ConfirmDeleteModal";

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
      alert("Please fill title, category, and content.");
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
      } else {
        await addBlog(formData);
      }

      resetForm();
      fetchBlogs();
    } catch (error) {
      console.error("Error saving blog:", error);
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
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setDeleteModalOpen(false);
      setSelectedBlogId(null);
    }
  };

  if (loading) {
    return <Loader text="Loading blogs..." />;
  }

  return (
    <div className="min-h-screen bg-[#F9E4E0] p-4 md:p-8">
      <AdminPageHeader
        title="Blog Management"
        subtitle="Create, update, publish, and manage blog posts."
      />

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 gap-4 rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)] md:grid-cols-2 lg:grid-cols-4"
      >
        <input
          name="title"
          placeholder="Blog Title"
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

        <input
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        />

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37]"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>

        <textarea
          name="content"
          placeholder="Blog Content"
          value={formData.content}
          onChange={handleChange}
          rows="4"
          className="rounded-[12px] border border-[#F9E4E0] px-4 py-3 outline-none focus:border-[#D4AF37] lg:col-span-4"
        />

        <div className="flex gap-3 lg:col-span-4">
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
        <div className="overflow-x-auto rounded-[20px] bg-white p-6 shadow-[0_8px_20px_rgba(0,0,0,0.08)]">
          <table className="w-full font-['Montserrat'] text-[14px]">
            <thead>
              <tr className="border-b text-left text-[#9CA3AF]">
                <th className="pb-4">Title</th>
                <th className="pb-4">Category</th>
                <th className="pb-4">Author</th>
                <th className="pb-4">Status</th>
                <th className="pb-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {blogs.map((blog) => (
                <tr key={blog.id} className="border-b last:border-none">
                  <td className="py-4 font-medium text-[#1A1A1A]">
                    {blog.title}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {blog.category}
                  </td>

                  <td className="py-4 text-[#9CA3AF]">
                    {blog.author || "Admin"}
                  </td>

                  <td className="py-4">
                    <span className="rounded-full bg-[#F9E4E0] px-4 py-2 text-[12px] capitalize text-[#B76E79]">
                      {blog.status}
                    </span>
                  </td>

                  <td className="flex gap-3 py-4">
                    <button
                      onClick={() => handleEdit(blog)}
                      className="font-semibold text-[#B76E79]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => openDeleteModal(blog.id)}
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
        title="Delete Blog"
        message="Are you sure you want to delete this blog post?"
        onCancel={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default AdminBlog;