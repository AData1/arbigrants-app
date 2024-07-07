"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from 'next/navigation'

export function CurrencyTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("USD");

    const handleTabChange = (newValue: string) => {
        const segments = pathname.split("/");
        return router.push(`/${segments[1]}/${segments[2]}/6/${newValue}`);
    };

    useEffect(() => {
        const segments = pathname.split("/");
        setActiveTab(segments[4]);
    }, [pathname]);

    const segments = pathname.split("/");

    return (
        <Tabs defaultValue="USD" className="space-y-4 pt-6" onValueChange={handleTabChange} value={activeTab}>
            <TabsList>
                <TabsTrigger value="USD" className="[&[data-state='active']]:bg-[#9DCCED]">USD</TabsTrigger>
                <TabsTrigger value="ETH" className="[&[data-state='active']]:bg-[#9DCCED]">ETH</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}