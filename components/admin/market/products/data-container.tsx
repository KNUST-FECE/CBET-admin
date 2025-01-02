"use client";

import Table from "@/components/common/table";
import { IProduct, IProductFilter } from "@/lib/types";
import { columns } from "./columns";
import { ColumnFiltersState, SortingState, useReactTable } from "@tanstack/react-table";
import { getCoreRowModel } from "@tanstack/react-table";
import { getFilteredRowModel, getPaginationRowModel, getSortedRowModel } from "@tanstack/react-table";
import { useState } from "react";
import { useGetProducts } from "@/lib/query-hooks/products";

export default function DataContainer({ filter }: { filter: IProductFilter }) {
    const { data: resources } = useGetProducts(filter);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable<IProduct>({ 
        data: resources || [], 
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            rowSelection,
        },
    });

    const headerGroup = table.getHeaderGroups();
    const tableRows = table.getRowModel().rows;

    return (
        <>
            <section id="filter-section">
                filter section
            </section>
            <section id="table-section">
                <Table HG={headerGroup} TR={tableRows} />
            </section>
        </>
    )
}