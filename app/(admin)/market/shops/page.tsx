import DataContainer from "@/components/admin/market/shops/data-container";
import { IShopFilter } from "@/lib/types"

export default function Page() {
    const filter:IShopFilter = {};

    return (
        <div id="shops-section">
            <DataContainer filter={filter} />
        </div>
    )
}