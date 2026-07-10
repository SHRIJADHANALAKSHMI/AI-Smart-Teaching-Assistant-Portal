import { FileCheck, Download, Plus, AlertCircle, FileDigit } from "lucide-react";

export default function AssignmentsTab() {
    const assignments = [
        {
            id: 1,
            title: "State Space Search Implementation",
            type: "Coding",
            dueDate: "Next Friday",
            rubric: "Functional (40%), Optimized (30%), Doc (30%)"
        },
        {
            id: 2,
            title: "PEAS Analysis of Automated Systems",
            type: "Theory",
            dueDate: "In 2 Weeks",
            rubric: "Clarity (50%), Depth (50%)"
        }
    ];

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">AI Generated Assignments</h2>
                    <p className="text-sm text-gray-500 mt-1">Assignments structured with clear rubrics and outcomes.</p>
                </div>
                <button className="px-4 py-2 bg-[#2F855A] text-white text-sm font-semibold rounded-xl shadow-md shadow-[#2F855A]/20 hover:bg-[#2F855A]/90 transition-colors flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Create New Assignment
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {assignments.map(assgn => (
                    <div key={assgn.id} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all flex flex-col group relative overflow-hidden">

                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-[#F8FAFC] border border-gray-100 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                                {assgn.type === 'Coding' ? <FileDigit className="w-6 h-6 text-[#7C3AED]" /> : <FileCheck className="w-6 h-6 text-[#F97316]" />}
                            </div>
                            <span className="px-3 py-1 bg-gray-50 border border-gray-100 text-[10px] font-bold uppercase tracking-wider text-gray-600 rounded-lg">
                                {assgn.type}
                            </span>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug">{assgn.title}</h3>

                        <div className="mt-auto space-y-4 pt-4 border-t border-gray-100">
                            <div>
                                <p className="text-xs text-gray-400 mb-1 font-medium">Evaluation Rubric</p>
                                <p className="text-sm font-medium text-gray-700">{assgn.rubric}</p>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center text-xs text-red-600 font-bold bg-red-50 px-2 py-1 rounded">
                                    <AlertCircle className="w-3 h-3 mr-1" /> Due: {assgn.dueDate}
                                </div>

                                <button className="flex items-center gap-1 text-sm text-[#2F855A] font-semibold hover:bg-[#E6F4EA] px-3 py-1.5 rounded-lg transition-colors">
                                    <Download className="w-4 h-4" /> PDF
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
