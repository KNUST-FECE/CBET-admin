"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IResource } from "@/lib/types";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { format } from 'date-fns';
import { File, Folder } from "lucide-react";

export const columns: ColumnDef<IResource>[] = [
    {
        id: "select",
        header: ({ table }) => (<SelectHeader table={table} />),
        cell: ({ row }) => (<SelectCell row={row} />),
        enableSorting: false,
        enableHiding: false,
        meta: {
            headClass: "select-col select-th",
            cellClass: "select-col select-td",
        }
    },
    {
        id : "name",
        header: () => <TableHeader value="name" />,
        cell: ({row: { original }}) => (
            <div>
                {original.type === "folder"? (<Folder />) : (<File />)}
                <p>{original.name}</p>
            </div>
        ),
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        id: "creator",
        header: () => <TableHeader value="creator" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "creator-col creator-th",
            cellClass: "creator-col creator-td",
        }
    },
    {
        id: "type",
        header: () => <TableHeader value="type" />,
        cell: ({row: { original : { type, fileType} }}) => <TableCell value={type === "folder" ? type : fileType} />,
        meta: {
            headClass: "type-col type-th",
            cellClass: "type-col type-td",
        }
    },
    {
        accessorKey: "size",
        header: () => <TableHeader value="size" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "size-col size-th",
            cellClass: "size-col size-td",
        }
    },
    {
        accessorKey: "status",
        header: () => <TableHeader value="Status" />,
        cell: ({getValue}) => <StatusCell value={getValue() as string} />,
        meta: {
            headClass: "status-col status-th",
            cellClass: "status-col status-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <TableHeader value="date created" />,
        cell: ({getValue}) => <TableCell value={format(getValue() as string, "M/d/yyyy h:mm a")} />,
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <TableHeader value="date modified" />,
        cell: ({getValue}) => <TableCell value={format(getValue() as string, "M/d/yyyy h:mm a")} />,
        meta: {
            headClass: "modified-col modified-th",
            cellClass: "modified-col modified-td",
        }
    },
]

function TableHeader({value}:{value: string}) {
    return (
        <div>
            {value}
        </div>
    )
}

function TableCell({value}:{value:any}) {
    return (
        <div>
            {value}
        </div>
    )
}

function SelectHeader(props: { table: Table<IResource>}) {
    const {table} = props;
    return (
        <div>
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        </div>
    )
}

function SelectCell(props: { row: Row<IResource>}) {
    const {row} = props;
    return (
        <div>
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        </div>
    )
}

function StatusCell(props: { value: string }) {
    return (
        <div>
            <p data-status={props.value}>
                <span className="indicator" />
                <span className="value">{props.value}</span>
            </p>
        </div>
    )
}