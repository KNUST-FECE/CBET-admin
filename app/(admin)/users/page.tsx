import DataContainer from "@/components/admin/users/data-container";
import Filter from "@/components/admin/users/filter";
import NewUserForm from "@/components/admin/users/new-user-form";
import { IUserFilter } from "@/lib/types";

export default function Page() {
    const filter: IUserFilter = {};

    return (
        <div className="users-container">
            <section id="header-section">
                <h1>Users</h1>
                <NewUserForm />
            </section>
            <Filter />
            <DataContainer filter={filter} />
        </div>
    )
}