import { IProduct } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

// columns -- name/shopName , category/tags, discount/price , inStock, published, approval
export const columns: ColumnDef<IProduct>[] = [
    {
        id: "name",
        header: "Name",
        cell: ({row: {original}}) => (
            <p>
                <span>{original.name}</span>
            </p>
        ),
        meta: {
            headClass: "products-name-col products-name-th",
            cellClass: "products-name-col products-name-td",
        },
    },
    {
        id: "price",
        header: "Price",
        cell: ({row: {original}}) => (
            <p>
                GHc <span>{original.price}</span>
            </p>
        ),
        meta: {
            headClass: "products-price-col products-price-th",
            cellClass: "products-price-col products-price-td",
        },
    },
    {
        id: "stock",
        header: "In Stock",
        cell: ({row: {original}}) => (
            <p>
                <span>{original.inStock}</span>
            </p>
        ),
        meta: {
            headClass: "products-stock-col products-stock-th",
            cellClass: "products-stock-col products-stock-td",
        },
    },
    {
        id: "published",
        header: "Availability",
        cell: ({row: {original : o}}) =>(
            <p>
                <span>{o.published? "Published" : "Draft"}</span>
            </p>
        ),
        meta: {
            headClass: "products-published-col products-published-th",
            cellClass: "products-published-col products-published-td",
        },
    },
    {
        id: "approved",
        header: "Approval",
        cell: ({row: {original : o}}) =>(
            <p>
                <span>{o.approved? "Approved" : "Denied"}</span>
            </p>
        ),
        meta: {
            headClass: "products-approved-col products-approved-th",
            cellClass: "products-approved-col products-approved-td",
        },
    },
    {
        id: "icon",
        cell: () => (<ChevronRight strokeWidth={1} />),
        meta: {
            headClass: "products-icon-col products-icon-th",
            cellClass: "products-icon-col products-icon-td",
        }
    },
]