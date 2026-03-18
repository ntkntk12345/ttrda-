<script setup lang="ts">
import { Bell, Menu, Search, User, X } from "lucide-vue-next";

const navLinks = [
  { name: "Trang chủ", href: "/" },
  { name: "Phim bộ", href: "/danh-sach/phim-bo" },
  { name: "Phim lẻ", href: "/danh-sach/phim-le" },
  { name: "Hoạt hình", href: "/danh-sach/hoat-hinh" },
  { name: "TV Shows", href: "/danh-sach/tv-shows" },
];

const route = useRoute();
const router = useRouter();
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileSearchOpen = ref(false);
const searchQuery = ref(
  typeof route.query.keyword === "string" ? route.query.keyword : "",
);
let previousBodyOverflow = "";

function handleScroll() {
  isScrolled.value = window.scrollY > 0;
}

function handleSearch() {
  if (!searchQuery.value.trim()) {
    return;
  }

  router.push(`/tim-kiem?keyword=${encodeURIComponent(searchQuery.value.trim())}`);
  isMobileMenuOpen.value = false;
  isMobileSearchOpen.value = false;
}

watch(
  () => route.fullPath,
  () => {
    isMobileMenuOpen.value = false;
    isMobileSearchOpen.value = false;
    searchQuery.value =
      typeof route.query.keyword === "string" ? route.query.keyword : "";
  },
);

watch(isMobileMenuOpen, (isOpen) => {
  if (!import.meta.client) {
    return;
  }

  if (isOpen) {
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
});

onMounted(() => {
  handleScroll();
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
  if (import.meta.client) {
    document.body.style.overflow = previousBodyOverflow;
  }
});
</script>

<template>
  <header
    :class="
      cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-background-dark/95 py-3 shadow-lg backdrop-blur-md'
          : 'bg-transparent py-5',
      )
    "
  >
    <div class="container mx-auto flex items-center justify-between px-4">
      <NuxtLink class="group z-50 flex items-center" to="/">
        <img
          alt="Phimhayz.site"
          class="h-14 w-14 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(34,211,238,0.25)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16"
          height="64"
          src="/images/phimhay.jpg"
          width="64"
        />
      </NuxtLink>

      <nav class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.href"
          :class="
            cn(
              'group relative text-sm font-medium transition-colors hover:text-primary',
              route.path === link.href ? 'text-primary' : 'text-gray-300',
            )
          "
          :to="link.href"
        >
          {{ link.name }}
          <span
            :class="
              cn(
                'absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full',
                route.path === link.href ? 'w-full' : 'w-0',
              )
            "
          />
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-4">
        <form
          class="hidden items-center rounded-full border border-white/10 bg-card-dark/50 px-4 py-1.5 transition-all focus-within:border-primary/50 focus-within:bg-card-dark lg:flex"
          @submit.prevent="handleSearch"
        >
          <Search class="h-4 w-4 text-gray-400" />
          <input
            v-model="searchQuery"
            class="ml-2 w-48 border-none bg-transparent text-sm text-white placeholder-gray-500 focus:outline-none"
            placeholder="Tìm kiếm phim..."
            type="text"
          />
        </form>

        <button
          class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-background-dark/75 text-gray-300 shadow-lg shadow-black/20 backdrop-blur-md transition-colors hover:text-white lg:hidden"
          type="button"
          @click="
            () => {
              isMobileMenuOpen = false;
              isMobileSearchOpen = !isMobileSearchOpen;
            }
          "
        >
          <Search class="h-5 w-5" />
        </button>

        <button class="relative p-2 text-gray-300 hover:text-white" type="button">
          <Bell class="h-5 w-5" />
          <span
            class="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-background-dark bg-red-500"
          />
        </button>

        <button
          class="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-white/10 bg-gradient-to-r from-gray-700 to-gray-600"
          type="button"
        >
          <User class="h-4 w-4 text-gray-300" />
        </button>

        <button
          :class="
            cn(
              'z-50 flex h-11 w-11 items-center justify-center rounded-full border shadow-lg shadow-black/30 backdrop-blur-md transition-colors md:hidden',
              isMobileMenuOpen
                ? 'border-primary bg-primary text-slate-950'
                : 'border-white/10 bg-background-dark/80 text-gray-100 hover:text-white',
            )
          "
          type="button"
          @click="
            () => {
              isMobileSearchOpen = false;
              isMobileMenuOpen = !isMobileMenuOpen;
            }
          "
        >
          <X v-if="isMobileMenuOpen" class="h-6 w-6" />
          <Menu v-else class="h-6 w-6" />
        </button>
      </div>
    </div>

    <div
      :class="
        cn(
          'overflow-hidden border-t border-white/5 bg-background-dark/95 px-4 transition-all duration-300 md:hidden',
          isMobileSearchOpen ? 'max-h-28 py-4 opacity-100' : 'max-h-0 py-0 opacity-0',
        )
      "
    >
      <form
        class="flex items-center rounded-full border border-white/10 bg-card-dark px-4 py-3"
        @submit.prevent="handleSearch"
      >
        <Search class="h-5 w-5 text-gray-400" />
        <input
          v-model="searchQuery"
          autofocus
          class="ml-3 w-full border-none bg-transparent text-base text-white focus:outline-none"
          placeholder="Tìm kiếm phim..."
          type="text"
        />
      </form>
    </div>

    <button
      :class="
        cn(
          'fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ease-out md:hidden',
          isMobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )
      "
      aria-label="Dong menu"
      type="button"
      @click="isMobileMenuOpen = false"
    />

    <div
      :class="
        cn(
          'fixed inset-y-0 right-0 z-[60] flex w-full max-w-[22rem] flex-col gap-6 border-l border-white/10 bg-[linear-gradient(180deg,rgba(4,7,20,0.98),rgba(6,12,30,0.96))] px-6 pb-8 pt-24 shadow-[0_25px_80px_rgba(0,0,0,0.45)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden',
          isMobileMenuOpen
            ? 'translate-x-0 scale-100 opacity-100'
            : 'pointer-events-none translate-x-8 scale-[0.985] opacity-0',
        )
      "
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
            Dieu huong
          </p>
          <p class="mt-2 text-sm text-gray-400">Chon nhanh danh muc phim ban muon xem.</p>
        </div>

        <button
          class="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-gray-200 transition-all hover:border-primary/40 hover:bg-white/10 hover:text-white"
          aria-label="Dong menu"
          type="button"
          @click="isMobileMenuOpen = false"
        >
          <X class="h-5 w-5" />
        </button>
      </div>

      <nav class="flex flex-col gap-3">
        <NuxtLink
          v-for="(link, index) in navLinks"
          :key="link.href"
          :class="
            cn(
              'rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-lg font-medium transition-all duration-300 hover:border-primary/30 hover:bg-white/[0.06] hover:text-primary',
              isMobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0',
              route.path === link.href ? 'text-primary' : 'text-gray-300',
            )
          "
          :style="{ transitionDelay: isMobileMenuOpen ? `${index * 45}ms` : '0ms' }"
          :to="link.href"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
