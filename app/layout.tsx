import { Providers } from "@/components/common/providers";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <head>
        <meta name="apple-mobile-web-app-title" content="CBET Platform" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
