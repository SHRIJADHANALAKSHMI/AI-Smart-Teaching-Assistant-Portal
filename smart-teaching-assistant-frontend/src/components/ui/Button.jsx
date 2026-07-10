import React from 'react';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function Button({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    fullWidth = false,
    ...props
}) {
    const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-1";

    const variants = {
        primary: "bg-orange-500 hover:bg-orange-600 text-white shadow-sm shadow-orange-500/20 focus:ring-orange-500",
        secondary: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shadow-emerald-500/20 focus:ring-emerald-500",
        outline: "border-2 border-gray-200 hover:border-gray-300 text-gray-700 bg-transparent focus:ring-gray-200 hover:bg-gray-50",
        ghost: "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-gray-200",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-sm shadow-red-500/20 focus:ring-red-500"
    };

    const sizes = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.98 }}
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                className
            )}
            {...props}
        >
            {children}
        </motion.button>
    );
}
