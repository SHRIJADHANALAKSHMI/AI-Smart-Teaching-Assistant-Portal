import { Copy, Download, RefreshCcw, Sparkles } from "lucide-react";

export default function KeyPointsTab() {
    const points = [
        { title: "What is AI?", content: "AI is the simulation of human intelligence processes by machines, especially computer systems. Processes include learning (acquisition of info and rules), reasoning (using rules to reach approx or def conclusions) and self-correction." },
        { title: "History of AI", content: "The field of AI research was born at a workshop at Dartmouth College in 1956. Early AI research in the 1950s explored topics like problem solving and symbolic methods." },
        { title: "Turing Test", content: "Developed by Alan Turing in 1950, it is a test of a machine's ability to exhibit intelligent behaviour equivalent to, or indistinguishable from, that of a human." },
        { title: "Agents and Environments", content: "An agent is anything that can be viewed as perceiving its environment through sensors and acting upon that environment through actuators." }
    ];

    return (
        <div className="space-y-6">

            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">AI Generated Key Concepts</h2>
                    <p className="text-sm text-gray-500 mt-1">Extracted from the uploaded book chapter.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-lg shadow-sm hover:bg-gray-50 transition-colors">
                        <Copy className="w-3.5 h-3.5" /> Copy All
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 text-[#2F855A] text-xs font-medium rounded-lg shadow-sm hover:bg-[#2F855A]/5 hover:border-[#2F855A]/30 transition-colors">
                        <Download className="w-3.5 h-3.5" /> Export PDF
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#4F46E5] text-white text-xs font-medium rounded-lg shadow-sm hover:bg-[#4338CA] transition-colors">
                        <RefreshCcw className="w-3.5 h-3.5" /> Regenerate
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {points.map((point, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow group relative overflow-hidden">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#2F855A] to-[#38A169] opacity-0 group-hover:opacity-100 transition-opacity" />
                        <h3 className="text-base font-bold text-gray-900 mb-2 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#F97316]" /> {point.title}
                        </h3>
                        <p className="text-sm text-gray-600 leading-relaxed pl-6 border-l-2 border-transparent">
                            {point.content}
                        </p>
                    </div>
                ))}
            </div>

        </div>
    );
}
