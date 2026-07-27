import { Routes, Route, Navigate } from "react-router-dom";


import CollegeAdminLayout from "../components/collegeadmin/Layout/CollegeAdminLayout";
import Dashboard from "../pages/collegeadmin/Dashboard";
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


import { GenericPagePlaceholder } from "../components/professor/Layout/GenericPagePlaceholder";

import { useParams } from "react-router-dom";

const LegacyWorkspaceRedirect = () => {
  const { subjectId } = useParams();
  return <Navigate to={`/professor/workspace/${subjectId}/ch1`} replace />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* Fallback to professor */}
      <Route path="/" element={<Navigate to="/professor/dashboard" replace />} />

      {/* College Admin */}
      <Route path="/collegeadmin" element={<CollegeAdminLayout />}>
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
      <Route path="/professor" element={<ProfessorLayout />}>
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
      <Route path="*" element={<Navigate to="/professor/dashboard" replace />} />
    </Routes>
  );
}