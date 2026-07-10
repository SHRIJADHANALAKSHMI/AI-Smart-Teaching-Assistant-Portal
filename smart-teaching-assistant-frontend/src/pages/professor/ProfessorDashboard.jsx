import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    Users, BookOpen, BrainCircuit, Activity,
    Clock, CheckCircle, UploadCloud, Calendar, Loader2
} from 'lucide-react';
import { currentProfessor } from '../../data/mock/professor';
import { StatCard } from '../../components/ui/StatCard';
import { GlassCard } from '../../components/ui/GlassCard';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { simulateAction } from '../../utils/simulateAction';

export default function ProfessorDashboard() {
    const navigate = useNavigate();
    const { addToast } = useToast();
    const [generatingAction, setGeneratingAction] = useState(null);

    const containerVars = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVars = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    };

    const handleScheduleClick = () => {
        addToast("Opening master schedule...", "info");
    };

    const handleQuickAction = async (actionLabel) => {
        setGeneratingAction(actionLabel);
        addToast(`Starting AI generation for ${actionLabel}...`, "info");
        await simulateAction(1500);
        addToast(`${actionLabel} generated successfully!`, "success");
        setGeneratingAction(null);
        navigate('/professor/subjects');
    };

    const handleStatCardClick = (path) => {
        navigate(path);
    };

    return (
        <motion.div
            className="space-y-8 pb-12"
            variants={containerVars}
            initial="hidden"
            animate="show"
        >
            {/* Hero Header */}
            <motion.div variants={itemVars} className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                        Welcome back, {currentProfessor.name.split(' ')[1]}
                    </h1>
                    <p className="text-gray-500 mt-2 max-w-2xl text-base">
                        You have 3 subjects active this semester. AI has processed 12 chapters this week, saving you approximately 18 hours of manual work.
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2" onClick={handleScheduleClick}>
                        <Calendar size={16} /> Schedule
                    </Button>
                    <Button variant="primary" className="gap-2" onClick={() => navigate('/professor/upload')}>
                        <UploadCloud size={16} /> Upload Book
                    </Button>
                </div>
            </motion.div>

            {/* Metrics Row */}
            <motion.div variants={itemVars} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="cursor-pointer" onClick={() => handleStatCardClick('/professor/subjects')}>
                    <StatCard
                        title="Total Subjects"
                        value={currentProfessor.stats.totalSubjects}
                        icon={BookOpen}
                        color="orange"
                    />
                </div>
                <div className="cursor-pointer" onClick={() => handleStatCardClick('/professor/analytics')}>
                    <StatCard
                        title="Students Impacted"
                        value={currentProfessor.stats.studentsImpacted}
                        icon={Users}
                        color="emerald"
                        trend="up"
                        trendValue="12%"
                    />
                </div>
                <div className="cursor-pointer" onClick={() => handleStatCardClick('/professor/ai-history')}>
                    <StatCard
                        title="AI Generations"
                        value={currentProfessor.stats.aiGenerations}
                        icon={BrainCircuit}
                        color="purple"
                        trend="up"
                        trendValue="8%"
                    />
                </div>
                <div className="cursor-pointer" onClick={() => handleStatCardClick('/professor/assessments')}>
                    <StatCard
                        title="Pending Reviews"
                        value={currentProfessor.stats.pendingReviews}
                        icon={Activity}
                        color="warning"
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <motion.div variants={itemVars} className="lg:col-span-2">
                    <GlassCard className="h-full border border-gray-200/50 shadow-sm shadow-gray-200/50 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule & Processing</h3>
                            <Button variant="ghost" size="sm" onClick={() => addToast("Loading full schedule...", "info")}>View All</Button>
                        </div>
                        <div className="space-y-4 flex-1">
                            {[
                                { time: "09:00 AM", title: "Advanced AI Lecture", desc: "CS401 - Room 302", status: "completed" },
                                { time: "11:30 AM", title: "Chapter 4 Extraction", desc: "AI is currently extracting concepts", status: "processing" },
                                { time: "02:00 PM", title: "Database Systems", desc: "CS305 - Online", status: "upcoming" }
                            ].map((item, idx) => (
                                <div key={idx} onClick={() => navigate('/professor/subjects')} className="cursor-pointer flex gap-4 p-4 rounded-xl border border-gray-100 hover:border-orange-200 bg-white hover:shadow-sm transition-all group">
                                    <div className="w-20 pt-1 shrink-0">
                                        <span className="text-sm font-medium text-gray-500">{item.time}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">{item.title}</h4>
                                        <p className="text-sm text-gray-500">{item.desc}</p>
                                    </div>
                                    <div className="shrink-0 flex items-center">
                                        {item.status === 'completed' && <CheckCircle size={20} className="text-emerald-500" />}
                                        {item.status === 'processing' && <div className="h-5 w-5 rounded-full border-2 border-r-transparent border-orange-500 animate-spin" />}
                                        {item.status === 'upcoming' && <Clock size={20} className="text-gray-300" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>

                {/* AI Action Hub */}
                <motion.div variants={itemVars}>
                    <GlassCard className="h-full bg-gradient-to-br from-orange-500 to-orange-400 border-none shadow-orange-500/20 text-white relative overflow-hidden flex flex-col">
                        {/* Decorative blob */}
                        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl pointer-events-none" />

                        <h3 className="text-lg font-semibold mb-2">Quick AI Actions</h3>
                        <p className="text-orange-100 text-sm mb-6">Select a frequent action to instantly launch the AI workflow.</p>

                        <div className="space-y-3 flex-1">
                            {[
                                { icon: BookOpen, label: "Generate PPT from Chapter" },
                                { icon: BrainCircuit, label: "Create Quiz Questions" },
                                { icon: CheckCircle, label: "Formulate Assignments" }
                            ].map((action, i) => (
                                <button disabled={generatingAction !== null} onClick={() => handleQuickAction(action.label)} key={i} className="flex items-center gap-3 w-full p-3 rounded-xl bg-black/10 hover:bg-black/20 disabled:opacity-50 text-left transition-colors relative">
                                    <div className="p-2 bg-white/20 rounded-lg">
                                        {generatingAction === action.label ? <Loader2 size={16} className="animate-spin text-white" /> : <action.icon size={16} />}
                                    </div>
                                    <span className="font-medium text-sm">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </GlassCard>
                </motion.div>
            </div>

        </motion.div>
    );
}
