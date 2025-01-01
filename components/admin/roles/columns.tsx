import { IRole } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IRole>[] = [
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
    }
]