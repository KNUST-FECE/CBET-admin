"use client";

import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from "@/components/ui/dropdown-menu";
import { useGetFolderTrace } from "@/lib/query-hooks/resources";
import { _home, _resources } from "@/lib/routes";
import { ZResourceFilter } from "@/lib/schema";
import { getFilterObject } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export function FolderCrumbs() {
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: folderTrace } = useGetFolderTrace(filter.folder ?? "");

    if (!folderTrace || folderTrace.length === 0) {
        return (
            <Breadcrumb>
                <BreadcrumbList className="folder-crumbs">
                    <BreadcrumbItem>
                        <BreadcrumbPage>~ root</BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                </BreadcrumbList>
            </Breadcrumb>
        );
    }

    const lastFolder = folderTrace[folderTrace.length - 1];
    const parentFolders = folderTrace.slice(0, -1);

    return (
        <Breadcrumb>
            <BreadcrumbList className="folder-crumbs">
                <BreadcrumbItem>
                    <BreadcrumbLink href={_resources}>~ root</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />

                {parentFolders.length > 0 && (
                    <>
                        <BreadcrumbItem>
                            <DropMenu>
                                <DropMenuTrigger>
                                    <BreadcrumbEllipsis />
                                    <span className="sr-only">Toggle menu</span>
                                </DropMenuTrigger>
                                <DropMenuContent align="start" id="folder-crumbs-dropmenu">
                                    {parentFolders.map((folder) => (
                                        <DropMenuItem key={folder.id}>
                                            <BreadcrumbLink href={`${_resources}?folder=${folder.id}`}>
                                                {folder.name}
                                            </BreadcrumbLink>
                                        </DropMenuItem>
                                    ))}
                                </DropMenuContent>
                            </DropMenu>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}

                {lastFolder && (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbPage>{lastFolder.name}</BreadcrumbPage>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                    </>
                )}
            </BreadcrumbList>
        </Breadcrumb>
    );
}