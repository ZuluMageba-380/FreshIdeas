import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fresh Ideas ZA — Design. Build. Elevate.",
  description:
    "Fresh Ideas ZA is a premium creative and digital agency delivering branding, web development, media production, and strategic growth solutions for ambitious brands and institutions.",
  keywords: [
    "Fresh Ideas ZA",
    "creative agency",
    "digital agency",
    "South Africa",
    "branding",
    "web development",
    "media production",
    "drone aerial",
    "marketing",
    "school management systems",
  ],
  authors: [{ name: "Fresh Ideas ZA" }],
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Fresh Ideas ZA — Design. Build. Elevate.",
    description:
      "Creative Intelligence for Modern Brands. Premium creative and digital agency.",
    siteName: "Fresh Ideas ZA",
    type: "website",
    locale: "en_ZA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fresh Ideas ZA — Design. Build. Elevate.",
    description:
      "Creative Intelligence for Modern Brands. Premium creative and digital agency.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Fresh Ideas ZA",
  description:
    "Premium creative and digital agency delivering branding, web development, media production, and strategic growth solutions.",
  url: "https://freshideasza.co.za",
  logo: "https://freshideasza.co.za/logo.png",
  slogan: "Design. Build. Elevate.",
  areaServed: "South Africa",
  serviceType: [
    "Brand Identity & Strategy",
    "Web & App Development",
    "Photography & Media Production",
    "Drone & Aerial Media",
    "Marketing & Social Media",
    "Educational & Institutional Systems",
  ],
  sameAs: [],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#0C0F14] text-[#F4F6F8] font-sans`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
