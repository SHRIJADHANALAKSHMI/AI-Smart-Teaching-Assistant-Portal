import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";

import SuperAdminLayout from "../layouts/SuperAdminLayout";
import SuperAdminColleges from "../pages/superadmin/Colleges";
import SuperAdminAnalytics from "../pages/superadmin/Analytics";
import SuperAdminAIMonitoring from "../pages/superadmin/AIMonitoring";
import SuperAdminInviteCollege from "../pages/superadmin/InviteCollegeAdmin";
import SuperAdminSettings from "../pages/superadmin/Settings";
import SuperAdminReports from "../pages/superadmin/Reports";
import SuperAdminAccounts from "../pages/superadmin/AdminManagement";

import CollegeAdminLayout from "../components/collegeadmin/Layout/CollegeAdminLayout";
import Dashboard from "../pages/collegeadmin/DashBoard";
import Department from "../pages/collegeadmin/Department";
import Subjects from "../pages/collegeadmin/Subjects";
import Professor from "../pages/collegeadmin/Professor";
import Reports from "../pages/collegeadmin/Reports";
import CollegeProfile from "../pages/collegeadmin/CollegeProfile";
import CollegeSettings from "../pages/collegeadmin/Settings";
import Notifications from "../pages/collegeadmin/Notifications";
import CollegeAnalytics from "../pages/collegeadmin/AIAnalytics";
import ProfessorLayout from "../components/professor/Layout/ProfessorLayout";
import ProfessorDashboard from "../pages/professor/ProfessorDashboard";
import MySubjects from "../pages/professor/MySubjects";
import ChapterWorkspace from "../pages/professor/ChapterWorkspace";
import UploadMaterial from "../pages/professor/UploadMaterial";
import Assessments from "../pages/professor/Assessments";
import ProfessorProfile from "../pages/professor/Profile";
import AINotesGenerator from "../pages/professor/AINotesGenerator";
import AIResult from "../pages/professor/AIResult";
import AIProcessing from "../pages/professor/AIProcessing";
import AIHistory from "../pages/professor/AIHistory";
import Analytics from "../pages/professor/Analytics";
import Settings from "../pages/professor/Settings";



// Placeholder specifically for new routes we added to sidebar
import { GenericPagePlaceholder } from "../components/professor/Layout/GenericPagePlaceholder";

import { useParams } from "react-router-dom";

const LegacyWorkspaceRedirect = () => {
  const { subjectId } = useParams();
  return <Navigate to={`/professor/workspace/${subjectId}/ch1`} replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Preserve old alias for login just in case */}
      <Route path="/super-admin/dashboard" element={<Navigate to="/superadmin/dashboard" replace />} />
      <Route path="/college-admin/dashboard" element={<Navigate to="/collegeadmin" replace />} />

      {/* Super Admin */}
      <Route path="/superadmin" element={
        <ProtectedRoute allowedRoles={['SUPER_ADMIN']}>
          <SuperAdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<SuperAdminDashboard />} />
        <Route path="colleges" element={<SuperAdminColleges />} />
        <Route path="analytics" element={<SuperAdminAnalytics />} />
        <Route path="ai-monitoring" element={<SuperAdminAIMonitoring />} />
        <Route path="invite-college" element={<SuperAdminInviteCollege />} />
        <Route path="settings" element={<SuperAdminSettings />} />
        <Route path="reports" element={<SuperAdminReports />} />
        <Route path="admins" element={<SuperAdminAccounts />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>

      {/* College Admin */}
      <Route path="/collegeadmin" element={
        <ProtectedRoute allowedRoles={['COLLEGE_ADMIN', 'SUPER_ADMIN']}>
          <CollegeAdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Dashboard />} />
        <Route path="departments" element={<Department />} />
        <Route path="subjects" element={<Subjects />} />
        <Route path="professors" element={<Professor />} />
        <Route path="reports" element={<Reports />} />
        <Route path="analytics" element={<CollegeAnalytics />} />
        <Route path="profile" element={<CollegeProfile />} />
        <Route path="settings" element={<CollegeSettings />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="*" element={<Navigate to="/collegeadmin" replace />} />
      </Route>

      {/* Professor Portal */}
      <Route path="/professor" element={
        <ProtectedRoute allowedRoles={['PROFESSOR', 'SUPER_ADMIN']}>
          <ProfessorLayout />
        </ProtectedRoute>
      }>
        {/* We redirect base /professor to dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<ProfessorDashboard />} />

        <Route path="subjects" element={<MySubjects />} />
        <Route path="workspace/:subjectId/process" element={<AIProcessing />} />
        <Route path="workspace/:subjectId/:chapterId" element={<ChapterWorkspace />} />
        {/* Fallback old workspace route if needed */}
        <Route path="subjects/:subjectId" element={<LegacyWorkspaceRedirect />} />

        <Route path="upload" element={<UploadMaterial />} />

        {/* Sidebar specific routes */}
        <Route path="ai-history" element={<AIHistory />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />

        {/* Pre-existing routes mapped */}
        <Route path="assessments" element={<Assessments />} />
        <Route path="profile" element={<ProfessorProfile />} />
        <Route path="ai-notes" element={<AINotesGenerator />} />
        <Route path="ai-result" element={<AIResult />} />

        {/* Fallback for bad /professor routes */}
        <Route path="*" element={<Navigate to="/professor/dashboard" replace />} />
      </Route>

      {/* Global Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
