import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, MapPin, Globe, Phone, Mail, Award, CheckCircle, Edit, X, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function CollegeProfile() {
    const { profile, updateProfile } = useCollegeAdmin();

    // Add fallback for initial mount before context gives default if something happens
    const currentProfile = profile || {
        name: "Institution Name",
        code: "INST",
        location: "Location",
        website: "www.website.com",
        phone: "+00 000 000 0000",
        email: "contact@institution.edu",
        accreditation: "N/A",
        plan: "Enterprise ERP Plan",
        founded: 2000
    };

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [formData, setFormData] = useState(currentProfile);
    const [isSaving, setIsSaving] = useState(false);

    const handleEditProfile = () => {
        setFormData(currentProfile);
        setIsEditModalOpen(true);
    };

    const handleSaveProfile = (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email) {
            toast.error("Please explicitly fill the required names.");
            return;
        }

        setIsSaving(true);
        setTimeout(() => {
            updateProfile(formData);
            toast.success("College Profile updated successfully!");
            setIsSaving(false);
            setIsEditModalOpen(false);
        }, 600);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6 pb-12 relative">

            {/* Cover Profile Header */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
                <div className="h-48 bg-gradient-to-r from-slate-800 via-slate-700 to-blue-900 relative">
                    <div className="absolute inset-0 bg-black/10" />
                    <button className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-xl text-sm font-semibold transition flex items-center gap-2 cursor-pointer">
                        <Edit size={14} /> Edit Cover
                    </button>
                </div>

                <div className="px-8 pb-8 flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative z-10 text-center sm:text-left">
                    <div className="w-32 h-32 bg-white dark:bg-slate-800 rounded-2xl p-2 shadow-xl border border-slate-100 dark:border-slate-700 shrink-0">
                        <div className="w-full h-full bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <UserCircle size={64} />
                        </div>
                    </div>
                    <div className="flex-1 pb-2">
                        <h1 className="text-3xl font-extrabold text-slate-800 dark:text-white mb-2">{currentProfile.name}</h1>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-sm font-medium text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1"><MapPin size={16} /> {currentProfile.location}</span>
                            <span className="flex items-center gap-1"><Globe size={16} /> {currentProfile.website}</span>
                            <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 px-2.5 py-0.5 rounded-full flex items-center gap-1 text-xs"><CheckCircle size={12} /> Verified</span>
                        </div>
                    </div>
                    <button onClick={handleEditProfile} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold shadow-md shadow-blue-500/20 transition-colors mb-2 cursor-pointer">
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Info Card */}
                <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 space-y-8">
                    <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">General Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase mb-1">College Code</p>
                            <p className="font-medium text-slate-800 dark:text-slate-200">{currentProfile.code}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase mb-1">Founded</p>
                            <p className="font-medium text-slate-800 dark:text-slate-200">{currentProfile.founded}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase mb-1 flex items-center gap-1.5"><Mail size={14} /> Primary Email</p>
                            <p className="font-medium text-slate-800 dark:text-slate-200">{currentProfile.email}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 font-semibold uppercase mb-1 flex items-center gap-1.5"><Phone size={14} /> Primary Phone</p>
                            <p className="font-medium text-slate-800 dark:text-slate-200">{currentProfile.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Status / Plan Card */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10 p-6 rounded-3xl border border-emerald-100 dark:border-emerald-800/20 relative overflow-hidden">
                        <h3 className="font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-4">
                            <Award className="text-emerald-600 dark:text-emerald-400" /> Accreditation
                        </h3>
                        <p className="text-3xl font-extrabold text-emerald-700 dark:text-emerald-400 relative z-10">{currentProfile.accreditation}</p>
                        <div className="absolute -right-4 -bottom-4 text-emerald-200 dark:text-emerald-500/10"><Award size={100} /></div>
                    </div>

                    <div className="bg-slate-900 dark:bg-slate-800 p-6 rounded-3xl text-white relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl" />
                        <h3 className="font-bold text-blue-300 text-sm tracking-wide uppercase mb-1">Current Plan</h3>
                        <p className="text-2xl font-bold mb-6 text-white">{currentProfile.plan}</p>

                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 rounded-xl font-medium transition-colors cursor-pointer">
                            Manage Billing
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 max-w-2xl w-full shadow-2xl border border-slate-100 dark:border-slate-800 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Edit College Profile</h2>
                            <form onSubmit={handleSaveProfile} className="space-y-4 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">College Name <span className="text-red-500">*</span></label>
                                        <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">College Code</label>
                                        <input required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Location</label>
                                    <input value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Primary Email <span className="text-red-500">*</span></label>
                                        <input required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} type="email" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Primary Phone</label>
                                        <input value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Website</label>
                                        <input value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Accreditation</label>
                                        <input value={formData.accreditation} onChange={e => setFormData({ ...formData, accreditation: e.target.value })} type="text" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-1 text-slate-700 dark:text-slate-300">Founded</label>
                                        <input value={formData.founded} onChange={e => setFormData({ ...formData, founded: Number(e.target.value) })} type="number" className="w-full bg-slate-50 dark:bg-slate-800 border bg-transparent border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end gap-3 pt-4">
                                    <button type="button" disabled={isSaving} onClick={() => setIsEditModalOpen(false)} className="px-5 py-2.5 rounded-xl text-slate-600 border border-transparent hover:border-slate-200 font-medium transition disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex items-center justify-center gap-2 min-w-[140px] px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:bg-blue-400">
                                        {isSaving && <Loader2 size={16} className="animate-spin" />}
                                        {isSaving ? 'Saving...' : 'Update Details'}
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
