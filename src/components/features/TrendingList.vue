<script setup lang="ts">
import { Eye, TrendingUp } from "lucide-vue-next";

import type { Movie } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";

const props = defineProps<{
  movies: Movie[];
}>();

function getViewCount(movie: Movie) {
  if (movie.view) {
    return movie.view;
  }

  const seed = movie.slug
    .split("")
    .reduce((total, char) => total + char.charCodeAt(0), 0);
  return 1000 + (seed % 9000);
}
</script>

<template>
  <div
    v-if="props.movies.length"
    class="overflow-hidden rounded-xl border border-white/5 bg-card-dark/60"
  >
    <div class="flex items-center gap-2 border-b border-white/5 p-4">
      <TrendingUp class="h-5 w-5 text-primary" />
      <h3 class="font-bold text-white">Top xem nhiều</h3>
    </div>

    <div class="divide-y divide-white/5">
      <NuxtLink
        v-for="(movie, index) in props.movies"
        :key="movie._id || movie.slug"
        :to="`/phim/${movie.slug}`"
        class="group flex gap-4 p-4 transition-colors hover:bg-white/5"
      >
        <div class="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            :alt="movie.name"
            :src="OPhimUtils.getThumbUrl(movie.thumb_url || movie.poster_url)"
            class="h-full w-full object-cover"
            loading="lazy"
          />
          <div
            :class="
              cn(
                'absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-xs font-bold text-white',
                index === 0
                  ? 'bg-yellow-500'
                  : index === 1
                    ? 'bg-gray-400'
                    : index === 2
                      ? 'bg-orange-700'
                      : 'bg-black/60',
              )
            "
          >
            {{ index + 1 }}
          </div>
        </div>

        <div class="min-w-0 flex-1 py-1">
          <h4 class="mb-1 line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-primary">
            {{ movie.name }}
          </h4>
          <p class="mb-2 truncate text-xs text-gray-500">{{ movie.origin_name }}</p>
          <div class="flex items-center gap-1 text-xs text-gray-400">
            <Eye class="h-3 w-3" />
            <span>{{ getViewCount(movie) }} lượt xem</span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
