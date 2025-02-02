"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ZNewMember, ZNewUser } from "@/lib/schema";
import { INewMember, INewUser } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewUserForm() {
    // mutate function to add member

    const defaultValues = { username: "" };
    const form = useForm<INewUser>({ resolver: zodResolver(ZNewUser),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: INewUser ) {}

    return (
        <FormProvider {...form}>
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" id="new-member-form-trigger">
                        <CirclePlus />
                        <span>New User</span>
                    </button>
                </DialogTrigger>
                <DialogContent id="new-member-form-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new user</DialogTitle>
                            <DialogDescription>~ Help organise resources with folders</DialogDescription>
                        </div>
                        <div className="form-body"></div>
                        <div className="form-footer"></div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}