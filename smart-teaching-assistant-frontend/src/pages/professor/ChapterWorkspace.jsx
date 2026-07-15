import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Download, FileText, Bookmark, Copy, RefreshCw, BookOpen, Clock, Target, AlertTriangle, MonitorPlay, Library, Lightbulb, TrendingUp, Zap, HelpCircle } from 'lucide-react';
import { subjects } from '../../data/mock/subjects';
import { chapters } from '../../data/mock/chapters';
import { useToast } from '../../context/ToastContext';
import { simulateAction, simulateDownload } from '../../utils/simulateAction';

// Import Tabs
import { OverviewTab } from '../../components/professor/workspace/OverviewTab';
import { QuizTab } from '../../components/professor/workspace/QuizTab';
import KeyPointsTab from '../../components/professor/workspace/KeyPointsTab';
import PresentationTab from '../../components/professor/workspace/PresentationTab';
import AssignmentsTab from '../../components/professor/workspace/AssignmentsTab';
import QuestionBankTab from '../../components/professor/workspace/QuestionBankTab';
import TeachingPlanTab from '../../components/professor/workspace/TeachingPlanTab';
import TimelineTab from '../../components/professor/workspace/TimelineTab';
import AINotesTab from '../../components/professor/workspace/AINotesTab';
import LearningOutcomesTab from '../../components/professor/workspace/LearningOutcomesTab';
import IndustryExamplesTab from '../../components/professor/workspace/IndustryExamplesTab';
import BloomTaxonomyTab from '../../components/professor/workspace/BloomTaxonomyTab';
import VivaQuestionsTab from '../../components/professor/workspace/VivaQuestionsTab';
import CodingProblemsTab from '../../components/professor/workspace/CodingProblemsTab';

const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'keypoints', label: 'Key Points' },
    { id: 'presentation', label: 'Presentation' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'assignments', label: 'Assignments' },
    { id: 'questionbank', label: 'Question Bank' },
    { id: 'teachingplan', label: 'Teaching Plan' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'ainotes', label: 'AI Notes' },
    { id: 'learningoutcomes', label: 'Learning Outcomes' },
    { id: 'industryexamples', label: 'Industry Examples' },
    { id: 'bloomtaxonomy', label: 'Bloom Taxonomy' },
    { id: 'vivaquestions', label: 'Viva Questions' },
    { id: 'codingproblems', label: 'Coding Problems' }
];

export default function ChapterWorkspace() {
    const { subjectId, chapterId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        if (!subjectId || !chapterId) {
            navigate('/professor/upload', { replace: true });
        }
    }, [subjectId, chapterId, navigate]);

    const subject = subjects.find(s => s.id === (subjectId || "CS401")) || subjects[0];
    const subjectChapters = chapters.filter(c => c.subjectId === subject.id);
    const selectedChapterIndex = subjectChapters.findIndex(c => c.id === chapterId);
    const activeChapter = selectedChapterIndex !== -1 ? subjectChapters[selectedChapterIndex] : subjectChapters[0];

    const [activeTab, setActiveTab] = useState('overview');
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        addToast(isBookmarked ? "Removed from bookmarks." : "Chapter bookmarked successfully.", "success");
    };

    const handleCopy = () => {
        navigator.clipboard.writeText("Copied chapter content metadata.");
        addToast("Copied to clipboard!", "success");
    };

    const handleRegenerate = async () => {
        setIsRegenerating(true);
        addToast("Regenerating chapter intelligence...", "info");
        await simulateAction(2500);
        setIsRegenerating(false);
        addToast("Chapter intelligence refreshed successfully.", "success");
    };

    const handleExport = async () => {
        setIsExporting(true);
        addToast("Preparing export package...", "info");
        await simulateDownload("chapter-export.zip", 2000);
        setIsExporting(false);
        addToast("Download completed successfully.", "success");
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <OverviewTab />;
            case 'keypoints': return <KeyPointsTab />;
            case 'presentation': return <PresentationTab />;
            case 'quiz': return <QuizTab />;
            case 'assignments': return <AssignmentsTab />;
            case 'questionbank': return <QuestionBankTab />;
            case 'teachingplan': return <TeachingPlanTab />;
            case 'timeline': return <TimelineTab />;
            case 'ainotes': return <AINotesTab />;
            case 'learningoutcomes': return <LearningOutcomesTab />;
            case 'industryexamples': return <IndustryExamplesTab />;
            case 'bloomtaxonomy': return <BloomTaxonomyTab />;
            case 'vivaquestions': return <VivaQuestionsTab />;
            case 'codingproblems': return <CodingProblemsTab />;
            default: return <OverviewTab />;
        }
    };

    if (!activeChapter) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-12 text-center w-full">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 border border-gray-200 shadow-sm">
                    <FileText size={32} className="text-gray-400" />
                </div>
                <h2 className="text-[32px] font-bold text-gray-900 mb-2">No analysis generated</h2>
                <p className="text-[15px] text-gray-500 max-w-sm mb-8">Upload course material to automatically generate chapters, slides, quizzes, and teaching plans.</p>
                <button className="h-[44px] px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-[12px] font-bold text-[15px] shadow-sm hover:shadow-md transition-shadow" onClick={() => navigate('/professor/upload')}>
                    Upload Material
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24">
            <div className="max-w-[1600px] mx-auto p-4 sm:p-6 lg:p-8 space-y-8">

                {/* 1. HEADER AREA */}
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-center gap-6">
                    <div className="flex items-center gap-4 flex-wrap">
                        <h1 className="text-[32px] font-bold text-slate-900 leading-tight">{activeChapter.title}</h1>
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-3 py-1 text-[13px] font-bold rounded-full uppercase tracking-wider shrink-0 shadow-sm align-middle">Unit {selectedChapterIndex + 1}</span>
                    </div>
                    <div className="flex gap-4 shrink-0 overflow-x-auto pb-1 xl:pb-0 hide-scrollbar">
                        <button onClick={handleRegenerate} disabled={isRegenerating} className="h-[44px] px-6 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-[12px] font-bold text-[15px] transition-all shadow-sm whitespace-nowrap shrink-0">
                            <RefreshCw size={18} className={isRegenerating ? "animate-spin" : ""} /> Regenerate
                        </button>
                        <button onClick={handleCopy} className="h-[44px] px-6 flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-[12px] font-bold text-[15px] transition-all shadow-sm whitespace-nowrap shrink-0">
                            <Copy size={18} /> Copy
                        </button>
                        <button onClick={handleBookmark} className="h-[44px] w-[44px] flex items-center justify-center bg-white border border-slate-200 hover:border-slate-300 text-slate-700 rounded-[12px] shadow-sm transition-all shrink-0">
                            <Bookmark size={18} className={isBookmarked ? "text-orange-500 fill-orange-500" : ""} />
                        </button>
                        <button onClick={handleExport} disabled={isExporting} className="h-[44px] px-6 flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-[12px] font-bold text-[15px] transition-all shadow-[0_4px_14px_rgba(16,185,129,0.3)] whitespace-nowrap shrink-0">
                            <Download size={18} /> Export Process
                        </button>
                    </div>
                </div>

                {/* 2. AI METRICS PREMIUM STRIP */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Confidence */}
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:-translate-y-0.5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-[12px]"><Target size={20} /></div>
                            <span className="text-[15px] font-semibold text-slate-500">AI Confidence</span>
                        </div>
                        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">98%</h2>
                    </div>

                    {/* Time */}
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:-translate-y-0.5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-[12px]"><Clock size={20} /></div>
                            <span className="text-[15px] font-semibold text-slate-500">Estimated Time</span>
                        </div>
                        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">3 Hours</h2>
                    </div>

                    {/* Difficulty */}
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:-translate-y-0.5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-amber-50 text-amber-600 rounded-[12px]"><AlertTriangle size={20} /></div>
                            <span className="text-[15px] font-semibold text-slate-500">Difficulty</span>
                        </div>
                        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">{activeChapter.difficulty || "Medium"}</h2>
                    </div>

                    {/* Bloom Level */}
                    <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100 flex flex-col transition-all hover:shadow-[0_8px_30px_rgba(15,23,42,0.04)] hover:-translate-y-0.5">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2.5 bg-purple-50 text-purple-600 rounded-[12px]"><TrendingUp size={20} /></div>
                            <span className="text-[15px] font-semibold text-slate-500">Bloom Level</span>
                        </div>
                        <h2 className="text-[32px] font-bold text-slate-900 tracking-tight">Apply</h2>
                    </div>
                </div>

                {/* 3. STICKY TABS */}
                <div className="sticky top-0 z-40 bg-[#F8FAFC]/90 backdrop-blur-md pb-4 pt-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 border-b border-slate-200/50">
                    <div className="flex overflow-x-auto no-scrollbar min-w-max space-x-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-5 py-3 text-[15px] font-bold transition-all rounded-[12px] whitespace-nowrap outline-none ${activeTab === tab.id
                                    ? 'bg-slate-900 text-white shadow-md'
                                    : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 shadow-sm'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* 4. MAIN CONTENT GRID */}
                <div className="grid grid-cols-1 xl:grid-cols-[340px_1fr] items-start gap-8 relative">

                    {/* Left Navigation Sidebar */}
                    <div className="sticky top-[100px] bg-white rounded-[20px] border border-slate-200 p-4 shadow-[0_2px_12px_rgba(15,23,42,0.02)] hidden xl:block self-start">
                        <div className="mb-6 px-2 pt-2">
                            <h3 className="font-bold text-[18px] text-slate-900 tracking-tight flex items-center gap-2">
                                <div className="p-1.5 bg-slate-100 rounded-[8px]"><BookOpen size={16} className="text-slate-700" /></div> Topics
                            </h3>
                            <p className="text-[13px] font-semibold text-slate-400 mt-2">Navigate Syllabus</p>
                        </div>
                        <div className="space-y-1">
                            {subjectChapters.map((chap, idx) => {
                                const isActive = activeChapter?.id === chap.id;
                                return (
                                    <button
                                        key={chap.id}
                                        onClick={() => navigate(`/professor/workspace/${subject.id}/${chap.id}`)}
                                        className={`w-full text-left px-4 py-3.5 rounded-[12px] text-[15px] transition-all flex items-center gap-3 outline-none ${isActive
                                            ? 'bg-emerald-50 text-emerald-900 font-bold relative'
                                            : 'text-slate-600 font-medium hover:bg-slate-50 hover:text-slate-900'
                                            }`}
                                    >
                                        {isActive && (
                                            <div className="absolute left-0 top-[20%] bottom-[20%] w-[4px] bg-emerald-500 rounded-r-full shadow-sm" />
                                        )}
                                        <div className={`w-7 h-7 rounded-[8px] flex items-center justify-center shrink-0 text-[13px] font-bold transition-colors ${isActive ? 'bg-white text-emerald-600 shadow-sm' : 'bg-slate-100 text-slate-500 border border-slate-200'
                                            }`}>
                                            {idx + 1}
                                        </div>
                                        <div className="truncate flex-1">{chap.title}</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Main Flowing Content */}
                    <div className="min-w-0 flex flex-col gap-8">
                        <div>
                            {renderContent()}
                        </div>

                        {/* 5. BOTTOM KNOWLEDGE METADATA CARDS */}
                        <div className="pt-8 border-t border-slate-200">
                            <h2 className="text-[22px] font-bold text-slate-900 mb-6">Chapter Metadata</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Details Card */}
                                <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100">
                                    <div className="flex items-center gap-3 mb-4 text-emerald-600">
                                        <HelpCircle size={20} />
                                        <h3 className="text-[18px] font-bold text-slate-900">Difficulty Context</h3>
                                    </div>
                                    <p className="text-[15px] text-slate-600 leading-relaxed">This chapter requires foundational knowledge in basic programming. Concepts like pointers and memory allocation will be heavily utilized when explaining OS-level system properties.</p>
                                </div>
                                <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100">
                                    <div className="flex items-center gap-3 mb-4 text-blue-500">
                                        <Clock size={20} />
                                        <h3 className="text-[18px] font-bold text-slate-900">Time Allocation</h3>
                                    </div>
                                    <p className="text-[15px] text-slate-600 leading-relaxed">Lectures: 3 Hours<br />Practical: 2 Hours<br />Expected Student Self-Study: 4 Hours for mastery.</p>
                                </div>
                                <div className="bg-white p-6 rounded-[20px] shadow-[0_2px_12px_rgba(15,23,42,0.03)] border border-slate-100">
                                    <div className="flex items-center gap-3 mb-4 text-purple-500">
                                        <Zap size={20} />
                                        <h3 className="text-[18px] font-bold text-slate-900">Prerequisites</h3>
                                    </div>
                                    <ul className="list-disc ml-5 text-[15px] text-slate-600 space-y-1">
                                        <li>C Programming Background</li>
                                        <li>Basic Computer Architecture</li>
                                        <li>Understanding of Arrays & Linked Lists</li>
                                    </ul>
                                </div>
                                <div className="bg-slate-900 p-6 rounded-[20px] shadow-[0_12px_30px_rgba(15,23,42,0.15)] text-white">
                                    <div className="flex items-center gap-3 mb-5 text-orange-400">
                                        <Library size={20} />
                                        <h3 className="text-[18px] font-bold text-white">Resources</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-4 bg-white/10 p-3 rounded-[12px] hover:bg-white/20 transition-colors cursor-pointer">
                                            <MonitorPlay size={18} className="text-emerald-400 shrink-0" />
                                            <div>
                                                <div className="text-[15px] font-bold">MIT OCW: OS Architecture</div>
                                                <div className="text-[13px] text-slate-400">Video • 45m</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 bg-white/10 p-3 rounded-[12px] hover:bg-white/20 transition-colors cursor-pointer">
                                            <BookOpen size={18} className="text-orange-400 shrink-0" />
                                            <div>
                                                <div className="text-[15px] font-bold">Operating Systems Concept</div>
                                                <div className="text-[13px] text-slate-400">Silberschatz Docs</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
