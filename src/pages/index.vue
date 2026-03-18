<script setup lang="ts">
import { OphimService } from "~/utils/ophim-service";

const [phimMoi, phimBo, phimLe, hoatHinh] = await Promise.all([
  OphimService.getHomeMovies(),
  OphimService.getMoviesByCategory("phim-bo"),
  OphimService.getMoviesByCategory("phim-le"),
  OphimService.getMoviesByCategory("hoat-hinh"),
]);

useSeoMeta({
  title: "Phimhayz.site - Xem phim online chat luong cao",
  description:
    "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
  ogTitle: "Phimhayz.site - Xem phim online chat luong cao",
  ogDescription:
    "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
  twitterTitle: "Phimhayz.site - Xem phim online chat luong cao",
  twitterDescription:
    "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
});
</script>

<template>
  <div class="space-y-12">
    <HeroSection v-if="phimMoi?.items?.length" :movies="phimMoi.items.slice(0, 8)" />

    <div class="container mx-auto space-y-16 px-4 pb-20">
      <MovieGrid
        v-if="phimMoi?.items?.length"
        class-name=""
        :movies="phimMoi.items.slice(1, 13)"
        title="Phim mới cập nhật"
      />

      <MovieGrid
        v-if="phimBo?.items?.length"
        :movies="phimBo.items.slice(0, 12)"
        title="Phim bộ hot"
      />

      <MovieGrid
        v-if="phimLe?.items?.length"
        :movies="phimLe.items.slice(0, 12)"
        title="Phim lẻ mới"
      />

      <MovieGrid
        v-if="hoatHinh?.items?.length"
        :movies="hoatHinh.items.slice(0, 12)"
        title="Phim hoạt hình"
      />
    </div>
  </div>
</template>
