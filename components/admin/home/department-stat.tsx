"use client";

import { useGetDepartmentStat } from "@/lib/query-hooks";
import { _resources, _users } from "@/lib/routes";
import { ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function DepartmentStat({dep}:{dep: string}) {
    const { data: stat, isLoading, isError } = useGetDepartmentStat(dep);

    return (
        <div className="resource-stat-container">
            <div className="stat-upper">
                <FolderOpen strokeWidth={1} />
                <Link href={_users} className="users-total-container">
                    <div className="random-avatar" />
                    <div className="random-avatar" />
                    <div className="random-avatar" />
                    <p className="user-tota3">+3028</p>
                    <ChevronRight strokeWidth={1} />
                </Link>
            </div>
            <div className="stat-lower">
                <Link href={`${_resources}?f=${dep}`}>{dep}</Link>
                <p>1298 files &bull; 27 folders</p>
            </div>
        </div>
    )
}