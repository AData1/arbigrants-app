"use client";

import * as React from "react"
import { CheckIcon, PlusCircledIcon, Cross2Icon } from "@radix-ui/react-icons"
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface OptionType {
    NAME: string;
}

interface FacetedFilterProps {
    title?: string
    options: OptionType[]
}

export function FacetedFilter({
    title,
    options,
}: FacetedFilterProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [selectedValues, setSelectedValues] = React.useState<Set<string>>(new Set())

    React.useEffect(() => {
        const excludes = searchParams.getAll('excludes')
        setSelectedValues(new Set(excludes))
    }, [searchParams])

    const handleSelect = (value: string) => {
        const newSelectedValues = new Set(selectedValues)
        if (newSelectedValues.has(value)) {
            newSelectedValues.delete(value)
        } else {
            newSelectedValues.add(value)
        }
        setSelectedValues(newSelectedValues)
        updateURL(newSelectedValues)
    }

    const clearFilters = () => {
        setSelectedValues(new Set())
        router.push(pathname)
    }

    const updateURL = (values: Set<string>) => {
        const params = new URLSearchParams(searchParams)
        params.delete('excludes')
        values.forEach(value => params.append('excludes', value))
        router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`)
    }

    return (
        <div className="flex items-center space-x-2">
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 border-dashed">
                        <PlusCircledIcon className="mr-2 h-4 w-4" />
                        {title}
                        {selectedValues.size > 0 && (
                            <>
                                <Separator orientation="vertical" className="mx-2 h-4" />
                                <Badge
                                    variant="secondary"
                                    className="rounded-sm px-1 font-normal lg:hidden"
                                >
                                    {selectedValues.size}
                                </Badge>
                                <div className="hidden space-x-1 lg:flex">
                                    {selectedValues.size > 2 ? (
                                        <Badge
                                            variant="secondary"
                                            className="rounded-sm px-1 font-normal"
                                        >
                                            {selectedValues.size} selected
                                        </Badge>
                                    ) : (
                                        Array.from(selectedValues).map((value) => (
                                            <Badge
                                                variant="secondary"
                                                key={value}
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {value}
                                            </Badge>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0" align="start">
                    <Command>
                        <CommandInput placeholder={title} />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {options.map((option) => {
                                    const isSelected = selectedValues.has(option.NAME)
                                    return (
                                        <CommandItem
                                            key={option.NAME}
                                            onSelect={() => handleSelect(option.NAME)}
                                        >
                                            <div
                                                className={cn(
                                                    "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                                    isSelected
                                                        ? "bg-primary text-primary-foreground"
                                                        : "opacity-50 [&_svg]:invisible"
                                                )}
                                            >
                                                <CheckIcon className={cn("h-4 w-4")} />
                                            </div>
                                            <span>{option.NAME}</span>
                                        </CommandItem>
                                    )
                                })}
                            </CommandGroup>
                            {selectedValues.size > 0 && (
                                <>
                                    <CommandSeparator />
                                    <CommandGroup>
                                        <CommandItem
                                            onSelect={clearFilters}
                                            className="justify-center text-center"
                                        >
                                            Clear filters
                                        </CommandItem>
                                    </CommandGroup>
                                </>
                            )}
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            {selectedValues.size > 0 && (
                <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="h-8 px-2 lg:px-3"
                >
                    Reset
                    <Cross2Icon className="ml-2 h-4 w-4" />
                </Button>
            )}
        </div>
    )
}