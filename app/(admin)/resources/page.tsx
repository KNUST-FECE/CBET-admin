import DataContainer from "@/components/admin/resources/data-container";
import Filter from "@/components/admin/resources/filter";
import FolderSelector from "@/components/admin/resources/folder-selector";
import { IQuery, IResourceFilter } from "@/lib/types";
import FormSelector from "@/components/admin/resources/form-selector";

export default function Page() {
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <div id="info">
                    <h1>Resources</h1>
                    <FolderSelector />
                </div>
                <div id="action-buttons">
                    <FormSelector />
                </div>
            </section>
            <Filter />
            <DataContainer />
        </div>
    )
}