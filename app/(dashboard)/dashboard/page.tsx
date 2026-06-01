import { GlobalTrendChart } from '@/components/charts/GlobalTrendChart';
import { TopCountriesChart } from '@/components/charts/TopCountriesChart';
import { StatCard } from '@/components/dashboard/StatCard';
import { Skeleton } from '@/components/ui/skeleton';
import {
    getAllCountries,
    getGlobalStats,
    getTopRenewableCountries,
} from '@/lib/db/queries';
import { Globe, Sun, Wind, Zap } from 'lucide-react';
import { Suspense } from 'react';

export const revalidate = 3600;

async function DashboardContent() {
    const [countries, topCountries, globalStats] = await Promise.all([
        getAllCountries(),
        getTopRenewableCountries(5),
        getGlobalStats(),
    ]);

    const totalRenewableGwh = globalStats
        ? (globalStats._sum.solarGwh ?? 0) +
          (globalStats._sum.windGwh ?? 0) +
          (globalStats._sum.hydroGwh ?? 0)
        : 0;

    const totalGwh = globalStats?._sum.totalGwh ?? 0;
    const globalRenewablePercent =
        totalGwh > 0
            ? ((totalRenewableGwh / totalGwh) * 100).toFixed(1)
            : 'N/A';

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
                    title="Global Renewable %"
                    value={`${globalRenewablePercent}%`}
                    subtitle="Global average"
                    icon={Zap}
                    trend="up"
                    trendValue="+2.1% YoY"
                />
                <StatCard
                    title="Total Solar"
                    value={`${((globalStats?._sum.solarGwh ?? 0) / 1000).toFixed(0)} TWh`}
                    subtitle="Global installed"
                    icon={Sun}
                    trend="up"
                    trendValue="+18% YoY"
                />
                <StatCard
                    title="Total Wind"
                    value={`${((globalStats?._sum.windGwh ?? 0) / 1000).toFixed(0)} TWh`}
                    subtitle="Global installed"
                    icon={Wind}
                    trend="up"
                    trendValue="+12% YoY"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-col-2 gap-4">
                <TopCountriesChart data={topCountries} />
                <GlobalTrendChart />
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
