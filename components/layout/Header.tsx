"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Menu, X, Bell, User } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery)}`);
            setIsMobileMenuOpen(false);
        }
    };

    const navLinks = [
        { name: 'Trang Chủ', href: '/' },
        { name: 'Phim Bộ', href: '/danh-sach/phim-bo' },
        { name: 'Phim Lẻ', href: '/danh-sach/phim-le' },
        { name: 'Hoạt Hình', href: '/danh-sach/hoat-hinh' },
        { name: 'TV Shows', href: '/danh-sach/tv-shows' },
    ];

    return (
        <header
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled ? 'bg-background-dark/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 z-50 group">
                    <span className="text-3xl font-black tracking-wide text-white drop-shadow-[0_0_10px_rgba(14,165,233,0.6)] group-hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.8)] transition-all duration-300">
                        CINE<span className="text-primary">WAVE</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-sm font-medium transition-colors hover:text-primary relative group',
                                pathname === link.href ? 'text-primary' : 'text-gray-300'
                            )}
                        >
                            {link.name}
                            <span className={cn(
                                "absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full",
                                pathname === link.href ? "w-full" : ""
                            )} />
                        </Link>
                    ))}
                </nav>

                {/* Right Section: Search & Actions */}
                <div className="flex items-center gap-4">
                    <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-card-dark/50 border border-white/10 rounded-full px-4 py-1.5 focus-within:border-primary/50 focus-within:bg-card-dark transition-all">
                        <Search className="w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm phim..."
                            className="bg-transparent border-none focus:outline-none text-sm text-white ml-2 w-48 placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                    {/* Mobile Search Toggle */}
                    <button
                        className="lg:hidden p-2 text-gray-300 hover:text-white"
                        onClick={() => router.push('/tim-kiem')}
                    >
                        <Search className="w-5 h-5" />
                    </button>

                    <button className="p-2 text-gray-300 hover:text-white relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                    </button>

                    <button className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-700 to-gray-600 flex items-center justify-center overflow-hidden border border-white/10">
                        <User className="w-4 h-4 text-gray-300" />
                    </button>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-gray-300 hover:text-white z-50"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={cn(
                "fixed inset-0 bg-background-dark/98 z-40 md:hidden transition-transform duration-300 ease-in-out flex flex-col pt-24 px-6 gap-6",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <form onSubmit={handleSearch} className="flex items-center bg-card-dark border border-white/10 rounded-full px-4 py-3">
                    <Search className="w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim..."
                        className="bg-transparent border-none focus:outline-none text-base text-white ml-3 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>

                <nav className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                'text-lg font-medium py-2 border-b border-white/5 transition-colors hover:text-primary',
                                pathname === link.href ? 'text-primary' : 'text-gray-300'
                            )}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                </nav>
            </div>
        </header>
    );
};

export default Header;
