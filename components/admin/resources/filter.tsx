"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { RESOURCES_SORT_KEYS, RESOURCES_STATUS, RESOURCES_TYPE, RESOURECS_FILE_TYPE } from "@/lib/constants";
import { _resources } from "@/lib/routes";
import { ZResourceFilter } from "@/lib/schema";
import { IResourceFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const form = useForm<IResourceFilter>({
        resolver: zodResolver(ZResourceFilter),
        defaultValues: filter
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IResourceFilter) => {
        console.log(data);
        const filterString = getFilterString(data);
        router.push(`${_resources}?${filterString}`);
    }

    useEffect(() => {
        reset(filter);
    }, [searchParams.toString()]); 

    return (
        <section id="filter-section">
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="filter-buttons">
                        <SearchField fieldKey="search" />
                        <ChipsField fieldKey="type" fieldOptions={RESOURCES_TYPE} />
                        <ChipsField fieldKey="file type" fieldOptions={RESOURECS_FILE_TYPE} />
                        <ChipsField fieldKey="status" fieldOptions={RESOURCES_STATUS} />
                        <DigitRangeField fieldKey="size" />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={RESOURCES_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}