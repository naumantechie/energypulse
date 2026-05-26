import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    const countries = [
        {
            code: 'DE',
            name: 'Germany',
            continent: 'Europe',
            population: 83200000,
        },
        {
            code: 'US',
            name: 'United States',
            continent: 'North America',
            population: 331000000,
        },
        {
            code: 'CN',
            name: 'China',
            continent: 'Asia',
            population: 1400000000,
        },
        {
            code: 'GB',
            name: 'United Kingdom',
            continent: 'Europe',
            population: 67000000,
        },
        {
            code: 'DK',
            name: 'Denmark',
            continent: 'Europe',
            population: 5800000,
        },
        {
            code: 'FR',
            name: 'France',
            continent: 'Europe',
            population: 68000000,
        },
        {
            code: 'AU',
            name: 'Australia',
            continent: 'Oceania',
            population: 215000000,
        },
        {
            code: 'BR',
            name: 'Brazil',
            continent: 'South America',
            population: 215000000,
        },
    ];

    for (const country of countries) {
        await prisma.country.upsert({
            where: { code: country.code },
            update: {},
            create: country,
        });
    }

    // Energy records per country
    const energyData = [
        {
            code: 'DE',
            records: [
                {
                    year: 2020,
                    solarGwh: 51400,
                    windGwh: 131800,
                    hydroGwh: 17000,
                    nuclearGwh: 60900,
                    fossilGwh: 220000,
                    carbonIntensity: 350,
                },
                {
                    year: 2021,
                    solarGwh: 55000,
                    windGwh: 113500,
                    hydroGwh: 17200,
                    nuclearGwh: 65900,
                    fossilGwh: 240000,
                    carbonIntensity: 368,
                },
                {
                    year: 2022,
                    solarGwh: 62200,
                    windGwh: 125900,
                    hydroGwh: 16200,
                    nuclearGwh: 34600,
                    fossilGwh: 230000,
                    carbonIntensity: 385,
                },
                {
                    year: 2023,
                    solarGwh: 72000,
                    windGwh: 139800,
                    hydroGwh: 15900,
                    nuclearGwh: 0,
                    fossilGwh: 200000,
                    carbonIntensity: 310,
                },
            ],
        },
        {
            code: 'US',
            records: [
                {
                    year: 2020,
                    solarGwh: 131900,
                    windGwh: 337500,
                    hydroGwh: 291000,
                    nuclearGwh: 790000,
                    fossilGwh: 2427000,
                    carbonIntensity: 410,
                },
                {
                    year: 2021,
                    solarGwh: 163000,
                    windGwh: 379700,
                    hydroGwh: 274000,
                    nuclearGwh: 778000,
                    fossilGwh: 2506000,
                    carbonIntensity: 420,
                },
                {
                    year: 2022,
                    solarGwh: 204000,
                    windGwh: 435000,
                    hydroGwh: 260000,
                    nuclearGwh: 771000,
                    fossilGwh: 2500000,
                    carbonIntensity: 415,
                },
                {
                    year: 2023,
                    solarGwh: 250000,
                    windGwh: 480000,
                    hydroGwh: 255000,
                    nuclearGwh: 775000,
                    fossilGwh: 2400000,
                    carbonIntensity: 390,
                },
            ],
        },
        {
            code: 'GB',
            records: [
                {
                    year: 2020,
                    solarGwh: 12900,
                    windGwh: 75100,
                    hydroGwh: 5800,
                    nuclearGwh: 50400,
                    fossilGwh: 95000,
                    carbonIntensity: 233,
                },
                {
                    year: 2021,
                    solarGwh: 13100,
                    windGwh: 63200,
                    hydroGwh: 5600,
                    nuclearGwh: 46800,
                    fossilGwh: 110000,
                    carbonIntensity: 252,
                },
                {
                    year: 2022,
                    solarGwh: 13800,
                    windGwh: 80500,
                    hydroGwh: 5900,
                    nuclearGwh: 40900,
                    fossilGwh: 100000,
                    carbonIntensity: 225,
                },
                {
                    year: 2023,
                    solarGwh: 14500,
                    windGwh: 95000,
                    hydroGwh: 6100,
                    nuclearGwh: 38000,
                    fossilGwh: 85000,
                    carbonIntensity: 198,
                },
            ],
        },
        {
            code: 'FR',
            records: [
                {
                    year: 2020,
                    solarGwh: 14700,
                    windGwh: 39700,
                    hydroGwh: 58400,
                    nuclearGwh: 335600,
                    fossilGwh: 35000,
                    carbonIntensity: 58,
                },
                {
                    year: 2021,
                    solarGwh: 16400,
                    windGwh: 36800,
                    hydroGwh: 60200,
                    nuclearGwh: 360000,
                    fossilGwh: 38000,
                    carbonIntensity: 62,
                },
                {
                    year: 2022,
                    solarGwh: 19900,
                    windGwh: 37900,
                    hydroGwh: 49700,
                    nuclearGwh: 279000,
                    fossilGwh: 42000,
                    carbonIntensity: 85,
                },
                {
                    year: 2023,
                    solarGwh: 22600,
                    windGwh: 50100,
                    hydroGwh: 55000,
                    nuclearGwh: 320000,
                    fossilGwh: 35000,
                    carbonIntensity: 55,
                },
            ],
        },
    ];

    for (const countryData of energyData) {
        const country = await prisma.country.findUnique({
            where: { code: countryData.code },
        });

        if (!country) continue;

        for (const record of countryData.records) {
            const total =
                record.solarGwh +
                record.windGwh +
                record.hydroGwh +
                record.nuclearGwh +
                record.fossilGwh;

            const renewablePercent =
                ((record.solarGwh +
                    record.windGwh +
                    record.hydroGwh +
                    record.nuclearGwh) /
                    total) *
                100;

            await prisma.energyRecord.upsert({
                where: {
                    countryId_year: {
                        countryId: country.id,
                        year: record.year,
                    },
                },
                update: {},
                create: {
                    countryId: country.id,
                    year: record.year,
                    solarGwh: record.solarGwh,
                    windGwh: record.windGwh,
                    HydroGwh: record.hydroGwh,
                    nuclearGwh: record.nuclearGwh,
                    fossilGwh: record.fossilGwh,
                    totalGwh: total,
                    renewablePercent,
                    carbonIntensity: record.carbonIntensity,
                },
            });
        }
    }
}

console.log('✅ Seeding complete!');

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
