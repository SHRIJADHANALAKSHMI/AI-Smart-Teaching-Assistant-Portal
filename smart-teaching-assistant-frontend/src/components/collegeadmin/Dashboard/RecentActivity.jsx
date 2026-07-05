import { motion } from "framer-motion";
import { Activity, UserPlus, FileText, BrainCircuit, UploadCloud } from "lucide-react";

const activities = [
    { icon: UserPlus, text: "New professor Dr. Anitha joined CSE department", time: "10 min ago", color: "bg-blue-100 text-blue-600" },
    { icon: BrainCircuit, text: "AI generated notes for Data Structures subject", time: "25 min ago", color: "bg-indigo-100 text-indigo-600" },
    { icon: UploadCloud, text: "Study material uploaded for Machine Learning", time: "1 hour ago", color: "bg-green-100 text-green-600" },
    { icon: FileText, text: "Monthly report generated for ECE department", time: "2 hours ago", color: "bg-orange-100 text-orange-600" },
    { icon: UserPlus, text: "Prof. Rajesh accepted the invitation", time: "3 hours ago", color: "bg-purple-100 text-purple-600" },
];

export default function RecentActivity() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                    <Activity className="text-emerald-600" size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">Recent Activity</h2>
            </div>

            <div className="space-y-4">
                {activities.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-50 transition">
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.color}`}>
                                <Icon size={18} />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-slate-700">{item.text}</p>
                                <span className="text-xs text-gray-400">{item.time}</span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
