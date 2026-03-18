globalThis.__timing__.logStart('Load chunks/build/MovieGrid-D4aFWUrv');import { _ as __nuxt_component_0 } from './nuxt-link-2k-Xgjf3.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderComponent, ssrRenderAttr } from 'vue/server-renderer';
import { Play } from 'lucide-vue-next';
import { a as OPhimUtils } from './ophim-service-BpMmC9L9.mjs';
import { c as cn } from './cn-H80jjgLf.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MovieCard",
  __ssrInlineRender: true,
  props: {
    movie: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/phim/${__props.movie.slug}`,
        class: "group relative block aspect-[2/3] overflow-hidden rounded-xl bg-card-dark transition-all duration-300 hover:z-10 hover:scale-105 hover:shadow-xl hover:shadow-primary/20"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute inset-0 h-full w-full"${_scopeId}><img${ssrRenderAttr("alt", __props.movie.name)}${ssrRenderAttr("src", unref(OPhimUtils).getThumbUrl(__props.movie.thumb_url || __props.movie.poster_url))} class="h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40" loading="lazy"${_scopeId}></div><div class="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"${_scopeId}><div class="translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0"${_scopeId}><div class="mb-3 flex justify-center"${_scopeId}><div class="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-slate-950 shadow-lg shadow-primary/40"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Play), { class: "ml-0.5 h-6 w-6 fill-current" }, null, _parent2, _scopeId));
            _push2(`</div></div><h3 class="mb-1 line-clamp-2 text-sm font-bold text-white"${_scopeId}>${ssrInterpolate(__props.movie.name)}</h3><p class="mb-2 line-clamp-1 text-xs text-gray-400"${_scopeId}>${ssrInterpolate(__props.movie.origin_name)}</p><div class="flex items-center gap-2 text-[10px] font-medium"${_scopeId}><span class="rounded bg-white/20 px-2 py-0.5 text-white"${_scopeId}>${ssrInterpolate(__props.movie.year)}</span>`);
            if (__props.movie.quality) {
              _push2(`<span class="rounded bg-primary/80 px-2 py-0.5 text-slate-950"${_scopeId}>${ssrInterpolate(__props.movie.quality)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<span class="rounded border border-white/30 px-2 py-0.5 text-gray-300"${_scopeId}>${ssrInterpolate(__props.movie.lang || "VietSub")}</span></div></div></div><div class="absolute right-2 top-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0"${_scopeId}><span class="rounded bg-primary px-2 py-1 text-[10px] font-bold text-slate-950 shadow-md"${_scopeId}>${ssrInterpolate(__props.movie.quality || "HD")}</span></div><div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0"${_scopeId}><h3 class="truncate text-sm font-semibold text-white"${_scopeId}>${ssrInterpolate(__props.movie.name)}</h3></div>`);
          } else {
            return [
              createVNode("div", { class: "absolute inset-0 h-full w-full" }, [
                createVNode("img", {
                  alt: __props.movie.name,
                  src: unref(OPhimUtils).getThumbUrl(__props.movie.thumb_url || __props.movie.poster_url),
                  class: "h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-40",
                  loading: "lazy"
                }, null, 8, ["alt", "src"])
              ]),
              createVNode("div", { class: "absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black via-black/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }, [
                createVNode("div", { class: "translate-y-4 transform transition-transform duration-300 group-hover:translate-y-0" }, [
                  createVNode("div", { class: "mb-3 flex justify-center" }, [
                    createVNode("div", { class: "flex h-12 w-12 items-center justify-center rounded-full bg-primary text-slate-950 shadow-lg shadow-primary/40" }, [
                      createVNode(unref(Play), { class: "ml-0.5 h-6 w-6 fill-current" })
                    ])
                  ]),
                  createVNode("h3", { class: "mb-1 line-clamp-2 text-sm font-bold text-white" }, toDisplayString(__props.movie.name), 1),
                  createVNode("p", { class: "mb-2 line-clamp-1 text-xs text-gray-400" }, toDisplayString(__props.movie.origin_name), 1),
                  createVNode("div", { class: "flex items-center gap-2 text-[10px] font-medium" }, [
                    createVNode("span", { class: "rounded bg-white/20 px-2 py-0.5 text-white" }, toDisplayString(__props.movie.year), 1),
                    __props.movie.quality ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: "rounded bg-primary/80 px-2 py-0.5 text-slate-950"
                    }, toDisplayString(__props.movie.quality), 1)) : createCommentVNode("", true),
                    createVNode("span", { class: "rounded border border-white/30 px-2 py-0.5 text-gray-300" }, toDisplayString(__props.movie.lang || "VietSub"), 1)
                  ])
                ])
              ]),
              createVNode("div", { class: "absolute right-2 top-2 opacity-100 transition-opacity duration-300 group-hover:opacity-0" }, [
                createVNode("span", { class: "rounded bg-primary px-2 py-1 text-[10px] font-bold text-slate-950 shadow-md" }, toDisplayString(__props.movie.quality || "HD"), 1)
              ]),
              createVNode("div", { class: "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 opacity-100 transition-opacity duration-300 group-hover:opacity-0" }, [
                createVNode("h3", { class: "truncate text-sm font-semibold text-white" }, toDisplayString(__props.movie.name), 1)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/MovieCard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovieGrid",
  __ssrInlineRender: true,
  props: {
    movies: {},
    title: {},
    className: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ("cn" in _ctx ? _ctx.cn : unref(cn))("mb-12", __props.className)
      }, _attrs))}>`);
      if (__props.title) {
        _push(`<h2 class="mb-6 flex items-center border-l-4 border-primary pl-4 text-2xl font-bold text-white">${ssrInterpolate(__props.title)}</h2>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"><!--[-->`);
      ssrRenderList(__props.movies, (movie) => {
        _push(ssrRenderComponent(_component_MovieCard, {
          key: movie._id || movie.slug,
          movie
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/MovieGrid.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/MovieGrid-D4aFWUrv');
//# sourceMappingURL=MovieGrid-D4aFWUrv.mjs.map
