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
    ];

    for (const country of countries) {
        await prisma.country.upsert({
            where: { code: country.code },
            update: {},
            create: country,
        });
    }
}

console.log('✅ Seeding complete!');

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
