"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
    const queryFn = async () => await Q.getResources(filter);

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetFolderTrace(resourceID: string) {
    const queryKey = keys.folders(resourceID);
    const queryFn = async () => await Q.getFolderTrace(resourceID);

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
}

export function useAddResource(filter:IResourceFilter) {
    const queryClient = useQueryClient();

    return useMutation({ 
        mutationFn: Q.addResource,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: keys.resources(filter)})
        },
    })
}

export function useModifyResource() {

}

export function useSoftRemoveResource() {

}

export function useHardRemoveResource() {
    
}