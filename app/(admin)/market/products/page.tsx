import DataContainer from "@/components/admin/market/products/data-container";
import Filter from "@/components/admin/market/products/filter";
import { IProductFilter } from "@/lib/types";

export default function Page() {
    const filter: IProductFilter = {};

    return (
        <div id="products-section">
            <Filter />
            <DataContainer filter={filter} />
        </div>
    )
}