import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileDown, Clock, Search, Plus, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { assignments } from '../../../data/mock/assignments';
import { useToast } from '../../../context/ToastContext';
import { simulateAction, simulateDownload } from '../../../utils/simulateAction';

export default function AssignmentsTab() {
    const { addToast } = useToast();
    const [isCreating, setIsCreating] = useState(false);
    const [downloadingId, setDownloadingId] = useState(null);

    const handleCreateNew = async () => {
        setIsCreating(true);
        addToast("Generating new assignment based on chapter context...", "info");
        await simulateAction(2500);
        setIsCreating(false);
        addToast("New Assignment created and added to list.", "success");
    };

    const handleDownload = async (type, id) => {
        setDownloadingId(`${id}-${type}`);
        addToast(`Preparing ${type.toUpperCase()} file...`, "info");
        await simulateDownload(`assignment_${id}.${type}`, 1500);
        setDownloadingId(null);
        addToast("Download complete.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Assignments & Tasks</h2>
                    <p className="text-gray-500 text-sm">Suggested tasks based on chapter difficulty</p>
                </div>
                <Button variant="primary" size="sm" onClick={handleCreateNew} disabled={isCreating}>
                    {isCreating ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Plus size={16} className="mr-2" />}
                    Create New
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {assignments.map((assignment, index) => (
                    <motion.div
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-1 h-full bg-orange-400"></div>
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-1 rounded">
                                {assignment.type}
                            </span>
                            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                                {assignment.marks} Marks
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-2">{assignment.title}</h3>

                        <div className="flex items-center text-sm text-gray-500 mb-6">
                            <Clock size={14} className="mr-1.5" /> Due: {assignment.dueDate}
                        </div>

                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                size="sm"
                                onClick={() => handleDownload('docx', assignment.id)}
                                disabled={downloadingId === `${assignment.id}-docx`}
                            >
                                {downloadingId === `${assignment.id}-docx` ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <FileDown size={14} className="mr-1.5" />} Word
                            </Button>
                            <Button
                                variant="outline"
                                className="flex-1"
                                size="sm"
                                onClick={() => handleDownload('pdf', assignment.id)}
                                disabled={downloadingId === `${assignment.id}-pdf`}
                            >
                                {downloadingId === `${assignment.id}-pdf` ? <Loader2 size={14} className="mr-1.5 animate-spin" /> : <FileDown size={14} className="mr-1.5" />} PDF
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
