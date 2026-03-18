<script setup lang="ts">
import type { Episode, EpisodeServer, Movie, MovieDetailResponse, MovieListResponse } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";
import { OphimService } from "~/utils/ophim-service";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const slug = computed(() => decodeURIComponent(String(route.params.slug || "")));
const tap = computed(() =>
  typeof route.query.tap === "string" ? route.query.tap : undefined,
);
const server = computed(() =>
  typeof route.query.server === "string" ? route.query.server : undefined,
);

function getSelectedEpisode(
  episodes: EpisodeServer[],
  episodeSlug?: string,
  serverName?: string,
): Episode | null {
  const preferredServer = serverName
    ? episodes.find((item) => item.server_name === serverName)
    : undefined;
  const orderedServers = preferredServer
    ? [preferredServer, ...episodes.filter((item) => item !== preferredServer)]
    : episodes;

  if (episodeSlug) {
    for (const item of orderedServers) {
      const matchedEpisode = item.server_data.find(
        (episode) => episode.slug === episodeSlug,
      );
      if (matchedEpisode) {
        return matchedEpisode;
      }
    }
  }

  for (const item of orderedServers) {
    if (item.server_data[0]) {
      return item.server_data[0];
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
    return `Tập ${trimmedName}`;
  }

  return trimmedName;
}

function buildWatchTitle(movie: Movie, episodeName?: string | null) {
  const episodeLabel = normalizeEpisodeLabel(episodeName);
  const episodeSuffix = episodeLabel ? ` ${episodeLabel}` : "";
  const langSuffix = movie.lang ? ` ${movie.lang}` : "";
  return `Xem phim ${movie.name}${episodeSuffix}${langSuffix} | Phimhayz.site`;
}

function buildWatchDescription(movie: Movie, episodeName?: string | null) {
  const cleanedContent = OPhimUtils.cleanContent(movie.content || "")
    .replace(/\s+/g, " ")
    .trim();
  const episodeLabel = normalizeEpisodeLabel(episodeName);
  const episodeText = episodeLabel ? ` ${episodeLabel}` : "";
  const metaBits = [
    movie.quality,
    movie.lang,
    movie.time,
    movie.year ? String(movie.year) : undefined,
  ]
    .filter(Boolean)
    .join(", ");
  const prefix = `Xem phim ${movie.name}${episodeText}${metaBits ? ` ${metaBits}` : ""} tai Phimhayz.site.`;

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

const { data } = await useAsyncData<MovieDetailResponse>(
  "watch-movie-detail",
  async () => {
    const response = await OphimService.getMovieBySlug(slug.value);

    if (!response?.movie) {
      throw createError({
        statusCode: 404,
        statusMessage: "Không tìm thấy phim",
      });
    }

    return response;
  },
  {
    watch: [slug],
  },
);
const { data: relatedData } = await useAsyncData<MovieListResponse | null>(
  "watch-related-movies",
  () => OphimService.getMoviesByCategory("phim-bo", 1),
);
const { data: trendingData } = await useAsyncData<MovieListResponse | null>(
  "watch-trending-movies",
  () => OphimService.getHomeMovies(1),
);

const movie = computed(() => data.value!.movie);
const episodes = computed(() => data.value!.episodes ?? []);
const currentEpisode = computed(() =>
  getSelectedEpisode(episodes.value, tap.value, server.value),
);
const currentEpisodeLabel = computed(() =>
  normalizeEpisodeLabel(currentEpisode.value?.name),
);
const watchTitle = computed(() =>
  buildWatchTitle(movie.value, currentEpisodeLabel.value),
);
const watchDescription = computed(() =>
  buildWatchDescription(movie.value, currentEpisodeLabel.value),
);
const canonicalPath = computed(() =>
  buildWatchCanonicalPath(movie.value.slug, currentEpisode.value?.slug),
);
const movieSummary = computed(() => {
  const currentMovie = movie.value;

  return [
    currentMovie.origin_name
      ? currentMovie.year
        ? `${currentMovie.origin_name} (${currentMovie.year})`
        : currentMovie.origin_name
      : undefined,
    currentMovie.quality,
    currentMovie.lang,
  ]
    .filter(Boolean)
    .join(" | ");
});
const watchKeywords = computed(() =>
  buildWatchKeywords(movie.value, currentEpisodeLabel.value).join(", "),
);
const watchImage = computed(() => OPhimUtils.getThumbUrl(movie.value.thumb_url));
const watchStructuredData = computed(() => {
  const currentMovie = movie.value;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: watchTitle.value.replace(" | Phimhayz.site", ""),
    description: watchDescription.value,
    thumbnailUrl: [OPhimUtils.getThumbUrl(currentMovie.thumb_url)],
    image: [OPhimUtils.getPosterUrl(currentMovie.poster_url)],
    uploadDate: currentMovie.year ? `${currentMovie.year}-01-01` : undefined,
    genre: currentMovie.category?.map((category) => category.name),
    actor: currentMovie.actor?.map((actor) => ({
      "@type": "Person",
      name: actor,
    })),
    director: currentMovie.director?.map((director) => ({
      "@type": "Person",
      name: director,
    })),
    inLanguage: currentMovie.lang,
    url: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString(),
  };
});

useSeoMeta({
  title: () => watchTitle.value,
  description: () => watchDescription.value,
  keywords: () => watchKeywords.value,
  ogTitle: () => watchTitle.value,
  ogDescription: () => watchDescription.value,
  ogImage: () => watchImage.value,
  twitterCard: "summary_large_image",
  twitterTitle: () => watchTitle.value,
  twitterDescription: () => watchDescription.value,
  twitterImage: () => watchImage.value,
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString(),
    },
  ],
  script: [
    {
      key: "watch-jsonld",
      type: "application/ld+json",
      textContent: JSON.stringify(watchStructuredData.value),
    },
  ],
}));
</script>

<template>
  <div class="min-h-screen bg-background-dark pb-20 pt-24">
    <div class="container mx-auto space-y-8 px-4">
      <WatchPanel
        :episodes="episodes"
        :initial-episode-slug="tap"
        :initial-server="server"
        :movie-slug="movie.slug"
      />

      <div class="rounded-xl border border-white/5 bg-card-dark/50 p-6 backdrop-blur-sm">
        <h1 class="mb-2 text-2xl font-black text-white md:text-3xl">
          Xem phim {{ movie.name }}
          <span v-if="currentEpisodeLabel"> - {{ currentEpisodeLabel }}</span>
        </h1>
        <h2 class="mb-3 text-lg text-gray-400">{{ movieSummary || movie.origin_name }}</h2>
        <p v-if="currentEpisodeLabel" class="mb-4 text-sm font-medium text-cyan-300">
          Đang phát: {{ currentEpisodeLabel }}
        </p>
        <p class="line-clamp-3 cursor-pointer text-sm leading-relaxed text-gray-300 transition-all hover:line-clamp-none">
          {{ OPhimUtils.cleanContent(movie.content || "") }}
        </p>
      </div>

      <div class="flex flex-col gap-8 lg:flex-row">
        <div class="flex-1 space-y-8">
          <RelatedMovies
            v-if="relatedData?.items?.length"
            :movies="relatedData.items.slice(0, 8)"
          />
        </div>

        <div class="shrink-0 space-y-8 lg:w-72 xl:w-80">
          <CastList v-if="movie.actor?.length" :actors="movie.actor" />
          <TrendingList
            v-if="trendingData?.items?.length"
            :movies="trendingData.items.slice(0, 5)"
          />
        </div>
      </div>
    </div>
  </div>
</template>
