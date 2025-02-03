"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { PRODUCTS_APPROVAL, PRODUCTS_CATEGORY, PRODUCTS_SORT_KEY, PRODUCTS_STATUS } from "@/lib/constants";
import { ZProductFilter } from "@/lib/schema";
import { IProductFilter } from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZProductFilter);
    const form = useForm<IProductFilter>({
        resolver: zodResolver(ZProductFilter),
        defaultValues: {
            ...filter
        }
    });

    const { handleSubmit } = form;

    const onSubmit = (data: IProductFilter) => {

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
                        <ChipsField fieldKey="category" fieldOptions={PRODUCTS_CATEGORY} />
                        <ChipsField fieldKey="status" fieldOptions={PRODUCTS_STATUS} />
                        <ChipsField fieldKey="approval" fieldOptions={PRODUCTS_APPROVAL} />
                        <DigitRangeField fieldKey="price" />
                        <DigitRangeField fieldKey="stock" />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="modified at" />
                        <SortField fieldKeys={PRODUCTS_SORT_KEY} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}