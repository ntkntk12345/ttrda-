<script setup lang="ts">
import { Play } from "lucide-vue-next";

import type { Movie } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";

defineProps<{
  movies: Movie[];
}>();
</script>

<template>
  <div v-if="movies.length" class="mt-12">
    <h3 class="mb-6 border-l-4 border-primary pl-3 text-xl font-bold text-white">
      Có thể bạn sẽ thích
    </h3>
    <div class="grid grid-cols-2 gap-4 md:grid-cols-4">
      <NuxtLink
        v-for="movie in movies"
        :key="movie._id || movie.slug"
        :to="`/phim/${movie.slug}`"
        class="group relative block aspect-[2/3] overflow-hidden rounded-xl bg-gray-800"
      >
        <img
          :alt="movie.name"
          :src="OPhimUtils.getThumbUrl(movie.thumb_url || movie.poster_url)"
          class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div
          class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <div
            class="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary/90 text-black transition-transform delay-100 duration-300 group-hover:scale-100"
          >
            <Play class="ml-0.5 h-5 w-5 fill-current" />
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3">
          <h4 class="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-primary">
            {{ movie.name }}
          </h4>
          <p class="mt-1 text-xs text-gray-400">{{ movie.year }} • {{ movie.quality }}</p>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>
