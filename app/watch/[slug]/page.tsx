
import { OphimService } from '@/services/ophim';
import VideoPlayer from '@/components/features/VideoPlayer';
import EpisodeGroup from '@/components/features/EpisodeGroup';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ tap?: string; server?: string }>;
}

import CommentSection from '@/components/features/CommentSection';
import RelatedMovies from '@/components/features/RelatedMovies';
import CastList from '@/components/features/CastList';
import TrendingList from '@/components/features/TrendingList';

export default async function WatchPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    // searchParams may or may not be used yet, but good to await if accessible
    const sp = searchParams ? await searchParams : {};

    const [data, relatedData, trendingData] = await Promise.all([
        OphimService.getMovieBySlug(slug),
        OphimService.getMoviesByCategory('phim-bo', 1), // Placeholder for related
        OphimService.getHomeMovies(1) // Placeholder for trending
    ]);

    if (!data || !data.movie) {
        notFound();
    }

    const { movie, episodes } = data;

    // Logic to select episode based on searchParams
    const tapSlug = sp.tap;
    const serverName = sp.server;

    let currentEpisode;

    if (episodes && episodes.length > 0) {
        // Find server
        const server = serverName
            ? episodes.find(s => s.server_name === serverName)
            : episodes[0];

        // Find episode in that server
        if (server) {
            currentEpisode = tapSlug
                ? server.server_data.find(e => e.slug === tapSlug)
                : server.server_data[0];
        }

        // Fallback if not found
        if (!currentEpisode) {
            currentEpisode = episodes[0]?.server_data?.[0];
        }
    }

    return (
        <div className="min-h-screen pb-20 pt-24 bg-[#040714]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content (Left) */}
                    <div className="lg:w-3/4 space-y-8">
                        {/* Video Player Section */}
                        <div className="space-y-4">
                            <VideoPlayer episode={currentEpisode} />

                            <div className="bg-[#1e293b]/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
                                <h1 className="text-2xl md:text-3xl font-black text-white mb-2">{movie.name}</h1>
                                <h2 className="text-lg text-gray-400 mb-4">{movie.origin_name} ({movie.year})</h2>
                                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3 hover:line-clamp-none transition-all cursor-pointer">
                                    {movie.content?.replace(/<[^>]*>?/gm, '')}
                                </p>
                            </div>
                        </div>

                        {/* Comments Section */}
                        <CommentSection />

                        {/* Related Movies */}
                        {relatedData?.items && (
                            <RelatedMovies movies={relatedData.items.slice(0, 8)} />
                        )}
                    </div>

                    {/* Sidebar (Right) */}
                    <div className="lg:w-1/4 space-y-8">
                        {/* Episodes - Sticky */}
                        <div className="sticky top-24 space-y-8">
                            <EpisodeGroup episodes={episodes} currentEpisode={currentEpisode?.slug} currentServer={serverName} />

                            {/* Cast List */}
                            {movie.actor && <CastList actors={movie.actor} />}

                            {/* Trending List */}
                            {trendingData?.items && (
                                <TrendingList movies={trendingData.items.slice(0, 5)} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
