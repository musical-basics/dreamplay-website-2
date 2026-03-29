"use client";

import { useEffect, useRef, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Helper to get cookie by name
function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
}

function ABTrackerContent() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const startTime = useRef(Date.now());
    // We keep the client for future use if needed, but using fetch for the route as planned
    const supabase = createClient();

    useEffect(() => {
        // 1. Ensure Session ID exists
        let sessionId = getCookie("ab_session_id");
        if (!sessionId) {
            sessionId = crypto.randomUUID();
            document.cookie = `ab_session_id=${sessionId}; path=/; max-age=315360000`; // 10 years
        }

        const logEvent = async (eventType: string, metadata: any = {}) => {
            try {
                await fetch('/api/track-ab', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        eventType,
                        metadata,
                        url: pathname,
                        sessionId // Pass explicitly to ensure it's captured
                    })
                })
            } catch (err) {
                console.error("Failed to log AB event", err);
            }
        };

        // TRACK VIEW
        logEvent("view");

        // TRACK TIME ON PAGE & CONTINUE RATE (Unload)
        const handleUnload = () => {
            const timeSpent = (Date.now() - startTime.current) / 1000;
            // We use navigator.sendBeacon for reliable unload tracking if possible, 
            // but fetch with keepalive is also good. 
            // For simplicity matching the request:
            logEvent("time_on_page", { duration: timeSpent });

            if (timeSpent < 5) {
                logEvent("bounce");
            }
        };

        window.addEventListener("beforeunload", handleUnload);

        // TRACK CLICKS (Conversion)
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            // Check if they clicked a button with specific text (case insensitive check usually better)
            if (target.innerText && target.innerText.toLowerCase().includes("join the waitlist")) {
                logEvent("conversion", { trigger: "waitlist_button" });
            }

            // Check if they clicked a link (Continue Rate)
            // Walk up the tree to find anchor tag if target is inside one
            const link = target.closest('a');
            if (link) {
                logEvent("continue_navigation", { destination: link.href });
            }
        };

        document.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("beforeunload", handleUnload);
            document.removeEventListener("click", handleClick);
            // Note: React cleanup runs on component unmount (navigation), so this captures "time on page" for SPA transitions too.
            handleUnload();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams?.toString()]);

    return null;
}

export function ABTracker() {
    return (
        <Suspense fallback={null}>
            <ABTrackerContent />
        </Suspense>
    );
}

