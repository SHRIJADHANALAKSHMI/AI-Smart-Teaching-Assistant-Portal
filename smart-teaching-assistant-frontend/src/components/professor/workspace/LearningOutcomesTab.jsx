import React from 'react';
import { motion } from 'framer-motion';
import { Target, Link as LinkIcon } from 'lucide-react';
import { learningOutcomes } from '../../../data/mock/learningOutcomes';

export default function LearningOutcomesTab() {
    return (
        <div className="flex flex-col gap-6">
            <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-900">Learning Outcomes</h2>
                <p className="text-gray-500 text-sm">Course and Program Outcome mappings</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {learningOutcomes.map((lo, idx) => (
                    <motion.div
                        key={lo.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm hover:border-emerald-200 transition-colors"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Target size={18} className="text-emerald-500" />
                            <h3 className="font-bold text-lg text-gray-900">{lo.coMapping}</h3>
                        </div>
                        <p className="text-gray-700 mb-6">{lo.description}</p>

                        <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                            <LinkIcon size={14} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-500">Maps to PO:</span>
                            <div className="flex gap-1">
                                {lo.poMapping.map(po => (
                                    <span key={po} className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">{po}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
