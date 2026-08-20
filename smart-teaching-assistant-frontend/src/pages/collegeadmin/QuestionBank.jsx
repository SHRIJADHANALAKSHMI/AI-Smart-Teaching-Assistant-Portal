import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Filter, PenTool, LayoutGrid, Loader2 } from "lucide-react";
import { getQuestions } from "../../service/questionService";

export default function QuestionBank() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getQuestions();
                setQuestions(data || []);
            } catch (error) {
                console.error("Error fetching questions:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                        <Database className="text-sky-500" /> Question Bank
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Centrally managed, AI-generated repository of academic questions.</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-slate-200 dark:hover:bg-slate-700">
                        <Filter size={16} /> Filter
                    </button>
                    <button className="bg-sky-600 text-white px-5 py-2 rounded-xl text-sm font-semibold shadow-md flex items-center gap-2 hover:bg-sky-700">
                        <PenTool size={16} /> Generate New
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center p-12"><Loader2 className="animate-spin text-sky-500" size={32} /></div>
            ) : (
                <div className="grid gap-4">
                    <AnimatePresence>
                        {questions.map((q, idx) => (
                            <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }} className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:shadow-md transition">
                                <div className="flex justify-between items-start mb-3">
                                    <span className="bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300">Subject ID: {q.subjectId}</span>
                                    <div className="flex gap-2">
                                        <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${q.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : q.difficulty === 'Medium' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'}`}>
                                            {q.difficulty}
                                        </span>
                                        <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md text-[10px] font-bold uppercase tracking-wider">{q.marks} Marks</span>
                                    </div>
                                </div>
                                <p className="text-slate-800 dark:text-slate-100 font-medium leading-relaxed">{q.question}</p>
                                <div className="mt-4 flex gap-4 text-xs text-slate-500 font-medium">
                                    <span>Type: {q.type}</span>
                                    <span>Bloom`s Level: <span className="text-indigo-500">{q.bloomLevel}</span></span>
                                </div>
                            </motion.div>
                        ))}
                        {questions.length === 0 && (
                            <p className="text-center text-slate-500 py-12">No questions found.</p>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    );
}
