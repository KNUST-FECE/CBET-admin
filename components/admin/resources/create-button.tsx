
type Props = {
    folderID: string
}

export default function Createbutton(props: Props) {
    return (
        <div id="create-button">
            create file/folder
            {/* TODO: a radix select to create file/folder */}
            {/* selecting file opens the dialog form with file form selected */}
            {/* selecting folder opens the dialog form with folder form selected */}
        </div>
    )
}