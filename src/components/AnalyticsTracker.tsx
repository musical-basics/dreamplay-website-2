'use client'

import { useEffect, useRef, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logEvent } from '@/lib/analytics'

function AnalyticsTrackerContent() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const analyticsTrackUrl = process.env.NEXT_PUBLIC_ANALYTICS_TRACK_URL || 'https://data.dreamplaypianos.com/api/track'

    // Use Refs so we can track times and URLs without triggering infinite re-renders
    const startTime = useRef(Date.now())
    const currentPath = useRef('')
    const hasSentLeave = useRef(false)

    useEffect(() => {
        if (!pathname) return;

        let url = pathname
        if (searchParams && searchParams.toString()) {
            url = url + `?${searchParams.toString()}`
        }

        const runTracking = async () => {
            const metadata: Record<string, string> = {};

            // --- RESOLVE EMAIL FROM SID (read from cookie set by middleware) ---
            const sidCookieMatch = document.cookie.match(/(^| )dp_sid=([^;]+)/);
            const cidCookieMatch = document.cookie.match(/(^| )dp_cid=([^;]+)/);
            const sid = sidCookieMatch ? sidCookieMatch[2] : null;
            const cid = cidCookieMatch ? cidCookieMatch[2] : null;
            if (sid && typeof window !== 'undefined' && !sessionStorage.getItem('dp_sid_resolved')) {
                sessionStorage.setItem('dp_sid_resolved', '1');
                try {
                    const res = await fetch(`https://email.dreamplaypianos.com/api/resolve-subscriber?sid=${sid}${cid ? `&cid=${cid}` : ''}`);
                    const data = await res.json();
                    if (data.email) {
                        localStorage.setItem('dp_user_email', data.email);
                    }
                } catch (e) {
                    console.warn('[Analytics] Failed to resolve subscriber:', e);
                }
            }

            // --- FIRST TOUCH URL SAFETY NET ---
            const firstTouchMatch = document.cookie.match(/(^| )dp_first_touch_url=([^;]+)/);
            if (firstTouchMatch && !sessionStorage.getItem('dp_first_touch_logged')) {
                sessionStorage.setItem('dp_first_touch_logged', '1');
                metadata.first_touch_url = decodeURIComponent(firstTouchMatch[2]);
            }

            if (typeof window !== 'undefined') {
                const savedEmail = localStorage.getItem('dp_user_email');
                if (savedEmail) metadata.email = savedEmail;

                // --- CAPTURE UTM PARAMETERS ---
                const utms = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
                utms.forEach(utm => {
                    const val = searchParams?.get(utm);
                    if (val) sessionStorage.setItem(`dp_${utm}`, val);

                    const storedVal = sessionStorage.getItem(`dp_${utm}`);
                    if (storedVal) metadata[utm] = storedVal;
                });

                // --- CAPTURE ORGANIC REFERRER ---
                const currentReferrer = document.referrer;

                // Only save if it exists and is NOT from our own domain (or localhost)
                if (currentReferrer && !currentReferrer.includes(window.location.hostname) && !currentReferrer.includes('localhost')) {
                    // Only set it once per session so we remember the original entry point
                    if (!sessionStorage.getItem('dp_initial_referrer')) {
                        sessionStorage.setItem('dp_initial_referrer', currentReferrer);
                    }
                }

                // --- ATTACH TO METADATA ---
                const initialReferrer = sessionStorage.getItem('dp_initial_referrer');
                if (initialReferrer) metadata.referrer = initialReferrer;

                // --- CHECKOUT A/B TEST BUCKET ---
                const abCookieMatch = document.cookie.match(/(^| )dp_checkout_ab=([^;]+)/);
                if (abCookieMatch) metadata.checkout_ab = abCookieMatch[2];

                // --- JOURNEY ENGINE ---
                const journeyCookieMatch = document.cookie.match(/(^| )dp_journey_id=([^;]+)/);
                if (journeyCookieMatch) metadata.journey_id = journeyCookieMatch[2];
            }

            // 1. If navigating internally inside the App, fire the leave event for the OLD page
            if (currentPath.current && currentPath.current !== url && !hasSentLeave.current) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                if (duration > 1) {
                    fetch(analyticsTrackUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'page_leave',
                            path: currentPath.current,
                            metadata: { ...metadata, duration_seconds: duration }
                        }),
                        keepalive: true
                    }).catch(() => { });
                }
            }

            // 2. Setup for the NEW page
            currentPath.current = url;
            startTime.current = Date.now();
            hasSentLeave.current = false;

            // 3. Log the page view (now guaranteed to have email if SID was present)
            logEvent('pageview', { path: url, metadata });
        };

        runTracking();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname, searchParams?.toString()])

    // 4. Track physical exits (tab close, browser minimize, phone lock)
    useEffect(() => {
        const handleVisibilityChange = () => {
            // Only fire if they are hiding the tab and we haven't sent it yet
            if (document.visibilityState === 'hidden' && !hasSentLeave.current && currentPath.current) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                if (duration > 1) {
                    const savedEmail = typeof window !== 'undefined' ? localStorage.getItem('dp_user_email') : null;
                    const metadata: any = { duration_seconds: duration };
                    if (savedEmail) metadata.email = savedEmail;

                    fetch(analyticsTrackUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'page_leave',
                            path: currentPath.current,
                            metadata: metadata
                        }),
                        keepalive: true // Guarantees delivery when tab is destroyed
                    }).catch(() => { });

                    hasSentLeave.current = true;
                }
            } else if (document.visibilityState === 'visible') {
                // If they return to the tab, restart the clock so we don't log a massive 8-hour session
                startTime.current = Date.now();
                hasSentLeave.current = false;
            }
        };

        const handlePageHide = () => {
            // Fallback for older iOS Safari browsers
            if (!hasSentLeave.current && currentPath.current) {
                const duration = Math.round((Date.now() - startTime.current) / 1000);
                if (duration > 1) {
                    fetch(analyticsTrackUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            eventName: 'page_leave',
                            path: currentPath.current,
                            metadata: { duration_seconds: duration }
                        }),
                        keepalive: true
                    }).catch(() => { });
                    hasSentLeave.current = true;
                }
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('pagehide', handlePageHide);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('pagehide', handlePageHide);
        };
    }, []);

    return null
}

export function AnalyticsTracker() {
    return (
        <Suspense fallback={null}>
            <AnalyticsTrackerContent />
        </Suspense>
    )
}
