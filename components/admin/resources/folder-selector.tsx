"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetFolderTrace } from "@/lib/query-hooks/resources";
import { ZResourceFilter } from "@/lib/schema";
import { getFilterObject } from "@/lib/utils";
import { Folder } from "lucide-react";
import { useSearchParams } from "next/navigation";

const sample = ["computer", "level 100", "semester 2", "electrical drawing", "mensah slides"]

export default function FolderSelector() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: folderTrace } = useGetFolderTrace(filter.folder || "");

    return (
        <div id="folder-selector">
            <Select defaultValue={sample[0]}>
                <SelectTrigger className="selector-trigger">
                    <div>
                        <Folder />
                        <div>
                            <SelectValue />
                        </div>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    {sample.map(value => <SelectItem key={value} value={value}>{value}</SelectItem>)}
                </SelectContent>
            </Select>
        </div>
    )
}