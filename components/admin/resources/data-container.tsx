"use client";

import { IResource } from "@/lib/types";
import { columns } from './columns';
import { ColumnFiltersState, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import Table from "@/components/common/table";
import { useEffect, useMemo, useState } from "react";
import { useGetResources, useModifyStatus, useRemoveResource } from "@/lib/query-hooks/resources"
import { useSearchParams } from "next/navigation";
import { getFilterObject } from "@/lib/utils";
import { ZResourceFilter } from "@/lib/schema";
import { X } from "lucide-react";
import RenameForm from "./rename-form";
import SelectPopup from "@/components/common/select-popup";

export default function DataContainer() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: resources } = useGetResources(filter);
    const { mutate: removeResource } = useRemoveResource(filter);
    const { mutate: modifyStatus } = useModifyStatus(filter);

    const [openRename, setOpenRename] = useState(false);
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

    const selectActions = [
        {
            label: "rename",
            trigger: () => setOpenRename(true),
            single: true
        },
        {
            label: "delete",
            trigger: () => {
                if(selectedRows.length < 1) return;

                const selectedIDs = selectedRows.map(({original}) => original.id);

                removeResource({ids: selectedIDs});
                resetSelected();
            }
        },
        {
            label: "status",
            trigger: () => {
                if(selectedRows.length < 1) return;
            }
        }
    ]

    useEffect(() => {
        if(!openRename) resetSelected();
    }, [openRename]);

    return (
        <>
            <section id="table-section">
                <Table HG={headerGroup} TR={tableRows} />
                <SelectPopup
                    totalSelected={selectedRows.length}
                    onClose={() => table.resetRowSelection()}
                    actions={selectActions}
                />
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
            <RenameForm 
                open={openRename} 
                setOpen={setOpenRename} 
                filter={filter}
                type={selectedRows[0]?.original.type} 
                id={selectedRows[0]?.original.id}
                name={selectedRows[0]?.original.name}
            />
        </>
    )
}