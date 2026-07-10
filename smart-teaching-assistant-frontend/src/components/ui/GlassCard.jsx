import React from 'react';
import { clsx } from "clsx";

export function GlassCard({ children, className = "", noPadding = false }) {
    return (
        <div className={clsx("glass-panel rounded-2xl relative overflow-hidden", !noPadding && "p-6", className)}>
            {children}
        </div>
    );
}
