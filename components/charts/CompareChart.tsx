'use  client';

import { Country, EnergyRecord } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';

const COLORS = ['#22c55e', '#3b8256', '#f59b0e'];

interface CountryData {
    country: Country;
    records: EnergyRecord[];
}

interface Props {
    data: CountryData[];
    metric: keyof EnergyRecord;
    title: string;
    formatter: (value: number) => string;
}

export function CompareChart({ data, metric, title, formatter }: Props) {
    const allYears = [
        ...new Set(data.flatMap((d) => d.records.map((r) => r.year))),
    ].sort();

    const chartData = allYears.map((year) => {
        const row: Record<string, number | string> = { year };
        data.forEach((d) => {
            const record = d.records.find((r) => r.year === year);
            if (record) row[d.country.code] = record[metric] as number;
        });

        return row;
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
            </CardHeader>

            <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={chartData}>
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
                            formatter={(value: any) => formatter(value)}
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />

                        <Legend />

                        {data.map((d, i) => (
                            <Line
                                key={d.country.code}
                                type="monotone"
                                dataKey={d.country.code}
                                stroke={COLORS[i]}
                                strokeWidth={2}
                                dot={{ r: 4 }}
                                name={d.country.name}
                            />
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
