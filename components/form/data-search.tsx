import { Search } from "lucide-react";
import Modal from "../common/modal";
import FilterButton from "../common/filter-button";

export default function DataSearch() {
    const props = {
        format: "popover" as "popover",
        trigger: <FilterButton id="data-filter" icon={Search} value="search" />
    }

    return (
        <Modal {...props}>
            <div className="space-y-2 !p-3">
                <h4 className="text-xs font-medium">Search</h4>
                <input type="text" className="w-full p-1 px-2 text-sm bg-transparent rounded-md border focus:outline-secondary-500" />
            </div>
        </Modal>
    )
}