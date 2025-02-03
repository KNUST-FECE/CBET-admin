import { Checkbox } from "@/components/ui/checkbox";
import { IProduct } from "@/lib/types";
import { Row, Table } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// columns -> name - shop - price - stock - published - approved - category - tags - description - updated - created
export const columns: ColumnDef<IProduct>[] = [
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
        accessorKey: "name",
        header: () => <TableHeader value="name" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "shop",
        header: () => <TableHeader value="shop" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "shop-col shop-th",
            cellClass: "shop-col shop-td",
        }
    },
    {
        accessorKey: "price",
        header: () => <TableHeader value="price" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "price-col price-th",
            cellClass: "price-col price-td",
        }
    },
    {
        accessorKey: "stock",
        header: () => <TableHeader value="stock" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "stock-col stock-th",
            cellClass: "stock-col stock-td",
        }
    },
    {
        accessorKey: "status",
        header: () => <TableHeader value="status" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "status-col status-th",
            cellClass: "status-col status-td",
        }
    },
    {
        accessorKey: "approval",
        header: () => <TableHeader value="approved" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "approved-col approved-th",
            cellClass: "approved-col approved-td",
        }
    },
    {
        accessorKey: "category",
        header: () => <TableHeader value="category" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "category-col category-th",
            cellClass: "category-col category-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <TableHeader value="updated" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <TableHeader value="created" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
    {
        id: "leftover",
        meta: {
            headClass: "leftover-col leftover-th",
            cellClass: "leftover-col leftover-td",
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

function SelectHeader(props: { table: Table<IProduct>}) {
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

function SelectCell(props: { row: Row<IProduct>}) {
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