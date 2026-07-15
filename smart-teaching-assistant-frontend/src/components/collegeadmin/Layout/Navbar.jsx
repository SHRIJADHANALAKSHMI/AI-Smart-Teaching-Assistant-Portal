import { useState, useRef, useEffect } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCollegeAdmin } from "../../../context/CollegeAdminContext";

export default function Navbar({ collapsed, setCollapsed, setMobileOpen }) {
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
    <header className="bg-white/80 backdrop-blur-xl border-b border-[#E5E7EB] sticky top-0 z-40 px-6 py-4 transition-colors duration-300 shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Left Side: Mobile Menu & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors" onClick={() => setMobileOpen(true)}>
            <Menu size={24} />
          </button>

          <div className="relative group max-w-md w-full hidden md:block">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Search subjects, professors, reports..."
              className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:bg-white text-slate-800 rounded-full pl-10 pr-12 py-2.5 outline-none transition-all duration-300 shadow-sm focus:shadow-md focus:ring-4 focus:ring-emerald-500/10 placeholder-slate-400 text-[14px] font-medium"
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim()) {
                  navigate(`/collegeadmin/departments`);
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              <kbd className="hidden lg:inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold text-slate-400 bg-white border border-slate-200 rounded-md">⌘K</kbd>
            </div>
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 sm:gap-6">

          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Term</span>
            <span className="text-sm font-semibold text-slate-800">Fall Semester 2026</span>
          </div>

          <div className="w-px h-8 bg-slate-200 hidden md:block"></div>

          <div className="relative" ref={notifRef}>
            <button onClick={() => setNotificationOpen(!notificationOpen)} className="p-2.5 text-slate-500 hover:bg-slate-100 hover:text-emerald-600 rounded-full transition-colors relative cursor-pointer">
              <Bell size={20} />
              {unreadCount > 0 && <span className="absolute top-2.5 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white animate-pulse"></span>}
            </button>
            <AnimatePresence>
              {notificationOpen && (
                <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden z-50 origin-top-right">
                  <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800">Notifications</h3>
                    {unreadCount > 0 && <span className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">{unreadCount} New</span>}
                  </div>
                  <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
                    {notifications.slice(0, 5).map((notif) => (
                      <div onClick={() => { setNotificationOpen(false); navigate('/collegeadmin/notifications'); }} key={notif.id} className="p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 group">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${notif.read ? 'bg-slate-100 text-slate-400' : 'bg-emerald-100 text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white'}`}>
                          <Bell size={14} />
                        </div>
                        <div>
                          <p className={`text-[13px] font-semibold line-clamp-1 ${notif.read ? 'text-slate-500' : 'text-slate-800'}`}>{notif.title}</p>
                          <p className="text-[11px] text-slate-400 mt-1 font-medium">{notif.time}</p>
                        </div>
                      </div>
                    ))}
                    {notifications.length === 0 && (
                      <div className="p-6 text-center text-sm font-medium text-slate-400">No new notifications.</div>
                    )}
                  </div>
                  <div onClick={() => { setNotificationOpen(false); navigate('/collegeadmin/notifications'); }} className="p-3 text-center bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors border-t border-slate-100">
                    <span className="text-[13px] font-bold text-emerald-600">View all</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Picture */}
          <div className="h-9 w-9 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-200/50 cursor-pointer hover:ring-emerald-200 transition-all">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin&backgroundColor=f8fafc" alt="Profile" className="h-full w-full object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}