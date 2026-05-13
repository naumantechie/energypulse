import { NextRequest, NextResponse } from 'next/server';
import { getEnergyByCountry, getGlobalStats } from '@/lib/db/queries';
import { getOrSet, cacheKeys, CACHE_TIMES } from '@/lib/cache';
import { z } from 'zod';

const querySchema = z.object({
    country: z.string().length(2).toUpperCase().optional(),
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const parsed = querySchema.safeParse({
            country: searchParams.get('country') ?? undefined,
        });

        if (!parsed.success) {
            return NextResponse.json(
                { error: 'Invalid query parameters' },
                { status: 400 },
            );
        }

        const { country } = parsed.data;

        // Country specific data
        if (country) {
            const data = await getOrSet(
                cacheKeys.energyByCountry(country),
                () => getEnergyByCountry(country),
                CACHE_TIMES.HISTORICAL,
            );
            return NextResponse.json({ data });
        }

        // Global stats
        const data = await getOrSet(
            'energy:global',
            () => getGlobalStats(),
            CACHE_TIMES.HISTORICAL,
        );

        return NextResponse.json({ data });
    } catch (error) {
        console.error('GET /api/energy error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch energy data' },
            { status: 500 },
        );
    }
}
