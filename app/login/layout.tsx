import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Login | CBET Platform",
    description: "Login to access the CBET Platform",
  };

export default function Layout({ children }: Readonly<{ children: React.ReactNode; }>) {
    return (
        <div className="login-container">
            {children}
        </div>
    );
}