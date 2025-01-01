import DataContainer from "@/components/admin/reports/data-container";
import { IReportFilter } from "@/lib/types";

export default function Page() {
    const filter:IReportFilter = {};

    return (
        <div className="reports-container">
            <section id="header-section">
                <h1>Reports</h1>
            </section>
            <DataContainer filter={filter} />
        </div>
    )
}