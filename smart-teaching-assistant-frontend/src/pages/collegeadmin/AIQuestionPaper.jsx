import { motion } from "framer-motion";
import { FileQuestion, Settings2, Download, Sparkles } from "lucide-react";

export default function AIQuestionPaper() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileQuestion className="text-blue-500" /> AI Question Paper Generator
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Create perfectly balanced question papers aligned with Bloom's Taxonomy.</p>
                </div>
                <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md font-medium text-sm">
                    <Settings2 size={18} /> Templates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 h-full">
                        <h3 className="font-bold text-lg mb-4">Configuration</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Subject</label>
                                <select className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 text-sm font-medium">
                                    <option>Data Structures (CS201)</option>
                                    <option>Machine Learning (CS501)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Total Marks</label>
                                <input type="number" defaultValue={100} className="w-full bg-slate-50 border-none rounded-xl py-2 px-3 text-sm font-medium" />
                            </div>
                            <div>
                                <label className="text-sm font-semibold mb-1 block">Difficulty Distribution</label>
                                <div className="flex flex-col gap-2 mt-2">
                                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-600"><span>Easy</span><span>30%</span></div>
                                    <div className="w-full h-1.5 bg-emerald-100 rounded-full"><div className="w-[30%] h-full bg-emerald-500 rounded-full" /></div>
                                    <div className="flex items-center justify-between text-xs font-semibold text-amber-600 mt-2"><span>Medium</span><span>50%</span></div>
                                    <div className="w-full h-1.5 bg-amber-100 rounded-full"><div className="w-[50%] h-full bg-amber-500 rounded-full" /></div>
                                    <div className="flex items-center justify-between text-xs font-semibold text-rose-600 mt-2"><span>Hard</span><span>20%</span></div>
                                    <div className="w-full h-1.5 bg-rose-100 rounded-full"><div className="w-[20%] h-full bg-rose-500 rounded-full" /></div>
                                </div>
                            </div>
                            <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg flex justify-center items-center gap-2">
                                <Sparkles size={18} /> Generate Paper
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-2 bg-slate-100 dark:bg-slate-800 rounded-3xl border border-slate-200 dark:border-slate-700/50 flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                        <FileQuestion size={300} />
                    </div>
                    <div className="relative z-10 text-center">
                        <h3 className="text-xl font-bold text-slate-400 dark:text-slate-500">Preview Area</h3>
                        <p className="text-slate-400 mt-2">Configure settings and click generate to see preview.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
