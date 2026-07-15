import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target } from 'lucide-react';

export function OverviewTab() {
    return (
        <div className="space-y-6">
            {/* Chapter Summary */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 justify-between items-start rounded-[24px] border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-shadow"
            >
                <div className="flex items-center gap-3 mb-4">
                    <span className="p-2.5 bg-orange-50 text-orange-600 rounded-[12px] border border-orange-100"><BookOpen size={20} strokeWidth={2.5} /></span>
                    <h2 className="text-[18px] font-extrabold text-gray-900 tracking-tight">Chapter Summary</h2>
                </div>
                <p className="text-[15px] text-gray-600 leading-relaxed font-medium">
                    An Operating System (OS) is the most critical software running on a computer, responsible for managing hardware resources, providing a user interface, and executing applications. This chapter delves into the fundamental structures, system calls, and evolution of modern operating systems, tracing from early batch systems to distributed processing.
                </p>
            </motion.div>

            {/* Learning Outcomes */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-[24px] p-6 border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] transition-shadow"
            >
                <h3 className="text-[18px] font-extrabold text-gray-900 mb-5 flex items-center gap-2 tracking-tight">
                    <Target className="text-emerald-500" size={22} strokeWidth={2.5} /> Learning Outcomes
                </h3>
                <ul className="space-y-3">
                    <li className="flex items-start gap-4 bg-slate-50 p-4 rounded-[16px] border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group">
                        <span className="bg-emerald-100 text-emerald-700 text-[13px] font-extrabold px-3 py-1.5 rounded-[8px] mt-0.5 group-hover:bg-emerald-50 shrink-0">CO1</span>
                        <span className="text-[15px] text-slate-700 font-semibold leading-snug pt-1">Understand the components and structure of an OS</span>
                    </li>
                    <li className="flex items-start gap-4 bg-slate-50 p-4 rounded-[16px] border border-slate-100 hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group">
                        <span className="bg-emerald-100 text-emerald-700 text-[13px] font-extrabold px-3 py-1.5 rounded-[8px] mt-0.5 group-hover:bg-emerald-50 shrink-0">CO2</span>
                        <span className="text-[15px] text-slate-700 font-semibold leading-snug pt-1">Analyze how system calls act as an interface</span>
                    </li>
                </ul>
            </motion.div>
        </div>
    );
}
