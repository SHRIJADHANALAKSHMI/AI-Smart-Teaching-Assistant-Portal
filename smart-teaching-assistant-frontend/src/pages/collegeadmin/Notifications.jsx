import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, CheckSquare } from "lucide-react";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function Notifications() {
    const { notifications, markAllNotificationsRead, deleteNotification } = useCollegeAdmin();
    const unreadCount = notifications.filter(n => !n.read).length;

    const typeConfig = {
        success: { icon: CheckCircle2, bg: "bg-emerald-50 dark:bg-emerald-500/10", color: "text-emerald-600 dark:text-emerald-400", border: "border-emerald-500" },
        warning: { icon: AlertCircle, bg: "bg-amber-50 dark:bg-amber-500/10", color: "text-amber-600 dark:text-amber-400", border: "border-amber-500" },
        info: { icon: Info, bg: "bg-blue-50 dark:bg-blue-500/10", color: "text-blue-600 dark:text-blue-400", border: "border-blue-500" }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 pb-12">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 sticky top-[80px] z-10">
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Bell className="text-slate-700 dark:text-slate-300" size={28} />
                        {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white dark:border-slate-900">{unreadCount}</span>}
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h1>
                        <p className="text-slate-500 dark:text-slate-400 text-sm">You have {unreadCount} unread messages</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button onClick={markAllNotificationsRead} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition border border-slate-200 dark:border-slate-700 cursor-pointer">
                        <CheckSquare size={16} /> Mark all read
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                <AnimatePresence>
                    {notifications.map((notif) => {
                        const config = typeConfig[notif.type] || typeConfig.info;
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={notif.id}
                                layout
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                                className={`p-5 flex gap-4 transition-colors hover:bg-slate-50/50 dark:hover:bg-slate-800/30 group relative ${!notif.read ? `bg-slate-50/50 border-l-4 ${config.border}` : "border-l-4 border-transparent"}`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.bg} ${config.color}`}>
                                    <Icon size={20} />
                                </div>
                                <div className="flex-1 min-w-0 pr-10">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className={`font-semibold text-sm ${notif.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-900 dark:text-white'}`}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-[11px] font-medium text-slate-400 whitespace-nowrap ml-4">{notif.time}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{notif.message}</p>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                    <button onClick={() => deleteNotification(notif.id)} className="w-8 h-8 flex items-center justify-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full text-slate-400 hover:text-rose-500 hover:border-rose-200 transition-colors cursor-pointer">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {notifications.length === 0 && (
                    <div className="p-10 flex flex-col items-center justify-center text-slate-400">
                        <Bell size={48} className="mb-4 opacity-20" />
                        <p className="font-medium">All caught up!</p>
                    </div>
                )}
            </div>

        </motion.div>
    );
}
