import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, Search, Plus, BookOpen, MoreHorizontal, Edit, Trash2, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function Subjects() {
    const { subjects, addSubject, updateSubject, deleteSubject, departments } = useCollegeAdmin();

    // UI States
    const [viewMode, setViewMode] = useState("grid"); // grid or table
    const [searchTerm, setSearchTerm] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("All");
    const [deptFilter, setDeptFilter] = useState("All");

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [formData, setFormData] = useState({ name: "", code: "", department: "", semester: 1, credits: 3, professor: "", status: "Active" });
    const [isEditMode, setIsEditMode] = useState(false);

    // Quick Actions Dropdown for Grid
    const [openActionId, setOpenActionId] = useState(null);

    // Sorting & Pagination States
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8; // Good for 4 columns in grid

    // Derived Data
    const processedSubjects = useMemo(() => {
        let filtered = subjects.filter(s => {
            const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.code.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesSem = semesterFilter === "All" || s.semester.toString() === semesterFilter;
            const matchesDept = deptFilter === "All" || s.department === deptFilter;
            return matchesSearch && matchesSem && matchesDept;
        });

        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [subjects, searchTerm, semesterFilter, deptFilter, sortConfig]);

    const totalPages = Math.ceil(processedSubjects.length / itemsPerPage) || 1;
    const paginatedSubjects = processedSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    // Handlers
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const handleAddClick = () => {
        setFormData({ name: "", code: "", department: "", semester: 1, credits: 3, professor: "", status: "Active" });
        setIsEditMode(false);
        setIsAddModalOpen(true);
    };

    const handleEditClick = (subject) => {
        setFormData(subject);
        setIsEditMode(true);
        setIsAddModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const confirm = window.confirm("Are you sure you want to delete this subject?");
        if (confirm) {
            deleteSubject(id);
            toast.success("Subject deleted successfully");
        }
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.code || !formData.department) {
            toast.error("Please fill required fields (Name, Code, Dept).");
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            if (isEditMode) {
                updateSubject(formData);
                toast.success("Subject updated successfully!");
            } else {
                addSubject(formData);
                toast.success("Subject added successfully!");
            }
            setIsSaving(false);
            setIsAddModalOpen(false);
        }, 500);
    };

    const InputField = ({ id, label, value, onChange, type = "text", required = false }) => (
        <div className="relative group">
            <input
                id={id}
                required={required}
                value={value}
                onChange={onChange}
                type={type}
                className="peer w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-transparent font-medium"
                placeholder={label}
            />
            <label
                htmlFor={id}
                className={clsx(
                    "absolute left-4 top-2 text-[11px] font-bold uppercase tracking-wider transition-all pointer-events-none",
                    "peer-placeholder-shown:text-[14px] peer-placeholder-shown:top-3.5 peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400 peer-placeholder-shown:font-medium",
                    "peer-focus:text-[11px] peer-focus:top-2 peer-focus:uppercase peer-focus:font-bold peer-focus:text-emerald-600",
                    value ? "text-emerald-600" : "text-slate-400"
                )}
            >
                {label} {required && <span className="text-rose-500">*</span>}
            </label>
        </div>
    );

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12 w-full" onClick={() => setOpenActionId(null)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-purple-50 rounded-[12px]">
                            <BookOpen className="text-purple-600" size={28} />
                        </div>
                        Subjects
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Manage curriculum and track {subjects.length} active subjects.</p>
                </div>
                <button onClick={handleAddClick} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3.5 rounded-[16px] font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none shrink-0">
                    <Plus size={20} strokeWidth={2.5} /> Add Subject
                </button>
            </div>

            {/* Toolbar Filters */}
            <div className="flex flex-col xl:flex-row gap-4 mb-2 justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative max-w-md w-full group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input type="text" placeholder="Search subjects by name or code..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-[#E5E7EB] rounded-[16px] pl-11 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm transition-all text-[15px] font-medium placeholder-slate-400 text-slate-800" />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2 relative">
                        <select value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setCurrentPage(1); }} className="bg-white border border-[#E5E7EB] text-slate-700 px-4 py-3 rounded-[16px] shadow-sm text-[14px] font-bold outline-none focus:ring-4 focus:ring-purple-500/10 focus:border-purple-300 appearance-none pr-10 cursor-pointer">
                            <option value="All">All Departments</option>
                            {departments.map(d => (
                                <option key={d.code} value={d.code}>{d.code}</option>
                            ))}
                        </select>
                        <ChevronDown size={14} className="absolute left-[138px] top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />

                        <select value={semesterFilter} onChange={e => { setSemesterFilter(e.target.value); setCurrentPage(1); }} className="bg-white border border-[#E5E7EB] text-slate-700 px-4 py-3 rounded-[16px] shadow-sm text-[14px] font-bold outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-300 appearance-none pr-10 cursor-pointer ml-3">
                            <option value="All">All Semesters</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s.toString()}>Semester {s}</option>)}
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Simplified Sorting for Grid View */}
                    {viewMode === 'grid' && (
                        <div className="relative">
                            <select value={sortConfig.key} onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })} className="bg-white border border-slate-200 text-slate-700 pr-9 pl-4 py-3 rounded-[16px] shadow-sm text-[14px] font-bold outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors">
                                <option value="name">Sort by Name</option>
                                <option value="code">Sort by Code</option>
                                <option value="semester">Sort by Semester</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                        </div>
                    )}

                    <div className="flex bg-[#F8FAFC] border border-slate-200 p-1 rounded-[16px] w-fit self-end xl:self-auto shadow-sm">
                        <button onClick={() => setViewMode("grid")} className={clsx("p-2 rounded-[12px] transition-all", viewMode === "grid" ? "bg-white shadow-sm text-emerald-600" : "text-slate-400 hover:text-slate-700")}>
                            <LayoutGrid size={20} />
                        </button>
                        <button onClick={() => setViewMode("table")} className={clsx("p-2 rounded-[12px] transition-all", viewMode === "table" ? "bg-white shadow-sm text-emerald-600" : "text-slate-400 hover:text-slate-700")}>
                            <List size={20} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                    <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedSubjects.map((sub, idx) => (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                key={sub.id}
                                className="bg-white rounded-[24px] p-6 border border-[#E5E7EB] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-50/80 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="flex justify-between items-start mb-6">
                                    <div className="h-10 px-3 bg-[#F8FAFC] text-slate-600 rounded-[12px] flex items-center justify-center font-bold text-[13px] border border-slate-200 shadow-sm tracking-wide">
                                        {sub.code}
                                    </div>
                                    <div className="relative">
                                        <button onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === sub.id ? null : sub.id); }} className="text-slate-400 hover:text-slate-800 p-1.5 rounded-[10px] hover:bg-slate-100 transition-colors">
                                            <MoreHorizontal size={22} />
                                        </button>
                                        <AnimatePresence>
                                            {openActionId === sub.id && (
                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute right-0 top-10 w-36 bg-white border border-slate-200 rounded-[16px] shadow-lg shadow-slate-200/50 py-2 z-20">
                                                    <button onClick={() => handleEditClick(sub)} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-[14px] font-semibold text-slate-700 flex items-center gap-3 transition-colors"><Edit size={16} className="text-amber-500" /> Edit</button>
                                                    <button onClick={() => handleDeleteClick(sub.id)} className="w-full text-left px-4 py-2 hover:bg-rose-50 text-[14px] font-semibold text-rose-600 flex items-center gap-3 transition-colors"><Trash2 size={16} /> Delete</button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <h3 className="font-extrabold text-[17px] text-slate-900 leading-tight mb-4 pr-4">{sub.name}</h3>
                                <div className="space-y-2 mt-2">
                                    <div className="flex justify-between items-center p-2.5 rounded-[12px] bg-slate-50 border border-transparent group-hover:border-slate-100 transition-colors">
                                        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Dept</span>
                                        <span className="font-bold text-slate-700">{sub.department}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2.5 rounded-[12px] bg-slate-50 border border-transparent group-hover:border-slate-100 transition-colors">
                                        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Prof</span>
                                        <span className="font-bold text-purple-600 truncate max-w-[120px]">{sub.professor || "Unassigned"}</span>
                                    </div>
                                    <div className="flex justify-between items-center p-2.5 rounded-[12px] bg-slate-50 border border-transparent group-hover:border-slate-100 transition-colors">
                                        <span className="text-[12px] font-bold text-slate-400 uppercase tracking-wider">Sem</span>
                                        <span className="font-bold text-slate-700">{sub.semester}</span>
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-between items-center pt-4 border-t border-slate-100">
                                    <span className="px-3 py-1.5 bg-orange-50 text-[12px] font-bold text-orange-600 rounded-[10px]">{sub.credits} Credits</span>
                                    <span className={clsx("px-3 py-1.5 text-[11px] uppercase font-bold rounded-[10px] tracking-widest border", sub.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100")}>{sub.status}</span>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden">
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-[#F8FAFC] border-b border-slate-100">
                                    <tr>
                                        <th onClick={() => handleSort('name')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">Subject {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('department')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">Dept {sortConfig.key === 'department' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('semester')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">Sem (Crd) {sortConfig.key === 'semester' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('professor')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">Professor {sortConfig.key === 'professor' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('status')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                            <div className="flex items-center gap-1.5">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                        </th>
                                        <th className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {paginatedSubjects.map((sub, idx) => (
                                            <motion.tr layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2, delay: idx * 0.05 }} key={sub.id} className={clsx(
                                                "border-b border-slate-50 hover:bg-[#F8FAFC] transition-colors group",
                                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                                            )}>
                                                <td className="px-8 py-5">
                                                    <p className="font-bold text-[15px] text-slate-900 truncate max-w-[250px]">{sub.name}</p>
                                                    <p className="text-[12px] font-semibold text-slate-400 tracking-wider mt-0.5">{sub.code}</p>
                                                </td>
                                                <td className="px-8 py-5 text-[14px] font-bold text-slate-700">{sub.department}</td>
                                                <td className="px-8 py-5 text-[13px] text-slate-500 font-semibold tracking-wide">Sem {sub.semester} &bull; <span className="font-extrabold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-lg ml-1">{sub.credits} Crd</span></td>
                                                <td className="px-8 py-5 text-[14px] text-purple-700 font-bold">{sub.professor || "--"}</td>
                                                <td className="px-8 py-5">
                                                    <span className={clsx("px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full border", sub.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200")}>{sub.status}</span>
                                                </td>
                                                <td className="px-8 py-5">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                                        <button onClick={() => handleEditClick(sub)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition"><Edit size={18} /></button>
                                                        <button onClick={() => handleDeleteClick(sub.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"><Trash2 size={18} /></button>
                                                    </div>
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Global Pagination Bar */}
            {paginatedSubjects.length > 0 && (
                <div className="flex items-center justify-between text-sm text-slate-500 bg-[#F8FAFC] p-5 rounded-[20px] border border-slate-100 mt-2">
                    <p className="font-medium">Showing {processedSubjects.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedSubjects.length)} of {processedSubjects.length} entries</p>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                        <span className="px-2 font-bold text-slate-700">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                    </div>
                </div>
            )}

            {paginatedSubjects.length === 0 && (
                <div className="w-full text-center py-24 text-slate-500">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <BookOpen size={32} className="text-slate-300" />
                    </div>
                    <p className="font-medium text-slate-600">No subjects found matching your criteria.</p>
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white rounded-[24px] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-8 text-slate-900 tracking-tight">{isEditMode ? 'Edit Subject' : 'Add New Subject'}</h2>
                            <form onSubmit={handleSave}>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-3 gap-5">
                                        <div className="col-span-2">
                                            <InputField id="s-name" label="Subject Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                        </div>
                                        <div>
                                            <InputField id="s-code" label="Code" required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="relative group flex flex-col">
                                            <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Department <span className="text-rose-500">*</span></label>
                                            <select required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium appearance-none cursor-pointer">
                                                <option value="" disabled>Select Dept</option>
                                                {departments.map(d => <option key={d.code} value={d.code}>{d.code}</option>)}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                        <div className="relative group flex flex-col">
                                            <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Semester <span className="text-rose-500">*</span></label>
                                            <select required value={formData.semester} onChange={e => setFormData({ ...formData, semester: Number(e.target.value) })} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium appearance-none cursor-pointer">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <InputField id="s-credits" label="Credits" type="number" value={formData.credits} onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })} />

                                        <div className="relative group flex flex-col">
                                            <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium appearance-none cursor-pointer">
                                                <option value="Active">Active</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <InputField id="s-prof" label="Assign Professor (Optional)" value={formData.professor} onChange={e => setFormData({ ...formData, professor: e.target.value })} />

                                </div>
                                <div className="mt-10 flex justify-end gap-4">
                                    <button type="button" disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="px-6 py-3 rounded-[16px] text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold transition-colors disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex justify-center items-center gap-2 min-w-[160px] px-6 py-3 rounded-[16px] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Saving...' : (isEditMode ? 'Update' : 'Save')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
