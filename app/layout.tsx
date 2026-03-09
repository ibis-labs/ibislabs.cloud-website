import type { Metadata } from "next";
import { Orbitron } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "Ibis Labs LLC | Digital Stewardship",
  description: "Facilitating transparent and accountable community management.",
  themeColor: "#000000",
  manifest: "/manifest.ts",
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
