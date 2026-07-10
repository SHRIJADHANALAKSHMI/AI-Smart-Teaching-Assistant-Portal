import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Download, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { vivaQuestions } from '../../../data/mock/vivaQuestions';
import { useToast } from '../../../context/ToastContext';
import { simulateDownload } from '../../../utils/simulateAction';

export default function VivaQuestionsTab() {
    const { addToast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const handleDownload = async () => {
        setIsExporting(true);
        addToast("Preparing Viva Questions for export...", "info");
        await simulateDownload("viva_questions.pdf", 2000);
        setIsExporting(false);
        addToast("Viva questions downloaded successfully.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Viva & Interview Questions</h2>
                    <p className="text-gray-500 text-sm">Oral exam prep for lab sessions</p>
                </div>
                <Button variant="primary" size="sm" onClick={handleDownload} disabled={isExporting}>
                    {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
                    Export PDF
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
                {vivaQuestions.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-6 flex gap-4 hover:bg-gray-50 transition-colors group"
                    >
                        <div className="mt-1">
                            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">
                                {idx + 1}
                            </div>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg mb-2">{item.q}</h3>
                            <div className="flex gap-2 items-start text-sm bg-orange-50/50 p-3 rounded-lg border border-orange-100">
                                <MessageSquare size={16} className="text-orange-500 mt-0.5" />
                                <p className="text-orange-800 font-medium">{item.hint}</p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
