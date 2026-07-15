/* eslint-disable react-refresh/only-export-components */
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";
import {
  LayoutDashboard,
  Building2,
  BookOpen,
  GraduationCap,
  FileBarChart2,
  PieChart,
  Bell,
  UserCircle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  School
} from "lucide-react";

export const menuItems = [
  { title: "Dashboard", path: "/collegeadmin", icon: LayoutDashboard },
  { title: "Departments", path: "/collegeadmin/departments", icon: Building2 },
  { title: "Subjects", path: "/collegeadmin/subjects", icon: BookOpen },
  { title: "Professors", path: "/collegeadmin/professors", icon: GraduationCap },
  { title: "Reports", path: "/collegeadmin/reports", icon: FileBarChart2 },
  { title: "Analytics", path: "/collegeadmin/analytics", icon: PieChart },
  { title: "Notifications", path: "/collegeadmin/notifications", icon: Bell },
  { title: "College Profile", path: "/collegeadmin/profile", icon: UserCircle },
  { title: "Settings", path: "/collegeadmin/settings", icon: Settings },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 90 : 280 }}
      className="h-screen sticky top-0 flex flex-col bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-[#E5E7EB] z-50 transition-all duration-300"
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-[40px] h-[40px] rounded-[12px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-sm">
            <School size={20} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap ml-1">
                <h2 className="font-bold text-[17px] text-slate-900 tracking-tight leading-tight">Smart TA</h2>
                <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5 whitespace-nowrap">Enterprise</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-[-14px] top-8 w-7 h-7 bg-white border border-slate-200 rounded-full flex items-center justify-center cursor-pointer shadow-sm hover:bg-slate-50 text-slate-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/collegeadmin"}
              className={({ isActive }) =>
                clsx(
                  "relative flex items-center gap-3.5 px-4 py-3 transition-all duration-300 group overflow-hidden cursor-pointer",
                  isActive
                    ? "text-emerald-700 font-semibold"
                    : "text-slate-500 hover:text-slate-900"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <>
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 bg-emerald-50 rounded-xl"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                      {/* Left Accent Indicator */}
                      <motion.div
                        layoutId="sidebar-accent"
                        className="absolute left-1 top-[20%] bottom-[20%] w-1 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] rounded-full z-20"
                        initial={false}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    </>
                  ) : (
                    <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300" />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={clsx(
                      "relative z-10 transition-transform duration-300 shrink-0",
                      isActive ? "scale-105" : "group-hover:scale-105 group-hover:text-emerald-600"
                    )}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -5 }}
                        className="relative z-10 whitespace-nowrap text-[15px] tracking-wide"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Profile Section */}
      <div className="p-4 border-t border-slate-100 shrink-0 bg-white">
        <NavLink
          to="/"
          className="flex items-center gap-3 p-3 w-full text-left rounded-xl hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors group relative"
        >
          <div className="absolute left-1 top-[20%] bottom-[20%] w-1 bg-rose-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <LogOut size={20} className="shrink-0 ml-1 transition-transform group-hover:rotate-12" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="font-semibold whitespace-nowrap overflow-hidden text-[15px]">
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
    </motion.aside>
  );
}