import { IResource } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> name - type - created - modified - size 
export const columns: ColumnDef<IResource>[] = [
    {
        accessorKey: "name",
        header: "name",
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "type",
        header: "type",
        meta: {
            headClass: "type-col type-th",
            cellClass: "type-col type-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: "created",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd/MM/yyyy")}
            </p>
        ),
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: "modified",
        cell: ({row: {original}}) => (
            <p>
                {format(original.updatedAt, "dd/MM/yyyy")}
            </p>
        ),
        meta: {
            headClass: "modified-col modified-th",
            cellClass: "modified-col modified-td",
        }
    },
]