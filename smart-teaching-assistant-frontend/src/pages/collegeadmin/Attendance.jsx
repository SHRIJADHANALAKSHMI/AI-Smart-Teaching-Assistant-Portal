import { motion } from "framer-motion";
import { CheckSquare, Calendar, Download } from "lucide-react";

export default function Attendance() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <CheckSquare className="text-emerald-500" /> Attendance Monitoring
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">View overall college attendance trends and metrics.</p>
                </div>
                <div className="flex gap-2">
                    <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 font-medium text-sm">
                        <option>Today</option>
                        <option>This Week</option>
                        <option>This Month</option>
                    </select>
                    <button className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:bg-emerald-700">
                        <Download size={16} /> Export List
                    </button>
                </div>
            </div>

            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
                <Calendar size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">Select a date range to view attendance details</h3>
                <p className="text-slate-500">Details will be populated from linked IoT or manual registry systems.</p>
            </div>
        </motion.div>
    );
}
