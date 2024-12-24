import Navigation from "@/components/admin/blogs/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="blogs-container">
            <Navigation />
            {children}
        </div>
    );
}