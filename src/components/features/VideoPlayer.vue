<script setup lang="ts">
import {
  AlertCircle,
  LoaderCircle,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Settings,
  Volume2,
  VolumeX,
} from "lucide-vue-next";

import type { Episode } from "~/types/ophim";

const props = defineProps<{
  episode?: Episode | null;
}>();

const videoRef = ref<HTMLVideoElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
const error = ref("");
const isPlaying = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const volume = ref(1);
const isMuted = ref(false);
const isFullscreen = ref(false);
const isLoading = ref(true);
const showControls = ref(true);
const playbackRate = ref(1);
const showSettings = ref(false);
const hlsInstance = ref<any>(null);
let controlsTimeout: ReturnType<typeof setTimeout> | null = null;
let fullscreenListener: (() => void) | null = null;

function formatTime(time: number) {
  if (!time) {
    return "00:00";
  }

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = Math.floor(time % 60);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function clearHls() {
  if (hlsInstance.value) {
    hlsInstance.value.destroy();
    hlsInstance.value = null;
  }
}

function handleMouseMove() {
  showControls.value = true;

  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }

  controlsTimeout = setTimeout(() => {
    if (isPlaying.value) {
      showControls.value = false;
    }
  }, 3000);
}

function togglePlay() {
  if (!videoRef.value) {
    return;
  }

  if (isPlaying.value) {
    videoRef.value.pause();
  } else {
    void videoRef.value.play();
  }
}

function handleTimeUpdate() {
  if (!videoRef.value) {
    return;
  }

  currentTime.value = videoRef.value.currentTime;
  duration.value = videoRef.value.duration || 0;
}

function handleSeek(event: Event) {
  if (!videoRef.value) {
    return;
  }

  const nextTime = Number((event.target as HTMLInputElement).value);
  videoRef.value.currentTime = nextTime;
  currentTime.value = nextTime;
}

function seekRelative(seconds: number) {
  if (videoRef.value) {
    videoRef.value.currentTime += seconds;
  }
}

function handleVolumeChange(event: Event) {
  if (!videoRef.value) {
    return;
  }

  const nextVolume = Number((event.target as HTMLInputElement).value);
  videoRef.value.volume = nextVolume;
  videoRef.value.muted = nextVolume === 0;
  volume.value = nextVolume;
  isMuted.value = nextVolume === 0;
}

function toggleMute() {
  if (!videoRef.value) {
    return;
  }

  const nextMuted = !isMuted.value;
  videoRef.value.muted = nextMuted;
  isMuted.value = nextMuted;

  if (!nextMuted && volume.value === 0) {
    volume.value = 0.5;
    videoRef.value.volume = 0.5;
  }
}

async function toggleFullscreen() {
  if (!containerRef.value || !process.client) {
    return;
  }

  if (!document.fullscreenElement) {
    await containerRef.value.requestFullscreen();
  } else {
    await document.exitFullscreen();
  }
}

function changePlaybackRate(rate: number) {
  if (videoRef.value) {
    videoRef.value.playbackRate = rate;
  }

  playbackRate.value = rate;
  showSettings.value = false;
}

async function setupSource() {
  const video = videoRef.value;

  if (!video) {
    return;
  }

  clearHls();
  error.value = "";
  isPlaying.value = false;
  isLoading.value = true;
  currentTime.value = 0;
  duration.value = 0;
  showSettings.value = false;
  video.pause();
  video.removeAttribute("src");
  video.load();

  if (!props.episode?.link_m3u8) {
    isLoading.value = false;
    return;
  }

  try {
    const { default: Hls } = await import("hls.js");

    if (Hls.isSupported()) {
      const instance = new Hls();
      hlsInstance.value = instance;
      instance.loadSource(props.episode.link_m3u8);
      instance.attachMedia(video);
      instance.on(Hls.Events.MANIFEST_PARSED, () => {
        isLoading.value = false;
      });
      instance.on(Hls.Events.ERROR, (_event: unknown, data: { fatal?: boolean }) => {
        if (data?.fatal) {
          isLoading.value = false;
          error.value = "Không thể tải video. Vui lòng thử server khác.";
        }
      });
      return;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = props.episode.link_m3u8;
      isLoading.value = false;
      return;
    }

    error.value = "Trình duyệt không hỗ trợ phát HLS.";
    isLoading.value = false;
  } catch {
    error.value = "Không thể khởi tạo trình phát video.";
    isLoading.value = false;
  }
}

function handleKeyDown(event: KeyboardEvent) {
  if (document.activeElement?.tagName === "INPUT") {
    return;
  }

  switch (event.key) {
    case " ":
    case "k":
      event.preventDefault();
      togglePlay();
      break;
    case "ArrowLeft":
      seekRelative(-10);
      break;
    case "ArrowRight":
      seekRelative(10);
      break;
    case "f":
      void toggleFullscreen();
      break;
  }
}

watch(
  () => props.episode,
  async () => {
    await nextTick();
    await setupSource();
  },
  { immediate: true },
);

onMounted(() => {
  fullscreenListener = () => {
    isFullscreen.value = Boolean(document.fullscreenElement);
  };
  document.addEventListener("fullscreenchange", fullscreenListener);
  window.addEventListener("keydown", handleKeyDown);
});

onBeforeUnmount(() => {
  clearHls();
  if (controlsTimeout) {
    clearTimeout(controlsTimeout);
  }
  if (process.client) {
    window.removeEventListener("keydown", handleKeyDown);
  }
  if (fullscreenListener) {
    document.removeEventListener("fullscreenchange", fullscreenListener);
  }
});
</script>

<template>
  <div
    v-if="!episode"
    class="flex aspect-video items-center justify-center rounded-xl bg-black text-gray-500"
  >
    <p>Chọn tập phim để xem</p>
  </div>

  <div
    v-else-if="!episode.link_m3u8 && episode.link_embed"
    class="relative z-20 aspect-video overflow-hidden rounded-xl bg-black"
  >
    <iframe
      :src="episode.link_embed"
      allow="autoplay; encrypted-media"
      allowfullscreen
      class="h-full w-full border-0"
    />
  </div>

  <div
    v-else
    ref="containerRef"
    class="group relative z-20 aspect-video select-none overflow-hidden rounded-xl bg-black"
    @mouseleave="isPlaying ? (showControls = false) : undefined"
    @mousemove="handleMouseMove"
  >
    <div
      v-if="error"
      class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-red-500"
    >
      <AlertCircle class="mb-2 h-10 w-10" />
      <p>{{ error }}</p>
    </div>

    <div
      v-if="isLoading && !error"
      class="pointer-events-none absolute inset-0 z-40 flex items-center justify-center bg-black/50"
    >
      <LoaderCircle class="h-12 w-12 animate-spin text-primary" />
    </div>

    <video
      ref="videoRef"
      class="h-full w-full cursor-pointer object-contain"
      @click="togglePlay"
      @ended="isPlaying = false"
      @pause="isPlaying = false"
      @play="isPlaying = true"
      @playing="isLoading = false"
      @timeupdate="handleTimeUpdate"
      @waiting="isLoading = true"
    />

    <div
      :class="
        cn(
          'pointer-events-none absolute inset-0 z-30 flex flex-col justify-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 transition-opacity duration-300',
          showControls ? 'opacity-100' : 'opacity-0',
        )
      "
    >
      <div class="group/timeline pointer-events-auto mb-4 flex w-full items-center gap-2">
        <input
          :max="duration || 100"
          :style="{ backgroundSize: `${duration ? (currentTime / duration) * 100 : 0}% 100%` }"
          :value="currentTime"
          class="h-1 w-full cursor-pointer appearance-none rounded-lg bg-gradient-to-r from-white to-white bg-no-repeat"
          min="0"
          type="range"
          @input="handleSeek"
        />
      </div>

      <div class="pointer-events-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <button class="text-white transition-colors hover:text-primary" type="button" @click="togglePlay">
            <Pause v-if="isPlaying" class="h-6 w-6 fill-current" />
            <Play v-else class="h-6 w-6 fill-current" />
          </button>

          <div class="flex items-center gap-2 text-white">
            <button class="transition-colors hover:text-primary" title="Lùi 10s" type="button" @click="seekRelative(-10)">
              <RotateCcw class="h-5 w-5" />
            </button>
            <button class="transition-colors hover:text-primary" title="Tiến 10s" type="button" @click="seekRelative(10)">
              <RotateCw class="h-5 w-5" />
            </button>
          </div>

          <div class="group/volume flex items-center gap-2">
            <button class="text-white transition-colors hover:text-primary" type="button" @click="toggleMute">
              <VolumeX v-if="isMuted || volume === 0" class="h-6 w-6" />
              <Volume2 v-else class="h-6 w-6" />
            </button>
            <input
              :value="isMuted ? 0 : volume"
              class="h-1 w-0 cursor-pointer overflow-hidden rounded-lg bg-white/30 transition-all group-hover/volume:w-20"
              max="1"
              min="0"
              step="0.1"
              type="range"
              @input="handleVolumeChange"
            />
          </div>

          <span class="text-sm font-medium text-gray-300">
            {{ formatTime(currentTime) }} / {{ formatTime(duration) }}
          </span>
        </div>

        <div class="relative flex items-center gap-4">
          <div class="relative">
            <button
              class="flex items-center gap-1 text-white transition-colors hover:text-primary"
              type="button"
              @click="showSettings = !showSettings"
            >
              <span class="text-sm font-bold">{{ playbackRate }}x</span>
              <Settings class="h-5 w-5" />
            </button>

            <div
              v-if="showSettings"
              class="absolute bottom-full right-0 mb-2 min-w-[100px] rounded-lg border border-white/10 bg-black/90 p-2 shadow-xl"
            >
              <button
                v-for="rate in [0.5, 1, 1.25, 1.5, 2]"
                :key="rate"
                :class="
                  cn(
                    'block w-full rounded px-3 py-1.5 text-left text-sm transition-colors hover:bg-white/20',
                    playbackRate === rate ? 'font-bold text-primary' : 'text-white',
                  )
                "
                type="button"
                @click="changePlaybackRate(rate)"
              >
                {{ rate }}x
              </button>
            </div>
          </div>

          <button class="text-white transition-colors hover:text-primary" type="button" @click="toggleFullscreen">
            <Minimize v-if="isFullscreen" class="h-6 w-6" />
            <Maximize v-else class="h-6 w-6" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
