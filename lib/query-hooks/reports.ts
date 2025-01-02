"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IReportFilter } from "../types";
import * as Q from "@/lib/queries/reports";

export function useGetReports(filter:IReportFilter) {
    const queryKey = keys.reports(filter);
    const queryFn = async () => await Q.getReports();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};