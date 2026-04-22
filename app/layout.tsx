import type { Metadata } from "next";
import { Syne, DM_Mono, Inter } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-dm-mono",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Deepak Gupta — Frontend Developer",
  description:
    "Frontend Developer specialising in React & Next.js — crafting fast, polished, production-ready web experiences.",
  keywords: ["Frontend Developer", "React", "Next.js", "Mumbai", "Deepak Gupta"],
  openGraph: {
    title: "Deepak Gupta — Frontend Developer",
    description: "Fast, polished, production-ready web experiences.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${syne.variable} ${dmMono.variable} ${inter.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
