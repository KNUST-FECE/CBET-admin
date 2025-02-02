import { Checkbox } from '@/components/ui/checkbox';
import { IReport } from '@/lib/types';
import { Row } from '@tanstack/react-table';
import { ColumnDef, Table } from '@tanstack/react-table';
import { format } from 'date-fns';

// columns -> user - category - issue - issueUrl - issueType - description - serviced - created
export const columns: ColumnDef<IReport>[] = [
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
        accessorKey: "user",
        header: () => <TableHeader value="user" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "user-col user-th",
            cellClass: "user-col user-td",
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
        accessorKey: "issue",
        header: () => <TableHeader value="issue" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "issue-col issue-th",
            cellClass: "issue-col issue-td",
        }
    },
    {
        accessorKey: "url",
        header: () => <TableHeader value="issue url" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "url-col url-th",
            cellClass: "url-col url-td",
        }
    },
    {
        accessorKey: "type",
        header: () => <TableHeader value="type" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "type-col type-th",
            cellClass: "type-col type-td",
        }
    },
    {
        accessorKey: "summary",
        header: () => <TableHeader value="summary" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "summary-col summary-th",
            cellClass: "summary-col summary-td",
        }
    },
    {
        accessorKey: "status",
        header: () => <TableHeader value="status" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "serviced-col serviced-th",
            cellClass: "serviced-col serviced-td",
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
    }
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

function SelectHeader(props: { table: Table<IReport>}) {
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

function SelectCell(props: { row: Row<IReport>}) {
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