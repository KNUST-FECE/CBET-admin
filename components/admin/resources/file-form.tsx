import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useAddResource } from "@/lib/query-hooks/resources";
import { ZNewFile } from "@/lib/schema";
import { IFolderTrace, INewFile, IResource, IResourceFilter } from "@/lib/types";
import { getFileMeta, saveFile } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {FileWithPath, useDropzone} from 'react-dropzone';
import { useSession } from "next-auth/react";

type Props = {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>,
    folderTrace: IFolderTrace[],
    filter: IResourceFilter
}
type CardProps = {
    file: File
}

export default function FileForm(props:Props) {
    const { data: session } = useSession();
    const { mutate: addResource } = useAddResource(props.filter); // add resource function to create new resource

    const defaultValues = { files: [] };
    const form = useForm<INewFile>({ resolver: zodResolver(ZNewFile), defaultValues });
    const { handleSubmit, control, reset } = form;
    const { fields, append, remove } = useFieldArray({ control, name: "files" });

    const onDrop = useCallback((acceptedFiles: readonly FileWithPath[]) => {
        const filesToAdd = acceptedFiles.map((file) => ({ file: file}));
        append(filesToAdd);
    }, [append])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    async function onSubmit(values: INewFile ) {
        const fileList = [];
        const creatorID = session?.user?.id;
        const parentID: string[] = []; // useSearchParams to get FolderID and get its parentID list and append the folderID 

        if(!creatorID) throw new Error("Failed to create resources");

        for (const item of values.files) {
            const { name, fileType, size } = getFileMeta(item.file);
            const { fileUrl } = await saveFile(item.file);
            const fileObject: Omit<IResource, "updatedAt" | "createdAt" | "id"> = {
                name,
                type: "file",
                fileType,
                size,
                fileUrl,
                creatorID,
                parentID,
                fileCount: 0,
                folderCount: 0,
                status: "active"
            }
            fileList.push(fileObject);
        };

        addResource({resource: fileList});
    }

    useEffect(() => {
        if (props.open) {
            reset(defaultValues);
        }
    }, [props.open, reset]);

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
                            {fields && fields.length !== 0 ? 
                                (
                                    <div className="files-container">
                                        {fields.map(item => (
                                            <FileCard key={item.id} file={item.file} />
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
                                    <div id="upload-svg-container">
                                        <div className="circle one" />
                                        <div className="circle two" />
                                        <div className="circle three" />
                                        <div className="upload-svg">
                                            <UploadCloud />
                                        </div>
                                    </div>
                                    <p>Drop files here</p>
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
        <div className="file-container" onClick={(e) => e.stopPropagation()}>
            file
        </div>
    )
}