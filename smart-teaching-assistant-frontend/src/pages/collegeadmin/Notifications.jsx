import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, CheckSquare } from "lucide-react";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";
import clsx from "clsx";

export default function Notifications() {
    const { notifications, markAllNotificationsRead, deleteNotification } = useCollegeAdmin();
    const unreadCount = notifications.filter(n => !n.read).length;

    const typeConfig = {
        success: { icon: CheckCircle2, bg: "bg-emerald-50", color: "text-emerald-600", border: "border-emerald-500", highlight: "bg-emerald-500" },
        warning: { icon: AlertCircle, bg: "bg-orange-50", color: "text-orange-500", border: "border-orange-500", highlight: "bg-orange-500" },
        info: { icon: Info, bg: "bg-purple-50", color: "text-purple-600", border: "border-purple-500", highlight: "bg-purple-500" }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6 pb-12 w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div className="flex items-center gap-5">
                    <div className="relative p-2.5 bg-slate-50 rounded-[12px]">
                        <Bell className="text-slate-600" size={28} />
                        {unreadCount > 0 && (
                            <motion.span
                                initial={{ scale: 0 }} animate={{ scale: 1 }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shadow-sm border-[3px] border-white"
                            >
                                {unreadCount}
                            </motion.span>
                        )}
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Notifications</h1>
                        <p className="text-slate-500 font-medium mt-1">You have {unreadCount} unread messages requiring attention.</p>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                    <button onClick={markAllNotificationsRead} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-5 py-3 rounded-[16px] text-[14px] font-bold hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer shadow-sm">
                        <CheckSquare size={18} /> Mark all read
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden flex flex-col p-2">
                <AnimatePresence>
                    {notifications.map((notif, idx) => {
                        const config = typeConfig[notif.type] || typeConfig.info;
                        const Icon = config.icon;

                        return (
                            <motion.div
                                key={notif.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, height: 0, padding: 0, margin: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                className={clsx(
                                    "p-5 m-2 rounded-[16px] flex gap-5 transition-all hover:bg-[#F8FAFC] group relative overflow-hidden",
                                    !notif.read ? "bg-slate-50/50 shadow-[0_2px_10px_rgba(0,0,0,0.02)]" : "bg-transparent hover:border-slate-100 border border-transparent"
                                )}
                            >
                                {!notif.read && <div className={clsx("absolute top-0 left-0 bottom-0 w-1.5 rounded-l-[16px]", config.highlight)} />}

                                <div className={clsx("w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border border-white shadow-sm transition-transform group-hover:scale-105", config.bg, config.color)}>
                                    <Icon size={24} />
                                </div>
                                <div className="flex-1 min-w-0 pr-12 pt-0.5">
                                    <div className="flex justify-between items-start mb-1.5">
                                        <h4 className={clsx("font-extrabold text-[15px]", notif.read ? 'text-slate-700' : 'text-slate-900')}>
                                            {notif.title}
                                        </h4>
                                        <span className="text-[12px] font-bold text-slate-400 whitespace-nowrap ml-4 bg-slate-50 px-2.5 py-1 rounded-md">{notif.time}</span>
                                    </div>
                                    <p className="text-[14px] font-medium text-slate-500 leading-relaxed pr-8">{notif.message}</p>
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-5 top-1/2 -translate-y-1/2 flex gap-2">
                                    <button onClick={() => deleteNotification(notif.id)} className="w-10 h-10 flex items-center justify-center bg-white border border-slate-200 shadow-sm rounded-[12px] text-slate-400 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-200 transition-all cursor-pointer">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
                {notifications.length === 0 && (
                    <div className="p-16 flex flex-col items-center justify-center text-slate-500">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-5">
                            <Bell size={36} className="text-slate-300" />
                        </div>
                        <p className="font-bold text-slate-600">You're all caught up!</p>
                        <p className="text-[13px] text-slate-400 mt-1">No new notifications in your inbox.</p>
                    </div>
                )}
            </div>

        </motion.div>
    );
}
