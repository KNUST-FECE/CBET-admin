import CreateForm from "@/components/admin/resources/create-form";
import DataContainer from "@/components/admin/resources/data-container";
import Filter from "@/components/admin/resources/filter";
import FolderSelector from "@/components/admin/resources/folder-selector";
import { IResourceFilter } from "@/lib/types";

export default function Page() {
    const filter: IResourceFilter = {};
    const folderID: string = "";
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <div id="info">
                    <h1>Resources</h1>
                    <FolderSelector folderID={folderID} />
                </div>
                <div id="action-buttons">
                    <CreateForm folderID={folderID} />
                </div>
            </section>
            <Filter filter={filter} />
            <DataContainer filter={filter} />
        </div>
    )
}