"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useModifyName } from "@/lib/query-hooks/resources";
import { ZRenameResource } from "@/lib/schema";
import { IRenameResource, IResourceFilter, IResourceType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    filter: IResourceFilter
    type: IResourceType
    id: string
    name: string
}

export default function RenameForm(props: Props) {
    const { mutate: modifyName } = useModifyName(props.filter);

    const defaultValues = { name: "" };
    const form = useForm<IRenameResource>({ resolver: zodResolver(ZRenameResource),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: IRenameResource ) {
        modifyName({id: props.id, name: values.name});
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
                            <DialogTitle>rename {props.type}</DialogTitle>
                            <DialogDescription>~ Rename {props.type} to something concise and relevant</DialogDescription>
                        </div>
                        <div className="form-body">
                            <label htmlFor="folder-name">
                                <p>{props.type} Name</p>
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