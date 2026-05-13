import { env } from '@/config/env';

const BASE_URL = 'https://api.electricitymap.org/v3';

export interface LiveGridData {
    zone: string;
    carbonIntensity: number;
    dateTime: string;
    updatedAt: string;
}

export interface PorwerBreakdown {
    zone: string;
    renewablePercentage: number;
    fossilFuelPercentage: number;
    powerConsumptionBreakdown: Record<string, number>;
}

async function fetchFromElectricityMaps<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
            'auth-token': env.ELECTRICITY_MAPS_API_KEY,
        },
        next: { revalidate: 300 }, // Nextjs cache for 5 minutes
    });

    if (!response.ok) {
        throw new Error(
            `Electricity Maps API error: ${response.status} ${response.statusText}`,
        );
    }

    return response.json();
}

export const electricityMapsApi = {
    // Get Live carbon intensity for a zone
    getCarbonIntensity: (zone: string) =>
        fetchFromElectricityMaps<LiveGridData>(
            `/carbon-intensity/latest?zone=${zone}`,
        ),

    // Get power breakdown (renewables vs fossil)
    getPowerBreakdown: (zone: string) =>
        fetchFromElectricityMaps<PorwerBreakdown>(
            `/power-breakdown/latest?zone=${zone}`,
        ),
};
