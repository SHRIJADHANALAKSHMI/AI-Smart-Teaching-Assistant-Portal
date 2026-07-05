import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCollegeAdmin } from "../../../context/CollegeAdminContext";

export default function Navbar({ collapsed, setCollapsed, setMobileOpen }) {
  const [isDark, setIsDark] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const navigate = useNavigate();
  const { notifications } = useCollegeAdmin();

  // Close notifications if clicked outside
  const notifRef = useRef();
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-6 py-4 transition-colors duration-300 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="lg:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="relative group max-w-md w-full hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search departments, professors, subjects..."
              className="w-full bg-slate-100 dark:bg-slate-800/50 border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 text-slate-800 dark:text-white rounded-xl pl-10 pr-4 py-2.5 outline-none transition-all duration-300 shadow-sm focus:shadow-md focus:ring-4 focus:ring-blue-500/10 placeholder-slate-400 dark:placeholder-slate-500 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  // Navigate to search page in a real app, since we restrict our scope, just clear it or alert if no results implemented
                  navigate(`/collegeadmin/departments`);
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="hidden lg:inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md">⌘</kbd>
              <kbd className="hidden lg:inline-flex items-center justify-center px-2 py-0.5 text-xs font-semibold text-slate-400 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-md">K</kbd>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-full">
            <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Admin Interface Active</span>
          </div>

          <button onClick={() => setIsDark(!isDark)} className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer">
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotificationOpen(!notificationOpen)} className="p-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors relative cursor-pointer">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>}
            </button>
            <AnimatePresence>
              {notificationOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50 origin-top-right">
                  <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800/50">
                    <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                    <span className="text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400 px-2 py-0.5 rounded-full">{unreadCount} New</span>
                  </div>
                  <div className="max-h-[300px] overflow-y-auto">
                    {notifications.slice(0, 5).map((notif) => (
                      <div onClick={() => { setNotificationOpen(false); navigate('/collegeadmin/notifications'); }} key={notif.id} className="p-4 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${notif.read ? 'bg-slate-100' : 'bg-blue-100'}`}>
                          <Bell size={14} className={notif.read ? 'text-slate-500' : 'text-blue-600'} />
                        </div>
                        <div>
                          <p className={`text-sm font-medium line-clamp-1 ${notif.read ? 'text-slate-600' : 'text-slate-800'}`}>{notif.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="p-4 text-center text-sm text-slate-500">No notifications found.</div>
                    )}
                  </div>
                  <div onClick={() => { setNotificationOpen(false); navigate('/collegeadmin/notifications'); }} className="p-3 text-center bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors border-t border-slate-100 dark:border-slate-800">
                    <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">View all notifications</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}