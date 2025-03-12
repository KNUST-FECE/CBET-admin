"use client";

export default function DetailsForm() {
    return (
        <section id="details-section">
            <div className="section-head">
                <h2>Profile Details</h2>
            </div>
            <div className="section-form">
                <form>
                    <div>
                        <label htmlFor="profile-name">name</label>
                        <input type="text" id="profile-name" />
                    </div>
                    <div>
                        <label htmlFor="profile-email">email</label>
                        <input type="email" id="profile-email" />
                    </div>
                </form>
            </div>
        </section>
    )
}