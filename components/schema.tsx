import { z } from "zod";

export const appSchema = z.object({
    LOGO: z.string(),
    PROJECT: z.string(),
    ETH_FEES: z.string(),
    ETH_FEES_GROWTH: z.string(),
    TRANSACTIONS: z.number(),
    TRANSACTIONS_GROWTH: z.string(),
    WALLETS: z.number(),
    WALLETS_GROWTH: z.string(),
    CATEGORY: z.string(),
    CHAIN: z.string(),
})

export type App = z.infer<typeof appSchema>