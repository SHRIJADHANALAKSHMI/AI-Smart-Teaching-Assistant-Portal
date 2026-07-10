import { GripVertical, Plus } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function TimelineTab() {
    const [weeks, setWeeks] = useState([
        {
            id: 1, name: "Week 1", topics: [
                { id: "t1", title: "Introduction to AI & History" },
                { id: "t2", title: "Intelligent Agents & Environments" }
            ]
        },
        {
            id: 2, name: "Week 2", topics: [
                { id: "t3", title: "Problem Solving Approaches" },
                { id: "t4", title: "Uninformed Search Strategies" }
            ]
        }
    ]);

    return (
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Interactive Chapter Timeline</h2>
                    <p className="text-sm text-gray-500 mt-1">Drag and drop topics to reorder your teaching flow.</p>
                </div>
                <button className="px-4 py-2 bg-white text-[#2F855A] text-sm font-semibold border border-[#2F855A]/20 shadow-sm rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Week
                </button>
            </div>

            <div className="space-y-6">
                {weeks.map((week, wIdx) => (
                    <div key={week.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
                        <h3 className="font-bold text-gray-800 mb-4 px-2 tracking-tight">{week.name}</h3>
                        <div className="space-y-3">
                            {week.topics.map((topic, tIdx) => (
                                <motion.div
                                    key={topic.id}
                                    layout
                                    className="flex items-center gap-4 p-3 bg-gray-50 border border-gray-100 rounded-xl group hover:border-[#2F855A]/30 hover:bg-white transition-all cursor-move shadow-[0_2px_8px_rgba(0,0,0,0.01)] hover:shadow-md"
                                >
                                    <GripVertical className="w-5 h-5 text-gray-400 group-hover:text-gray-600 cursor-grab" />
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-gray-800 group-hover:text-[#2F855A] transition-colors">{topic.title}</p>
                                    </div>
                                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">2 Hrs</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <button className="mt-4 w-full py-2 flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#2F855A] hover:bg-[#E6F4EA] transition-colors rounded-xl font-medium border border-dashed border-gray-200 hover:border-transparent">
                            <Plus className="w-4 h-4" /> Add Topic
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
