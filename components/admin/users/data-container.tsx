"use client";

import Table from "@/components/common/table";
import { IUser, IUserFilter } from "@/lib/types";
import { columns } from './columns';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { useGetUsers } from "@/lib/query-hooks/users";
import Filter from "./filter";

export default function DataContainer({ filter }: { filter: IUserFilter }) {
    const { data: resources } = useGetUsers(filter);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable<IUser>({ 
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
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const resetSelected = table.resetRowSelection;

    const selectActions = [
        {
            label: "role",
            trigger: () => {
                if(selectedRows.length < 1) return
            }
        },
        {
            label: "status",
            trigger: () => {
                if(selectedRows.length < 1) return;
            }
        }
    ]

    return (
        <>
            <Filter
                totalSelected={selectedRows.length}
                onClose={() => table.resetRowSelection()}
                actions={selectActions}
            />
            <section id="table-section">
                <Table HG={headerGroup} TR={tableRows} />
            </section>
            <section id="table-footer-section">
                <div id="data-info">
                    <p id="page-number">
                        page 
                        <span>0</span>
                        of
                        <span>10</span>
                    </p>
                </div>
                <div id="data-pagination">
                    <button id="prev-btn">
                        prev
                    </button>
                    <button id="next-btn">
                        next
                    </button>
                </div>
            </section>
        </>
    )
}