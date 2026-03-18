<script setup lang="ts">
import { Filter, Search } from "lucide-vue-next";

import type { MovieListResponse } from "~/types/ophim";
import { OphimService } from "~/utils/ophim-service";

const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const keyword = computed(() =>
  typeof route.query.keyword === "string" ? route.query.keyword.trim() : "",
);
const category = computed(() =>
  typeof route.query.category === "string" ? route.query.category : "",
);
const country = computed(() =>
  typeof route.query.country === "string" ? route.query.country : "",
);
const year = computed(() => (typeof route.query.year === "string" ? route.query.year : ""));
const type = computed(() => (typeof route.query.type === "string" ? route.query.type : ""));
const sort = computed(() => (typeof route.query.sort === "string" ? route.query.sort : ""));
const page = computed(() => {
  const nextPage = Number(route.query.page);
  return Number.isFinite(nextPage) && nextPage > 0 ? nextPage : 1;
});

const hasFilters = computed(() =>
  Boolean(category.value || country.value || year.value || type.value || sort.value),
);
const isFiltering = computed(() => !keyword.value && hasFilters.value);

const { data } = await useAsyncData<MovieListResponse | null>(
  "search-movies",
  async () => {
    if (keyword.value) {
      return OphimService.searchMovies(keyword.value, page.value);
    }

    if (hasFilters.value) {
      return OphimService.filterMovies({
        category: category.value,
        country: country.value,
        year: year.value,
        type: type.value,
        sort: sort.value,
        page: page.value,
      });
    }

    return null;
  },
  {
    watch: [keyword, category, country, year, type, sort, page],
  },
);

const title = computed(() => {
  if (keyword.value) {
    return `Kết quả tìm kiếm: "${keyword.value}"`;
  }

  if (isFiltering.value) {
    return "Kết quả lọc phim";
  }

  return "Tìm kiếm phim";
});
const movies = computed(() => data.value?.items || []);
const totalItems = computed(() => data.value?.pagination?.totalItems || 0);
const canonicalUrl = computed(() =>
  new URL("/tim-kiem", runtimeConfig.public.siteUrl).toString(),
);
const extraParams = computed<Record<string, string>>(() => {
  const params: Record<string, string> = {};

  if (keyword.value) {
    params.keyword = keyword.value;
  }
  if (category.value) {
    params.category = category.value;
  }
  if (country.value) {
    params.country = country.value;
  }
  if (year.value) {
    params.year = year.value;
  }
  if (type.value) {
    params.type = type.value;
  }
  if (sort.value) {
    params.sort = sort.value;
  }

  return params;
});

useSeoMeta({
  title: () =>
    keyword.value ? `Tim kiem: ${keyword.value} - Phimhayz.site` : "Loc phim - Phimhayz.site",
  description: () =>
    "Tim kiem phim bo, phim le va cac phim moi cap nhat tren Phimhayz.site.",
});

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: canonicalUrl.value,
    },
  ],
}));
</script>

<template>
  <div class="min-h-screen bg-background-dark pb-20 pt-24">
    <div class="container mx-auto px-4">
      <h1 class="mb-6 border-l-4 border-cyan-400 pl-4 text-2xl font-bold text-white">
        {{ title }}
      </h1>

      <MovieFilter />

      <div v-if="data" class="mb-8 flex items-center gap-2">
        <div class="h-6 w-1 rounded-full bg-cyan-400" />
        <h2 class="text-lg font-medium text-white">
          Kết quả:
          <span class="font-bold text-cyan-400">{{ totalItems }}</span>
          phim
        </h2>
      </div>

      <template v-if="keyword || isFiltering">
        <template v-if="movies.length">
          <MovieGrid class-name="mb-12" :movies="movies" />
          <AppPagination
            v-if="data?.pagination && Number(data.pagination.totalPages) > 1"
            base-url="/tim-kiem"
            :current-page="Number(data.pagination.currentPage)"
            :extra-params="extraParams"
            :total-pages="Number(data.pagination.totalPages)"
          />
        </template>

        <div
          v-else
          class="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/5 py-20 text-gray-400"
        >
          <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/5">
            <Filter v-if="isFiltering" class="h-8 w-8 text-cyan-400" />
            <Search v-else class="h-8 w-8 text-gray-500" />
          </div>
          <p class="mb-2 text-lg font-medium text-white">Không tìm thấy phim nào phù hợp.</p>
          <p class="text-sm">Hãy thử điều chỉnh bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>
      </template>

      <div v-else class="flex flex-col items-center justify-center py-32 text-gray-400">
        <div class="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/5">
          <Search class="h-10 w-10 text-gray-500" />
        </div>
        <h2 class="mb-2 text-2xl font-bold text-white">Tìm kiếm phim</h2>
        <p class="max-w-md text-center text-gray-400">
          Nhập tên phim vào thanh tìm kiếm hoặc dùng bộ lọc bên trên để tìm phim yêu thích.
        </p>
      </div>
    </div>
  </div>
</template>
