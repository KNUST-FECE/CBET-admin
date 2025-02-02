import { Checkbox } from "@/components/ui/checkbox";
import { IRole } from "@/lib/types";
import { Row } from "@tanstack/react-table";
import { Table } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<IRole>[] = [
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
        accessorKey: "resourcePermissions",
        header: () => <TableHeader value="resource permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "resource-col resource-th",
            cellClass: "resource-col resource-td",
        }
    },
    {   
        accessorKey: "blogPermissions",
        header: () => <TableHeader value="blog permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "blog-col blog-th",
            cellClass: "blog-col blog-td",
        }
    },
    {   
        accessorKey: "marketPermissions",
        header: () => <TableHeader value="market permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "market-col market-th",
            cellClass: "market-col market-td",
        }
    },
    {   
        accessorKey: "userPermissions",
        header: () => <TableHeader value="user permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "user-col user-th",
            cellClass: "user-col user-td",
        }
    },
    {   
        accessorKey: "memberPermissions",
        header: () => <TableHeader value="member permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "member-col member-th",
            cellClass: "member-col member-td",
        }
    },
    {   
        accessorKey: "reportPermissions",
        header: () => <TableHeader value="report permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "report-col report-th",
            cellClass: "report-col report-td",
        }
    },
    {   
        accessorKey: "rolePermissions",
        header: () => <TableHeader value="role permissions" />,
        cell: ({getValue}) => <TableCell value={getValue()} />,
        meta: {
            headClass: "role-col role-th",
            cellClass: "role-col role-td",
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

function SelectHeader(props: { table: Table<IRole>}) {
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

function SelectCell(props: { row: Row<IRole>}) {
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