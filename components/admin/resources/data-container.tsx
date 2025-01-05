"use client";

import { IResource, IResourceFilter } from "@/lib/types";
import { columns } from './columns';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Table from "@/components/common/table";
import { useState } from "react";
import { useGetResources } from "@/lib/query-hooks/resources";

export default function DataContainer({ filter }: { filter: IResourceFilter }) {
    const { data: resources } = useGetResources(filter);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable<IResource>({ 
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
            <section id="footer-section">
                footer section
            </section>
        </>
    )
}