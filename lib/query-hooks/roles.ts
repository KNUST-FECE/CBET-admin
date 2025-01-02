"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import * as Q from "@/lib/queries/roles";

export function useGetRoles() {
    const queryKey = keys.roles;
    const queryFn = async () => await Q.getRoles();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};