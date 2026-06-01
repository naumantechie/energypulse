export interface Country {
    id: string;
    code: string;
    name: string;
    continent: string;
    population: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface EnergyRecord {
    id: string;
    countryId: string;
    year: number;
    solarGwh: number;
    windGwh: number;
    hydroGwh: number;
    nuclearGwh: number;
    fossilGwh: number;
    totalGwh: number;
    renewablePercent: number;
    carbonIntensity: number;
    createdAt: string;
}

export interface liveGrid {
    id: string;
    countryCode: string;
    carbonIntensity: number;
    renewablePercent: number;
    fossilPercent: number;
    syncedAt: string;
}

export interface GlobalStats {
    year: number;
    _sum: {
        solarGwn: number;
        windGwh: number;
        hydroGwh: number;
        fossilGwh: number;
        totalGwh: number;
    };
}

export interface CountryWithEnergy extends Country {
    energyRecods: EnergyRecord;
}
