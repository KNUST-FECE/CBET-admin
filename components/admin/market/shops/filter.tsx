"use client";

import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { SHOPS_SORT_KEYS } from "@/lib/constants";
import { ZShopFilter } from "@/lib/schema";
import { IShopFilter } from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZShopFilter);
    const form = useForm<IShopFilter>({
        resolver: zodResolver(ZShopFilter),
        defaultValues: {
            ...filter
        }
    });

    const { handleSubmit } = form;

    const onSubmit = (data: IShopFilter) => {

    }

    return (
        <section id="filter-section">
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="filter-chips">
                        <p id="no-filters">No filters here ...</p>
                    </div>
                    <div id="filter-buttons">
                        <SearchField fieldKey="search" />
                        <DigitRangeField fieldKey="product count" />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="modified at" />
                        <SortField fieldKeys={SHOPS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}