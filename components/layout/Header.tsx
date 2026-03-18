"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, Menu, Search, User, X } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Phim bộ", href: "/danh-sach/phim-bo" },
  { name: "Phim lẻ", href: "/danh-sach/phim-le" },
  { name: "Hoạt hình", href: "/danh-sach/hoat-hinh" },
  { name: "TV Shows", href: "/danh-sach/tv-shows" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 0);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [pathname]);

  function handleSearch(event: React.FormEvent) {
    event.preventDefault();

    if (!searchQuery.trim()) {
      return;
    }

    router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery.trim())}`);
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background-dark/95 py-3 shadow-lg backdrop-blur-md"
          : "bg-transparent py-5",
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link className="group z-50 flex items-center" href="/">
          <Image
            alt="Phimhayz.site"
            className="h-14 w-14 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16"
            height={64}
            priority
            src="/images/phimhay.jpg"
            width={64}
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "group relative text-sm font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-gray-300",
              )}
              href={link.href}
              key={link.href}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                  pathname === link.href ? "w-full" : "w-0",
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <form
            className="hidden items-center rounded-full border border-white/10 bg-card-dark/50 px-4 py-1.5 transition-all focus-within:border-primary/50 focus-within:bg-card-dark lg:flex"
            onSubmit={handleSearch}
          >
            <Search className="h-4 w-4 text-gray-400" />
            <input
              className="ml-2 w-48 border-none bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Tìm kiếm phim..."
              type="text"
              value={searchQuery}
            />
          </form>

          <button
            className="p-2 text-gray-300 hover:text-white lg:hidden"
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsMobileSearchOpen((current) => !current);
            }}
            type="button"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            className="relative p-2 text-gray-300 hover:text-white"
            type="button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-background-dark bg-red-500" />
          </button>

          <button
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-gray-700 to-gray-600"
            type="button"
          >
            <User className="h-4 w-4 text-gray-300" />
          </button>

          <button
            className="z-50 p-2 text-gray-300 hover:text-white md:hidden"
            onClick={() => {
              setIsMobileSearchOpen(false);
              setIsMobileMenuOpen((current) => !current);
            }}
            type="button"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-white/5 bg-background-dark/95 px-4 transition-all duration-300 md:hidden",
          isMobileSearchOpen ? "max-h-28 py-4 opacity-100" : "max-h-0 py-0 opacity-0",
        )}
      >
        <form
          className="flex items-center rounded-full border border-white/10 bg-card-dark px-4 py-3"
          onSubmit={handleSearch}
        >
          <Search className="h-5 w-5 text-gray-400" />
          <input
            autoFocus
            className="ml-3 w-full border-none bg-transparent text-base text-white focus:outline-none"
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Tìm kiếm phim..."
            type="text"
            value={searchQuery}
          />
        </form>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col gap-6 bg-background-dark/98 px-6 pt-24 transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              className={cn(
                "border-b border-white/5 py-2 text-lg font-medium transition-colors hover:text-primary",
                pathname === link.href ? "text-primary" : "text-gray-300",
              )}
              href={link.href}
              key={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
