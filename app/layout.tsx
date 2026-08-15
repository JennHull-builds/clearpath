import type { Metadata } from "next";
import type { ReactNode } from "react";
import { DM_Sans } from "next/font/google";
import { ENERGY_UNIT } from "@/lib/energy";
import "./globals.css";

const sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Clearpath — Park the noise. See one path.",
  description: `Head too full, limited capacity. Dump what's buzzing, say how much ${ENERGY_UNIT} you've got, get one path for today.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
