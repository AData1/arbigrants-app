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
import { MLChart } from "@/components/line-chart2";
import LChart from "@/components/line-chart";
import PieChartC from "@/components/pie-chart";
import { StatCard } from "@/components/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeSelect } from "@/components/time-select";
import { ScaleTabs } from "@/components/timescale-select";
import { CurrencyTabs } from "@/components/currency-select";
import { FacetedFilter } from "@/components/excludes-filter";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
// import { SignInPopup } from "@/components/sign-in-popup";
import { getOverviewData } from "@/app/actions/getOverviewData";
import MSABarChart from "@/components/marketshare-chart-actions";
import { MultiLineChart } from "@/components/multi-line-chart";
import { ChevronUp, ChevronsUp, ChevronDown, ChevronsDown } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, RedirectToSignIn, SignIn } from '@clerk/nextjs';
import { headers } from 'next/headers';

export const metadata: Metadata = {
    title: "Arbigrants",
    description: "Arbitrum grants data",
};

export const maxDuration = 60;

export default async function OverviewPage({ params, searchParams }: {
    params: { slug: string[] },
    searchParams: { [key: string]: string | string[] | undefined }
}) {
    let [timeframe = 'week', timescale = '6', currency = 'USD'] = params.slug;

    let titleparam: string = "Weekly";
    if (timeframe === 'week') {
        titleparam = 'Weekly';
    } else if (timeframe === 'day') {
        titleparam = 'Daily';
    } else if (timeframe === 'month') {
        titleparam = 'Monthly';
    }

    let titletime = timeframe.toUpperCase();

    const excludes = searchParams.excludes
        ? Array.isArray(searchParams.excludes)
            ? searchParams.excludes
            : [searchParams.excludes]
        : [];

    const data = await getOverviewData({ timeframe, timescale, excludes });

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 pt-6">
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                    <SignedIn>
                        <div className="flex flex-row space-x-6">
                            <TimeSelect />

                        </div>

                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                            <StatCard
                                title={"GRANTEE'S TVL"}
                                className="border-black bg-card-bg shadow md:order-1"
                                content={`$${data.tvl_stat[0].TVL_GRANTEES.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
                            />
                            <StatCard
                                title={"GRANTEE'S % OF ARBITRUM TVL"}
                                className="border-black bg-card-bg shadow md:order-4"
                                content={data.tvl_pct_stat[0].PCT_TVL < 0.0001 ? '<0.01%' : `${(data.tvl_pct_stat[0].PCT_TVL * 100).toFixed(2)}%`}
                            />

                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S ACTIVE WALLETS"}
                                className="border-black bg-card-bg shadow md:order-2"
                                content={data.wallets_stat[0].ACTIVE_WALLETS.toLocaleString()}
                            />
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM WALLETS"}
                                className="border-black bg-card-bg shadow md:order-5"
                                content={data.wallets_pct_stat[0].PCT_WALLETS < 0.0001 ? '<0.01%' : `${(data.wallets_pct_stat[0].PCT_WALLETS * 100).toFixed(2)}%`}
                            />

                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S GAS SPEND"}
                                className="border-black bg-card-bg shadow md:order-3"
                                content={`${Number(data.gas_stat[0].GAS_SPEND).toFixed(3)} ETH`}
                            />
                            <StatCard
                                title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM GAS SPEND"}
                                className="border-black bg-card-bg shadow md:order-6"
                                content={data.gas_pct_stat[0].PCT_GAS_SPEND < 0.0001 ? '<0.01%' : `${(data.gas_pct_stat[0].PCT_GAS_SPEND * 100).toFixed(2)}%`}
                            />
                        </div>
                        {/* <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A TRANSACTION</p> */}
                        {/* <Separator /> */}
                        <div className="flex flex-row space-x-6">
                            <ScaleTabs />
                            <CurrencyTabs />
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{currency === 'USD' ? "TVL (USD)" : "TVL (ETH)"}</CardTitle>
                                </CardHeader>
                                <CardContent >
                                    <Tabs defaultValue="both">
                                        <TabsList className="bg-[#DCECF9]">
                                            <TabsTrigger value="both" className="[&[data-state='active']]:bg-[#9DCCED]">Comparison</TabsTrigger>
                                            <TabsTrigger value="grantee" className="[&[data-state='active']]:bg-[#9DCCED]">Full-History</TabsTrigger>
                                            <TabsTrigger value="postgrant" className="[&[data-state='active']]:bg-[#9DCCED]">Post-Grant</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="both" className="pt-3">
                                            <MultiLineChart
                                                data={currency === 'USD' ? data.tvl_chart : data.tvl_chart_eth}
                                                xaxis={"DATE"}
                                                yaxis={currency === 'USD' ? 'TVL' : 'TVL_ETH'}
                                                segment={"CATEGORY"}
                                                usd={currency === 'USD'}
                                            />
                                        </TabsContent>
                                        <TabsContent value="grantee" className="pt-3">
                                            <MLChart
                                                data={currency === 'USD' ? data.tvl_chart : data.tvl_chart_eth}
                                                xaxis={"DATE"}
                                                yaxis={currency === 'USD' ? 'TVL' : 'TVL_ETH'}
                                                segment={"CATEGORY"}
                                                usd={currency === 'USD'}
                                            />
                                        </TabsContent>
                                        <TabsContent value="postgrant" className="pt-3">
                                            <LChart
                                                data={currency === 'USD' ? data.tvl_chart_post_grant : data.tvl_chart_eth_post_grant}
                                                yaxis={currency === 'USD' ? 'TVL' : 'TVL_ETH'}
                                                usd={currency === 'USD'}
                                                fill="#000000" />
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
                                </CardHeader>
                                <CardContent >
                                    <Tabs defaultValue="both">
                                        <TabsList className="bg-[#DCECF9]">
                                            <TabsTrigger value="both" className="[&[data-state='active']]:bg-[#9DCCED]">Comparison</TabsTrigger>
                                            <TabsTrigger value="grantee" className="[&[data-state='active']]:bg-[#9DCCED]">Full-History</TabsTrigger>
                                            <TabsTrigger value="postgrant" className="[&[data-state='active']]:bg-[#9DCCED]">Post-Grant</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="both" className="pt-3">
                                            <MultiLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
                                        </TabsContent>
                                        <TabsContent value="grantee" className="pt-3">
                                            <MLChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
                                        </TabsContent>
                                        <TabsContent value="postgrant" className="pt-3">
                                            <LChart data={data.accounts_chart_post_grant} yaxis={"ACTIVE_WALLETS"} usd={false} fill="#000000" />
                                        </TabsContent>
                                    </Tabs>

                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{"TVL by Project"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <PieChartC data={data.tvl_pie} yaxis={"PCT_TVL"} />
                                </CardContent>
                            </Card>
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{"Past " + titletime + " Active Accounts by Project"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <PieChartC data={data.accounts_pie} yaxis={"PCT_WALLETS"} />
                                </CardContent>
                            </Card>
                        </div>
                        <FacetedFilter
                            title="Exclude"
                            options={data.name_list}
                        />
                        <div >
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{"Past " + titletime + " Grantee Summary"}</CardTitle>
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