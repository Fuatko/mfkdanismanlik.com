import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MFK Danışmanlık | Premium Yönetim Danışmanlığı",
  description: "Stratejik uzmanlıkla organizasyonunuzu dönüştürün",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
