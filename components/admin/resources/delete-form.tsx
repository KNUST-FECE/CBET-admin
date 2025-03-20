"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useModifyName } from "@/lib/query-hooks/resources";
import { ZRenameResource } from "@/lib/schema";
import { IRenameResource, IResource, IResourceFilter, IResourceType } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    filter: IResourceFilter
    selected: IResource[]
}

export default function DeleteForm(props: Props) {
    const { mutate: modifyName } = useModifyName(props.filter);

    const defaultValues = { name: "" };
    const form = useForm<IRenameResource>({ resolver: zodResolver(ZRenameResource),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: IRenameResource ) {
        modifyName({id: "", name: ""});
        props.setOpen(false);
    }

    useEffect(() => {
        if (props.open) {
            reset(defaultValues);
        }
    }, [props.open, reset]);

    return (
        <Dialog open={props.open} onOpenChange={props.setOpen}>
            <DialogContent asChild id="rename-resource-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-header">
                        <div>
                            <label htmlFor="rename-all">rename all</label>
                            <input type="text" id="rename-all" placeholder="rename all" />
                            <button type="button" id="cancel-rename-all">
                                <X />
                            </button>
                        </div>
                        <div>
                            <button id="save-rename-action">
                                save
                            </button>
                            <button type="button" id="close-form-dialog">
                                <X />
                            </button>
                        </div>
                    </div>
                    <div className="form-body">
                        {props.selected.map(({id, name, type}) => ( 
                            <div key={id} className="resource-rename-item">
                                {/* make list come from react hook form array */}
                                <div>
                                    <label htmlFor={id}>{name}</label>
                                    <input type="text" id={id} value={name} />
                                    <button type="button" className="item-rename-cancel">
                                        <X />
                                    </button>
                                </div>
                                <div>
                                    <button type="button" className="item-rename-remove">
                                        <X />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="form-footer">
                        <DialogTitle>Rename {props.selected.length} resources</DialogTitle>
                        <DialogDescription>rename the following resources</DialogDescription>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}