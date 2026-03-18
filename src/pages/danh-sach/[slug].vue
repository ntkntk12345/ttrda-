<script setup lang="ts">
import type { MovieListResponse } from "~/types/ophim";
import { CATEGORY_TITLES } from "~/utils/movie-taxonomy";
import { OphimService } from "~/utils/ophim-service";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const slug = computed(() => String(route.params.slug || ""));
const page = computed(() => {
  const nextPage = Number(route.query.page);
  return Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
});
const title = computed(() => CATEGORY_TITLES[slug.value] || `Danh sách ${slug.value}`);

const { data } = await useAsyncData<MovieListResponse | null>(
  "category-movies",
  async () => {
    const response = await OphimService.getMoviesByCategory(slug.value, page.value);

    if (!response?.items?.length) {
      throw createError({
        statusCode: 404,
        statusMessage: "Không tìm thấy danh sách phim",
      });
    }

    return response;
  },
  {
    watch: [slug, page],
  },
);

useSeoMeta({
  title: () => `${title.value} - Phimhayz.site`,
  description: () => `${title.value} moi nhat, cap nhat lien tuc tren Phimhayz.site.`,
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: new URL(`/danh-sach/${slug.value}`, runtimeConfig.public.siteUrl).toString(),
    },
  ],
}));
</script>

<template>
  <div class="min-h-screen bg-background-dark pb-20 pt-24">
    <div class="container mx-auto px-4">
      <h1 class="mb-6 border-l-4 border-primary pl-4 text-2xl font-bold text-white">
        {{ title }}
      </h1>

      <MovieFilter />

      <MovieGrid class-name="mb-12" :movies="data?.items || []" />

      <AppPagination
        v-if="data?.pagination"
        :base-url="`/danh-sach/${slug}`"
        :current-page="Number(data.pagination.currentPage)"
        :total-pages="Math.min(Number(data.pagination.totalPages), 500)"
      />
    </div>
  </div>
</template>
