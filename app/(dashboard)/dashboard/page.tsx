import { StatCard } from '@/components/dashboard/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllCountries } from '@/lib/db/queries';
import { Globe, Sun, Wind, Zap } from 'lucide-react';
import { Suspense } from 'react';

export const revalidate = 3600;

async function DashboardContent() {
    const countries = await getAllCountries();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl fond-bold">Global Overview</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Tracking renewable energy across {countries.length}
                    countries
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4-gap-4">
                <StatCard
                    title="Countries Tracked"
                    value={countries.length.toString()}
                    subtitle="Active data source"
                    icon={Globe}
                    trend="up"
                    trendValue="+3 this month"
                />
                <StatCard
                    title="Avg Renewable %"
                    value="38.4%"
                    subtitle="Global average"
                    icon={Zap}
                    trend="up"
                    trendValue="+2.1% YoY"
                />
                <StatCard
                    title="Solar Capacity"
                    value="1.2 TW"
                    subtitle="Global installed"
                    icon={Sun}
                    trend="up"
                    trendValue="+18% YoY"
                />
                <StatCard
                    title="Wind Capacity"
                    value="899 GW"
                    subtitle="Global installed"
                    icon={Wind}
                    trend="up"
                    trendValue="+12% YoY"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-col-2 gap-4">
                <div className="lg:col-span-2 h-64 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground text-sm">
                    Charts will populate once energy records are added via the
                    sync job
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<DashboardSkeleton />}>
            <DashboardContent />
        </Suspense>
    );
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-4 gap-4">
                {[
                    ...Array(4).map((_, i) => (
                        <Skeleton key={i} className="h-32 rounded-lg" />
                    )),
                ]}
            </div>
            <Skeleton className="h-64 rounded-lg" />
        </div>
    );
}
