import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Settings, ExternalLink, Download, FileText, Bookmark, Copy, RefreshCw, Search, ArrowLeft, ArrowRight, BookOpen, Clock, Activity, Target, Loader2 } from 'lucide-react';
import { subjects } from '../../data/mock/subjects';
import { chapters } from '../../data/mock/chapters';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
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

// Skeleton Loader Component
const SkeletonLoader = () => (
    <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-32 bg-gray-200 rounded-xl"></div>
        <div className="grid grid-cols-2 gap-4">
            <div className="h-48 bg-gray-200 rounded-xl"></div>
            <div className="h-48 bg-gray-200 rounded-xl"></div>
        </div>
    </div>
);

export default function ChapterWorkspace() {
    const { subjectId, chapterId } = useParams();
    const navigate = useNavigate();
    const { addToast } = useToast();

    useEffect(() => {
        if (!subjectId || !chapterId) {
            navigate('/professor/upload', { replace: true });
        }
    }, [subjectId, chapterId, navigate]);

    // Find active states
    const subject = subjects.find(s => s.id === (subjectId || "CS401")) || subjects[0];
    // Filter chapters belonging to subject
    const subjectChapters = chapters.filter(c => c.subjectId === subject.id);
    const selectedChapterIndex = subjectChapters.findIndex(c => c.id === chapterId);

    // Fallbacks
    const activeChapter = selectedChapterIndex !== -1 ? subjectChapters[selectedChapterIndex] : subjectChapters[0];

    // Added Interactivity States
    const [activeTab, setActiveTab] = useState('overview');
    const [isLoading, setIsLoading] = useState(false);
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    // Mock Extra metadata wrapper
    const analysisMeta = {
        confidenceScore: 98,
        estimatedTeachingTime: "3 Hours",
        readingTime: "45 Mins",
        difficultyLevel: activeChapter?.difficulty || "Medium",
        lastGenerated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        completionScore: 0
    };

    // When chapter or tab changes, trigger 500ms loader
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, [chapterId, activeTab]);

    const handleTabChange = (tabId) => {
        if (activeTab === tabId) return;
        setActiveTab(tabId);
    };

    const navigateChapter = (dir) => {
        let newIndex = selectedChapterIndex + dir;
        if (newIndex >= 0 && newIndex < subjectChapters.length) {
            navigate(`/professor/workspace/${subject.id}/${subjectChapters[newIndex].id}`);
        }
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

    const handleBookmark = () => {
        setIsBookmarked(!isBookmarked);
        addToast(isBookmarked ? "Removed from bookmarks." : "Chapter bookmarked successfully.", "success");
    };

    const renderContent = () => {
        if (isLoading || isRegenerating) return <SkeletonLoader />;

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

    return (
        <div className="pb-12 w-full h-[calc(100vh-80px)] overflow-hidden flex gap-4">

            {/* Left Sidebar - Chapters */}
            <div className="w-80 bg-white border border-gray-200 rounded-2xl flex flex-col overflow-hidden shadow-sm flex-shrink-0">
                <div className="p-5 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 tracking-tight flex items-center gap-2"><BookOpen size={18} className="text-orange-500" /> Syllabus Clusters</h3>
                    <p className="text-xs text-gray-500 mt-1">Extracted AI Topics</p>
                </div>
                <div className="overflow-y-auto p-4 space-y-6 flex-1 custom-scrollbar">
                    {subjectChapters.length === 0 ? (
                        <div className="text-sm text-gray-500 text-center py-6 border-2 border-dashed border-gray-100 rounded-lg">No chapters extracted yet.</div>
                    ) : (
                        <div>
                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Unit 1</h4>
                            <div className="space-y-1">
                                {subjectChapters.map((chap, idx) => {
                                    const isActive = activeChapter?.id === chap.id;
                                    return (
                                        <button
                                            key={chap.id}
                                            onClick={() => navigate(`/professor/workspace/${subject.id}/${chap.id}`)}
                                            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive
                                                ? 'bg-orange-50 text-orange-900 shadow-sm border border-orange-100/50 relative'
                                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent'
                                                }`}
                                        >
                                            <div className="truncate">{idx + 1}. {chap.title}</div>
                                            {isActive && (
                                                <motion.div layoutId="activeSidebar" className="absolute left-0 top-0 bottom-0 w-1 bg-orange-500 rounded-r-full" />
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full bg-white text-left border border-gray-200 rounded-2xl shadow-[0_2px_10px_rgb(0,0,0,0.02)] overflow-hidden relative">

                {!activeChapter ? (
                    <div className="flex-1 flex flex-col justify-center items-center p-12 text-center h-full">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mb-6 border border-gray-100 shadow-sm">
                            <FileText size={32} className="text-gray-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3 tracking-tight">No analysis generated yet</h2>
                        <p className="text-gray-500 max-w-sm mb-8">Upload course material to automatically generate chapters, slides, quizzes, and a comprehensive teaching plan.</p>
                        <Button variant="primary" onClick={() => navigate('/professor/upload')}>Generate Analysis</Button>
                    </div>
                ) : (
                    <>
                        {isSearching && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute top-0 left-0 right-0 p-4 bg-white z-50 shadow-sm flex border-b border-gray-100">
                                <input autoFocus onBlur={() => setIsSearching(false)} type="text" placeholder="Search inside chapter..." className="flex-1 px-4 py-2 bg-gray-50 rounded-lg outline-none focus:ring-1 focus:ring-orange-500/50" />
                            </motion.div>
                        )}

                        {/* Header & Meta Tools */}
                        <div className="border-b border-gray-200 p-4">
                            {/* Top Meta Stats Toolbar */}
                            <div className="flex justify-between items-center bg-gray-50/70 p-3 rounded-xl border border-gray-100 mb-4">
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Target size={16} className="text-emerald-500" />
                                        <span className="font-semibold">{analysisMeta.confidenceScore}%</span>
                                        <span className="text-gray-400 text-xs hidden xl:inline">AI Confidence</span>
                                    </div>
                                    <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Clock size={16} className="text-blue-500" />
                                        <span className="font-semibold">{analysisMeta.estimatedTeachingTime}</span>
                                    </div>
                                    <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <BookOpen size={16} className="text-purple-500" />
                                        <span className="font-semibold">{analysisMeta.readingTime}</span>
                                    </div>
                                    <div className="w-px h-6 bg-gray-200 hidden md:block"></div>
                                    <div className="flex items-center gap-2 text-sm text-gray-700">
                                        <Activity size={16} className="text-rose-500" />
                                        <span className="font-semibold flex items-center"><span className="hidden lg:inline mr-1">Level:</span> {analysisMeta.difficultyLevel}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="secondary" size="icon" title="Search inside chapter" onClick={() => setIsSearching(true)}><Search size={16} /></Button>
                                    <Button variant="secondary" size="icon" title="Bookmark Chapter" onClick={handleBookmark}>
                                        <Bookmark size={16} className={isBookmarked ? 'text-orange-500 fill-orange-500' : ''} />
                                    </Button>
                                    <div className="w-px h-auto bg-gray-200 mx-1"></div>
                                    <Button variant="secondary" size="sm" onClick={() => navigateChapter(-1)} disabled={selectedChapterIndex === 0}><ArrowLeft size={16} /></Button>
                                    <Button variant="secondary" size="sm" onClick={() => navigateChapter(1)} disabled={selectedChapterIndex === subjectChapters.length - 1}><ArrowRight size={16} /></Button>
                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <h1 className="text-2xl font-bold text-gray-900 tracking-tight">{activeChapter?.title}</h1>
                                    <Badge variant="success">Unit {selectedChapterIndex + 1}</Badge>
                                </div>

                                <div className="flex gap-2">
                                    <Button variant="outline" onClick={handleRegenerate} disabled={isRegenerating}>
                                        {isRegenerating ? <Loader2 size={14} className="mr-2 animate-spin" /> : <RefreshCw size={14} className="mr-2" />}
                                        Regenerate
                                    </Button>
                                    <Button variant="outline" onClick={handleCopy}><Copy size={14} className="mr-2" /> Copy Meta</Button>
                                    <Button variant="primary" onClick={handleExport} disabled={isExporting}>
                                        {isExporting ? <Loader2 size={14} className="mr-2 animate-spin" /> : <Download size={14} className="mr-2" />}
                                        Export All
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Scrollable Tabs Header */}
                        <div className="border-b border-gray-200 bg-gray-50/50 px-2 lg:px-4 overflow-x-auto hide-scrollbar shrink-0">
                            <div className="flex space-x-1 py-3 min-w-max">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`relative px-4 py-2 text-sm font-medium rounded-xl transition-all ${activeTab === tab.id
                                            ? 'text-orange-600 bg-orange-50'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                            }`}
                                    >
                                        {tab.label}
                                        {activeTab === tab.id && (
                                            <motion.div
                                                layoutId="activeTabIndicatorWorkspace"
                                                className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-orange-500 rounded-t-full"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Dynamic Content */}
                        <div className="p-6 lg:p-8 flex-1 bg-[#FAFAFA] overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab + (isLoading ? 'loading' : 'content')}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {renderContent()}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
