import { electricityMapsApi } from '@/lib/api/electricityMaps';
import { cacheKeys, invalidateCache } from '@/lib/cache';
import { upsertLiveGrid } from '@/lib/db/queries';
import { NextRequest, NextResponse } from 'next/server';

const TRACKED_ZONES = ['DE', 'US-CAL-CISO', 'GB', 'DK-DK1', 'FR'];

export async function GET(request: NextRequest) {
    // Secure the cron endpoint - only Vercel cron or your secret can call it.
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const results = [];

    for (const zone of TRACKED_ZONES) {
        try {
            const [carbon, power] = await Promise.all([
                electricityMapsApi.getCarbonIntensity(zone),
                electricityMapsApi.getPowerBreakdown(zone),
            ]);

            await upsertLiveGrid({
                countryCode: zone,
                carbonIntensity: carbon.carbonIntensity,
                renewablePercent: power.renewablePercentage,
                fossilPercent: power.fossilFuelPercentage,
            });

            // invalidate cache so next  request gets fresh data
            await invalidateCache(cacheKeys.liveGrid(zone));
            await invalidateCache(cacheKeys.allLiveGrids());

            results.push({ zone, status: 'success' });
        } catch (error) {
            console.error(`Sync failed for zone ${zone}:`, error);
            results.push({ zone, status: 'failed' });
        }
    }

    return NextResponse.json({
        synced: new Date().toISOString(),
        results,
    });
}
