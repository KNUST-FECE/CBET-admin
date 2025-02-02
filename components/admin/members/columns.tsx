import { Checkbox } from "@/components/ui/checkbox";
import { IMember } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> image/name - email - role -  created - updated
export const columns: ColumnDef<IMember>[] = [
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
        accessorKey: "email",
        header: () => <TableHeader value="email" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "email-col email-th",
            cellClass: "email-col email-td",
        }
    },
    {
        accessorKey: "role",
        header: () => <TableHeader value="role" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "role-col role-th",
            cellClass: "role-col role-td",
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
        id: "updatedAt",
        header: () => <TableHeader value="date modified" />,
        cell: ({row: {original}}) => (
            <p>
                {/* {format(original.createdAt, "dd-MM-yyyy")} */}
            </p>
        ),
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        id: "createdAt",
        header: () => <TableHeader value="date created" />,
        cell: ({row: {original}}) => (
            <p>
                {/* {format(original.createdAt, "dd-MM-yyyy")} */}
            </p>
        ),
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

function SelectHeader(props: { table: Table<IMember>}) {
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

function SelectCell(props: { row: Row<IMember>}) {
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