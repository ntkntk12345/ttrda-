<script setup lang="ts">
import type { Episode, EpisodeServer } from "~/types/ophim";

const props = defineProps<{
  episodes: EpisodeServer[];
  movieSlug: string;
  initialEpisodeSlug?: string;
  initialServer?: string;
}>();

const route = useRoute();
const router = useRouter();
const activeServerIdx = ref(0);
const currentEpisode = ref<Episode | null>(null);

function getInitialServerIdx() {
  if (props.initialServer && props.episodes.length) {
    const matchedIndex = props.episodes.findIndex(
      (server) => server.server_name === props.initialServer,
    );
    if (matchedIndex >= 0) {
      return matchedIndex;
    }
  }

  return 0;
}

function getInitialEpisode(serverIndex: number) {
  const server = props.episodes[serverIndex];

  if (!server || !server.server_data.length) {
    return null;
  }

  if (props.initialEpisodeSlug) {
    const matchedEpisode = server.server_data.find(
      (episode) => episode.slug === props.initialEpisodeSlug,
    );
    if (matchedEpisode) {
      return matchedEpisode;
    }
  }

  return server.server_data[0];
}

watch(
  () => [props.episodes, props.initialEpisodeSlug, props.initialServer],
  () => {
    activeServerIdx.value = getInitialServerIdx();
    currentEpisode.value = getInitialEpisode(activeServerIdx.value);
  },
  { immediate: true, deep: true },
);

function handleEpisodeSelect(payload: { episode: Episode; serverIdx: number }) {
  const serverName = props.episodes[payload.serverIdx]?.server_name || "";
  activeServerIdx.value = payload.serverIdx;
  currentEpisode.value = payload.episode;

  router.replace({
    path: route.path,
    query: {
      ...route.query,
      tap: payload.episode.slug,
      server: serverName,
    },
  });
}
</script>

<template>
  <div class="flex w-full flex-col gap-8 lg:flex-row">
    <div class="min-w-0 w-full lg:flex-1">
      <ClientOnly>
        <VideoPlayer :episode="currentEpisode" />
        <template #fallback>
          <div class="flex aspect-video items-center justify-center rounded-xl bg-black text-gray-500">
            Đang tải trình phát...
          </div>
        </template>
      </ClientOnly>
    </div>

    <div class="w-full shrink-0 lg:w-72 xl:w-80">
      <div class="sticky top-24">
        <EpisodeGroup
          :active-server-idx="activeServerIdx"
          :current-episode="currentEpisode?.slug || ''"
          :current-server="episodes[activeServerIdx]?.server_name || ''"
          :episodes="episodes"
          interactive
          :movie-slug="movieSlug"
          @select="handleEpisodeSelect"
        />
      </div>
    </div>
  </div>
</template>
