import type { Metadata } from "next";
import { Inter } from "next/font/google";

import GlobalHeadMarkup from "@/components/admin/GlobalHeadMarkup";
import GlobalScriptsInjector from "@/components/admin/GlobalScriptsInjector";
import MainLayout from "@/components/layout/MainLayout";
import { getActiveScripts } from "@/lib/admin/scripts-store";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phimhayz.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Phimhayz.site - Xem phim online chất lượng cao",
  description:
    "Phimhayz.site là trang xem phim trực tuyến với kho phim cập nhật liên tục, tốc độ nhanh và giao diện hiện đại.",
  openGraph: {
    locale: "vi_VN",
    siteName: "Phimhayz.site",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialScripts = await getActiveScripts();

  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <GlobalHeadMarkup scripts={initialScripts} />
      </head>
      <body className={inter.className}>
        <GlobalScriptsInjector initialScripts={initialScripts} />
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
