"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from "@/components/ui/dropdown-menu";
import { ZNewFile, ZNewFolder } from "@/lib/schema";
import { INewFile, INewFolder } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CirclePlus, File, Folder, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    folderID: string
}

type TriggerProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function FormSelector(props: Props) {
    const [ openFolderForm, setOpenFolderForm ] = useState(false);
    const [ openFileForm, setOpenFileForm ] = useState(false);

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
                    <DropMenuItem onClick={() => setOpenFolderForm(true)}>
                        <Folder />
                        Folder
                    </DropMenuItem>
                    <DropMenuItem onClick={() => setOpenFileForm(true)}>
                        <File />
                        File
                    </DropMenuItem>
                </DropMenuContent>
            </DropMenu>
            <FolderForm open={openFolderForm} setOpen={setOpenFolderForm} />
            <FileForm open={openFileForm} setOpen={setOpenFileForm} />
        </>
    )
}

function FolderForm(props:TriggerProps) {
    const form = useForm<INewFolder>({
        resolver: zodResolver(ZNewFolder),
        defaultValues: {
            name: "",
        }
    });

    const { handleSubmit, register } = form;

    function onSubmit(values: INewFolder ) {
        // TODO: get the folder list here
        // TODO: get the active user id here
        // TODO: a new object containing all relevant info
        // attributes are: name(folder name) type(folder) dataUrl(null) fileType(null) parentID(folder list) fileCount(0) 
        // folderCount(0) creatorID(user id) status(active) size(0) updatedAt(Date.Now()) createdAt(Date.Now())
    }

    return (
        <FormProvider {...form}>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent asChild id="new-folder-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new folder</DialogTitle>
                            <DialogDescription>Help organise resources with folders</DialogDescription>
                        </div>
                        <div className="form-body">

                        </div>
                        <div className="form-footer">
                            <button className="create-btn">Create</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}

function FileForm(props:TriggerProps) {
    const form = useForm<INewFile>({
        resolver: zodResolver(ZNewFile),
        defaultValues: {
            files: [],
        }
    });

    const { handleSubmit, register } = form;

    function onSubmit(values: INewFile ) {
        // TODO: use a util function to figure out the extension and size of file
        // TODO: save the files and return the urls;
        // TODO: get the active user id here
        // TODO: a new object containing all relevant info
        // attributes are: name(name of file) type(file) dataUrl(file url) fileType(extension) parentID(list of current folder) fileCount(0) 
        // folderCount(0) creatorID(id gotten) status(active) size(size gotten) updatedAt(Date.Now()) createdAt(Date.Now())
    }

    return (
        <FormProvider {...form}>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent asChild id="new-file-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new file</DialogTitle>
                            <DialogDescription>Store relevant data such as PDF, DOCX, PNG etc.</DialogDescription>
                        </div>
                        <div className="form-body">

                        </div>
                        <div className="form-footer">
                            <button className="create-btn">Create</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}