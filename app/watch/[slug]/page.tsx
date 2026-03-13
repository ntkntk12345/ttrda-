import { OphimService } from '@/services/ophim';
import WatchClient from '@/components/features/WatchClient';
import { notFound } from 'next/navigation';
import CommentSection from '@/components/features/CommentSection';
import RelatedMovies from '@/components/features/RelatedMovies';
import CastList from '@/components/features/CastList';
import TrendingList from '@/components/features/TrendingList';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ tap?: string; server?: string }>;
}

export default async function WatchPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const sp = searchParams ? await searchParams : {};

    const [data, relatedData, trendingData] = await Promise.all([
        OphimService.getMovieBySlug(slug),
        OphimService.getMoviesByCategory('phim-bo', 1),
        OphimService.getHomeMovies(1)
    ]);

    if (!data || !data.movie) {
        notFound();
    }

    const { movie, episodes } = data;

    return (
        <div className="min-h-screen pb-20 pt-24 bg-[#040714]">
            <div className="container mx-auto px-4 space-y-8">

                {/* Video Player + Episode Sidebar (client-side, instant episode switching) */}
                <WatchClient
                    episodes={episodes || []}
                    initialEpisodeSlug={sp.tap}
                    initialServer={sp.server}
                />

                {/* Movie Info */}
                <div className="bg-[#1e293b]/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                    <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{movie.name}</h1>
                    <h2 className="text-lg text-gray-400 mb-4">{movie.origin_name} ({movie.year})</h2>
                    <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                        {movie.content?.replace(/<[^>]*>?/gm, '')}
                    </p>
                </div>

                {/* Bottom row: Cast + Comments + Related + Trending */}
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-1 space-y-8">
                        <CommentSection />
                        {relatedData?.items && (
                            <RelatedMovies movies={relatedData.items.slice(0, 8)} />
                        )}
                    </div>
                    <div className="lg:w-72 xl:w-80 shrink-0 space-y-8">
                        {movie.actor && <CastList actors={movie.actor} />}
                        {trendingData?.items && (
                            <TrendingList movies={trendingData.items.slice(0, 5)} />
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
