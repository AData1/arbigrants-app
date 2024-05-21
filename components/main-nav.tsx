"use client"

import Link from "next/link";
import { usePathname } from "next/navigation"
import { SignedIn, UserButton } from '@clerk/nextjs'
import { Button } from "@/components/ui/button";


export function MainNav() {
    const pathname = usePathname();
    const segments = pathname.split("/")[1];

    return (
        <nav className="flex w-full items-center justify-between space-x-4 text-lg lg:space-x-6" >
            <Link href="/" className="flex items-center">
                <img src="/arb-logo.png" alt="Arbitrum Logo" className="mr-2 h-6 w-6" />
                <h1 className="font-bold md:text-lg">Arbigrants</h1>
            </Link>
            {/* <SignedOut>
                <SignInButton>
                    <Button>Sign in</Button>
                </SignInButton>
            </SignedOut> */}
            <SignedIn>
                <UserButton />
            </SignedIn>
        </nav>
    );
}
