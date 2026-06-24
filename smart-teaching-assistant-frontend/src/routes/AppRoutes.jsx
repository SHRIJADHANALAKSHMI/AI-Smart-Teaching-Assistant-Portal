import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard.jsx";
import Colleges from "../pages/superadmin/Colleges.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/superadmin" element={<SuperAdminDashboard />} />
      <Route path="/superadmin/colleges" element={<Colleges />} />
    </Routes>
  );
}