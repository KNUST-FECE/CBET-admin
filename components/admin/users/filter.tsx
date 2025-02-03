"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { MEMBERS_ROLE, MEMBERS_SORT_KEYS, MEMBERS_STATUS, USERS_DEPARTMENT, USERS_LEVEL, USERS_SORT_KEYS } from "@/lib/constants";
import { ZResourceFilter, ZUserFilter } from "@/lib/schema";
import { IUserFilter } from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZUserFilter);
    const form = useForm<IUserFilter>({
        resolver: zodResolver(ZUserFilter),
        defaultValues: {
            ...filter
        }
    });

    const { handleSubmit } = form;

    const onSubmit = (data: IUserFilter) => {

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
                        <ChipsField fieldKey="department" fieldOptions={USERS_DEPARTMENT} />
                        <ChipsField fieldKey="level" fieldOptions={USERS_LEVEL} />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="modified at" />
                        <SortField fieldKeys={USERS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}