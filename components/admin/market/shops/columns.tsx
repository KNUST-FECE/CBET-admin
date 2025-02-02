import { Checkbox } from "@/components/ui/checkbox";
import { IShop } from "@/lib/types";
import { Row, Table } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

// column -> avatar/name - user - email - products - contacts[] - socials - updated - created
export const columns: ColumnDef<IShop>[] = [
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
        accessorKey: "user",
        header: () => <TableHeader value="user" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "user-col user-th",
            cellClass: "user-col user-td",
        }
    },
    {
        accessorKey: "email",
        header: () => <TableHeader value="email" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "email-col email-th",
            cellClass: "email-col email-td",
        }
    },
    {
        accessorKey: "products",
        header: () => <TableHeader value="products" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "products-col products-th",
            cellClass: "products-col products-td",
        }
    },
    {
        accessorKey: "contacts",
        header: () => <TableHeader value="contacts" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "contacts-col contacts-th",
            cellClass: "contacts-col contacts-td",
        }
    },
    {
        accessorKey: "socials",
        header: () => <TableHeader value="socials" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "socials-col socials-th",
            cellClass: "socials-col socials-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <TableHeader value="updated at" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: () => <TableHeader value="created at" />,
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

function SelectHeader(props: { table: Table<IShop>}) {
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

function SelectCell(props: { row: Row<IShop>}) {
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