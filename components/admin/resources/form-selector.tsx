"use client";

import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, CirclePlus, File, Folder, X } from "lucide-react";
import { useState } from "react";
import FolderForm from "./folder-form";
import FileForm from "./file-form";
import { useSearchParams } from "next/navigation";
import { getFilterObject } from "@/lib/utils";
import { useGetFolderTrace } from "@/lib/query-hooks/resources";
import { ZResourceFilter } from "@/lib/schema";

export default function FormSelector() {
    const [ openFolderForm, setOpenFolderForm ] = useState(false);
    const [ openFileForm, setOpenFileForm ] = useState(false);
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter); // get the page filter object
    const { data: folderTrace } = useGetFolderTrace(filter.folder || ""); // get the parent folders of current folder up to the root folder
    const stringTrace = folderTrace?.map(folder => folder.name) || [];

    const formTypes = [
        { label: "Folder", icon: Folder, onClick: setOpenFolderForm},
        { label: "File", icon: File, onClick: setOpenFileForm},
    ]

    return (
        <>
            <DropMenu>
                <DropMenuTrigger asChild>
                    <button type="button" id="resource-form-selector">
                        <CirclePlus />
                        <span>New</span>
                        <ChevronDown /> 
                    </button>
                </DropMenuTrigger>
                <DropMenuContent collisionPadding={14} id="resource-form-selector-content">
                    {formTypes.map(type => (
                        <DropMenuItem key={type.label} onClick={() => type.onClick(true)}>
                            <type.icon />
                            {type.label}
                        </DropMenuItem>
                    ))}
                </DropMenuContent>
            </DropMenu>
            <FolderForm open={openFolderForm} setOpen={setOpenFolderForm} />
            <FileForm open={openFileForm} setOpen={setOpenFileForm} filter={filter} stringTrace={stringTrace} />
        </>
    )
}