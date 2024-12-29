"use client";

import { useGetRecentBlogs } from "@/lib/query-hooks";

export default function BlogTable() {
    const { data: recentBlogs } = useGetRecentBlogs();

    return (
        <div>
            <p>Blog Table</p>
            columns -- name - dateCreated and author and category, tags, likes, chevronRight
        </div>
    )
}