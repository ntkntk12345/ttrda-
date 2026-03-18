import MovieFilter from "@/components/features/MovieFilter";
import MovieGrid from "@/components/features/MovieGrid";
import Pagination from "@/components/ui/pagination";
import { OphimService } from "@/services/ophim";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

const titleMap: Record<string, string> = {
  "phim-bo": "Phim bộ",
  "phim-le": "Phim lẻ",
  "hoat-hinh": "Phim hoạt hình",
  "tv-shows": "TV Shows",
  "phim-moi-cap-nhat": "Phim mới cập nhật",
  "phim-vietsub": "Phim Vietsub",
  "phim-thuyet-minh": "Phim thuyết minh",
  "phim-long-tieng": "Phim lồng tiếng",
  "phim-bo-dang-chieu": "Phim bộ đang chiếu",
  "phim-bo-hoan-thanh": "Phim bộ hoàn thành",
  "phim-sap-chieu": "Phim sắp chiếu",
  subteam: "Subteam",
  action: "Hành động",
  adventure: "Phiêu lưu",
  horror: "Kinh dị",
  comedy: "Hài hước",
  romance: "Tình cảm",
  drama: "Tâm lý",
  fantasy: "Viễn tưởng",
  "science-fiction": "Khoa học",
  mystery: "Bí ẩn",
  thriller: "Giật gân",
  crime: "Hình sự",
  war: "Chiến tranh",
  history: "Lịch sử",
  music: "Âm nhạc",
  family: "Gia đình",
  documentary: "Tài liệu",
  sport: "Thể thao",
  animation: "Hoạt hình",
  musical: "Nhạc kịch",
  biography: "Tiểu sử",
  western: "Miền tây",
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const title = titleMap[slug] ?? `Danh sách ${slug}`;

  return {
    title: `${title} - Phimhayz.site`,
    description: `${title} mới nhất, cập nhật liên tục trên Phimhayz.site.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await OphimService.getMoviesByCategory(slug, currentPage);

  if (!data?.items?.length) {
    notFound();
  }

  const title = titleMap[slug] ?? `Danh sách ${slug}`;

  return (
    <div className="min-h-screen bg-[#040714] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 border-l-4 border-primary pl-4 text-2xl font-bold text-white">
          {title}
        </h1>

        <MovieFilter />

        <MovieGrid className="mb-12" movies={data.items} />

        {data.pagination ? (
          <Pagination
            baseUrl={`/danh-sach/${slug}`}
            currentPage={Number(data.pagination.currentPage)}
            totalPages={Math.min(Number(data.pagination.totalPages), 500)}
          />
        ) : null}
      </div>
    </div>
  );
}
