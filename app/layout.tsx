import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "silverhairs - boris kayi",
  description:
    "Personal blog featuring technical articles, philosophical essays, rants, and reading notes",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: [{ url: "/logo.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    title: "boris kayi - Personal Website",
    description:
      "Personal blog featuring technical articles, philosophical essays, and reading notes",
    type: "website",
    images: [
      {
        url: "/logo.svg",
        width: 1200,
        height: 630,
        alt: "boris kayi logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "silverhairs - boris kayi",
    description:
      "Personal blog featuring technical articles, philosophical essays, and reading notes",
    images: ["/logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${ibmPlexMono.variable} antialiased`}>
        <Analytics />
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
