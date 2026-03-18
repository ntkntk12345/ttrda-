<script setup lang="ts">
import {
  Calendar,
  Clock,
  Eye,
  Globe,
  Play,
} from "lucide-vue-next";

import type { Movie, MovieDetailResponse } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";
import { OphimService } from "~/utils/ophim-service";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const slug = computed(() => decodeURIComponent(String(route.params.slug || "")));

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
  const prefix = `Xem phim ${movie.name}${metaBits ? ` ${metaBits}` : ""} online tai Phimhayz.site.`;

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

const { data } = await useAsyncData<MovieDetailResponse>(
  "movie-detail",
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

const movie = computed(() => data.value!.movie);
const episodes = computed(() => data.value!.episodes ?? []);
const movieSummary = computed(() => {
  const currentMovie = movie.value;

  return [
    currentMovie.quality,
    currentMovie.lang,
    currentMovie.time,
    currentMovie.episode_current,
  ]
    .filter(Boolean)
    .join(" | ");
});
const canonicalPath = computed(() => `/phim/${movie.value?.slug || slug.value}`);
const title = computed(() => buildMovieDetailTitle(movie.value));
const description = computed(() => buildMovieDetailDescription(movie.value));
const imageUrl = computed(() => OPhimUtils.getThumbUrl(movie.value.thumb_url));
const keywords = computed(() => buildMovieKeywords(movie.value).join(", "));
const movieStructuredData = computed(() => {
  const currentMovie = movie.value;

  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    name: currentMovie.name,
    alternateName: currentMovie.origin_name,
    description: description.value,
    image: [
      OPhimUtils.getThumbUrl(currentMovie.thumb_url),
      OPhimUtils.getPosterUrl(currentMovie.poster_url),
    ],
    datePublished: currentMovie.year ? `${currentMovie.year}-01-01` : undefined,
    genre: currentMovie.category?.map((category) => category.name),
    actor: currentMovie.actor?.map((actor) => ({
      "@type": "Person",
      name: actor,
    })),
    director: currentMovie.director?.map((director) => ({
      "@type": "Person",
      name: director,
    })),
    aggregateRating: getAggregateRating(currentMovie),
    inLanguage: currentMovie.lang,
    url: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString(),
  };
});

useSeoMeta({
  title: () => title.value,
  description: () => description.value,
  keywords: () => keywords.value,
  ogTitle: () => title.value,
  ogDescription: () => description.value,
  ogImage: () => imageUrl.value,
  twitterCard: "summary_large_image",
  twitterTitle: () => title.value,
  twitterDescription: () => description.value,
  twitterImage: () => imageUrl.value,
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
      key: "movie-jsonld",
      type: "application/ld+json",
      textContent: JSON.stringify(movieStructuredData.value),
    },
  ],
}));
</script>

<template>
  <div class="min-h-screen pb-20">
    <div class="relative h-[60vh] w-full">
      <img
        :alt="movie.name"
        :src="OPhimUtils.getPosterUrl(movie.poster_url)"
        class="h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
      <div class="absolute inset-0 bg-background-dark/30 backdrop-blur-sm" />
    </div>

    <div class="container relative z-10 mx-auto -mt-32 px-4">
      <div class="flex flex-col gap-8 md:flex-row">
        <div class="w-full flex-shrink-0 md:w-72">
          <div class="relative aspect-[2/3] overflow-hidden rounded-xl border-4 border-card-dark shadow-2xl">
            <img
              :alt="movie.name"
              :src="OPhimUtils.getThumbUrl(movie.thumb_url)"
              class="h-full w-full object-cover"
            />
          </div>

          <NuxtLink
            :to="episodes[0]?.server_data?.[0]?.slug ? `/watch/${movie.slug}` : '#'"
            class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-slate-950 shadow-lg shadow-primary/20 transition-all hover:bg-cyan-300"
          >
            <Play class="h-5 w-5 fill-current" />
            XEM PHIM NGAY
          </NuxtLink>
        </div>

        <div class="flex-1 pt-4 text-white md:pt-12">
          <h1 class="mb-2 text-4xl font-black md:text-5xl">Xem phim {{ movie.name }}</h1>
          <h2 class="mb-3 text-xl font-medium text-gray-300 md:text-2xl">
            {{ movie.origin_name }}
          </h2>
          <p v-if="movieSummary" class="mb-6 text-sm font-medium text-cyan-300">
            {{ movieSummary }}
          </p>

          <div class="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 backdrop-blur-md">
            <div class="flex items-center gap-2">
              <Calendar class="h-4 w-4 text-primary" />
              <span>{{ movie.year }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Clock class="h-4 w-4 text-primary" />
              <span>{{ movie.time }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Globe class="h-4 w-4 text-primary" />
              <span>{{ movie.country?.[0]?.name }}</span>
            </div>
            <div class="flex items-center gap-2">
              <Eye class="h-4 w-4 text-primary" />
              <span>{{ movie.view || 0 }} lượt xem</span>
            </div>
          </div>

          <div class="mb-8">
            <h3 class="mb-3 border-l-4 border-primary pl-3 text-lg font-bold">Nội dung phim</h3>
            <div class="text-base/7 leading-relaxed text-gray-300" v-html="movie.content || ''" />
          </div>

          <div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Đạo diễn
              </h3>
              <p class="font-medium text-white">{{ movie.director?.join(", ") || "N/A" }}</p>
            </div>
            <div>
              <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Diễn viên
              </h3>
              <p class="line-clamp-2 font-medium text-white">
                {{ movie.actor?.join(", ") || "N/A" }}
              </p>
            </div>
            <div>
              <h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400">
                Thể loại
              </h3>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="category in movie.category"
                  :key="category.id"
                  class="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs transition-colors hover:bg-primary hover:text-slate-950"
                >
                  {{ category.name }}
                </span>
              </div>
            </div>
          </div>

          <div v-if="episodes.length" class="mt-12">
            <EpisodeGroup :episodes="episodes" :movie-slug="movie.slug" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
