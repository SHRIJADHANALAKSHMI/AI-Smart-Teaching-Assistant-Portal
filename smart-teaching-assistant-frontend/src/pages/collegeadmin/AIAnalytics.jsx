import { motion } from "framer-motion";
import { PieChart, TrendingUp, Cpu, Activity, Zap } from "lucide-react";
import Charts from "../../components/collegeadmin/Dashboard/Charts";

export default function AIAnalytics() {
    const insightCards = [
        { title: "Total AI Prompts", value: "12,450", trend: "+14%", icon: Cpu, color: "text-indigo-500", bg: "bg-indigo-50" },
        { title: "Time Saved", value: "450 hrs", trend: "+5%", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
        { title: "Peak Usage Time", value: "10am - 2pm", trend: "Stable", icon: Activity, color: "text-rose-500", bg: "bg-rose-50" }
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <PieChart className="text-indigo-500" /> AI Usage Analytics
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Monitor AI token usage, time saved, and department API metrics.</p>
                </div>
                <button className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl hover:bg-indigo-700 transition shadow-md font-medium text-sm">
                    <Zap size={18} /> Upgrade AI Quota
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insightCards.map((card, i) => {
                    const Icon = card.icon;
                    return (
                        <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="flex justify-between items-start">
                                <div className={`${card.bg} ${card.color} p-4 rounded-2xl`}>
                                    <Icon size={24} />
                                </div>
                                <span className="text-sm font-bold text-emerald-500 bg-emerald-50 px-2.5 py-1 rounded-lg">{card.trend}</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold mt-4 mb-1">{card.title}</p>
                            <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white">{card.value}</h2>
                        </motion.div>
                    )
                })}
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 h-96 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Token Usage (Last 6 Months)</h3>
                <div className="flex-1 opacity-80">
                    {/* Re-use the recharts from Dashboard for now */}
                    <Charts />
                </div>
            </div>
        </motion.div>
    );
}
