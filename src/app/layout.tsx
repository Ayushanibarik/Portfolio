import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { absoluteUrl } from "@/lib/utils";
import { site } from "@/data/site";

const title = `${site.name} | ${site.tagline}`;
const description =
  "Digital headquarters for Ayush Animesh Barik, an AI enthusiast, full-stack developer, builder, and engineering student building intelligent systems for real-world impact.";

export const metadata: Metadata = {
  metadataBase: new URL(site.baseUrl),
  title,
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.baseUrl }],
  creator: site.name,
  publisher: site.name,
  keywords: [
    "Ayush Animesh Barik",
    "AI Enthusiast",
    "Full-Stack Developer",
    "Next.js Developer",
    "AI Agents",
    "Founder",
    "Engineering Student",
    "ITER SOA University"
  ],
  alternates: {
    canonical: site.baseUrl
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.baseUrl,
    siteName: site.name,
    title: site.name,
    description: site.tagline,
    images: [
      {
        url: absoluteUrl("/opengraph-image", site.baseUrl),
        width: 1200,
        height: 630,
        alt: `${site.name} - ${site.tagline}`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
    description: site.tagline,
    images: [absoluteUrl("/twitter-image", site.baseUrl)]
  },
  icons: {
    icon: "/icon",
    apple: "/icon"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="bg-canvas text-ink font-ios">{children}</body>
    </html>
  );
}
