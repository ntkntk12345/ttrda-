import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { cn } from '@/utils/cn';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
    className?: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl, className }: PaginationProps) {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 3; // Show fewer pages to accommodate text buttons

        let startPage = Math.max(1, currentPage - 1);
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // Always show first page
        if (startPage > 1) {
            pages.push(
                <Link
                    key={1}
                    href={`${baseUrl}?page=1`}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all font-medium"
                >
                    1
                </Link>
            );
            if (startPage > 2) {
                pages.push(
                    <span key="dots-start" className="w-10 h-10 flex items-center justify-center text-gray-500">
                        ...
                    </span>
                );
            }
        }

        // Middle pages
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <Link
                    key={i}
                    href={`${baseUrl}?page=${i}`}
                    className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-lg transition-all font-medium border",
                        i === currentPage
                            ? "bg-cyan-500 text-black border-cyan-500 font-bold shadow-lg shadow-cyan-500/20 scale-105 pointer-events-none"
                            : "bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20"
                    )}
                >
                    {i}
                </Link>
            );
        }

        // Always show last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pages.push(
                    <span key="dots-end" className="w-10 h-10 flex items-center justify-center text-gray-500">
                        ...
                    </span>
                );
            }
            pages.push(
                <Link
                    key={totalPages}
                    href={`${baseUrl}?page=${totalPages}`}
                    className="w-10 h-10 flex items-center justify-center rounded-lg border bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all font-medium"
                >
                    {totalPages}
                </Link>
            );
        }

        return pages;
    };

    return (
        <div className={cn("flex items-center justify-center gap-2 mt-12 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700 select-none", className)}>
            {/* Prev Page Button */}
            <Link
                href={currentPage > 1 ? `${baseUrl}?page=${currentPage - 1}` : '#'}
                className={cn(
                    "h-10 px-4 flex items-center gap-2 rounded-lg border bg-white/5 border-white/10 text-gray-400 transition-all font-medium",
                    currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-white/10 hover:text-white hover:border-white/20"
                )}
            >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Trang trước</span>
            </Link>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
                {renderPageNumbers()}
            </div>

            {/* Next Page Button */}
            <Link
                href={currentPage < totalPages ? `${baseUrl}?page=${currentPage + 1}` : '#'}
                className={cn(
                    "h-10 px-4 flex items-center gap-2 rounded-lg border bg-white/5 border-white/10 text-gray-400 transition-all font-medium",
                    currentPage === totalPages
                        ? "pointer-events-none opacity-50"
                        : "hover:bg-white/10 hover:text-white hover:border-white/20"
                )}
            >
                <span className="hidden sm:inline">Trang sau</span>
                <ChevronRight className="w-4 h-4" />
            </Link>
        </div>
    );
}
