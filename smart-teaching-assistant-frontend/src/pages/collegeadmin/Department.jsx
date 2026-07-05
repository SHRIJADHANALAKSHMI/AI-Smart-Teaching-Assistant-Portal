import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Building2, Building, Filter, Edit, Trash2, Eye, X, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function Department() {
    const { departments, addDepartment, updateDepartment, deleteDepartment } = useCollegeAdmin();
    const [searchTerm, setSearchTerm] = useState("");

    // UI States
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [selectedDept, setSelectedDept] = useState(null);
    const [formData, setFormData] = useState({ name: "", code: "", hod: "", professors: 0, students: 0, status: "Active" });
    const [isEditMode, setIsEditMode] = useState(false);

    // Sorting & Pagination States
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Derived Data
    const processedDepartments = useMemo(() => {
        let filtered = departments.filter(d =>
            d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.hod.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [departments, searchTerm, sortConfig]);

    const totalPages = Math.ceil(processedDepartments.length / itemsPerPage) || 1;
    const paginatedDepartments = processedDepartments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


    // Handlers
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
        setSortConfig({ key, direction });
    };

    const handleAddClick = () => {
        setFormData({ name: "", code: "", hod: "", professors: 0, students: 0, status: "Active" });
        setIsEditMode(false);
        setIsAddModalOpen(true);
    };

    const handleEditClick = (dept) => {
        setFormData(dept);
        setIsEditMode(true);
        setIsAddModalOpen(true);
    };

    const handleViewClick = (dept) => {
        setSelectedDept(dept);
        setIsViewModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this department?");
        if (confirmDelete) {
            deleteDepartment(id);
            toast.success("Department deleted successfully!");
        }
    };

    const handleSaveDepartment = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.code || !formData.hod) {
            toast.error("Please fill all required fields.");
            return;
        }

        setIsSaving(true);

        // Simulate network request
        setTimeout(() => {
            if (isEditMode) {
                updateDepartment(formData);
                toast.success("Department updated successfully!");
            } else {
                addDepartment(formData);
                toast.success("Department added successfully!");
            }
            setIsSaving(false);
            setIsAddModalOpen(false);
        }, 500);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Building className="text-blue-500" /> Departments
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage {departments.length} active departments across the college.</p>
                </div>
                <button onClick={handleAddClick} className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-500/20 font-medium text-sm">
                    <Plus size={18} /> Add Department
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search departments by name, code or HOD..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-sm transition text-sm"
                    />
                </div>
                <button className="flex items-center gap-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-4 py-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition text-sm font-medium shadow-sm">
                    <Filter size={18} /> Filter
                </button>
            </div>

            {/* Table view */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                                <th onClick={() => handleSort('name')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    <div className="flex items-center gap-1">Department {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                </th>
                                <th onClick={() => handleSort('hod')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    <div className="flex items-center gap-1">Head of Department {sortConfig.key === 'hod' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                </th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm">Stats</th>
                                <th onClick={() => handleSort('status')} className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition">
                                    <div className="flex items-center gap-1">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}</div>
                                </th>
                                <th className="px-6 py-4 font-semibold text-slate-600 dark:text-slate-300 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {paginatedDepartments.map((dept) => (
                                    <motion.tr
                                        key={dept.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="border-b border-slate-50 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                    <Building2 size={20} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 dark:text-slate-100">{dept.name}</p>
                                                    <p className="text-xs text-slate-500">{dept.code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                                            {dept.hod}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-4 text-xs text-slate-500">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{dept.professors}</span>
                                                    Professors
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-slate-700 dark:text-slate-300 text-sm">{dept.students}</span>
                                                    Students
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={clsx(
                                                "px-3 py-1 text-xs font-semibold rounded-full border",
                                                dept.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20" : "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                                            )}>
                                                {dept.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                                <button onClick={() => handleViewClick(dept)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition"><Eye size={18} /></button>
                                                <button onClick={() => handleEditClick(dept)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-500/10 rounded-lg transition"><Edit size={18} /></button>
                                                <button onClick={() => handleDeleteClick(dept.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {paginatedDepartments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-20 text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <Search size={48} className="text-slate-300 mb-4" />
                                                <p>No departments found matching your criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 bg-slate-50/30 dark:bg-slate-800/20">
                    <p>Showing {processedDepartments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedDepartments.length)} of {processedDepartments.length} entries</p>
                    <div className="flex gap-1 items-center">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"><ChevronLeft size={16} /></button>
                        <span className="px-3 font-semibold text-slate-700 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 dark:border-slate-800">
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">{isEditMode ? 'Edit Department' : 'Add New Department'}</h2>
                            <form onSubmit={handleSaveDepartment}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Department Name <span className="text-red-500">*</span></label>
                                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Computer Science" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Code <span className="text-red-500">*</span></label>
                                            <input required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. CSE" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50 outline-none">
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Professors Count</label>
                                            <input value={formData.professors} onChange={e => setFormData({ ...formData, professors: parseInt(e.target.value) || 0 })} type="number" min="0" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Students Count</label>
                                            <input value={formData.students} onChange={e => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })} type="number" min="0" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1 text-slate-700 dark:text-slate-300">Head of Department (HOD) <span className="text-red-500">*</span></label>
                                        <input required value={formData.hod} onChange={e => setFormData({ ...formData, hod: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. Dr. Ramesh" />
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button type="button" disabled={isSaving} onClick={() => setIsAddModalOpen(false)} className="px-5 py-2.5 rounded-xl text-slate-600 border border-transparent hover:border-slate-200 font-medium transition disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex justify-center items-center gap-2 min-w-[140px] px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:bg-blue-400">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Saving...' : (isEditMode ? 'Update Department' : 'Save Department')}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* View Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedDept && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsViewModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-100 dark:border-slate-800 text-center">
                            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
                                <X size={20} />
                            </button>
                            <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-4">
                                <Building2 size={32} />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{selectedDept.name}</h2>
                            <p className="text-blue-600 font-bold text-sm mb-6">{selectedDept.code}</p>

                            <div className="text-left space-y-3 mb-6 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700">
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">HOD</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDept.hod}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">Professors</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDept.professors}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-500 text-sm">Students</span>
                                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedDept.students}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-200 dark:border-slate-700 pt-3 mt-3">
                                    <span className="text-slate-500 text-sm">Status</span>
                                    <span className={clsx("px-2.5 py-0.5 text-xs font-semibold rounded-full", selectedDept.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700")}>{selectedDept.status}</span>
                                </div>
                            </div>

                            <button onClick={() => setIsViewModalOpen(false)} className="w-full px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 font-semibold hover:bg-slate-200 transition">Close</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
