import { motion } from "framer-motion";
import { PieChart, TrendingUp, Cpu, Activity, Zap } from "lucide-react";
import Charts from "../../components/collegeadmin/Dashboard/Charts";

export default function AIAnalytics() {
    const insightCards = [
        { title: "Total AI Prompts", value: "12,450", trend: "+14%", icon: Cpu, color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
        { title: "Time Saved", value: "450 hrs", trend: "+5%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        { title: "Peak Usage Time", value: "10am - 2pm", trend: "Stable", icon: Activity, color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100" }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12 w-full">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-rose-50 rounded-[12px]">
                            <PieChart className="text-rose-500" size={28} />
                        </div>
                        AI Usage Analytics
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Monitor AI token usage, time saved, and department API metrics.</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3.5 rounded-[16px] font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none mt-4 sm:mt-0 w-full sm:w-auto justify-center">
                    <Zap size={20} strokeWidth={2.5} /> Upgrade AI Quota
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white p-8 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`${card.bg} ${card.color} border ${card.border} p-3.5 rounded-[16px]`}>
                                    <Icon size={24} strokeWidth={2} />
                                </div>
                                <span className="text-[12px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-full">{card.trend}</span>
                            </div>
                            <p className="text-slate-400 text-[13px] font-bold uppercase tracking-wider mb-2">{card.title}</p>
                            <h2 className="text-[32px] tracking-tight font-extrabold text-slate-900">{card.value}</h2>
                        </motion.div>
                    )
                })}
            </div>

            <div className="bg-white p-8 rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB] h-[500px] flex flex-col">
                <h3 className="text-[20px] font-extrabold text-slate-900 mb-6 border-b border-slate-100 pb-4">Token Usage (Last 6 Months)</h3>
                <div className="flex-1 w-full bg-slate-50/50 rounded-[20px] p-4 relative">
                    <Charts />
                </div>
            </div>
        </motion.div>
    );
}
