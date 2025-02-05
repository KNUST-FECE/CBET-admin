"use client";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
        },
    },
});

export function Providers({ children }:{ children: React.ReactNode}) {

    return (
        <QueryClientProvider client={queryClient}>
            <EdgeStoreProvider>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </EdgeStoreProvider>
        </QueryClientProvider>
    )
}