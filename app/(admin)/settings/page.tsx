import DetailsForm from "@/components/admin/settings]/details-form";
import PasswordForm from "@/components/admin/settings]/password-form";

export default function Page() {
    return (
        <div className="settings-container">
            <section id="header-section">
                <h1>Settings</h1>
            </section>
            <DetailsForm />
            <PasswordForm />
        </div>
    )
}