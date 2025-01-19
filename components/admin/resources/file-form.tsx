import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAddResource, useGetFolderTrace } from "@/lib/query-hooks/resources";
import { ZNewFile } from "@/lib/schema";
import { INewFile, IResource, IResourceFilter } from "@/lib/types";
import { getFileMeta, getFilterObject, saveFile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {useDropzone} from 'react-dropzone';

type TriggerProps = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}
type CardProps = {
    file: File
}

export default function FileForm(props:TriggerProps) {
    const searchParams = useSearchParams();
    const filter = getFilterObject<IResourceFilter>(searchParams); // get the page filter object
    const { data: folderTrace } = useGetFolderTrace(filter.folder || ""); // get the parent folders of current folder up to the root folder
    const { mutate: addResource } = useAddResource(filter); // add resource function to create new resource
    const form = useForm<INewFile>({
        resolver: zodResolver(ZNewFile),
        defaultValues: {
            files: [],
        }
    });
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Do something with the files
      }, [])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
    const { handleSubmit, register, getValues } = form;
    const files = getValues("files");

    async function onSubmit(values: INewFile ) {
        const fileList: Omit<IResource, "id">[] = [];

        for (const file of values.files) {
            const { name, fileType, size } = getFileMeta(file);
            const { fileUrl } = await saveFile(file);
            const creatorID = "098956789957687"; // get from authjs using the useSession hook
            const parentID: string[] = []; // useSearchParams to get FolderID and get its parentID list and append the folderID 
            const fileObject = {
                name,
                type: "file",
                fileType,
                size,
                fileUrl,
                creatorID,
                parentID,
                fileCount: 0,
                folderCount: 0,
                status: "active",
                updatedAt: Date.now().toString(),
                createdAt: Date.now().toString(),
            }
            fileList.push(fileObject);
        };

        addResource({resource: fileList});
    }

    return (
        <FormProvider {...form}>
            <Dialog open={props.open} onOpenChange={props.setOpen}>
                <DialogContent asChild id="new-file-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <DialogClose className="close">
                            <X />
                            <span className="sr-only">Close</span>
                        </DialogClose>
                        <div className="form-header">
                            <DialogTitle>new file</DialogTitle>
                            <DialogDescription>~ Store data such as PDF, DOCX, PNG etc.</DialogDescription>
                        </div>
                        <div {...getRootProps()} className="form-body">
                            <input {...getInputProps()} />
                            {files.length !== 0 ? 
                                (
                                    <div className="files-container">
                                        {files.map(file => (
                                            <FileCard file={file} />
                                        ))}
                                    </div>
                                ): (
                                    <div className="relative-upload-message">
                                        <div>
                                            <UploadCloud />
                                        </div>
                                        <p>Drag n Drop files here or click to select files.</p>
                                    </div>
                                )
                            }
                            {isDragActive && (
                                <div className="absolute-upload-message">
                                    <div>
                                        <div id="upload-svg-container">
                                            <div className="circle one" />
                                            <div className="circle two" />
                                            <div className="circle three" />
                                            <div className="upload-svg">
                                                <UploadCloud />
                                            </div>
                                        </div>
                                        <p>Upload your file</p>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="form-footer">
                            <button className="create-btn">Create</button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}

function FileCard(props: CardProps) {
    return (
        <div>
            file
        </div>
    )
}