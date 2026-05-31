import { getGlobalTrends } from '@/lib/db/queries';
import { GlobalTrendChartClient } from './GlobalTrendChartClient';

export async function GlobalTrendChart() {
    const data = await getGlobalTrends();

    return <GlobalTrendChartClient data={data} />;
}
