import { getGlobalTrends } from '@/lib/db/queries';
import { GlobalTrendChartClient } from './GlobalTrendChartClient';

export async function GlobalTrendChart() {
    const data = await getGlobalTrends();
    console.log(data);

    return <GlobalTrendChartClient data={data} />;
}
