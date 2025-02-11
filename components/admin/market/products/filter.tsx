"use client";

import ChipsField from "@/components/form/chips-field";
import DateRangeField from "@/components/form/date-range-field";
import DigitRangeField from "@/components/form/digit-range-field";
import RunFilterButton from "@/components/form/run-filter-button";
import SearchField from "@/components/form/search-field";
import SortField from "@/components/form/sort-field";
import { PRODUCTS_APPROVAL, PRODUCTS_CATEGORY, PRODUCTS_SORT_KEY, PRODUCTS_STATUS } from "@/lib/constants";
import { _products } from "@/lib/routes";
import { ZProductFilter } from "@/lib/schema";
import { IProductFilter } from "@/lib/types";
import { getFilterObject, getFilterString } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Filter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const filter = getFilterObject(searchParams, ZProductFilter);
    const defaultValues = {
        shop: undefined,
        search: undefined,
        limit: undefined,
        page: undefined,
        category: undefined,
        status: undefined,
        approval: undefined,
        price: undefined,
        stock: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        sort: {
            name: true,
            price: undefined,
            stock: undefined,
            status: undefined,
            approval: undefined,
            category: undefined,
            createdAt: undefined,
            updatedAt: undefined
        },
        ...filter
    }
    const form = useForm<IProductFilter>({
        resolver: zodResolver(ZProductFilter),
        defaultValues
    });

    const { handleSubmit, reset } = form;

    const onSubmit = (data: IProductFilter) => {
        const filterString = getFilterString(data);
        router.push(`${_products}?${filterString}`);
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
                        <ChipsField fieldKey="category" fieldOptions={PRODUCTS_CATEGORY} />
                        <ChipsField fieldKey="status" fieldOptions={PRODUCTS_STATUS} />
                        <ChipsField fieldKey="approval" fieldOptions={PRODUCTS_APPROVAL} />
                        <DigitRangeField fieldKey="price" />
                        <DigitRangeField fieldKey="stock" />
                        <DateRangeField fieldKey="created at" />
                        <DateRangeField fieldKey="updated at" />
                        <SortField fieldKeys={PRODUCTS_SORT_KEY} />
                        <RunFilterButton />
                    </div>
                </form>
            </FormProvider>
        </section>
    )
}