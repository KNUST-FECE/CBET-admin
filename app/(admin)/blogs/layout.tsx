import Navigation from "@/components/admin/blogs/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="blogs-container">
            <section id="navigation-container">
                <section id="header-section">
                    <h1>Blogs</h1>
                </section>
                <Navigation />
            </section>
            {children}
        </div>
    );
}