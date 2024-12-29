"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Q from "./queries";
import { keys } from "./query-keys";

export function useGetDepartmentStat(dep: string) {
    const queryKey = keys.departmentStats(dep);
    const queryFn = async () => await Q.getDepartmentStat(dep);

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetRecentBlogs() {
    const queryKey = keys.recentBlogs;
    const queryFn = async () => await Q.getRecentBlogs();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetRecentProducts() {
    const queryKey = keys.recentProducts;
    const queryFn = async () => await Q.getRecentProducts();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

// export function useAddCollection() {
//     const queryClient = useQueryClient();
//     const { setActiveTab } = useTabContext();

//     return useMutation({ 
//         mutationFn: addCollection,
//         onSuccess: () => {
//             queryClient.invalidateQueries({queryKey: keys.collections})
//             queryClient.invalidateQueries({queryKey: keys.activeCollections})
//         },
//         onSettled(data) {
//             setActiveTab(data?.label || "home")
//         },
//     })
// }