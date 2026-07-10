import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Copy, Expand, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useToast } from '../../../context/ToastContext';
import { simulateDownload } from '../../../utils/simulateAction';

export default function KeyPointsTab() {
    const { addToast } = useToast();
    const [isExporting, setIsExporting] = useState(false);

    const points = [
        { title: "Definition", desc: "An operating system is the system software that manages computer hardware, software resources, and provides common services for computer programs." },
        { title: "Core Utility", desc: "Resource allocation and protection are primary concerns of a modern OS." },
        { title: "Evolution", desc: "Evolved from serial processing to batch processing, multiprogramming, and timesharing systems." }
    ];

    const handleDownload = async () => {
        setIsExporting(true);
        addToast("Preparing semantic summary...", "info");
        await simulateDownload("key_points.pdf", 1500);
        setIsExporting(false);
        addToast("Summary downloaded successfully.", "success");
    };

    const handleCopy = (title, desc) => {
        navigator.clipboard.writeText(`${title}\n${desc}`);
        addToast("Point copied to clipboard.", "success");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Key Points / Summary</h2>
                    <p className="text-gray-500 text-sm">Extracted highlights and semantic summary</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleDownload} disabled={isExporting}>
                    {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <FileText size={16} className="mr-2" />}
                    Download Summary
                </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {points.map((pt, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="border-b last:border-b-0 border-gray-100 p-6 hover:bg-gray-50 transition-colors group flex justify-between items-start"
                    >
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">{pt.title}</h4>
                            <p className="text-gray-600 text-sm">{pt.desc}</p>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary" size="icon" onClick={() => handleCopy(pt.title, pt.desc)}><Copy size={16} /></Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
