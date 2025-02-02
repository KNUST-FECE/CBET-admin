import { Checkbox } from "@/components/ui/checkbox";
import { IBlog } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> image/name - author - category -  tags - status - likes - updated - created
export const columns: ColumnDef<IBlog>[] = [
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
        id: "author",
        header: () => <TableHeader value="author" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "author-col author-th",
            cellClass: "author-col author-td",
        }
    },
    {
        accessorKey: "categoory",
        header: () => <TableHeader value="category" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "role-col role-th",
            cellClass: "role-col role-td",
        }
    },
    {
        accessorKey: "tags",
        header: () => <TableHeader value="tags" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "tags-col tags-th",
            cellClass: "tags-col tags-td",
        }
    },
    {
        accessorKey: "status",
        header: () => <TableHeader value="status" />,
        cell: ({getValue}) => <StatusCell value={"active"} />,
        meta: {
            headClass: "status-col status-th",
            cellClass: "status-col status-td",
        }
    },
    {
        accessorKey: "likes",
        header: () => <TableHeader value="likes" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "likes-col likes-th",
            cellClass: "likes-col likes-td",
        }
    },
    {
        id: "updatedAt",
        header: () => <TableHeader value="date modified" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        id: "createdAt",
        header: () => <TableHeader value="date created" />,
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

function SelectHeader(props: { table: Table<IBlog>}) {
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

function SelectCell(props: { row: Row<IBlog>}) {
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