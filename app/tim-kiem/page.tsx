import MovieFilter from "@/components/features/MovieFilter";
import MovieGrid from "@/components/features/MovieGrid";
import Pagination from "@/components/ui/pagination";
import { OphimService } from "@/services/ophim";
import type { Metadata } from "next";
import { Filter, Search } from "lucide-react";

export const revalidate = 0;

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

export async function generateMetadata({
  searchParams,
}: PageProps): Promise<Metadata> {
  const { keyword } = await searchParams;

  return {
    title: keyword
      ? `Tìm kiếm: ${keyword} - Phimhayz.site`
      : "Lọc phim - Phimhayz.site",
    description:
      "Tìm kiếm phim bộ, phim lẻ và các phim mới cập nhật trên Phimhayz.site.",
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { keyword, category, country, year, type, sort, page } = params;
  const currentPage = Number(page) || 1;

  let data;
  let title = "Tìm kiếm phim";
  let isFiltering = false;

  if (keyword) {
    data = await OphimService.searchMovies(keyword, currentPage);
    title = `Kết quả tìm kiếm: "${keyword}"`;
  } else if (category || country || year || type || sort) {
    isFiltering = true;
    data = await OphimService.filterMovies({
      category,
      country,
      year,
      type,
      sort,
      page: currentPage,
    });
    title = "Kết quả lọc phim";
  }

  const movies = data?.items || [];
  const totalItems = data?.pagination?.totalItems || 0;
  const extraParams: Record<string, string> = {};

  if (keyword) extraParams.keyword = keyword;
  if (category) extraParams.category = category;
  if (country) extraParams.country = country;
  if (year) extraParams.year = year;
  if (type) extraParams.type = type;
  if (sort) extraParams.sort = sort;

  return (
    <div className="min-h-screen bg-[#040714] pt-24 pb-20">
      <div className="container mx-auto px-4">
        <h1 className="mb-6 border-l-4 border-cyan-400 pl-4 text-2xl font-bold text-white">
          {title}
        </h1>

        <MovieFilter />

        {data ? (
          <div className="mb-8 flex items-center gap-2">
            <div className="h-6 w-1 rounded-full bg-cyan-400" />
            <h2 className="text-lg font-medium text-white">
              Kết quả:{" "}
              <span className="font-bold text-cyan-400">{totalItems}</span> phim
            </h2>
          </div>
        ) : null}

        {keyword || isFiltering ? (
          movies.length > 0 ? (
            <>
              <MovieGrid className="mb-12" movies={movies} />
              {data?.pagination && Number(data.pagination.totalPages) > 1 ? (
                <Pagination
                  baseUrl="/tim-kiem"
                  currentPage={Number(data.pagination.currentPage)}
                  extraParams={extraParams}
                  totalPages={Number(data.pagination.totalPages)}
                />
              ) : null}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-20 text-gray-400">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
                {isFiltering ? (
                  <Filter className="h-8 w-8 text-cyan-400" />
                ) : (
                  <Search className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <p className="mb-2 text-lg font-medium text-white">
                Không tìm thấy phim nào phù hợp.
              </p>
              <p className="text-sm">
                Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.
              </p>
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-gray-400">
            <div className="mb-6 flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-white/5">
              <Search className="h-10 w-10 text-gray-500" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-white">Tìm kiếm phim</h2>
            <p className="max-w-md text-center text-gray-400">
              Nhập tên phim vào thanh tìm kiếm hoặc dùng bộ lọc bên trên để tìm
              phim yêu thích.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
