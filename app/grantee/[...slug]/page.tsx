import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/data-table";
import { columns } from "@/components/columns";
import { getGranteeData } from "@/app/actions/getGranteeData";
import LChart from "@/components/line-chart";
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton, RedirectToSignIn, SignIn } from '@clerk/nextjs';
import Link from "next/link";
import Image from "next/image";
import {
    TwitterLogoIcon,
    Link2Icon
} from "@radix-ui/react-icons"

export const metadata: Metadata = {
    title: "Arbigrants",
    description: "Arbitrum grants data",
};

export const maxDuration = 60;

export default async function GranteePage({ params }: { params: { slug: string } }) {

    let timeframe = params.slug[0];
    let grantee_name = params.slug[1];
    const data = await getGranteeData({ timeframe, grantee_name });

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

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 ">
                    <SignedOut>
                        <RedirectToSignIn />
                    </SignedOut>
                    <SignedIn>
                        <section className="flex flex-row gap-8 px-4 md:px-6 py-10 ">
                            <div className="flex flex-col items-start gap-6">
                                <Image
                                    alt="Product Image"
                                    className="rounded-lg object-cover w-full aspect-square"
                                    height={100}
                                    src={data.info[0].LOGO}
                                    width={100}
                                />
                            </div>
                            <div className="flex flex-col items-start gap-4">
                                <div className="space-y-2">
                                    <h1 className="text-3xl font-bold tracking-tight">{data.info[0].NAME}</h1>
                                    <p className="text-gray-500 dark:text-gray-400">
                                        {data.info[0].DESCRIPTION}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Link className="inline-flex items-center gap-2 text-primary hover:underline" href={data.info[0].WEBSITE}>
                                        <Link2Icon className="h-5 w-5" />
                                        Website
                                    </Link>
                                    <Link className="inline-flex items-center gap-2 text-primary hover:underline" href={data.info[0].TWITTER}>
                                        <TwitterLogoIcon className="h-5 w-5" />
                                        Twitter
                                    </Link>
                                </div>
                            </div>
                        </section>
                        <TimeSelect />
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Gas Spend (ETH)"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <LChart data={data.gas_chart} yaxis={"GAS_SPEND"} usd={false} fill="#000000" />
                                </CardContent>
                            </Card>
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <LChart data={data.wallets_chart} yaxis={"ACTIVE_WALLETS"} usd={false} fill="#000000" />
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                            <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Transactions"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <LChart data={data.txns_chart} yaxis={"TRANSACTIONS"} usd={false} fill="#000000" />
                                </CardContent>
                            </Card>
                            {/* <Card className="border-black shadow-custom shadow bg-card-bg">
                                <CardHeader>
                                    <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-0">
                                    <LChart data={data.wallets_chart} yaxis={"ACTIVE_WALLETS"} usd={false} fill="#000000" />
                                </CardContent>
                            </Card> */}
                        </div>
                    </SignedIn>
                </div>
            </div>
        </>
    )
    // let timeframe = params.slug[0];
    // if (timeframe === undefined) {
    //     timeframe = "week"
    // };

    // let titleparam: string = "Weekly";
    // if (timeframe === 'week') {
    //     titleparam = 'Weekly';
    // } else if (timeframe === 'day') {
    //     titleparam = 'Daily';
    // } else if (timeframe === 'month') {
    //     titleparam = 'Monthly';
    // }

    // let titletime = timeframe.toUpperCase();

    // const data = await getOverviewData({ timeframe });

    // // interface GrowthIconProps {
    // //     growthValue: number;
    // // }

    // // function GrowthIcon({ growthValue }: GrowthIconProps) {
    // //     if (growthValue > 50) {
    // //         return <ChevronsUp className="pl-1" />;
    // //     } else if (growthValue > 0) {
    // //         return <ChevronUp className="pl-1" />;
    // //     } else if (growthValue < 0) {
    // //         return <ChevronDown className="pl-1" />;
    // //     } else {
    // //         return <ChevronsDown className="pl-1" />;
    // //     }
    // // }

    // return (
    //     <>
    //         <div className="flex flex-col">
    //             <div className="flex-1 space-y-4 pt-6">
    //                 <SignedOut>
    //                     <RedirectToSignIn />
    //                 </SignedOut>
    //                 <SignedIn>
    //                     <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
    //                         {/* First and Fourth cards (24h stats)*/}
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S ACTIVE WALLETS"}
    //                             className="border-black bg-card-bg shadow md:order-1"
    //                             content={data.wallets_stat[0].ACTIVE_WALLETS.toLocaleString()}
    //                         />
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM WALLETS"}
    //                             className="border-black bg-card-bg shadow md:order-4"
    //                             content={data.wallets_pct_stat[0].PCT_WALLETS < 0.0001 ? '<0.01%' : `${(data.wallets_pct_stat[0].PCT_WALLETS * 100).toFixed(2)}%`}
    //                         />

    //                         {/* Second and Fifth cards (7d stats) - order adjusted for md screens */}
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S TRANSACTIONS"}
    //                             className="border-black bg-card-bg shadow md:order-2"
    //                             content={data.txns_stat[0].TRANSACTIONS.toLocaleString()}
    //                         />
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM TRANSACTIONS"}
    //                             className="border-black bg-card-bg shadow md:order-5"
    //                             content={data.txns_pct_stat[0].PCT_TRANSACTIONS < 0.0001 ? '<0.01%' : `${(data.txns_pct_stat[0].PCT_TRANSACTIONS * 100).toFixed(2)}%`}
    //                         />

    //                         {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S GAS SPEND"}
    //                             className="border-black bg-card-bg shadow md:order-3"
    //                             content={`${data.gas_stat[0].GAS_SPEND.toLocaleString()} ETH`}
    //                         />
    //                         <StatCard
    //                             title={"PAST " + titletime + " GRANTEE'S % OF ARBITRUM GAS SPEND"}
    //                             className="border-black bg-card-bg shadow md:order-6"
    //                             content={data.gas_pct_stat[0].PCT_GAS_SPEND < 0.0001 ? '<0.01%' : `${(data.gas_pct_stat[0].PCT_GAS_SPEND * 100).toFixed(2)}%`}
    //                         />
    //                     </div>
    //                     {/* <p className="text-sm font-bold text-muted-foreground">*ACTIVE WALLET = MADE A TRANSACTION</p> */}
    //                     <Separator />
    //                     <TimeSelect />
    //                     <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
    //                         <Card className="border-black shadow-custom shadow bg-card-bg">
    //                             <CardHeader>
    //                                 <CardTitle>{titleparam + " Gas Spend (ETH)"}</CardTitle>
    //                             </CardHeader>
    //                             <CardContent className="pl-0">
    //                                 <MultiLineChart data={data.gas_spend_chart} xaxis={"DATE"} yaxis={"GAS_SPEND"} segment={"CATEGORY"} usd={false} />
    //                             </CardContent>
    //                         </Card>
    //                         <Card className="border-black shadow-custom shadow bg-card-bg">
    //                             <CardHeader>
    //                                 <CardTitle>{titleparam + " Active Accounts"}</CardTitle>
    //                             </CardHeader>
    //                             <CardContent className="pl-0">
    //                                 <MultiLineChart data={data.accounts_chart} xaxis={"DATE"} yaxis={"ACTIVE_WALLETS"} segment={"CATEGORY"} usd={false} />
    //                             </CardContent>
    //                         </Card>
    //                     </div>
    //                     <div >
    //                         <Card className="border-black shadow-custom shadow bg-card-bg">
    //                             <CardHeader>
    //                                 <CardTitle>{"Past " + timeframe + " Grantee Summary"}</CardTitle>
    //                             </CardHeader>
    //                             <CardContent>
    //                                 <DataTable data={data.leaderboard} columns={columns} link_names={true} />
    //                             </CardContent>
    //                         </Card>
    //                     </div>
    //                 </SignedIn>
    //             </div>
    //         </div>
    //     </>
    // );
};