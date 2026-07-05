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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12" onClick={() => setOpenActionId(null)}>
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <BookOpen className="text-blue-500" /> Subjects
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage curriculum and track {subjects.length} active subjects.</p>
                </div>
                <button onClick={handleAddClick} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20 font-medium text-sm shrink-0">
                    <Plus size={18} /> Add Subject
                </button>
            </div>

            {/* Toolbar Filters */}
            <div className="flex flex-col xl:flex-row gap-4 mb-6 justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="relative max-w-md w-full">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Search subjects by name or code..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm text-sm" />
                    </div>

                    {/* Filters */}
                    <div className="flex gap-2">
                        <select value={deptFilter} onChange={e => { setDeptFilter(e.target.value); setCurrentPage(1); }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50">
                            <option value="All">All Departments</option>
                            {departments.map(d => (
                                <option key={d.code} value={d.code}>{d.code}</option>
                            ))}
                        </select>
                        <select value={semesterFilter} onChange={e => { setSemesterFilter(e.target.value); setCurrentPage(1); }} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl shadow-sm text-sm font-medium outline-none focus:ring-2 focus:ring-blue-500/50">
                            <option value="All">All Semesters</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s.toString()}>Sem {s}</option>)}
                        </select>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {/* Simplified Sorting for Grid View explicitly mapped if needed, else layout standard table */}
                    {viewMode === 'grid' && (
                        <select value={sortConfig.key} onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl text-sm outline-none">
                            <option value="name">Sort by Name</option>
                            <option value="code">Sort by Code</option>
                            <option value="semester">Sort by Sem</option>
                        </select>
                    )}

                    <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl w-fit self-end xl:self-auto">
                        <button onClick={() => setViewMode("grid")} className={clsx("p-2 rounded-lg transition-all", viewMode === "grid" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700")}>
                            <LayoutGrid size={18} />
                        </button>
                        <button onClick={() => setViewMode("table")} className={clsx("p-2 rounded-lg transition-all", viewMode === "table" ? "bg-white dark:bg-slate-700 shadow-sm text-blue-600" : "text-slate-500 hover:text-slate-700")}>
                            <List size={18} />
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence mode="wait">
                {viewMode === "grid" ? (
                    <motion.div key="grid" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {paginatedSubjects.map((sub) => (
                            <div key={sub.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group relative">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-blue-50 to-transparent dark:from-blue-900/10 rounded-bl-full pointer-events-none" />
                                <div className="flex justify-between items-start mb-4">
                                    <div className="h-10 px-3 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-bold text-xs border border-blue-100 dark:border-blue-500/20">
                                        {sub.code}
                                    </div>
                                    <div className="relative">
                                        <button onClick={(e) => { e.stopPropagation(); setOpenActionId(openActionId === sub.id ? null : sub.id); }} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-1 rounded-md hover:bg-slate-50 dark:hover:bg-slate-800">
                                            <MoreHorizontal size={20} />
                                        </button>
                                        <AnimatePresence>
                                            {openActionId === sub.id && (
                                                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="absolute right-0 top-8 w-32 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg shadow-xl py-1 z-10">
                                                    <button onClick={() => handleEditClick(sub)} className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-sm text-slate-700 flex items-center gap-2"><Edit size={14} /> Edit</button>
                                                    <button onClick={() => handleDeleteClick(sub.id)} className="w-full text-left px-4 py-2 hover:bg-red-50 text-sm text-red-600 flex items-center gap-2"><Trash2 size={14} /> Delete</button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <h3 className="font-bold text-slate-800 dark:text-white leading-tight mb-3 line-clamp-1">{sub.name}</h3>
                                <div className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg py-1.5">
                                        <span className="text-xs font-medium">Department</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{sub.department}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg py-1.5">
                                        <span className="text-xs font-medium">Professor</span>
                                        <span className="font-bold text-blue-600 dark:text-blue-400 truncate max-w-[120px]">{sub.professor || "Unassigned"}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg py-1.5">
                                        <span className="text-xs font-medium">Semester</span>
                                        <span className="font-bold text-slate-800 dark:text-slate-200">{sub.semester}</span>
                                    </div>
                                </div>
                                <div className="mt-5 flex justify-between items-center">
                                    <span className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-400 rounded-md">{sub.credits} Credits</span>
                                    <span className={clsx("px-2 py-1 text-[10px] uppercase font-bold rounded-md tracking-wider border", sub.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20" : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700")}>{sub.status}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                ) : (
                    <motion.div key="table" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                        <div className="overflow-x-auto min-h-[400px]">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                    <tr>
                                        <th onClick={() => handleSort('name')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                            <div className="flex items-center gap-1">Subject {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('department')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                            <div className="flex items-center gap-1">Dept {sortConfig.key === 'department' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('semester')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                            <div className="flex items-center gap-1">Sem (Credits) {sortConfig.key === 'semester' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('professor')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                            <div className="flex items-center gap-1">Professor {sortConfig.key === 'professor' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                        </th>
                                        <th onClick={() => handleSort('status')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                            <div className="flex items-center gap-1">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                        </th>
                                        <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <AnimatePresence mode="popLayout">
                                        {paginatedSubjects.map(sub => (
                                            <motion.tr layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} key={sub.id} className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 group">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-800 dark:text-white max-w-[200px] truncate">{sub.name}</p>
                                                    <p className="text-xs text-blue-600 font-semibold">{sub.code}</p>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm font-medium">{sub.department}</td>
                                                <td className="px-6 py-4 text-sm text-slate-500">Sem {sub.semester} &bull; <span className="font-bold text-slate-700 dark:text-slate-200">{sub.credits}</span> Crd</td>
                                                <td className="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{sub.professor || "--"}</td>
                                                <td className="px-6 py-4">
                                                    <span className={clsx("px-2.5 py-1 text-[11px] font-bold rounded-full border", sub.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-500/10 dark:border-emerald-500/20" : "bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-800 dark:border-slate-700")}>{sub.status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                                        <button onClick={() => handleEditClick(sub)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition"><Edit size={18} /></button>
                                                        <button onClick={() => handleDeleteClick(sub.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"><Trash2 size={18} /></button>
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
            <div className="flex items-center justify-between text-sm text-slate-500">
                <p>Showing {processedSubjects.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedSubjects.length)} of {processedSubjects.length} entries</p>
                <div className="flex gap-1 items-center">
                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 disabled:opacity-50 transition-colors"><ChevronLeft size={16} /></button>
                    <span className="px-3 font-semibold text-slate-700 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/80 disabled:opacity-50 transition-colors"><ChevronRight size={16} /></button>
                </div>
            </div>

            {paginatedSubjects.length === 0 && (
                <div className="w-full text-center py-12 text-slate-500 dark:text-slate-400">
                    No subjects found matching your criteria.
                </div>
            )}

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button type="button" onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">{isEditMode ? 'Edit Subject' : 'Add New Subject'}</h2>
                            <form onSubmit={handleSave}>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Subject Name <span className="text-red-500">*</span></label>
                                            <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Machine Learning" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Code <span className="text-red-500">*</span></label>
                                            <input required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="SUB104" />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Department <span className="text-red-500">*</span></label>
                                            <select required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 outline-none">
                                                <option value="" disabled>Select Dept</option>
                                                {departments.map(d => <option key={d.code} value={d.code}>{d.code}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Semester <span className="text-red-500">*</span></label>
                                            <select required value={formData.semester} onChange={e => setFormData({ ...formData, semester: Number(e.target.value) })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 outline-none">
                                                {[1, 2, 3, 4, 5, 6, 7, 8].map(s => <option key={s} value={s}>{s}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Credits</label>
                                            <input value={formData.credits} onChange={e => setFormData({ ...formData, credits: Number(e.target.value) })} type="number" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 outline-none">
                                                <option value="Active">Active</option>
                                                <option value="Archived">Archived</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Assign Professor (Optional)</label>
                                        <input value={formData.professor} onChange={e => setFormData({ ...formData, professor: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Dr. Ramesh" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button type="button" disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl text-slate-600 border border-transparent hover:border-slate-200 font-medium transition disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex items-center justify-center gap-2 min-w-[140px] px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:bg-blue-400">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Saving...' : (isEditMode ? 'Update Subject' : 'Save Subject')}
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
