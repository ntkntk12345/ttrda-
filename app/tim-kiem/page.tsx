import { OphimService } from '@/services/ophim';
import MovieGrid from '@/components/features/MovieGrid';
import Pagination from '@/components/ui/pagination';
import MovieFilter from '@/components/features/MovieFilter';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Search, Filter } from 'lucide-react';

export const revalidate = 0; // Search results should not be cached

interface PageProps {
    searchParams: Promise<{
        keyword?: string;
        category?: string;
        country?: string;
        year?: string;
        type?: string;
        sort?: string;
        page?: string;
    }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
    const { keyword } = await searchParams;
    return {
        title: keyword ? `Tìm kiếm: ${keyword} - Xem phim Online` : 'Lọc phim - Xem phim Online',
        description: 'Tìm kiếm phim bộ, phim lẻ, phim chiếu rạp mới nhất.',
    };
}

export default async function SearchPage({ searchParams }: PageProps) {
    const params = await searchParams;
    const { keyword, category, country, year, type, sort, page } = params;
    const currentPage = Number(page) || 1;

    let data;
    let title = 'Tìm kiếm phim';
    let isFiltering = false;

    // Decide which service method to use
    if (keyword) {
        data = await OphimService.searchMovies(keyword);
        title = `Kết quả tìm kiếm: "${keyword}"`;
    } else if (category || country || year || type || sort) {
        isFiltering = true;
        data = await OphimService.filterMovies({
            category,
            country,
            year,
            type,
            sort,
            page: currentPage
        });
        title = 'Kết quả lọc phim';
    } else {
        // Default View (empty search page)
        // Or maybe show some default "New Movies" if user just visits /tim-kiem?
        // For now, let's show empty state or handle below
    }

    const movies = data?.items || [];
    const totalItems = data?.pagination?.totalItems || 0;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#040714]">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">
                    {title}
                </h1>

                {/* Filter Component */}
                <MovieFilter />

                {/* Vertical Divider for Result Count */}
                {data && (
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-1 h-6 bg-cyan-400 rounded-full"></div>
                        <h2 className="text-lg font-medium text-white">Kết quả: <span className="text-cyan-400 font-bold">{totalItems}</span> phim</h2>
                    </div>
                )}

                {/* Results */}
                {(keyword || isFiltering) ? (
                    movies.length > 0 ? (
                        <>
                            <MovieGrid
                                movies={movies}
                                className="mb-12"
                            />
                            {data?.pagination && Number(data.pagination.totalPages) > 1 && (
                                <Pagination
                                    currentPage={Number(data.pagination.currentPage)}
                                    totalPages={Number(data.pagination.totalPages)}
                                    baseUrl="/tim-kiem"
                                />
                            )}
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-gray-400 bg-white/5 rounded-xl border border-white/10">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-4">
                                {isFiltering ? <Filter className="w-8 h-8 text-cyan-400" /> : <Search className="w-8 h-8 text-gray-500" />}
                            </div>
                            <p className="text-lg font-medium text-white mb-2">Không tìm thấy phim nào phù hợp.</p>
                            <p className="text-sm">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
                        </div>
                    )
                ) : (
                    // Empty State (Initial Load)
                    <div className="flex flex-col items-center justify-center py-32 text-gray-400">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <Search className="w-10 h-10 text-gray-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-white mb-2">Tìm kiếm phim</h1>
                        <p className="text-gray-400 max-w-md text-center">Nhập tên phim vào thanh tìm kiếm hoặc sử dụng bộ lọc bên trên để tìm phim yêu thích.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
