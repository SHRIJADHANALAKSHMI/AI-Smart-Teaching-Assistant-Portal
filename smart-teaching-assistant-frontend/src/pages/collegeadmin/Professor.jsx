import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, GraduationCap, Mail, Phone, ExternalLink, Edit, Trash2, X, ChevronDown, ChevronLeft, ChevronRight, Loader2, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function Professor() {
    const { professors, addProfessor, updateProfessor, deleteProfessor, departments } = useCollegeAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "", phone: "", department: "", status: "Active" });
    const [isEditMode, setIsEditMode] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Sorting & Pagination States
    const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    // Derived Data
    const processedProfessors = useMemo(() => {
        let filtered = professors.filter(p =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });

        return filtered;
    }, [professors, searchTerm, sortConfig]);

    const totalPages = Math.ceil(processedProfessors.length / itemsPerPage) || 1;
    const paginatedProfessors = processedProfessors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleInviteClick = () => {
        setFormData({ name: "", email: "", phone: "", department: "", status: "Active" });
        setIsEditMode(false);
        setIsModalOpen(true);
    };

    const handleEditClick = (prof) => {
        setFormData(prof);
        setIsEditMode(true);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (id) => {
        if (window.confirm("Are you sure you want to remove this professor?")) {
            deleteProfessor(id);
            toast.success("Professor removed successfully!");
        }
    };

    const handleViewProfileClick = (name) => {
        toast("Viewing profile of " + name, { icon: "👤" });
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.department) {
            toast.error("Please fill required fields.");
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            if (isEditMode) {
                updateProfessor(formData);
                toast.success("Professor details updated!");
            } else {
                const newProf = {
                    ...formData,
                    id: Date.now(),
                    subjects: ["Assign a subject"],
                    performance: "5.0",
                    avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}`
                };
                addProfessor(newProf);
                toast.success("Professor invited successfully!");
            }
            setIsSaving(false);
            setIsModalOpen(false);
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
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] hover:shadow-md transition-shadow">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-orange-50 rounded-[12px]">
                            <GraduationCap className="text-orange-500" size={28} />
                        </div>
                        Professors
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Manage teaching faculty and department allocations.</p>
                </div>
                <button onClick={handleInviteClick} className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-3.5 rounded-[16px] font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none shrink-0">
                    <Plus size={20} strokeWidth={2.5} /> Invite Professor
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-2">
                <div className="relative flex-1 max-w-md w-full group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                    <input type="text" placeholder="Search by name, department, or email..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white border border-[#E5E7EB] rounded-[16px] pl-11 pr-4 py-3 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 shadow-sm transition-all text-[15px] font-medium placeholder-slate-400 text-slate-800" />
                </div>
                <div className="flex gap-2 items-center">
                    <div className="relative">
                        <select value={sortConfig.key} onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })} className="bg-white border border-slate-200 text-slate-700 pr-9 pl-4 py-3 rounded-[16px] shadow-sm text-[14px] font-bold outline-none appearance-none cursor-pointer hover:bg-slate-50 transition-colors">
                            <option value="name">Sort by Name</option>
                            <option value="department">Sort by Dept</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    </div>
                    <button onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }))} className="bg-white border border-slate-200 text-slate-700 p-3 rounded-[16px] shadow-sm hover:bg-slate-50 transition">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
                    <AnimatePresence>
                        {paginatedProfessors.map((prof, idx) => (
                            <motion.div layout key={prof.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2, delay: idx * 0.05 }} className="bg-white rounded-[24px] p-7 border border-[#E5E7EB] shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all relative group h-fit overflow-hidden">

                                <div className="absolute top-0 left-0 w-full h-[60px] bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100 z-10">
                                    <button onClick={() => handleEditClick(prof)} className="p-1.5 text-slate-400 hover:text-amber-500 bg-white border border-slate-100 shadow-sm rounded-lg hover:border-amber-200 transition-all"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteClick(prof.id)} className="p-1.5 text-slate-400 hover:text-rose-600 bg-white border border-slate-100 shadow-sm rounded-lg hover:border-rose-200 transition-all"><Trash2 size={16} /></button>
                                </div>

                                <div className="flex items-start gap-5 relative z-10">
                                    <div className="relative">
                                        <div className="absolute -inset-1 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-[6px]"></div>
                                        <img src={prof.avatar} alt={prof.name} className="relative w-16 h-16 rounded-[16px] object-cover shadow-sm bg-slate-100 flex-shrink-0 border-2 border-white" />
                                    </div>
                                    <div className="flex-1 min-w-0 pr-12 pt-1">
                                        <h3 className="font-extrabold text-[17px] text-slate-900 truncate tracking-tight">{prof.name}</h3>
                                        <span className="inline-block px-2.5 py-1 rounded-[8px] bg-emerald-50 text-emerald-700 text-[11px] uppercase tracking-wider font-bold mt-1.5 border border-emerald-100">
                                            {prof.department}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-7 space-y-3 relative z-10">
                                    <div className="flex items-center gap-3 text-sm text-slate-500 group-hover:text-slate-700 transition-colors bg-white rounded-lg px-1 py-0.5">
                                        <div className="p-1.5 bg-slate-50 rounded-md">
                                            <Mail size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        <span className="truncate font-medium">{prof.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 group-hover:text-slate-700 transition-colors bg-white rounded-lg px-1 py-0.5">
                                        <div className="p-1.5 bg-slate-50 rounded-md">
                                            <Phone size={16} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                        </div>
                                        <span className="font-medium">{prof.phone || "No phone provided"}</span>
                                    </div>
                                </div>

                                <div className="mt-7 pt-5 border-t border-slate-100 grid grid-cols-2 gap-3 relative z-10">
                                    <button onClick={() => handleViewProfileClick(prof.name)} className="flex items-center justify-center gap-2 text-[13px] font-bold text-slate-600 hover:text-white bg-slate-50 hover:bg-emerald-600 py-2.5 rounded-[12px] border border-transparent hover:shadow-[0_4px_14px_rgba(16,185,129,0.3)] transition-all">
                                        <ExternalLink size={16} /> Profile
                                    </button>
                                    <div className="flex items-center justify-center gap-2 text-[13px] font-bold text-slate-600 py-2.5 rounded-[12px] bg-white border border-slate-200">
                                        <div className={`w-2 h-2 rounded-full ${prof.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} /> {prof.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Global Pagination Bar */}
            {paginatedProfessors.length > 0 && (
                <div className="flex items-center justify-between text-sm text-slate-500 bg-[#F8FAFC] p-5 rounded-[20px] border border-slate-100 mt-2">
                    <p className="font-medium">Showing {processedProfessors.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedProfessors.length)} of {processedProfessors.length} professors</p>
                    <div className="flex gap-2 items-center">
                        <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronLeft size={16} /></button>
                        <span className="px-2 font-bold text-slate-700">Page {currentPage} of {totalPages}</span>
                        <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 rounded-[10px] bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 disabled:opacity-30 transition-colors shadow-sm"><ChevronRight size={16} /></button>
                    </div>
                </div>
            )}

            {paginatedProfessors.length === 0 && (
                <div className="w-full text-center py-24 text-slate-500">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4 mx-auto">
                        <GraduationCap size={32} className="text-slate-300" />
                    </div>
                    <p className="font-medium text-slate-600">No professors found matching your search.</p>
                </div>
            )}

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white rounded-[24px] p-8 md:p-10 max-w-lg w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-8 text-slate-900 tracking-tight">{isEditMode ? 'Edit Professor Details' : 'Invite New Professor'}</h2>
                            <form onSubmit={handleSave}>
                                <div className="space-y-5">
                                    <InputField id="p-name" label="Full Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />

                                    <div className="grid grid-cols-2 gap-5">
                                        <InputField id="p-email" label="Email Address" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                        <InputField id="p-phone" label="Phone (Optional)" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
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
                                            <label className="absolute left-4 top-2 text-[11px] font-bold text-emerald-600 uppercase tracking-wider z-10">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 border border-slate-200 rounded-[16px] px-4 pt-6 pb-2 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all text-slate-800 font-medium appearance-none cursor-pointer">
                                                <option value="Active">Active</option>
                                                <option value="On Leave">On Leave</option>
                                            </select>
                                            <ChevronDown size={16} className="absolute right-4 top-1/2 mt-1 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 flex justify-end gap-4">
                                    <button type="button" disabled={isSaving} onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-[16px] text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold transition-colors disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex justify-center items-center gap-2 min-w-[160px] px-6 py-3 rounded-[16px] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Processing...' : (isEditMode ? 'Update Details' : 'Send Invite')}
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
