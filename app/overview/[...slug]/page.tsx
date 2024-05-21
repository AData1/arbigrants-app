import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { StatCard } from "@/components/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeSelect } from "@/components/time-select";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
// import { SignInPopup } from "@/components/sign-in-popup";
import { getOverviewData } from "@/app/actions/getOverviewData";
import MSABarChart from "@/components/marketshare-chart-actions";
import { MultiLineChart } from "@/components/multi-line-chart";
import { ChevronUp, ChevronsUp, ChevronDown, ChevronsDown } from 'lucide-react';
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, RedirectToSignIn, SignIn } from '@clerk/nextjs'

export const metadata: Metadata = {
    title: "Arbigrants",
    description: "Arbitrum grants data",
};

export const maxDuration = 60;

export default async function OverviewPage({ params }: { params: { slug: string } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "week"
    };

    let titleparam: string = "Weekly";
    if (timeframe === 'week') {
        titleparam = 'Weekly';
    } else if (timeframe === 'day') {
        titleparam = 'Daily';
    } else if (timeframe === 'month') {
        titleparam = 'Monthly';
    }

    let titletime = timeframe.toUpperCase();

    const data = await getOverviewData({ timeframe });

    // interface GrowthIconProps {
    //     growthValue: number;
    // }

    // function GrowthIcon({ growthValue }: GrowthIconProps) {
    //     if (growthValue > 50) {
    //         return <ChevronsUp className="pl-1" />;
    //     } else if (growthValue > 0) {
    //         return <ChevronUp className="pl-1" />;
    //     } else if (growthValue < 0) {
    //         return <ChevronDown className="pl-1" />;
    //     } else {
    //         return <ChevronsDown className="pl-1" />;
    //     }
    // }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 pt-6">
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                    <SignedIn>
                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                            {/* First and Fourth cards (24h stats)*/}
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S ACTIVE WALLETS"}
                                className="border-blue-900 shadow md:order-1"
                                content={data.wallets_stat[0].ACTIVE_WALLETS.toLocaleString()}
                            />
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM WALLETS"}
                                className="border-blue-900 shadow md:order-4"
                                content={data.wallets_pct_stat[0].PCT_WALLETS < 0.0001 ? '<0.01%' : `${(data.wallets_pct_stat[0].PCT_WALLETS * 100).toFixed(2)}%`}
                            />

                            {/* Second and Fifth cards (7d stats) - order adjusted for md screens */}
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S TRANSACTIONS"}
                                className="border-blue-900 shadow md:order-2"
                                content={data.txns_stat[0].TRANSACTIONS.toLocaleString()}
                            />
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM TRANSACTIONS"}
                                className="border-blue-900 shadow md:order-5"
                                content={data.txns_pct_stat[0].PCT_TRANSACTIONS < 0.0001 ? '<0.01%' : `${(data.txns_pct_stat[0].PCT_TRANSACTIONS * 100).toFixed(2)}%`}
                            />

                            {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S GAS SPEND"}
                                className="border-blue-900 shadow md:order-3"
                                content={`${data.gas_stat[0].GAS_SPEND.toLocaleString()} ETH`}
                            />
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM GAS SPEND"}
                                className="border-blue-900 shadow md:order-6"
                                content={data.gas_pct_stat[0].PCT_GAS_SPEND < 0.0001 ? '<0.01%' : `${(data.gas_pct_stat[0].PCT_GAS_SPEND * 100).toFixed(2)}%`}
                            />
                        </div>
                        {/* <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A TRANSACTION</p> */}
                        <Separator />
                        <TimeSelect />
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-blue-900 shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Gas Spend (ETH)"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <MultiLineChart data={data.gas_spend_chart} xaxis={"DATE"} yaxis={"GAS_SPEND"} segment={"CATEGORY"} usd={false} />
                                </CardContent>
                            </Card>
                            <Card className="border-blue-900 shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <MultiLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
                                </CardContent>
                            </Card>
                        </div>
                        <div >
                            <Card className="border-blue-900 shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{"Past " + timeframe + " Grantee Summary"}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DataTable data={data.leaderboard} columns={columns} link_names={true} />
                                </CardContent>
                            </Card>
                        </div>
                    </SignedIn>
                </div>
            </div>
        </>
    );
};