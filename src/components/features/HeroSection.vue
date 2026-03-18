<script setup lang="ts">
import {
  Calendar,
  Clock,
  Info,
  Play,
  Plus,
  Star,
} from "lucide-vue-next";

import type { Movie } from "~/types/ophim";
import { OPhimUtils } from "~/utils/ophim";

const props = defineProps<{
  movies: Movie[];
}>();

const currentIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;

function goToSlide(index: number) {
  currentIndex.value = index;
}

function nextSlide() {
  if (!props.movies.length) {
    return;
  }

  currentIndex.value = (currentIndex.value + 1) % props.movies.length;
}

onMounted(() => {
  if (props.movies.length <= 1) {
    return;
  }

  intervalId = setInterval(nextSlide, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId);
  }
});
</script>

<template>
  <section
    v-if="movies.length"
    class="relative h-[85vh] overflow-hidden bg-background-dark text-white md:h-[90vh]"
  >
    <div
      v-for="(movie, index) in movies"
      :key="movie._id || movie.slug"
      :class="
        cn(
          'absolute inset-0 transition-opacity duration-700',
          index === currentIndex ? 'opacity-100' : 'pointer-events-none opacity-0',
        )
      "
    >
      <div class="absolute inset-0 z-0">
        <img
          :alt="movie.name"
          :src="OPhimUtils.getPosterUrl(movie.poster_url)"
          class="h-full w-full object-cover object-top opacity-90 md:object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent" />
        <div class="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent" />
      </div>

      <div class="absolute inset-0 z-10 flex items-center">
        <div class="container mx-auto mt-20 grid grid-cols-1 gap-8 px-4 md:mt-0 md:grid-cols-2 md:px-8">
          <div class="max-w-2xl space-y-6">
            <div class="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300">
              <span class="flex items-center gap-1 rounded border border-yellow-500/30 bg-yellow-500/20 px-2 py-0.5 text-yellow-400">
                <Star class="h-3 w-3 fill-current" />
                IMDb {{ typeof movie.imdb === "object" ? movie.imdb?.vote_average || "N/A" : "N/A" }}
              </span>
              <span class="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">
                <Calendar class="h-3 w-3" />
                {{ movie.year }}
              </span>
              <span class="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">
                <Clock class="h-3 w-3" />
                {{ movie.time || "N/A" }}
              </span>
              <span class="text-xs font-bold uppercase tracking-wider text-primary">
                {{ movie.lang }} • {{ movie.quality }}
              </span>
            </div>

            <div>
              <h1 class="text-4xl font-black leading-tight tracking-tight text-[#F9F9F9] drop-shadow-2xl md:text-6xl lg:text-7xl">
                {{ movie.name }}
              </h1>
              <p class="mt-3 text-xl font-light italic text-gray-400 md:text-2xl">
                {{ movie.origin_name }}
              </p>
            </div>

            <div class="flex flex-wrap gap-4 pt-4">
              <NuxtLink
                :to="`/watch/${movie.slug}`"
                class="group/play flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:scale-105 hover:bg-yellow-400"
              >
                <div class="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors group-hover/play:bg-black/20">
                  <Play class="ml-0.5 h-4 w-4 fill-current" />
                </div>
                <span class="text-lg">Xem phim</span>
              </NuxtLink>

              <button
                class="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10"
                type="button"
              >
                <Plus class="h-5 w-5" />
                <span>Thêm vào DS</span>
              </button>

              <NuxtLink
                :to="`/phim/${movie.slug}`"
                class="flex items-center gap-2 px-4 py-4 font-medium text-gray-400 transition-colors hover:text-white"
              >
                <Info class="h-5 w-5" />
                <span>Chi tiết</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="scrollbar-hide absolute bottom-8 right-8 z-20 hidden max-w-[50%] gap-4 overflow-x-auto pb-2 lg:flex"
    >
      <button
        v-for="(movie, index) in movies"
        :key="`thumb-${movie._id || index}`"
        :class="
          cn(
            'group/thumb relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300',
            currentIndex === index
              ? 'scale-105 border-yellow-500 shadow-lg'
              : 'border-transparent opacity-60 hover:opacity-100',
          )
        "
        type="button"
        @click="goToSlide(index)"
      >
        <img
          :alt="movie.name"
          :src="OPhimUtils.getPosterUrl(movie.poster_url)"
          class="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"
        />
        <div
          :class="
            cn(
              'absolute inset-0 transition-colors',
              currentIndex === index ? 'bg-transparent' : 'bg-black/40',
            )
          "
        />
        <div
          v-if="currentIndex === index"
          class="absolute inset-0 flex items-center justify-center"
        >
          <Play class="h-6 w-6 fill-current text-white drop-shadow-md" />
        </div>
      </button>
    </div>

    <div class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden">
      <button
        v-for="(_, index) in movies"
        :key="`dot-${index}`"
        :class="currentIndex === index ? 'h-2 w-6 rounded-full bg-yellow-500' : 'h-2 w-2 rounded-full bg-white/30'"
        type="button"
        @click="goToSlide(index)"
      />
    </div>
  </section>
</template>
