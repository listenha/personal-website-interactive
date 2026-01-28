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
  metadataBase: new URL(siteConfig.url),
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.title,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.name,
    url: siteConfig.url,
    sameAs: [
      siteConfig.author.github,
      siteConfig.author.linkedin?.startsWith("http")
        ? siteConfig.author.linkedin
        : siteConfig.author.linkedin
        ? `https://www.linkedin.com/in/${siteConfig.author.linkedin}`
        : null,
      siteConfig.author.school,
    ].filter(Boolean),
  };

  return (
    <html lang={siteConfig.locale} className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Masthead />
        <main className="min-h-screen bg-white dark:bg-gray-900">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
