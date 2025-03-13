"use client";
import { DropMenu, DropMenuContent, DropMenuItem, DropMenuTrigger } from '@/components/ui/dropdown-menu';
import { CheckCircleIcon, LucideFileWarning, RefreshCw, Trash2Icon, XIcon } from 'lucide-react';
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
import { getFileDetails, getFilterObject } from '@/lib/utils';
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
        setFileStates((fileStates) =>
            fileStates.map((fileState) =>
                fileState.key === key
                ? { ...fileState, progress }  // Update the progress for the matching key
                : fileState                   // Keep other files unchanged
            )
        );
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
                progress: "PENDING",
                abortController: new AbortController()
            }));
            setFileStates([...fileStates, ...addedFiles]);
            await Promise.all(
                addedFiles.map(async (addedFileState) => {
                    try {
                        const res = await edgestore.publicFiles.upload({
                            file: addedFileState.file,
                            signal: addedFileState.abortController?.signal,
                            options: {
                                temporary: true
                            },
                            onProgressChange: async (progress:any) => {
                                updateFileProgress(addedFileState.key, progress);
                                if (progress === 100) {
                                    await new Promise((resolve) => setTimeout(resolve, 1000));
                                    updateFileProgress(addedFileState.key, 'COMPLETE');
                                }
                            },
                        });
                        const {name, type} = getFileDetails(addedFileState.file.name)
                        const fileObject: Omit<IResource, "updatedAt" | "createdAt" | "id"> = {
                            name,
                            type: "file",
                            fileType: type,
                            size: formatFileSize(res.size),
                            fileUrl: res.url,
                            creatorID,
                            parentID: folderTrace?.map(folder => folder.id) || [],
                            fileCount: 0,
                            folderCount: 0,
                            status: "active"
                        }
                        addResource({resource: [fileObject]});
                    } catch (err) {
                        updateFileProgress(addedFileState.key, 'ERROR');
                    } finally {
                        await new Promise((resolve) => setTimeout(resolve, 5000));
                        setFileStates(states => states.filter(state => state.key !== addedFileState.key));
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
                <span>New File</span>
            </MultiFileDropzone>
            <DropMenu>
                <DropMenuTrigger id='upload-status-trigger' disabled={!fileStates.length}>
                    <RefreshCw />
                    <p id="total-active-uploads">
                        {fileStates.filter(state => state.progress === "PENDING" || typeof state.progress === "number").length}
                    </p>
                </DropMenuTrigger>
                <DropMenuContent id='uploader-status-content' collisionPadding={24}>
                    {fileStates.map(({ file, abortController, progress, key }) => (
                        <DropMenuItem key={key}>
                            <div className='above-section'>
                                <FileIcon className='icon-svg' />
                                <div className='info-container'>
                                    <p>{file.name}</p>
                                    <span>{formatFileSize(file.size)}</span>
                                </div>
                                <div className='actions-container'>
                                    {progress === 'PENDING' && (
                                        <button type="button" className="remove-btn" onClick={() => setFileStates(fileStates.filter((state) => state.key !== key ))}>
                                            <Trash2Icon />
                                        </button>
                                    )} 
                                    {progress === 'ERROR' && (
                                        <div className="error-svg-container">
                                            <LucideFileWarning />
                                        </div>
                                    )} 
                                    {typeof progress === 'number' && abortController && (
                                        <button
                                            type="button"
                                            className="abort-btn"
                                            disabled={progress === 100}
                                            onClick={() => {abortController.abort()}}
                                        >
                                            <XIcon className="abort-svg" />
                                        </button>
                                    )}
                                    {progress === 'COMPLETE' && (
                                        <div className="complete-svg-container">
                                            <CheckCircleIcon />
                                        </div>
                                    )}
                                </div>
                            </div>
                            {typeof progress === 'number' && (
                                <div className="below-section">
                                    <div className="progress-container">
                                        <div
                                            className="progress-bar"
                                            style={{
                                                width: progress ? `${progress}%` : '0%',
                                            }}
                                        />
                                    </div>
                                    <p>{Math.round(progress)}%</p>
                                </div>
                            )}
                        </DropMenuItem>
                    ))}
                </DropMenuContent>
            </DropMenu>
        </div>
    )
}