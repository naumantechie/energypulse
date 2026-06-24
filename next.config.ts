import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    // prevent clickjacking attacks
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    // prevent mime type sniffing
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    // controls referrer information
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-orgin',
                    },
                    // force https
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    // controls browser features
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), gealocation=()',
                    },
                    // content security policy
                    {
                        key: 'Content-Security-Policy',
                        value: [
                            "default-src 'self'",
                            "script-src 'self' 'unsafe-eval' 'unsafe-inline' *.mapbox.com",
                            "style-src 'self' 'unsafe-inline' *.mapbox.com",
                            "img-src 'self' data: blob: *.mapbox.com",
                            "connect-src 'self' *.mapbox.com *.upstash.io api.electricitymap.org api.eia.gov",
                            'worker-src blob:',
                        ].join('; '),
                    },
                ],
            },
        ];
    },
};

export default nextConfig;
