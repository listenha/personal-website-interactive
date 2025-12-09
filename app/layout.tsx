import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Masthead from "@/components/layout/Masthead";
import Footer from "@/components/layout/Footer";
import { siteConfig } from "@/data/siteConfig";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale} className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Masthead />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
