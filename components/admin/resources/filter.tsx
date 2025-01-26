"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { RESOURCES_SORT_KEYS, RESOURCES_STATUS, RESOURCES_TYPE, RESOURECS_FILE_TYPE } from "@/lib/constants";
import { ZResourceFilter } from "@/lib/schema";
import { IResourceFilter } from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
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
                    <SearchField control={null} />
                    <ChipsField control={null} fieldKey="type" fieldOptions={RESOURCES_TYPE} />
                    <ChipsField control={null} fieldKey="file type" fieldOptions={RESOURECS_FILE_TYPE} />
                    <ChipsField control={null} fieldKey="status" fieldOptions={RESOURCES_STATUS} />
                    <DigitRangeField control={null} fieldKey="size" />
                    <DateRangeField control={null} fieldKey="date created" />
                    <DateRangeField control={null} fieldKey="date modified" />
                    <SortField control={null} fieldKeys={RESOURCES_SORT_KEYS} />
                    <RunFilterButton />
                </div>
            </form>
        </section>
    )
}