import DataContainer from "@/components/admin/users/data-container";
import { IUserFilter } from "@/lib/types";

export default function Page() {
    const filter: IUserFilter = {};

    return (
        <div className="users-container">
            <section id="header-section">
                <h1>Users</h1>
            </section>
            <DataContainer filter={filter} />
        </div>
    )
}