"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { BLOGS_CATEGORY, BLOGS_SORT_KEYS, BLOGS_STATUS } from "@/lib/constants";
import { ZBlogFilter } from "@/lib/schema";
import { IBlogFilter} from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZBlogFilter);
    const form = useForm<IBlogFilter>({
        resolver: zodResolver(ZBlogFilter),
        defaultValues: {
            ...filter
        }
    });

    const { handleSubmit } = form;

    const onSubmit = (data: IBlogFilter) => {

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
                        <ChipsField fieldKey="category" fieldOptions={BLOGS_CATEGORY} />
                        <ChipsField fieldKey="status" fieldOptions={BLOGS_STATUS} />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="modified at" />
                        <SortField fieldKeys={BLOGS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}