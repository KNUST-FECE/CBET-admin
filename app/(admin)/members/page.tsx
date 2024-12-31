import DataContainer from "@/components/admin/members/data-container";
import { IMemberFilter } from "@/lib/types";

export default function Page() {
    const filter: IMemberFilter = {};

    return (
        <div className="members-container">
            <section id="header-section">
                <h1>Members</h1>
            </section>
            <DataContainer filter={filter} />
        </div>
    )
}