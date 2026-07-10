import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Play, Loader2 } from 'lucide-react';
import { Button } from '../../ui/Button';
import { useToast } from '../../../context/ToastContext';
import { simulateAction } from '../../../utils/simulateAction';

export default function CodingProblemsTab() {
    const { addToast } = useToast();
    const [activeSandbox, setActiveSandbox] = useState(null);

    const handleTryCode = async (title) => {
        setActiveSandbox(title);
        addToast(`Preparing secure IDE environment for ${title}...`, "info");
        await simulateAction(2500);
        setActiveSandbox(null);
        addToast("Interactive coding environment launched in a new tab.", "success");
    };

    const problems = [
        {
            title: "Custom Shell Implementation",
            desc: "Implement a simple C program that acts as a shell. Use fork(), exec(), and wait() system calls.",
            lang: "C",
            difficulty: "Hard"
        },
        {
            title: "Zombie Process Creator",
            desc: "Write a program to demonstrate a zombie process scenario for 10 seconds before it gets reaped.",
            lang: "C/C++",
            difficulty: "Medium"
        }
    ];

    return (
        <div className="flex flex-col gap-6">
            <div className="mb-2">
                <h2 className="text-xl font-bold text-gray-900">Coding Problems</h2>
                <p className="text-gray-500 text-sm">Lab exercises extracted from theory concepts</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {problems.map((prob, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-[#1E1E1E] text-white p-6 rounded-xl border border-gray-800 shadow-xl relative overflow-hidden"
                    >
                        {/* Syntax highlight ambient background */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full"></div>

                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div className="flex items-center gap-2">
                                <Code2 size={20} className="text-emerald-400" />
                                <h3 className="font-bold text-lg">{prob.title}</h3>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded bg-black/50 ${prob.difficulty === 'Hard' ? 'text-rose-400' : 'text-amber-400'}`}>
                                {prob.difficulty}
                            </span>
                        </div>

                        <p className="text-gray-400 mb-6 relative z-10">{prob.desc}</p>

                        <div className="flex justify-between items-center relative z-10 pt-4 border-t border-white/10">
                            <span className="text-sm font-mono text-gray-500">Lang: {prob.lang}</span>
                            <div className="flex gap-2">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    className="bg-white/10 hover:bg-white/20 text-white border-0"
                                    onClick={() => handleTryCode(prob.title)}
                                    disabled={activeSandbox === prob.title}
                                >
                                    {activeSandbox === prob.title ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Play size={14} className="mr-2" />}
                                    Try Code
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
