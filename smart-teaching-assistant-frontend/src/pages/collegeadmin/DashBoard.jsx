import { motion } from "framer-motion";
import { Building2, GraduationCap, FileBarChart2, BookOpen, UserPlus, BellRing, Settings, ShieldCheck, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";
import Charts from "../../components/collegeadmin/Dashboard/Charts";

export default function DashBoard() {
  const navigate = useNavigate();
  const { stats, collegeProfile, notifications } = useCollegeAdmin();

  // Premium accent combinations for cards
  const statCards = [
    { title: "Departments", value: stats.totalDepartments, icon: Building2, gradient: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50", text: "text-emerald-700", path: "/collegeadmin/departments" },
    { title: "Professors", value: stats.totalProfessors, icon: GraduationCap, gradient: "from-purple-500 to-purple-600", bg: "bg-purple-50", text: "text-purple-700", path: "/collegeadmin/professors" },
    { title: "Subjects", value: stats.totalSubjects, icon: BookOpen, gradient: "from-orange-500 to-orange-600", bg: "bg-orange-50", text: "text-orange-700", path: "/collegeadmin/subjects" },
    { title: "Reports Generated", value: stats.reportsGenerated || 890, icon: FileBarChart2, gradient: "from-rose-500 to-rose-600", bg: "bg-rose-50", text: "text-rose-700", path: "/collegeadmin/reports" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="space-y-6 pb-12 w-full">

      {/* Welcome Hero Banner */}
      <div className="relative overflow-hidden rounded-[24px] bg-white border border-[#E5E7EB] p-8 md:p-10 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md duration-300">
        <div className="absolute top-[-50%] right-[10%] w-96 h-96 bg-emerald-100/50 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[10%] w-80 h-80 bg-orange-100/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full text-slate-600 text-sm font-semibold mb-5 border border-slate-200">
              <ShieldCheck size={16} className="text-emerald-600" />
              Enterprise Admin Portal
            </div>
            <h1 className="text-3xl md:text-[40px] font-extrabold mb-3 tracking-tight text-slate-900 leading-tight">ABC College Overview</h1>
            <p className="text-slate-500 text-lg max-w-xl font-medium">
              Academic Year 2026-2027 • <span className="text-emerald-600 font-semibold px-2 py-0.5 bg-emerald-50 rounded-md">Current Semester: Odd</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate("/collegeadmin/settings")} className="bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-6 py-3.5 rounded-[16px] font-bold transition-all shadow-sm">
              Manage Settings
            </button>
            <button onClick={() => navigate("/collegeadmin/reports")} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-6 py-3.5 rounded-[16px] font-bold transition-all shadow-sm hover:shadow-md">
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => (
          <motion.div
            key={stat.title}
            onClick={() => navigate(stat.path)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-[24px] p-7 shadow-sm border border-[#E5E7EB] hover:-translate-y-1 hover:shadow-md hover:border-slate-300 transition-all group cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-[16px] flex items-center justify-center mb-6 bg-gradient-to-br ${stat.gradient} text-white shadow-sm transition-transform duration-300 group-hover:scale-[1.15]`}>
              <stat.icon size={26} strokeWidth={2.5} />
            </div>
            <p className="text-slate-500 text-[13px] font-bold uppercase tracking-widest mb-2">{stat.title}</p>
            <h3 className="text-4xl font-extrabold text-slate-900 tracking-tight">{stat.value.toLocaleString()}</h3>
          </motion.div>
        ))}
      </div>

      {/* Main Grid Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Charts Section */}
        <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">College Analytics</h2>
            <select className="bg-slate-50 border border-slate-200 text-sm font-semibold rounded-[12px] px-4 py-2 focus:ring-2 focus:ring-emerald-500/20 cursor-pointer text-slate-600 outline-none transition-all hover:bg-slate-100">
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
          <div className="bg-white rounded-[24px] p-7 border border-[#E5E7EB] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="absolute -right-10 -top-10 text-slate-50 opacity-50 pointer-events-none transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110">
              <Activity size={180} />
            </div>
            <div className="relative z-10 w-full h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-50 rounded-[10px]">
                    <Activity size={20} className="text-emerald-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-lg">Recent Updates</h3>
                </div>
              </div>
              <div className="space-y-4 flex-1">
                {notifications.slice(0, 3).map((notif) => (
                  <div key={notif.id} className="bg-[#F8FAFC] rounded-[16px] p-4 border border-slate-100 hover:border-slate-200 transition-colors">
                    <p className="text-[14px] text-slate-800 font-semibold line-clamp-2 leading-snug">{notif.title}</p>
                    <p className="text-[12px] font-medium text-slate-400 mt-2">{notif.time}</p>
                  </div>
                ))}
              </div>
              {notifications.length === 0 && (
                <div className="text-sm font-medium text-slate-400 text-center py-6">No recent updates.</div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-[24px] p-7 shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
            <h3 className="font-bold text-slate-900 text-lg mb-6 tracking-tight">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              <button onClick={() => navigate("/collegeadmin/departments")} className="flex flex-col items-center justify-center p-5 rounded-[20px] bg-emerald-50/50 hover:bg-emerald-50 border border-transparent hover:border-emerald-100 transition-colors text-slate-600 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Building2 size={24} className="text-emerald-600" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">New Dept</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/professors")} className="flex flex-col items-center justify-center p-5 rounded-[20px] bg-purple-50/50 hover:bg-purple-50 border border-transparent hover:border-purple-100 transition-colors text-slate-600 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <UserPlus size={24} className="text-purple-600" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">Add Prof</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/notifications")} className="flex flex-col items-center justify-center p-5 rounded-[20px] bg-orange-50/50 hover:bg-orange-50 border border-transparent hover:border-orange-100 transition-colors text-slate-600 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <BellRing size={24} className="text-orange-500" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">Notify</span>
              </button>
              <button onClick={() => navigate("/collegeadmin/settings")} className="flex flex-col items-center justify-center p-5 rounded-[20px] bg-slate-50 hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-colors text-slate-600 group">
                <div className="p-3 bg-white rounded-2xl shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Settings size={24} className="text-slate-500" />
                </div>
                <span className="text-[13px] font-bold text-slate-700">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}