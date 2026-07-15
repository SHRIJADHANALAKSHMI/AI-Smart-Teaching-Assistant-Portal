import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCircle, MapPin, Globe, Phone, Mail, Award, CheckCircle, Edit, X, Loader2, Building } from "lucide-react";
import toast from "react-hot-toast";
import clsx from "clsx";
import { useCollegeAdmin } from "../../context/CollegeAdminContext";

export default function CollegeProfile() {
    const { profile, updateProfile } = useCollegeAdmin();

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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto space-y-6 pb-12 relative w-full">

            {/* Cover Profile Header */}
            <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] overflow-hidden group">
                <div className="h-[220px] bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 relative">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <button className="absolute top-6 right-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-colors flex items-center gap-2 cursor-pointer shadow-sm">
                        <Edit size={16} /> Edit Cover
                    </button>
                </div>

                <div className="px-8 pb-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-20 relative z-10 text-center sm:text-left">
                    <div className="w-[140px] h-[140px] bg-white rounded-[24px] p-2.5 shadow-md border border-slate-100 shrink-0 mx-auto sm:mx-0">
                        <div className="w-full h-full bg-emerald-50 rounded-[16px] flex items-center justify-center text-emerald-600 border border-emerald-100/50">
                            <Building size={64} strokeWidth={1.5} />
                        </div>
                    </div>
                    <div className="flex-1 pb-2">
                        <h1 className="text-[28px] font-extrabold text-slate-900 mb-2 tracking-tight">{currentProfile.name}</h1>
                        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-5 gap-y-2 text-[14px] font-bold text-slate-500">
                            <span className="flex items-center gap-1.5"><MapPin size={16} className="text-slate-400" /> {currentProfile.location}</span>
                            <span className="flex items-center gap-1.5"><Globe size={16} className="text-slate-400" /> {currentProfile.website}</span>
                            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-1.5 text-[11px] uppercase tracking-widest border border-emerald-100"><CheckCircle size={14} /> Verified</span>
                        </div>
                    </div>
                    <button onClick={handleEditProfile} className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 text-white px-6 py-3.5 rounded-[16px] font-bold shadow-md transition-all outline-none mt-4 sm:mt-0">
                        Edit Profile
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Info Card */}
                <div className="md:col-span-2 bg-white p-8 sm:p-10 rounded-[24px] shadow-sm border border-[#E5E7EB] space-y-8">
                    <h3 className="text-[20px] font-extrabold text-slate-900 border-b border-slate-100 pb-5">General Information</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-6">
                        <div className="bg-slate-50 p-5 rounded-[16px] border border-slate-100">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">College Code</p>
                            <p className="font-extrabold text-[16px] text-slate-800">{currentProfile.code}</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-[16px] border border-slate-100">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2">Founded</p>
                            <p className="font-extrabold text-[16px] text-slate-800">{currentProfile.founded}</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-[16px] border border-slate-100">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Mail size={14} className="text-emerald-500" /> Primary Email</p>
                            <p className="font-extrabold text-[16px] text-slate-800">{currentProfile.email}</p>
                        </div>
                        <div className="bg-slate-50 p-5 rounded-[16px] border border-slate-100">
                            <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5"><Phone size={14} className="text-emerald-500" /> Primary Phone</p>
                            <p className="font-extrabold text-[16px] text-slate-800">{currentProfile.phone}</p>
                        </div>
                    </div>
                </div>

                {/* Status / Plan Card */}
                <div className="space-y-6">
                    <div className="bg-orange-50 p-8 rounded-[24px] border border-orange-100 relative overflow-hidden group">
                        <h3 className="font-bold text-[14px] text-orange-600 uppercase tracking-widest flex items-center gap-2 mb-4">
                            <Award size={18} /> Accreditation
                        </h3>
                        <p className="text-[28px] font-extrabold text-orange-700 relative z-10">{currentProfile.accreditation}</p>
                        <div className="absolute -right-4 -bottom-4 text-orange-200/50 group-hover:scale-110 transition-transform duration-500"><Award size={120} /></div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[24px] relative overflow-hidden shadow-xl border border-slate-800">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-[40px]" />
                        <h3 className="font-bold text-slate-400 text-[12px] tracking-widest uppercase mb-1">Current Plan</h3>
                        <p className="text-[22px] font-extrabold mb-8 text-white">{currentProfile.plan}</p>

                        <button className="w-full bg-white/10 hover:bg-white/20 border border-white/10 py-3.5 rounded-[16px] font-bold text-white transition-colors cursor-pointer text-[14px]">
                            Manage Billing
                        </button>
                    </div>
                </div>
            </div>

            {/* Profile Edit Modal */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsEditModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ scale: 0.95, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 10 }} className="relative bg-white rounded-[24px] p-8 md:p-10 max-w-2xl w-full shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto custom-scrollbar">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-full transition-colors">
                                <X size={20} />
                            </button>
                            <h2 className="text-2xl font-extrabold mb-8 text-slate-900 tracking-tight">Edit College Profile</h2>
                            <form onSubmit={handleSaveProfile} className="space-y-5 text-left">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField id="cp-name" label="College Name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                    <InputField id="cp-code" label="College Code" required value={formData.code} onChange={e => setFormData({ ...formData, code: e.target.value })} />
                                </div>
                                <InputField id="cp-location" label="Location" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <InputField id="cp-email" label="Primary Email" type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
                                    <InputField id="cp-phone" label="Primary Phone" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                    <InputField id="cp-website" label="Website" value={formData.website} onChange={e => setFormData({ ...formData, website: e.target.value })} />
                                    <InputField id="cp-accreditation" label="Accreditation" value={formData.accreditation} onChange={e => setFormData({ ...formData, accreditation: e.target.value })} />
                                    <InputField id="cp-founded" label="Founded" type="number" value={formData.founded} onChange={e => setFormData({ ...formData, founded: Number(e.target.value) })} />
                                </div>

                                <div className="mt-10 flex justify-end gap-4 pt-4 border-t border-slate-100">
                                    <button type="button" disabled={isSaving} onClick={() => setIsEditModalOpen(false)} className="px-6 py-3 rounded-[16px] text-slate-600 border border-slate-200 hover:bg-slate-50 font-bold transition-colors disabled:opacity-50">Cancel</button>
                                    <button type="submit" disabled={isSaving} className="flex justify-center items-center gap-2 min-w-[160px] px-6 py-3 rounded-[16px] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold shadow-md hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
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
