"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IProductFilter } from "../types";
import * as Q from "@/lib/queries/products";

export function useGetRecentProducts() {
    const queryKey = keys.recentProducts;
    const queryFn = async () => await Q.getRecentProducts();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetProducts(filter:IProductFilter) {
    const queryKey = keys.products(filter);
    const queryFn = async () => await Q.getProducts();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};