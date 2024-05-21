import { unstable_noStore as noStore } from "next/cache";

interface OverviewDataParams {
    timeframe: string;
}

interface OverviewData {
    time: string,
    wallets_stat: { ACTIVE_WALLETS: number }[],
    wallets_pct_stat: { PCT_WALLETS: number }[],
    txns_stat: { TRANSACTIONS: number }[],
    txns_pct_stat: { PCT_TRANSACTIONS: number }[],
    gas_stat: { GAS_SPEND: number }[],
    gas_pct_stat: { PCT_GAS_SPEND: number }[],
    gas_spend_chart: any[],
    accounts_chart: any[],
    leaderboard: any[],
}

export async function getOverviewData({ timeframe }: OverviewDataParams): Promise<OverviewData> {
    noStore();
    const response = await fetch(`https://arbigrants-api.onrender.com/overview?timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const overviewData: OverviewData = await response.json();

    return overviewData;
}