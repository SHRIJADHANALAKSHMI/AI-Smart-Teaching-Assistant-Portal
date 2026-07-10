import { useState } from "react";
import { Send, Sparkles, MessageSquare, Plus, ChevronDown, CheckCircle, RefreshCcw } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AIAssistantPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'ai', text: 'Hi Prof. Smith! How can I assist you with this chapter?' }
    ]);
    const [input, setInput] = useState('');

    const suggestions = [
        "Explain this topic",
        "Generate examples",
        "Create assignment",
        "Generate diagram",
        "Simplify chapter",
        "Generate viva questions"
    ];

    const handleSend = () => {
        if (!input.trim()) return;
        setMessages([...messages, { role: 'user', text: input }]);
        setInput('');
        setTimeout(() => {
            setMessages(p => [...p, { role: 'ai', text: 'I am analyzing the request based on the chapter content. Generating response...' }]);
        }, 1000);
    };

    return (
        <div className={`fixed right-0 top-16 bottom-0 bg-white border-l border-gray-200 shadow-[-4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300 z-30 flex flex-col ${isOpen ? 'w-80' : 'w-16'}`}>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute -left-12 top-6 bg-white p-3 rounded-l-2xl border-y border-l border-gray-200 shadow-[-4px_4px_12px_rgba(0,0,0,0.04)] text-[#7C3AED] hover:text-[#5B21B6] transition-colors group"
            >
                <Sparkles className={`w-5 h-5 ${isOpen ? '' : 'animate-pulse group-hover:animate-none'}`} />
            </button>

            {isOpen ? (
                <>
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-[#7C3AED]" /> AI Assistant
                        </h3>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                            >
                                <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${msg.role === 'user'
                                        ? 'bg-[#2F855A] text-white rounded-tr-sm'
                                        : 'bg-gray-100 text-gray-800 rounded-tl-sm'
                                    }`}>
                                    {msg.text}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50/50">
                        <div className="flex flex-wrap gap-2 mb-3">
                            {suggestions.map(s => (
                                <button key={s} onClick={() => setInput(s)} className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded-full text-gray-600 hover:border-[#7C3AED] hover:text-[#7C3AED] transition-colors focus:outline-none">
                                    {s}
                                </button>
                            ))}
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                                placeholder="Ask AI..."
                                className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7C3AED]/20 focus:border-[#7C3AED] transition-all"
                            />
                            <button
                                onClick={handleSend}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#7C3AED] p-1 rounded-md hover:bg-[#7C3AED]/10 transition-colors"
                                disabled={!input.trim()}
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center py-6 gap-6 h-full">
                    {suggestions.slice(0, 3).map((s, i) => (
                        <button key={i} title={s} onClick={() => setIsOpen(true)} className="w-10 h-10 bg-gray-50 text-gray-500 rounded-full flex items-center justify-center hover:bg-[#7C3AED]/10 hover:text-[#7C3AED] transition-colors">
                            <MessageSquare className="w-4 h-4" />
                        </button>
                    ))}
                    <div className="flex-1" />
                    <button title="Settings" className="w-10 h-10 text-gray-400 hover:text-gray-600">...</button>
                </div>
            )}
        </div>
    );
}
