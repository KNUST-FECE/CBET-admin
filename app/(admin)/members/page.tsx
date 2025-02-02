import DataContainer from "@/components/admin/members/data-container";
import Filter from "@/components/admin/members/filter";
import NewMemberForm from "@/components/admin/members/new-member-form";
import { IMemberFilter } from "@/lib/types";

export default function Page() {
    const filter: IMemberFilter = {};

    return (
        <div className="members-container">
            <section id="header-section">
                <h1>Members</h1>
                <NewMemberForm />
            </section>
             <Filter />
            <DataContainer filter={filter} />
        </div>
    )
}