"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { IResource } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';
import { File, Folder } from "lucide-react";

// columns -> selector - name - type - file type - size - creator - createdAt - modifiedAt
export const columns: ColumnDef<IResource>[] = [
    {
        id: "select",
        header: ({ table }) => (
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
        ),
        cell: ({ row }) => (
            <div>
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            </div>
        ),
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
        accessorKey: "type",
        header: () => <TableHeader value="type" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "type-col type-th",
            cellClass: "type-col type-td",
        }
    },
    {
        id: "file-type",
        header: () => <TableHeader value="file type" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "file-col file-th",
            cellClass: "file-col file-td",
        }
    },
    {
        id: "size",
        header: () => <TableHeader value="size" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "size-col size-th",
            cellClass: "size-col size-td",
        }
    },
    {
        id: "status",
        header: () => <TableHeader value="Status" />,
        cell: ({getValue}) => <TableCell value={"deleted"} />,
        meta: {
            headClass: "size-col size-th",
            cellClass: "size-col size-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <TableHeader value="date created" />,
        cell: ({getValue}) => <TableCell value={format(getValue() as string, "dd-MM-yyyy")} />,
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <TableHeader value="date modified" />,
        cell: ({getValue}) => <TableCell value={format(getValue() as string, "dd-MM-yyyy")} />,
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