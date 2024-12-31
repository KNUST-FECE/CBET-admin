import DataContainer from "@/components/admin/resources/data-container";
import { IResourceFilter } from "@/lib/types";

export default function Page() {
    const filter: IResourceFilter = {};
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <h1>Resources</h1>
            </section>
            <DataContainer filter={filter} />
        </div>
    )
}