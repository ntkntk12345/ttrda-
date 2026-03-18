globalThis.__timing__.logStart('Load chunks/build/index-BDdw9qip');import { _ as __nuxt_component_0 } from './nuxt-link-2k-Xgjf3.mjs';
import { c as cn } from './cn-H80jjgLf.mjs';
import { defineComponent, withAsyncContext, mergeProps, unref, ref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { Star, Calendar, Clock, Play, Plus, Info } from 'lucide-vue-next';
import { O as OphimService, a as OPhimUtils } from './ophim-service-BpMmC9L9.mjs';
import { _ as _sfc_main$2 } from './MovieGrid-D4aFWUrv.mjs';
import { u as useSeoMeta } from './v3-m4Jfmifc.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'vue-router';
import 'clsx';
import 'tailwind-merge';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  props: {
    movies: {}
  },
  setup(__props) {
    const currentIndex = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.movies.length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative h-[85vh] overflow-hidden bg-background-dark text-white md:h-[90vh]" }, _attrs))}><!--[-->`);
        ssrRenderList(__props.movies, (movie, index) => {
          var _a;
          _push(`<div class="${ssrRenderClass(
            ("cn" in _ctx ? _ctx.cn : unref(cn))(
              "absolute inset-0 transition-opacity duration-700",
              index === unref(currentIndex) ? "opacity-100" : "pointer-events-none opacity-0"
            )
          )}"><div class="absolute inset-0 z-0"><img${ssrRenderAttr("alt", movie.name)}${ssrRenderAttr("src", unref(OPhimUtils).getPosterUrl(movie.poster_url))} class="h-full w-full object-cover object-top opacity-90 md:object-center"><div class="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/80 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-r from-background-dark via-background-dark/60 to-transparent"></div></div><div class="absolute inset-0 z-10 flex items-center"><div class="container mx-auto mt-20 grid grid-cols-1 gap-8 px-4 md:mt-0 md:grid-cols-2 md:px-8"><div class="max-w-2xl space-y-6"><div class="flex flex-wrap items-center gap-3 text-sm font-medium text-gray-300"><span class="flex items-center gap-1 rounded border border-yellow-500/30 bg-yellow-500/20 px-2 py-0.5 text-yellow-400">`);
          _push(ssrRenderComponent(unref(Star), { class: "h-3 w-3 fill-current" }, null, _parent));
          _push(` IMDb ${ssrInterpolate(typeof movie.imdb === "object" ? ((_a = movie.imdb) == null ? void 0 : _a.vote_average) || "N/A" : "N/A")}</span><span class="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">`);
          _push(ssrRenderComponent(unref(Calendar), { class: "h-3 w-3" }, null, _parent));
          _push(` ${ssrInterpolate(movie.year)}</span><span class="flex items-center gap-1 rounded bg-white/10 px-2 py-0.5">`);
          _push(ssrRenderComponent(unref(Clock), { class: "h-3 w-3" }, null, _parent));
          _push(` ${ssrInterpolate(movie.time || "N/A")}</span><span class="text-xs font-bold uppercase tracking-wider text-primary">${ssrInterpolate(movie.lang)} \u2022 ${ssrInterpolate(movie.quality)}</span></div><div><h1 class="text-4xl font-black leading-tight tracking-tight text-[#F9F9F9] drop-shadow-2xl md:text-6xl lg:text-7xl">${ssrInterpolate(movie.name)}</h1><p class="mt-3 text-xl font-light italic text-gray-400 md:text-2xl">${ssrInterpolate(movie.origin_name)}</p></div><div class="flex flex-wrap gap-4 pt-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/watch/${movie.slug}`,
            class: "group/play flex items-center gap-3 rounded-full bg-yellow-500 px-8 py-4 font-bold text-black shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all hover:scale-105 hover:bg-yellow-400"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors group-hover/play:bg-black/20"${_scopeId}>`);
                _push2(ssrRenderComponent(unref(Play), { class: "ml-0.5 h-4 w-4 fill-current" }, null, _parent2, _scopeId));
                _push2(`</div><span class="text-lg"${_scopeId}>Xem phim</span>`);
              } else {
                return [
                  createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-colors group-hover/play:bg-black/20" }, [
                    createVNode(unref(Play), { class: "ml-0.5 h-4 w-4 fill-current" })
                  ]),
                  createVNode("span", { class: "text-lg" }, "Xem phim")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<button class="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-4 font-semibold text-white backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/10" type="button">`);
          _push(ssrRenderComponent(unref(Plus), { class: "h-5 w-5" }, null, _parent));
          _push(`<span>Th\xEAm v\xE0o DS</span></button>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/phim/${movie.slug}`,
            class: "flex items-center gap-2 px-4 py-4 font-medium text-gray-400 transition-colors hover:text-white"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(Info), { class: "h-5 w-5" }, null, _parent2, _scopeId));
                _push2(`<span${_scopeId}>Chi ti\u1EBFt</span>`);
              } else {
                return [
                  createVNode(unref(Info), { class: "h-5 w-5" }),
                  createVNode("span", null, "Chi ti\u1EBFt")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div></div>`);
        });
        _push(`<!--]--><div class="scrollbar-hide absolute bottom-8 right-8 z-20 hidden max-w-[50%] gap-4 overflow-x-auto pb-2 lg:flex"><!--[-->`);
        ssrRenderList(__props.movies, (movie, index) => {
          _push(`<button class="${ssrRenderClass(
            ("cn" in _ctx ? _ctx.cn : unref(cn))(
              "group/thumb relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-300",
              unref(currentIndex) === index ? "scale-105 border-yellow-500 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
            )
          )}" type="button"><img${ssrRenderAttr("alt", movie.name)}${ssrRenderAttr("src", unref(OPhimUtils).getPosterUrl(movie.poster_url))} class="h-full w-full object-cover transition-transform duration-500 group-hover/thumb:scale-110"><div class="${ssrRenderClass(
            ("cn" in _ctx ? _ctx.cn : unref(cn))(
              "absolute inset-0 transition-colors",
              unref(currentIndex) === index ? "bg-transparent" : "bg-black/40"
            )
          )}"></div>`);
          if (unref(currentIndex) === index) {
            _push(`<div class="absolute inset-0 flex items-center justify-center">`);
            _push(ssrRenderComponent(unref(Play), { class: "h-6 w-6 fill-current text-white drop-shadow-md" }, null, _parent));
            _push(`</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        });
        _push(`<!--]--></div><div class="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 lg:hidden"><!--[-->`);
        ssrRenderList(__props.movies, (_, index) => {
          _push(`<button class="${ssrRenderClass(unref(currentIndex) === index ? "h-2 w-6 rounded-full bg-yellow-500" : "h-2 w-2 rounded-full bg-white/30")}" type="button"></button>`);
        });
        _push(`<!--]--></div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/HeroSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const [phimMoi, phimBo, phimLe, hoatHinh] = ([__temp, __restore] = withAsyncContext(() => Promise.all([
      OphimService.getHomeMovies(),
      OphimService.getMoviesByCategory("phim-bo"),
      OphimService.getMoviesByCategory("phim-le"),
      OphimService.getMoviesByCategory("hoat-hinh")
    ])), __temp = await __temp, __restore(), __temp);
    useSeoMeta({
      title: "Phimhayz.site - Xem phim online chat luong cao",
      description: "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
      ogTitle: "Phimhayz.site - Xem phim online chat luong cao",
      ogDescription: "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai.",
      twitterTitle: "Phimhayz.site - Xem phim online chat luong cao",
      twitterDescription: "Phimhayz.site la trang xem phim truc tuyen voi kho phim cap nhat lien tuc, toc do nhanh va giao dien hien dai."
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      const _component_HeroSection = _sfc_main$1;
      const _component_MovieGrid = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-12" }, _attrs))}>`);
      if ((_b = (_a = unref(phimMoi)) == null ? void 0 : _a.items) == null ? void 0 : _b.length) {
        _push(ssrRenderComponent(_component_HeroSection, {
          movies: unref(phimMoi).items.slice(0, 8)
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="container mx-auto space-y-16 px-4 pb-20">`);
      if ((_d = (_c = unref(phimMoi)) == null ? void 0 : _c.items) == null ? void 0 : _d.length) {
        _push(ssrRenderComponent(_component_MovieGrid, {
          "class-name": "",
          movies: unref(phimMoi).items.slice(1, 13),
          title: "Phim m\u1EDBi c\u1EADp nh\u1EADt"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_f = (_e = unref(phimBo)) == null ? void 0 : _e.items) == null ? void 0 : _f.length) {
        _push(ssrRenderComponent(_component_MovieGrid, {
          movies: unref(phimBo).items.slice(0, 12),
          title: "Phim b\u1ED9 hot"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_h = (_g = unref(phimLe)) == null ? void 0 : _g.items) == null ? void 0 : _h.length) {
        _push(ssrRenderComponent(_component_MovieGrid, {
          movies: unref(phimLe).items.slice(0, 12),
          title: "Phim l\u1EBB m\u1EDBi"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if ((_j = (_i = unref(hoatHinh)) == null ? void 0 : _i.items) == null ? void 0 : _j.length) {
        _push(ssrRenderComponent(_component_MovieGrid, {
          movies: unref(hoatHinh).items.slice(0, 12),
          title: "Phim ho\u1EA1t h\xECnh"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };;globalThis.__timing__.logEnd('Load chunks/build/index-BDdw9qip');
//# sourceMappingURL=index-BDdw9qip.mjs.map
