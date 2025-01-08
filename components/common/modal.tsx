import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type Props = {
    trigger: JSX.Element;
    format: "popover" | "dialog" | "dropdown";
    children: React.ReactNode; 
}
export default function Modal({trigger, format, children}: Props) {

    switch (format) {
        case "popover": return <ModalPopover trigger={trigger}>{children}</ModalPopover>
        case "dialog": return <ModalDialog trigger={trigger}>{children}</ModalDialog>
        case "dropdown": return <ModalDropdown trigger={trigger}>{children}</ModalDropdown>
    }
};

function ModalPopover(props:Omit<Props, "format">) {
    return (
        <Popover>
            <PopoverTrigger asChild >
                {props.trigger}
            </PopoverTrigger>
            <PopoverContent collisionPadding={14} asChild>
                {props.children}
            </PopoverContent>
        </Popover> 
    )
}

function ModalDialog(props:Omit<Props, "format">) {
    return (
        <>{props.children}</> 
    )
}

function ModalDropdown(props:Omit<Props, "format">) {
    return (
        <>{props.children}</> 
    )
}