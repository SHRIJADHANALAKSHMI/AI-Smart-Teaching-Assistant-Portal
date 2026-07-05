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
      className="h-screen sticky top-0 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm z-50 transition-all duration-300"
    >
      {/* Logo Area */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="min-w-[44px] h-[44px] rounded-xl bg-blue-900 flex items-center justify-center text-white shadow-sm">
            <School size={24} />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.div initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="whitespace-nowrap">
                <h2 className="font-bold text-lg text-slate-800 dark:text-white leading-tight mt-1">Smart TA</h2>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium whitespace-nowrap">College Admin Portal</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute right-[-14px] top-8 w-7 h-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full flex items-center justify-center cursor-pointer shadow-md hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/collegeadmin"}
              className={({ isActive }) =>
                clsx(
                  "relative flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 group overflow-hidden cursor-pointer",
                  isActive
                    ? "text-blue-700 dark:text-blue-400 font-semibold shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300"
                )
              }
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={20}
                    className={clsx(
                      "relative z-10 transition-transform duration-300 shrink-0",
                      isActive ? "scale-110" : "group-hover:scale-110"
                    )}
                  />
                  <AnimatePresence>
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="relative z-10 whitespace-nowrap text-sm"
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
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 shrink-0 bg-white dark:bg-slate-900">
        <NavLink
          to="/"
          className="flex items-center gap-3 p-2 w-full text-left rounded-xl hover:bg-red-50 dark:hover:bg-red-500/10 text-slate-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={20} className="shrink-0 ml-1" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span initial={{ opacity: 0, width: 0 }} animate={{ opacity: 1, width: "auto" }} exit={{ opacity: 0, width: 0 }} className="font-medium whitespace-nowrap overflow-hidden">
                Log Out
              </motion.span>
            )}
          </AnimatePresence>
        </NavLink>
      </div>
    </motion.aside>
  );
}