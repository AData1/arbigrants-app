"use client"

import { Cross2Icon } from "@radix-ui/react-icons"
import { Table } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"

import { categories } from "@/components/categories"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter projects..."
                    value={(table.getColumn("PROJECT")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("PROJECT")?.setFilterValue(event.target.value)
                    }
                    className="border-black h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("CATEGORY") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("CATEGORY")}
                        title="Category"
                        options={categories}
                    />
                )}
                {isFiltered && (
                    <Button
                        variant="ghost"
                        onClick={() => table.resetColumnFilters()}
                        className="h-8 px-2 lg:px-3"
                    >
                        Reset
                        <Cross2Icon className="ml-2 h-4 w-4" />
                    </Button>
                )}
                <DataTableViewOptions table={table} />

            </div>

        </div>
    )
}