"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { MEMBERS_ROLE, MEMBERS_SORT_KEYS, MEMBERS_STATUS } from "@/lib/constants";
import { _members } from "@/lib/routes";
import { ZMemberFilter } from "@/lib/schema";
import { IMemberFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZMemberFilter);
    const defaultValues = {
        search: undefined,
        limit: undefined,
        page: undefined,
        role: [],
        status: [],
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            email: undefined,
            role: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IMemberFilter>({
        resolver: zodResolver(ZMemberFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IMemberFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_members}?${filterString}`);
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
                        <ChipsField fieldKey="role" fieldOptions={MEMBERS_ROLE} />
                        <ChipsField fieldKey="status" fieldOptions={MEMBERS_STATUS} />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={MEMBERS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}