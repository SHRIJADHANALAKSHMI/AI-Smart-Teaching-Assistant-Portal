import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BrainCircuit, Users, ExternalLink, Activity, Cloud, Database, BookOpen } from 'lucide-react';
import { Badge } from '../../ui/Badge';
import { GlassCard } from '../../ui/GlassCard';

// Icon Map since icons are strings from the JSON
const iconMap = {
    "BrainCircuit": BrainCircuit,
    "Cloud": Cloud,
    "Database": Database
};

export function SubjectCard({ subject }) {
    const navigate = useNavigate();
    const Icon = iconMap[subject.icon] || BookOpen;

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'ready': return 'success';
            case 'completed': return 'success';
            case 'processing': return 'warning';
            default: return 'default';
        }
    };

    const navToWorkspace = () => {
        navigate(`/professor/workspace/${subject.id}/ch1`);
    };

    return (
        <motion.div
            whileHover={{ y: -6 }}
            layout
            transition={{ duration: 0.3 }}
            className="group cursor-pointer"
            onClick={navToWorkspace}
        >
            <GlassCard className="h-full border border-gray-200 shadow-sm relative overflow-visible hover:border-orange-300 transition-colors">
                {/* Top badge */}
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-4 rounded-xl text-white shadow-md z-10 flex-shrink-0 bg-white`} style={{ backgroundColor: subject.color }}>
                        <Icon size={24} />
                    </div>
                    <Badge variant={getStatusColor(subject.aiStatus)} className="capitalize px-3">
                        {subject.aiStatus}
                    </Badge>
                </div>

                <div className="mb-6">
                    <div className="text-xs font-semibold text-gray-500 mb-1.5 uppercase tracking-wider">{subject.code} • {subject.semester}</div>
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors line-clamp-1">{subject.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{subject.department}</p>
                </div>

                {/* Meta row */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1.5"><Users size={16} className="text-gray-400" /> {subject.students} students</div>
                    <div className="flex items-center gap-1.5"><Activity size={16} className="text-gray-400" /> {subject.progress}% extracted</div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {subject.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-gray-50 rounded-lg text-xs font-medium text-gray-500 border border-gray-100">{tag}</span>
                    ))}
                </div>

                {/* Action Area */}
                <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-400">Last updated: {subject.lastUpload}</span>
                    <div className="p-2 bg-gray-50 rounded-full group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                        <ExternalLink size={16} />
                    </div>
                </div>
            </GlassCard>
        </motion.div>
    );
}
