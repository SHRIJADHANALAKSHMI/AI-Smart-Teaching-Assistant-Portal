import { useState } from "react";
import { motion } from "framer-motion";
import { UploadCloud, FileText, Filter, HardDrive, CheckCircle2, X } from "lucide-react";
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
                    setTimeout(() => setIsUploading(false), 1000);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <UploadCloud className="text-sky-500" /> Material Uploads
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage, review, and upload study materials.</p>
                </div>
                <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-medium border border-slate-200 dark:border-slate-700">
                    <HardDrive size={18} className="text-slate-500" />
                    <span className="text-slate-700 dark:text-slate-300">Storage: 45GB / 100GB</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Upload Area */}
                <div className="lg:col-span-1 space-y-6">
                    <div
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        className={clsx(
                            "bg-white dark:bg-slate-900 rounded-3xl p-8 border-2 border-dashed flex flex-col items-center text-center transition-all duration-300",
                            isDragging ? "border-sky-500 bg-sky-50 dark:bg-sky-500/10" : "border-slate-200 dark:border-slate-700 hover:border-sky-400 dark:hover:border-sky-500"
                        )}
                    >
                        <div className={clsx("w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors", isDragging ? "bg-sky-100 text-sky-600 dark:bg-sky-500/20 dark:text-sky-400" : "bg-slate-100 dark:bg-slate-800 text-slate-400")}>
                            <UploadCloud size={32} />
                        </div>
                        <h3 className="font-bold text-slate-800 dark:text-white mb-2">Drag & Drop Files</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Supported files: PDF, PPTX, DOCX, MP4</p>
                        <button onClick={startUploadDummy} className="bg-slate-900 dark:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium w-full shadow-md hover:bg-slate-800 transition">
                            Browse Files
                        </button>

                        {/* Upload Progress */}
                        {isUploading && (
                            <div className="w-full mt-6 bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between items-center mb-2 text-xs font-semibold text-slate-600 dark:text-slate-300">
                                    <span>Uploading materials.pdf...</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${uploadProgress}%` }}
                                        className="h-full bg-sky-500 rounded-full"
                                    />
                                </div>
                                {uploadProgress === 100 && (
                                    <p className="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1 justify-center"><CheckCircle2 size={14} /> Upload Complete</p>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800">
                        <h3 className="font-bold text-slate-800 dark:text-white mb-4">Quick Filters</h3>
                        <div className="space-y-3">
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500/50 text-sm">
                                <option>All Departments</option>
                                <option>Computer Science</option>
                            </select>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 focus:ring-2 focus:ring-sky-500/50 text-sm">
                                <option>All Semesters</option>
                                <option>Semester 1</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Recent Uploads List */}
                <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6 flex flex-col h-full">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white">Recent Uploads</h3>
                        <button className="text-sm font-medium text-sky-600 dark:text-sky-400 hover:underline">View All</button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-hide">
                        {dummyMaterials.map((mat) => (
                            <div key={mat.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-sky-50 dark:bg-sky-500/10 text-sky-600 dark:text-sky-400 rounded-xl flex items-center justify-center shrink-0">
                                        <FileText size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-0.5">{mat.title}</h4>
                                        <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-500">
                                            <span className="font-semibold text-slate-600 dark:text-slate-400">{mat.subject}</span>
                                            <span>•</span>
                                            <span>{mat.professor}</span>
                                            <span>•</span>
                                            <span>{mat.date}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 sm:flex-col sm:items-end">
                                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-xs font-semibold rounded-lg text-slate-600 dark:text-slate-300">
                                        {mat.type} • {mat.size}
                                    </span>
                                    <button className="text-xs font-bold text-sky-600 hover:text-sky-700">Download</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
