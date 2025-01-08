"use client";

import { IResourceFilter } from "@/lib/types";
import { Search, Filter as FilterIcon, ArrowUpDown, RefreshCw } from "lucide-react";

export default function Filter({ filter }: { filter: IResourceFilter }) {
    return (
        <section id="filter-section">
            <form>
                <div id="filter-chips">
                    <p id="no-filters">No filters here ...</p>
                </div>
                <div id="filter-buttons">
                    <button id="search">
                        <Search />
                        <span>search</span>
                    </button>
                    <button id="object-filter">
                        <FilterIcon />
                        <span>filter</span>
                    </button>
                    <button id="object-sort">
                        <ArrowUpDown />
                        <span>sort</span>
                    </button>
                    <button id="filter-run">
                        <RefreshCw />
                        <span>run</span>
                    </button>
                </div>
            </form>
        </section>
    )
}