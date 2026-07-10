import React from 'react';
import { Sparkles, Construction } from 'lucide-react';
import { GlassCard } from '../../ui/GlassCard';

export function GenericPagePlaceholder({ title, description }) {
    return (
        <div className="space-y-8 pb-12 w-full h-full flex flex-col items-center justify-center min-h-[70vh]">
            <GlassCard className="max-w-2xl w-full text-center py-20 border-dashed border-gray-200">
                <div className="mx-auto w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mb-6 text-orange-500 shadow-inner">
                    <Construction size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{title}</h1>
                <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                    {description || "This feature is currently under active development. The enterprise redesign team is bringing the best UX shortly."}
                </p>
            </GlassCard>
        </div>
    );
}
