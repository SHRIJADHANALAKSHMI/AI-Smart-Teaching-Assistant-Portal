import { Lightbulb, FileText, Target, Beaker } from "lucide-react";

export default function TeachingPlanTab() {
    const plan = [
        {
            topic: "Introduction and History of AI",
            duration: "90 min",
            resources: ["Slide 1-5", "Intro Video"],
            outcome: "Understand core definitions",
            aiTip: "Start with the Turing Test analogy to engage students."
        },
        {
            topic: "Types of Environments",
            duration: "45 min",
            resources: ["Interactive Simulation", "Handout"],
            outcome: "Classify PEAS",
            aiTip: "Use self-driving car example for fully observable vs partially observable."
        },
        {
            topic: "Problem Formulation",
            duration: "60 min",
            resources: ["Whiteboard", "Slide 12-15"],
            outcome: "Define states, actions, transitions",
            aiTip: "Group activity: Outline states for a simple maze game."
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Structured Teaching Plan</h2>
                    <p className="text-sm text-gray-500 mt-1">Step-by-step breakdown optimized by AI for maximum retention.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left max-w-full">
                        <thead>
                            <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-semibold">
                                <th className="py-4 px-6 w-1/4 whitespace-nowrap">Topic Structure</th>
                                <th className="py-4 px-6 whitespace-nowrap">Duration</th>
                                <th className="py-4 px-6 whitespace-nowrap">Resources</th>
                                <th className="py-4 px-6 w-1/4 whitespace-nowrap">Learning Outcome</th>
                                <th className="py-4 px-6 w-1/3 whitespace-nowrap">AI Teaching Tip</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm">
                            {plan.map((row, idx) => (
                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors group">
                                    <td className="py-5 px-6">
                                        <div className="font-bold text-gray-900 leading-tight">
                                            {row.topic}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6">
                                        <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2.5 py-1 rounded-md text-xs font-bold border border-blue-100">
                                            {row.duration}
                                        </span>
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex flex-wrap gap-2">
                                            {row.resources.map(r => (
                                                <span key={r} className="flex items-center gap-1 text-[11px] font-medium text-gray-600 bg-white border border-gray-200 px-2 py-0.5 rounded-md shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                                                    <FileText className="w-3 h-3 text-gray-400" /> {r}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="py-5 px-6 font-medium text-gray-700 text-sm flex items-start gap-2">
                                        <Target className="w-4 h-4 text-[#F97316] mt-0.5 shrink-0" />
                                        {row.outcome}
                                    </td>
                                    <td className="py-5 px-6">
                                        <div className="flex gap-3 bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl group-hover:bg-white group-hover:border-[#2F855A]/20 transition-colors shadow-sm">
                                            <Lightbulb className="w-5 h-5 text-[#2F855A] shrink-0 fill-[#2F855A]/20" />
                                            <span className="text-gray-600 text-xs leading-relaxed italic">{row.aiTip}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
