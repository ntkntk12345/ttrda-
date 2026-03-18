<script setup lang="ts">
import { Play } from "lucide-vue-next";

import type { Movie } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";

defineProps<{
  movie: Movie;
}>();
</script>

<template>
  <NuxtLink
    :to="`/phim/${movie.slug}`"
    class="group relative block aspect-[2/3] overflow-hidden rounded-xl bg-card-dark transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
  >
    <div class="absolute inset-0 h-full w-full">
      <img
        :alt="movie.name"
        :src="OPhimUtils.getThumbUrl(movie.thumb_url || movie.poster_url)"
        class="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40"
        loading="lazy"
      />
    </div>

    <div
      class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
    >
      <div class="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0">
        <div class="mb-3 flex justify-center">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-slate-950 shadow-lg shadow-primary/40"
          >
            <Play class="ml-0.5 h-6 w-6 fill-current" />
          </div>
        </div>

        <h3 class="mb-1 line-clamp-2 text-sm font-bold text-white">{{ movie.name }}</h3>
        <p class="mb-2 line-clamp-1 text-xs text-gray-400">{{ movie.origin_name }}</p>

        <div class="flex items-center gap-2 text-[10px] font-medium">
          <span class="rounded bg-white/20 px-2 py-0.5 text-white">{{ movie.year }}</span>
          <span
            v-if="movie.quality"
            class="rounded bg-primary/80 px-2 py-0.5 text-slate-950"
          >
            {{ movie.quality }}
          </span>
          <span class="rounded border border-white/30 px-2 py-0.5 text-gray-300">
            {{ movie.lang || "VietSub" }}
          </span>
        </div>
      </div>
    </div>

    <div class="absolute right-2 top-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
      <span class="rounded bg-primary px-2 py-1 text-[10px] font-bold text-slate-950 shadow-md">
        {{ movie.quality || "HD" }}
      </span>
    </div>
    <div
      class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0"
    >
      <h3 class="truncate text-sm font-semibold text-white">{{ movie.name }}</h3>
    </div>
  </NuxtLink>
</template>
