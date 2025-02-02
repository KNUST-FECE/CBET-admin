"use client";

import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ZNewBlog } from "@/lib/schema";
import { INewBlog } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CirclePlus, X } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

export default function NewBlogForm() {
    // fetch selector role in form [{name, id}]
    // mutate function to add member

    const defaultValues = { name: "" };
    const form = useForm<INewBlog>({ resolver: zodResolver(ZNewBlog),defaultValues});
    const { handleSubmit, register, reset, formState: { isSubmitting } } = form;

    function onSubmit(values: INewBlog ) {}

    return (
        <FormProvider {...form}>
            <Dialog>
                <DialogTrigger asChild>
                    <button type="button" id="new-blog-form-trigger">
                        <CirclePlus />
                        <span>New Blog</span>
                    </button>
                </DialogTrigger>
                <DialogContent id="new-blog-form-content">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new blog</DialogTitle>
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