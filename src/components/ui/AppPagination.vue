<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";

const props = defineProps<{
  currentPage: number;
  totalPages: number;
  baseUrl: string;
  extraParams?: Record<string, string>;
  className?: string;
}>();

function buildUrl(page: number) {
  const params = new URLSearchParams(props.extraParams || {});
  params.set("page", String(page));
  return `${props.baseUrl}?${params.toString()}`;
}

const pageItems = computed(() => {
  const items: Array<number | string> = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, props.currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(props.totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    items.push(1);
    if (startPage > 2) {
      items.push("dots-start");
    }
  }

  for (let page = startPage; page <= endPage; page += 1) {
    items.push(page);
  }

  if (endPage < props.totalPages) {
    if (endPage < props.totalPages - 1) {
      items.push("dots-end");
    }
    items.push(props.totalPages);
  }

  return items;
});
</script>

<template>
  <div
    v-if="totalPages > 1"
    :class="
      cn(
        'mb-8 mt-12 flex select-none items-center justify-center gap-2',
        className,
      )
    "
  >
    <NuxtLink
      :class="
        cn(
          'flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 font-medium text-gray-400 transition-all',
          currentPage === 1
            ? 'pointer-events-none opacity-50'
            : 'hover:border-white/20 hover:bg-white/10 hover:text-white',
        )
      "
      :to="currentPage > 1 ? buildUrl(currentPage - 1) : '#'"
    >
      <ChevronLeft class="h-4 w-4" />
      <span class="hidden sm:inline">Trang trước</span>
    </NuxtLink>

    <div class="flex items-center gap-2">
      <template v-for="item in pageItems" :key="item">
        <span
          v-if="typeof item === 'string'"
          class="flex h-10 w-10 items-center justify-center text-gray-500"
        >
          ...
        </span>
        <NuxtLink
          v-else
          :class="
            cn(
              'flex h-10 w-10 items-center justify-center rounded-lg border font-medium transition-all',
              item === currentPage
                ? 'pointer-events-none scale-105 border-cyan-500 bg-cyan-500 font-bold text-black shadow-lg shadow-cyan-500/20'
                : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:bg-white/10 hover:text-white',
            )
          "
          :to="buildUrl(item)"
        >
          {{ item }}
        </NuxtLink>
      </template>
    </div>

    <NuxtLink
      :class="
        cn(
          'flex h-10 items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 font-medium text-gray-400 transition-all',
          currentPage === totalPages
            ? 'pointer-events-none opacity-50'
            : 'hover:border-white/20 hover:bg-white/10 hover:text-white',
        )
      "
      :to="currentPage < totalPages ? buildUrl(currentPage + 1) : '#'"
    >
      <span class="hidden sm:inline">Trang sau</span>
      <ChevronRight class="h-4 w-4" />
    </NuxtLink>
  </div>
</template>
