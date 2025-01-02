"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IMemberFilter } from "../types";
import * as Q from "@/lib/queries/members";

export function useGetMembers(filter:IMemberFilter) {
    const queryKey = keys.members(filter);
    const queryFn = async () => await Q.getMembers();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};