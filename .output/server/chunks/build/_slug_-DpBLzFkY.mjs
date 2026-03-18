globalThis.__timing__.logStart('Load chunks/build/_slug_-DpBLzFkY');import { u as useAsyncData, _ as __nuxt_component_0 } from './asyncData-CmHscAf-.mjs';
import { _ as _sfc_main$5 } from './EpisodeGroup-BXXTDdMG.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, ref, watch, withCtx, createVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { u as useRoute, c as createError, a as useRuntimeConfig, d as useRouter } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './nuxt-link-2k-Xgjf3.mjs';
import { Play, TrendingUp, Eye } from 'lucide-vue-next';
import { a as OPhimUtils, O as OphimService } from './ophim-service-BpMmC9L9.mjs';
import { c as cn } from './cn-H80jjgLf.mjs';
import { u as useSeoMeta, a as useHead } from './v3-m4Jfmifc.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'clsx';
import 'tailwind-merge';

const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "WatchPanel",
  __ssrInlineRender: true,
  props: {
    episodes: {},
    movieSlug: {},
    initialEpisodeSlug: {},
    initialServer: {}
  },
  setup(__props) {
    const props = __props;
    const route = useRoute();
    const router = useRouter();
    const activeServerIdx = ref(0);
    const currentEpisode = ref(null);
    function getInitialServerIdx() {
      if (props.initialServer && props.episodes.length) {
        const matchedIndex = props.episodes.findIndex(
          (server) => server.server_name === props.initialServer
        );
        if (matchedIndex >= 0) {
          return matchedIndex;
        }
      }
      return 0;
    }
    function getInitialEpisode(serverIndex) {
      const server = props.episodes[serverIndex];
      if (!server || !server.server_data.length) {
        return null;
      }
      if (props.initialEpisodeSlug) {
        const matchedEpisode = server.server_data.find(
          (episode) => episode.slug === props.initialEpisodeSlug
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
      { immediate: true, deep: true }
    );
    function handleEpisodeSelect(payload) {
      var _a;
      const serverName = ((_a = props.episodes[payload.serverIdx]) == null ? void 0 : _a.server_name) || "";
      activeServerIdx.value = payload.serverIdx;
      currentEpisode.value = payload.episode;
      router.replace({
        path: route.path,
        query: {
          ...route.query,
          tap: payload.episode.slug,
          server: serverName
        }
      });
    }
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_ClientOnly = __nuxt_component_0;
      const _component_EpisodeGroup = _sfc_main$5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex w-full flex-col gap-8 lg:flex-row" }, _attrs))}><div class="min-w-0 w-full lg:flex-1">`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {
        fallback: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex aspect-video items-center justify-center rounded-xl bg-black text-gray-500"${_scopeId}> \u0110ang t\u1EA3i tr\xECnh ph\xE1t... </div>`);
          } else {
            return [
              createVNode("div", { class: "flex aspect-video items-center justify-center rounded-xl bg-black text-gray-500" }, " \u0110ang t\u1EA3i tr\xECnh ph\xE1t... ")
            ];
          }
        })
      }, _parent));
      _push(`</div><div class="w-full shrink-0 lg:w-72 xl:w-80"><div class="sticky top-24">`);
      _push(ssrRenderComponent(_component_EpisodeGroup, {
        "active-server-idx": unref(activeServerIdx),
        "current-episode": ((_a = unref(currentEpisode)) == null ? void 0 : _a.slug) || "",
        "current-server": ((_b = __props.episodes[unref(activeServerIdx)]) == null ? void 0 : _b.server_name) || "",
        episodes: __props.episodes,
        interactive: "",
        "movie-slug": __props.movieSlug,
        onSelect: handleEpisodeSelect
      }, null, _parent));
      _push(`</div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/WatchPanel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "RelatedMovies",
  __ssrInlineRender: true,
  props: {
    movies: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (__props.movies.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mt-12" }, _attrs))}><h3 class="mb-6 border-l-4 border-primary pl-3 text-xl font-bold text-white"> C\xF3 th\u1EC3 b\u1EA1n s\u1EBD th\xEDch </h3><div class="grid grid-cols-2 gap-4 md:grid-cols-4"><!--[-->`);
        ssrRenderList(__props.movies, (movie) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: movie._id || movie.slug,
            to: `/phim/${movie.slug}`,
            class: "group relative block aspect-[2/3] overflow-hidden rounded-xl bg-gray-800"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("alt", movie.name)}${ssrRenderAttr("src", unref(OPhimUtils).getThumbUrl(movie.thumb_url || movie.poster_url))} class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy"${_scopeId}><div class="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100"${_scopeId}><div class="flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary/90 text-black transition-transform delay-100 duration-300 group-hover:scale-100"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Play), { class: "ml-0.5 h-5 w-5 fill-current" }, null, _parent2, _scopeId));
                _push2(`</div></div><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3"${_scopeId}><h4 class="line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-primary"${_scopeId}>${ssrInterpolate(movie.name)}</h4><p class="mt-1 text-xs text-gray-400"${_scopeId}>${ssrInterpolate(movie.year)} \u2022 ${ssrInterpolate(movie.quality)}</p></div>`);
              } else {
                return [
                  createVNode("img", {
                    alt: movie.name,
                    src: unref(OPhimUtils).getThumbUrl(movie.thumb_url || movie.poster_url),
                    class: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
                    loading: "lazy"
                  }, null, 8, ["alt", "src"]),
                  createVNode("div", { class: "absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }, [
                    createVNode("div", { class: "flex h-12 w-12 scale-0 items-center justify-center rounded-full bg-primary/90 text-black transition-transform delay-100 duration-300 group-hover:scale-100" }, [
                      createVNode(unref(Play), { class: "ml-0.5 h-5 w-5 fill-current" })
                    ])
                  ]),
                  createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3" }, [
                    createVNode("h4", { class: "line-clamp-1 text-sm font-bold text-white transition-colors group-hover:text-primary" }, toDisplayString(movie.name), 1),
                    createVNode("p", { class: "mt-1 text-xs text-gray-400" }, toDisplayString(movie.year) + " \u2022 " + toDisplayString(movie.quality), 1)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/RelatedMovies.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CastList",
  __ssrInlineRender: true,
  props: {
    actors: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      if (__props.actors.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "mb-8" }, _attrs))}><h3 class="mb-4 text-lg font-bold text-white">Di\u1EC5n vi\xEAn</h3><div class="grid grid-cols-3 gap-4"><!--[-->`);
        ssrRenderList(__props.actors.slice(0, 9), (actor) => {
          _push(`<div class="flex flex-col items-center text-center"><div class="relative mb-2 h-16 w-16 overflow-hidden rounded-full border-2 border-white/10 bg-gray-800"><img${ssrRenderAttr("alt", actor)}${ssrRenderAttr("src", `https://ui-avatars.com/api/?name=${encodeURIComponent(actor)}&background=random&color=fff`)} class="h-full w-full object-cover" loading="lazy"></div><span class="line-clamp-2 text-xs font-medium text-gray-300">${ssrInterpolate(actor)}</span></div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/CastList.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TrendingList",
  __ssrInlineRender: true,
  props: {
    movies: {}
  },
  setup(__props) {
    const props = __props;
    function getViewCount(movie) {
      if (movie.view) {
        return movie.view;
      }
      const seed = movie.slug.split("").reduce((total, char) => total + char.charCodeAt(0), 0);
      return 1e3 + seed % 9e3;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$1;
      if (props.movies.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "overflow-hidden rounded-xl border border-white/5 bg-card-dark/60" }, _attrs))}><div class="flex items-center gap-2 border-b border-white/5 p-4">`);
        _push(ssrRenderComponent(unref(TrendingUp), { class: "h-5 w-5 text-primary" }, null, _parent));
        _push(`<h3 class="font-bold text-white">Top xem nhi\u1EC1u</h3></div><div class="divide-y divide-white/5"><!--[-->`);
        ssrRenderList(props.movies, (movie, index) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: movie._id || movie.slug,
            to: `/phim/${movie.slug}`,
            class: "group flex gap-4 p-4 transition-colors hover:bg-white/5"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg"${_scopeId}><img${ssrRenderAttr("alt", movie.name)}${ssrRenderAttr("src", unref(OPhimUtils).getThumbUrl(movie.thumb_url || movie.poster_url))} class="h-full w-full object-cover" loading="lazy"${_scopeId}><div class="${ssrRenderClass(
                  ("cn" in _ctx ? _ctx.cn : unref(cn))(
                    "absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-xs font-bold text-white",
                    index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-700" : "bg-black/60"
                  )
                )}"${_scopeId}>${ssrInterpolate(index + 1)}</div></div><div class="min-w-0 flex-1 py-1"${_scopeId}><h4 class="mb-1 line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-primary"${_scopeId}>${ssrInterpolate(movie.name)}</h4><p class="mb-2 truncate text-xs text-gray-500"${_scopeId}>${ssrInterpolate(movie.origin_name)}</p><div class="flex items-center gap-1 text-xs text-gray-400"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Eye), { class: "h-3 w-3" }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>${ssrInterpolate(getViewCount(movie))} l\u01B0\u1EE3t xem</span></div></div>`);
              } else {
                return [
                  createVNode("div", { class: "relative h-24 w-16 flex-shrink-0 overflow-hidden rounded-lg" }, [
                    createVNode("img", {
                      alt: movie.name,
                      src: unref(OPhimUtils).getThumbUrl(movie.thumb_url || movie.poster_url),
                      class: "h-full w-full object-cover",
                      loading: "lazy"
                    }, null, 8, ["alt", "src"]),
                    createVNode("div", {
                      class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
                        "absolute left-0 top-0 flex h-6 w-6 items-center justify-center text-xs font-bold text-white",
                        index === 0 ? "bg-yellow-500" : index === 1 ? "bg-gray-400" : index === 2 ? "bg-orange-700" : "bg-black/60"
                      )
                    }, toDisplayString(index + 1), 3)
                  ]),
                  createVNode("div", { class: "min-w-0 flex-1 py-1" }, [
                    createVNode("h4", { class: "mb-1 line-clamp-2 text-sm font-medium text-white transition-colors group-hover:text-primary" }, toDisplayString(movie.name), 1),
                    createVNode("p", { class: "mb-2 truncate text-xs text-gray-500" }, toDisplayString(movie.origin_name), 1),
                    createVNode("div", { class: "flex items-center gap-1 text-xs text-gray-400" }, [
                      createVNode(unref(Eye), { class: "h-3 w-3" }),
                      createVNode("span", null, toDisplayString(getViewCount(movie)) + " l\u01B0\u1EE3t xem", 1)
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/TrendingList.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const slug = computed(() => decodeURIComponent(String(route.params.slug || "")));
    const tap = computed(
      () => typeof route.query.tap === "string" ? route.query.tap : void 0
    );
    const server = computed(
      () => typeof route.query.server === "string" ? route.query.server : void 0
    );
    function getSelectedEpisode(episodes2, episodeSlug, serverName) {
      const preferredServer = serverName ? episodes2.find((item) => item.server_name === serverName) : void 0;
      const orderedServers = preferredServer ? [preferredServer, ...episodes2.filter((item) => item !== preferredServer)] : episodes2;
      if (episodeSlug) {
        for (const item of orderedServers) {
          const matchedEpisode = item.server_data.find(
            (episode) => episode.slug === episodeSlug
          );
          if (matchedEpisode) {
            return matchedEpisode;
          }
        }
      }
      for (const item of orderedServers) {
        if (item.server_data[0]) {
          return item.server_data[0];
        }
      }
      return null;
    }
    function normalizeEpisodeLabel(episodeName) {
      if (!episodeName) {
        return null;
      }
      const trimmedName = episodeName.trim();
      if (/^\d+$/.test(trimmedName)) {
        return `T\u1EADp ${trimmedName}`;
      }
      return trimmedName;
    }
    function buildWatchTitle(movie2, episodeName) {
      const episodeLabel = normalizeEpisodeLabel(episodeName);
      const episodeSuffix = episodeLabel ? ` ${episodeLabel}` : "";
      const langSuffix = movie2.lang ? ` ${movie2.lang}` : "";
      return `Xem phim ${movie2.name}${episodeSuffix}${langSuffix} | Phimhayz.site`;
    }
    function buildWatchDescription(movie2, episodeName) {
      const cleanedContent = OPhimUtils.cleanContent(movie2.content || "").replace(/\s+/g, " ").trim();
      const episodeLabel = normalizeEpisodeLabel(episodeName);
      const episodeText = episodeLabel ? ` ${episodeLabel}` : "";
      const metaBits = [
        movie2.quality,
        movie2.lang,
        movie2.time,
        movie2.year ? String(movie2.year) : void 0
      ].filter(Boolean).join(", ");
      const prefix = `Xem phim ${movie2.name}${episodeText}${metaBits ? ` ${metaBits}` : ""} tai Phimhayz.site.`;
      return `${prefix} ${cleanedContent}`.trim().slice(0, 160);
    }
    function buildWatchKeywords(movie2, episodeName) {
      var _a, _b;
      const episodeLabel = normalizeEpisodeLabel(episodeName);
      return [
        `xem phim ${movie2.name}`,
        episodeLabel ? `xem phim ${movie2.name} ${episodeLabel}` : null,
        movie2.origin_name,
        movie2.lang,
        movie2.quality,
        movie2.year ? String(movie2.year) : null,
        ...(_b = (_a = movie2.category) == null ? void 0 : _a.map((category) => category.name)) != null ? _b : []
      ].filter((value) => Boolean(value));
    }
    function buildWatchCanonicalPath(movieSlug, episodeSlug) {
      if (!episodeSlug) {
        return `/watch/${movieSlug}`;
      }
      return `/watch/${movieSlug}?tap=${encodeURIComponent(episodeSlug)}`;
    }
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "watch-movie-detail",
      async () => {
        const response = await OphimService.getMovieBySlug(slug.value);
        if (!(response == null ? void 0 : response.movie)) {
          throw createError({
            statusCode: 404,
            statusMessage: "Kh\xF4ng t\xECm th\u1EA5y phim"
          });
        }
        return response;
      },
      {
        watch: [slug]
      }
    )), __temp = await __temp, __restore(), __temp);
    const { data: relatedData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "watch-related-movies",
      () => OphimService.getMoviesByCategory("phim-bo", 1)
    )), __temp = await __temp, __restore(), __temp);
    const { data: trendingData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      "watch-trending-movies",
      () => OphimService.getHomeMovies(1)
    )), __temp = await __temp, __restore(), __temp);
    const movie = computed(() => data.value.movie);
    const episodes = computed(() => {
      var _a;
      return (_a = data.value.episodes) != null ? _a : [];
    });
    const currentEpisode = computed(
      () => getSelectedEpisode(episodes.value, tap.value, server.value)
    );
    const currentEpisodeLabel = computed(
      () => {
        var _a;
        return normalizeEpisodeLabel((_a = currentEpisode.value) == null ? void 0 : _a.name);
      }
    );
    const watchTitle = computed(
      () => buildWatchTitle(movie.value, currentEpisodeLabel.value)
    );
    const watchDescription = computed(
      () => buildWatchDescription(movie.value, currentEpisodeLabel.value)
    );
    const canonicalPath = computed(
      () => {
        var _a;
        return buildWatchCanonicalPath(movie.value.slug, (_a = currentEpisode.value) == null ? void 0 : _a.slug);
      }
    );
    const movieSummary = computed(() => {
      const currentMovie = movie.value;
      return [
        currentMovie.origin_name ? currentMovie.year ? `${currentMovie.origin_name} (${currentMovie.year})` : currentMovie.origin_name : void 0,
        currentMovie.quality,
        currentMovie.lang
      ].filter(Boolean).join(" | ");
    });
    const watchKeywords = computed(
      () => buildWatchKeywords(movie.value, currentEpisodeLabel.value).join(", ")
    );
    const watchImage = computed(() => OPhimUtils.getThumbUrl(movie.value.thumb_url));
    const watchStructuredData = computed(() => {
      var _a, _b, _c;
      const currentMovie = movie.value;
      return {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        name: watchTitle.value.replace(" | Phimhayz.site", ""),
        description: watchDescription.value,
        thumbnailUrl: [OPhimUtils.getThumbUrl(currentMovie.thumb_url)],
        image: [OPhimUtils.getPosterUrl(currentMovie.poster_url)],
        uploadDate: currentMovie.year ? `${currentMovie.year}-01-01` : void 0,
        genre: (_a = currentMovie.category) == null ? void 0 : _a.map((category) => category.name),
        actor: (_b = currentMovie.actor) == null ? void 0 : _b.map((actor) => ({
          "@type": "Person",
          name: actor
        })),
        director: (_c = currentMovie.director) == null ? void 0 : _c.map((director) => ({
          "@type": "Person",
          name: director
        })),
        inLanguage: currentMovie.lang,
        url: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString()
      };
    });
    useSeoMeta({
      title: () => watchTitle.value,
      description: () => watchDescription.value,
      keywords: () => watchKeywords.value,
      ogTitle: () => watchTitle.value,
      ogDescription: () => watchDescription.value,
      ogImage: () => watchImage.value,
      twitterCard: "summary_large_image",
      twitterTitle: () => watchTitle.value,
      twitterDescription: () => watchDescription.value,
      twitterImage: () => watchImage.value
    });
    useHead(() => ({
      link: [
        {
          rel: "canonical",
          href: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString()
        }
      ],
      script: [
        {
          key: "watch-jsonld",
          type: "application/ld+json",
          textContent: JSON.stringify(watchStructuredData.value)
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_WatchPanel = _sfc_main$4;
      const _component_RelatedMovies = _sfc_main$3;
      const _component_CastList = _sfc_main$2;
      const _component_TrendingList = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background-dark pb-20 pt-24" }, _attrs))}><div class="container mx-auto space-y-8 px-4">`);
      _push(ssrRenderComponent(_component_WatchPanel, {
        episodes: unref(episodes),
        "initial-episode-slug": unref(tap),
        "initial-server": unref(server),
        "movie-slug": unref(movie).slug
      }, null, _parent));
      _push(`<div class="rounded-xl border border-white/5 bg-card-dark/50 p-6 backdrop-blur-sm"><h1 class="mb-2 text-2xl font-black text-white md:text-3xl"> Xem phim ${ssrInterpolate(unref(movie).name)} `);
      if (unref(currentEpisodeLabel)) {
        _push(`<span> - ${ssrInterpolate(unref(currentEpisodeLabel))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</h1><h2 class="mb-3 text-lg text-gray-400">${ssrInterpolate(unref(movieSummary) || unref(movie).origin_name)}</h2>`);
      if (unref(currentEpisodeLabel)) {
        _push(`<p class="mb-4 text-sm font-medium text-cyan-300"> \u0110ang ph\xE1t: ${ssrInterpolate(unref(currentEpisodeLabel))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<p class="line-clamp-3 cursor-pointer text-sm leading-relaxed text-gray-300 transition-all hover:line-clamp-none">${ssrInterpolate(unref(OPhimUtils).cleanContent(unref(movie).content || ""))}</p></div><div class="flex flex-col gap-8 lg:flex-row"><div class="flex-1 space-y-8">`);
      if ((_b = (_a = unref(relatedData)) == null ? void 0 : _a.items) == null ? void 0 : _b.length) {
        _push(ssrRenderComponent(_component_RelatedMovies, {
          movies: unref(relatedData).items.slice(0, 8)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="shrink-0 space-y-8 lg:w-72 xl:w-80">`);
      if ((_c = unref(movie).actor) == null ? void 0 : _c.length) {
        _push(ssrRenderComponent(_component_CastList, {
          actors: unref(movie).actor
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_e = (_d = unref(trendingData)) == null ? void 0 : _d.items) == null ? void 0 : _e.length) {
        _push(ssrRenderComponent(_component_TrendingList, {
          movies: unref(trendingData).items.slice(0, 5)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/watch/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_slug_-DpBLzFkY');
//# sourceMappingURL=_slug_-DpBLzFkY.mjs.map
