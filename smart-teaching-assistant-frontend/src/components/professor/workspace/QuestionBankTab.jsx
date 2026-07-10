import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, BookOpen, Layers, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { questionBank } from '../../../data/mock/questionBank';
import { useToast } from '../../../context/ToastContext';
import { simulateDownload } from '../../../utils/simulateAction';

export default function QuestionBankTab() {
    const { addToast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async () => {
        setIsExporting(true);
        addToast("Preparing question bank for export...", "info");
        await simulateDownload("question_bank.docx", 2000);
        setIsExporting(false);
        addToast("Question bank downloaded successfully.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Question Bank</h2>
                    <p className="text-gray-500 text-sm">Categorized by marks, difficulty, and Bloom's taxonomy</p>
                </div>
                <Button variant="primary" size="sm" onClick={handleDownload} disabled={isExporting}>
                    {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
                    Download Bank
                </Button>
            </div>

            <div className="space-y-4">
                {questionBank.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-orange-200 transition-colors"
                    >
                        <div className="flex justify-between items-start gap-4 mb-3">
                            <h3 className="font-medium text-gray-900 text-lg leading-tight flex-1">
                                <span className="text-gray-400 mr-2">{idx + 1}.</span>
                                {q.question}
                            </h3>
                            <div className="flex shrink-0">
                                <span className="text-xs font-bold bg-gray-100 text-gray-700 px-2 py-1 rounded inline-flex items-center gap-1">
                                    <BookOpen size={12} /> {q.marks} Marks
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 text-xs font-medium ml-6">
                            <span className={`px-2 py-1 rounded ${q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : q.difficulty === 'Medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'}`}>
                                {q.difficulty}
                            </span>
                            <span className="bg-purple-50 text-purple-700 px-2 py-1 rounded inline-flex items-center gap-1">
                                <Layers size={12} /> {q.bloomLevel}
                            </span>
                            <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {q.type}
                            </span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
