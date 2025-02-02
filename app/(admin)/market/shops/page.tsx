import DataContainer from "@/components/admin/market/shops/data-container";
import Filter from "@/components/admin/market/shops/filter";
import { IShopFilter } from "@/lib/types"

export default function Page() {
    const filter:IShopFilter = {};

    return (
        <div id="shops-section">
            <Filter />
            <DataContainer filter={filter} />
        </div>
    )
}