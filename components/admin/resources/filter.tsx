"use client";

import FilterButton from "@/components/common/filter-button";
import DataFilter from "@/components/form/data-filter";
import DataSearch from "@/components/form/data-search";
import DataSort from "@/components/form/data-sort";
import RunFilter from "@/components/form/run-filter";
import { ZResourceFilter } from "@/lib/schema";
import { IResourceFilter } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Search, Filter as FilterIcon, ArrowUpDown, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";

export default function Filter({ filter }: { filter: IResourceFilter }) {
    const form = useForm<IResourceFilter>({
        resolver: zodResolver(ZResourceFilter),
        defaultValues: {
            ...filter
        }
    });

    return (
        <section id="filter-section">
            <form>
                <div id="filter-chips">
                    <p id="no-filters">No filters here ...</p>
                </div>
                <div id="filter-buttons">
                    <DataSearch />
                    <DataFilter />
                    <DataSort />
                    <FilterButton icon={RefreshCw} value="run" type="submit" />
                </div>
            </form>
        </section>
    )
}