import { Providers } from "@/components/common/providers";
import localFont from 'next/font/local';
import "./globals.css";

const openSans = localFont({
  src: [
    {
      path: "./(fonts)/OpenSans-Light.ttf",
      weight: "300"
    },
    {
      path: "./(fonts)/OpenSans-Regular.ttf",
      weight: "400"
    },
    {
      path: "./(fonts)/OpenSans-Medium.ttf",
      weight: "500"
    },
    {
      path: "./(fonts)/OpenSans-SemiBold.ttf",
      weight: "600"
    },
    {
      path: "./(fonts)/OpenSans-Bold.ttf",
      weight: "700"
    },
    {
      path: "./(fonts)/OpenSans-ExtraBold.ttf",
      weight: "800"
    },
  ],
  variable: "--font-open-sans"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" className={`${openSans.variable}`}>
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
