import { Download, MonitorPlay, Palette, LayoutDashboard, Edit2, Sparkles } from "lucide-react";
import { useState } from "react";

export default function PresentationTab() {
    const [theme, setTheme] = useState("Corporate");

    const slides = [
        { id: 1, title: "Introduction to AI", type: "Title Slide", preview: "AI is the simulation of..." },
        { id: 2, title: "History & Evolution", type: "Content Slide", preview: "Timeline of events..." },
        { id: 3, title: "Types of AI", type: "Comparison Slide", preview: "Weak AI vs Strong AI..." },
        { id: 4, title: "The Turing Test", type: "Concept Slide", preview: "Alan Turing's proposition..." }
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#2F855A] to-[#166534] p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
                <div>
                    <h2 className="text-xl font-bold mb-1 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-emerald-200" /> Editable AI Slides Generated!
                    </h2>
                    <p className="text-emerald-100 text-sm">12 slides generated based on chapter context.</p>
                </div>
                <div className="flex gap-3">
                    <button className="px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/20 backdrop-blur text-white text-sm font-medium rounded-xl transition-colors flex items-center gap-2">
                        <MonitorPlay className="w-4 h-4" /> Preview
                    </button>
                    <button className="px-4 py-2 bg-white text-[#166534] text-sm font-bold rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.1)] hover:bg-emerald-50 transition-colors flex items-center gap-2">
                        <Download className="w-4 h-4" /> Download PPT
                    </button>
                </div>
            </div>

            <div className="flex gap-6 items-start">

                {/* Left side: Slides Grid */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {slides.map(slide => (
                        <div key={slide.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#2F855A]/30 transition-all group flex flex-col">
                            <div className="aspect-video bg-gray-50 border-b border-gray-100 p-4 flex flex-col relative group-hover:bg-[#E6F4EA]/50 transition-colors">
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/5 backdrop-blur-[1px]">
                                    <button className="bg-white text-gray-800 p-2 rounded-full shadow-sm hover:text-[#2F855A] transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <h4 className="font-bold text-gray-800 text-sm">{slide.title}</h4>
                                <p className="text-gray-400 text-xs mt-2">{slide.preview}</p>
                            </div>
                            <div className="px-4 py-2 flex items-center justify-between bg-white text-xs text-gray-500">
                                <span>Slide {slide.id}</span>
                                <span className="bg-gray-100 px-2 py-0.5 rounded font-medium">{slide.type}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right side: Editor Panel */}
                <div className="w-64 bg-white border border-gray-100 rounded-2xl shadow-sm p-4 space-y-6 shrink-0 sticky top-4">
                    <div>
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <Palette className="w-4 h-4 text-[#F97316]" /> AI Theme
                        </h3>
                        <select
                            value={theme}
                            onChange={e => setTheme(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg text-sm px-3 py-2 text-gray-700 outline-none focus:border-[#2F855A] focus:ring-1 focus:ring-[#2F855A]"
                        >
                            <option>Corporate</option>
                            <option>Academic Classic</option>
                            <option>Modern Minimal</option>
                            <option>Dark Mode</option>
                        </select>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2 mb-3">
                            <LayoutDashboard className="w-4 h-4 text-[#7C3AED]" /> Actions
                        </h3>
                        <div className="space-y-2">
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F855A] rounded-lg transition-colors font-medium">Add Slide</button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#2F855A] rounded-lg transition-colors font-medium">Regenerate Notes</button>
                            <button className="w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-red-500 rounded-lg transition-colors font-medium">Delete Slide</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
