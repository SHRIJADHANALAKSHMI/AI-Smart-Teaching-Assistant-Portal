import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Filter, HardDrive, CheckCircle2, ChevronDown } from "lucide-react";
import { dummyMaterials } from "../../utils/dummyData";
import clsx from "clsx";

export default function MaterialUploads() {
    const [isDragging, setIsDragging] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };
    const handleDragLeave = () => setIsDragging(false);
    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        startUploadDummy();
    };

    const startUploadDummy = () => {
        setIsUploading(true);
        setUploadProgress(0);
        const interval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsUploading(false), 1500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12 w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-rose-50 rounded-[12px]">
                            <UploadCloud className="text-rose-500" size={28} />
                        </div>
                        Material Uploads
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Manage, review, and upload study materials.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 px-5 py-3 rounded-[16px] text-[14px] font-bold border border-slate-200">
                    <HardDrive size={20} className="text-slate-400" />
                    <div className="flex flex-col">
                        <span className="text-slate-700 tracking-wide">Storage Usage</span>
                        <div className="flex items-center gap-2">
                            <div className="w-24 h-1.5 bg-slate-200 rounded-full overflow-hidden shrink-0"><div className="h-full bg-emerald-500 w-[45%] rounded-full" /></div>
                            <span className="text-[12px] text-slate-500">45GB / 100GB</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

                {/* Upload Action Area */}
                <div className="col-span-1 space-y-6">
                    <motion.div
                        whileHover={{ y: -2 }}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={clsx(
                            "bg-white rounded-[24px] p-8 sm:p-10 border-2 border-dashed flex flex-col items-center text-center transition-all duration-300 relative overflow-hidden",
                            isDragging ? "border-emerald-500 bg-emerald-50/50" : "border-slate-200 hover:border-emerald-400 hover:shadow-[0_8px_30px_rgb(16,218,166,0.12)]"
                        )}
                    >
                        {isDragging && <div className="absolute inset-0 bg-emerald-500/5 pointer-events-none" />}
                        <div className={clsx("w-20 h-20 rounded-full flex items-center justify-center mb-5 transition-all duration-300", isDragging ? "bg-emerald-100 text-emerald-600 scale-110" : "bg-slate-50 text-slate-400 group-hover:bg-slate-100")}>
                            <UploadCloud size={36} strokeWidth={2} />
                        </div>
                        <h3 className="font-extrabold text-[18px] text-slate-900 mb-2">Drag & Drop Files</h3>
                        <p className="text-sm font-medium text-slate-500 mb-8 max-w-[200px] leading-relaxed">Supported file formats: PDF, PPTX, DOCX, MP4</p>
                        <button onClick={startUploadDummy} className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-8 py-3.5 rounded-[16px] font-bold w-full shadow-md hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none">
                            Browse Files
                        </button>
                    </motion.div>

                    {/* Upload Progress Card */}
                    <AnimatePresence>
                        {isUploading && (
                            <motion.div initial={{ opacity: 0, height: 0, y: 10 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, scale: 0.95 }} className="w-full bg-white p-6 rounded-[24px] border border-[#E5E7EB] shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
                                <h4 className="font-extrabold text-[15px] mb-4 text-slate-900">Current Upload</h4>
                                <div className="p-4 bg-slate-50 border border-slate-100 rounded-[16px]">
                                    <div className="flex justify-between items-center mb-3 text-[13px] font-bold text-slate-700">
                                        <div className="flex items-center gap-2">
                                            <FileText size={16} className="text-emerald-500" /> <span className="truncate max-w-[120px]">materials_v2.pdf</span>
                                        </div>
                                        <span className={uploadProgress === 100 ? "text-emerald-600" : "text-amber-500"}>{uploadProgress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${uploadProgress}%` }}
                                            transition={{ ease: "easeInOut" }}
                                            className={clsx("h-full rounded-full transition-colors duration-500", uploadProgress === 100 ? "bg-emerald-500" : "bg-amber-500")}
                                        />
                                    </div>
                                    <AnimatePresence>
                                        {uploadProgress === 100 && (
                                            <motion.p initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-emerald-600 text-[12px] font-extrabold mt-3 flex items-center gap-1.5"><CheckCircle2 size={16} /> Upload Complete!</motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Filters */}
                    <div className="bg-white rounded-[24px] p-8 shadow-sm border border-[#E5E7EB]">
                        <h3 className="font-extrabold text-[18px] text-slate-900 mb-5 flex items-center gap-2">Quick Filters <Filter size={16} className="text-slate-400" /></h3>
                        <div className="space-y-4">
                            <div className="relative group">
                                <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Department</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer">
                                    <option>All Departments</option>
                                    <option>Computer Science</option>
                                    <option>Mechanical</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                            <div className="relative group">
                                <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Semester</label>
                                <select className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-bold appearance-none cursor-pointer">
                                    <option>All Semesters</option>
                                    <option>Semester 1</option>
                                    <option>Semester 2</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Uploads List Area */}
                <div className="col-span-1 lg:col-span-2 bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 flex flex-col h-full min-h-[500px]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-extrabold text-[20px] text-slate-900 tracking-tight">Recent Materials</h3>
                        <button className="text-[13px] font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-4 py-2 rounded-[12px] hover:bg-emerald-100 transition-colors">View All Directory</button>
                    </div>

                    <div className="flex-1 overflow-y-auto pr-2 space-y-4 custom-scrollbar">
                        {dummyMaterials.map((mat, idx) => (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                                key={mat.id}
                                className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[20px] border border-slate-100 bg-white hover:bg-[#F8FAFC] hover:border-slate-200 hover:shadow-sm transition-all gap-4 overflow-hidden relative"
                            >
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                                <div className="flex items-start sm:items-center gap-5 relative z-10 w-full sm:w-auto">
                                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[16px] flex items-center justify-center shrink-0 border border-emerald-100">
                                        <FileText size={24} />
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-extrabold text-[16px] text-slate-900 mb-1 truncate">{mat.title}</h4>
                                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[12px] text-slate-500 font-medium">
                                            <span className="font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-md shadow-sm">{mat.subject}</span>
                                            <span>&bull;</span>
                                            <span>{mat.professor}</span>
                                            <span>&bull;</span>
                                            <span>{mat.date}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between sm:justify-end gap-5 w-full sm:w-auto relative z-10 border-t sm:border-0 border-slate-100 pt-3 sm:pt-0 mt-2 sm:mt-0">
                                    <span className="px-3 py-1.5 bg-slate-100 text-[11px] font-bold uppercase tracking-wider rounded-[10px] text-slate-600 border border-slate-200">
                                        {mat.type} &bull; {mat.size}
                                    </span>
                                    <button className="text-[13px] font-bold text-slate-600 hover:text-emerald-600 bg-white border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50 px-4 py-2 rounded-[12px] transition-all shadow-sm">
                                        Download
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {dummyMaterials.length === 0 && (
                            <div className="w-full text-center py-20 text-slate-500">
                                <FileText size={48} className="text-slate-300 mx-auto mb-4" />
                                <p className="font-medium">No materials uploaded yet.</p>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
