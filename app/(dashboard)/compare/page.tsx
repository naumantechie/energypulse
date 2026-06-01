import { CompareClient } from '@/components/dashboard/CompareClient';
import { getAllCountries } from '@/lib/db/queries';

export default async function ComparePage() {
    const countries = await getAllCountries();
    return <CompareClient countries={countries} />;
}
