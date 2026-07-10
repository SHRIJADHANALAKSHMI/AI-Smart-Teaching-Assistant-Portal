import React from 'react';
import { Outlet } from 'react-router-dom';
import ProfessorSidebar from './ProfessorSidebar';
import ProfessorHeader from './ProfessorHeader';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProfessorLayout() {
    return (
        <div className="flex h-screen w-full bg-[#FAFAFA] text-gray-900 overflow-hidden font-sans">
            <ProfessorSidebar />

            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                <ProfessorHeader />

                {/* Main Workspace Area */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FAFAFA] p-8">
                    <div className="max-w-7xl mx-auto h-full">
                        <Outlet />
                    </div>
                </main>
            </div>

            {/* Global Floating AI Assistant Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="fixed bottom-8 right-8 p-4 rounded-full bg-gray-900 text-white shadow-xl shadow-gray-900/20 hover:bg-gray-800 transition-colors z-50 flex items-center justify-center group"
            >
                <Sparkles size={24} className="text-orange-400 group-hover:animate-pulse" />
            </motion.button>
        </div>
    );
}
