"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IUserFilter } from "../types";
import * as Q from "@/lib/queries/users";

export function useGetUsers(filter:IUserFilter) {
    const queryKey = keys.users(filter);
    const queryFn = async () => await Q.getUsers();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};