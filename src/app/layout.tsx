import type { Metadata, Viewport } from "next";
import { Sidebar } from "@/components/ui/Sidebar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Math Game",
  description: "Interactive math game for practicing rounding numbers",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="playground-light">
      <body className="antialiased">
        <Sidebar>
          {children}
        </Sidebar>
      </body>
    </html>
  );
}
