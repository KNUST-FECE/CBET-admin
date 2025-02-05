import { ERROR_MESSAGES } from "@/lib/constants";
import { formatFileSize } from "@edgestore/react/utils";
import { ReactNode, useMemo, useState } from "react";
import { DropzoneOptions, DropzoneState, useDropzone } from "react-dropzone";

export type FileState = {
    file: File;
    key: string;
    progress: 'PENDING' | 'COMPLETE' | 'ERROR' | number;
    abortController?: AbortController;
};

type Props = {
  className?: string;
  id?: string;
  children: ReactNode;
  disabled?: boolean;
  dropOptions?: Omit<DropzoneOptions, 'disabled'>;
};

export default function MultiFileDropzone(props:Props) {
    const { dropOptions, className, children, disabled, id } = props;

    const { getInputProps, getRootProps, fileRejections } = useDropzone({
        disabled,
        ...dropOptions,
    });

    const errorMessage = useMemo(() => {
        if (fileRejections[0]) {
            const { errors } = fileRejections[0];
            switch (errors[0]?.code) {
                case 'file-too-large': return ERROR_MESSAGES.fileTooLarge(dropOptions?.maxSize ?? 0);
                case 'file-invalid-type': return ERROR_MESSAGES.fileInvalidType();
                case 'too-many-files': ERROR_MESSAGES.tooManyFiles(dropOptions?.maxFiles ?? 0);
                default: return ERROR_MESSAGES.fileNotSupported();
            }
        }
        return undefined;
    }, [fileRejections, dropOptions]);

    // use useEffect to render error sonner
    // {errorMessage} 

    return (
        <div {...getRootProps({className, id})}>
            <input {...getInputProps()} />
            {children}
        </div>
    )
}