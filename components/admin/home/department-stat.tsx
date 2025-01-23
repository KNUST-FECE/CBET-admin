"use client";

import { useGetDepartmentStat } from "@/lib/query-hooks/resources";
import { _resources, _users } from "@/lib/routes";
import { ChevronRight, FolderOpen } from "lucide-react";
import Link from "next/link";

export default function DepartmentStat({dep}:{dep: string}) {
    const { data: stat, isLoading, isError } = useGetDepartmentStat(dep);

    return (
        <div className="resource-stat-container">
            <div className="stat-start">
                <FolderOpen strokeWidth={1} />
            </div>
            <div className="stat-end">
                <Link href={`${_resources}?f=${dep}`}>{dep}</Link>
                <p>1298 files &bull; 27 folders</p>
            </div>
        </div>
    )
}