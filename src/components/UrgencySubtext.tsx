import React from 'react';

export function UrgencySubtext({ className = "" }: { className?: string }) {
    return (
        <p className={`text-[10px] text-neutral-500 mt-2 text-center uppercase tracking-widest font-medium ${className}`}>
            Prices go up in April 2026 to $1099 MSRP.
        </p>
    );
}
