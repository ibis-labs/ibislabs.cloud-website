import type { Metadata, Viewport } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const viewport: Viewport = {
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Ibis Labs LLC | Digital Stewardship",
  description: "Digital Stewardship & Architecture | Specialized in high-performance Progressive Web Apps.",
  metadataBase: new URL("https://ibislabs.cloud"),
  icons: {
    icon: [
      { url: "/thoth-icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/thoth-icon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/thoth-icon-32x32.png",
    apple: "/thoth-icon-192x192.png",
  },
  openGraph: {
    title: "Ibis Labs LLC | Digital Stewardship",
    description: "Digital Stewardship & Architecture | Specialized in high-performance Progressive Web Apps.",
    url: "https://ibislabs.cloud",
    siteName: "Ibis Labs LLC",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ibis Labs LLC | Digital Stewardship",
    description: "Digital Stewardship & Architecture | Specialized in high-performance Progressive Web Apps.",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
