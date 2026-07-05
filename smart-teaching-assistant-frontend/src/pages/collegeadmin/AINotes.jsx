import { motion } from "framer-motion";
import { Bot, FileText, Settings, Sparkles } from "lucide-react";

export default function AINotes() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-6">
            <div className="text-center py-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl shadow-indigo-500/20 mb-4 transform rotate-3">
                    <Bot size={32} />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">AI Notes Generator</h1>
                <p className="text-slate-500 dark:text-slate-400">Instantly convert syllabus topics into high-quality class notes.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-lg border border-slate-100 dark:border-slate-800">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Topic or Upload Source Material</label>
                        <div className="flex gap-4">
                            <input type="text" placeholder="e.g. Introduction to Machine Learning..." className="flex-1 border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-900 transition-all font-medium" />
                            <button className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 font-semibold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-200">Browse</button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Difficulty Level</label>
                            <select className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
                                <option>Beginner (1st Year)</option>
                                <option>Intermediate (2nd & 3rd Year)</option>
                                <option>Advanced (4th Year)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">Output Format</label>
                            <select className="w-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium">
                                <option>Bullet Points</option>
                                <option>Detailed Paragraphs</option>
                                <option>Mind Map Structure</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/25 flex items-center gap-2 hover:scale-105 transition-transform">
                        <Sparkles size={18} /> Generate Notes
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
