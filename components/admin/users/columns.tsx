import { IUser } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from 'date-fns';

// columns -> image/name - student no - index no - department - level -  created
export const columns: ColumnDef<IUser>[] = [
    {
        accessorKey: "name",
        header: "name",
        meta: {
            headClass: "name-col name-th",
            cellClass: "name-col name-td",
        }
    },
    {
        accessorKey: "studentNo",
        header: "student no.",
        meta: {
            headClass: "student-col student-th",
            cellClass: "student-col student-td",
        }
    },
    {
        accessorKey: "indexNo",
        header: "index no.",
        meta: {
            headClass: "index-col index-th",
            cellClass: "index-col index-td",
        }
    },
    {
        accessorKey: "department",
        header: "department",
        meta: {
            headClass: "department-col department-th",
            cellClass: "department-col department-td",
        }
    },
    {
        accessorKey: "level",
        header: "level",
        meta: {
            headClass: "level-col level-th",
            cellClass: "level-col level-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: "created",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd/MM/yyyy")}
            </p>
        ),
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
]