"use client";

import Table from "@/components/common/table";
import { IBlog } from "@/lib/types";
import { columns } from "./columns";
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import SelectPopup from "@/components/common/select-popup";
import { useGetBlogs } from "@/lib/query-hooks/blogs";
import { useSearchParams } from "next/navigation";
import { getFilterObject } from "@/lib/utils";
import { ZBlogFilter } from "@/lib/schema";
import Filter from "./filter";

export default function DataContainer() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZBlogFilter);
    const { data: blogs } = useGetBlogs(filter);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable<IBlog>({ 
        data: blogs || [], 
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