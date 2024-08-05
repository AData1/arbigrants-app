import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator";
import { TimeSelect } from "@/components/time-select";
import { ScaleTabs } from "@/components/timescale-select";
import { CurrencyTabs } from "@/components/currency-select";

export default function Loading() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 pt-6">
                    <div className="grid gap-4 grid-cols-3">
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                    </div>
                    <TimeSelect />
                    <div className="grid gap-4 grid-cols-3">
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                    </div>

                    <div className="flex flex-row space-x-6">
                        <ScaleTabs />
                        <CurrencyTabs />
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[400px]" />
                        <Skeleton className="h-[400px]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:hidden">
                <div className="flex-1 space-y-4 pt-6">
                    <div className="grid gap-4 grid-cols-3">
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                        <Skeleton className="h-[109px]" />
                    </div>
                    <TimeSelect />
                    <div className="grid gap-4 grid-cols-2">
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                        <Skeleton className="h-[129px]" />
                    </div>
                    <div className="flex flex-row space-x-6">
                        <ScaleTabs />
                        <CurrencyTabs />
                    </div>

                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[400px]" />
                        <Skeleton className="h-[400px]" />
                    </div>
                </div>
            </div>
        </>

    );
}