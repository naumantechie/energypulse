import { z } from 'zod';

const envSchema = z.object({
    // Database
    DATABASE_URL: z.string().url('Invalid DATABASE_URL'),
    DIRECT_URL: z.string().url('Invalid DIRECT_URL'),

    // Mapbox
    // NEXT_PUBLIC_MAPBOX_TOKEN: z.string().min(1, 'Mapbox token is required'),

    // Upstash Redis
    UPSTASH_REDIS_REST_URL: z.string().url('Invalid Redis URL'),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1, 'Redis token is required'),

    // External APIs
    //ELECTRICITY_MAPS_API_KEY: z
    //    .string()
    //    .min(1, 'Electricity Maps API key is required'),
    // EIA_API_KEY: z.string().min(1, 'EIA API key is required'),

    // App
    NODE_ENV: z
        .enum(['development', 'production', 'test'])
        .default('development'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
    console.log('❌ Invalid environment variables:');
    console.log(parsed.error.flatten().fieldErrors);
    process.exit(1);
}

export const env = parsed.data;
