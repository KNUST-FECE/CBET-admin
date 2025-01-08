import { FilterIcon } from "lucide-react"
import Modal from "../common/modal"
import FilterButton from "../common/filter-button"

export default function DataFilter() {
    const props = {
        format: "popover" as "popover",
        trigger: <FilterButton id="data-filter" icon={FilterIcon} value="filter" />
    }

    return (
        <Modal {...props} >
            <div className="space-y-2 !p-3">
                <h4 className="text-xs font-medium">Filter</h4>
                <div className="text-xs space-y-2 font-medium">
                    <p>type</p>
                    <p>fileType</p>
                    <p>size</p>
                    <p>status</p>
                    <p>createdAt</p>
                    <p>updatedAt</p>
                </div>
            </div>
        </Modal>
    )
}