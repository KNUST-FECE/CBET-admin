import { IProduct } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// columns -> name - shop - price - stock - published - approved - category - tags - description - updated - created
export const columns: ColumnDef<IProduct>[] = [
    {
        accessorKey: "name",
        header: "name",
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "shop",
        header: "shop",
        meta: {
            headClass: "shop-col shop-th",
            cellClass: "shop-col shop-td",
        }
    },
    {
        accessorKey: "price",
        header: "price",
        meta: {
            headClass: "price-col price-th",
            cellClass: "price-col price-td",
        }
    },
    {
        accessorKey: "stock",
        header: "stock",
        meta: {
            headClass: "stock-col stock-th",
            cellClass: "stock-col stock-td",
        }
    },
    {
        accessorKey: "published",
        header: "published",
        meta: {
            headClass: "published-col published-th",
            cellClass: "published-col published-td",
        }
    },
    {
        accessorKey: "approved",
        header: "approved",
        meta: {
            headClass: "approved-col approved-th",
            cellClass: "approved-col approved-td",
        }
    },
    {
        accessorKey: "category",
        header: "category",
        meta: {
            headClass: "category-col category-th",
            cellClass: "category-col category-td",
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