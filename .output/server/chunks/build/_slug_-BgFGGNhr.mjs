globalThis.__timing__.logStart('Load chunks/build/_slug_-BgFGGNhr');import { _ as __nuxt_component_0 } from './nuxt-link-2k-Xgjf3.mjs';
import { _ as _sfc_main$1 } from './EpisodeGroup-BXXTDdMG.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { Play, Calendar, Clock, Globe, Eye } from 'lucide-vue-next';
import { a as OPhimUtils, O as OphimService } from './ophim-service-BpMmC9L9.mjs';
import { u as useRoute, c as createError, a as useRuntimeConfig } from './server.mjs';
import { u as useAsyncData } from './asyncData-CmHscAf-.mjs';
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
import './cn-H80jjgLf.mjs';
import 'clsx';
import 'tailwind-merge';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const runtimeConfig = useRuntimeConfig();
    const slug = computed(() => decodeURIComponent(String(route.params.slug || "")));
    function buildMovieDetailTitle(movie2) {
      const yearSuffix = movie2.year ? ` (${movie2.year})` : "";
      const qualitySuffix = movie2.quality ? ` ${movie2.quality}` : "";
      const langSuffix = movie2.lang ? ` ${movie2.lang}` : "";
      return `Xem phim ${movie2.name}${yearSuffix}${qualitySuffix}${langSuffix} | Phimhayz.site`;
    }
    function buildMovieDetailDescription(movie2) {
      const cleanedContent = OPhimUtils.cleanContent(movie2.content || "").replace(/\s+/g, " ").trim();
      const metaBits = [
        movie2.quality,
        movie2.lang,
        movie2.time,
        movie2.episode_current
      ].filter(Boolean).join(", ");
      const prefix = `Xem phim ${movie2.name}${metaBits ? ` ${metaBits}` : ""} online tai Phimhayz.site.`;
      return `${prefix} ${cleanedContent}`.trim().slice(0, 160);
    }
    function buildMovieKeywords(movie2) {
      var _a, _b, _c;
      return [
        `xem phim ${movie2.name}`,
        movie2.origin_name,
        movie2.lang,
        movie2.quality,
        movie2.episode_current,
        movie2.episode_total,
        movie2.year ? String(movie2.year) : null,
        ...(_b = (_a = movie2.category) == null ? void 0 : _a.map((category) => category.name)) != null ? _b : [],
        ...(_c = movie2.actor) != null ? _c : []
      ].filter((value) => Boolean(value));
    }
    function getAggregateRating(movie2) {
      var _a, _b, _c, _d;
      if (((_a = movie2.imdb) == null ? void 0 : _a.vote_average) && ((_b = movie2.imdb) == null ? void 0 : _b.vote_count)) {
        return {
          "@type": "AggregateRating",
          ratingValue: movie2.imdb.vote_average,
          ratingCount: movie2.imdb.vote_count,
          bestRating: 10,
          worstRating: 1
        };
      }
      if (((_c = movie2.tmdb) == null ? void 0 : _c.vote_average) && ((_d = movie2.tmdb) == null ? void 0 : _d.vote_count)) {
        return {
          "@type": "AggregateRating",
          ratingValue: movie2.tmdb.vote_average,
          ratingCount: movie2.tmdb.vote_count,
          bestRating: 10,
          worstRating: 1
        };
      }
      return void 0;
    }
    const { data } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "movie-detail",
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
    const movie = computed(() => data.value.movie);
    const episodes = computed(() => {
      var _a;
      return (_a = data.value.episodes) != null ? _a : [];
    });
    const movieSummary = computed(() => {
      const currentMovie = movie.value;
      return [
        currentMovie.quality,
        currentMovie.lang,
        currentMovie.time,
        currentMovie.episode_current
      ].filter(Boolean).join(" | ");
    });
    const canonicalPath = computed(() => {
      var _a;
      return `/phim/${((_a = movie.value) == null ? void 0 : _a.slug) || slug.value}`;
    });
    const title = computed(() => buildMovieDetailTitle(movie.value));
    const description = computed(() => buildMovieDetailDescription(movie.value));
    const imageUrl = computed(() => OPhimUtils.getThumbUrl(movie.value.thumb_url));
    const keywords = computed(() => buildMovieKeywords(movie.value).join(", "));
    const movieStructuredData = computed(() => {
      var _a, _b, _c;
      const currentMovie = movie.value;
      return {
        "@context": "https://schema.org",
        "@type": "Movie",
        name: currentMovie.name,
        alternateName: currentMovie.origin_name,
        description: description.value,
        image: [
          OPhimUtils.getThumbUrl(currentMovie.thumb_url),
          OPhimUtils.getPosterUrl(currentMovie.poster_url)
        ],
        datePublished: currentMovie.year ? `${currentMovie.year}-01-01` : void 0,
        genre: (_a = currentMovie.category) == null ? void 0 : _a.map((category) => category.name),
        actor: (_b = currentMovie.actor) == null ? void 0 : _b.map((actor) => ({
          "@type": "Person",
          name: actor
        })),
        director: (_c = currentMovie.director) == null ? void 0 : _c.map((director) => ({
          "@type": "Person",
          name: director
        })),
        aggregateRating: getAggregateRating(currentMovie),
        inLanguage: currentMovie.lang,
        url: new URL(canonicalPath.value, runtimeConfig.public.siteUrl).toString()
      };
    });
    useSeoMeta({
      title: () => title.value,
      description: () => description.value,
      keywords: () => keywords.value,
      ogTitle: () => title.value,
      ogDescription: () => description.value,
      ogImage: () => imageUrl.value,
      twitterCard: "summary_large_image",
      twitterTitle: () => title.value,
      twitterDescription: () => description.value,
      twitterImage: () => imageUrl.value
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
          key: "movie-jsonld",
          type: "application/ld+json",
          textContent: JSON.stringify(movieStructuredData.value)
        }
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_EpisodeGroup = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen pb-20" }, _attrs))}><div class="relative h-[60vh] w-full"><img${ssrRenderAttr("alt", unref(movie).name)}${ssrRenderAttr("src", unref(OPhimUtils).getPosterUrl(unref(movie).poster_url))} class="h-full w-full object-cover"><div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div><div class="absolute inset-0 bg-background-dark/30 backdrop-blur-sm"></div></div><div class="container relative z-10 mx-auto -mt-32 px-4"><div class="flex flex-col gap-8 md:flex-row"><div class="w-full flex-shrink-0 md:w-72"><div class="relative aspect-[2/3] overflow-hidden rounded-xl border-4 border-card-dark shadow-2xl"><img${ssrRenderAttr("alt", unref(movie).name)}${ssrRenderAttr("src", unref(OPhimUtils).getThumbUrl(unref(movie).thumb_url))} class="h-full w-full object-cover"></div>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: ((_c = (_b = (_a = unref(episodes)[0]) == null ? void 0 : _a.server_data) == null ? void 0 : _b[0]) == null ? void 0 : _c.slug) ? `/watch/${unref(movie).slug}` : "#",
        class: "mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-bold text-slate-950 shadow-lg shadow-primary/20 transition-all hover:bg-cyan-300"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(Play), { class: "h-5 w-5 fill-current" }, null, _parent2, _scopeId));
            _push2(` XEM PHIM NGAY `);
          } else {
            return [
              createVNode(unref(Play), { class: "h-5 w-5 fill-current" }),
              createTextVNode(" XEM PHIM NGAY ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex-1 pt-4 text-white md:pt-12"><h1 class="mb-2 text-4xl font-black md:text-5xl">Xem phim ${ssrInterpolate(unref(movie).name)}</h1><h2 class="mb-3 text-xl font-medium text-gray-300 md:text-2xl">${ssrInterpolate(unref(movie).origin_name)}</h2>`);
      if (unref(movieSummary)) {
        _push(`<p class="mb-6 text-sm font-medium text-cyan-300">${ssrInterpolate(unref(movieSummary))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mb-8 flex flex-wrap items-center gap-6 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-gray-300 backdrop-blur-md"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Calendar), { class: "h-4 w-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(movie).year)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Clock), { class: "h-4 w-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(movie).time)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Globe), { class: "h-4 w-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate((_e = (_d = unref(movie).country) == null ? void 0 : _d[0]) == null ? void 0 : _e.name)}</span></div><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(unref(Eye), { class: "h-4 w-4 text-primary" }, null, _parent));
      _push(`<span>${ssrInterpolate(unref(movie).view || 0)} l\u01B0\u1EE3t xem</span></div></div><div class="mb-8"><h3 class="mb-3 border-l-4 border-primary pl-3 text-lg font-bold">N\u1ED9i dung phim</h3><div class="text-base/7 leading-relaxed text-gray-300">${(_f = unref(movie).content || "") != null ? _f : ""}</div></div><div class="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2"><div><h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400"> \u0110\u1EA1o di\u1EC5n </h3><p class="font-medium text-white">${ssrInterpolate(((_g = unref(movie).director) == null ? void 0 : _g.join(", ")) || "N/A")}</p></div><div><h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400"> Di\u1EC5n vi\xEAn </h3><p class="line-clamp-2 font-medium text-white">${ssrInterpolate(((_h = unref(movie).actor) == null ? void 0 : _h.join(", ")) || "N/A")}</p></div><div><h3 class="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-400"> Th\u1EC3 lo\u1EA1i </h3><div class="flex flex-wrap gap-2"><!--[-->`);
      ssrRenderList(unref(movie).category, (category) => {
        _push(`<span class="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs transition-colors hover:bg-primary hover:text-slate-950">${ssrInterpolate(category.name)}</span>`);
      });
      _push(`<!--]--></div></div></div>`);
      if (unref(episodes).length) {
        _push(`<div class="mt-12">`);
        _push(ssrRenderComponent(_component_EpisodeGroup, {
          episodes: unref(episodes),
          "movie-slug": unref(movie).slug
        }, null, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/phim/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/_slug_-BgFGGNhr');
//# sourceMappingURL=_slug_-BgFGGNhr.mjs.map
