import { motion } from "framer-motion";
import { Users, Search, Plus, Mail } from "lucide-react";
import { dummyStudents } from "../../utils/dummyData";

export default function Students() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Users className="text-indigo-500" /> Students Directory
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage student records and overall performance.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-500/20 font-medium text-sm">
                    <Plus size={18} /> Add Student
                </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search by name, roll no, department..." className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                    </div>
                </div>

                <table className="w-full text-left">
                    <thead className="bg-slate-50 dark:bg-slate-800/50">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm">Student</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm">Course info</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm">Performance</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {dummyStudents.map(student => (
                            <tr key={student.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full bg-slate-200" />
                                    <div>
                                        <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{student.name}</h3>
                                        <p className="text-xs text-slate-500">{student.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-semibold text-sm">{student.department}</p>
                                    <p className="text-xs text-slate-500">Sem {student.semester} • {student.rollNo}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="font-bold text-indigo-600">{student.cgpa} CGPA</p>
                                    <p className="text-xs text-slate-500">{student.attendance} Attendance</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-semibold">Active</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
}
