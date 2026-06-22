import { WorldMapClient } from '@/components/map/WorldMapClient';
import { getAllCountries, getTopRenewableCountries } from '@/lib/db/queries';

export default async function MapPage() {
    const [countries, topCountries] = await Promise.all([
        getAllCountries(),
        getTopRenewableCountries(50),
    ]);

    // build a lookup map of country code to renewable %
    const renewableByCode: Record<string, number> = {};
    topCountries.forEach(
        (item) => (renewableByCode[item.country.code] = item.renewablePercent),
    );

    return (
        <div className="space-y-4">
            <div>
                <h1 className="text-2xl font-bold">World Map</h1>
                <p className="text-muted-foreground text-sm mt-1">
                    Renewable energy percentage by country
                </p>
            </div>
            <WorldMapClient
                countries={countries}
                renewableByCode={renewableByCode}
            />
        </div>
    );
}
