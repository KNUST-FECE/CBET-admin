import DataContainer from "@/components/admin/resources/data-container";
import Filter from "@/components/admin/resources/filter";
import FolderSelector from "@/components/admin/resources/folder-selector";
import { IResourceFilter } from "@/lib/types";
import FormSelector from "@/components/admin/resources/form-selector";

export default function Page() {
    const filterer: IResourceFilter = {
        folder: null,
        search: null,
        limit: null,
        page: null,
        sort: null,
        filter: null
    };
    
    return (
        <div className="resource-container">
            <section id="header-section">
                <div id="info">
                    <h1>Resources</h1>
                    <FolderSelector folderID={filterer.folder || ""} />
                </div>
                <div id="action-buttons">
                    <FormSelector folderID={filterer.folder || ""} />
                </div>
            </section>
            <Filter filter={filterer} />
            <DataContainer filter={filterer} />
        </div>
    )
}