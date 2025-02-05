"use client";
import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from '@/components/ui/dropdown-menu';
import { RefreshCw } from 'lucide-react';
import { useState } from 'react';
import MultiFileDropzone, { FileState } from '@/components/common/multi-file-dropzone';
import FileIcon from '@/components/icons/file';
import { DropzoneOptions } from 'react-dropzone';
import { ERROR_MESSAGES } from '@/lib/constants';
import { useEdgeStore } from '@/lib/edgestore';
import { useSession } from 'next-auth/react';
import { useAddResource, useGetFolderTrace } from '@/lib/query-hooks/resources';
import { ZResourceFilter } from '@/lib/schema';
import { useSearchParams } from 'next/navigation';
import { getFilterObject } from '@/lib/utils';
import { IResource } from '@/lib/types';
import { formatFileSize } from '@edgestore/react/utils';

export default function NewFileButton() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const filter = getFilterObject(searchParams, ZResourceFilter);
    const { data: folderTrace } = useGetFolderTrace(filter.folder || "");
    const { mutate: addResource } = useAddResource(filter);
    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const [customError, setCustomError] = useState<string>();

    const { edgestore } = useEdgeStore();
    const creatorID = session?.user?.id;

    const dropOptions:Omit<DropzoneOptions, 'disabled'> = {
        noDrag: true,
    }

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
            const newFileStates = structuredClone(fileStates);
            const fileState = newFileStates.find(fs => fs.key === key);
            if (fileState) fileState.progress = progress;

            return newFileStates;
        });
    }

    const onDrop = async(acceptedFiles:File[]) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (dropOptions.maxFiles && fileStates.length + files.length > dropOptions.maxFiles) {
            setCustomError(ERROR_MESSAGES.tooManyFiles(dropOptions.maxFiles));
            return;
        }
        if(!creatorID) {
            setCustomError("File upload denied");
            return;
        };
        if (files) {
            const addedFiles = files.map<FileState>((file) => ({
                file,
                key: Math.random().toString(36).slice(2),
                progress: 'PENDING',
            }));
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
                addedFiles.map(async (addedFileState) => {
                    try {
                        const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            options: {
                                temporary: true
                            },
                            onProgressChange: async (progress) => {
                                updateFileProgress(addedFileState.key, progress);
                                if (progress === 100) {
                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                }
                            },
                        });
                        const fileObject: Omit<IResource, "updatedAt" | "createdAt" | "id"> = {
                            name: addedFileState.file.name,
                            type: "file",
                            fileType: addedFileState.file.type,
                            size: formatFileSize(res.size),
                            fileUrl: res.url,
                            creatorID,
                            parentID: folderTrace?.map(folder => folder.id) || [],
                            fileCount: 0,
                            folderCount: 0,
                            status: "active"
                        }
                        console.log(fileObject);
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        setFileStates(states => states.filter(state => state.key !== addedFileState.key));
                    } catch (err) {
                        updateFileProgress(addedFileState.key, 'ERROR');
                    }
                })
            );
        }
    }
    
    return (
        <div id="new-file-button-container">
            <MultiFileDropzone 
                id="file-input-trigger" 
                dropOptions={{
                    onDrop,
                    ...dropOptions
                }}
            >
                <FileIcon />
                <span>New Filesss</span>
            </MultiFileDropzone>
            <DropMenu>
                <DropMenuTrigger id='upload-status-trigger' disabled={!fileStates.length}>
                    <RefreshCw />
                    <p id="total-active-uploads">
                        {fileStates.filter(state => state.progress === "PENDING" || typeof state.progress === "number").length}
                    </p>
                </DropMenuTrigger>
                <DropMenuContent id='uploader-status-content'>
                    {fileStates.map(({ file, abortController, progress, key }) => (
                        <DropMenuItem key={key} className="flex flex-col !justify-start !items-start space-y-1 p-2 border rounded">
                            <span>{file.name}</span>
                            <progress value={progress} max="100" className="w-32"></progress>
                            <span>{progress}%</span>
                            <span className={`text-sm ${progress === 'COMPLETE' ? 'text-green-500' : 'text-blue-500'}`}>
                                {progress}
                            </span>
                        </DropMenuItem>
                    ))}
                    {/* <div key={i} className="flex h-16 w-full flex-col justify-center rounded border border-gray-300 px-4 py-2">
                        <div className="flex items-center gap-2 text-gray-500 dark:text-white">
                            <FileIcon size="30" className="shrink-0" />
                            <div className="min-w-0 text-sm">
                                <div className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                                    {file.name}
                                </div>
                                <div className="text-xs text-gray-400 dark:text-gray-400">
                                    {formatFileSize(file.size)}
                                </div>
                            </div>
                            <div className="grow" />
                            <div className="flex w-12 justify-end text-xs">
                                {progress === 'PENDING' && (
                                    <button
                                        type="button"
                                        className="rounded-md p-1 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        onClick={() => {
                                            void onChange?.(
                                                value.filter((_, index) => index !== i),
                                            );
                                        }}
                                    >
                                    <Trash2Icon className="shrink-0" />
                                    </button>
                                )} 
                                {progress === 'ERROR' && (
                                    <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
                                )} 
                                {typeof progress === 'number' && (
                                    <div className="flex flex-col items-end gap-0.5">
                                    {abortController && (
                                        <button
                                        type="button"
                                        className="rounded-md p-0.5 transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        disabled={progress === 100}
                                        onClick={() => {
                                            abortController.abort();
                                        }}
                                        >
                                        <XIcon className="h-4 w-4 shrink-0 text-gray-400 dark:text-gray-400" />
                                        </button>
                                    )}
                                    <div>{Math.round(progress)}%</div>
                                    </div>
                                )} 
                                {progress === 'COMPLETE' && (
                                    <CheckCircleIcon className="shrink-0 text-green-600 dark:text-gray-400" />
                                )}
                            </div>
                        </div>
                        {typeof progress === 'number' && (
                            <div className="relative h-0">
                                <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                                        style={{
                                            width: progress ? `${progress}%` : '0%',
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </div> */}
                </DropMenuContent>
            </DropMenu>
        </div>
    )
}