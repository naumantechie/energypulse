import { LiveGridClient } from '@/components/dashboard/LiveGridClient';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllLiveGrids } from '@/lib/db/queries';
import { Suspense } from 'react';

export const revalidate = 300; // after every 5 mins

async function LiveGridContent() {
    const grids = await getAllLiveGrids();
    return <LiveGridClient initialData={grids} />;
}

export default function LiveGridPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Live Grid Data</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Real time carbon intensity and renewable percentage by
                    region
                </p>
            </div>

            <Suspense fallback={<LiveGridSkeleton />}>
                <LiveGridContent />
            </Suspense>
        </div>
    );
}

function LiveGridSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
        </div>
    );
}
