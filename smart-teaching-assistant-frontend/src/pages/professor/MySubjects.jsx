import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Search, Filter, X } from 'lucide-react';
import { subjects as initialSubjects } from '../../data/mock/subjects';
import { SubjectCard } from '../../components/professor/subjects/SubjectCard';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { simulateAction } from '../../utils/simulateAction';

export default function MySubjects() {
    const { addToast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [semesterFilter, setSemesterFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("All");
    const [subjectList, setSubjectList] = useState(initialSubjects);

    // Modal state
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const filteredSubjects = subjectList.filter(sub => {
        const matchSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase()) || sub.code.toLowerCase().includes(searchQuery.toLowerCase());
        const matchSem = semesterFilter === "All" || sub.semester === semesterFilter;
        const matchStatus = statusFilter === "All" || sub.aiStatus.toLowerCase() === statusFilter.toLowerCase();
        return matchSearch && matchSem && matchStatus;
    });

    const handleCreateSubject = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        addToast("Creating new workspace...", "info");
        await simulateAction(1000);

        // Mock new subject
        const formData = new FormData(e.target);
        const name = formData.get("subjectName");
        const code = formData.get("subjectCode");

        const newSubject = {
            id: `SUB${Date.now()}`,
            name: name,
            code: code,
            department: "Computer Science",
            semester: semesterFilter !== "All" ? semesterFilter : "Semester 6",
            aiStatus: "Ready",
            progress: 0,
            students: 0,
            color: "#10b981", // Emerald
            icon: "BookOpen",
            tags: ["New"],
            lastUpload: "Just now"
        };

        setSubjectList(prev => [newSubject, ...prev]);
        setIsSubmitting(false);
        setIsFormOpen(false);
        addToast(`Successfully created ${name}`, "success");
    };

    return (
        <div className="space-y-8 pb-12 min-h-[calc(100vh-80px)]">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Subjects</h1>
                    <p className="text-gray-500 mt-2">Manage your academic courses and AI extraction workspaces.</p>
                </div>
                <Button variant="primary" className="gap-2" onClick={() => setIsFormOpen(true)}>
                    <Plus size={16} /> New Subject
                </Button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="relative w-full sm:max-w-md group flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={16} className="text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                    </div>
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 bg-gray-50 border-transparent rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:bg-white transition-all text-sm"
                        placeholder="Search subjects by name or code..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <select
                        value={semesterFilter}
                        onChange={(e) => setSemesterFilter(e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 outline-none focus:border-orange-300 focus:bg-white transition-colors"
                    >
                        <option value="All">All Semesters</option>
                        <option value="Semester 5">Semester 5</option>
                        <option value="Semester 6">Semester 6</option>
                        <option value="Semester 7">Semester 7</option>
                    </select>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm text-gray-700 outline-none focus:border-orange-300 focus:bg-white transition-colors"
                    >
                        <option value="All">All Statuses</option>
                        <option value="Ready">Ready</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Subject Grid */}
            {filteredSubjects.length > 0 ? (
                <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
                    <AnimatePresence>
                        {filteredSubjects.map(subject => (
                            <SubjectCard key={subject.id} subject={subject} />
                        ))}
                    </AnimatePresence>
                </motion.div>
            ) : (
                <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl border-dashed">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                        <Search size={24} className="text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No subjects found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto">We couldn't find any subjects matching your filters.</p>
                    <Button variant="secondary" className="mt-6" onClick={() => { setSearchQuery(""); setSemesterFilter("All"); setStatusFilter("All"); }}>
                        Clear Filters
                    </Button>
                </div>
            )}

            {/* Create Modal */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden flex flex-col"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-gray-900">Create Workspace</h3>
                                <button onClick={() => setIsFormOpen(false)} className="text-gray-400 hover:text-gray-900 transition-colors"><X size={20} /></button>
                            </div>
                            <form onSubmit={handleCreateSubject} className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Subject Code</label>
                                    <input required name="subjectCode" type="text" placeholder="e.g. CS502" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-900 mb-2">Subject Name</label>
                                    <input required name="subjectName" type="text" placeholder="e.g. Compiler Design" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20" />
                                </div>
                                <div className="pt-4 flex gap-3">
                                    <Button type="button" variant="secondary" className="flex-1" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                                    <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                                        {isSubmitting ? 'Creating...' : 'Create Workspace'}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
