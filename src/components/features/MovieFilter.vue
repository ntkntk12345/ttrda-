<script setup lang="ts">
import { Filter } from "lucide-vue-next";

import {
  FILTER_CATEGORIES,
  FILTER_COUNTRIES,
  FILTER_SORTS,
  FILTER_TYPES,
  FILTER_YEARS,
} from "~/utils/movie-taxonomy";

const route = useRoute();
const router = useRouter();
const filters = reactive({
  category: "",
  country: "",
  year: "",
  type: "",
  sort: "modified.time",
});

function syncFiltersFromRoute() {
  filters.category =
    typeof route.query.category === "string" ? route.query.category : "";
  filters.country =
    typeof route.query.country === "string" ? route.query.country : "";
  filters.year = typeof route.query.year === "string" ? route.query.year : "";
  filters.type = typeof route.query.type === "string" ? route.query.type : "";
  filters.sort =
    typeof route.query.sort === "string" ? route.query.sort : "modified.time";
}

function handleApplyFilter() {
  const params = new URLSearchParams();

  if (filters.category) {
    params.set("category", filters.category);
  }
  if (filters.country) {
    params.set("country", filters.country);
  }
  if (filters.year) {
    params.set("year", filters.year);
  }
  if (filters.type) {
    params.set("type", filters.type);
  }
  if (filters.sort) {
    params.set("sort", filters.sort);
  }

  router.push(`/tim-kiem?${params.toString()}`);
}

watch(
  () => route.query,
  () => syncFiltersFromRoute(),
  { immediate: true },
);
</script>

<template>
  <div class="mb-8 rounded-xl border border-white/5 bg-[#0f172a]/50 p-4 backdrop-blur-sm">
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
      <div class="space-y-1.5">
        <label class="ml-1 text-xs font-medium uppercase text-gray-500">Thể loại</label>
        <div class="relative">
          <select
            v-model="filters.category"
            class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
          >
            <option v-for="option in FILTER_CATEGORIES" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg fill="none" height="6" viewBox="0 0 10 6" width="10">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="ml-1 text-xs font-medium uppercase text-gray-500">Quốc gia</label>
        <div class="relative">
          <select
            v-model="filters.country"
            class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
          >
            <option v-for="option in FILTER_COUNTRIES" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg fill="none" height="6" viewBox="0 0 10 6" width="10">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="ml-1 text-xs font-medium uppercase text-gray-500">Năm</label>
        <div class="relative">
          <select
            v-model="filters.year"
            class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
          >
            <option v-for="option in FILTER_YEARS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg fill="none" height="6" viewBox="0 0 10 6" width="10">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="ml-1 text-xs font-medium uppercase text-gray-500">Tình trạng</label>
        <div class="relative">
          <select
            v-model="filters.type"
            class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
          >
            <option v-for="option in FILTER_TYPES" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg fill="none" height="6" viewBox="0 0 10 6" width="10">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="space-y-1.5">
        <label class="ml-1 text-xs font-medium uppercase text-gray-500">Sắp xếp</label>
        <div class="relative">
          <select
            v-model="filters.sort"
            class="w-full cursor-pointer appearance-none rounded-lg border border-white/10 bg-background-dark px-3 py-2.5 text-sm text-white transition-colors focus:border-cyan-500/50 focus:outline-none"
          >
            <option v-for="option in FILTER_SORTS" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
          <div class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg fill="none" height="6" viewBox="0 0 10 6" width="10">
              <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex items-end">
        <button
          class="flex h-[42px] w-full items-center justify-center gap-2 rounded-lg bg-cyan-400 font-bold text-black shadow-lg shadow-cyan-400/20 transition-colors hover:bg-cyan-300"
          type="button"
          @click="handleApplyFilter"
        >
          <Filter class="h-4 w-4" />
          Lọc phim
        </button>
      </div>
    </div>
  </div>
</template>
