import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { CheckCircle2, Loader2, Cpu } from 'lucide-react';
import { chapters } from '../../data/mock/chapters'; // to get fallback chapter id

const steps = [
    "Uploading document",
    "Extracting text",
    "Detecting chapters",
    "Identifying topics",
    "Generating Key Points",
    "Generating Presentation",
    "Generating Quiz",
    "Generating Assignments",
    "Generating Question Bank",
    "Generating Teaching Plan",
    "Generating Timeline",
    "Generating AI Notes",
    "Generating Learning Outcomes",
    "Generating Industry Examples",
    "Generating Bloom Taxonomy Questions",
    "Generating Viva Questions",
    "Generating Coding Problems"
];

export default function AIProcessing() {
    const { subjectId } = useParams();
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);
    const [progress, setProgress] = useState(0);

    // Default target chapter based on the selected subject
    const subjectChapters = chapters.filter(c => c.subjectId === subjectId);
    const targetChapterId = subjectChapters.length > 0 ? subjectChapters[0].id : "empty";

    useEffect(() => {
        // Automatically progress through the steps over time
        const stepIntervalTime = 400; // ms per step
        const totalSteps = steps.length;

        const stepInterval = setInterval(() => {
            setCurrentStep((prev) => {
                if (prev < totalSteps) {
                    return prev + 1;
                }
                return prev;
            });
        }, stepIntervalTime);

        // Calculate continuous progress bar
        const totalDuration = stepIntervalTime * totalSteps;
        let progressStart = Date.now();

        const progressInterval = setInterval(() => {
            const elapsed = Date.now() - progressStart;
            let currentProg = Math.min((elapsed / totalDuration) * 100, 100);
            setProgress(currentProg);

            if (currentProg === 100) {
                clearInterval(progressInterval);
                clearInterval(stepInterval);
                setTimeout(() => {
                    navigate(`/professor/workspace/${subjectId}/${targetChapterId}`, { replace: true });
                }, 500); // short delay at 100% before redirect
            }
        }, 50);

        return () => {
            clearInterval(stepInterval);
            clearInterval(progressInterval);
        };
    }, [navigate, subjectId, targetChapterId]);

    return (
        <div className="fixed inset-0 z-50 bg-[#FAFAFA] flex flex-col items-center justify-center selection:bg-orange-100">
            {/* Ambient Background Elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-300/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-orange-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-2xl bg-white p-12 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
                <div className="flex flex-col items-center mb-10 text-center">
                    <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-orange-100 relative overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                            className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(249,115,22,0.2)_360deg)] rounded-full"
                        />
                        <Cpu size={40} className="text-orange-500 relative z-10" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">AI Analysis in Progress</h1>
                    <p className="text-gray-500 text-lg">Intelligently restructuring your course material into a premium workspace.</p>
                </div>

                {/* Progress Bar Container */}
                <div className="mb-12">
                    <div className="flex justify-between items-end mb-3 text-sm font-semibold">
                        <span className="text-gray-900">Total Progress</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-emerald-500 text-xl">{Math.floor(progress)}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden shrink-0">
                        <motion.div
                            className="h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-orange-400"
                            style={{ width: `${progress}%` }}
                            layout
                        />
                    </div>
                </div>

                {/* Steps List (Scrolling window of 3 items) */}
                <div className="h-40 relative overflow-hidden flex flex-col justify-end pb-4 font-mono">
                    <div className="absolute top-0 w-full h-8 bg-gradient-to-b from-white to-transparent z-10"></div>
                    <AnimatePresence>
                        {steps.slice(0, currentStep + 1).slice(-4).map((step, idx, arr) => {
                            const isLatest = idx === arr.length - 1 && currentStep < steps.length;
                            const isCompleted = currentStep >= steps.length || idx < arr.length - 1;

                            return (
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isLatest ? 1 : (1 - (arr.length - 1 - idx) * 0.3),
                                        y: 0
                                    }}
                                    layout
                                    className={`flex items-center gap-3 py-2 ${isLatest ? 'text-gray-900 font-semibold' : 'text-gray-400'}`}
                                >
                                    {isCompleted ? (
                                        <CheckCircle2 size={16} className={isLatest ? 'text-emerald-500' : 'text-gray-300'} />
                                    ) : (
                                        <Loader2 size={16} className="text-orange-500 animate-spin" />
                                    )}
                                    {isCompleted ? (
                                        <span className="text-emerald-600 mr-2">✓</span>
                                    ) : (
                                        <span className="text-orange-500 animate-pulse mr-2">➜</span>
                                    )}
                                    {step}...
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </motion.div>

        </div>
    );
}
