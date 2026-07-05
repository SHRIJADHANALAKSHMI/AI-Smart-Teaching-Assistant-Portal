import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Bell, Palette, Database, Key, CheckCircle, Smartphone, Mail, Lock, Loader2 } from "lucide-react";
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto pb-12">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                    <Shield className="text-blue-500" /> System Settings
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage global configurations for the College Admin Portal.</p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-2 mb-6 inline-flex w-full overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={clsx(
                                "flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-sm font-semibold transition-all relative whitespace-nowrap",
                                isActive ? "text-blue-700 dark:text-blue-300" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {isActive && (
                                <motion.div layoutId="settingTab" className="absolute inset-0 bg-blue-50 dark:bg-blue-500/20 rounded-2xl shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-8 space-y-8"
                >
                    {activeTab === "general" && (
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">General Settings</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Display Name</label>
                                    <input type="text" defaultValue="College Admin" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500/50" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold mb-2">Theme Preference</label>
                                    <div className="flex gap-4">
                                        {["Light", "Dark", "System"].map(theme => (
                                            <button key={theme} className={clsx("flex-1 py-3 border rounded-xl font-medium text-sm transition-all", theme === "Light" ? "border-blue-500 bg-blue-50/50 text-blue-700" : "border-slate-200 text-slate-600 hover:bg-slate-50")}>
                                                {theme}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input type="checkbox" defaultChecked className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 bg-slate-100 border-slate-300" />
                                        <span className="font-semibold text-sm">Enable Analytics Tracking</span>
                                    </label>
                                    <p className="text-xs text-slate-500 ml-8 mt-1">Allow system to collect anonymous usage metrics for performance reporting.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "security" && (
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Security & Access</h2>
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold mb-2 flex justify-between">
                                        Current Password
                                    </label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">New Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold mb-2">Confirm Password</label>
                                        <input type="password" placeholder="••••••••" className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500/50 text-slate-500" />
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
                                    <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2"><Lock size={18} /> Two-Factor Authentication (2FA)</h3>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div>
                                            <p className="font-semibold text-sm">Authenticator App</p>
                                            <p className="text-xs text-slate-500">Not configured</p>
                                        </div>
                                        <button className="px-4 py-2 bg-white border shadow-sm rounded-lg text-sm font-semibold hover:bg-slate-50">Enable 2FA</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "notifications" && (
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Notification Preferences</h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Push Notifications", desc: "Receive real-time alerts in your browser window.", icon: Bell, defaultChecked: true },
                                    { title: "Email Summaries", desc: "Receive automated weekly usage report summaries to your inbox.", icon: Mail, defaultChecked: true },
                                    { title: "Mobile Alerts", desc: "Critical alerts sent to registered mobile device.", icon: Smartphone, defaultChecked: false }
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700">
                                        <div className="flex gap-3">
                                            <item.icon size={20} className="text-slate-400 mt-1" />
                                            <div>
                                                <p className="font-bold text-sm text-slate-800 dark:text-slate-200">{item.title}</p>
                                                <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                                            </div>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" defaultChecked={item.defaultChecked} className="sr-only peer" />
                                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "data" && (
                        <div className="max-w-2xl">
                            <h2 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Data & Backend Configuration</h2>
                            <div className="space-y-6">
                                <div className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-xl border border-blue-100 dark:border-blue-500/20 flex gap-4 transform transition hover:-translate-y-1 hover:shadow-md cursor-default">
                                    <div className="text-blue-500 mt-1"><CheckCircle size={20} /></div>
                                    <div>
                                        <h4 className="font-bold text-blue-800 dark:text-blue-400">Enterprise Database Stable</h4>
                                        <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">MongoDB cluster is fully operational with 99.9% uptime this month.</p>
                                    </div>
                                </div>
                                <div className="p-5 border border-slate-200 dark:border-slate-700 rounded-xl space-y-4">
                                    <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Automated Backups</h3>
                                    <p className="text-xs text-slate-500">Backups are automatically taken at 00:00 every day.</p>
                                    <div className="flex gap-3">
                                        <button className="px-4 py-2 border shadow-sm rounded-lg text-sm font-semibold hover:bg-slate-50 text-slate-700">Export All Data</button>
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md transition-colors">Trigger Manual Backup</button>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-red-100 flex justify-between items-center bg-red-50 p-4 rounded-xl">
                                    <div>
                                        <p className="font-bold text-red-800 text-sm">Danger Zone</p>
                                        <p className="text-xs text-red-600">Permanently flush historical logs (irreversible).</p>
                                    </div>
                                    <button className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg text-sm hover:bg-red-700 shadow-sm transition">Flush Logs</button>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                        <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 transition">Cancel</button>
                        <button disabled={isSaving} onClick={handleSave} className="flex gap-2 items-center min-w-[140px] justify-center px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50">
                            {isSaving && <Loader2 size={16} className="animate-spin" />}
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
}
