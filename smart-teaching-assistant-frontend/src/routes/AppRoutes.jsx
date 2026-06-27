import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard.jsx";
import Colleges from "../pages/superadmin/Colleges.jsx";
import AI_Monitoring from "../pages/superadmin/AI Monitoring.jsx";
import Analytics from "../pages/superadmin/Analytics.jsx";
import InviteCollege from "../pages/superadmin/InviteCollegeAdmin.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/superadmin/colleges" element={<Colleges />} />
      <Route path="/superadmin/ai-monitoring" element={<AI_Monitoring />} />
      <Route path="/superadmin/analytics" element={<Analytics />} />
      <Route path="/superadmin/invite-college" element={<InviteCollege />} />
    </Routes>
  );
}