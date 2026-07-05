import { motion } from "framer-motion";
import { Building2, GraduationCap, FileBarChart2, BookOpen, UserPlus, BellRing, Settings, ShieldCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";
import Charts from "../../components/collegeadmin/Dashboard/Charts";

export default function DashBoard() {
  const navigate = useNavigate();
  const { stats, collegeProfile, notifications } = useCollegeAdmin();

  const statCards = [
    { title: "Departments", value: stats.totalDepartments, icon: Building2, color: "from-blue-500 to-blue-600", bg: "bg-blue-50 text-blue-600", path: "/collegeadmin/departments" },
    { title: "Professors", value: stats.totalProfessors, icon: GraduationCap, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 text-emerald-600", path: "/collegeadmin/professors" },
    { title: "Subjects", value: stats.totalSubjects, icon: BookOpen, color: "from-sky-500 to-sky-600", bg: "bg-sky-50 text-sky-600", path: "/collegeadmin/subjects" },
    { title: "Reports Generated", value: stats.reportsGenerated || 890, icon: FileBarChart2, color: "from-slate-500 to-slate-600", bg: "bg-slate-100 text-slate-700", path: "/collegeadmin/reports" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 pb-12">

      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white p-8 md:p-10 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-blue-100 text-sm font-semibold mb-4 backdrop-blur-md border border-white/10">
              <ShieldCheck size={14} />
              Enterprise Admin Portal
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2 tracking-tight">{collegeProfile.name} Overview</h1>
            <p className="text-blue-200 text-lg max-w-xl leading-relaxed">
              Academic Year 2026-2027 • Current Semester: Odd
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/collegeadmin/reports")} className="bg-white text-blue-900 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl">
              Generate Report
            </button>
            <button onClick={() => navigate("/collegeadmin/settings")} className="bg-blue-700/50 hover:bg-blue-600/50 text-white backdrop-blur-md border border-white/20 px-6 py-3 rounded-xl font-bold transition-all">
              Manage Settings
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            onClick={() => navigate(stat.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white dark:bg-slate-900 rounded-2xl p-5 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition-all group cursor-pointer"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${stat.bg} dark:bg-slate-800/50 transition-transform group-hover:scale-110`}>
              <stat.icon size={24} className="dark:text-blue-400" />
            </div>
            <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{stat.title}</p>
            <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white">{stat.value.toLocaleString()}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">College Analytics</h2>
            <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-0 cursor-pointer text-slate-600 dark:text-slate-300">
              <option>This Week</option>
              <option>This Month</option>
              <option>This Semester</option>
            </select>
          </div>
          <div className="flex-1 min-h-[300px]">
            <Charts />
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          {/* Recent Activities Widget */}
          <div className="bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800 rounded-3xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm relative overflow-hidden">
            <div className="absolute -right-4 -top-4 text-slate-200 dark:text-slate-700/30 pointer-events-none">
              <Activity size={100} />
            </div>
            <div className="relative z-10 w-full h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity size={18} className="text-emerald-600 dark:text-emerald-400" />
                  <h3 className="font-bold text-slate-800 dark:text-white">Recent Updates</h3>
                </div>
              </div>
              <div className="space-y-3 flex-1">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-slate-100 dark:border-slate-700">
                    <p className="text-sm text-slate-700 dark:text-slate-200 font-medium line-clamp-2">{notif.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="text-sm text-slate-500 text-center py-4">No recent updates.</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => navigate("/collegeadmin/departments")} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-700 dark:hover:text-blue-400 transition-colors text-slate-600 dark:text-slate-300 group">
                <Building2 size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">New Dept</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/professors")} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 group">
                <UserPlus size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Add Prof</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/notifications")} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 group">
                <BellRing size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Notify</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/settings")} className="flex flex-col items-center justify-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300 group">
                <Settings size={24} className="mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-semibold">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}