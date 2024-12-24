
export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="market-container">
            <p>NAVIGATION</p>
            {children}
        </div>
    );
}