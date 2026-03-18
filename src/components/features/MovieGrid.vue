<script setup lang="ts">
import type { Movie } from "~/types/ophim";

defineProps<{
  movies: Movie[];
  title?: string;
  className?: string;
}>();
</script>

<template>
  <div :class="cn('mb-12', className)">
    <h2
      v-if="title"
      class="mb-6 flex items-center border-l-4 border-primary pl-4 text-2xl font-bold text-white"
    >
      {{ title }}
    </h2>

    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      <MovieCard v-for="movie in movies" :key="movie._id || movie.slug" :movie="movie" />
    </div>
  </div>
</template>
