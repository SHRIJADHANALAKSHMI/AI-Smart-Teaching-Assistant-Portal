import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, RefreshCw, CheckCircle2, Circle, Eye, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { quiz } from '../../../data/mock/quiz';
import { useToast } from '../../../context/ToastContext';
import { simulateAction, simulateDownload } from '../../../utils/simulateAction';

export function QuizTab() {
    const [showAnswers, setShowAnswers] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);

    // We can simulate fetching new data by duplicating the existing mock and triggering a re-render.
    const [quizData, setQuizData] = useState(quiz.questions);

    const { addToast } = useToast();

    const handleGenerateMore = async () => {
        setIsGenerating(true);
        addToast("Generating more questions from chapter context...", "info");
        await simulateAction(2500);

        // Simple trick to look like new questions were added
        setQuizData(prev => [...prev.map(q => ({ ...q, id: q.id + "_new" })), ...prev]);

        setIsGenerating(false);
        addToast("Added 5 new questions successfully.", "success");
    };

    const handleExport = async () => {
        setIsExporting(true);
        addToast("Formatting quiz for export...", "info");
        await simulateDownload("chapter_quiz.pdf", 2000);
        setIsExporting(false);
        addToast("Quiz PDF downloaded.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Professional MCQ Generator</h2>
                    <p className="text-gray-500 text-sm">Auto-generated questions with varying difficulty levels</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowAnswers(!showAnswers)}>
                        <Eye size={16} className="mr-2" /> {showAnswers ? 'Hide Answers' : 'Show Answers'}
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleGenerateMore} disabled={isGenerating}>
                        {isGenerating ? <Loader2 size={16} className="mr-2 animate-spin" /> : <RefreshCw size={16} className="mr-2" />}
                        Generate More
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleExport} disabled={isExporting}>
                        {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
                        Download PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {quizData.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md transition-shadow relative overflow-hidden"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                                {q.difficulty}
                            </span>
                            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded">
                                {q.marks} Marks
                            </span>
                        </div>

                        <h3 className="font-semibold text-gray-900 leading-relaxed mb-4">
                            <span className="text-orange-500 font-bold mr-2">Q{idx + 1}.</span>
                            {q.question}
                        </h3>

                        <div className="space-y-2 mb-4">
                            {q.options.map((opt, i) => {
                                const isCorrect = showAnswers && q.correctAnswer === i;
                                return (
                                    <div key={i} className={`flex items-start gap-3 p-3 rounded-lg text-sm border transition-colors
                    ${isCorrect ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-gray-50 border-gray-100 text-gray-700 hover:border-gray-200'}`}>
                                        {isCorrect ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" /> : <Circle size={16} className="text-gray-400 shrink-0 mt-0.5" />}
                                        {opt}
                                    </div>
                                );
                            })}
                        </div>

                        {showAnswers && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-orange-50 text-orange-900 p-4 rounded-lg border border-orange-100 text-sm mt-4"
                            >
                                <div className="font-bold mb-1">Explanation:</div>
                                {q.explanation}
                            </motion.div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
