"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { REPORTS_CATEGORY, REPORTS_SORT_KEYS, REPORTS_STATUS, REPORTS_TYPE } from "@/lib/constants";
import { _reports } from "@/lib/routes";
import { ZReportFilter } from "@/lib/schema";
import { IReportFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZReportFilter);
    const defaultValues = {
        search: undefined,
        limit: undefined,
        page: undefined,
        category: [],
        type: [],
        status: [],
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            user: true,
            summary: undefined,
            category: undefined,
            type: undefined,
            status: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IReportFilter>({
        resolver: zodResolver(ZReportFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IReportFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_reports}?${filterString}`);
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
                        <ChipsField fieldKey="category" fieldOptions={REPORTS_CATEGORY} />
                        <ChipsField fieldKey="type" fieldOptions={REPORTS_TYPE} />
                        <ChipsField fieldKey="status" fieldOptions={REPORTS_STATUS} />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={REPORTS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}