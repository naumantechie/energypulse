'use client';

import { Country, EnergyRecord } from '@/types';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface Props {
    country: Country;
    records: EnergyRecord[];
}

export function ExportButton({ country, records }: Props) {
    function handleExport() {
        // build CSV content
        const headers = [
            'Year',
            'Solar (GWh)',
            'Wind (GWh)',
            'Hydro (GWh)',
            'Nuclear (GWh)',
            'Fossil (Gwh)',
            'Total (Gwh)',
            'Renewable %',
            'Carbon Intensity (gCO2/kWh)',
        ];

        const rows = records.map((r) => [
            r.year,
            r.solarGwh,
            r.windGwh,
            r.hydroGwh,
            r.nuclearGwh,
            r.fossilGwh,
            r.totalGwh,
            r.renewablePercent.toFixed(2),
            r.carbonIntensity,
        ]);

        const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');

        // triger download
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${country.code}-energy-data.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={handleExport}
        >
            <Download className="h-4 w-4" />
            Export CSV
        </Button>
    );
}
