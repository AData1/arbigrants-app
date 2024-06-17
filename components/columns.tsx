"use client"

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "@/components/ui/date-table-column-header"
import { categories } from "@/components/categories"
import { App } from "@/components/schema"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import numeral from 'numeral';
import Image from "next/image";

export const columns: ColumnDef<App>[] = [
    {
        accessorKey: "LOGO",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title=" " />
        ),
        cell: ({ row }) => {
            return (
                <Image
                    alt="Logo"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={row.getValue("LOGO")}
                    width="64"
                />
            )
        },
        // cell: ({ row }) => <div className="w-[80px]">{row.getValue("LOGO")}</div>,
        // rewrite this so its Image instead of div where source is RowSelection.getvalue logo
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "PROJECT",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Grantee" />
        ),
        cell: ({ row }) => <div className="max-w-[500px] truncate font-medium">{row.getValue("PROJECT")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ETH_FEES",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gas Fees (ETH)" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(4)}
                </div>
            )
        },
    },
    {
        accessorKey: "ETH_FEES_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gas Fees Δ" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES_GROWTH"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "TRANSACTIONS",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transactions" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount}
                </div>
            )
        },
    },
    {
        accessorKey: "TRANSACTIONS_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transactions Δ" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS_GROWTH"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "WALLETS",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Wallets" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount}
                </div>
            )
        },
    },
    {
        accessorKey: "WALLETS_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Wallets Δ" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS_GROWTH"));
            // const displayValue = amount === 0 ? '-' : amount.toFixed(2);
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "TVL",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TVL" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TVL"));
            const displayValue = amount === 0 ? '-' : Math.round(amount).toLocaleString();
            return (
                <div className="max-w-[500px] truncate font-medium">
                    ${displayValue}
                </div>
            )
        },
    },
    {
        accessorKey: "CATEGORY",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const status = categories.find(
                (status) => status.value === row.getValue("CATEGORY")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "CHAIN",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="CHAIN" />
        ),
        cell: ({ row }) => {
            return row.getValue("CHAIN");
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
]