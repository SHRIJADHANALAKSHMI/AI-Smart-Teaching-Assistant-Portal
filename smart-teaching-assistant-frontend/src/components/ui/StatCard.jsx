import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function StatCard({ title, value, icon: Icon, trend, trendValue, color = "orange" }) {
    const colorMaps = {
        orange: 'text-orange-500 bg-orange-100/50',
        emerald: 'text-emerald-500 bg-emerald-100/50',
        purple: 'text-purple-500 bg-purple-100/50',
    };

    const iconClass = colorMaps[color] || colorMaps.orange;

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className="card p-6 flex items-start gap-4"
        >
            <div className={clsx("p-3 rounded-2xl flex-shrink-0", iconClass)}>
                <Icon size={24} />
            </div>
            <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">{title}</h4>
                <div className="text-2xl font-bold text-gray-900 tracking-tight">{value}</div>
                {trend && (
                    <div className="mt-2 text-xs flex items-center gap-1 font-medium">
                        <span className={trend === 'up' ? 'text-emerald-500' : 'text-red-500'}>
                            {trend === 'up' ? '+' : '-'}{trendValue}
                        </span>
                        <span className="text-gray-400">vs last week</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
}
