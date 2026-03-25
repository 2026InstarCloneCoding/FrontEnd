import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Instagram",
  description: "Instagram Clone — 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
