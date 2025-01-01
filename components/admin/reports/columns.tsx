import { IReport } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

// columns -> user - category - issue - issueUrl - issueType - description - serviced - created
export const columns: ColumnDef<IReport>[] = [
    {
        accessorKey: "user",
        header: "user",
        meta: {
            headClass: "user-col user-th",
            cellClass: "user-col user-td",
        }
    },
    {
        accessorKey: "category",
        header: "category",
        meta: {
            headClass: "category-col category-th",
            cellClass: "category-col category-td",
        }
    },
    {
        accessorKey: "issue",
        header: "issue",
        meta: {
            headClass: "issue-col issue-th",
            cellClass: "issue-col issue-td",
        }
    },
    {
        accessorKey: "url",
        header: "issue url",
        meta: {
            headClass: "url-col url-th",
            cellClass: "url-col url-td",
        }
    },
    {
        accessorKey: "type",
        header: "type",
        meta: {
            headClass: "item-col item-th",
            cellClass: "item-col item-td",
        }
    },
    {
        accessorKey: "summary",
        header: "summary",
        meta: {
            headClass: "summary-col summary-th",
            cellClass: "summary-col summary-td",
        }
    },
    {
        accessorKey: "serviced",
        header: "serviced",
        meta: {
            headClass: "serviced-col serviced-th",
            cellClass: "serviced-col serviced-td",
        }
    },
    {
        accessorKey: "updatedAt",
        header: "updated",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd-MM-yyyy")}
            </p>
        ),
        meta: {
            headClass: "updated-col updated-th",
            cellClass: "updated-col updated-td",
        }
    },
    {
        accessorKey: "createdAt",
        header: "created",
        cell: ({row: {original}}) => (
            <p>
                {format(original.createdAt, "dd-MM-yyyy")}
            </p>
        ),
        meta: {
            headClass: "created-col created-th",
            cellClass: "created-col created-td",
        }
    },
]