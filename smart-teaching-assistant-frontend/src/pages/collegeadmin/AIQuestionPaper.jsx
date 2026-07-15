import { motion } from "framer-motion";
import { FileQuestion, Settings2, Sparkles, ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function AIQuestionPaper() {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 max-w-5xl mx-auto w-full pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-orange-50 rounded-[12px] border border-orange-100">
                            <FileQuestion className="text-orange-500" size={28} />
                        </div>
                        AI Question Paper Generator
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Create perfectly balanced question papers aligned with Bloom's Taxonomy.</p>
                </div>
                <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 px-6 py-3.5 rounded-[16px] hover:bg-slate-50 transition-colors shadow-sm font-bold w-full sm:w-auto mt-4 sm:mt-0">
                    <Settings2 size={18} /> Templates
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB] h-full flex flex-col">
                        <h3 className="font-extrabold text-[18px] mb-6 text-slate-900 border-b border-slate-100 pb-4">Configuration</h3>
                        <div className="space-y-6 flex-1">
                            <div className="relative group">
                                <label className="absolute left-5 top-2.5 text-[11px] font-bold text-orange-600 uppercase tracking-wider z-10">Subject</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-5 pt-8 pb-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer shadow-sm">
                                    <option>Data Structures (CS201)</option>
                                    <option>Machine Learning (CS501)</option>
                                </select>
                                <ChevronDown size={18} className="absolute right-5 top-1/2 mt-1.5 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>

                            <div className="relative group">
                                <label className="absolute left-5 top-2.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider z-10 pointer-events-none group-focus-within:text-orange-600 transition-colors">Total Marks</label>
                                <input type="number" defaultValue={100} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-5 pt-8 pb-3.5 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 focus:bg-white transition-all text-slate-800 font-bold shadow-sm" />
                            </div>

                            <div className="pt-2">
                                <label className="text-[13px] font-bold text-slate-700 mb-4 block">Difficulty Distribution</label>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <div className="flex items-center justify-between text-[12px] font-extrabold text-emerald-600 mb-1.5 uppercase tracking-wider"><span>Easy</span><span>30%</span></div>
                                        <div className="w-full h-2.5 bg-emerald-50 rounded-full shadow-inner overflow-hidden border border-emerald-100"><div className="w-[30%] h-full bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full" /></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-[12px] font-extrabold text-amber-600 mb-1.5 uppercase tracking-wider"><span>Medium</span><span>50%</span></div>
                                        <div className="w-full h-2.5 bg-amber-50 rounded-full shadow-inner overflow-hidden border border-amber-100"><div className="w-[50%] h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full" /></div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between text-[12px] font-extrabold text-rose-600 mb-1.5 uppercase tracking-wider"><span>Hard</span><span>20%</span></div>
                                        <div className="w-full h-2.5 bg-rose-50 rounded-full shadow-inner overflow-hidden border border-rose-100"><div className="w-[20%] h-full bg-gradient-to-r from-rose-400 to-rose-500 rounded-full" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="w-full mt-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:-translate-y-0.5 text-white font-bold py-4 rounded-[16px] shadow-md flex justify-center items-center gap-2 transition-all outline-none">
                            <Sparkles size={20} /> Generate Paper
                        </button>
                    </div>
                </div>

                <div className="md:col-span-2 bg-[#F8FAFC] rounded-[24px] border-2 border-dashed border-[#E2E8F0] flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden group hover:bg-slate-50 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <FileQuestion size={400} />
                    </div>
                    <div className="relative z-10 text-center p-8 bg-white/50 backdrop-blur-sm rounded-[24px] shadow-sm border border-white max-w-sm">
                        <div className="w-16 h-16 bg-white shadow-sm border border-slate-100 rounded-[16px] flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <FileQuestion size={32} />
                        </div>
                        <h3 className="text-[18px] font-extrabold text-slate-800">Preview Area</h3>
                        <p className="text-[14px] font-medium text-slate-500 mt-2 leading-relaxed">Configure your settings in the sidebar and click generate to visualize the paper layout.</p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
