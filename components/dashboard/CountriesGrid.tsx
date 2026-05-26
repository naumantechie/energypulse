'use client';

import { Input } from '@/components/ui/input';
import { Country } from '@/types';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';

interface Props {
    countries: Country[];
}

export function CountriesGrid({ countries }: Props) {
    const [search, setSearch] = useState('');
    const filtered = countries.filter(
        (c) =>
            c.name.toLowerCase().includes(search.toLowerCase()) ||
            c.code.toLowerCase().includes(search.toLowerCase()) ||
            c.continent.toLowerCase().includes(search.toLowerCase()),
    );

    const continents = [...new Set(filtered.map((c) => c.continent))].sort();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Countries</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {countries.length} countries tracked
                </p>
            </div>

            <div className="relative max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search countries"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9"
                />
            </div>

            {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    No countries found for "{search}"
                </div>
            )}

            {continents.map((continent) => (
                <div key={continent}>
                    <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
                        {continent}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filtered
                            .filter((c) => c.continent === continent)
                            .map((country) => (
                                <Link
                                    key={country.id}
                                    href={`/countries/${country.code}`}
                                >
                                    <Card className="hover:border-green-500/50 transition-colors curson-pointer h-full">
                                        <CardHeader className="pb-2">
                                            <div className="flex items-center justify-between">
                                                <CardTitle className="text-base">
                                                    {country.name}
                                                </CardTitle>
                                                <Badge variant="outline">
                                                    {country.code}
                                                </Badge>
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-xs text-muted-foreground">
                                                Population:{' '}
                                                {country.population.toLocaleString()}
                                            </p>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
