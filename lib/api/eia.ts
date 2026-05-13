import { env } from '@/config/env';

const BASE_URL = 'https://api.eia.gov/v2';

export interface EIASeriesDate {
    period: string;
    value: number;
    unit: string;
}

async function fetchFromEIA<T>(
    endpoint: string,
    params: Record<string, string> = {},
): Promise<T> {
    const searchParams = new URLSearchParams({
        api_key: env.EIA_API_KEY,
        ...params,
    });

    const response = await fetch(`${BASE_URL}${endpoint}${searchParams}`, {
        next: { revalidate: 86400 }, // cache for 24 hours
    });

    if (!response.ok)
        throw new Error(
            `EIA API error: ${response.status} ${response.statusText}`,
        );

    return response.json();
}

export const eiaApi = {
    // Get electricity generation by source
    getGenerationSourceByPower: (source: string) =>
        fetchFromEIA<{ response: { data: EIASeriesDate[] } }>(
            '/electricity/electric-power-operational-data/data',
            {
                frequency: 'annual',
                'data[0]': 'generation',
                'facets[feultype][]': source,
            },
        ),
};
