import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

const sans = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "Clearpath — Park the noise. See one path.",
  description:
    "Head too full, limited capacity. Dump what's buzzing, say how many spoons you've got, get one path for today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
