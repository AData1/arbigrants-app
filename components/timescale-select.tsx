"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname } from 'next/navigation'

export function ScaleTabs() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState("6");

    const handleTabChange = (newValue: string) => {
        const segments = pathname.split("/");
        const thirdSegment = segments[3] || "all";
        return router.push(`/${segments[1]}/${segments[2]}/${thirdSegment}/${newValue}`);
    };

    useEffect(() => {
        const segments = pathname.split("/");
        setActiveTab(segments[4]);
    }, [pathname]);

    const segments = pathname.split("/");

    return (
        <Tabs defaultValue="6" className="space-y-4 pt-6" onValueChange={handleTabChange} value={activeTab}>
            <TabsList>
                <TabsTrigger value="3" className="[&[data-state='active']]:bg-[#9DCCED]">3 months</TabsTrigger>
                <TabsTrigger value="6" className="[&[data-state='active']]:bg-[#9DCCED]">6 months</TabsTrigger>
                <TabsTrigger value="12" className="[&[data-state='active']]:bg-[#9DCCED]">12 months</TabsTrigger>
            </TabsList>
        </Tabs>
    );
}