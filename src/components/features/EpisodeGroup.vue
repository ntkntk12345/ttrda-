<script setup lang="ts">
import type { PropType } from "vue";

import type { Episode, EpisodeServer } from "~/types/ophim";

const props = defineProps({
  episodes: {
    type: Array as PropType<EpisodeServer[]>,
    default: () => [],
  },
  currentEpisode: {
    type: String,
    default: "",
  },
  currentServer: {
    type: String,
    default: "",
  },
  activeServerIdx: {
    type: Number,
    default: undefined,
  },
  movieSlug: {
    type: String,
    default: "",
  },
  interactive: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  select: [payload: { episode: Episode; serverIdx: number }];
}>();

const localActiveServer = ref(0);

watch(
  () => [props.activeServerIdx, props.currentServer, props.episodes],
  () => {
    if (typeof props.activeServerIdx === "number") {
      localActiveServer.value = props.activeServerIdx;
      return;
    }

    const matchedIndex = props.episodes.findIndex(
      (server) => server.server_name === props.currentServer,
    );
    localActiveServer.value = matchedIndex >= 0 ? matchedIndex : 0;
  },
  { immediate: true, deep: true },
);

const activeServer = computed(() => {
  if (typeof props.activeServerIdx === "number") {
    return props.activeServerIdx;
  }

  return localActiveServer.value;
});

const activeServerData = computed(() => props.episodes[activeServer.value]);

function handleEpisodeClick(episode: Episode) {
  if (!props.interactive) {
    return;
  }

  emit("select", { episode, serverIdx: activeServer.value });
}

function buildWatchLink(episode: Episode) {
  const serverName = activeServerData.value?.server_name || "";
  const params = new URLSearchParams();
  params.set("tap", episode.slug);
  params.set("server", serverName);
  return `/watch/${props.movieSlug}?${params.toString()}`;
}
</script>

<template>
  <div
    v-if="episodes.length"
    class="rounded-xl border border-white/5 bg-card-dark p-6"
  >
    <h3 class="mb-4 flex items-center gap-2 text-xl font-bold text-white">
      <span class="h-6 w-1 rounded-full bg-primary" />
      Danh sách tập
    </h3>

    <div class="mb-6 flex flex-wrap gap-2">
      <button
        v-for="(server, index) in episodes"
        :key="server.server_name"
        :class="
          cn(
            'rounded-lg px-4 py-2 text-sm font-medium transition-all',
            activeServer === index
              ? 'bg-primary text-slate-950 shadow-lg shadow-primary/20'
              : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white',
          )
        "
        type="button"
        @click="localActiveServer = index"
      >
        {{ server.server_name }}
      </button>
    </div>

    <div
      v-if="activeServerData"
      class="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto pr-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
    >
      <template v-for="episode in activeServerData.server_data" :key="episode.slug">
        <button
          v-if="interactive"
          :class="
            cn(
              'rounded border py-2 text-center text-xs font-semibold transition-all',
              currentEpisode === episode.slug
                ? 'border-cyan-400 bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                : 'border-white/10 bg-transparent text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400',
            )
          "
          type="button"
          @click="handleEpisodeClick(episode)"
        >
          {{ episode.name }}
        </button>
        <NuxtLink
          v-else
          :class="
            cn(
              'rounded border py-2 text-center text-xs font-semibold transition-all',
              currentEpisode === episode.slug
                ? 'border-cyan-400 bg-cyan-400 text-black shadow-lg shadow-cyan-400/20'
                : 'border-white/10 bg-transparent text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400',
            )
          "
          :to="buildWatchLink(episode)"
        >
          {{ episode.name }}
        </NuxtLink>
      </template>
    </div>
  </div>

  <div
    v-else
    class="rounded-xl border border-white/5 bg-card-dark p-6 text-sm text-gray-400"
  >
    Không có tập phim nào.
  </div>
</template>
