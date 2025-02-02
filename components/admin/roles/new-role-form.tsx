"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ZNewRole } from "@/lib/schema";
import { INewRole } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewRoleForm() {
    // mutate function to add role

    const defaultValues = { name: "" };
    const form = useForm<INewRole>({ resolver: zodResolver(ZNewRole),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: INewRole ) {}

    return (
        <FormProvider {...form}>
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" id="new-role-form-trigger">
                        <CirclePlus />
                        <span>New Role</span>
                    </button>
                </DialogTrigger>
                <DialogContent id="new-role-form-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new role</DialogTitle>
                            <DialogDescription>Add a new role</DialogDescription>
                        </div>
                        <div className="form-body"></div>
                        <div className="form-footer"></div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}