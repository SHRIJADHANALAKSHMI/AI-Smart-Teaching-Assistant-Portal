import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Bell, Palette, Database, Key, CheckCircle, Smartphone, Mail, Lock, Loader2, AlertTriangle } from "lucide-react";
import clsx from "clsx";
import toast from "react-hot-toast";

export default function Settings() {
    const [activeTab, setActiveTab] = useState("general");
    const [isSaving, setIsSaving] = useState(false);

    const tabs = [
        { id: "general", label: "General", icon: Palette },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "data", label: "Data & Backup", icon: Database },
    ];

    const handleSave = () => {
        setIsSaving(true);
        // Simulate network save
        setTimeout(() => {
            toast.success("Settings saved successfully!");
            setIsSaving(false);
        }, 800);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto pb-12 w-full">

            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-8 rounded-[24px] shadow-sm border border-[#E5E7EB] mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3 tracking-tight">
                        <div className="p-2.5 bg-purple-50 rounded-[12px]">
                            <Shield className="text-purple-600" size={28} />
                        </div>
                        System Settings
                    </h1>
                    <p className="text-slate-500 font-medium mt-2">Manage global configurations and preferences for the College Admin Portal.</p>
                </div>
            </div>

            <div className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-2.5 mb-6 inline-flex w-full overflow-x-auto custom-scrollbar">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-[16px] text-[14px] font-bold transition-all relative whitespace-nowrap outline-none",
                                isActive ? "text-emerald-700" : "text-slate-500 hover:text-emerald-600 hover:bg-slate-50"
                            )}
                        >
                            {isActive && (
                                <motion.div layoutId="settingTab" className="absolute inset-0 bg-emerald-50 rounded-[16px] border border-emerald-100" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                            )}
                            <Icon size={18} className="relative z-10" />
                            <span className="relative z-10">{tab.label}</span>
                        </button>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="bg-white rounded-[24px] shadow-sm border border-[#E5E7EB] p-8 md:p-10 space-y-8"
                >
                    {activeTab === "general" && (
                        <div className="max-w-2xl">
                            <h2 className="text-[20px] font-extrabold mb-8 text-slate-900 border-b border-slate-100 pb-4">General Configuration</h2>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[13px] font-bold tracking-wider uppercase mb-2 text-slate-400">Display Name</label>
                                    <input type="text" defaultValue="College Admin" className="w-full font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div>
                                    <label className="block text-[13px] font-bold tracking-wider uppercase mb-3 text-slate-400">Theme Preference</label>
                                    <div className="flex gap-4">
                                        {[{ name: "Light", active: true }, { name: "Dark", active: false }, { name: "System", active: false }].map(theme => (
                                            <button key={theme.name} className={clsx("flex-1 py-3.5 border rounded-[16px] font-bold text-[14px] transition-all shadow-sm", theme.active ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-slate-200 text-slate-500 hover:bg-slate-50")}>
                                                {theme.name}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-[12px] text-slate-400 font-medium mt-3">The application is currently heavily optimized for the "Light" Enterprise theme.</p>
                                </div>
                                <div className="pt-6 border-t border-slate-100">
                                    <label className="flex items-center gap-4 cursor-pointer group">
                                        <div className="relative">
                                            <input type="checkbox" defaultChecked className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500" />
                                        </div>
                                        <div>
                                            <span className="font-extrabold text-[14px] text-slate-800 tracking-tight">Enable Analytics Tracking</span>
                                            <p className="text-[12px] font-medium text-slate-400 mt-0.5">Collect anonymous usage metrics for platform stability reports.</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="max-w-2xl">
                            <h2 className="text-[20px] font-extrabold mb-8 text-slate-900 border-b border-slate-100 pb-4">Security & Access</h2>
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[13px] font-bold tracking-wider uppercase mb-2 text-slate-400">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" />
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-[13px] font-bold tracking-wider uppercase mb-2 text-slate-400">New Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" />
                                    </div>
                                    <div>
                                        <label className="block text-[13px] font-bold tracking-wider uppercase mb-2 text-slate-400">Confirm Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full font-bold text-slate-800 bg-slate-50 border border-slate-200 rounded-[16px] px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white transition-all shadow-sm" />
                                    </div>
                                </div>
                                <div className="pt-8 border-t border-slate-100">
                                    <h3 className="font-extrabold text-[15px] text-slate-900 mb-4 flex items-center gap-2"><Lock size={18} className="text-emerald-600" /> Two-Factor Authentication (2FA)</h3>
                                    <div className="flex items-center justify-between p-5 bg-[#F8FAFC] rounded-[16px] border border-slate-200">
                                        <div>
                                            <p className="font-extrabold text-[14px] text-slate-800">Authenticator App</p>
                                            <p className="text-[12px] font-medium text-slate-500 mt-1">Not configured</p>
                                        </div>
                                        <button className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-[12px] text-[13px] font-bold text-slate-600 hover:text-emerald-600 hover:border-emerald-200 hover:bg-emerald-50 transition-colors">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="max-w-2xl">
                            <h2 className="text-[20px] font-extrabold mb-8 text-slate-900 border-b border-slate-100 pb-4">Notification Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Push Notifications", desc: "Receive real-time alerts in your browser window.", icon: Bell, defaultChecked: true },
                                    { title: "Email Summaries", desc: "Receive automated weekly usage report summaries to your inbox.", icon: Mail, defaultChecked: true },
                                    { title: "Mobile Alerts", desc: "Critical alerts sent to registered mobile device.", icon: Smartphone, defaultChecked: false }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-5 bg-[#F8FAFC] rounded-[20px] border border-slate-200 hover:border-emerald-200 transition-colors group">
                                        <div className="flex gap-4">
                                            <div className="p-2 bg-white rounded-[12px] shadow-sm border border-slate-100 h-fit">
                                                <item.icon size={20} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                                            </div>
                                            <div>
                                                <p className="font-extrabold text-[14px] text-slate-900">{item.title}</p>
                                                <p className="text-[12px] font-medium text-slate-500 mt-1">{item.desc}</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "data" && (
                        <div className="max-w-2xl">
                            <h2 className="text-[20px] font-extrabold mb-8 text-slate-900 border-b border-slate-100 pb-4">Data & Backend Configuration</h2>
                            <div className="space-y-6">
                                <div className="bg-emerald-50 p-5 rounded-[20px] border border-emerald-100 flex items-start gap-4 transform transition hover:-translate-y-1 hover:shadow-md cursor-default">
                                    <div className="p-2 bg-white rounded-full shadow-sm">
                                        <CheckCircle size={20} className="text-emerald-500" />
                                    </div>
                                    <div className="pt-0.5">
                                        <h4 className="font-extrabold text-[15px] text-emerald-800">Enterprise Database Stable</h4>
                                        <p className="text-[13px] font-medium text-emerald-600 mt-1 leading-relaxed">MongoDB cluster is fully operational ensuring 99.9% uptime compliance.</p>
                                    </div>
                                </div>
                                <div className="p-6 bg-white border border-slate-200 rounded-[20px] space-y-5 shadow-sm">
                                    <div>
                                        <h3 className="font-extrabold text-[15px] text-slate-900">Automated Server Backups</h3>
                                        <p className="text-[13px] font-medium text-slate-500 mt-1">Backups are automatically taken at 00:00 every day securely on S3.</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="px-5 py-2.5 bg-white border border-slate-200 shadow-sm rounded-[12px] text-[13px] font-bold text-slate-600 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 transition-colors">Export All Data</button>
                                        <button className="px-5 py-2.5 bg-slate-900 text-white rounded-[12px] text-[13px] font-bold hover:bg-slate-800 shadow-md transition-colors">Trigger Manual Backup</button>
                                    </div>
                                </div>
                                <div className="pt-2">
                                    <div className="flex justify-between items-center bg-rose-50 p-6 rounded-[20px] border border-rose-100">
                                        <div>
                                            <p className="font-extrabold text-[15px] text-rose-800 flex items-center gap-2"><AlertTriangle size={16} /> Danger Zone</p>
                                            <p className="text-[13px] font-medium text-rose-600 mt-1">Permanently flush historical session logs. This action is irreversible.</p>
                                        </div>
                                        <button className="px-5 py-3 bg-white border border-rose-200 text-rose-600 font-bold rounded-[12px] text-[13px] hover:bg-rose-600 hover:text-white shadow-sm transition-colors">Flush Logs</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-8 mt-8 border-t border-slate-100 flex flex-col-reverse sm:flex-row justify-end gap-3">
                        <button className="px-8 py-3.5 w-full sm:w-auto rounded-[16px] text-[14px] font-bold text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors text-center">Cancel changes</button>
                        <button disabled={isSaving} onClick={handleSave} className="flex gap-2 w-full sm:w-auto items-center min-w-[160px] justify-center px-8 py-3.5 rounded-[16px] text-[14px] font-bold bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-md hover:shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 transition-all outline-none disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none">
                            {isSaving && <Loader2 size={16} className="animate-spin" />}
                            {isSaving ? "Saving..." : "Save Settings"}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
