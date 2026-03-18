
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T

interface _GlobalComponents {
  AdminDashboard: typeof import("../../src/components/admin/AdminDashboard.vue")['default']
  AdminLoginForm: typeof import("../../src/components/admin/AdminLoginForm.vue")['default']
  GlobalScriptsClient: typeof import("../../src/components/admin/GlobalScriptsClient.vue")['default']
  CastList: typeof import("../../src/components/features/CastList.vue")['default']
  EpisodeGroup: typeof import("../../src/components/features/EpisodeGroup.vue")['default']
  HeroSection: typeof import("../../src/components/features/HeroSection.vue")['default']
  MovieCard: typeof import("../../src/components/features/MovieCard.vue")['default']
  MovieFilter: typeof import("../../src/components/features/MovieFilter.vue")['default']
  MovieGrid: typeof import("../../src/components/features/MovieGrid.vue")['default']
  RelatedMovies: typeof import("../../src/components/features/RelatedMovies.vue")['default']
  TrendingList: typeof import("../../src/components/features/TrendingList.vue")['default']
  VideoPlayer: typeof import("../../src/components/features/VideoPlayer.vue")['default']
  WatchPanel: typeof import("../../src/components/features/WatchPanel.vue")['default']
  SiteFooter: typeof import("../../src/components/layout/SiteFooter.vue")['default']
  SiteHeader: typeof import("../../src/components/layout/SiteHeader.vue")['default']
  AppPagination: typeof import("../../src/components/ui/AppPagination.vue")['default']
  NuxtWelcome: typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']
  NuxtLayout: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
  NuxtErrorBoundary: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
  ClientOnly: typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']
  DevOnly: typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']
  ServerPlaceholder: typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']
  NuxtLink: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']
  NuxtLoadingIndicator: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
  NuxtTime: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
  NuxtRouteAnnouncer: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
  NuxtImg: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
  NuxtPicture: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
  NuxtPage: typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']
  NoScript: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']
  Link: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']
  Base: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']
  Title: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']
  Meta: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']
  Style: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']
  Head: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']
  Html: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']
  Body: typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']
  NuxtIsland: typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']
  LazyAdminDashboard: LazyComponent<typeof import("../../src/components/admin/AdminDashboard.vue")['default']>
  LazyAdminLoginForm: LazyComponent<typeof import("../../src/components/admin/AdminLoginForm.vue")['default']>
  LazyGlobalScriptsClient: LazyComponent<typeof import("../../src/components/admin/GlobalScriptsClient.vue")['default']>
  LazyCastList: LazyComponent<typeof import("../../src/components/features/CastList.vue")['default']>
  LazyEpisodeGroup: LazyComponent<typeof import("../../src/components/features/EpisodeGroup.vue")['default']>
  LazyHeroSection: LazyComponent<typeof import("../../src/components/features/HeroSection.vue")['default']>
  LazyMovieCard: LazyComponent<typeof import("../../src/components/features/MovieCard.vue")['default']>
  LazyMovieFilter: LazyComponent<typeof import("../../src/components/features/MovieFilter.vue")['default']>
  LazyMovieGrid: LazyComponent<typeof import("../../src/components/features/MovieGrid.vue")['default']>
  LazyRelatedMovies: LazyComponent<typeof import("../../src/components/features/RelatedMovies.vue")['default']>
  LazyTrendingList: LazyComponent<typeof import("../../src/components/features/TrendingList.vue")['default']>
  LazyVideoPlayer: LazyComponent<typeof import("../../src/components/features/VideoPlayer.vue")['default']>
  LazyWatchPanel: LazyComponent<typeof import("../../src/components/features/WatchPanel.vue")['default']>
  LazySiteFooter: LazyComponent<typeof import("../../src/components/layout/SiteFooter.vue")['default']>
  LazySiteHeader: LazyComponent<typeof import("../../src/components/layout/SiteHeader.vue")['default']>
  LazyAppPagination: LazyComponent<typeof import("../../src/components/ui/AppPagination.vue")['default']>
  LazyNuxtWelcome: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
  LazyNuxtLayout: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
  LazyNuxtErrorBoundary: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
  LazyClientOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/client-only")['default']>
  LazyDevOnly: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/dev-only")['default']>
  LazyServerPlaceholder: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
  LazyNuxtLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
  LazyNuxtLoadingIndicator: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
  LazyNuxtTime: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
  LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
  LazyNuxtImg: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
  LazyNuxtPicture: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
  LazyNuxtPage: LazyComponent<typeof import("../../node_modules/nuxt/dist/pages/runtime/page")['default']>
  LazyNoScript: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
  LazyLink: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Link']>
  LazyBase: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Base']>
  LazyTitle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Title']>
  LazyMeta: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Meta']>
  LazyStyle: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Style']>
  LazyHead: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Head']>
  LazyHtml: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Html']>
  LazyBody: LazyComponent<typeof import("../../node_modules/nuxt/dist/head/runtime/components")['Body']>
  LazyNuxtIsland: LazyComponent<typeof import("../../node_modules/nuxt/dist/app/components/nuxt-island")['default']>
}

declare module 'vue' {
  export interface GlobalComponents extends _GlobalComponents { }
}

export {}
