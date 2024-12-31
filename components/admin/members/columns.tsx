import { IMember } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> image/name - email - role -  created - updated
export const columns: ColumnDef<IMember>[] = [
    {
        accessorKey: "name",
        header: "name",
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "email",
        header: "email",
        meta: {
            headClass: "email-col email-th",
            cellClass: "email-col email-td",
        }
    },
    {
        accessorKey: "role",
        header: "role",
        meta: {
            headClass: "role-col role-th",
            cellClass: "role-col role-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: "updated",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd-MM-yyyy")}
            </p>
        ),
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: "created",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd-MM-yyyy")}
            </p>
        ),
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
]