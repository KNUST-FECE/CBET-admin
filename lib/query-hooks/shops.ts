"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IShopFilter } from "../types";
import * as Q from "@/lib/queries/shops";

export function useGetShops(filter:IShopFilter) {
    const queryKey = keys.shops(filter);
    const queryFn = async () => await Q.getShops();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};