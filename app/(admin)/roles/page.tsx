import DataContainer from "@/components/admin/roles/data-container";
import NewRoleForm from "@/components/admin/roles/new-role-form";

export default function Page() {
    return (
        <div className="roles-container">
            <section id="header-section">
                <h1>Roles</h1>
                <NewRoleForm />
            </section>
            <DataContainer />
        </div>
    )
}