import { OphimService } from '@/services/ophim';
import MovieGrid from '@/components/features/MovieGrid';
import MovieFilter from '@/components/features/MovieFilter';
import Pagination from '@/components/ui/pagination';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    return {
        title: `Danh sách phim ${slug} - Xem phim Online`,
        description: `Danh sách phim ${slug} mới nhất, cập nhật liên tục.`,
    };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const { page } = await searchParams;
    const currentPage = Number(page) || 1;

    const data = await OphimService.getMoviesByCategory(slug, currentPage);

    if (!data || !data.items || data.items.length === 0) {
        notFound();
    }

    const { items, pagination } = data;
    const titleMap: Record<string, string> = {
        'phim-bo': 'Phim Bộ',
        'phim-le': 'Phim Lẻ',
        'hoat-hinh': 'Phim Hoạt Hình',
        'tv-shows': 'TV Shows',
        'phim-moi-cap-nhat': 'Phim Mới Cập Nhật',
        'phim-vietsub': 'Phim Vietsub',
        'phim-thuyet-minh': 'Phim Thuyết Minh',
        'phim-long-tieng': 'Phim Lồng Tiếng',
        'phim-bo-dang-chieu': 'Phim Bộ Đang Chiếu',
        'phim-bo-hoan-thanh': 'Phim Bộ Hoàn Thành',
        'phim-sap-chieu': 'Phim Sắp Chiếu',
        'subteam': 'Subteam',
        'action': 'Hành Động',
        'adventure': 'Phiêu Lưu',
        'horror': 'Kinh Dị',
        'comedy': 'Hài Hước',
        'romance': 'Tình Cảm',
        'drama': 'Tâm Lý',
        'fantasy': 'Viễn Tưởng',
        'science-fiction': 'Khoa Học',
        'mystery': 'Bí Ẩn',
        'thriller': 'Giật Gân',
        'crime': 'Hình Sự',
        'war': 'Chiến Tranh',
        'history': 'Lịch Sử',
        'music': 'Âm Nhạc',
        'family': 'Gia Đình',
        'documentary': 'Tài Liệu',
        'sport': 'Thể Thao',
        'animation': 'Hoạt Hình',
        'musical': 'Nhạc Kịch',
        'biography': 'Tiểu Sử',
        'western': 'Miền Tây',
    };

    const title = titleMap[slug] || `Danh sách ${slug}`;

    return (
        <div className="min-h-screen pt-24 pb-20 bg-[#040714]">
            <div className="container mx-auto px-4">
                <h1 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">
                    {title}
                </h1>

                <MovieFilter />

                <MovieGrid
                    movies={items}
                    className="mb-12"
                />

                {pagination && (
                    <Pagination
                        currentPage={Number(pagination.currentPage)}
                        totalPages={Math.min(Number(pagination.totalPages), 500)} // Limit to avoid too many pages
                        baseUrl={`/danh-sach/${slug}`}
                    />
                )}
            </div>
        </div>
    );
}
