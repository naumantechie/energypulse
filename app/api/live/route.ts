import { CACHE_TIMES, cacheKeys, getOrSet } from '@/lib/cache';
import { getAllLiveGrids } from '@/lib/db/queries';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const data = await getOrSet(
            cacheKeys.allLiveGrids(),
            () => getAllLiveGrids(),
            CACHE_TIMES.LIVE_DATA,
        );

        return NextResponse.json({ data });
    } catch (error) {
        console.error('GET /api/live error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch live grid data' },
            { status: 500 },
        );
    }
}
