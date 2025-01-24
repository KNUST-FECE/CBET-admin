"use client";

import { IResource, IResourceFilter } from "@/lib/types";
import { columns } from './columns';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Table from "@/components/common/table";
import { useMemo, useState } from "react";
import { useGetResources, useModifyName, useModifyStatus, useRemoveResource } from "@/lib/query-hooks/resources"
import { useSearchParams } from "next/navigation";
import { getFilterObject } from "@/lib/utils";
import { ZResourceFilter } from "@/lib/schema";
import { X } from "lucide-react";

export default function DataContainer() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: resources } = useGetResources(filter);
    const { mutate: removeResource } = useRemoveResource(filter);
    const { mutate: modifyName } = useModifyName(filter);
    const { mutate: modifyStatus } = useModifyStatus(filter);

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

    const headerGroup = useMemo(() => table.getHeaderGroups(), [table]);
    const tableRows = table.getRowModel().rows;
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const resetSelected = table.resetRowSelection;

    const handleDelete = () => {
        if(selectedRows.length < 1) return;

        const selectedIDs = selectedRows.map(({original}) => original.id);

        removeResource({ids: selectedIDs});
        resetSelected();
    }

    const handleRename = () => {
        if(selectedRows.length < 1) return;
        
    }

    const handleStatus = () => {
        if(selectedRows.length < 1) return;
    }

    return (
        <>
            <section id="table-section">
                <Table HG={headerGroup} TR={tableRows} />
                <div className="selected-popup" data-active={!!selectedRows.length}>
                    <div className="total-selected">
                        <p>{selectedRows.length}</p>
                    </div>
                    <div className="action-buttons">
                        <button onClick={handleRename}>
                            rename
                        </button>
                        <button onClick={handleDelete}>
                            delete
                        </button>
                        <button onClick={handleStatus}>
                            hide
                        </button>
                    </div>
                    <div className="clear-selection">
                        <button onClick={() => table.resetRowSelection()}>
                            <X />
                        </button>
                    </div>
                </div>
            </section>
            <section id="footer-section">
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