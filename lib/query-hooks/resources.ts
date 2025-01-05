"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IResourceFilter } from "../types";
import * as Q from "@/lib/queries/resources";

export function useGetDepartmentStat(dep: string) {
    const queryKey = keys.departmentStats(dep);
    const queryFn = async () => await Q.getDepartmentStat(dep);

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetResources(filter:IResourceFilter) {
    const queryKey = keys.resources(filter);
    const queryFn = async () => await Q.getResources();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetFolders(resourceID: string) {
    const queryKey = keys.folders(resourceID);
    const queryFn = async () => await Q.getFolders(resourceID);

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useModifyResource() {

}

export function useSoftRemoveResource() {

}

export function useHardRemoveResource() {
    
}