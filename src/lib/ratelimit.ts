// src/lib/ratelimit.ts

/**
 * Simple in-memory rate limiter for server-side checks.
 * Note: This state will be lost if the server restarts or in serverless environments with many cold starts.
 * For a production-ready solution on Vercel, consider Upstash Redis.
 */

interface RateLimitData {
    count: number;
    lastReset: number;
}

const rateLimitMap = new Map<string, RateLimitData>();

const MAX_REQUESTS = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours

export function checkRateLimit(ip: string): { success: boolean; remaining: number } {
    const now = Date.now();
    const data = rateLimitMap.get(ip);

    // If no data or window expired
    if (!data || now - data.lastReset > WINDOW_MS) {
        rateLimitMap.set(ip, { count: 1, lastReset: now });
        return { success: true, remaining: MAX_REQUESTS - 1 };
    }

    if (data.count >= MAX_REQUESTS) {
        return { success: false, remaining: 0 };
    }

    data.count += 1;
    rateLimitMap.set(ip, data);
    return { success: true, remaining: MAX_REQUESTS - data.count };
}
