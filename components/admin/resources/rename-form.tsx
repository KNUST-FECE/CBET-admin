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

export default function RenameForm(props: Props) {
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
                        <div> {/* left side of header */}
                            <label htmlFor="rename-all">rename all</label>
                            <input type="text" id="rename-all"  />
                            <button>
                                <X />
                            </button>
                        </div>
                        <div> {/* right side of header */}
                            <button>save</button>
                            <button>
                                <X />
                            </button>
                        </div>
                    </div>
                    <div className="form-body">
                        <label htmlFor="folder-name">
                            <p>This Name</p>
                            <input id="folder-name" {...register("name")} />
                        </label>
                        {props.selected.map(({id, name, type}) => ( 
                            <div key={id}>
                                {/* make list come from react hook form array */}
                                <div> {/* on the left */}
                                    <label htmlFor={id}>{name}</label>
                                    <input type="text" id={id} />
                                    <button>
                                        <X />
                                    </button>
                                </div>
                                <div>
                                    <button>
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