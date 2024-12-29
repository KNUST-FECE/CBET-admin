"use client";

import { useGetRecentBlogs } from "@/lib/query-hooks";
import { columns } from "./blog-columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IBlog } from "@/lib/types";
import { demoBlogs } from "@/lib/constants";

export default function BlogTable() {
    const { data: recentBlogs } = useGetRecentBlogs();

    const table = useReactTable<IBlog>({ 
        data: demoBlogs, 
        columns, 
        getCoreRowModel: getCoreRowModel(),
    });
    
    const headerGroup = table.getHeaderGroups();
    const tableRows = table.getRowModel().rows;
    const hasRows = table.getRowModel().rows?.length;

    return (
        <table>
            <thead>
                {headerGroup.map(hg => (
                    <tr key={hg.id}>
                        {hg.headers.map(h => (
                            <th key={h.id}>
                                {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {tableRows.map(r => (
                    <tr key={r.id} className="blogs-body-row">
                        {r.getAllCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}