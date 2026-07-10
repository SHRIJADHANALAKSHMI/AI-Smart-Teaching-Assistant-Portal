import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import { Download, Mail, BookOpen, Clock, Target, Server, Filter, Sparkles, AlertTriangle } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { analyticsData } from '../../data/mock/analytics';
import { useToast } from '../../context/ToastContext';
import { simulateDownload } from '../../utils/simulateAction';

const COLORS = ['#F97316', '#10B981', '#8B5CF6', '#3B82F6'];

export default function Analytics() {
    const { addToast } = useToast();

    const handleExport = async (format) => {
        addToast(`Generating ${format} report...`, "info");
        await simulateDownload(`analytics_report.${format.toLowerCase()}`, 2000);
        addToast(`Report downloaded successfully`, "success");
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12 w-full animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Analytics & Productivity</h1>
                    <p className="text-gray-500 text-sm mt-1">Deep dive into AI-assisted content generation and teaching impacts.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleExport('EXCEL')}><Download size={16} className="mr-2" /> Excel</Button>
                    <Button variant="primary" size="sm" onClick={() => handleExport('PDF')}><Download size={16} className="mr-2" /> PDF</Button>
                </div>
            </div>

            {/* Top KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                    { label: "Books Analysed", val: analyticsData.overview.booksAnalysed, icon: <BookOpen className="text-purple-500" /> },
                    { label: "AI Accuracy", val: analyticsData.overview.aiAccuracy, icon: <Target className="text-emerald-500" /> },
                    { label: "Slides Gen", val: analyticsData.overview.generatedSlides, icon: <Sparkles className="text-amber-500" /> },
                    { label: "Qs Gen", val: analyticsData.overview.generatedQuestions, icon: <Server className="text-blue-500" /> },
                    { label: "Hours Saved", val: analyticsData.overview.teachingHoursSaved, icon: <Clock className="text-orange-500" /> },
                    { label: "Avg Process", val: analyticsData.overview.avgProcessingTime, icon: <Clock className="text-rose-500" /> },
                ].map((stat, idx) => (
                    <GlassCard key={idx} className="!p-4 border border-gray-100 relative overflow-hidden flex flex-col justify-between min-h-[100px]">
                        <div className="absolute top-0 right-0 p-3 opacity-10">{stat.icon}</div>
                        <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">{stat.label}</span>
                        <span className="text-2xl font-bold text-gray-900 mt-2">{stat.val}</span>
                    </GlassCard>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Graph */}
                <GlassCard className="lg:col-span-2 !p-6 border border-gray-100 flex flex-col h-[400px]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Analysis & Generation Trends</h2>
                        <Button variant="secondary" size="sm"><Filter size={14} className="mr-2" /> 6 Months</Button>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={analyticsData.analysisTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorGen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F97316" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#F97316" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Area type="monotone" dataKey="generated" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorGen)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Pie Chart */}
                <GlassCard className="!p-6 border border-gray-100 flex flex-col h-[400px]">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">Subjects Processed</h2>
                    <p className="text-sm text-gray-500 mb-6">Distribution of workspace chapters.</p>
                    <div className="flex-1 w-full min-h-0 flex justify-center items-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={analyticsData.subjectUsage}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {analyticsData.subjectUsage.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Chapter Analytics Table */}
                <GlassCard className="lg:col-span-2 !p-0 border border-gray-100 overflow-hidden">
                    <div className="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-900">Chapter Level Analytics</h2>
                    </div>
                    <div className="overflow-x-auto custom-scrollbar">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-white border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                    <th className="p-4 pl-6">Chapter Name</th>
                                    <th className="p-4 text-center">Difficulty</th>
                                    <th className="p-4 text-center">Est. Hours</th>
                                    <th className="p-4 text-center">Completion</th>
                                    <th className="p-4 text-center">AI Cond.</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100/50">
                                {analyticsData.chapterAnalytics.map((ch) => (
                                    <tr key={ch.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 pl-6 font-medium text-sm text-gray-900">{ch.name}</td>
                                        <td className="p-4 text-center">
                                            <Badge variant={ch.difficulty === 'Hard' ? 'danger' : ch.difficulty === 'Medium' ? 'warning' : 'success'}>
                                                {ch.difficulty}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-sm text-gray-600 text-center">{ch.hours}h</td>
                                        <td className="p-4 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${ch.completion}%` }}></div>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">{ch.completion}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-semibold text-emerald-600 text-center">{ch.confidence}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassCard>

                {/* Key Insights Panel */}
                <div className="space-y-4">
                    <GlassCard className="!p-6 border border-gray-100 bg-gradient-to-br from-white to-orange-50">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="text-orange-500" size={20} />
                            <h3 className="font-bold text-gray-900 text-lg">AI Teaching Insights</h3>
                        </div>
                        <div className="space-y-4 text-sm">
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-500">Most Blocked Chapter</span>
                                <span className="font-semibold text-gray-900 flex items-center gap-2"><AlertTriangle size={14} className="text-rose-500" /> {analyticsData.insights.mostDifficult}</span>
                            </div>
                            <hr className="border-gray-200/60" />
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-500">Top Generated Content</span>
                                <span className="font-semibold text-gray-900">{analyticsData.insights.mostGeneratedPPT} (PPTs)</span>
                            </div>
                            <hr className="border-gray-200/60" />
                            <div className="flex flex-col gap-1">
                                <span className="text-gray-500">Suggested Action</span>
                                <span className="font-medium text-purple-700 bg-purple-100 px-3 py-2 rounded-lg mt-1">Review missing Quiz data for Chapter 4 to boost engagement.</span>
                            </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
}
