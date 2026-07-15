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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12 w-full">

            {/* Header section */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-emerald-50 rounded-[12px]">
                            <Building className="text-emerald-600" size={28} />
                        </div>
                        Departments
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Manage {departments.length} active departments across the college.</p>
                </div>
                <button onClick={handleAddClick} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3.5 rounded-[16px] font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none">
                    <Plus size={20} strokeWidth={2.5} /> Add Department
                </button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search departments by name, code or HOD..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full bg-white border border-[#E5E7EB] rounded-[16px] pl-11 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm transition-all text-[15px] font-medium placeholder-slate-400 text-slate-800"
                    />
                </div>
                <button className="flex items-center gap-2 bg-white border border-[#E5E7EB] text-slate-600 px-6 py-3 rounded-[16px] hover:bg-slate-50 hover:text-slate-900 transition-colors font-bold shadow-sm">
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Table view */}
            <div className="bg-white rounded-[24px] shadow-[0_2px_12px_rgba(0,0,0,0.02)] border border-[#E5E7EB] overflow-hidden">
                <div className="overflow-x-auto min-h-[400px]">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-[#F8FAFC] border-b border-slate-100">
                                <th onClick={() => handleSort('name')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">Department {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                </th>
                                <th onClick={() => handleSort('hod')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">Head of Department {sortConfig.key === 'hod' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                </th>
                                <th className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider whitespace-nowrap">Stats</th>
                                <th onClick={() => handleSort('status')} className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition whitespace-nowrap">
                                    <div className="flex items-center gap-1.5">Status {sortConfig.key === 'status' && (sortConfig.direction === 'asc' ? <ChevronUp size={14} className="text-emerald-500" /> : <ChevronDown size={14} className="text-emerald-500" />)}</div>
                                </th>
                                <th className="px-8 py-5 font-bold text-slate-500 text-[12px] uppercase tracking-wider text-right whitespace-nowrap">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <AnimatePresence mode="popLayout">
                                {paginatedDepartments.map((dept, idx) => (
                                    <motion.tr
                                        key={dept.id}
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: idx * 0.05 }}
                                        className={clsx(
                                            "border-b border-slate-50 hover:bg-[#F8FAFC] transition-colors group",
                                            idx % 2 === 0 ? "bg-white" : "bg-slate-50/30"
                                        )}
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-[14px] bg-emerald-50 flex items-center justify-center text-emerald-600 shrink-0">
                                                    <Building2 size={24} />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 text-[15px]">{dept.name}</p>
                                                    <p className="text-[12px] font-semibold text-slate-400 tracking-wider mt-0.5">{dept.code}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-[14px] font-medium text-slate-700">
                                            <div className="flex items-center gap-2">
                                                <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                                                    {dept.hod.charAt(0)}
                                                </div>
                                                <span>{dept.hod}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex gap-6 text-[11px] font-semibold tracking-wide text-slate-400 uppercase">
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-extrabold text-slate-800 text-[15px] leading-tight">{dept.professors}</span>
                                                    Professors
                                                </div>
                                                <div className="flex flex-col gap-0.5">
                                                    <span className="font-extrabold text-slate-800 text-[15px] leading-tight">{dept.students}</span>
                                                    Students
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <span className={clsx(
                                                "px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-[8px] border",
                                                dept.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"
                                            )}>
                                                {dept.status}
                                            </span>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                                <button onClick={() => handleViewClick(dept)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition"><Eye size={18} /></button>
                                                <button onClick={() => handleEditClick(dept)} className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-xl transition"><Edit size={18} /></button>
                                                <button onClick={() => handleDeleteClick(dept.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition"><Trash2 size={18} /></button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                                {paginatedDepartments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="text-center py-24 text-slate-500">
                                            <div className="flex flex-col items-center justify-center">
                                                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                                                    <Search size={32} className="text-slate-300" />
                                                </div>
                                                <p className="font-medium text-slate-600">No departments found matching your criteria.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="p-5 border-t border-slate-100 flex items-center justify-between text-sm text-slate-500 bg-[#F8FAFC]">
                    <p className="font-medium text-slate-400">Showing {processedDepartments.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedDepartments.length)} of {processedDepartments.length} entries</p>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                        <span className="px-2 font-bold text-slate-700">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>

            {/* Add/Edit Modal */}
            <AnimatePresence>
                {isAddModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white rounded-[24px] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-slate-100">
                            <button onClick={() => setIsAddModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-8 text-slate-900 tracking-tight">{isEditMode ? 'Edit Department' : 'Add New Department'}</h2>
                            <form onSubmit={handleSaveDepartment}>
                                <div className="space-y-5">

                                    <InputField id="d-name" label="Department Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />

                                    <div className="grid grid-cols-2 gap-5">
                                        <InputField id="d-code" label="Code" required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />

                                        <div className="relative group flex flex-col">
                                            <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium font-sans appearance-none cursor-pointer">
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-5">
                                        <InputField id="d-prof" label="Professors Count" type="number" value={formData.professors} onChange={e => setFormData({ ...formData, professors: parseInt(e.target.value) || 0 })} />
                                        <InputField id="d-student" label="Students Count" type="number" value={formData.students} onChange={e => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })} />
                                    </div>

                                    <InputField id="d-hod" label="Head of Department (HOD)" required value={formData.hod} onChange={e => setFormData({ ...formData, hod: e.target.value })} />

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

            {/* View Modal */}
            <AnimatePresence>
                {isViewModalOpen && selectedDept && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsViewModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white rounded-[24px] p-10 max-w-sm w-full shadow-2xl border border-slate-100 text-center">
                            <button onClick={() => setIsViewModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                            <div className="w-24 h-24 rounded-[20px] bg-emerald-50 flex items-center justify-center text-emerald-600 mx-auto mb-6 shadow-sm border border-emerald-100/50">
                                <Building2 size={40} />
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-900 mb-1">{selectedDept.name}</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-widest text-[13px] mb-8">{selectedDept.code}</p>

                            <div className="text-left space-y-4 mb-8 p-5 bg-[#F8FAFC] rounded-[20px] border border-slate-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-[13px] font-bold uppercase tracking-wider">HOD</span>
                                    <span className="font-bold text-slate-800">{selectedDept.hod}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-[13px] font-bold uppercase tracking-wider">Professors</span>
                                    <span className="font-bold text-slate-800 px-3 py-1 bg-purple-50 text-purple-700 rounded-lg">{selectedDept.professors}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-500 text-[13px] font-bold uppercase tracking-wider">Students</span>
                                    <span className="font-bold text-slate-800 px-3 py-1 bg-orange-50 text-orange-700 rounded-lg">{selectedDept.students}</span>
                                </div>
                                <div className="flex justify-between items-center border-t border-slate-200 pt-4 mt-4">
                                    <span className="text-slate-500 text-[13px] font-bold uppercase tracking-wider">Status</span>
                                    <span className={clsx("px-3 py-1 text-[11px] font-bold uppercase tracking-widest rounded-full border", selectedDept.status === "Active" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200")}>{selectedDept.status}</span>
                                </div>
                            </div>

                            <button onClick={() => setIsViewModalOpen(false)} className="w-full px-6 py-3.5 rounded-[16px] bg-slate-50 text-slate-700 border border-slate-200 font-bold hover:bg-slate-100 transition-colors">Close Details</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
