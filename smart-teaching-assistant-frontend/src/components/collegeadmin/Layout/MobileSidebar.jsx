import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import clsx from "clsx";
import { X, BrainCircuit } from "lucide-react";
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
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 lg:hidden"
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[280px] bg-white dark:bg-slate-900 shadow-2xl z-50 lg:hidden flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-6 border-b border-slate-100 dark:border-slate-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white">
                  <BrainCircuit size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">Smart TA</h2>
                  <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Admin Portal</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-50 dark:bg-slate-800 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
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
                        "flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-300 text-[14px]",
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 font-semibold"
                          : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                      )
                    }
                  >
                    <Icon size={20} />
                    <span>{item.title}</span>
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