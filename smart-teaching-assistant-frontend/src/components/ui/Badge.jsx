import React from 'react';
import { clsx } from 'clsx';

export function Badge({ children, variant = 'default', className = '' }) {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-emerald-100/60 text-emerald-700 border border-emerald-200/50",
        warning: "bg-orange-100/60 text-orange-700 border border-orange-200/50",
        danger: "bg-red-100/60 text-red-700 border border-red-200/50",
        primary: "bg-orange-100 text-orange-700",
        purple: "bg-purple-100/60 text-purple-700 border border-purple-200/50"
    };

    return (
        <span className={clsx("px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center justify-center", variants[variant], className)}>
            {children}
        </span>
    );
}
