
"use client";

export default function PasswordForm() {
    return (
        <section id="password-section">
            <div className="section-head">
                <h2>Change Password</h2>
            </div>
            <div className="section-form">
                <form>
                    <div>
                        <label htmlFor="profile-name">old password</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label htmlFor="new-password">new password</label>
                        <div>
                            <input type="text" id="new-password" />
                            <input type="text" id="confirm-password" />
                        </div>
                    </div>
                    <div>
                        <button>save</button>
                    </div>
                </form>
            </div>
        </section>
    )
}