import React from 'react';
import { AlertTriangle, Clock, BookOpen, MonitorPlay, Library } from 'lucide-react';

export default function RightInsightPanel({ difficulty, estimatedHours }) {
    return (
        <div className="w-full xl:w-[320px] shrink-0 flex flex-col gap-6 overflow-y-visible custom-scrollbar h-full pr-1 pb-1">
            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-[24px] border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 font-semibold text-[14px]">
                        <AlertTriangle size={18} className="text-amber-500" strokeWidth={2.5} /> Difficulty
                    </div>
                    <span className="font-extrabold text-[15px] text-gray-900">{difficulty || 'Medium'}</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500 font-semibold text-[14px]">
                        <Clock size={18} className="text-blue-500" strokeWidth={2.5} /> Estimated Time
                    </div>
                    <span className="font-extrabold text-[15px] text-gray-900">{estimatedHours || '3 hrs'}</span>
                </div>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-gray-500 font-semibold text-[14px]">
                        <BookOpen size={18} className="text-purple-500" strokeWidth={2.5} /> Prerequisites
                    </div>
                    <span className="font-bold text-[14px] text-gray-800">Basic C Programming</span>
                </div>
            </div>

            {/* Resources */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[24px] p-6 text-white shadow-[0_8px_30px_rgba(15,23,42,0.15)] flex-1 min-h-[300px]">
                <h3 className="text-[18px] font-bold mb-6 text-white tracking-tight">Resources</h3>
                <div className="space-y-6">
                    <div className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group">
                        <div className="p-2.5 bg-white/10 rounded-[12px] group-hover:bg-white/20 transition-colors shadow-sm"><MonitorPlay size={18} className="text-emerald-400" /></div>
                        <div className="pt-0.5">
                            <div className="font-bold text-[15px] leading-tight mb-1">MIT OCW: OS Engineering</div>
                            <div className="text-[13px] text-slate-400 font-medium">Video Lecture • 45m</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 opacity-90 hover:opacity-100 transition-opacity cursor-pointer group">
                        <div className="p-2.5 bg-white/10 rounded-[12px] group-hover:bg-white/20 transition-colors shadow-sm"><Library size={18} className="text-orange-400" /></div>
                        <div className="pt-0.5">
                            <div className="font-bold text-[15px] leading-tight mb-1">Silberschatz - Chapter 1 & 2</div>
                            <div className="text-[13px] text-slate-400 font-medium">Reference Book • 20 Pages</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
