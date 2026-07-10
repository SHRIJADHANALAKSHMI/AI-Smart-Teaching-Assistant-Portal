import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle, RefreshCw, Loader2 } from 'lucide-react';
import { timeline } from '../../../data/mock/timeline';
import { Button } from '../../ui/Button';
import { useToast } from '../../../context/ToastContext';
import { simulateAction } from '../../../utils/simulateAction';

export default function TimelineTab() {
    const { addToast } = useToast();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleUpdate = async () => {
        setIsUpdating(true);
        addToast("Syncing timeline with active schedule...", "info");
        await simulateAction(2000);
        setIsUpdating(false);
        addToast("Timeline synced successfully.", "success");
    };

    return (
        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            <div className="mb-4 flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Weekly Progress Timeline</h2>
                    <p className="text-gray-500 text-sm">Visual tracking for semantic milestones</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleUpdate} disabled={isUpdating}>
                    {isUpdating ? <Loader2 size={16} className="mr-2 animate-spin" /> : <RefreshCw size={16} className="mr-2" />}
                    Sync Schedule
                </Button>
            </div>

            <div className="relative border-l-2 border-gray-200 ml-4 space-y-12 pb-8">
                {timeline.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.15 }}
                        className="relative pl-8"
                    >
                        {/* Timeline dot */}
                        <div className={`absolute -left-[11px] top-1 p-0.5 rounded-full bg-white`}>
                            {item.status === 'completed' ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : item.status === 'in-progress' ? (
                                <div className="w-5 h-5 rounded-full border-2 border-orange-500 bg-orange-100 flex items-center justify-center">
                                    <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                                </div>
                            ) : (
                                <Circle className="w-5 h-5 text-gray-300" />
                            )}
                        </div>

                        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded uppercase tracking-wider">Week {item.week}</span>
                                    <h3 className="font-bold text-lg text-gray-900">{item.title}</h3>
                                </div>
                            </div>

                            <ul className="space-y-2 mt-4 mt-2">
                                {item.milestones.map((m, i) => (
                                    <li key={i} className="flex items-center text-sm text-gray-600">
                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-2 flex-shrink-0"></span>
                                        {m}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
