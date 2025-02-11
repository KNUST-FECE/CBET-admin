"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { BLOGS_CATEGORY, BLOGS_SORT_KEYS, BLOGS_STATUS } from "@/lib/constants";
import { _blogs } from "@/lib/routes";
import { ZBlogFilter } from "@/lib/schema";
import { IBlogFilter} from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZBlogFilter);
    const defaultValues = {
        search: undefined,
        limit: undefined,
        page: undefined,
        category: [],
        status: [],
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            category: undefined,
            likes: undefined,
            status: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IBlogFilter>({
        resolver: zodResolver(ZBlogFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IBlogFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_blogs}?${filterString}`);
    }

    useEffect(() => {
        reset(defaultValues);
    }, [searchParams.toString()]);

    return (
        <section id="filter-section">
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
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