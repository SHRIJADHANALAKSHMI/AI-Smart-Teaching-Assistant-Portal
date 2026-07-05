import { useState } from "react";
import { motion } from "framer-motion";
import { FileBarChart2, Download, Filter, TrendingUp, Presentation, Building2, BarChart3, Loader2 } from "lucide-react";
import Charts from "../../components/collegeadmin/Dashboard/Charts";
import toast from "react-hot-toast";

export default function Reports() {
    const [downloadingId, setDownloadingId] = useState(null);
    const [exportingFull, setExportingFull] = useState(false);

    const reportsList = [
        { id: 1, title: "Semester Attendance Analytics", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-500/10" },
        { id: 2, title: "Department Performance Review", icon: Building2, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
        { id: 3, title: "Platform Usage Trends", icon: BarChart3, color: "text-sky-500", bg: "bg-sky-50 dark:bg-sky-500/10" },
        { id: 4, title: "Professor Activity Summary", icon: Presentation, color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-500/10" },
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <FileBarChart2 className="text-blue-600" /> Executive Reports
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Comprehensive analytics and administrative data exports.</p>
                </div>
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none justify-center flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                        <Filter size={16} /> Filters
                    </button>
                    <button
                        disabled={exportingFull === 'CSV'}
                        onClick={() => handleExportFull('CSV')}
                        className="min-w-[150px] flex-1 sm:flex-none justify-center flex items-center gap-2 bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-blue-800 transition shadow-md shadow-blue-900/20 disabled:opacity-50"
                    >
                        {exportingFull === 'CSV' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        {exportingFull === 'CSV' ? "Compiling..." : "Download CSV"}
                    </button>
                    <button
                        disabled={exportingFull === 'PDF'}
                        onClick={() => handleExportFull('PDF')}
                        className="min-w-[150px] flex-1 sm:flex-none justify-center flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-emerald-700 transition shadow-md shadow-emerald-500/20 disabled:opacity-50"
                    >
                        {exportingFull === 'PDF' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                        {exportingFull === 'PDF' ? "Generating..." : "Export PDF"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pre-generated Reports */}
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="font-bold text-slate-800 dark:text-white px-2">Ready to Download</h3>
                    {reportsList.map((rep) => {
                        const Icon = rep.icon;
                        const isDownloading = downloadingId === rep.id;
                        return (
                            <div key={rep.id} onClick={() => !isDownloading && handleDownloadReport(rep.id, rep.title)} className="bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-md transition-shadow group cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${rep.bg} ${rep.color}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-sm max-w-[180px] truncate">{rep.title}</h4>
                                        <p className="text-xs text-slate-400 mt-1">Generated: Today, 10:00 AM</p>
                                    </div>
                                </div>
                                <button disabled={isDownloading} className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors shrink-0 disabled:opacity-50">
                                    {isDownloading ? <Loader2 size={16} className="animate-spin text-blue-500" /> : <Download size={16} />}
                                </button>
                            </div>
                        );
                    })}
                </div>

                {/* Analytics Charts */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 dark:text-white">Engagement Overview</h3>
                        <select className="bg-slate-50 dark:bg-slate-800 border-none text-sm font-medium rounded-lg px-2 py-1 outline-none text-slate-600">
                            <option>This Week</option>
                            <option>This Month</option>
                            <option>This Semester</option>
                        </select>
                    </div>
                    <div className="flex-1 min-h-[350px]">
                        {/* Reusing existing Charts component since it's already using recharts */}
                        <Charts />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
