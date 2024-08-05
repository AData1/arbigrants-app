"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from 'next/navigation'

export function ChainTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("all");

    const handleTabChange = (newValue: string) => {
        const segments = pathname.split("/");
        return router.push(`/${segments[1]}/${segments[2]}/${newValue}`);
    };

    useEffect(() => {
        const segments = pathname.split("/");
        setActiveTab(segments[3]);
    }, [pathname]);

    const segments = pathname.split("/");

    return (
        <Tabs defaultValue="all" className="space-y-4" onValueChange={handleTabChange} value={activeTab}>
            <TabsList>
                <TabsTrigger value="all" className="[&[data-state='active']]:bg-[#9DCCED]">ALL</TabsTrigger>
                <TabsTrigger value="one" className="[&[data-state='active']]:bg-[#9DCCED]">ARBITRUM ONE</TabsTrigger>
                <TabsTrigger value="nova" className="[&[data-state='active']]:bg-[#9DCCED]">ARBITRUM NOVA</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}