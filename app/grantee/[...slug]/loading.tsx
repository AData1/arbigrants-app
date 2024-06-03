import { Skeleton } from "@/components/ui/skeleton"
import { Separator } from "@/components/ui/separator";
import { TimeSelect } from "@/components/time-select";


export default function Loading() {
    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 px-4 md:px-6 py-10 ">
                    <Skeleton className="h-[100px]" />
                    <TimeSelect />
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[400px]" />
                        <Skeleton className="h-[400px]" />
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Skeleton className="h-[400px]" />
                        <Skeleton className="h-[400px]" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:hidden">
                <div className="flex-1 space-y-4 px-4 md:px-6 py-10 ">
                    <Skeleton className="h-[100px]" />
                    <TimeSelect />
                </div>
            </div>
        </>

    );
}