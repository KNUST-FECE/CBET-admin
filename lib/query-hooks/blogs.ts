"use client";

import { useQuery } from "@tanstack/react-query";
import { keys } from "../query-keys";
import { IBlogFilter } from "../types";
import * as Q from "@/lib/queries/blogs";

export function useGetRecentBlogs() {
    const queryKey = keys.recentBlogs;
    const queryFn = async () => await Q.getRecentBlogs();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};

export function useGetBlogs(filter:IBlogFilter) {
    const queryKey = keys.blogs(filter);
    const queryFn = async () => await Q.getBlogs();

    return useQuery({ queryKey, queryFn, refetchOnWindowFocus: false });
};