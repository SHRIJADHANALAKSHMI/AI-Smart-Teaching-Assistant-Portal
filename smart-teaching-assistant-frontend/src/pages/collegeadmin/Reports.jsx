import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileBarChart2, Download, Filter, TrendingUp, Presentation, Building2, BarChart3, Loader2 } from "lucide-react";
import Charts from "../../components/collegeadmin/Dashboard/Charts";
import toast from "react-hot-toast";

export default function Reports() {
    const [downloadingId, setDownloadingId] = useState(null);
    const [exportingFull, setExportingFull] = useState(false);

    const reportsList = [
        { id: 1, title: "Semester Attendance Analytics", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50" },
        { id: 2, title: "Department Performance Review", icon: Building2, color: "text-purple-500", bg: "bg-purple-50" },
        { id: 3, title: "Platform Usage Trends", icon: BarChart3, color: "text-orange-500", bg: "bg-orange-50" },
        { id: 4, title: "Professor Activity Summary", icon: Presentation, color: "text-amber-500", bg: "bg-amber-50" },
    ];

    const handleDownloadReport = (id, title) => {
        setDownloadingId(id);
        setTimeout(() => {
            toast.success(`${title} downloaded successfully!`);
            setDownloadingId(null);
        }, 1200);
    };

    const handleExportFull = (type) => {
        setExportingFull(type);
        setTimeout(() => {
            toast.success(`Full ${type} exported successfully!`);
            setExportingFull(false);
        }, 1500);
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-amber-50 rounded-[12px]">
                            <FileBarChart2 className="text-amber-500" size={28} />
                        </div>
                        Executive Reports
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Comprehensive analytics and administrative data exports.</p>
                </div>
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-white text-slate-700 border border-slate-200 px-5 py-3 rounded-[16px] text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm outline-none">
                        <Filter size={18} /> Filters
                    </button>
                    <button
                        disabled={exportingFull === 'CSV'}
                        onClick={() => handleExportFull('CSV')}
                        className="min-w-[160px] flex-1 sm:flex-none justify-center flex items-center gap-2 bg-slate-900 text-white px-5 py-3 rounded-[16px] text-sm font-bold hover:bg-slate-800 transition shadow-[0_4px_14px_rgba(15,23,42,0.2)] disabled:opacity-50 hover:-translate-y-0.5"
                    >
                        {exportingFull === 'CSV' ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        {exportingFull === 'CSV' ? "Compiling..." : "Download CSV"}
                    </button>
                    <button
                        disabled={exportingFull === 'PDF'}
                        onClick={() => handleExportFull('PDF')}
                        className="min-w-[160px] flex-1 sm:flex-none justify-center flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-5 py-3 rounded-[16px] text-sm font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] transition disabled:opacity-50 hover:-translate-y-0.5"
                    >
                        {exportingFull === 'PDF' ? <Loader2 size={18} className="animate-spin" /> : <Download size={18} />}
                        {exportingFull === 'PDF' ? "Generating..." : "Export PDF"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Pre-generated Reports */}
                <div className="lg:col-span-1 space-y-5 bg-white rounded-[24px] p-8 shadow-sm border border-[#E5E7EB]">
                    <h3 className="font-extrabold text-[18px] text-slate-900 mb-2">Ready to Download</h3>
                    <div className="space-y-4">
                        {reportsList.map((rep, idx) => {
                            const Icon = rep.icon;
                            const isDownloading = downloadingId === rep.id;
                            return (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    key={rep.id}
                                    onClick={() => !isDownloading && handleDownloadReport(rep.id, rep.title)}
                                    className="bg-white p-4 rounded-[16px] border border-slate-100 flex items-center justify-between hover:bg-[#F8FAFC] hover:border-slate-200 hover:shadow-sm transition-all group cursor-pointer relative overflow-hidden"
                                >
                                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <div className="flex items-center gap-4 relative z-10">
                                        <div className={`w-12 h-12 rounded-[14px] flex items-center justify-center shrink-0 border border-white ${rep.bg} ${rep.color} shadow-sm group-hover:scale-105 transition-transform`}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="pr-2">
                                            <h4 className="font-extrabold text-slate-800 text-[14px] leading-tight mb-1">{rep.title}</h4>
                                            <p className="text-[11px] font-bold text-slate-400 tracking-wider">Generated: Today, 10:00 AM</p>
                                        </div>
                                    </div>
                                    <button disabled={isDownloading} className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:bg-emerald-50 transition-colors shrink-0 border border-slate-200 group-hover:border-emerald-200 disabled:opacity-50 relative z-10 shadow-sm">
                                        {isDownloading ? <Loader2 size={16} className="animate-spin text-emerald-500" /> : <Download size={16} />}
                                    </button>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Analytics Charts */}
                <div className="lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col h-full min-h-[500px]">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-5">
                        <h3 className="font-extrabold text-[20px] text-slate-900 tracking-tight">Engagement Overview</h3>
                        <div className="relative group">
                            <select className="bg-slate-50 border border-slate-200 text-[13px] font-bold rounded-[12px] px-4 py-2 outline-none text-slate-700 appearance-none cursor-pointer pr-10 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all hover:bg-slate-100">
                                <option>This Week</option>
                                <option>This Month</option>
                                <option>This Semester</option>
                            </select>
                            <svg className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                    <div className="flex-1 min-h-[350px] w-full relative">
                        {/* Reusing existing Charts component */}
                        <Charts />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
