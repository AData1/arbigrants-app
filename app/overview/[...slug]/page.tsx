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
import PieChartC from "@/components/pie-chart";
import { StatCard } from "@/components/stat-card";
import { Skeleton } from "@/components/ui/skeleton";
import { TimeSelect } from "@/components/time-select";
import { ScaleTabs } from "@/components/timescale-select";
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
    let [timeframe = 'week', timescale = '6'] = params.slug;

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
                            <FacetedFilter
                                title="Exclude"
                                options={data.name_list}
                            />
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
                        <ScaleTabs />
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{"TVL"}</CardTitle>
                                </CardHeader>
                                <CardContent >
                                    <Tabs defaultValue="both">
                                        <TabsList className="bg-[#DCECF9]">
                                            <TabsTrigger value="both" className="[&[data-state='active']]:bg-[#9DCCED]">Comparison</TabsTrigger>
                                            <TabsTrigger value="grantee" className="[&[data-state='active']]:bg-[#9DCCED]">Grantees Only</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="both" className="pt-3">
                                            <MultiLineChart data={data.tvl_chart} xaxis={"DATE"} yaxis={"TVL"} segment={"CATEGORY"} usd={true} />
                                        </TabsContent>
                                        <TabsContent value="grantee" className="pt-3">
                                            <MLChart data={data.tvl_chart} xaxis={"DATE"} yaxis={"TVL"} segment={"CATEGORY"} usd={true} />
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
                                            <TabsTrigger value="grantee" className="[&[data-state='active']]:bg-[#9DCCED]">Grantees Only</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="both" className="pt-3">
                                            <MultiLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
                                        </TabsContent>
                                        <TabsContent value="grantee" className="pt-3">
                                            <MLChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
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
                                    <CardTitle>{"Past " + timeframe + " Active Accounts by Project"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <PieChartC data={data.accounts_pie} yaxis={"PCT_WALLETS"} />
                                </CardContent>
                            </Card>
                        </div>
                        <div >
                            <Card className="border-black shadow-custom shadow bg-card-bg">
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