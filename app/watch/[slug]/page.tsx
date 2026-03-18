import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import CastList from '@/components/features/CastList';
import RelatedMovies from '@/components/features/RelatedMovies';
import TrendingList from '@/components/features/TrendingList';
import WatchClient from '@/components/features/WatchClient';
import { OphimService } from '@/services/ophim';
import type { Episode, EpisodeServer, Movie } from '@/types/ophim';
import { OPhimUtils } from '@/utils/ophim';

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://phimhayz.site';

interface PageProps {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ tap?: string; server?: string }>;
}

function getSelectedEpisode(
    episodes: EpisodeServer[],
    episodeSlug?: string,
    serverName?: string,
): Episode | null {
    const preferredServer = serverName
        ? episodes.find((server) => server.server_name === serverName)
        : undefined;
    const orderedServers = preferredServer
        ? [preferredServer, ...episodes.filter((server) => server !== preferredServer)]
        : episodes;

    if (episodeSlug) {
        for (const server of orderedServers) {
            const matchedEpisode = server.server_data.find((episode) => episode.slug === episodeSlug);
            if (matchedEpisode) {
                return matchedEpisode;
            }
        }
    }

    for (const server of orderedServers) {
        if (server.server_data[0]) {
            return server.server_data[0];
        }
    }

    return null;
}

function normalizeEpisodeLabel(episodeName?: string | null) {
    if (!episodeName) {
        return null;
    }

    const trimmedName = episodeName.trim();

    if (/^\d+$/.test(trimmedName)) {
        return `Tap ${trimmedName}`;
    }

    return trimmedName;
}

function buildWatchTitle(movie: Movie, episodeName?: string | null) {
    const episodeLabel = normalizeEpisodeLabel(episodeName);
    const episodeSuffix = episodeLabel ? ` ${episodeLabel}` : '';
    const langSuffix = movie.lang ? ` ${movie.lang}` : '';
    return `Xem phim ${movie.name}${episodeSuffix}${langSuffix} | Phimhayz.site`;
}

function buildWatchDescription(movie: Movie, episodeName?: string | null) {
    const cleanedContent = OPhimUtils.cleanContent(movie.content || '').replace(/\s+/g, ' ').trim();
    const episodeLabel = normalizeEpisodeLabel(episodeName);
    const episodeText = episodeLabel ? ` ${episodeLabel}` : '';
    const metaBits = [
        movie.quality,
        movie.lang,
        movie.time,
        movie.year ? String(movie.year) : undefined,
    ].filter(Boolean).join(', ');
    const prefix = `Xem phim ${movie.name}${episodeText}${metaBits ? ` ${metaBits}` : ''} tai Phimhayz.site.`;

    return `${prefix} ${cleanedContent}`.trim().slice(0, 160);
}

function buildWatchKeywords(movie: Movie, episodeName?: string | null) {
    const episodeLabel = normalizeEpisodeLabel(episodeName);

    return [
        `xem phim ${movie.name}`,
        episodeLabel ? `xem phim ${movie.name} ${episodeLabel}` : null,
        movie.origin_name,
        movie.lang,
        movie.quality,
        movie.year ? String(movie.year) : null,
        ...(movie.category?.map((category) => category.name) ?? []),
    ].filter((value): value is string => Boolean(value));
}

function buildWatchCanonicalPath(movieSlug: string, episodeSlug?: string) {
    if (!episodeSlug) {
        return `/watch/${movieSlug}`;
    }

    return `/watch/${movieSlug}?tap=${encodeURIComponent(episodeSlug)}`;
}

export async function generateMetadata({
    params,
    searchParams,
}: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const sp = searchParams ? await searchParams : {};
    const decodedSlug = decodeURIComponent(slug);
    const data = await OphimService.getMovieBySlug(decodedSlug);

    if (!data?.movie) {
        return {
            title: 'Khong tim thay phim | Phimhayz.site',
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const currentEpisode = getSelectedEpisode(data.episodes || [], sp.tap, sp.server);
    const currentEpisodeLabel = normalizeEpisodeLabel(currentEpisode?.name);
    const title = buildWatchTitle(data.movie, currentEpisodeLabel);
    const description = buildWatchDescription(data.movie, currentEpisodeLabel);
    const canonicalPath = buildWatchCanonicalPath(data.movie.slug, currentEpisode?.slug);
    const imageUrl = OPhimUtils.getThumbUrl(data.movie.thumb_url);

    return {
        title,
        description,
        keywords: buildWatchKeywords(data.movie, currentEpisodeLabel),
        alternates: {
            canonical: canonicalPath,
        },
        openGraph: {
            title,
            description,
            url: canonicalPath,
            images: [imageUrl],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [imageUrl],
        },
    };
}

export default async function WatchPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const sp = searchParams ? await searchParams : {};
    const decodedSlug = decodeURIComponent(slug);

    const [data, relatedData, trendingData] = await Promise.all([
        OphimService.getMovieBySlug(decodedSlug),
        OphimService.getMoviesByCategory('phim-bo', 1),
        OphimService.getHomeMovies(1),
    ]);

    if (!data || !data.movie) {
        notFound();
    }

    const { movie, episodes } = data;
    const currentEpisode = getSelectedEpisode(episodes || [], sp.tap, sp.server);
    const currentEpisodeLabel = normalizeEpisodeLabel(currentEpisode?.name);
    const watchTitle = buildWatchTitle(movie, currentEpisodeLabel);
    const watchDescription = buildWatchDescription(movie, currentEpisodeLabel);
    const canonicalPath = buildWatchCanonicalPath(movie.slug, currentEpisode?.slug);
    const movieSummary = [
        movie.origin_name
            ? (movie.year ? `${movie.origin_name} (${movie.year})` : movie.origin_name)
            : undefined,
        movie.quality,
        movie.lang,
    ].filter(Boolean).join(' | ');
    const watchStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: watchTitle.replace(' | Phimhayz.site', ''),
        description: watchDescription,
        thumbnailUrl: [OPhimUtils.getThumbUrl(movie.thumb_url)],
        image: [OPhimUtils.getPosterUrl(movie.poster_url)],
        uploadDate: movie.year ? `${movie.year}-01-01` : undefined,
        genre: movie.category?.map((category) => category.name),
        actor: movie.actor?.map((actor) => ({
            '@type': 'Person',
            name: actor,
        })),
        director: movie.director?.map((director) => ({
            '@type': 'Person',
            name: director,
        })),
        inLanguage: movie.lang,
        url: new URL(canonicalPath, siteUrl).toString(),
    };

    return (
        <div className="min-h-screen bg-[#040714] pb-20 pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(watchStructuredData),
                }}
            />

            <div className="container mx-auto space-y-8 px-4">
                <WatchClient
                    episodes={episodes || []}
                    initialEpisodeSlug={sp.tap}
                    initialServer={sp.server}
                />

                <div className="rounded-xl border border-white/5 bg-[#1e293b]/50 p-6 backdrop-blur-sm">
                    <h1 className="mb-2 text-2xl font-black text-white md:text-3xl">
                        Xem phim {movie.name}{currentEpisodeLabel ? ` - ${currentEpisodeLabel}` : ''}
                    </h1>
                    <h2 className="mb-3 text-lg text-gray-400">
                        {movieSummary || movie.origin_name}
                    </h2>
                    {currentEpisode?.name ? (
                        <p className="mb-4 text-sm font-medium text-cyan-300">
                            Dang phat: {currentEpisodeLabel}
                        </p>
                    ) : null}
                    <p className="cursor-pointer text-sm leading-relaxed text-gray-300 transition-all hover:line-clamp-none line-clamp-3">
                        {OPhimUtils.cleanContent(movie.content || '')}
                    </p>
                </div>

                <div className="flex flex-col gap-8 lg:flex-row">
                    <div className="flex-1 space-y-8">
                        {relatedData?.items && (
                            <RelatedMovies movies={relatedData.items.slice(0, 8)} />
                        )}
                    </div>

                    <div className="shrink-0 space-y-8 lg:w-72 xl:w-80">
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
