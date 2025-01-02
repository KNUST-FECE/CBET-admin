"use client";

import { useGetBlogs } from "@/lib/query-hooks";
import { _blog } from "@/lib/routes";
import { IBlogFilter } from "@/lib/types";
import Link from "next/link";

export default function Navigation() {
    const filter: IBlogFilter = {};
    const { data: blogs } = useGetBlogs(filter);

    return (
        <>
            <section id="filter-section">
                filter section
            </section>
            <nav id="data-section">
                <ul>
                    {blogs?.map(blog => (
                        <li key={blog.id}>
                            <Link href={_blog(blog.id)}>
                                {blog.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </>
    )
}