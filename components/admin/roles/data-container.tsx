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
        <section id="table-section">
            <Table HG={headerGroup} TR={tableRows} />
        </section>
    )
}