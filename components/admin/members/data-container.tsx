"use client";

import Table from "@/components/common/table";
import { IMember, IMemberFilter } from "@/lib/types";
import { columns } from './columns';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useGetMembers } from "@/lib/query-hooks/members";

export default function DataContainer({ filter }: { filter: IMemberFilter }) {
    const { data: resources } = useGetMembers(filter);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable<IMember>({ 
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