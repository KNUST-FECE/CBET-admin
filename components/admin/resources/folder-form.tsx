import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { ZNewFolder } from "@/lib/schema";
import { INewFolder } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { FormProvider, useForm } from "react-hook-form";

type TriggerProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export default function FolderForm(props:TriggerProps) {
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
                            <DialogDescription>~ Help organise resources with folders</DialogDescription>
                        </div>
                        <div className="form-body">
                            <label htmlFor="folder-name">
                                <p>Folder Name</p>
                                <input id="folder-name" {...register("name")} />
                            </label>
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