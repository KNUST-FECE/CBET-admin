"use client";

import Table from "@/components/common/table";
import { IRole } from "@/lib/types";
import { columns } from "./columns";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useGetRoles } from "@/lib/query-hooks/roles";

export default function DataContainer() {
    const { data: roles } = useGetRoles();

    const table = useReactTable<IRole>({ 
        data: roles || [], 
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const headerGroup = table.getHeaderGroups();
    const tableRows = table.getRowModel().rows;

    return (
        <>
            <section id="table-section">
                <Table HG={headerGroup} TR={tableRows} />
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