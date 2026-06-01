'use client';

import { Country, EnergyRecord } from '@/types';
import { useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { CompareChart } from '@/components/charts/CompareChart';

interface Props {
    countries: Country[];
}

interface CountryData {
    country: Country;
    records: EnergyRecord[];
}

export function CompareClient({ countries }: Props) {
    const [selected, setSelected] = useState<string[]>([]);
    const [data, setData] = useState<CountryData[]>([]);
    const [loading, setLoading] = useState(false);

    async function handleSelect(code: string) {
        if (selected.includes(code) || selected.length >= 3) return;

        const newSelected = [...selected, code];
        setSelected(newSelected);
        setLoading(true);

        try {
            const res = await fetch(`/api/energy?country=${code}`);
            const json = await res.json();
            const country = countries.find((c) => c.code === code);

            if (!country) return;

            setData((prev) => [...prev, { country, records: json.data }]);
        } catch (error) {
            console.error('Failed to fetch country data:', error);
        } finally {
            setLoading(false);
        }
    }

    function handleRemove(code: string) {
        setSelected((prev) => prev.filter((c) => c !== code));
        setData((prev) => prev.filter((d) => d.country.code !== code));
    }

    const availabeCountries = countries.filter(
        (c) => !selected.includes(c.code),
    );

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Compare Countries</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Select up to 3 countries to compare renewable energy data
                </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
                {selected.length < 3 && (
                    <Select onValueChange={handleSelect}>
                        <SelectTrigger className="w-48">
                            <SelectValue placeholder="Add country..." />
                        </SelectTrigger>
                        <SelectContent>
                            {availabeCountries.map((country) => (
                                <SelectItem
                                    key={country.code}
                                    value={country.code}
                                >
                                    {country.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {data.map((d) => (
                    <Badge
                        key={d.country.code}
                        variant="secondary"
                        className="gap-2 px-3 py-1 cursor-pointer"
                        onClick={() => handleRemove(d.country.code)}
                    >
                        {d.country.name}
                        <span className="text-muted-foreground">X</span>
                    </Badge>
                ))}
            </div>

            {loading && <Skeleton className="h-80 rounded-lg" />}

            {selected.length === 0 && (
                <div className="h-64 rounded-lg border border-border bg-card flex items-center justify-center text-muted-foreground text-sm">
                    Select at least one country to start comparing
                </div>
            )}

            {data.length > 0 && !loading && (
                <div className="space-y-4">
                    <CompareChart
                        data={data}
                        metric="renewablePercent"
                        title="Renewable % Comparison"
                        formatter={(v) => `${v}%`}
                    />

                    <CompareChart
                        data={data}
                        metric="carbonIntensity"
                        title="Carbon Intensity Comparison (gCO₂/kWh)"
                        formatter={(v) => `${v} gCO₂`}
                    />

                    <CompareChart
                        data={data}
                        metric="solarGwh"
                        title="Solar Generation Comparison (GWh)"
                        formatter={(v) => `${v.toLocaleString()} GWh`}
                    />
                </div>
            )}
        </div>
    );
}
