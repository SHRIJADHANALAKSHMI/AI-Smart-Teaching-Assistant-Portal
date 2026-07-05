import { motion } from "framer-motion";
import { ClipboardList, Filter, Plus } from "lucide-react";

export default function Assignments() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <ClipboardList className="text-orange-500" /> Assignments
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Track and manage student assignments globally.</p>
                </div>
                <button className="flex items-center gap-2 bg-orange-600 text-white px-5 py-2.5 rounded-xl hover:bg-orange-700 transition shadow-md shadow-orange-500/20 font-medium text-sm">
                    <Plus size={18} /> New Assignment
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-12 rounded-3xl items-center text-center shadow-sm border border-slate-100 dark:border-slate-800">
                <ClipboardList size={48} className="mx-auto text-slate-300 dark:text-slate-700 mb-4" />
                <h3 className="text-lg font-bold text-slate-700 dark:text-slate-300 mb-2">No Assignments Created</h3>
                <p className="text-slate-500">Get started by creating your first global assignment.</p>
            </div>
        </motion.div>
    );
}
