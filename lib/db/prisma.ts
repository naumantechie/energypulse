// creating one Prisma instance and reusing it across the app to
// prevent too many connections to the database in development mode.

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log:
            process.env.NODE_ENV === 'development'
                ? ['query', 'error', 'warn']
                : ['error'],
    });

if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}
