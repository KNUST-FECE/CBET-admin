"use client";

import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from "@/components/ui/dropdown-menu";
import { ZNewResource } from "@/lib/schema";
import { INewResource } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDown, CirclePlus, File, Folder } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    folderID: string
}

export default function CreateForm(props: Props) {
    const [ open, setOpen ] = useState(false);
    const form = useForm<INewResource>({
        resolver: zodResolver(ZNewResource),
        defaultValues: {
            type: "folder",
            name: "",
            file: null
        }
    });

    const { handleSubmit, register } = form;

    function onSubmit(values: INewResource ) {
        // TODO: if type equals file , save the file and return the url;
        // TODO: use a util function to figure out the extension and size of file
        // TODO: get the folder list here
        // TODO: get the active user id here
        // TODO: a new object containing all relevant info
        // attributes are: name(fo/fi) type(fo/fi) dataUrl(fi) fileType(fi) parentID(fo/fi) fileCount(fo) 
        // folderCount(fo) creatorID(fo/fi) status(fo/fi) size(fo/fi) updatedAt(fo/fi) createdAt(fo/fi)
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)} id="create-form">
                <DropdownSelector setOpen={setOpen} />
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="form-content">
                        <div className="form-header">
                            <DialogTitle>new resource</DialogTitle>
                            <DialogDescription>Help organise resources with folders</DialogDescription>
                        </div>
                        <div className="form-body">

                        </div>
                        <div className="form-footer">
                            <button className="create-btn">Create</button>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* selecting file opens the dialog with file form selected */}
                {/* selecting folder opens the dialog with folder form selected */} 
            </form>
        </FormProvider>
    )
}

function DropdownSelector({setOpen}:{setOpen: Dispatch<SetStateAction<boolean>>}) {
    return (
        <DropMenu>
            <DropMenuTrigger asChild>
                <button type="button" className="dropdown-trigger">
                    <CirclePlus />
                    <span>New</span>
                    <ChevronDown /> 
                </button>
            </DropMenuTrigger>
            <DropMenuContent collisionPadding={14}>
                <DropMenuItem onClick={() => setOpen(true)}>
                    <Folder className="size-4 text-primary-700 stroke-1" />
                    Folder
                </DropMenuItem>
                <DropMenuItem onClick={() => setOpen(true)}>
                    <File className="size-4 text-primary-700 stroke-1" />
                    File
                </DropMenuItem>
            </DropMenuContent>
        </DropMenu>
    )
}