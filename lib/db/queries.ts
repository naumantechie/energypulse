import { prisma } from './prisma';

// Countries

export async function getAllCountries() {
    return prisma.country.findMany({
        orderBy: { name: 'asc' },
    });
}

export async function getCountryByCode(code: string) {
    return prisma.country.findUnique({
        where: { code: code.toUpperCase() },
        include: {
            energyRecords: {
                orderBy: { year: 'desc' },
            },
        },
    });
}

// Energy Records

export async function getEnergyByCountry(countryCode: string) {
    return prisma.energyRecord.findMany({
        where: {
            country: { code: countryCode.toUpperCase() },
        },
        orderBy: { year: 'desc' },
    });
}

export async function getLatestEnergyByCountry(countryCode: string) {
    return prisma.energyRecord.findFirst({
        where: {
            country: { code: countryCode.toUpperCase() },
        },
        orderBy: { year: 'desc' },
    });
}

export async function getTopRenewableCountries(limit: number = 10) {
    return prisma.energyRecord.findMany({
        where: { year: new Date().getFullYear() - 1 },
        orderBy: { renewablePercent: 'desc' },
        take: limit,
        include: { country: true },
    });
}

export async function getGlobalStats() {
    const latest = await prisma.energyRecord.groupBy({
        by: ['year'],
        _sum: {
            solarGwh: true,
            windGwh: true,
            hydroGwh: true,
            fossilGwh: true,
            totalGwh: true,
        },
        orderBy: { year: 'desc' },
        take: 1,
    });

    return latest[0] ?? null;
}

// Live Grid

export async function upsertLiveGrid(data: {
    countryCode: string;
    carbonIntensity: number;
    renewablePercent: number;
    fossilPercent: number;
}) {
    return prisma.liveGrid.upsert({
        where: { countryCode: data.countryCode },
        update: {
            carbonIntensity: data.carbonIntensity,
            renewablePercent: data.renewablePercent,
            fossilPercent: data.fossilPercent,
            syncedAt: new Date(),
        },
        create: data,
    });
}

export async function getAllLiveGrids() {
    return prisma.liveGrid.findMany({
        orderBy: { renewablePercent: 'desc' },
    });
}

// Global trends

export async function getGlobalTrends() {
    const records = await prisma.energyRecord.groupBy({
        by: ['year'],
        _sum: {
            solarGwh: true,
            windGwh: true,
            hydroGwh: true,
            nuclearGwh: true,
            fossilGwh: true,
            totalGwh: true,
        },
        orderBy: { year: 'asc' },
    });

    return records.map((r) => {
        const total = r._sum.totalGwh ?? 0;
        const renewable =
            (r._sum.solarGwh ?? 0) +
            (r._sum.windGwh ?? 0) +
            (r._sum.hydroGwh ?? 0) +
            (r._sum.nuclearGwh ?? 0);

        return {
            year: r.year,
            renewablePercent:
                total > 0
                    ? parseFloat(((renewable / total) * total).toFixed(1))
                    : 0,
            solarTWh: parseFloat(((r._sum.solarGwh ?? 0) / 1000).toFixed(1)),
            windTWh: parseFloat(((r._sum.windGwh ?? 0) / 1000).toFixed(1)),
            hydroTWh: parseFloat(((r._sum.hydroGwh ?? 0) / 1000).toFixed(1)),
        };
    });
}
