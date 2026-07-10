import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Target, Clock, AlertTriangle, MonitorPlay, Library } from 'lucide-react';

export function OverviewTab() {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Chapter Summary */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white p-6 justify-between items-start rounded-2xl border border-gray-200 shadow-sm"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><BookOpen size={20} /></span>
                            <h2 className="text-xl font-bold text-gray-900">Chapter Summary</h2>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                            An Operating System (OS) is the most critical software running on a computer, responsible for managing hardware resources, providing a user interface, and executing applications. This chapter delves into the fundamental structures, system calls, and evolution of modern operating systems, tracing from early batch systems to distributed processing.
                        </p>
                    </motion.div>

                    {/* Learning Outcomes */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm"
                    >
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Target className="text-emerald-500" /> Learning Outcomes
                        </h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">CO1</span>
                                <span className="text-gray-700 font-medium">Understand the components and structure of an OS</span>
                            </li>
                            <li className="flex items-start gap-3 bg-gray-50 p-3 rounded-lg border border-gray-100">
                                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded">CO2</span>
                                <span className="text-gray-700 font-medium">Analyze how system calls act as an interface</span>
                            </li>
                        </ul>
                    </motion.div>
                </div>

                {/* Sidebar Metrics and Resources */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-gray-600"><AlertTriangle size={18} className="text-amber-500" /> Difficulty</div>
                            <span className="font-bold text-gray-900">Medium</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                            <div className="flex items-center gap-2 text-gray-600"><Clock size={18} className="text-blue-500" /> Estimated Hours</div>
                            <span className="font-bold text-gray-900">3 hrs</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2 text-gray-600"><BookOpen size={18} className="text-purple-500" /> Prerequisites</div>
                            <span className="font-medium text-gray-800">Basic C Programming</span>
                        </div>
                    </div>

                    {/* Resources */}
                    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white border-transparent shadow-lg shadow-gray-900/20">
                        <h3 className="text-lg font-semibold mb-4 text-white">Recommended Resources</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="p-2 bg-white/10 rounded-lg"><MonitorPlay size={16} className="text-emerald-400" /></div>
                                <div>
                                    <div className="font-medium text-sm">MIT OCW: OS Engineering</div>
                                    <div className="text-xs text-gray-400">Video Lecture • 45m</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 opacity-90 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="p-2 bg-white/10 rounded-lg"><Library size={16} className="text-orange-400" /></div>
                                <div>
                                    <div className="font-medium text-sm">Silberschatz - Chapter 1 & 2</div>
                                    <div className="text-xs text-gray-400">Reference Book • 20 Pages</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
