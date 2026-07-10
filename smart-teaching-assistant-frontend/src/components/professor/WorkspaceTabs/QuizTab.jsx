import { useState } from "react";
import { SlidersHorizontal, PlusCircle, CheckCircle2, Circle } from "lucide-react";

export default function QuizTab() {
    const [filter, setFilter] = useState("All");

    const filters = ["All", "Easy", "Medium", "Hard"];
    const questions = [
        { id: 1, type: "MCQ", difficulty: "Easy", q: "What does AI stand for?", options: ["Artificial Intelligence", "Automated Interface", "Active Info", "Advanced Inbox"], correct: 0 },
        { id: 2, type: "True/False", difficulty: "Easy", q: "Turing test was developed in 1950.", options: ["True", "False"], correct: 0 },
        { id: 3, type: "Short Answer", difficulty: "Medium", q: "Define what an intelligent agent is.", answer: "An entity that perceives its environment and acts upon it." },
        { id: 4, type: "MCQ", difficulty: "Hard", q: "Which of the following describes a rational agent?", options: ["Always does the right thing", "Selects an action that is expected to maximize its performance measure", "Has perfect knowledge", "Can foresee the future"], correct: 1 }
    ];

    const filteredQs = filter === "All" ? questions : questions.filter(q => q.difficulty === filter);

    return (
        <div className="space-y-6">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-semibold text-gray-700">Difficulty Filter:</span>
                    <div className="flex gap-2 ml-2">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${filter === f
                                        ? (f === 'Easy' ? 'bg-emerald-100 text-emerald-800' : f === 'Medium' ? 'bg-orange-100 text-orange-800' : f === 'Hard' ? 'bg-red-100 text-red-800' : 'bg-gray-800 text-white')
                                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>

                <button className="px-4 py-2 bg-[#7C3AED] text-white text-sm font-medium rounded-xl shadow-md hover:bg-[#6D28D9] transition-colors flex items-center justify-center gap-2">
                    <PlusCircle className="w-4 h-4" /> Generate More
                </button>
            </div>

            <div className="space-y-4">
                {filteredQs.map((q, idx) => (
                    <div key={q.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-base font-bold text-gray-900 flex gap-2">
                                <span className="text-gray-400">{idx + 1}.</span> {q.q}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 bg-gray-50 px-2 py-0.5 rounded border border-gray-100 shrink-0">
                                    {q.type}
                                </span>
                                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border shrink-0 ${q.difficulty === 'Easy' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                        q.difficulty === 'Medium' ? 'bg-orange-50 text-orange-600 border-orange-100' :
                                            'bg-red-50 text-red-600 border-red-100'
                                    }`}>
                                    {q.difficulty}
                                </span>
                            </div>
                        </div>

                        {q.options && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 ml-6">
                                {q.options.map((opt, oIdx) => (
                                    <div key={oIdx} className={`p-3 rounded-xl border flex items-center gap-3 text-sm font-medium ${oIdx === q.correct ? 'bg-[#E6F4EA] border-[#C6F6D5] text-[#2F855A]' : 'bg-gray-50 border-transparent text-gray-600'
                                        }`}>
                                        {oIdx === q.correct ? <CheckCircle2 className="w-4 h-4 text-[#2F855A]" /> : <Circle className="w-4 h-4 text-gray-300" />}
                                        {opt}
                                    </div>
                                ))}
                            </div>
                        )}

                        {q.answer && (
                            <div className="mt-4 ml-6 p-3 bg-gray-50 rounded-xl border border-gray-100 text-sm text-gray-700">
                                <span className="font-semibold text-gray-900 mr-2">Suggested Answer:</span>
                                {q.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
