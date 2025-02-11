"use client";

import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { SHOPS_SORT_KEYS } from "@/lib/constants";
import { _shops } from "@/lib/routes";
import { ZShopFilter } from "@/lib/schema";
import { IShopFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZShopFilter);
    const defaultValues = {
        search: undefined,
        limit: undefined,
        page: undefined,
        productCount: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            email: undefined,
            productCount: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IShopFilter>({
        resolver: zodResolver(ZShopFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IShopFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_shops}?${filterString}`);
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
                        <DigitRangeField fieldKey="product count" />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={SHOPS_SORT_KEYS} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}