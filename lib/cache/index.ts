import { redis } from './redis';

// Cache time constants - all in seconds
export const CACHE_TIMES = {
    LIVE_DATA: 60 * 5, // 5 minutes
    HISTORICAL: 60 * 60 * 24, // 24 hours
    STATIC: 60 * 60 * 24 * 7, // 7 days
} as const;

// Generic get or set - fetches from cache, falls back to fn()
export async function getOrSet<T>(
    key: string,
    fn: () => Promise<T>,
    ttl: number,
): Promise<T> {
    try {
        const cached = await redis.get<T>(key);
        if (cached) {
            console.log(`✅ Cache hit: ${key}`);
            return cached;
        }
    } catch (error) {
        console.error(`Cache read error for ${key}:`, error);
    }

    const fresh = await fn();

    try {
        await redis.set(key, fresh, { ex: ttl });
        console.log(`📝 Cache set: ${key}`);
    } catch (error) {
        console.error(`Cache write error for ${key}:`, error);
    }

    return fresh;
}

export async function invalidateCache(key: string) {
    await redis.del(key);
}

export const cacheKeys = {
    allCountries: () => 'countries:all',
    country: (code: string) => `countries:${code}`,
    energyByCountry: (code: string) => `energy:${code}`,
    energyByYear: (year: number) => `energy:year:${year}`,
    liveGrid: (code: string) => `live:${code}`,
    allLiveGrids: () => 'live:all',
};
