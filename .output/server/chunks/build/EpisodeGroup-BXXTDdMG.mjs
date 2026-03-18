globalThis.__timing__.logStart('Load chunks/build/EpisodeGroup-BXXTDdMG');import { _ as __nuxt_component_0 } from './nuxt-link-2k-Xgjf3.mjs';
import { c as cn } from './cn-H80jjgLf.mjs';
import { defineComponent, ref, watch, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "EpisodeGroup",
  __ssrInlineRender: true,
  props: {
    episodes: {
      type: Array,
      default: () => []
    },
    currentEpisode: {
      type: String,
      default: ""
    },
    currentServer: {
      type: String,
      default: ""
    },
    activeServerIdx: {
      type: Number,
      default: void 0
    },
    movieSlug: {
      type: String,
      default: ""
    },
    interactive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["select"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const localActiveServer = ref(0);
    watch(
      () => [props.activeServerIdx, props.currentServer, props.episodes],
      () => {
        if (typeof props.activeServerIdx === "number") {
          localActiveServer.value = props.activeServerIdx;
          return;
        }
        const matchedIndex = props.episodes.findIndex(
          (server) => server.server_name === props.currentServer
        );
        localActiveServer.value = matchedIndex >= 0 ? matchedIndex : 0;
      },
      { immediate: true, deep: true }
    );
    const activeServer = computed(() => {
      if (typeof props.activeServerIdx === "number") {
        return props.activeServerIdx;
      }
      return localActiveServer.value;
    });
    const activeServerData = computed(() => props.episodes[activeServer.value]);
    function buildWatchLink(episode) {
      var _a;
      const serverName = ((_a = activeServerData.value) == null ? void 0 : _a.server_name) || "";
      const params = new URLSearchParams();
      params.set("tap", episode.slug);
      params.set("server", serverName);
      return `/watch/${props.movieSlug}?${params.toString()}`;
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (__props.episodes.length) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-white/5 bg-card-dark p-6" }, _attrs))}><h3 class="mb-4 flex items-center gap-2 text-xl font-bold text-white"><span class="h-6 w-1 rounded-full bg-primary"></span> Danh s\xE1ch t\u1EADp </h3><div class="mb-6 flex flex-wrap gap-2"><!--[-->`);
        ssrRenderList(__props.episodes, (server, index) => {
          _push(`<button class="${ssrRenderClass(
            ("cn" in _ctx ? _ctx.cn : unref(cn))(
              "rounded-lg px-4 py-2 text-sm font-medium transition-all",
              unref(activeServer) === index ? "bg-primary text-slate-950 shadow-lg shadow-primary/20" : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
            )
          )}" type="button">${ssrInterpolate(server.server_name)}</button>`);
        });
        _push(`<!--]--></div>`);
        if (unref(activeServerData)) {
          _push(`<div class="grid max-h-60 grid-cols-3 gap-2 overflow-y-auto pr-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"><!--[-->`);
          ssrRenderList(unref(activeServerData).server_data, (episode) => {
            _push(`<!--[-->`);
            if (__props.interactive) {
              _push(`<button class="${ssrRenderClass(
                ("cn" in _ctx ? _ctx.cn : unref(cn))(
                  "rounded border py-2 text-center text-xs font-semibold transition-all",
                  __props.currentEpisode === episode.slug ? "border-cyan-400 bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" : "border-white/10 bg-transparent text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400"
                )
              )}" type="button">${ssrInterpolate(episode.name)}</button>`);
            } else {
              _push(ssrRenderComponent(_component_NuxtLink, {
                class: ("cn" in _ctx ? _ctx.cn : unref(cn))(
                  "rounded border py-2 text-center text-xs font-semibold transition-all",
                  __props.currentEpisode === episode.slug ? "border-cyan-400 bg-cyan-400 text-black shadow-lg shadow-cyan-400/20" : "border-white/10 bg-transparent text-gray-300 hover:border-cyan-400/50 hover:text-cyan-400"
                ),
                to: buildWatchLink(episode)
              }, {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                  if (_push2) {
                    _push2(`${ssrInterpolate(episode.name)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(episode.name), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent));
            }
            _push(`<!--]-->`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-xl border border-white/5 bg-card-dark p-6 text-sm text-gray-400" }, _attrs))}> Kh\xF4ng c\xF3 t\u1EADp phim n\xE0o. </div>`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/features/EpisodeGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };;globalThis.__timing__.logEnd('Load chunks/build/EpisodeGroup-BXXTDdMG');
//# sourceMappingURL=EpisodeGroup-BXXTDdMG.mjs.map
