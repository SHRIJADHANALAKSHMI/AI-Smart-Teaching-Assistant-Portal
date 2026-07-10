import React from 'react';
import { motion } from 'framer-motion';

export default function BloomTaxonomyTab() {
    const levels = [
        { name: "Create", color: "bg-purple-500", text: "Design, assemble, construct", count: 2 },
        { name: "Evaluate", color: "bg-indigo-500", text: "Appraise, argue, defend", count: 5 },
        { name: "Analyze", color: "bg-blue-500", text: "Differentiate, organize, relate", count: 8 },
        { name: "Apply", color: "bg-emerald-500", text: "Execute, implement, solve", count: 12 },
        { name: "Understand", color: "bg-amber-500", text: "Classify, describe, discuss", count: 15 },
        { name: "Remember", color: "bg-orange-500", text: "Define, duplicate, list", count: 20 }
    ];

    return (
        <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Bloom's Taxonomy Distribution</h2>
                <p className="text-gray-500">Analysis of questions and outcomes across cognitive levels</p>
            </div>

            <div className="flex flex-col gap-3">
                {levels.map((lvl, idx) => (
                    <motion.div
                        key={lvl.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm"
                    >
                        <div className={`w-3 h-12 rounded-full ${lvl.color}`}></div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{lvl.name}</h3>
                            <p className="text-sm text-gray-500">{lvl.text}</p>
                        </div>
                        <div className="text-center bg-gray-50 px-4 py-2 rounded-lg">
                            <span className="block font-bold text-xl text-gray-900">{lvl.count}</span>
                            <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Items</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
