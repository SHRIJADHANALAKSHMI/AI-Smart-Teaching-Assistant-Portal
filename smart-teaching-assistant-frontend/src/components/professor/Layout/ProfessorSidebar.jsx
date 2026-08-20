import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    BookOpen,
    UploadCloud,
    BrainCircuit,
    BarChart,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { useAuth } from '../../../context/AuthContext';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/professor/dashboard' },
    { icon: BookOpen, label: 'My Subjects', path: '/professor/subjects' },
    { icon: UploadCloud, label: 'Upload Book', path: '/professor/upload' },
    { icon: BrainCircuit, label: 'AI History', path: '/professor/ai-history' },
    { icon: BarChart, label: 'Analytics', path: '/professor/analytics' },
    { icon: Settings, label: 'Settings', path: '/professor/settings' },
];

export default function ProfessorSidebar() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { logout } = useAuth();

    const handleLogout = () => {
        addToast("Logged out successfully.", "success");
        logout();
        navigate('/login');
    };

    return (
        <motion.div
            initial={false}
            animate={{ width: isCollapsed ? '80px' : '260px' }}
            className="hidden md:flex flex-col bg-white border-r border-[#ECECEC] h-screen sticky top-0 z-50 selection:bg-orange-100"
        >
            {/* Brand */}
            <div className="h-20 flex items-center justify-between px-6 border-b border-[#ECECEC]">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-2 text-xl font-bold text-gray-900 tracking-tight"
                    >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white shadow-sm shadow-orange-500/20">
                            <Sparkles size={16} />
                        </div>
                        EduSaaS
                    </motion.div>
                )}
                {isCollapsed && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-orange-400 flex items-center justify-center text-white shadow-sm mx-auto">
                        <Sparkles size={16} />
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className={`p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors ${isCollapsed ? 'hidden' : 'block'}`}
                >
                    <ChevronLeft size={18} />
                </button>
            </div>

            {/* Navigation */}
            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto hide-scrollbar">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
              flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
              ${isActive
                                ? 'bg-orange-50 text-orange-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={20} className={isActive ? 'text-orange-500' : 'text-gray-400 group-hover:text-gray-600 transition-colors'} />
                                {!isCollapsed && <span>{item.label}</span>}
                                {isCollapsed && (
                                    <div className="absolute left-full ml-4 px-3 py-1.5 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                                        {item.label}
                                    </div>
                                )}
                            </>
                        )}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 border-t border-[#ECECEC]">
                <div onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 transition-all cursor-pointer group">
                    <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                    {!isCollapsed && <span className="font-medium">Logout</span>}
                </div>
            </div>
        </motion.div>
    );
}
