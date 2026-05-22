'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyRecord } from '@/types';

interface Props {
    data: EnergyRecord[];
    title?: string;
}

export function RenewableTrendChart({
    data,
    title = 'Renewable % Over Time',
}: Props) {
    const chartData = [...data]
        .sort((a, b) => a.year - b.year)
        .map((record) => ({
            year: record.year,
            renewable: parseFloat(record.renewablePercent.toFixed(1)),
            carbon: parseFloat(record.carbonIntensity.toFixed(1)),
        }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={chartData}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-border"
                        />
                        <XAxis
                            dataKey="year"
                            className="text-xs"
                            tick={{ fill: 'hsl(var(--muted-foreground))' }}
                        />
                        <YAxis
                            className="text-xs"
                            tick={{ fill: 'hsl(--muted-foreground)' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />
                        <Legend />
                        <Line
                            type="monotone"
                            dataKey="renewable"
                            stroke="#22c55e"
                            strokeWidth={2}
                            dot={false}
                            name="Renewable %"
                        />
                        <Line
                            type="monotone"
                            dataKey="carbon"
                            stroke="#ef4444"
                            strokeWidth={2}
                            dot={false}
                            name="Carbon Intensity"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
