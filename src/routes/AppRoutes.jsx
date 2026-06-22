import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Services from "../pages/Services";
import About from "../pages/About";
import Contact from "../pages/Contact";
import AdminDashboard from "../pages/AdminDashboard";
import AdminServices from "../pages/AdminServices";
import AdminAppointments from "../pages/AdminAppointments";
import AdminStaff from "../pages/AdminStaff";
import AdminUsers from "../pages/AdminUsers";
import AdminReviews from "../pages/AdminReviews";
import AdminBlog from "../pages/AdminBlog";
import AdminGallery from "../pages/AdminGallery";
import AdminReports from "../pages/AdminReports";
import AdminAvailability from "../pages/AdminAvailability";
import AdminNotifications from "../pages/AdminNotifications";
import AdminSettings from "../pages/AdminSettings";
import AdminCoupons from "../pages/AdminCoupons";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import ForgotPassword from "../components/auth/ForgotPassword";
import AdminProtectedRoute from "../components/auth/AdminProtectedRoute";
import AdminCalendar from "../pages/AdminCalendar";
import AdminProducts from "../pages/AdminProducts";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/services" element={<Services />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route
  path="/admin/products"
  element={
    <AdminProtectedRoute>
      <AdminProducts />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/services" element={<AdminServices />} />
      <Route path="/admin/appointments" element={<AdminAppointments/>} />
      <Route
  path="/admin/staff"
  element={
    <AdminProtectedRoute>
      <AdminStaff />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/users" element={<AdminUsers />} />
      <Route
  path="/admin/reviews"
  element={
    <AdminProtectedRoute>
      <AdminReviews />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin/blog"
  element={
    <AdminProtectedRoute>
      <AdminBlog />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/gallery" element={<AdminGallery />} />
      <Route
  path="/admin/reports"
  element={
    <AdminProtectedRoute>
      <AdminReports />
    </AdminProtectedRoute>
  }
/>
      <Route
  path="/admin/availability"
  element={
    <AdminProtectedRoute>
      <AdminAvailability />
    </AdminProtectedRoute>
  }
/>
      <Route path="/admin/notifications" element={<AdminNotifications />} />
      <Route path="/admin/settings" element={<AdminSettings />} />
      <Route path="/admin/coupons" element={<AdminCoupons />} />
      <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route
  path="/admin/calendar"
  element={
    <AdminProtectedRoute>
      <AdminCalendar />
    </AdminProtectedRoute>
  }
/>
<Route
  path="/admin"
  element={
    <AdminProtectedRoute>
      <AdminDashboard />
    </AdminProtectedRoute>
  }
/>
    </Routes>
  );
};

export default AppRoutes;