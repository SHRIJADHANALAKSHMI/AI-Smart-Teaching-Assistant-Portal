import { motion } from "framer-motion";
import { Activity, UserPlus, FileText, BrainCircuit, UploadCloud } from "lucide-react";

const activities = [
    { icon: UserPlus, text: "New professor Dr. Anitha joined CSE department", time: "10 min ago", color: "bg-emerald-50 text-emerald-600" },
    { icon: BrainCircuit, text: "AI generated notes for Data Structures subject", time: "25 min ago", color: "bg-purple-50 text-purple-600" },
    { icon: UploadCloud, text: "Study material uploaded for Machine Learning", time: "1 hour ago", color: "bg-teal-50 text-teal-600" },
    { icon: FileText, text: "Monthly report generated for ECE department", time: "2 hours ago", color: "bg-orange-50 text-orange-600" },
    { icon: UserPlus, text: "Prof. Rajesh accepted the invitation", time: "3 hours ago", color: "bg-rose-50 text-rose-600" },
];

export default function RecentActivity() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-[24px] shadow-sm p-6 border border-[#E5E7EB]"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center border border-emerald-100">
                    <Activity className="text-emerald-500" size={22} />
                </div>
                <h2 className="text-[18px] font-extrabold text-slate-900">Recent Activity</h2>
            </div>

            <div className="space-y-4">
                {activities.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-[16px] hover:bg-slate-50 transition border border-transparent hover:border-slate-100 cursor-default">
                            <div className={`w-10 h-10 rounded-[12px] flex items-center justify-center shrink-0 border border-white shadow-sm ${item.color}`}>
                                <Icon size={18} />
                            </div>
                            <div className="flex-1 pt-0.5">
                                <p className="text-[14px] font-bold text-slate-800 leading-snug mb-1">{item.text}</p>
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{item.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
