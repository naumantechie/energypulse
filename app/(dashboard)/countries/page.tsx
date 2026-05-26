import { getAllCountries } from '@/lib/db/queries';
import { CountriesGrid } from '@/components/dashboard/CountriesGrid';

export const revalidate = 3600;

export default async function CountriesPage() {
    const countries = await getAllCountries();

    return <CountriesGrid countries={countries} />;
}
