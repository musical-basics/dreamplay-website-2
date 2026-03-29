'use server'

import { createClient } from '@supabase/supabase-js'
import { headers } from 'next/headers'

// Initialize Supabase Admin Client for generic logging (service role)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export interface AnalyticsLog {
    id: string
    created_at: string
    event_name: string
    path: string
    ip_address: string | null
    country: string | null
    city: string | null
    user_agent: string | null
    user_id?: string
    metadata?: any
}

export async function logEvent(
    eventName: string,
    data: { path: string; userId?: string; metadata?: any }
) {
    try {
        const headerList = await headers()
        const userAgent = headerList.get('user-agent')
        const forwardedFor = headerList.get('x-forwarded-for')
        const ip = forwardedFor ? forwardedFor.split(',')[0] : 'unknown'

        // Fetch geolocation data from IP
        let country: string | null = null
        let city: string | null = null
        if (ip && ip !== 'unknown' && ip !== '::1' && ip !== '127.0.0.1') {
            try {
                // Using ip-api.com (free for non-commercial, up to 45 req/min)
                const geoResponse = await fetch(`http://ip-api.com/json/${ip}`, {
                    signal: AbortSignal.timeout(2000)
                })

                if (geoResponse.ok) {
                    const geoData = await geoResponse.json()
                    if (geoData.status === 'success') {
                        country = geoData.country || null
                        city = geoData.city || null
                    }
                }
            } catch (geoError) {
                console.error('[Analytics] Geolocation lookup exception:', geoError)
            }
        }

        const { error } = await supabase.from('analytics_logs').insert({
            event_name: eventName,
            path: data.path,
            ip_address: ip,
            country,
            city,
            user_agent: userAgent,
            user_id: data.userId,
            metadata: data.metadata,
        })

        if (error) {
            console.error('[Analytics Server] Supabase insert error:', error)
        }
    } catch (error) {
        console.error('Failed to log analytics event:', error)
        // Don't throw, we don't want to break the UI
    }
}

export async function getRecentLogs(): Promise<AnalyticsLog[]> {
    try {
        const { data, error } = await supabase
            .from('analytics_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100)

        if (error) {
            console.error('Error fetching analytics logs:', error)
            return []
        }

        return data as AnalyticsLog[]
    } catch (error) {
        console.error('Failed to get recent logs:', error)
        return []
    }
}

export type TimeRange = '24h' | '7d' | '30d'

export async function getAnalyticsStats(range: TimeRange) {
    try {
        const now = new Date()
        const startDate = new Date()

        if (range === '24h') {
            startDate.setHours(startDate.getHours() - 24)
        } else if (range === '7d') {
            startDate.setDate(startDate.getDate() - 7)
        } else {
            startDate.setDate(startDate.getDate() - 30)
        }

        let allLogs: any[] = []
        let from = 0
        const limit = 1000

        while (true) {
            const { data, error } = await supabase
                .from('analytics_logs')
                .select('created_at, path, ip_address')
                .gte('created_at', startDate.toISOString())
                .order('created_at', { ascending: true })
                .range(from, from + limit - 1)

            if (error) {
                console.error('Error fetching analytics stats:', error)
                if (from === 0) return { chartData: [], uniqueVisitors: 0, uniquePaths: 0 }
                break
            }

            if (!data || data.length === 0) break

            allLogs = [...allLogs, ...data]
            if (data.length < limit) break
            from += limit
        }

        // Aggregate data for chart (Unique Visitors per bucket)
        const chartDataMap = new Map<string, Set<string>>()

        // Define format based on range
        const getKey = (dateStr: string) => {
            const date = new Date(dateStr)
            if (range === '24h') {
                return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })
            } else {
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
            }
        }

        allLogs.forEach(log => {
            const key = getKey(log.created_at)
            if (!chartDataMap.has(key)) {
                chartDataMap.set(key, new Set())
            }
            chartDataMap.get(key)!.add(log.ip_address)
        })

        const chartData = Array.from(chartDataMap.entries()).map(([date, ipSet]) => ({
            date,
            visitors: ipSet.size
        }))

        // Sort chartData by date if needed, but the map insertion order might strictly follow log order 
        // if keys are distinct. However, Map iterates in insertion order. 
        // Since logs are sorted by created_at, keys are inserted in time order.

        return {
            chartData,
            uniqueVisitors: new Set(allLogs.map(l => l.ip_address)).size,
            uniquePaths: new Set(allLogs.map(l => l.path)).size
        }

    } catch (error) {
        console.error('Failed to get analytics stats:', error)
        return { chartData: [], uniqueVisitors: 0, uniquePaths: 0 }
    }
}

export interface ConversionDetail {
    ip_address: string
    converted_at: string
}

export interface VisitorDetail {
    ip_address: string
    first_seen_at: string
}

export interface ABTestStats {
    variant: string
    visitors: number
    conversions: number
    conversionRate: number
    conversionDetails: ConversionDetail[]
    visitorDetails: VisitorDetail[]
}

export async function getABTestStats(): Promise<ABTestStats[]> {
    try {
        // We want to count distinct IPs for each bucket that visited ANY page (Total Visitors)
        // And distinct IPs for each bucket that performed 'cta_click' with label 'join_waitlist' (Conversions)
        // Since we store JSON in metadata, we need to extract it.
        // Supabase/Postgres JSON extraction: metadata->>'ab_test_bucket'

        // 1. Get Visitors per Bucket
        let visitors: any[] = []
        let vFrom = 0
        const vLimit = 1000
        while (true) {
            const { data, error } = await supabase
                .from('analytics_logs')
                .select('ip_address, metadata, created_at')
                .not('metadata->>ab_test_bucket', 'is', null)
                .range(vFrom, vFrom + vLimit - 1)

            if (error) throw error
            if (!data || data.length === 0) break
            visitors = [...visitors, ...data]
            if (data.length < vLimit) break
            vFrom += vLimit
        }

        // 2. Get Conversions per Bucket
        let conversions: any[] = []
        let cFrom = 0
        const cLimit = 1000
        while (true) {
            const { data, error } = await supabase
                .from('analytics_logs')
                .select('ip_address, metadata, created_at')
                .eq('event_name', 'cta_click')
                .eq('metadata->>label', 'join_waitlist')
                .not('metadata->>ab_test_bucket', 'is', null)
                .range(cFrom, cFrom + cLimit - 1)

            if (error) throw error
            if (!data || data.length === 0) break
            conversions = [...conversions, ...data]
            if (data.length < cLimit) break
            cFrom += cLimit
        }

        // Process in JS for simplicity (could be complex SQL)
        const buckets = ['control', 'variant']
        const stats: ABTestStats[] = buckets.map(bucket => {
            // Process Visitors
            const rawBucketVisitors = visitors.filter((l: any) => l.metadata?.ab_test_bucket === bucket)
            const uniqueVisitorIps = new Set(rawBucketVisitors.map((l: any) => l.ip_address))
            const bucketVisitors = uniqueVisitorIps.size

            const visitorDetails: VisitorDetail[] = []
            uniqueVisitorIps.forEach(ip => {
                const events = rawBucketVisitors.filter((l: any) => l.ip_address === ip)
                events.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                if (events.length > 0) {
                    visitorDetails.push({
                        ip_address: events[0].ip_address,
                        first_seen_at: events[0].created_at
                    })
                }
            })

            // Filter conversions for this bucket
            const rawBucketConversions = conversions.filter((l: any) => l.metadata?.ab_test_bucket === bucket)

            // Get unique IPs
            const uniqueConvertedIps = new Set(
                rawBucketConversions.map((l: any) => l.ip_address)
            )
            const bucketConversions = uniqueConvertedIps.size

            // Get details: Map distinct IPs to their events. 
            // If we want to show ALL events, we just map rawBucketConversions.
            // If we want one per IP (the first one), we group.
            // The user requested "see 2 events... and 9 separate events" matching the counts. 
            // Since the count logic above relies on Sets (unique IPs), we should probably show the unique conversion events.
            // However, seeing exactly WHEN they clicked is useful. If a user clicked 5 times, showing 5 rows might be noisy but accurate to "events".
            // BUT, the summary count is Unique IPs. If we list all events, the list length won't match the summary count if there are duplicates.
            // User asked: "see 2 events for the 'control' and 9 separate events for the 'variant'" matching the screenshot counts.
            // Screenshot counts are typically unique visitors/conversions.
            // I will return ALL events but we can group them in UI or just list the first one per IP.
            // Let's list the FIRST event per unique IP to match the count exactly.

            const conversionDetails: ConversionDetail[] = []
            uniqueConvertedIps.forEach(ip => {
                // Find all events for this IP
                const events = rawBucketConversions.filter((l: any) => l.ip_address === ip)
                // Sort by time ascending to get the first conversion
                events.sort((a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                if (events.length > 0) {
                    conversionDetails.push({
                        ip_address: events[0].ip_address,
                        converted_at: events[0].created_at
                    })
                }
            })

            return {
                variant: bucket,
                visitors: bucketVisitors,
                conversions: bucketConversions,
                conversionRate: bucketVisitors > 0 ? (bucketConversions / bucketVisitors) * 100 : 0,
                conversionDetails: conversionDetails.sort((a, b) => new Date(b.converted_at).getTime() - new Date(a.converted_at).getTime()),
                visitorDetails: visitorDetails.sort((a, b) => new Date(b.first_seen_at).getTime() - new Date(a.first_seen_at).getTime())
            }
        })

        return stats

    } catch (error) {
        console.error('Failed to get AB Test stats:', error)
        return []
    }
}
