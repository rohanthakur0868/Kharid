import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const Button = ({ children, variant = 'primary', className, ...props }) => {
    const baseStyles = 'btn';

    const variants = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        ghost: 'hover:bg-gray-100 text-gray-700',
        outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    };

    return (
        <button
            className={twMerge(baseStyles, variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
