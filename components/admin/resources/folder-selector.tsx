"use client";

import { useGetFolders } from "@/lib/query-hooks/resources";

type Props = {
    folderID: string
}

export default function FolderSelector(props: Props) {
    const { data: folders, } = useGetFolders(props.folderID);

    return (
        <div id="folder-selector">
            folder selector
            {/* TODO: a radix select to change from the current folder */}
        </div>
    )
}