<script setup lang="ts">
defineProps<{
  actors: string[];
}>();
</script>

<template>
  <div v-if="actors.length" class="mb-8">
    <h3 class="mb-4 text-lg font-bold text-white">Diễn viên</h3>
    <div class="grid grid-cols-3 gap-4">
      <div
        v-for="actor in actors.slice(0, 9)"
        :key="actor"
        class="flex flex-col items-center text-center"
      >
        <div class="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 bg-gray-800">
          <img
            :alt="actor"
            :src="`https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=random&color=fff`"
            class="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <span class="line-clamp-2 text-xs font-medium text-gray-300">{{ actor }}</span>
      </div>
    </div>
  </div>
</template>
