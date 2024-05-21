import type { Metadata } from 'next'
import './globals.css'
import { SiteHeader } from "@/components/site-header";
import { Analytics } from '@vercel/analytics/react';
import { SiteFooter } from "@/components/site-footer";
import { Separator } from "@/components/ui/separator";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Arbigrants',
  description: "Tracking the impact of Arbitrum grants",
  keywords: [
    "Arbitrum",
    "grants",
    "Arbitrum foundation",
    "Arbitrum grants",
  ],
  authors: [
    {
      name: "0xKofi",
      url: "https://0xkofi.com",
    },
  ],
  creator: "0xKofi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.arbigrants.com",
    title: "Arbigrants",
    description: "Arbitrum Foundation Grants Data",
    siteName: "Arbigrants",
    images: [
      {
        url: "https://i.imgur.com/kxUawXn.png",
        width: 1200,
        height: 630,
        alt: "Arbigrants",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbigrants",
    description: "Arbitrum Foundation Grants Data",
    images: ["https://i.imgur.com/kxUawXn.png"],
    creator: "@0xKofi",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <div className="relative flex min-h-screen flex-col px-4 2xl:padding-xl">
            <SiteHeader />
            <Separator />
            <div className="flex-1">{children}</div>
            <Separator className="mt-6" />
            <SiteFooter />
          </div>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  )
}
