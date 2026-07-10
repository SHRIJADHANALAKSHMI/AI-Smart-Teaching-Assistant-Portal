import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, FileText, Presentation, CheckCircle, Clock, XCircle, Download, RefreshCw, Trash2, Share2, MoreVertical, Copy } from 'lucide-react';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { aiHistory, aiSummaryStats } from '../../data/mock/aiHistory';
import { useToast } from '../../context/ToastContext';
import { simulateAction } from '../../utils/simulateAction';

export default function AIHistory() {
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [isActionLoading, setIsActionLoading] = useState(null);

    const handleAction = async (id, actionName) => {
        setIsActionLoading(id);
        addToast(`${actionName} initiated...`, "info");
        await simulateAction(1500);
        setIsActionLoading(null);
        addToast(`${actionName} completed successfully.`, "success");
    };

    const getStatusBadge = (status) => {
        switch (status) {
            case 'Completed': return <Badge variant="success"><CheckCircle size={12} className="mr-1" /> {status}</Badge>;
            case 'Processing': return <Badge variant="warning"><Clock size={12} className="mr-1 animate-spin" /> {status}</Badge>;
            case 'Failed': return <Badge variant="danger"><XCircle size={12} className="mr-1" /> {status}</Badge>;
            default: return <Badge>{status}</Badge>;
        }
    };

    const getToolIcon = (type) => {
        switch (type) {
            case 'presentation': return <Presentation size={18} className="text-purple-500" />;
            case 'quiz': return <FileText size={18} className="text-orange-500" />;
            default: return <FileText size={18} className="text-emerald-500" />;
        }
    };

    const filteredHistory = aiHistory.filter(item => {
        const matchesSearch = item.subjectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.chapter.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const paginatedHistory = filteredHistory.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);

    return (
        <div className="max-w-7xl mx-auto space-y-6 pb-12 w-full animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">AI Activity Center</h1>
                    <p className="text-gray-500 text-sm mt-1">Track, manage, and audit your AI content generations.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm"><Download size={16} className="mr-2" /> Export Log</Button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: "Total Generations", value: aiSummaryStats.totalRequests, icon: <ActivityIcon /> },
                    { label: "Presentations", value: aiSummaryStats.pptsGenerated, icon: <Presentation size={20} className="text-purple-500" /> },
                    { label: "Quizzes", value: aiSummaryStats.quizzesGenerated, icon: <FileText size={20} className="text-orange-500" /> },
                    { label: "Processing Time", value: aiSummaryStats.avgProcessingTime, icon: <Clock size={20} className="text-emerald-500" /> },
                ].map((stat, idx) => (
                    <GlassCard key={idx} className="!p-5 border border-gray-100 flex flex-col gap-2 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">{stat.icon}</div>
                        <span className="text-gray-500 text-sm font-medium">{stat.label}</span>
                        <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
                    </GlassCard>
                ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <div className="relative flex-1 w-full">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by subject or chapter..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                    />
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 text-sm font-medium text-gray-700 w-full md:w-auto min-w-[120px]"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Completed">Completed</option>
                        <option value="Processing">Processing</option>
                        <option value="Failed">Failed</option>
                    </select>
                    <Button variant="secondary" size="icon"><Calendar size={18} /></Button>
                </div>
            </div>

            {/* History Table */}
            <GlassCard className="!p-0 border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100/50 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="p-4 pl-6">Content / Tool</th>
                                <th className="p-4">Subject</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date & Time</th>
                                <th className="p-4 text-right pr-6">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100/50">
                            {paginatedHistory.length > 0 ? (
                                paginatedHistory.map((item, idx) => (
                                    <motion.tr
                                        key={item.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="hover:bg-orange-50/30 transition-colors group"
                                    >
                                        <td className="p-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-white">{getToolIcon(item.type)}</div>
                                                <div>
                                                    <div className="font-semibold text-gray-900 text-sm">{item.tool}</div>
                                                    <div className="text-xs text-gray-500 truncate max-w-[200px]">{item.chapter}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-sm font-medium text-gray-700">{item.subject}</td>
                                        <td className="p-4">{getStatusBadge(item.status)}</td>
                                        <td className="p-4 text-sm text-gray-500">
                                            <div>{new Date(item.date).toLocaleDateString()}</div>
                                            <div className="text-xs">{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="p-4 pr-6 text-right relative">
                                            {isActionLoading === item.id ? (
                                                <div className="flex justify-end"><Clock size={18} className="animate-spin text-orange-500" /></div>
                                            ) : (
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleAction(item.id, "Copied link")} className="p-1.5 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"><Copy size={16} /></button>
                                                    <button onClick={() => handleAction(item.id, "Regenerating")} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"><RefreshCw size={16} /></button>
                                                    <button onClick={() => handleAction(item.id, "Downloading")} className="p-1.5 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" disabled={item.status !== 'Completed'}><Download size={16} /></button>
                                                    <button onClick={() => handleAction(item.id, "Deleted")} className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                                                </div>
                                            )}
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-12 text-center">
                                        <div className="flex flex-col items-center justify-center text-gray-400">
                                            <Search size={32} className="mb-3 opacity-20" />
                                            <p className="text-sm font-medium">No records found matching your criteria</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex items-center justify-between p-4 border-t border-gray-100 bg-gray-50/50">
                        <span className="text-xs text-gray-500 font-medium">Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredHistory.length)} of {filteredHistory.length}</span>
                        <div className="flex gap-1">
                            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Prev</Button>
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${currentPage === i + 1 ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-600 hover:bg-gray-200'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <Button variant="secondary" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</Button>
                        </div>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}

const ActivityIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
);
