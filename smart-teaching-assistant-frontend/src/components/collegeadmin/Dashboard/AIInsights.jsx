import { motion } from "framer-motion";
import { BrainCircuit, TrendingUp, Lightbulb, Target } from "lucide-react";

const insights = [
    {
        title: "Student Performance Improving",
        description: "AI analysis shows 15% improvement in average grades across departments this semester.",
        icon: TrendingUp,
        color: "text-green-600 bg-green-100",
    },
    {
        title: "Resource Gap Detected",
        description: "Computer Science department needs more study materials for advanced topics.",
        icon: Lightbulb,
        color: "text-yellow-600 bg-yellow-100",
    },
    {
        title: "Optimal Assessment Timing",
        description: "Best results observed when assessments are scheduled mid-week.",
        icon: Target,
        color: "text-blue-600 bg-blue-100",
    },
];

export default function AIInsights() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl shadow-lg p-6 border"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <BrainCircuit className="text-indigo-600" size={22} />
                </div>
                <h2 className="text-xl font-bold text-slate-800">AI Insights</h2>
            </div>

            <div className="space-y-4">
                {insights.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div key={index} className="flex gap-4 p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                                <Icon size={20} />
                            </div>
                            <div>
                                <h4 className="font-semibold text-slate-800">{item.title}</h4>
                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}
