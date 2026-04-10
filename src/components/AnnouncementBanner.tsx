import React from 'react';
import Link from 'next/link';

export function AnnouncementBanner() {
    return (
        <Link href="/customize" className="block w-full bg-amber-400 text-black py-1.5 px-4 text-center z-[9999] relative hover:bg-amber-300 transition-colors">
            <p className="font-sans text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                Last week! The DreamPlay One gets replaced by the DreamPlay One Pro next week at $1,899.
            </p>
        </Link>
    );
}
