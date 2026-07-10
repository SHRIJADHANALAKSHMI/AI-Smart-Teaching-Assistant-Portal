import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, Copy, Edit3, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { notes } from '../../../data/mock/notes';
import { useToast } from '../../../context/ToastContext';
import { simulateDownload } from '../../../utils/simulateAction';

export default function AINotesTab() {
    const currentNote = notes[0]; // mock active note
    const { addToast } = useToast();
    const [downloadingFormat, setDownloadingFormat] = useState(null);

    const handleDownload = async (format) => {
        setDownloadingFormat(format);
        addToast(`Formatting notes as ${format.toUpperCase()}...`, "info");
        await simulateDownload(`ai_notes.${format}`, 1500);
        setDownloadingFormat(null);
        addToast(`Notes downloaded as ${format.toUpperCase()}.`, "success");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("Operating System Basics\n\nAn Operating System (OS) acts as an intermediary between the user of a computer and the computer hardware.");
        addToast("Notes copied to clipboard", "success");
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">AI Study Notes</h2>
                    <p className="text-gray-500 text-sm">Comprehensive text generation based on document parsing</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}><Copy size={16} className="mr-2" /> Copy</Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownload('docx')} disabled={downloadingFormat === 'docx'}>
                        {downloadingFormat === 'docx' ? <Loader2 size={16} className="mr-2 animate-spin" /> : <FileText size={16} className="mr-2" />} DOCX
                    </Button>
                    <Button variant="primary" size="sm" onClick={() => handleDownload('pdf')} disabled={downloadingFormat === 'pdf'}>
                        {downloadingFormat === 'pdf' ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />} PDF
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 bg-white rounded-2xl border border-gray-200 p-8 shadow-sm relative min-h-[500px]"
            >
                <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="icon" onClick={() => addToast("Editor mode enabled", "info")}><Edit3 size={16} /></Button>
                </div>
                <div className="prose max-w-none text-gray-800">
                    {/* Rendering simple mock markdown implementation */}
                    <h2 className="text-2xl font-bold mb-4 border-b pb-2">Operating System Basics</h2>
                    <p className="mb-4 text-lg/relaxed">
                        An <strong>Operating System (OS)</strong> acts as an intermediary between the user of a computer and the computer hardware. Its primary goal is to make the computer system convenient to use and efficient.
                    </p>
                    <h3 className="text-xl font-semibold mt-6 mb-3 text-orange-600">Key Functions</h3>
                    <ul className="list-disc pl-5 space-y-2 text-lg/relaxed">
                        <li><strong>Resource Allocation:</strong> Manages CPU, memory, and I/O devices fairly among competing programs.</li>
                        <li><strong>Control Program:</strong> Controls execution of programs to prevent errors and improper use of the computer.</li>
                        <li><strong>Interface Management:</strong> Provides UI and APIs (System Calls) for interaction.</li>
                    </ul>
                </div>
            </motion.div>
        </div>
    );
}
