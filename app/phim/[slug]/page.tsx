import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, Eye, Globe, Play } from "lucide-react";

import EpisodeGroup from "@/components/features/EpisodeGroup";
import { OphimService } from "@/services/ophim";
import type { Movie } from "@/types/ophim";
import { OPhimUtils } from "@/utils/ophim";

export const revalidate = 3600;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://phimhayz.site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function buildMovieDetailTitle(movie: Movie) {
  const yearSuffix = movie.year ? ` (${movie.year})` : "";
  const qualitySuffix = movie.quality ? ` ${movie.quality}` : "";
  const langSuffix = movie.lang ? ` ${movie.lang}` : "";

  return `Xem phim ${movie.name}${yearSuffix}${qualitySuffix}${langSuffix} | Phimhayz.site`;
}

function buildMovieDetailDescription(movie: Movie) {
  const cleanedContent = OPhimUtils.cleanContent(movie.content || "")
    .replace(/\s+/g, " ")
    .trim();
  const metaBits = [
    movie.quality,
    movie.lang,
    movie.time,
    movie.episode_current,
  ]
    .filter(Boolean)
    .join(", ");
  const prefix = `Xem phim ${movie.name}${metaBits ? ` ${metaBits}` : ""} online tại Phimhayz.site.`;

  return `${prefix} ${cleanedContent}`.trim().slice(0, 160);
}

function buildMovieKeywords(movie: Movie) {
  return [
    `xem phim ${movie.name}`,
    movie.origin_name,
    movie.lang,
    movie.quality,
    movie.episode_current,
    movie.episode_total,
    movie.year ? String(movie.year) : null,
    ...(movie.category?.map((category) => category.name) ?? []),
    ...(movie.actor ?? []),
  ].filter((value): value is string => Boolean(value));
}

function getAggregateRating(movie: Movie) {
  if (movie.imdb?.vote_average && movie.imdb?.vote_count) {
    return {
      "@type": "AggregateRating",
      ratingValue: movie.imdb.vote_average,
      ratingCount: movie.imdb.vote_count,
      bestRating: 10,
      worstRating: 1,
    };
  }

  if (movie.tmdb?.vote_average && movie.tmdb?.vote_count) {
    return {
      "@type": "AggregateRating",
      ratingValue: movie.tmdb.vote_average,
      ratingCount: movie.tmdb.vote_count,
      bestRating: 10,
      worstRating: 1,
    };
  }

  return undefined;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await OphimService.getMovieBySlug(decodedSlug);

  if (!data?.movie) {
    return {
      title: "Không tìm thấy phim | Phimhayz.site",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = buildMovieDetailTitle(data.movie);
  const description = buildMovieDetailDescription(data.movie);
  const canonicalPath = `/phim/${data.movie.slug}`;
  const imageUrl = OPhimUtils.getThumbUrl(data.movie.thumb_url);

  return {
    title,
    description,
    keywords: buildMovieKeywords(data.movie),
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
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const data = await OphimService.getMovieBySlug(decodedSlug);

  if (!data || !data.movie) {
    notFound();
  }

  const { movie, episodes } = data;
  const movieSummary = [
    movie.quality,
    movie.lang,
    movie.time,
    movie.episode_current,
  ]
    .filter(Boolean)
    .join(" | ");
  const movieStructuredData = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: movie.name,
    alternateName: movie.origin_name,
    description: buildMovieDetailDescription(movie),
    image: [
      OPhimUtils.getThumbUrl(movie.thumb_url),
      OPhimUtils.getPosterUrl(movie.poster_url),
    ],
    datePublished: movie.year ? `${movie.year}-01-01` : undefined,
    genre: movie.category?.map((category) => category.name),
    actor: movie.actor?.map((actor) => ({
      "@type": "Person",
      name: actor,
    })),
    director: movie.director?.map((director) => ({
      "@type": "Person",
      name: director,
    })),
    aggregateRating: getAggregateRating(movie),
    inLanguage: movie.lang,
    url: new URL(`/phim/${movie.slug}`, siteUrl).toString(),
  };

  return (
    <div className="min-h-screen pb-20">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(movieStructuredData),
        }}
        type="application/ld+json"
      />

      <div className="relative h-[60vh] w-full">
        <Image
          alt={movie.name}
          className="object-cover"
          fill
          priority
          src={OPhimUtils.getPosterUrl(movie.poster_url)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
        <div className="absolute inset-0 bg-background-dark/30 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10 mx-auto -mt-32 px-4">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="w-full flex-shrink-0 md:w-72">
            <div className="relative aspect-[2/3] overflow-hidden rounded-xl border-4 border-card-dark shadow-2xl">
              <Image
                alt={movie.name}
                className="object-cover"
                fill
                src={OPhimUtils.getThumbUrl(movie.thumb_url)}
              />
            </div>

            <Link
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-white shadow-lg shadow-primary/20 transition-all hover:bg-blue-500"
              href={episodes?.[0]?.server_data?.[0]?.slug ? `/watch/${movie.slug}` : "#"}
            >
              <Play className="h-5 w-5 fill-current" />
              XEM PHIM NGAY
            </Link>
          </div>

          <div className="flex-1 pt-4 text-white md:pt-12">
            <h1 className="mb-2 text-4xl font-black md:text-5xl">
              Xem phim {movie.name}
            </h1>
            <h2 className="mb-3 text-xl font-medium text-gray-300 md:text-2xl">
              {movie.origin_name}
            </h2>
            {movieSummary ? (
              <p className="mb-6 text-sm font-medium text-cyan-300">{movieSummary}</p>
            ) : null}

            <div className="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <span>{movie.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span>{movie.country?.[0]?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <span>{movie.view} lượt xem</span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="mb-3 border-l-4 border-primary pl-3 text-lg font-bold">
                Nội dung phim
              </h3>
              <div
                className="text-base/7 leading-relaxed text-gray-300"
                dangerouslySetInnerHTML={{ __html: movie.content || "" }}
              />
            </div>

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Đạo diễn
                </h3>
                <p className="font-medium text-white">
                  {movie.director?.join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Diễn viên
                </h3>
                <p className="line-clamp-2 font-medium text-white">
                  {movie.actor?.join(", ") || "N/A"}
                </p>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Thể loại
                </h3>
                <div className="flex flex-wrap gap-2">
                  {movie.category?.map((category) => (
                    <span
                      className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs transition-colors hover:bg-primary"
                      key={category.id}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {episodes && episodes.length > 0 ? (
              <div className="mt-12">
                <EpisodeGroup episodes={episodes} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
