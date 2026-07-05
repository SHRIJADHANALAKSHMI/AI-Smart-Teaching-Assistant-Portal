import { motion } from "framer-motion";
import { FileEdit, Calendar, Plus, Users, Clock } from "lucide-react";
import { dummyAssessments } from "../../utils/dummyData";

export default function Assessments() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileEdit className="text-purple-500" /> Assessments
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Schedule and manage AI-generated assessments.</p>
                </div>
                <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition shadow-md shadow-purple-500/20 font-medium text-sm">
                    <Plus size={18} /> Create Assessment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {dummyAssessments.map(acc => (
                    <div key={acc.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-lg transition group">
                        <div className="flex justify-between items-start mb-4">
                            <div className="bg-purple-50 dark:bg-purple-500/10 text-purple-600 p-3 rounded-2xl shrink-0"><FileEdit size={24} /></div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${acc.status === 'Upcoming' ? 'bg-sky-50 text-sky-600 border-sky-200' : acc.status === 'Completed' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                                {acc.status}
                            </span>
                        </div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight mb-1">{acc.title}</h3>
                        <p className="text-slate-500 text-sm mb-4">{acc.subject}</p>

                        <div className="space-y-2 mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                            <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <Calendar size={16} className="text-slate-400" /> {acc.date}
                            </p>
                            <p className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 font-medium">
                                <Clock size={16} className="text-slate-400" /> {acc.duration} • {acc.totalMarks} Marks
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
