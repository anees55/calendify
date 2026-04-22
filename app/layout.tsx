import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Calendify",
  description: "A modern SaaS Meeting & Scheduling Dashboard with glassmorphism UI and real-time scheduling management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-background font-sans antialiased selection:bg-primary/20 selection:text-primary`}>
        {children}
        <Toaster position="top-right" theme="dark" />
      </body>
    </html>
  );
}
