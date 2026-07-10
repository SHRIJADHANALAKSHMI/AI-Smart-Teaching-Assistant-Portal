import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, Loader2, Play } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { GlassCard } from '../../components/ui/GlassCard';
import { useNavigate } from 'react-router-dom';
import { subjects } from '../../data/mock/subjects';

export default function UploadMaterial() {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(subjects[0].id);
    const navigate = useNavigate();

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAnalyze = () => {
        if (!file || !selectedSubject) return;
        navigate(`/professor/workspace/${selectedSubject}/process`);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12 w-full">
            <div className="text-center max-w-2xl mx-auto mb-10">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Upload Course Material</h1>
                <p className="text-gray-500 mt-2">Upload your textbook or syllabus. Our AI will automatically extract chapters, generate presentations, and prepare question banks.</p>
            </div>

            <GlassCard className="!p-8 border border-gray-200/60 shadow-sm relative overflow-hidden bg-white flex flex-col gap-8">

                {/* Subject Selection */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-900">Select Subject</label>
                    <select
                        value={selectedSubject}
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 outline-none focus:ring-2 focus:ring-orange-500/50"
                    >
                        {subjects.map(sub => (
                            <option key={sub.id} value={sub.id}>{sub.name} ({sub.code})</option>
                        ))}
                    </select>
                </div>

                <div
                    className={`p-12 pb-16 text-center border-2 border-dashed rounded-2xl transition-all ${dragActive ? 'border-orange-500 bg-orange-50/50' : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/20'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <div className="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-orange-500">
                        <UploadCloud size={32} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Drag & drop your file here</h3>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">Supports PDF, DOCX, and PPT. Maximum file size 50MB.</p>

                    <input type="file" id="file-upload" className="hidden" accept=".pdf,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} />
                    <Button variant="secondary" onClick={() => document.getElementById('file-upload').click()}>
                        Browse Files
                    </Button>
                </div>

                {/* Uploaded state indicator */}
                {file && (
                    <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-3">
                            <FileText size={24} className="text-emerald-500" />
                            <div>
                                <h4 className="font-semibold text-emerald-900 text-sm">{file.name}</h4>
                                <span className="text-xs text-emerald-600">{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                            </div>
                        </div>
                        <Button variant="primary" onClick={handleAnalyze}>
                            <Play size={16} className="mr-2" /> Upload & Analyze
                        </Button>
                    </div>
                )}
            </GlassCard>
        </div>
    );
}
