import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { X, School } from "lucide-react";
import { menuItems } from "./Sidebar"; // Reuse the items

export default function MobileSidebar({ open, setOpen }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white shadow-2xl shadow-slate-900/10 z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center text-white shadow-sm">
                  <School size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-[17px] text-slate-900 tracking-tight leading-tight">Smart TA</h2>
                  <p className="text-[11px] text-slate-500 font-medium uppercase tracking-wider mt-0.5 whitespace-nowrap">Enterprise</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-200">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.title}
                    to={item.path}
                    end={item.path === "/collegeadmin"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      clsx(
                        "relative flex items-center gap-3.5 px-4 py-3 transition-all duration-300 group overflow-hidden cursor-pointer rounded-xl text-[15px] tracking-wide",
                        isActive
                          ? "bg-emerald-50 text-emerald-700 font-semibold"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                      )
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <motion.div
                            layoutId="mobile-sidebar-accent"
                            className="absolute left-1 top-[20%] bottom-[20%] w-1 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] rounded-full z-20"
                            initial={false}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                          />
                        )}
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className={clsx("relative z-10 shrink-0", isActive ? "scale-105" : "")} />
                        <span className="relative z-10">{item.title}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}