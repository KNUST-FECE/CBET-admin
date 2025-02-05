import DataContainer from "@/components/admin/resources/data-container";
import Filter from "@/components/admin/resources/filter";
import { FolderCrumbs } from "@/components/admin/resources/folder-crumbs";
import NewFileButton from "@/components/admin/resources/new-file-button";
import NewFolderButton from "@/components/admin/resources/new-folder-button";

export default function Page() {
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <div id="info">
                    <h1>Resources</h1>
                    <FolderCrumbs />
                </div>
                <div id="action-buttons">
                    <NewFileButton />
                    <NewFolderButton />
                </div>
            </section>
            <Filter />
            <DataContainer />
        </div>
    )
}