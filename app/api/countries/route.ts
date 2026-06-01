import { NextResponse } from 'next/server';
import { getAllCountries } from '@/lib/db/queries';
import { getOrSet, cacheKeys, CACHE_TIMES } from '@/lib/cache';

export async function GET() {
    try {
        const countries = await getOrSet(
            cacheKeys.allCountries(),
            () => getAllCountries(),
            CACHE_TIMES.STATIC,
        );

        return NextResponse.json({ data: countries });
    } catch (error) {
        console.error('GET /api/countries error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch countries' },
            { status: 500 },
        );
    }
}
