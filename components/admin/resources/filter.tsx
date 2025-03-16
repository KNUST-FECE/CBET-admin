"use client";

import SelectPopup from "@/components/common/select-popup";
import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { RESOURCES_SORT_KEYS, RESOURCES_STATUS, RESOURCES_TYPE, RESOURECS_FILE_TYPE } from "@/lib/constants";
import { _resources } from "@/lib/routes";
import { ZResourceFilter } from "@/lib/schema";
import { IDataAction, IResourceFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter(props:IDataAction) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const defaultValues = {
        folder: undefined,
        search: undefined,
        limit: undefined,
        page: undefined,
        type: [],
        fileType: [],
        status: [],
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            fileType: undefined,
            status: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IResourceFilter>({
        resolver: zodResolver(ZResourceFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IResourceFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_resources}?${filterString}`);
    }

    useEffect(() => {
        reset(defaultValues);
    }, [searchParams.toString()]); 

    return (
        <section id="filter-section">
            <SelectPopup {...props} />
            <FormProvider {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="filter-buttons">
                        <SearchField fieldKey="search" />
                        <ChipsField fieldKey="type" fieldOptions={RESOURCES_TYPE} />
                        <ChipsField fieldKey="file type" fieldOptions={RESOURECS_FILE_TYPE} />
                        <ChipsField fieldKey="status" fieldOptions={RESOURCES_STATUS} />
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