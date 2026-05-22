'use client';

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyRecord } from '@/types';

const COLORS = {
    Solar: '#f59e0b',
    Wind: '#3b82f6',
    Hydro: '#06b6d4',
    Nuclear: '#8b5cf6',
    Fossil: '#6b7280',
};

interface Props {
    data: EnergyRecord;
}

export function RenewableBreakdownChart({ data }: Props) {
    const chartData = [
        { name: 'Solar', value: data.solarGwh },
        { name: 'Wind', value: data.windGwh },
        { name: 'Hydro', value: data.hydroGwh },
        { name: 'Nuclear', value: data.nuclearGwh },
        { name: 'Fossil', value: data.fossilGwh },
    ].filter((d) => d.value > 0);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    Energy Mix
                </CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={3}
                            dataKey="value"
                        >
                            {chartData.map((entry) => (
                                <Cell
                                    key={entry.name}
                                    fill={
                                        COLORS[
                                            entry.name as keyof typeof COLORS
                                        ]
                                    }
                                />
                            ))}
                        </Pie>
                        <Tooltip
                            formatter={(value: number) =>
                                `${value.toLocaleString()} Gwh`
                            }
                        />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
