import { IProduct } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronRight } from "lucide-react";

// columns -- name/shopName , category/tags, discount/price , inStock, published, approval
export const columns: ColumnDef<IProduct>[] = [
    {
        id: "name",
        header: "Name",
        cell: ({row: {original}}) => (
            <p className="products-name-p">
                <span>{original.name}</span>
            </p>
        ),
        meta: {
            headerClass: "products-name-th",
            cellClass: "products-name-td",
        },
    },
    {
        id: "price",
        header: "Price",
        cell: ({row: {original}}) => (
            <p className="products-price-p">
                GHc <span>{original.price}</span>
            </p>
        ),
        meta: {
            headerClass: "products-price-th",
            cellClass: "products-price-td",
        },
    },
    {
        id: "stock",
        header: "In Stock",
        cell: ({row: {original}}) => (
            <p className="products-stock-p">
                <span>{original.inStock}</span>
            </p>
        ),
        meta: {
            headerClass: "products-stock-th",
            cellClass: "products-stock-td",
        },
    },
    {
        id: "status",
        header: "Status",
        cell: ({row: {original}}) => (
            <p className="">
                <span>{original.likes}</span>
            </p>
        ),
        meta: {
            headerClass: "products-status-th",
            cellClass: "products-status-td",
        },
    },
    {
        id: "icon",
        cell: () => (<ChevronRight strokeWidth={1} />),
        meta: {
            headerClass: "products-icon-th",
            cellClass: "products-icon-td",
        }
    },
]