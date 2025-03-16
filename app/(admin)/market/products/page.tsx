import DataContainer from "@/components/admin/market/products/data-container";
import { IProductFilter } from "@/lib/types";

export default function Page() {
    const filter: IProductFilter = {};

    return (
        <div id="products-section">
            <DataContainer filter={filter} />
        </div>
    )
}