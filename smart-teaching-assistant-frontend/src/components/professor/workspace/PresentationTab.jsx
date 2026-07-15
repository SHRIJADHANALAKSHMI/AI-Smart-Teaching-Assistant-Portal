import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronLeft, ChevronRight, Copy, Edit2, RotateCcw, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { presentation } from '../../../data/mock/presentation';
import { useToast } from '../../../context/ToastContext';
import { simulateAction, simulateDownload } from '../../../utils/simulateAction';

export default function PresentationTab() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isGenerating, setIsGenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const { addToast } = useToast();

    const totalSlides = presentation.slides.length;
    const slide = presentation.slides[currentSlide];

    const handleRegenerate = async () => {
        setIsGenerating(true);
        addToast("Regenerating slide deck formatting...", "info");
        await simulateAction(2500);
        setIsGenerating(false);
        addToast("Presentation regenerated.", "success");
    };

    const handleExport = async () => {
        setIsExporting(true);
        addToast("Exporting to PowerPoint (.pptx)...", "info");
        await simulateDownload("chapter_presentation.pptx", 2000);
        setIsExporting(false);
        addToast("Presentation downloaded.", "success");
    };

    const handleCopySlideContent = () => {
        const text = `${slide.title}\n\n${slide.content.join('\n')}`;
        navigator.clipboard.writeText(text);
        addToast("Slide content copied to clipboard.", "success");
    };

    const handleEditSlide = () => {
        addToast("Slide editor opened.", "info");
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">Lecture Presentation</h2>
                    <p className="text-gray-500 text-sm">AI-generated slides from the chapter content</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleRegenerate} disabled={isGenerating}>
                        {isGenerating ? <Loader2 size={16} className="mr-2 animate-spin" /> : <RotateCcw size={16} className="mr-2" />}
                        Regenerate
                    </Button>
                    <Button variant="primary" size="sm" onClick={handleExport} disabled={isExporting}>
                        {isExporting ? <Loader2 size={16} className="mr-2 animate-spin" /> : <Download size={16} className="mr-2" />}
                        Export PPT
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Main Slide Viewer */}
                <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col">
                    <div className="flex-1 p-10 flex flex-col justify-center items-center bg-gray-50 relative">
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="w-full max-w-2xl bg-white p-12 rounded-xl shadow-lg border border-gray-100 aspect-video flex flex-col justify-center"
                        >
                            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">{slide.title}</h1>
                            <ul className="space-y-4 text-gray-600 text-lg list-disc pl-6">
                                {slide.content.map((point, i) => (
                                    <motion.li key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                                        {point}
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                    <div className="border-t border-gray-200 p-4 bg-white flex justify-between items-center">
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={handleCopySlideContent}><Copy size={16} className="mr-2" />Copy Content</Button>
                            <Button variant="outline" size="sm" onClick={handleEditSlide}><Edit2 size={16} className="mr-2" />Edit Slide</Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-gray-500">Slide {currentSlide + 1} of {totalSlides}</span>
                            <div className="flex gap-1">
                                <Button variant="secondary" size="icon" onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))} disabled={currentSlide === 0}>
                                    <ChevronLeft size={18} />
                                </Button>
                                <Button variant="secondary" size="icon" onClick={() => setCurrentSlide(prev => Math.min(totalSlides - 1, prev + 1))} disabled={currentSlide === totalSlides - 1}>
                                    <ChevronRight size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Slide Previews */}
                <div className="lg:col-span-1 bg-white border border-gray-200 rounded-2xl p-4 flex flex-col gap-3">
                    <h3 className="font-semibold text-gray-800 text-sm mb-2 uppercase tracking-wider">Slide Previews</h3>
                    {presentation.slides.map((s, idx) => (
                        <button
                            key={s.id}
                            onClick={() => setCurrentSlide(idx)}
                            className={`text-left p-3 rounded-lg border transition-all ${currentSlide === idx ? 'border-orange-500 ring-2 ring-orange-500/20 bg-orange-50/50' : 'border-gray-200 hover:border-orange-300'}`}
                        >
                            <div className="text-xs text-gray-400 mb-1 font-medium">Slide {idx + 1}</div>
                            <div className="text-sm font-semibold text-gray-900 line-clamp-2">{s.title}</div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
