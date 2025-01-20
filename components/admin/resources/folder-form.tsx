import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAddResource } from "@/lib/query-hooks/resources";
import { ZNewFolder } from "@/lib/schema";
import { IFolderTrace, INewFolder, IResourceFilter } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    folderTrace: IFolderTrace[],
    filter: IResourceFilter
}

export default function FolderForm(props:Props) {
    const { data: session } = useSession();
    const { mutate: addResource } = useAddResource(props.filter); // add resource function to create new resource
    
    const defaultValues = { name: "" };
    const form = useForm<INewFolder>({ resolver: zodResolver(ZNewFolder),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: INewFolder ) {
        const creatorID = session?.user?.id;
        if(!creatorID) throw new Error("Failed to create resources");
        
        const folderObject = {
            name: values.name,
            type: "folder",
            fileUrl: null,
            fileType: null,
            parentID: props.folderTrace.map(folder => folder.id),
            fileCount: 0,
            folderCount: 0,
            creatorID,
            status: "active",
            size: "0 KB",
        }

        addResource({resource: [folderObject]});

        props.setOpen(false);
    }

    useEffect(() => {
        if (props.open) {
            reset(defaultValues);
        }
    }, [props.open, reset]);

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
                            <button className="create-btn">
                                {!isSubmitting ? "create" : "creating"}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}