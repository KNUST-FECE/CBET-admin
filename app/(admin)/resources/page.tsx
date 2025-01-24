import DataContainer from "@/components/admin/resources/data-container";
import Filter from "@/components/admin/resources/filter";
import FormSelector from "@/components/admin/resources/form-selector";
import { FolderCrumbs } from "@/components/admin/resources/folder-crumbs";

export default function Page() {
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <div id="info">
                    <h1>Resources</h1>
                    <FolderCrumbs />
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