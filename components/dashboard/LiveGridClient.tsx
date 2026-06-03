'use client';

import { LiveGrid } from '@/types';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Props {
    initialData: LiveGrid[];
}

function getCarbonLevel(intensity: number): {
    label: string;
    color: string;
} {
    if (intensity < 100) return { label: 'Very Low', color: 'text-green-500' };
    if (intensity < 200) return { label: 'Low', color: 'text-lime-500' };
    if (intensity < 300) return { label: 'Medium', color: 'text-yellow-500' };
    if (intensity < 400) return { label: 'High', color: 'text-orange-500' };
    return { label: 'Very High', color: 'text-red-500' };
}

export function LiveGridClient({ initialData }: Props) {
    const [data, setData] = useState<LiveGrid[]>(initialData);
    const [lastUpdated, setLastUpdated] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(
            async () => {
                try {
                    const res = await fetch('/api/live');
                    const json = await res.json();
                    setData(json.data);
                    setLastUpdated(new Date());
                } catch (error) {
                    console.error('Failed to refresh live data:', error);
                }
            },
            5 * 60 * 1000,
        );

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                </span>
                Last updated: {lastUpdated.toLocaleTimeString()}
            </div>

            {data.length === 0 && (
                <div className="h-64 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground text-sm">
                    No live data yet - cron job will populate this automatically
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.map((grid) => {
                    const carbonLevel = getCarbonLevel(grid.carbonIntensity);

                    return (
                        <Card
                            key={grid.id}
                            className="hover:border-green-500/50 transition-colors"
                        >
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">
                                        {grid.countryCode}
                                    </CardTitle>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            'text-xs',
                                            carbonLevel.color,
                                        )}
                                    >
                                        {carbonLevel.label}
                                    </Badge>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-3">
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">
                                            Carbon Intensity
                                        </span>
                                        <span className={carbonLevel.color}>
                                            {grid.carbonIntensity} gCO₂/kWh
                                        </span>
                                    </div>

                                    <div className="h-1 5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className={cn(
                                                'h-full rounded-full transition-all',
                                                {
                                                    'bg-green-500':
                                                        grid.carbonIntensity <
                                                        100,
                                                    'bg-lime-500':
                                                        grid.carbonIntensity >=
                                                            100 &&
                                                        grid.carbonIntensity <
                                                            200,
                                                    'bg-yellow-500':
                                                        grid.carbonIntensity >=
                                                            200 &&
                                                        grid.carbonIntensity <
                                                            300,
                                                    'bg-orange-500':
                                                        grid.carbonIntensity >=
                                                            300 &&
                                                        grid.carbonIntensity <
                                                            400,
                                                    'bg-red-500':
                                                        grid.carbonIntensity >=
                                                        400,
                                                },
                                            )}
                                            style={{
                                                width: `${Math.min((grid.carbonIntensity / 600) * 100, 100)}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <div className="flex justify-between text-xs mb-1">
                                            <span className="text-muted-foreground">
                                                Renewable
                                            </span>
                                            <span className="text-green-500">
                                                {grid.renewablePercent.toFixed(
                                                    1,
                                                )}
                                                %
                                            </span>
                                        </div>
                                        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-green-500 rounded-full transition-all"
                                                style={{
                                                    width: `${grid.renewablePercent}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Synced:{' '}
                                    {new Date(
                                        grid.syncedAt,
                                    ).toLocaleTimeString()}
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
