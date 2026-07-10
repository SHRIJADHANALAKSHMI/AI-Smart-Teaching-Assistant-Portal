import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Command, LogOut, Settings, User, ChevronDown } from 'lucide-react';
import { currentProfessor } from '../../../data/mock/professor';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export default function ProfessorHeader() {
    const { addToast } = useToast();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        if (e.key === 'Enter') {
            addToast(`Searching for "${e.target.value}"`, "info");
            setTimeout(() => {
                navigate('/professor/subjects');
            }, 500);
        }
    };

    return (
        <header className="h-20 bg-white/70 backdrop-blur-md border-b border-[#ECECEC] sticky top-0 z-40 flex items-center justify-between px-8 text-sm">
            {/* Search Bar matching Linear style */}
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        onKeyDown={handleSearchSubmit}
                        className="block w-full pl-10 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all shadow-sm"
                        placeholder="Search everywhere... (Press Enter)"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <div className="flex items-center gap-1 text-xs text-gray-400 font-medium">
                            <span className="p-1 rounded bg-gray-200 text-gray-500"><Command size={10} /></span>
                            <span className="p-1 rounded bg-gray-200 text-gray-500">K</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
                {/* Context Tags */}
                <div className="hidden lg:flex items-center gap-3 border-r border-[#ECECEC] pr-6">
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md font-medium">
                        {currentProfessor.currentSemester}
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-gray-600 font-medium">AI Ready</span>
                    </div>
                </div>

                {/* Action Icons */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => addToast("You have 12 pending analysis reviews.", "info")}
                        className="relative p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                    >
                        <Bell size={20} />
                        <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
                    </button>
                </div>

                {/* Profile Dropdown Trigger */}
                <div className="relative">
                    <div
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                    >
                        <img
                            src={currentProfessor.avatar}
                            alt="Profile"
                            className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-orange-200 transition-all object-cover"
                        />
                        <div className="hidden md:block text-left">
                            <div className="font-semibold text-gray-900 leading-none">{currentProfessor.name}</div>
                            <div className="text-xs text-gray-500 mt-1">{currentProfessor.department}</div>
                        </div>
                        <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 ml-1 hidden md:block" />
                    </div>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                            >
                                <div className="p-2 space-y-1">
                                    <button onClick={() => { setIsProfileOpen(false); navigate('/professor/profile'); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg flex gap-2 items-center">
                                        <User size={16} /> Profile
                                    </button>
                                    <button onClick={() => { setIsProfileOpen(false); navigate('/professor/settings'); }} className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-lg flex gap-2 items-center">
                                        <Settings size={16} /> Course Settings
                                    </button>
                                    <div className="h-px bg-gray-100 my-1 font-bold"></div>
                                    <button onClick={() => { setIsProfileOpen(false); navigate('/login'); }} className="w-full text-left px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg flex gap-2 items-center">
                                        <LogOut size={16} /> Sign out
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
