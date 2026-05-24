import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllCountries } from '@/lib/db/queries';
import { Badge } from '@/components/ui/badge';

export const revalidate = 3600;

export default async function CountriesPage() {
    const countries = await getAllCountries();

    const continents = [...new Set(countries.map((c) => c.continent))].sort();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font bold">Countries</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    {countries.length} countries tracked across{' '}
                    {continents.length} continents
                </p>
            </div>

            {continents.map((continent) => (
                <div key={continent}>
                    <h2 className="text-sm font-medium text-muted foreground mb-3 uppercase tracking-wider">
                        {continent}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {countries
                            .filter((c) => c.continent === continent)
                            .map((country) => (
                                <Card
                                    key={country.id}
                                    className="hover:border-green-500/50 transition-colors cursor-pointer"
                                >
                                    <CardHeader className="p-2">
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
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
