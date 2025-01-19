"use client";

import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, CirclePlus, File, Folder, X } from "lucide-react";
import { useState } from "react";
import FolderForm from "./folder-form";
import FileForm from "./file-form";

type Props = {
    folderID: string
}

export default function FormSelector(props: Props) {
    const [ openFolderForm, setOpenFolderForm ] = useState(false);
    const [ openFileForm, setOpenFileForm ] = useState(false);

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
            <FileForm open={openFileForm} setOpen={setOpenFileForm} />
        </>
    )
}