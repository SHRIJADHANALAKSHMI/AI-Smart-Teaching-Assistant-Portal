import { CheckCircle2, Clock, Target, ListTodo, FileText } from "lucide-react";

export default function OverviewTab() {
    return (
        <div className="space-y-6">

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { label: "Estimated Time", value: "4 Hours", icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                    { label: "Difficulty", value: "Medium", icon: Target, color: "text-[#F97316]", bg: "bg-orange-50" },
                    { label: "Topics Code", value: "AI-301", icon: FileText, color: "text-[#7C3AED]", bg: "bg-purple-50" },
                    { label: "Completion", value: "0%", icon: CheckCircle2, color: "text-[#2F855A]", bg: "bg-[#E6F4EA]" }
                ].map((stat, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <ListTodo className="w-5 h-5 text-[#2F855A]" /> Summary
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                    This chapter introduces the fundamental concepts of Artificial Intelligence, exploring its history, primary techniques, and real-world applications. Students will learn the distinction between weak AI and strong AI, understand fundamental problem-solving agents, and explore state-space search concepts.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4 whitespace-nowrap">Learning Outcomes</h3>
                    <ul className="space-y-3">
                        {[
                            "Define AI and describe its core goals and subfields.",
                            "Differentiate between various types of AI agents.",
                            "Apply PEAS (Performance, Environment, Actuators, Sensors) framework.",
                            "Evaluate basic problem-solving and search algorithms."
                        ].map((item, idx) => (
                            <li key={idx} className="flex items-start text-sm text-gray-600">
                                <CheckCircle2 className="w-4 h-4 text-[#2F855A] mr-2 mt-0.5 shrink-0" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Prerequisites</h3>
                    <div className="flex flex-wrap gap-2">
                        {["Discrete Mathematics", "Basic Python Programming", "Data Structures", "Algorithms Design"].map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-xs font-medium text-gray-700 hover:border-[#2F855A] hover:text-[#2F855A] transition-colors cursor-pointer">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
