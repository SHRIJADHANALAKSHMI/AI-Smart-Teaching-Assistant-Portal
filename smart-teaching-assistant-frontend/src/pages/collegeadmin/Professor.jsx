import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, GraduationCap, Mail, Phone, ExternalLink, Edit, Trash2, X, ChevronDown, ChevronLeft, ChevronRight, Loader2, ChevronUp } from "lucide-react";
import toast from "react-hot-toast";
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

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <GraduationCap className="text-emerald-500" /> Professors
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage teaching faculty and department allocations.</p>
                </div>
                <button onClick={handleInviteClick} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition shadow-md font-medium text-sm">
                    <Plus size={18} /> Invite Professor
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1 max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search by name, department, or email..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 shadow-sm text-sm" />
                </div>
                <div className="flex gap-2 items-center">
                    <select value={sortConfig.key} onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 px-3 py-2.5 rounded-xl text-sm outline-none shadow-sm h-[42px]">
                        <option value="name">Sort by Name</option>
                        <option value="department">Sort by Dept</option>
                    </select>
                    <button onClick={() => setSortConfig(prev => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }))} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 p-2.5 rounded-xl shadow-sm h-[42px] hover:bg-slate-50 transition">
                        {sortConfig.direction === 'asc' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 min-h-[400px]">
                    <AnimatePresence>
                        {paginatedProfessors.map((prof) => (
                            <motion.div layout key={prof.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.2 }} className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all relative group h-fit">

                                {/* Action Buttons */}
                                <div className="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity focus-within:opacity-100">
                                    <button onClick={() => handleEditClick(prof)} className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Edit size={16} /></button>
                                    <button onClick={() => handleDeleteClick(prof.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 size={16} /></button>
                                </div>

                                <div className="flex items-start gap-4">
                                    <img src={prof.avatar} alt={prof.name} className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-slate-100 flex-shrink-0" />
                                    <div className="flex-1 min-w-0 pr-12">
                                        <h3 className="font-bold text-lg text-slate-800 dark:text-white truncate" title={prof.name}>{prof.name}</h3>
                                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-semibold mt-1">
                                            {prof.department}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-5 space-y-3">
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <Mail size={16} className="text-slate-400 shrink-0" /> <span className="truncate" title={prof.email}>{prof.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-400">
                                        <Phone size={16} className="text-slate-400 shrink-0" /> <span>{prof.phone || "No phone provided"}</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4">
                                    <button onClick={() => handleViewProfileClick(prof.name)} className="flex items-center justify-center gap-2 text-sm font-semibold text-emerald-600 hover:bg-emerald-50 py-2 rounded-xl border border-emerald-100 dark:border-emerald-500/20 transition-colors">
                                        <ExternalLink size={16} /> View Profile
                                    </button>
                                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <div className={`w-2 h-2 rounded-full ${prof.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'}`} /> {prof.status}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Global Pagination Bar */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-sm text-slate-500 mt-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm">
                <p>Showing {processedProfessors.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, processedProfessors.length)} of {processedProfessors.length} professors</p>
                <div className="flex gap-1 items-center">
                    <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"><ChevronLeft size={16} /></button>
                    <span className="px-3 font-semibold text-slate-700 dark:text-slate-300">Page {currentPage} of {totalPages}</span>
                    <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-1.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 disabled:opacity-50 transition-colors"><ChevronRight size={16} /></button>
                </div>
            </div>

            {paginatedProfessors.length === 0 && (
                <div className="w-full text-center py-12 text-slate-500 dark:text-slate-400">
                    No professors found matching your search.
                </div>
            )}

            {/* Modal Stub */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-100 dark:border-slate-800">
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">{isEditMode ? 'Edit Professor Details' : 'Invite New Professor'}</h2>
                            <form onSubmit={handleSave}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1 dark:text-slate-300">Name <span className="text-red-500">*</span></label>
                                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="e.g. Dr. Ramesh" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Email <span className="text-red-500">*</span></label>
                                            <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="prof@college.edu" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Phone</label>
                                            <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50" placeholder="+91..." />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Department <span className="text-red-500">*</span></label>
                                            <select required value={formData.department} onChange={e => setFormData({ ...formData, department: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 outline-none">
                                                <option value="" disabled>Select Dept</option>
                                                {departments.map(d => <option key={d.code} value={d.code}>{d.code}</option>)}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1 dark:text-slate-300">Status</label>
                                            <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 outline-none">
                                                <option value="Active">Active</option>
                                                <option value="On Leave">On Leave</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-8 flex justify-end gap-3">
                                    <button type="button" disabled={isSaving} onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl text-slate-600 border border-transparent hover:border-slate-200 font-medium transition disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex justify-center items-center gap-2 min-w-[140px] px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold shadow-md shadow-emerald-500/20 hover:bg-emerald-700 transition disabled:bg-emerald-400">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Sending...' : (isEditMode ? 'Update Professor' : 'Send Invite')}
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
