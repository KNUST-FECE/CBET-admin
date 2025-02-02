import { Checkbox } from "@/components/ui/checkbox";
import { IUser } from "@/lib/types";
import { ColumnDef, Row, Table } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> image/name - student no - index no - department - level -  created
export const columns: ColumnDef<IUser>[] = [
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
        accessorKey: "studentNo",
        header: () => <TableHeader value="student no." />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "student-col student-th",
            cellClass: "student-col student-td",
        }
    },
    {
        accessorKey: "indexNo",
        header: () => <TableHeader value="index no." />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "index-col index-th",
            cellClass: "index-col index-td",
        }
    },
    {
        accessorKey: "department",
        header: () => <TableHeader value="department" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "department-col department-th",
            cellClass: "department-col department-td",
        }
    },
    {
        accessorKey: "level",
        header: () => <TableHeader value="level" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "level-col level-th",
            cellClass: "level-col level-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: () => <TableHeader value="created at" />,
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

function SelectHeader(props: { table: Table<IUser>}) {
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

function SelectCell(props: { row: Row<IUser>}) {
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