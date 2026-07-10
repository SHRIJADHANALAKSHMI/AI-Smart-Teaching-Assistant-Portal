import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Shield, Cpu, Bell, LayoutTemplate, LogOut, Smartphone, Check, HelpCircle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { defaultSettings } from '../../data/mock/settings';
import { useToast } from '../../context/ToastContext';
import { simulateAction } from '../../utils/simulateAction';

export default function Settings() {
    const { addToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [isSaving, setIsSaving] = useState(false);

    // Deep copy settings state so fields can be bound natively
    const [settings, setSettings] = useState(JSON.parse(JSON.stringify(defaultSettings)));

    const tabs = [
        { id: 'profile', icon: <User size={18} />, label: "Profile" },
        { id: 'account', icon: <Shield size={18} />, label: "Account" },
        { id: 'ai', icon: <Cpu size={18} />, label: "AI Settings" },
        { id: 'notifications', icon: <Bell size={18} />, label: "Notifications" },
        { id: 'appearance', icon: <LayoutTemplate size={18} />, label: "Appearance" },
        { id: 'security', icon: <Smartphone size={18} />, label: "Security" },
    ];

    const handleSave = async () => {
        setIsSaving(true);
        addToast("Saving preferences...", "info");
        await simulateAction(800);
        setIsSaving(false);
        addToast("Settings updated successfully.", "success");
    };

    const handleToggle = (category, field) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: !prev[category][field]
            }
        }));
    };

    const handleChange = (category, field, value) => {
        setSettings(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [field]: value
            }
        }));
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return (
                    <div className="space-y-6">
                        <div className="flex items-center gap-6 pb-6 border-b border-gray-100">
                            <img src={settings.profile.avatar} alt="Profile" className="w-24 h-24 rounded-full border-4 border-orange-50 bg-orange-100 object-cover" />
                            <div>
                                <Button variant="secondary" size="sm">Change Avatar</Button>
                                <p className="text-xs text-gray-500 mt-2">Recommended 256x256px JPG or PNG.</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                                <input type="text" value={settings.profile.name} onChange={(e) => handleChange('profile', 'name', e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Email Address</label>
                                <input type="email" value={settings.profile.email} onChange={(e) => handleChange('profile', 'email', e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Department</label>
                                <input type="text" value={settings.profile.department} onChange={(e) => handleChange('profile', 'department', e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Phone</label>
                                <input type="text" value={settings.profile.phone} onChange={(e) => handleChange('profile', 'phone', e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                        </div>
                    </div>
                );
            case 'ai':
                return (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700 flex items-center justify-between">
                                Preferred AI Model
                                <HelpCircle size={14} className="text-gray-400" />
                            </label>
                            <select value={settings.aiPreferences.model} onChange={(e) => handleChange('aiPreferences', 'model', e.target.value)} className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500">
                                <option value="gpt-4o">GPT-4 Omni (Recommended)</option>
                                <option value="claude-3.5">Claude 3.5 Sonnet</option>
                                <option value="gemini-1.5">Gemini 1.5 Pro</option>
                            </select>
                        </div>

                        <div className="pt-4 border-t border-gray-100 flex flex-col gap-4">
                            <h3 className="font-semibold text-gray-800">Auto-Generation Rules</h3>

                            {[
                                { k: 'autoGenerateNotes', label: 'Auto-Generate AI Notes off syllabus' },
                                { k: 'autoGenerateQuiz', label: 'Auto-Generate Quizzes instantly' },
                                { k: 'autoGeneratePPT', label: 'Auto-Generate Presentations (Beta)' },
                                { k: 'smartSuggestions', label: 'Enable Smart Analytical Suggestions' }
                            ].map((toggle) => (
                                <div key={toggle.k} className="flex items-center justify-between">
                                    <span className="text-gray-600 text-sm">{toggle.label}</span>
                                    <button
                                        onClick={() => handleToggle('aiPreferences', toggle.k)}
                                        className={`w-12 h-6 rounded-full relative transition-colors ${settings.aiPreferences[toggle.k] ? 'bg-orange-500' : 'bg-gray-200'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.aiPreferences[toggle.k] ? 'translate-x-7' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'account':
                return (
                    <div className="space-y-6">
                        <h3 className="font-semibold text-gray-800 border-b border-gray-100 pb-2">Change Password</h3>
                        <div className="space-y-4 max-w-sm">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">Current Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700">New Password</label>
                                <input type="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-1 focus:ring-orange-500" />
                            </div>
                        </div>
                        <Button variant="secondary" size="sm" onClick={() => addToast("Password reset link sent.", "success")} className="mt-4">Reset Password</Button>
                    </div>
                );
            case 'notifications':
                return (
                    <div className="space-y-6">
                        <p className="text-gray-500 text-sm mb-4">Manage how you receive alerts and summaries from the platform.</p>

                        <div className="flex flex-col gap-4">
                            {[
                                { k: 'email', label: 'Email Notifications' },
                                { k: 'browser', label: 'Browser Push Notifications' },
                                { k: 'assignments', label: 'Student Assignment Alerts' },
                                { k: 'analysisComplete', label: 'Analysis Complete Notifications' },
                                { k: 'weeklySummary', label: 'Weekly Digested Summary' },
                                { k: 'systemUpdates', label: 'Receive System Updates' }
                            ].map((toggle) => (
                                <div key={toggle.k} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <span className="text-gray-700 font-medium text-sm">{toggle.label}</span>
                                    <button
                                        onClick={() => handleToggle('notifications', toggle.k)}
                                        className={`w-11 h-6 rounded-full relative transition-colors ${settings.notifications[toggle.k] ? 'bg-emerald-500' : 'bg-gray-200'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.notifications[toggle.k] ? 'translate-x-6' : 'translate-x-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'appearance':
                return (
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-sm font-semibold text-gray-700">Theme Preference</label>
                            <div className="flex gap-4">
                                {['light', 'dark', 'system'].map(theme => (
                                    <div
                                        key={theme}
                                        onClick={() => handleChange('appearance', 'theme', theme)}
                                        className={`flex-1 p-4 border rounded-xl text-center cursor-pointer transition-all ${settings.appearance.theme === theme ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-200 hover:border-gray-300'}`}
                                    >
                                        <span className="capitalize font-medium text-gray-800">{theme}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                            <span className="text-gray-700 font-medium text-sm">Compact Mode (High Density)</span>
                            <button
                                onClick={() => handleToggle('appearance', 'compactMode')}
                                className={`w-11 h-6 rounded-full relative transition-colors ${settings.appearance.compactMode ? 'bg-emerald-500' : 'bg-gray-200'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${settings.appearance.compactMode ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                );
            case 'security':
                return (
                    <div className="space-y-8">
                        <div className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-xl">
                            <div>
                                <h4 className="font-semibold text-emerald-900">Two-Factor Authentication (2FA)</h4>
                                <p className="text-sm text-emerald-700 mt-1">Add an extra layer of security to your account.</p>
                            </div>
                            <Button variant="primary" size="sm" onClick={() => addToast("2FA Setup initiated. Check instructions via email.", "info")}>Enable</Button>
                        </div>

                        <div className="space-y-2">
                            <h4 className="font-semibold text-gray-900">Connected Devices</h4>
                            <p className="text-xs text-gray-500 mb-4">You are currently logged in on these devices.</p>
                            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Smartphone className="text-gray-400" />
                                    <div>
                                        <p className="font-medium text-sm text-gray-900 flex items-center gap-2">Windows PC - Chrome <Badge variant="success">Current</Badge></p>
                                        <p className="text-xs text-gray-500">Last active: Just now</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <hr className="border-gray-100" />
                        <div>
                            <Button variant="danger" size="sm" onClick={() => addToast("Signing out of all external devices...", "info")}><LogOut size={16} className="mr-2" /> Sign Out All Devices</Button>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-12 w-full animate-in fade-in duration-500 h-full flex flex-col">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Settings Center</h1>
                    <p className="text-gray-500 text-sm mt-1">Manage your account, preferences, and security policies.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="primary" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                        {!isSaving && <Check size={16} className="ml-2" />}
                    </Button>
                </div>
            </div>

            <GlassCard className="!p-0 border border-gray-200 flex-1 flex flex-col md:flex-row overflow-hidden min-h-[600px]">
                {/* Sidebar Tabs */}
                <div className="w-full md:w-64 bg-gray-50 border-r border-gray-200 p-4 shrink-0 flex flex-col gap-1">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${activeTab === tab.id
                                    ? 'bg-white shadow-sm border border-gray-200/60 text-orange-600'
                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-transparent'
                                }`}
                        >
                            <span className={activeTab === tab.id ? "text-orange-500" : "text-gray-400"}>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 md:p-8 bg-white overflow-y-auto">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </GlassCard>
        </div>
    );
}
