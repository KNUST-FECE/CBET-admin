"use client";

import { useGetRecentProducts } from "@/lib/query-hooks";
import { IProduct } from "@/lib/types";
import { columns } from "./product-columns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { demoProducts } from "@/lib/constants";

export default function ProductTable() {
    const { data: recentProducts } = useGetRecentProducts();

    const table = useReactTable<IProduct>({ 
        data: demoProducts, 
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
                            <th key={h.id} className={h.column.columnDef.meta?.headClass}>
                                {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {tableRows.map(r => (
                    <tr key={r.id}>
                        {r.getAllCells().map(c => (
                            <td key={c.id} className={c.column.columnDef.meta?.cellClass}>
                                {flexRender(c.column.columnDef.cell, c.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}