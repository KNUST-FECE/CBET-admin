import { IShop } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// column -> avatar/name - user - email - products - contacts[] - socials - updated - created
export const columns: ColumnDef<IShop>[] = [
    {
        accessorKey: "name",
        header: "name",
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "user",
        header: "user",
        meta: {
            headClass: "user-col user-th",
            cellClass: "user-col user-td",
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
        accessorKey: "products",
        header: "products",
        meta: {
            headClass: "products-col products-th",
            cellClass: "products-col products-td",
        }
    },
    {
        accessorKey: "contacts",
        header: "contacts",
        meta: {
            headClass: "contacts-col contacts-th",
            cellClass: "contacts-col contacts-td",
        }
    },
    {
        accessorKey: "socials",
        header: "socials",
        meta: {
            headClass: "socials-col socials-th",
            cellClass: "socials-col socials-td",
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