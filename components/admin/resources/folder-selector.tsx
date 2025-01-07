"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGetFolders } from "@/lib/query-hooks/resources";
import { Folder } from "lucide-react";

type Props = {
    folderID: string
}

const sample = ["computer", "level 100", "semester 2", "electrical drawing", "mensah slides"]

export default function FolderSelector(props: Props) {
    const { data: folders, } = useGetFolders(props.folderID);

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