'use client';

import {
    ResponsiveContainer,
    AreaChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Area,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TrendData {
    year: number;
    renewablePercent: number;
    solarTwh: number;
    windTwh: number;
    hydroTwh: number;
}

interface Props {
    data: TrendData[];
}

export function GlobalTrendChartClient({ data }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Global Renewable Trend
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient
                                id="solar"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#f59e0b"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#f59e0b"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="wind"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                            <linearGradient
                                id="hydro"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="5%"
                                    stopColor="#06b6d4"
                                    stopOpacity={0.3}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#06b6d4"
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-border"
                        />
                        <XAxis
                            dataKey="year"
                            tick={{
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 12,
                            }}
                        />
                        <YAxis
                            tick={{
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 12,
                            }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                        <Area
                            type="monotone"
                            dataKey="solarTwh"
                            stroke="#f59e0b"
                            fill="url(#solar)"
                            strokeWidth={2}
                            name="Solar (TWh)"
                        />
                        <Area
                            type="monotone"
                            dataKey="windTwh"
                            stroke="#3b82f6"
                            fill="url(#wind)"
                            strokeWidth={2}
                            name="Wind (TWh)"
                        />
                        <Area
                            type="monotone"
                            dataKey="hydroTwh"
                            stroke="#06b6d4"
                            fill="url(#hydro)"
                            strokeWidth={2}
                            name="Hydro (TWh)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
