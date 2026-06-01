'use client';

import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TopCountry {
    renewablePercent: number;
    country: {
        name: string;
        code: string;
    };
}

interface Props {
    data: TopCountry[];
}

export function TopCountriesChart({ data }: Props) {
    const chartData = data.map((item) => ({
        name: item.country.code,
        fullName: item.country.name,
        renewable: parseFloat(item.renewablePercent.toFixed(1)),
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Top Countries by Renewable %
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData} layout="vertical">
                        <CartesianGrid
                            strokeDasharray="3 3"
                            className="stroke-border"
                        />

                        <XAxis
                            type="number"
                            domain={[0, 100]}
                            tick={{
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 12,
                            }}
                            tickFormatter={(v) => `${v}%`}
                        />

                        <YAxis
                            type="category"
                            dataKey="name"
                            tick={{
                                fill: 'hsl(var(--muted-foreground))',
                                fontSize: 12,
                            }}
                            width={35}
                        />

                        <Tooltip
                            formatter={(value) => [`${value}%`, 'Renewable']}
                            labelFormatter={(label) =>
                                chartData.find((d) => d.name === label)
                                    ?.fullName ?? label
                            }
                            contentStyle={{
                                backgroundColor: 'hsl(var(--card))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: '8px',
                            }}
                        />

                        {chartData.map((entry, index) => (
                            <Bar
                                key={index}
                                dataKey="renewable"
                                radius={[0, 4, 4, 0]}
                            >
                                {chartData.map((_, i) => (
                                    <Cell
                                        key={i}
                                        fill={
                                            i === index ? '#22c55e' : '#22c55e'
                                        }
                                        opacity={1 - index * 0.15}
                                    />
                                ))}
                            </Bar>
                        ))}
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
