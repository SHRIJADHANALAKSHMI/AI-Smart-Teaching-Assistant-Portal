import { Routes, Route, Navigate } from "react-router-dom";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Super Admin
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import Colleges from "../pages/superadmin/Colleges";
import AIMonitoring from "../pages/superadmin/AIMonitoring";
import Analytics from "../pages/superadmin/Analytics";
import InviteCollege from "../pages/superadmin/InviteCollegeAdmin";

// College Admin Layout
import CollegeAdminLayout from "../components/collegeadmin/Layout/CollegeAdminLayout";

// College Admin Pages
import Dashboard from "../pages/collegeadmin/DashBoard";
import Department from "../pages/collegeadmin/Department";
import Subjects from "../pages/collegeadmin/Subjects";
import Professor from "../pages/collegeadmin/Professor";
import Reports from "../pages/collegeadmin/Reports";
import CollegeProfile from "../pages/collegeadmin/CollegeProfile";
import Settings from "../pages/collegeadmin/Settings";
import Notifications from "../pages/collegeadmin/Notifications";
import CollegeAnalytics from "../pages/collegeadmin/AIAnalytics"; // We will rename this page later, using it for Analytics for now

export default function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Super Admin */}
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/superadmin/colleges" element={<Colleges />} />
      <Route path="/superadmin/ai-monitoring" element={<AIMonitoring />} />
      <Route path="/superadmin/analytics" element={<Analytics />} />
      <Route path="/superadmin/invite-college" element={<InviteCollege />} />

      {/* College Admin */}
      <Route path="/collegeadmin" element={<CollegeAdminLayout />}>
        {/* The index route for /collegeadmin */}
        <Route index element={<Dashboard />} />

        <Route path="departments" element={<Department />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="professors" element={<Professor />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<CollegeAnalytics />} />
        <Route path="profile" element={<CollegeProfile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="notifications" element={<Notifications />} />

        {/* Fallback for bad /collegeadmin routes */}
        <Route path="*" element={<Navigate to="/collegeadmin" replace />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}