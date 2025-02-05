"use client";
import Folder from "@/components/icons/folder";
import FullFolder from "@/components/icons/full-folder";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAddResource, useGetFolderTrace } from "@/lib/query-hooks/resources";
import { ZNewFolder, ZResourceFilter } from "@/lib/schema";
import { INewFolder, IResource } from "@/lib/types";
import { getFilterObject } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";

export default function NewFolderButton() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: folderTrace } = useGetFolderTrace(filter.folder || "");
    const { mutate: addResource, data: result } = useAddResource(filter); // add resource function to create new resource
    
    const defaultValues = { name: "" };
    const form = useForm<INewFolder>({ resolver: zodResolver(ZNewFolder),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: INewFolder ) {
        const creatorID = session?.user?.id;
        if(!creatorID) throw new Error("Failed to create resources");
        
        const folderObject:Omit<IResource, "id" | "updatedAt" | "createdAt"> = {
            name: values.name,
            type: "folder",
            fileUrl: null,
            fileType: null,
            parentID: folderTrace?.map(folder => folder.id) || [],
            fileCount: 0,
            folderCount: 0,
            creatorID,
            status: "active",
            size: "0 KB",
        }

        addResource({resource: [folderObject]});
    }

    return (
        <Dialog onOpenChange={() => reset(defaultValues)}>
                <DialogTrigger asChild>
                    <button type="button" id="new-folder-trigger">
                        <Folder />
                        <span>New Folder</span> 
                    </button>
                </DialogTrigger>
                <DialogContent asChild id="new-folder-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-body">
                            <label htmlFor="folder-name">new folder</label>
                            <Folder className="icon" />
                            <input id="folder-name" {...register("name")} placeholder="New folder"/>
                            <div className="form-buttons">
                                <button className="form-submit">
                                    <Check />
                                </button>
                                <DialogClose className="form-close">
                                    <X />
                                    <span className="sr-only">Close</span>
                                </DialogClose>
                            </div>
                        </div>
                        <div className="form-footer">
                            <DialogTitle>New Folder</DialogTitle>
                            <DialogDescription>add a new folder to this directory</DialogDescription>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
    )
}