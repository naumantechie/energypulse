import { RenewableBreakdownChart } from '@/components/charts/RenewableBreakdownChart';
import { RenewableTrendChart } from '@/components/charts/RenewableTrendChart';
import { ExportButton } from '@/components/dashboard/ExportButton';
import { StatCard } from '@/components/dashboard/StatCard';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getCountryByCode } from '@/lib/db/queries';
import { ArrowLeft, Leaf, Sun, Wind, Zap } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface Props {
    params: Promise<{ code: string }>;
}

export default async function CountryDetailPage({ params }: Props) {
    const { code } = await params;
    const country = await getCountryByCode(code);

    if (!country) notFound();

    const latestRecord = country.energyRecords[0] ?? null;

    return (
        <div className="space-y-6">
            <Link href="/countries">
                <Button variant="ghost" size="sm" className="gap-2">
                    <ArrowLeft className="h-4 w-4" />
                    Back to Countries
                </Button>
            </Link>

            <div className="flex items-center justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2l font-bold">{country.name}</h1>
                        <Badge variant="outline">{country.code}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1">
                        {country.continent} · Pupolation:{' '}
                        {country.population.toLocaleString()}
                    </p>
                </div>

                {country.energyRecords.length > 0 && (
                    <ExportButton
                        country={country}
                        records={country.energyRecords}
                    />
                )}
            </div>

            {latestRecord ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <StatCard
                            title="Renewable %"
                            value={`${latestRecord.renewablePercent.toFixed(1)}%`}
                            subtitle={`As of ${latestRecord.year}`}
                            icon={Leaf}
                            trend="up"
                        />

                        <StatCard
                            title="Solar Generation"
                            value={`${(latestRecord.solarGwh / 1000).toFixed(1)} TWh`}
                            subtitle={`${latestRecord.year}`}
                            icon={Sun}
                        />

                        <StatCard
                            title="Wind Generation"
                            value={`${(latestRecord.windGwh / 1000).toFixed(1)} TWh`}
                            subtitle={`${latestRecord.year}`}
                            icon={Wind}
                        />

                        <StatCard
                            title="Carbon Intensity"
                            value={`${latestRecord.carbonIntensity} gCO₂/kWh`}
                            subtitle={`${latestRecord.year}`}
                            icon={Zap}
                            trend={
                                latestRecord.carbonIntensity < 200
                                    ? 'up'
                                    : 'down'
                            }
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <RenewableBreakdownChart data={latestRecord} />
                        <RenewableTrendChart data={country.energyRecords} />
                    </div>
                </>
            ) : (
                <div className="h-64 rounded-lg border border-border bg-card flex items center justify-center text-muted-foreground text-sm">
                    No energy data available for {country.name} yet
                </div>
            )}
        </div>
    );
}
