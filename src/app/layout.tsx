import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MFK Danışmanlık | Premium Yönetim Danışmanlığı",
  description: "Stratejik uzmanlıkla organizasyonunuzu dönüştürün",
  icons: { icon: "/icon" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased font-sans">{children}</body>
    </html>
  );
}
