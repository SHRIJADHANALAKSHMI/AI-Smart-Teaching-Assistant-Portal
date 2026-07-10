import { Boxes, Dice5, Eye } from "lucide-react";

export default function QuestionBankTab() {
    const categories = [
        { level: "Remembering", count: 25, color: "bg-blue-100 text-blue-800" },
        { level: "Understanding", count: 40, color: "bg-emerald-100 text-emerald-800" },
        { level: "Applying", count: 35, color: "bg-orange-100 text-orange-800" },
        { level: "Analyzing", count: 20, color: "bg-purple-100 text-purple-800" },
        { level: "Evaluating", count: 12, color: "bg-pink-100 text-pink-800" },
        { level: "Creating", count: 8, color: "bg-red-100 text-red-800" }
    ];

    return (
        <div className="space-y-8">

            {/* Top action area */}
            <div className="flex flex-col md:flex-row justify-between bg-white border border-gray-100 p-6 rounded-3xl shadow-sm gap-6 items-center">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                        <Boxes className="w-6 h-6 text-[#7C3AED]" /> Bloom's Taxonomy Question Bank
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">140 Total questions extracted from chapter topics.</p>
                </div>

                <div className="w-full md:w-auto">
                    <button className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white text-sm font-bold rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-gray-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                        <Dice5 className="w-5 h-5 text-orange-400" /> Random Question Paper Generator
                    </button>
                </div>
            </div>

            {/* Grid of Bloom levels */}
            <h3 className="text-lg font-bold text-gray-800 px-2 tracking-tight">Browse by Category</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat, idx) => (
                    <div key={idx} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-[0_4px_12px_rgba(0,0,0,0.04)] hover:border-[#2F855A]/30 transition-all cursor-pointer group flex flex-col items-center justify-center text-center">
                        <div className="text-3xl font-black text-gray-900 mb-2 group-hover:scale-110 transition-transform">
                            {cat.count}
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider mb-3 w-full text-center ${cat.color}`}>
                            {cat.level}
                        </div>
                        <button className="text-xs text-gray-400 font-medium group-hover:text-[#2F855A] flex items-center justify-center gap-1 transition-colors">
                            <Eye className="w-3 h-3" /> View All
                        </button>
                    </div>
                ))}
            </div>

        </div>
    );
}
