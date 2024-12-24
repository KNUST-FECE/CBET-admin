import Navigation from "@/components/admin/market/navigation";

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="market-container">
            <Navigation />
            {children}
        </div>
    );
}