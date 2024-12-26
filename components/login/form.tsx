"use client";

import { ZLogin } from "@/lib/schema";
import { ILogin } from "@/lib/types";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { CircleAlert } from "lucide-react";

export default function Form() {
    const redirectUrl = useSearchParams().get("redirect");
    const error = useSearchParams().get("code");

    const form = useForm<ILogin>({
        resolver: zodResolver(ZLogin),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const { handleSubmit, register } = form;

    function onSubmit(values: ILogin ) {
        signIn("credentials", {...values, redirectTo: redirectUrl ||  "/"})
    }

    return (
        <FormProvider {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} id="login-email" placeholder="Email" />
                <input {...register("password")} type="password" id="login-password" placeholder="Password" />
                <button type="submit">Login</button>
                {error && (
                    <div>
                        <CircleAlert />
                        <p>{error}</p>
                    </div>
                )}
            </form>
        </FormProvider>
    )
}