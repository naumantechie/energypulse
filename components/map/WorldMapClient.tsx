'use client';

import { Country } from '@/types';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Card } from '@/components/ui/card';

interface Props {
    countries: Country[];
    renewableByCode: Record<string, number>;
}

export function WorldMapClient({ countries, renewableByCode }: Props) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    useEffect(() => {
        if (!mapContainer.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [0, 20],
            zoom: 1.5,
            projection: 'naturalEarth' as any,
        });

        map.current.on('load', () => {
            if (!map.current) return;

            // countries fill layer
            map.current.addLayer({
                id: 'country-fills',
                type: 'fill',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                paint: {
                    'fill-color': [
                        'case',
                        ...countries.flatMap((c) => {
                            const renewable = renewableByCode[c.code] ?? 0;
                            const green = Math.floor((renewable / 100) * 255);
                            return [
                                ['==', ['get', 'iso_3166_1_alpha_2'], c.code],
                                `rgb(0, ${green}, 80)`,
                            ];
                        }),
                        '#1a1a2e',
                    ],
                    'fill-opacity': [
                        'case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.9,
                        0.7,
                    ],
                },
            });

            // countries border layer
            map.current.addLayer({
                id: 'country-borders',
                type: 'line',
                source: {
                    type: 'vector',
                    url: 'mapbox://mapbox.country-boundaries-v1',
                },
                'source-layer': 'country_boundaries',
                paint: {
                    'line-color': '#333344',
                    'line-width': 0.5,
                },
            });
        });

        return () => map.current?.remove();
    }, []);

    return (
        <div className="space-y-4">
            <Card className="p-4">
                <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">
                        Renewable %
                    </span>
                    <div className="flex items-center gap-1">
                        <div
                            className="w-24 h-3 rounded-full"
                            style={{
                                background:
                                    'linear-gradient(to right,rgb(0, 0, 80), rgb(0, 255, 80))',
                            }}
                        />
                        <div className="flex justify-between w-24 text-xs text-muted-foreground">
                            <span>0%</span>
                            <span>100%</span>
                        </div>
                    </div>
                    <span className="text-xs text-muted-foreground">
                        Grey = no data
                    </span>
                </div>
            </Card>

            <div
                ref={mapContainer}
                className="w-full rounded-lg overflow-hidden border border-border"
                style={{ height: '600px' }}
            />
        </div>
    );
}
