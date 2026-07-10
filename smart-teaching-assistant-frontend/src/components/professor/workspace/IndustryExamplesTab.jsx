import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, ArrowRight, Loader2 } from 'lucide-react';
import { industryExamples } from '../../../data/mock/industryExamples';
import { useToast } from '../../../context/ToastContext';
import { simulateAction } from '../../../utils/simulateAction';

export default function IndustryExamplesTab() {
    const { addToast } = useToast();
    const [loadingId, setLoadingId] = useState(null);

    const handleReadCaseStudy = async (id, title) => {
        setLoadingId(id);
        addToast(`Fetching full case study for "${title}"...`, "info");
        await simulateAction(2000);
        setLoadingId(null);
        addToast("Case study opened in new window.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-900">Industry Examples</h2>
                <p className="text-gray-500 text-sm">Real-world applications of theoretical concepts</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {industryExamples.map((ex, idx) => (
                    <motion.div
                        key={ex.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="group bg-gradient-to-br from-white to-gray-50 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-default relative overflow-hidden"
                    >
                        <div className="flex items-center gap-3 mb-4 relative z-10">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600">
                                <Briefcase size={20} />
                            </div>
                            <h3 className="font-bold text-lg text-gray-900 leading-tight">{ex.title}</h3>
                        </div>
                        <p className="text-gray-600 mb-6 relative z-10">{ex.description}</p>

                        <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity relative z-10">
                            <button
                                onClick={() => handleReadCaseStudy(ex.id, ex.title)}
                                disabled={loadingId === ex.id}
                                className="text-sm font-medium text-orange-600 flex items-center hover:text-orange-700 disabled:opacity-50"
                            >
                                {loadingId === ex.id ? 'Loading...' : 'Read Case Study'}
                                {loadingId === ex.id ? <Loader2 size={16} className="ml-1 animate-spin" /> : <ArrowRight size={16} className="ml-1" />}
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
