import { motion } from "framer-motion";
import { Bot, FileText, Settings, Sparkles, ChevronDown } from "lucide-react";
import clsx from "clsx";

export default function AINotes() {

    // Floating Input Component
    const InputField = ({ id, label, value, type = "text", required = false }) => (
        <div className="relative group">
            <input
                id={id}
                required={required}
                defaultValue={value}
                type={type}
                className="peer w-full bg-slate-50 border border-slate-200 rounded-[16px] px-5 pt-6 pb-2.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all text-slate-800 placeholder-transparent font-bold shadow-sm"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className={clsx(
                    "absolute left-5 top-2.5 text-[11px] font-bold uppercase tracking-wider transition-all pointer-events-none",
                    "peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-4 peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-medium",
                    "peer-focus:text-[11px] peer-focus:top-2.5 peer-focus:uppercase peer-focus:font-bold peer-focus:text-purple-600",
                    value ? "text-purple-600" : "text-slate-400"
                )}
            >
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
            <div className="text-center py-10 bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] mt-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-50 to-transparent rounded-bl-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-orange-50 to-transparent rounded-tr-full pointer-events-none" />

                <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-[20px] mx-auto flex items-center justify-center text-white shadow-[0_8px_30px_rgba(139,92,246,0.25)] mb-6 transform rotate-3 hover:rotate-6 transition-transform">
                    <Bot size={40} />
                </div>
                <h1 className="text-[32px] font-extrabold text-slate-900 mb-3 tracking-tight relative z-10">AI Notes Generator</h1>
                <p className="text-slate-500 font-medium relative z-10 text-[15px]">Instantly convert syllabus topics into high-quality class notes.</p>
            </div>

            <div className="bg-white p-8 md:p-10 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB]">
                <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row gap-5">
                        <div className="flex-1">
                            <InputField id="ai-topic" label="Topic or Context (e.g. Intro to ML)" />
                        </div>
                        <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 px-8 py-4 rounded-[16px] border border-slate-200 transition-colors font-bold shadow-sm whitespace-nowrap">
                            Browse Materials
                        </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="relative group">
                            <label className="absolute left-5 top-2.5 text-[11px] font-bold text-purple-600 uppercase tracking-wider z-10">Difficulty Level</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-5 pt-7 pb-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer shadow-sm">
                                <option>Beginner (1st Year)</option>
                                <option>Intermediate (2nd & 3rd Year)</option>
                                <option>Advanced (4th Year)</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-5 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                        <div className="relative group">
                            <label className="absolute left-5 top-2.5 text-[11px] font-bold text-purple-600 uppercase tracking-wider z-10">Output Format</label>
                            <select className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-5 pt-7 pb-3.5 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer shadow-sm">
                                <option>Bullet Points</option>
                                <option>Detailed Paragraphs</option>
                                <option>Mind Map Structure</option>
                            </select>
                            <ChevronDown size={18} className="absolute right-5 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex justify-end shrink-0 border-t border-slate-100 pt-6">
                    <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-3.5 rounded-[16px] font-bold shadow-md hover:shadow-[0_4px_20px_rgba(139,92,246,0.3)] flex items-center gap-2 hover:-translate-y-0.5 w-full sm:w-auto justify-center transition-all outline-none">
                        <Sparkles size={20} /> Generate Notes
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
