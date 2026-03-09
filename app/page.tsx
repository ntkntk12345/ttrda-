import { OphimService } from '@/services/ophim';
import MovieGrid from '@/components/features/MovieGrid';
import Link from 'next/link';
import Image from 'next/image';
import { Play, Info } from 'lucide-react';
import { OPhimUtils } from '@/utils/ophim';
import HeroSection from '@/components/features/HeroSection';


export const revalidate = 3600; // Revalidate every hour


export default async function Home() {

  const [phimMoi, phimBo, phimLe, hoatHinh] = await Promise.all([
    OphimService.getHomeMovies(),
    OphimService.getMoviesByCategory('phim-bo'),
    OphimService.getMoviesByCategory('phim-le'),
    OphimService.getMoviesByCategory('hoat-hinh'),
  ]);

  // Featured Movie (Logic: First item of Phim Moi or random)
  const featuredMovie = phimMoi?.items?.[0];

  return (
    <div className="space-y-12">
      {/* Hero Section - Always show proper data, maybe first page mainly, but adapts to pagination */}
      {phimMoi?.items && (
        <HeroSection movies={phimMoi.items.slice(0, 8)} />
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20 space-y-16">
        {/* Section: Phim Mới Cập Nhật */}
        {phimMoi?.items && (
          <div className="space-y-8">
            <MovieGrid
              title="Phim Mới Cập Nhật"
              movies={phimMoi.items.slice(1, 13)} // Skip featured movie
              className="animate-in fade-in slide-in-from-bottom-4 duration-700"
            />
          </div>
        )}

        {/* Section: Phim Bộ */}
        {phimBo?.items && (
          <MovieGrid
            title="Phim Bộ Hot"
            movies={phimBo.items.slice(0, 12)}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100"
          />
        )}

        {/* Section: Phim Lẻ */}
        {phimLe?.items && (
          <MovieGrid
            title="Phim Lẻ Mới"
            movies={phimLe.items.slice(0, 12)}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200"
          />
        )}

        {/* Section: Hoạt Hình */}
        {hoatHinh?.items && (
          <MovieGrid
            title="Phim Hoạt Hình"
            movies={hoatHinh.items.slice(0, 12)}
            className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
          />
        )}
      </div>
    </div>
  );
}
