import { ArrowUpDown } from "lucide-react"
import Modal from "../common/modal"
import FilterButton from "../common/filter-button"

export default function DataSort() {
    const props = {
        format: "popover" as "popover",
        trigger: <FilterButton id="data-filter" icon={ArrowUpDown} value="sort" />
    }

    return (
        <Modal {...props}>
            <div className="space-y-2 !p-3 !w-44">
                <h4 className="text-xs font-medium">Sort</h4>
                <div className="text-xs space-y-2 font-medium">
                    <p>name</p>
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