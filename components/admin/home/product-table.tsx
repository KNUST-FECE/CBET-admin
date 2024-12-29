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
                            <th key={h.id}>
                                {h.isPlaceholder ? null : flexRender( h.column.columnDef.header, h.getContext())}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {tableRows.map(r => (
                    <tr key={r.id} className="products-body-row">
                        {r.getAllCells().map(cell => (
                            <td key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}