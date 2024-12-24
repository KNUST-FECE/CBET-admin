import Header from "@/components/admin/header";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Home | CBET Platform",
    description: "Admin access to the CBET Platform",
  };

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="admin-container">
            <Header />
            <main>
                {children}
            </main>
        </div>
    );
}