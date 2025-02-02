import DataContainer from "@/components/admin/reports/data-container";
import Filter from "@/components/admin/reports/filter";
import { IReportFilter } from "@/lib/types";

export default function Page() {
    const filter:IReportFilter = {};

    return (
        <div className="reports-container">
            <section id="header-section">
                <h1>Reports</h1>
            </section>
            <Filter />
            <DataContainer filter={filter} />
        </div>
    )
}