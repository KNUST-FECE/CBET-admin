import { Search } from "lucide-react";
import { DropMenu, DropMenuContent, DropMenuTrigger } from "../ui/dropdown-menu";

type Props = {
    control: any
}

export default function SearchField(props:Props) {

    return (
        <DropMenu>
            <DropMenuTrigger className="drop-menu search-field-trigger" type="button">
                <Search />
                <span>search</span>
            </DropMenuTrigger>
            <DropMenuContent id="search-field-content">
                <div>
                    <h4>search</h4>
                </div>
                <div>
                    <input type="text" placeholder="search here..." />
                </div>
            </DropMenuContent>
        </DropMenu>
    )
}