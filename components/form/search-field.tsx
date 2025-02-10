import { useFormContext } from "react-hook-form";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";

type Props = {
    fieldKey: string
}

export default function SearchField(props:Props) {
    const { register } = useFormContext();

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu search-field-trigger" type="button">
                <span>search</span>
            </DropMenuTrigger>
            <DropMenuContent id="search-field-content">
                <div>
                    <h4>search</h4>
                </div>
                <div>
                    <input type="text" {...register("search")} placeholder="search here..." />
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}