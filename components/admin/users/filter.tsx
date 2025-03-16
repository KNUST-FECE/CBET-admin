"use client";

import SelectPopup from "@/components/common/select-popup";
import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { USERS_DEPARTMENT, USERS_LEVEL, USERS_SORT_KEYS } from "@/lib/constants";
import { _users } from "@/lib/routes";
import { ZUserFilter } from "@/lib/schema";
import { IDataAction, IUserFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter(props:IDataAction) {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZUserFilter);
    const defaultValues = {
        search: undefined,
        limit: undefined,
        page: undefined,
        department: [],
        level: [],
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            studentNo: undefined,
            indexNo: undefined,
            department: undefined,
            level: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IUserFilter>({
        resolver: zodResolver(ZUserFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IUserFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_users}?${filterString}`);
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
                        <ChipsField fieldKey="department" fieldOptions={USERS_DEPARTMENT} />
                        <ChipsField fieldKey="level" fieldOptions={USERS_LEVEL} />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={USERS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}