"use client";

import React from "react";
import { usePathname } from "next/navigation";

import Footer from "./Footer";
import Header from "./Header";

interface MainLayoutProps {
  children: React.ReactNode;
}

const ADMIN_ROUTE_PREFIX = "/dep-trai-s1";

export default function MainLayout({ children }: MainLayoutProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith(ADMIN_ROUTE_PREFIX);

  return (
    <div className="flex min-h-screen flex-col bg-background-dark font-display text-white">
      {isAdminRoute ? null : <Header />}
      <main className={isAdminRoute ? "min-h-screen" : "flex-grow pt-20"}>
        {children}
      </main>
      {isAdminRoute ? null : <Footer />}
    </div>
  );
}
