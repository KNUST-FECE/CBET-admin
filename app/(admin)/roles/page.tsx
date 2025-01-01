import DataContainer from "@/components/admin/roles/data-container";

export default function Page() {
    return (
        <div className="roles-container">
            <section id="header-section">
                <h1>Roles</h1>
            </section>
            <DataContainer />
        </div>
    )
}