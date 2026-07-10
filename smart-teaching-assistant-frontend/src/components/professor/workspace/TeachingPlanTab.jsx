import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Download, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useToast } from '../../../context/ToastContext';
import { simulateDownload } from '../../../utils/simulateAction';

export default function TeachingPlanTab() {
    const { addToast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const plan = [
        { topic: "Introduction to OS", hours: 2, co: "CO1", date: "Week 1", status: "Planned" },
        { topic: "System Services", hours: 1, co: "CO1", date: "Week 1", status: "Planned" },
        { topic: "Process Management Concepts", hours: 3, co: "CO2", date: "Week 2", status: "Planned" }
    ];

    const handleDownload = async () => {
        setIsExporting(true);
        addToast("Preparing teaching plan for export...", "info");
        await simulateDownload("teaching_plan.pdf", 2000);
        setIsExporting(false);
        addToast("Teaching plan downloaded successfully.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Teaching Plan</h2>
                    <p className="text-gray-500 text-sm">Hourly topic distribution and CO mapping</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={isExporting}>
                    {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
                    Export Plan
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-200">
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Topic</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hours</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">CO Mapping</th>
                            <th className="p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Schedule</th>
                        </tr>
                    </thead>
                    <tbody>
                        {plan.map((item, idx) => (
                            <motion.tr
                                key={idx}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="border-b last:border-0 border-gray-100 hover:bg-gray-50/50"
                            >
                                <td className="p-4 font-medium text-gray-900">{item.topic}</td>
                                <td className="p-4 text-gray-600 font-medium">
                                    <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded text-sm">{item.hours} hrs</span>
                                </td>
                                <td className="p-4">
                                    <span className="bg-emerald-50 text-emerald-700 px-2 py-1 rounded text-xs font-bold">{item.co}</span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm flex items-center gap-2">
                                    <Calendar size={14} /> {item.date}
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
