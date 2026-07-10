import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from '../../ui/Button';

export function PlaceholderTab({ title, description }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gradient-to-tr from-purple-500 to-orange-400 rounded-full flex items-center justify-center text-white mb-6 shadow-lg shadow-purple-500/20">
                <Sparkles size={24} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Automate {title}</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8">
                {description || `Launch the AI agent to automatically extract context, align with your university curriculum, and generate the complete ${title.toLowerCase()}.`}
            </p>
            <Button variant="primary" className="gap-2">
                <Sparkles size={16} /> Generate {title}
            </Button>
        </div>
    );
}
