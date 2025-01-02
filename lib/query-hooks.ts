"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as Q from "./queries";
import { keys } from "./query-keys";
import { IBlogFilter, IMemberFilter, IProductFilter, IReportFilter, IResourceFilter, IShopFilter, IUserFilter } from "./types";

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

export function useGetResources(filter:IResourceFilter) {
    const queryKey = keys.resources(filter);
    const queryFn = async () => await Q.getResources();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetBlogs(filter:IBlogFilter) {
    const queryKey = keys.blogs(filter);
    const queryFn = async () => await Q.getBlogs();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetUsers(filter:IUserFilter) {
    const queryKey = keys.users(filter);
    const queryFn = async () => await Q.getUsers();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetMembers(filter:IMemberFilter) {
    const queryKey = keys.members(filter);
    const queryFn = async () => await Q.getMembers();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetShops(filter:IShopFilter) {
    const queryKey = keys.shops(filter);
    const queryFn = async () => await Q.getShops();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetProducts(filter:IProductFilter) {
    const queryKey = keys.products(filter);
    const queryFn = async () => await Q.getProducts();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetReports(filter:IReportFilter) {
    const queryKey = keys.reports(filter);
    const queryFn = async () => await Q.getReports();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetRoles() {
    const queryKey = keys.roles;
    const queryFn = async () => await Q.getRoles();

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